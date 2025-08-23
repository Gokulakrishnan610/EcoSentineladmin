import { AlertTriangle, FileText, MapPin, Home, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts"
import { mockDashboardMetrics, mockAlerts } from "@/lib/mock-data"

export function DashboardPage() {
  // Mock chart data for Tamil Nadu
  const alertTrendData = [
    { name: 'Jan', alerts: 8, resolved: 7 },
    { name: 'Feb', alerts: 12, resolved: 11 },
    { name: 'Mar', alerts: 10, resolved: 9 },
    { name: 'Apr', alerts: 18, resolved: 16 },
    { name: 'May', alerts: 25, resolved: 22 },
    { name: 'Jun', alerts: 35, resolved: 30 },
  ]

  const disasterTypeData = [
    { name: 'Floods', value: 45, color: '#ef4444' },
    { name: 'Cyclones', value: 25, color: '#f59e0b' },
    { name: 'Landslides', value: 20, color: '#3b82f6' },
    { name: 'Coastal Storms', value: 10, color: '#10b981' },
  ]

  const responsesData = [
    { name: 'Mon', responses: 24 },
    { name: 'Tue', responses: 31 },
    { name: 'Wed', responses: 28 },
    { name: 'Thu', responses: 42 },
    { name: 'Fri', responses: 38 },
    { name: 'Sat', responses: 35 },
    { name: 'Sun', responses: 29 },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-danger/30 bg-danger/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-danger" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">{mockDashboardMetrics.activeAlerts}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last hour - Chennai & Cuddalore areas
            </p>
          </CardContent>
        </Card>

        <Card className="border-warning/30 bg-warning/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Citizen Reports</CardTitle>
            <FileText className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{mockDashboardMetrics.citizenReports}</div>
            <p className="text-xs text-muted-foreground">
              +8 in last 24h - Mostly from coastal districts
            </p>
          </CardContent>
        </Card>

        <Card className="border-info/30 bg-info/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High-Risk Zones</CardTitle>
            <MapPin className="h-4 w-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">{mockDashboardMetrics.highRiskZones}</div>
            <p className="text-xs text-muted-foreground">
              3 zones elevated - Nilgiris, Cuddalore, Chennai
            </p>
          </CardContent>
        </Card>

        <Card className="border-safe/30 bg-safe/5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Shelters</CardTitle>
            <Home className="h-4 w-4 text-safe" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-safe">{mockDashboardMetrics.activeShelters}</div>
            <p className="text-xs text-muted-foreground">
              {mockDashboardMetrics.availableShelterCapacity} capacity remaining
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Alert Trends - Tamil Nadu (Last 6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={alertTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="alerts" stroke="hsl(var(--danger))" strokeWidth={2} />
                <Line type="monotone" dataKey="resolved" stroke="hsl(var(--safe))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Disaster Types */}
        <Card>
          <CardHeader>
            <CardTitle>Tamil Nadu Disaster Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={disasterTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {disasterTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Response Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Tamil Nadu Emergency Response Activity (This Week)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={responsesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="responses" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Critical Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Tamil Nadu Critical Alerts Requiring Attention
            </span>
            <Button variant="outline" size="sm">
              View All Alerts
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAlerts
              .filter(alert => alert.severity === 'critical' || alert.severity === 'high')
              .map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                      alert.severity === 'critical' ? 'text-danger' : 'text-warning'
                    }`} />
                    <div>
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground">{alert.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={
                      alert.severity === 'critical' 
                        ? 'bg-danger text-danger-foreground'
                        : 'bg-warning text-warning-foreground'
                    }>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Respond
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}