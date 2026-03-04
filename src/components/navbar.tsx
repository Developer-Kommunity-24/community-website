"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { DiscordJoinBar } from "@/components/discord-join-bar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setHasScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const ticking = useRef(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const updateHeight = useCallback(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  const updateNavbar = useCallback(() => {
    const currentScrollY = window.scrollY;
    setHasScrolled(currentScrollY > 10);

    const scrollDelta = currentScrollY - lastScrollY.current;
    const significantScroll = Math.abs(scrollDelta) > 5;

    if (currentScrollY < 100) {
      setIsVisible(true);
    } else if (significantScroll) {
      if (scrollDelta > 0 && currentScrollY > 50) {
        setIsVisible(false);
      } else if (scrollDelta < 0) {
        setIsVisible(true);
      }
    }
    lastScrollY.current = currentScrollY;
    ticking.current = false;
  }, []);

  useEffect(() => {
    updateHeight();
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeight);
    };
  }, [updateNavbar, updateHeight]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset navbar state on route change
  useEffect(() => {
    setIsOpen(false);
    setIsVisible(true);
    lastScrollY.current = window.scrollY;
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/structure", label: "Structure" },
    { href: "/communities", label: "Communities" },
    { href: "/calendar", label: "Calendar" },
    { href: "/projects", label: "Projects" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 z-[100] w-full transition-all duration-300",
          isVisible ? "translate-y-0" : "-translate-y-full",
          isScrolled
            ? "bg-background/95 backdrop-blur-lg border-b shadow-sm"
            : "bg-white/80 backdrop-blur-lg",
        )}
      >
        <DiscordJoinBar />
        <div className="container mx-auto px-4 max-w-full">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-400">
                {siteConfig.name}
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-2">
              <Button asChild size="sm" className="cursor-pointer">
                <Link href="/join">Join Us</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="cursor-pointer gap-2"
              >
                <Link href="/showcase-event">
                  <CalendarPlus className="h-4 w-4" />
                  <span className="hidden lg:inline">Event</span>
                </Link>
              </Button>
            </div>

            <div className="flex md:hidden items-center space-x-2 mr-4">
              <Button
                className="cursor-pointer"
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden border-t bg-background/95 backdrop-blur-lg overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4">
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary p-3 rounded-md",
                        pathname === link.href
                          ? "bg-muted text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                    <Button asChild className="w-full cursor-pointer">
                      <Link href="/join">Join Us</Link>
                    </Button>
                    <Button
                      asChild
                      variant="secondary"
                      className="w-full cursor-pointer gap-2"
                    >
                      <Link href="/showcase-event">
                        <CalendarPlus className="h-4 w-4" />
                        Showcase Event
                      </Link>
                    </Button>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div style={{ height: `${headerHeight}px` }} className="block" />
    </>
  );
}
