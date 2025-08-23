import { useState } from "react"
import { FileText, Filter, Search, MapPin, Clock, CheckCircle, AlertTriangle, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockReports } from "@/lib/mock-data"

export function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    severity: 'all',
    status: 'all',
    location: 'all'
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-danger text-danger-foreground'
      case 'high':
        return 'bg-warning text-warning-foreground'
      case 'medium':
        return 'bg-info text-info-foreground'
      case 'low':
        return 'bg-safe text-safe-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'border-safe text-safe'
      case 'pending':
        return 'border-warning text-warning'
      case 'resolved':
        return 'border-info text-info'
      default:
        return 'border-muted text-muted-foreground'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'incident':
        return <AlertTriangle className="h-4 w-4" />
      case 'damage':
        return <FileText className="h-4 w-4" />
      case 'help_needed':
        return <AlertTriangle className="h-4 w-4 text-danger" />
      case 'road_closure':
        return <MapPin className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const filteredReports = mockReports.filter(report => {
    return (
      (filters.search === '' || 
       report.title.toLowerCase().includes(filters.search.toLowerCase()) ||
       report.description.toLowerCase().includes(filters.search.toLowerCase()) ||
       report.location.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.type === 'all' || report.type === filters.type) &&
      (filters.severity === 'all' || report.severity === filters.severity) &&
      (filters.status === 'all' || report.status === filters.status)
    )
  })

  const selectedReportData = mockReports.find(report => report.id === selectedReport)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Citizen Reports</h1>
          <p className="text-muted-foreground">
            Monitor and manage incident reports from citizens
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {filteredReports.length} Reports
          </Badge>
          <Badge className="bg-warning text-warning-foreground">
            {mockReports.filter(r => r.status === 'pending').length} Pending
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reports..."
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="incident">Incident</SelectItem>
                <SelectItem value="damage">Damage</SelectItem>
                <SelectItem value="help_needed">Help Needed</SelectItem>
                <SelectItem value="road_closure">Road Closure</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.severity} onValueChange={(value) => setFilters({...filters, severity: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => setFilters({search: '', type: 'all', severity: 'all', status: 'all', location: 'all'})}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reports List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Reporter</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{report.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-2">
                        {report.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(report.type)}
                      <span className="capitalize">{report.type.replace('_', ' ')}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(report.severity)}>
                      {report.severity.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="text-sm">{report.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>{report.reportedBy}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-sm">{formatTimestamp(report.timestamp)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(report.status)}>
                      {report.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedReport(report.id)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Report Details</DialogTitle>
                          </DialogHeader>
                          {selectedReportData && (
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-1">Title</h4>
                                  <p className="text-sm">{selectedReportData.title}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-1">Type</h4>
                                  <div className="flex items-center gap-2">
                                    {getTypeIcon(selectedReportData.type)}
                                    <span className="text-sm capitalize">
                                      {selectedReportData.type.replace('_', ' ')}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-1">Severity</h4>
                                  <Badge className={getSeverityColor(selectedReportData.severity)}>
                                    {selectedReportData.severity.toUpperCase()}
                                  </Badge>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-1">Status</h4>
                                  <Badge variant="outline" className={getStatusColor(selectedReportData.status)}>
                                    {selectedReportData.status.toUpperCase()}
                                  </Badge>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-medium mb-1">Description</h4>
                                <p className="text-sm">{selectedReportData.description}</p>
                              </div>
                              
                              <div>
                                <h4 className="font-medium mb-1">Location</h4>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  <span className="text-sm">{selectedReportData.location}</span>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-medium mb-1">Reported By</h4>
                                  <p className="text-sm">{selectedReportData.reportedBy}</p>
                                </div>
                                <div>
                                  <h4 className="font-medium mb-1">Timestamp</h4>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span className="text-sm">{formatTimestamp(selectedReportData.timestamp)}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex gap-2 pt-4">
                                {selectedReportData.status === 'pending' && (
                                  <Button className="bg-safe hover:bg-safe/90 text-safe-foreground">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Verify Report
                                  </Button>
                                )}
                                <Button variant="outline">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  View on Map
                                </Button>
                                <Button variant="outline">
                                  Assign Team
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredReports.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium text-muted-foreground">No Reports Found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}