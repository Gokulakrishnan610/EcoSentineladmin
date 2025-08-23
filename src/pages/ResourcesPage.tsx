import { useState } from "react"
import { Package, Home, Truck, Users, Phone, MapPin, Plus, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockShelters } from "@/lib/mock-data"

export function ResourcesPage() {
  const [activeTab, setActiveTab] = useState("shelters")

  // Mock data for additional resources
  const reliefSupplies = [
    { id: '1', item: 'Food Packages', quantity: 1200, unit: 'packs', location: 'Central Warehouse', status: 'available' },
    { id: '2', item: 'Drinking Water', quantity: 5000, unit: 'liters', location: 'Multiple Locations', status: 'available' },
    { id: '3', item: 'Medical Supplies', quantity: 150, unit: 'kits', location: 'Regional Hospital', status: 'low' },
    { id: '4', item: 'Blankets', quantity: 800, unit: 'pieces', location: 'Warehouse B', status: 'available' },
    { id: '5', item: 'Emergency Radios', quantity: 45, unit: 'units', location: 'Command Center', status: 'low' },
  ]

  const rescueTeams = [
    { id: '1', name: 'Alpha Team', members: 8, leader: 'Captain Rodriguez', specialization: 'Water Rescue', status: 'available', location: 'Station 1' },
    { id: '2', name: 'Bravo Team', members: 6, leader: 'Lt. Santos', specialization: 'Search & Rescue', status: 'deployed', location: 'Marikina Area' },
    { id: '3', name: 'Charlie Team', members: 10, leader: 'Sgt. Cruz', specialization: 'Medical Response', status: 'available', location: 'Station 2' },
    { id: '4', name: 'Delta Team', members: 7, leader: 'Cpl. Garcia', specialization: 'Technical Rescue', status: 'standby', location: 'Station 3' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
      case 'open':
        return 'border-safe text-safe'
      case 'low':
      case 'standby':
        return 'border-warning text-warning'
      case 'full':
      case 'deployed':
        return 'border-info text-info'
      case 'closed':
        return 'border-danger text-danger'
      default:
        return 'border-muted text-muted-foreground'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Emergency Resources</h1>
          <p className="text-muted-foreground">
            Manage shelters, supplies, and rescue teams
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Resource
        </Button>
      </div>

      {/* Resource Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-safe/30 bg-safe/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shelters</CardTitle>
            <Home className="h-4 w-4 text-safe" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-safe">15</div>
            <p className="text-xs text-muted-foreground">
              2,500 total capacity
            </p>
          </CardContent>
        </Card>

        <Card className="border-warning/30 bg-warning/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Supply Inventory</CardTitle>
            <Package className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">7,195</div>
            <p className="text-xs text-muted-foreground">
              Items across categories
            </p>
          </CardContent>
        </Card>

        <Card className="border-info/30 bg-info/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rescue Teams</CardTitle>
            <Users className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">4</div>
            <p className="text-xs text-muted-foreground">
              31 total personnel
            </p>
          </CardContent>
        </Card>

        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transport Units</CardTitle>
            <Truck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12</div>
            <p className="text-xs text-muted-foreground">
              9 available, 3 deployed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Resource Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="shelters">
            <Home className="h-4 w-4 mr-2" />
            Shelters
          </TabsTrigger>
          <TabsTrigger value="supplies">
            <Package className="h-4 w-4 mr-2" />
            Relief Supplies
          </TabsTrigger>
          <TabsTrigger value="teams">
            <Users className="h-4 w-4 mr-2" />
            Rescue Teams
          </TabsTrigger>
        </TabsList>

        <TabsContent value="shelters" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evacuation Centers & Shelters</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shelter Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Occupancy</TableHead>
                    <TableHead>Amenities</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockShelters.map((shelter) => (
                    <TableRow key={shelter.id}>
                      <TableCell className="font-medium">{shelter.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{shelter.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>{shelter.capacity}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{shelter.currentOccupancy}</span>
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                shelter.currentOccupancy / shelter.capacity > 0.8 
                                  ? 'bg-warning' 
                                  : shelter.currentOccupancy / shelter.capacity > 0.6
                                  ? 'bg-info'
                                  : 'bg-safe'
                              }`}
                              style={{ width: `${(shelter.currentOccupancy / shelter.capacity) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {shelter.amenities.slice(0, 3).map((amenity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                          {shelter.amenities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{shelter.amenities.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <span className="text-sm">{shelter.contact}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(shelter.status)}>
                          {shelter.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MapPin className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supplies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relief Supply Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Supply Item</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reliefSupplies.map((supply) => (
                    <TableRow key={supply.id}>
                      <TableCell className="font-medium">{supply.item}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${
                          supply.status === 'low' ? 'text-warning' : ''
                        }`}>
                          {supply.quantity.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>{supply.unit}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{supply.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(supply.status)}>
                          {supply.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Truck className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Response Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Name</TableHead>
                    <TableHead>Team Leader</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rescueTeams.map((team) => (
                    <TableRow key={team.id}>
                      <TableCell className="font-medium">{team.name}</TableCell>
                      <TableCell>{team.leader}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{team.members} members</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {team.specialization}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{team.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(team.status)}>
                          {team.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <MapPin className="h-3 w-3" />
                          </Button>
                          {team.status === 'available' && (
                            <Button size="sm" className="bg-primary hover:bg-primary/90">
                              Deploy
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}