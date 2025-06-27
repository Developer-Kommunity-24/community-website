import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin, Instagram } from "lucide-react"
import { siteConfig } from "@/config/site"

export default function Footer() {
  return (
    <footer className="border-t bg-gradient-to-br from-muted/60 via-muted/40 to-muted/60 shadow-inner">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-400 drop-shadow">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-base text-muted-foreground max-w-xs">
              {siteConfig.tagline}
            </p>
            <div className="flex space-x-3 mt-4">
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="transition hover:bg-green-100 hover:text-green-600"
              >
                <Link
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="transition hover:bg-gray-100 hover:text-gray-900"
              >
                <Link
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="transition hover:bg-blue-100 hover:text-blue-700"
              >
                <Link
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="transition hover:bg-pink-100 hover:text-pink-600"
              >
                <Link
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-base font-semibold tracking-wide text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  Community Structure
                </Link>
              </li>
              <li>
                <Link
                  href="/communities"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  Member Communities
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-muted-foreground/10 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
