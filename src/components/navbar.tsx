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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const updateNavbar = useCallback(() => {
    const currentScrollY = window.scrollY;

    setIsScrolled(currentScrollY > 10);

    const scrollDelta = currentScrollY - lastScrollY.current;
    const significantScroll = Math.abs(scrollDelta) > 5;

    if (currentScrollY < 100) {
      setIsVisible(true);
    } else if (significantScroll) {
      if (scrollDelta > 0) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }

    lastScrollY.current = currentScrollY;
    ticking.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateNavbar]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: only run on pathname change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // lock body scroll when mobile menu is open
  useEffect(() => {
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
      <motion.header
        ref={headerRef}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "sticky top-0 left-0 right-0 z-50 w-full transition-all duration-200",
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b"
            : "bg-transparent",
        )}
      >
        <DiscordJoinBar />
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex h-16 items-center justify-between ">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-400">
                {siteConfig.name}
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6 ">
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
              <Button asChild className="cursor-pointer">
                <Link href="/join">Join Us</Link>
              </Button>
              <Button asChild variant={"outline"} className="cursor-pointer">
                <Link href="/showcase-event">
                  <CalendarPlus />
                </Link>
              </Button>
            </div>

            <div className="flex md:hidden items-center space-x-4 ">
              <Button
                className="cursor-pointer"
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? (
                  <motion.div
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    className="md:hidden 
                     "
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    className="md:hidden 
                      "
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Blurred backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-16 left-0 right-0 bg-background 
               shadow-lg z-50 md:hidden "
            >
              <div className="container mx-auto px-4 py-6">
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary p-4 rounded-md",
                        pathname === link.href
                          ? "bg-muted text-primary"
                          : "text-muted-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button asChild className="w-full mt-2 cursor-pointer">
                    <Link href="/join">Join Us</Link>
                  </Button>
                  <Button
                    asChild
                    variant="secondary"
                    className="w-full mt-2 cursor-pointer"
                  >
                    <Link href="/showcase-event">Showcase Event</Link>
                  </Button>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
