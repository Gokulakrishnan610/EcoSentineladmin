import { useState } from "react"
import { Map, Layers, Eye, EyeOff, MapPin, Home, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { mockShelters, mockAlerts } from "@/lib/mock-data"

export function RiskMapsPage() {
  const [mapLayers, setMapLayers] = useState({
    flood: true,
    cyclone: true,
    landslide: false,
    earthquake: false,
    shelters: true,
    alerts: true
  })

  const toggleLayer = (layer: keyof typeof mapLayers) => {
    setMapLayers(prev => ({
      ...prev,
      [layer]: !prev[layer]
    }))
  }

  return (
    <div className="h-full flex">
      {/* Map Container */}
      <div className="flex-1 relative">
        {/* Placeholder for Mapbox integration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
          <div className="text-center p-8">
            <Map className="h-20 w-20 mx-auto mb-6 text-primary" />
            <h3 className="text-2xl font-semibold mb-4">Interactive Risk Map</h3>
            <p className="text-muted-foreground max-w-md">
              Mapbox integration will display:
              <br />• Real-time risk heatmaps by disaster type
              <br />• Shelter locations with capacity status
              <br />• Active alert locations
              <br />• Historical disaster data overlays
              <br />• Live weather and sensor data
            </p>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button variant="outline" size="sm" className="bg-background/95 backdrop-blur">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="bg-background/95 backdrop-blur">
            <Layers className="h-4 w-4" />
          </Button>
        </div>

        {/* Live Statistics Overlay */}
        <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur rounded-lg p-4 shadow-lg">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 bg-danger rounded-full"></div>
                <span>Critical Zones</span>
              </div>
              <div className="font-bold text-danger">8 Active</div>
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 bg-safe rounded-full"></div>
                <span>Safe Shelters</span>
              </div>
              <div className="font-bold text-safe">15 Open</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Controls & Information */}
      <div className="w-80 border-l border-border bg-background overflow-y-auto">
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

              <div className="flex items-center justify-between">
                <Label htmlFor="earthquake-layer" className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  Earthquake Risk
                </Label>
                <Switch
                  id="earthquake-layer"
                  checked={mapLayers.earthquake}
                  onCheckedChange={() => toggleLayer('earthquake')}
                />
              </div>

              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="shelters-layer" className="flex items-center gap-2">
                    <Home className="h-3 w-3" />
                    Shelters
                  </Label>
                  <Switch
                    id="shelters-layer"
                    checked={mapLayers.shelters}
                    onCheckedChange={() => toggleLayer('shelters')}
                  />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <Label htmlFor="alerts-layer" className="flex items-center gap-2">
                    <AlertTriangle className="h-3 w-3" />
                    Active Alerts
                  </Label>
                  <Switch
                    id="alerts-layer"
                    checked={mapLayers.alerts}
                    onCheckedChange={() => toggleLayer('alerts')}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts on Map */}
        <Card className="m-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-danger" />
              Active Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{alert.title}</h4>
                  <Badge className={
                    alert.severity === 'critical' 
                      ? 'bg-danger text-danger-foreground'
                      : alert.severity === 'high'
                      ? 'bg-warning text-warning-foreground'
                      : 'bg-info text-info-foreground'
                  }>
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                  <MapPin className="h-3 w-3" />
                  <span>{alert.location}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <MapPin className="h-3 w-3 mr-1" />
                  Center on Map
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Shelter Status */}
        <Card className="m-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5 text-safe" />
              Shelter Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockShelters.slice(0, 3).map((shelter) => (
              <div key={shelter.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-sm">{shelter.name}</h4>
                  <Badge className={
                    shelter.status === 'open' 
                      ? 'border-safe text-safe'
                      : shelter.status === 'full'
                      ? 'border-warning text-warning'
                      : 'border-danger text-danger'
                  } variant="outline">
                    {shelter.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mb-2">
                  Capacity: {shelter.currentOccupancy}/{shelter.capacity}
                </div>
                <div className="w-full bg-muted rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full ${
                      shelter.currentOccupancy / shelter.capacity > 0.8 
                        ? 'bg-warning' 
                        : 'bg-safe'
                    }`}
                    style={{ width: `${(shelter.currentOccupancy / shelter.capacity) * 100}%` }}
                  ></div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <MapPin className="h-3 w-3 mr-1" />
                  View Location
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Map Legend */}
        <Card className="m-4">
          <CardHeader>
            <CardTitle>Risk Level Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-danger rounded"></div>
                <span className="text-sm">Critical (Immediate Action)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-warning rounded"></div>
                <span className="text-sm">High (Monitor Closely)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-info rounded"></div>
                <span className="text-sm">Medium (Watch)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-safe rounded"></div>
                <span className="text-sm">Low (Normal)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}