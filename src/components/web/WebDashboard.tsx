import { useState } from "react"
import { 
  LayoutDashboard, 
  Map, 
  FileText, 
  Package,
  Menu,
  Bell,
  User
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DashboardPage } from "./pages/DashboardPage"
import { RiskMapsPage } from "./pages/RiskMapsPage"
import { ReportsPage } from "./pages/ReportsPage"
import { ResourcesPage } from "./pages/ResourcesPage"

function AppSidebar() {
  const { state } = useSidebar()
  const collapsed = state === "collapsed"

  const navigation = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "risk-maps", label: "Risk Maps", icon: Map },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "resources", label: "Resources", icon: Package },
  ]

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"}>
      <SidebarContent>
        {/* Logo/Brand */}
        <div className="p-4 border-b border-sidebar-border">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-bold text-sidebar-foreground">EcoSentinel</h2>
                <p className="text-xs text-sidebar-foreground/70">Authority Dashboard</p>
              </div>
            </div>
          ) : (
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <button className="flex items-center gap-2 w-full">
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.label}</span>}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export function WebDashboard() {
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">
                {activePage === "dashboard" && "Dashboard Overview"}
                {activePage === "risk-maps" && "Risk Maps"}
                {activePage === "reports" && "Citizen Reports"}
                {activePage === "resources" && "Emergency Resources"}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
                <Badge className="ml-2 bg-danger text-danger-foreground">5</Badge>
              </Button>
              
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Admin User
              </Button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
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
    </SidebarProvider>
  )
}