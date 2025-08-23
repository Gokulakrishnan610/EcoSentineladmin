import { useState, useEffect, useRef } from "react"
import { Map, Layers, Eye, Home, AlertTriangle, Thermometer, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { mockShelters, mockAlerts, mockRiskZones, mockWeatherInfo } from "@/lib/mock-data"

// Debug mock data
console.log('Mock data loaded:', {
  shelters: mockShelters?.length,
  alerts: mockAlerts?.length,
  riskZones: mockRiskZones?.length,
  weather: mockWeatherInfo
})

// Leaflet types
declare global {
  interface Window {
    L: any
  }
}

export function RiskMapsPage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [mapLayers, setMapLayers] = useState({
    flood: true,
    cyclone: true,
    landslide: true,
    shelters: true,
    alerts: true,
    weather: true,
    historical: false
  })

  const [mapLoading, setMapLoading] = useState(false)
  const [showLegend, setShowLegend] = useState(false)

  const toggleLayer = (layer: keyof typeof mapLayers) => {
    setMapLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }))
  }

  useEffect(() => {
    console.log('useEffect triggered - mapRef:', mapRef.current, 'mapInstance:', mapInstanceRef.current)
    
    if (!mapRef.current) {
      console.log('mapRef.current is null, returning early')
      return
    }
    
    if (mapInstanceRef.current) {
      console.log('mapInstance already exists, returning early')
      return
    }

    const initMap = async () => {
      try {
        console.log('Starting map initialization...')
        
        // Try to get Leaflet from window first (if already loaded)
        let L = window.L
        
        if (!L) {
          // Dynamically import Leaflet
          console.log('Importing Leaflet dynamically...')
          const leafletModule = await import('leaflet')
          L = leafletModule.default || leafletModule
          console.log('Leaflet imported successfully:', L)
        }
        
        // Ensure Leaflet CSS is loaded
        if (!document.querySelector('link[href*="leaflet"]')) {
          console.log('Loading Leaflet CSS...')
          const link = document.createElement('link')
          link.rel = 'stylesheet'
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
          link.crossOrigin = ''
          document.head.appendChild(link)
        }
        
        // Initialize map centered on Tamil Nadu
        console.log('Creating map with container:', mapRef.current)
        const map = L.map(mapRef.current!).setView([10.7905, 78.7047], 7)
        console.log('Map initialized:', map)
        mapInstanceRef.current = map

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18,
          updateWhenIdle: true,
          updateWhenZooming: false
        }).addTo(map)

        // Add disaster risk zones
        if (mapLayers.flood) {
          mockRiskZones.filter(zone => zone.type === 'flood').forEach((zone: any) => {
            const center = zone.coordinates[0]
            const circle = L.circle([center[1], center[0]], {
              color: '#3B82F6',
              fillColor: '#3B82F6',
              fillOpacity: 0.4,
              radius: 50000,
              weight: 3
            }).addTo(map)

            circle.bindPopup(`
              <div class="p-2">
                <h3 class="font-bold text-blue-600">Flood Risk Zone</h3>
                <p class="text-sm text-gray-600">Risk Level: ${Math.round(zone.severity * 100)}%</p>
                <p class="text-sm text-gray-600">Type: ${zone.type}</p>
                <p class="text-sm text-gray-600">Last Updated: ${zone.lastUpdated}</p>
              </div>
            `)
          })
        }

        if (mapLayers.cyclone) {
          mockRiskZones.filter(zone => zone.type === 'cyclone').forEach((zone: any) => {
            const center = zone.coordinates[0]
            const circle = L.circle([center[1], center[0]], {
              color: '#8B5CF6',
              fillColor: '#8B5CF6',
              fillOpacity: 0.4,
              radius: 50000,
              weight: 3
            }).addTo(map)

            circle.bindPopup(`
              <div class="p-2">
                <h3 class="font-bold text-purple-600">Cyclone Risk Zone</h3>
                <p class="text-sm text-gray-600">Risk Level: ${Math.round(zone.severity * 100)}%</p>
                <p class="text-sm text-gray-600">Type: ${zone.type}</p>
                <p class="text-sm text-gray-600">Last Updated: ${zone.lastUpdated}</p>
              </div>
            `)
          })
        }

        if (mapLayers.landslide) {
          mockRiskZones.filter(zone => zone.type === 'landslide').forEach((zone: any) => {
            const center = zone.coordinates[0]
            const circle = L.circle([center[1], center[0]], {
              color: '#F97316',
              fillColor: '#F97316',
              fillOpacity: 0.4,
              radius: 50000,
              weight: 3
            }).addTo(map)

            circle.bindPopup(`
              <div class="p-2">
                <h3 class="font-bold text-orange-600">Landslide Risk Zone</h3>
                <p class="text-sm text-gray-600">Risk Level: ${Math.round(zone.severity * 100)}%</p>
                <p class="text-sm text-gray-600">Type: ${zone.type}</p>
                <p class="text-sm text-gray-600">Last Updated: ${zone.lastUpdated}</p>
              </div>
            `)
          })
        }

        // Add shelter locations
        if (mapLayers.shelters) {
          mockShelters.forEach((shelter: any) => {
            const shelterIcon = L.divIcon({
              className: 'custom-div-icon',
              html: `<div class="bg-green-500 text-white rounded-full p-2 text-xs font-bold">🏠</div>`,
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            })

            const marker = L.marker([shelter.coordinates[1], shelter.coordinates[0]], { icon: shelterIcon }).addTo(map)
            
            marker.bindPopup(`
              <div class="p-3 min-w-[200px]">
                <h3 class="font-bold text-green-600 mb-2">${shelter.name}</h3>
                <p class="text-sm text-gray-600 mb-2">${shelter.address}</p>
                <div class="space-y-1 text-sm">
                  <p><span class="font-medium">Capacity:</span> ${shelter.capacity}</p>
                  <p><span class="font-medium">Available:</span> ${shelter.available}</p>
                  <p><span class="font-medium">Contact:</span> ${shelter.contact}</p>
                </div>
                <div class="mt-2">
                  <span class="inline-block px-2 py-1 text-xs rounded-full ${shelter.available > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                    ${shelter.available > 0 ? 'Available' : 'Full'}
                  </span>
                </div>
              </div>
            `)
          })
        }

        // Add active alerts
        if (mapLayers.alerts) {
          mockAlerts.forEach((alert: any) => {
            const alertIcon = L.divIcon({
              className: 'custom-div-icon',
              html: `<div class="bg-red-500 text-white rounded-full p-2 text-xs font-bold">🚨</div>`,
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            })

            const marker = L.marker([alert.coordinates[1], alert.coordinates[0]], { icon: alertIcon }).addTo(map)
            
            marker.bindPopup(`
              <div class="p-3 min-w-[200px]">
                <h3 class="font-bold text-red-600 mb-2">${alert.title}</h3>
                <p class="text-sm text-gray-600 mb-2">${alert.description}</p>
                <div class="space-y-1 text-sm">
                  <p><span class="font-medium">Severity:</span> ${alert.severity}</p>
                  <p><span class="font-medium">Location:</span> ${alert.location}</p>
                  <p><span class="font-medium">Time:</span> ${alert.timestamp}</p>
                </div>
                <div class="mt-2">
                  <span class="inline-block px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                    Active Alert
                  </span>
                </div>
              </div>
            `)
          })
        }

        // Add weather stations
        if (mapLayers.weather) {
          const weatherIcon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div class="bg-blue-500 text-white rounded-full p-2 text-xs font-bold">🌤️</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          })

          const weatherMarker = L.marker([mockWeatherInfo.coordinates[1], mockWeatherInfo.coordinates[0]], { icon: weatherIcon }).addTo(map)
          
          weatherMarker.bindPopup(`
            <div class="p-3 min-w-[200px]">
              <h3 class="font-bold text-blue-600 mb-2">Weather Station - ${mockWeatherInfo.location}</h3>
              <div class="space-y-2 text-sm">
                <div class="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-red-500" />
                  <span>${mockWeatherInfo.temperature}°C</span>
                </div>
                <div class="flex items-center gap-2">
                  <CloudRain className="h-4 w-4 text-blue-500" />
                  <span>${mockWeatherInfo.humidity}%</span>
                </div>
                <div class="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-gray-500" />
                  <span>${mockWeatherInfo.windSpeed} km/h</span>
                </div>
                <div class="flex items-center gap-2">
                  <Info className="h-4 w-4 text-green-500" />
                  <span>${mockWeatherInfo.weather}</span>
                </div>
              </div>
              <p class="text-xs text-gray-500 mt-2">Last updated: ${mockWeatherInfo.lastUpdated}</p>
            </div>
          `)
        }

        console.log('Map setup complete, invalidating size...')
        setMapLoading(false)
        
        // Force map to recalculate size
        setTimeout(() => {
          map.invalidateSize()
          console.log('Map size invalidated')
        }, 100)

      } catch (error) {
        console.error('Error initializing map:', error)
        setMapLoading(false)
      }
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initMap, 100)
    
    // Fallback: if map doesn't load in 5 seconds, show error
    const fallbackTimer = setTimeout(() => {
      if (mapLoading) {
        console.error('Map failed to load within 5 seconds')
        setMapLoading(false)
      }
    }, 5000)
    
    return () => {
      clearTimeout(timer)
      clearTimeout(fallbackTimer)
    }
  }, [])

  // Update map layers when state changes
  useEffect(() => {
    if (!mapInstanceRef.current) return

    const map = mapInstanceRef.current
    const L = window.L

    // Clear existing layers
    map.eachLayer((layer: any) => {
      if (layer instanceof L.TileLayer) return
      map.removeLayer(layer)
    })

    // Re-add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map)

    // Re-add layers based on current state
    if (mapLayers.flood) {
      mockRiskZones.filter(zone => zone.type === 'flood').forEach((zone: any) => {
        const center = zone.coordinates[0]
        L.circle([center[1], center[0]], {
          color: '#3B82F6',
          fillColor: '#3B82F6',
          fillOpacity: 0.4,
          radius: 50000,
          weight: 3
        }).addTo(map)
      })
    }

    if (mapLayers.cyclone) {
      mockRiskZones.filter(zone => zone.type === 'cyclone').forEach((zone: any) => {
        const center = zone.coordinates[0]
        L.circle([center[1], center[0]], {
          color: '#8B5CF6',
          fillColor: '#8B5CF6',
          fillOpacity: 0.4,
          radius: 50000,
          weight: 3
        }).addTo(map)
      })
    }

    if (mapLayers.landslide) {
      mockRiskZones.filter(zone => zone.type === 'landslide').forEach((zone: any) => {
        const center = zone.coordinates[0]
        L.circle([center[1], center[0]], {
          color: '#F97316',
          fillColor: '#F97316',
          fillOpacity: 0.4,
          radius: 50000,
          weight: 3
        }).addTo(map)
      })
    }

    if (mapLayers.shelters) {
      mockShelters.forEach((shelter: any) => {
        const shelterIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div class="bg-green-500 text-white rounded-full p-2 text-xs font-bold">🏠</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        })
        L.marker([shelter.coordinates[1], shelter.coordinates[0]], { icon: shelterIcon }).addTo(map)
      })
    }

    if (mapLayers.alerts) {
      mockAlerts.forEach((alert: any) => {
        const alertIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `<div class="bg-red-500 text-white rounded-full p-2 text-xs font-bold">🚨</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        })
        L.marker([alert.coordinates[1], alert.coordinates[0]], { icon: alertIcon }).addTo(map)
      })
    }

    if (mapLayers.weather) {
      const weatherIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="bg-blue-500 text-white rounded-full p-2 text-xs font-bold">🌤️</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      })
      L.marker([mockWeatherInfo.coordinates[1], mockWeatherInfo.coordinates[0]], { icon: weatherIcon }).addTo(map)
    }

  }, [mapLayers])

  return (
    <div className="h-full flex">
      {/* Map Container */}
      <div className="flex-1 relative">
        {mapLoading ? (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold mb-2">Loading Interactive Risk Map</h3>
              <p className="text-gray-600">Initializing Leaflet map with real-time data...</p>
            </div>
          </div>
        ) : (
          <div 
            ref={mapRef} 
            className="w-full h-full bg-gray-100 border-2 border-blue-500 relative" 
            style={{ 
              minHeight: '600px',
              height: '100%',
              width: '100%'
            }} 
          >
            <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
              Map Container Ready
            </div>
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
              {mapInstanceRef.current ? 'Map Loaded' : 'Map Not Loaded'}
            </div>
            <div className="absolute bottom-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs">
              Container Size: {mapRef.current?.offsetWidth || 0} x {mapRef.current?.offsetHeight || 0}
            </div>
            
            {/* Fallback Map Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8 bg-white/80 rounded-lg shadow-lg">
                <Map className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Interactive Risk Map</h3>
                <p className="text-gray-600 mb-4">Tamil Nadu Disaster Management</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-blue-100 p-3 rounded">
                    <div className="font-semibold text-blue-800">Risk Zones</div>
                    <div className="text-blue-600">{mockRiskZones.length}</div>
                  </div>
                  <div className="bg-red-100 p-3 rounded">
                    <div className="font-semibold text-red-800">Active Alerts</div>
                    <div className="text-red-600">{mockAlerts.length}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2 z-[1000]">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white/95 backdrop-blur shadow-lg"
            title="Toggle Visibility"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant={showLegend ? "default" : "outline"}
            size="sm" 
            className="bg-white/95 backdrop-blur shadow-lg"
            onClick={() => setShowLegend(!showLegend)}
            title="Toggle Map Legend"
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>

        {/* Live Statistics Overlay */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur rounded-lg p-4 shadow-lg z-[1000]">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Critical Zones</span>
              </div>
              <div className="font-bold text-red-600">8 Active</div>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Safe Shelters</span>
              </div>
              <div className="font-bold text-green-600">15 Open</div>
            </div>
          </div>
        </div>

        {/* Map Legend - Only show when showLegend is true */}
        {showLegend && (
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur rounded-lg p-4 shadow-lg z-[1000] animate-in fade-in-0 duration-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm">Map Legend</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowLegend(false)}
                className="h-6 w-6 p-0"
                title="Close Legend"
              >
                ×
              </Button>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Flood Zones</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span>Cyclone Zones</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded"></div>
                <span>Landslide Zones</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-lg">🏠</span>
                <span>Shelters</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-500 text-lg">🚨</span>
                <span>Active Alerts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-500 text-lg">🌤️</span>
                <span>Weather Stations</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Sidebar - Controls & Information */}
      <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto">
        {/* Layer Controls */}
        <Card className="m-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Map Layers
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="flood-layer" className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  Flood Risk
                </Label>
                <Switch
                  id="flood-layer"
                  checked={mapLayers.flood}
                  onCheckedChange={() => toggleLayer('flood')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="cyclone-layer" className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  Cyclone Risk
                </Label>
                <Switch
                  id="cyclone-layer"
                  checked={mapLayers.cyclone}
                  onCheckedChange={() => toggleLayer('cyclone')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="landslide-layer" className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  Landslide Risk
                </Label>
                <Switch
                  id="landslide-layer"
                  checked={mapLayers.landslide}
                  onCheckedChange={() => toggleLayer('landslide')}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <Label htmlFor="shelters-layer" className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-green-500" />
                  Emergency Shelters
                </Label>
                <Switch
                  id="shelters-layer"
                  checked={mapLayers.shelters}
                  onCheckedChange={() => toggleLayer('shelters')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="alerts-layer" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  Active Alerts
                </Label>
                <Switch
                  id="alerts-layer"
                  checked={mapLayers.alerts}
                  onCheckedChange={() => toggleLayer('alerts')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="weather-layer" className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-blue-500" />
                  Weather Data
                </Label>
                <Switch
                  id="weather-layer"
                  checked={mapLayers.weather}
                  onCheckedChange={() => toggleLayer('weather')}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="historical-layer" className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-gray-500" />
                  Historical Data
                </Label>
                <Switch
                  id="historical-layer"
                  checked={mapLayers.historical}
                  onCheckedChange={() => toggleLayer('historical')}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="m-4">
          <CardHeader>
            <CardTitle className="text-sm">Quick Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Total Risk Zones:</span>
              <Badge variant="outline">24</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>Active Alerts:</span>
              <Badge variant="destructive">7</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>Available Shelters:</span>
              <Badge variant="default">15</Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span>Weather Stations:</span>
              <Badge variant="outline">12</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="m-4">
          <CardHeader>
            <CardTitle className="text-sm">Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockAlerts.slice(0, 3).map((alert, index) => (
              <div key={index} className="p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-red-800">{alert.title}</h4>
                    <p className="text-xs text-red-600 mt-1">{alert.location}</p>
                    <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}