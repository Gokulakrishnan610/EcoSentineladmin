import * as React from "react"
import { cn } from "@/lib/utils"

interface NavigationTabsProps {
  children: React.ReactNode
  className?: string
}

interface NavigationTabsListProps {
  children: React.ReactNode
  className?: string
}

interface NavigationTabsTriggerProps {
  children: React.ReactNode
  value: string
  className?: string
  isActive?: boolean
  onClick?: () => void
}

interface NavigationTabsContentProps {
  children: React.ReactNode
  value: string
  className?: string
  isActive?: boolean
}

const NavigationTabs = React.forwardRef<HTMLDivElement, NavigationTabsProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("w-full", className)} {...props}>
      {children}
    </div>
  )
)
NavigationTabs.displayName = "NavigationTabs"

const NavigationTabsList = React.forwardRef<HTMLDivElement, NavigationTabsListProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-16 items-center justify-center rounded-none bg-white p-1 border-t border-gray-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
NavigationTabsList.displayName = "NavigationTabsList"

const NavigationTabsTrigger = React.forwardRef<HTMLButtonElement, NavigationTabsTriggerProps>(
  ({ className, children, isActive, onClick, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex flex-col items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
)
NavigationTabsTrigger.displayName = "NavigationTabsTrigger"

const NavigationTabsContent = React.forwardRef<HTMLDivElement, NavigationTabsContentProps>(
  ({ className, children, isActive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        !isActive && "hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
NavigationTabsContent.displayName = "NavigationTabsContent"

export { NavigationTabs, NavigationTabsList, NavigationTabsTrigger, NavigationTabsContent }