"use client"

interface BackgroundPatternProps {
  children: React.ReactNode
  variant?: "default" | "hero" | "minimal"
}

export function BackgroundPattern({ children, variant = "default" }: BackgroundPatternProps) {
  return (
    <div className="relative min-h-screen">
      {/* Main subtle background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-white via-green-50/10 to-green-50/5 dark:from-background dark:via-green-950/5 dark:to-green-950/3 -z-50" />
      
      {/* Subtle dot pattern overlay */}
      <div 
        className="fixed inset-0 opacity-[0.015] dark:opacity-[0.02] -z-40"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(34 197 94) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Very subtle grid lines */}
      <div 
        className="fixed inset-0 opacity-[0.008] dark:opacity-[0.012] -z-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px'
        }}
      />

      {/* Gentle corner gradients */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-100/5 to-transparent dark:from-green-800/3 dark:to-transparent blur-3xl -z-30" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-green-100/5 to-transparent dark:from-green-800/3 dark:to-transparent blur-3xl -z-30" />
      
      {/* Hero variant - slightly more visible */}
      {variant === "hero" && (
        <div className="fixed inset-0 -z-35">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-green-100/8 to-transparent dark:from-green-800/4 dark:to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-tl from-green-100/8 to-transparent dark:from-green-800/4 dark:to-transparent rounded-full blur-3xl" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
