import React from "react"
import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"
import Image from "next/image"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <ErrorBoundary>{children}</ErrorBoundary>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

function ErrorBoundary({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

function Loading() {
  return <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <Image
      width={1080}
      height={1080}
      src="/logo.svg"
      alt="DK24 Logo"
      className="w-20 h-20 mb-6 animate-pulse"
    />
    <div className="text-lg font-medium text-muted-foreground">Loading...</div>
  </div>
}

const { Suspense } = React