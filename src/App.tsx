import { useState } from 'react'
import { 
  LayoutDashboard, 
  Map, 
  FileText, 
  Package,
  Menu,
  Bell,
  User
} from 'lucide-react'
import { DashboardPage } from './pages/DashboardPage'
import { RiskMapsPage } from './pages/RiskMapsPage'
import { ReportsPage } from './pages/ReportsPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'

function AppSidebar({ activePage, setActivePage }: { activePage: string; setActivePage: (page: string) => void }) {
  const [collapsed, setCollapsed] = useState(false)

  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "risk-maps", label: "Risk Maps", icon: Map },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "resources", label: "Resources", icon: Package },
  ]

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-white">EcoSentinel</h2>
                <p className="text-xs text-gray-400">Admin Dashboard</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = activePage === item.id
            return (
              <li key={item.id}>
                <button 
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-gray-800 text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default function App() {
  const [activePage, setActivePage] = useState("dashboard")

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />
      case "risk-maps":
        return <RiskMapsPage />
      case "reports":
        return <ReportsPage />
      case "resources":
        return <ResourcesPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <div className="h-screen flex bg-gray-100">
      <AppSidebar activePage={activePage} setActivePage={setActivePage} />
      
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {activePage === "dashboard" && "Dashboard Overview"}
              {activePage === "risk-maps" && "Interactive Risk Maps"}
              {activePage === "reports" && "Citizen Reports"}
              {activePage === "resources" && "Emergency Resources"}
            </h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge className="ml-2 bg-red-500 text-white">5</Badge>
              </Button>
              
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Admin User
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {/* Breadcrumb */}
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
                <li>
                  <button 
                    onClick={() => setActivePage("dashboard")}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Dashboard
                  </button>
                </li>
                {activePage !== "dashboard" && (
                  <>
                    <li className="text-gray-400">/</li>
                    <li className="text-gray-900 text-sm font-medium capitalize">
                      {activePage.replace('-', ' ')}
                    </li>
                  </>
                )}
              </ol>
            </nav>
          </div>
          
          {renderPage()}
        </main>

        {/* Quick Navigation */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex gap-2">
            <Button 
              variant={activePage === "dashboard" ? "default" : "outline"}
              size="sm"
              onClick={() => setActivePage("dashboard")}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            <Button 
              variant={activePage === "risk-maps" ? "default" : "outline"}
              size="sm"
              onClick={() => setActivePage("risk-maps")}
            >
              <Map className="h-4 w-4 mr-2" />
              Risk Maps
            </Button>
            <Button 
              variant={activePage === "reports" ? "default" : "outline"}
              size="sm"
              onClick={() => setActivePage("reports")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </Button>
            <Button 
              variant={activePage === "resources" ? "default" : "outline"}
              size="sm"
              onClick={() => setActivePage("resources")}
            >
              <Package className="h-4 w-4 mr-2" />
              Resources
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}