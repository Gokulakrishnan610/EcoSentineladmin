import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertCardVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        danger: "border-danger/50 text-danger-foreground bg-danger/10 [&>svg]:text-danger",
        warning: "border-warning/50 text-warning-foreground bg-warning/10 [&>svg]:text-warning",
        safe: "border-safe/50 text-safe-foreground bg-safe/10 [&>svg]:text-safe",
        info: "border-info/50 text-info-foreground bg-info/10 [&>svg]:text-info",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const AlertCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertCardVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertCardVariants({ variant }), className)}
    {...props}
  />
))
AlertCard.displayName = "AlertCard"

const AlertCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertCardTitle.displayName = "AlertCardTitle"

const AlertCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertCardDescription.displayName = "AlertCardDescription"

const AlertCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("", className)}
    {...props}
  />
))
AlertCardContent.displayName = "AlertCardContent"

export { AlertCard, AlertCardTitle, AlertCardDescription, AlertCardContent }