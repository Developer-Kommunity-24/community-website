"use client";
import { motion } from "framer-motion";
import { ArrowUp, Github, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { siteConfig } from "@/config/site";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let triggered = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    const footer = document.querySelector("#footer");
    if (footer) observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element
      ? element.scrollIntoView({ behavior: "smooth" })
      : router.push(`/${href}`);
  };

  const links = {
    quick: [
      { href: "/about", label: "About Us" },
      { href: "/structure", label: "Structure" },
      { href: "/communities", label: "Member Communities" },
      { href: "/calendar", label: "Events" },
      { href: "/projects", label: "Projects" },
    ],
    nav: [
      { href: "#vision", label: "Vision" },
      { href: "#team", label: "Team" },
      { href: "#upcoming-events", label: "Upcoming Events" },
      { href: "#testimonials", label: "Testimonials" },
    ],
  };

  const contactItems = [
    {
      href: "https://github.com/Developer-Kommunity-24",
      icon: Github,
      label: "DK24",
      clickable: true,
    },
    {
      icon: Mail,
      label: "dk24consortium@gmail.com",
      clickable: true,
      href: "mailto:dk24consortium@gmail.com",
    },
    {
      icon: MapPin,
      label: "Mangaluru, DK",
      clickable: false,
    },
  ];

  const LinkSection = ({
    title,
    items,
    isNav = false,
  }: {
    title: string;
    items: typeof links.quick;
    isNav?: boolean;
  }) => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 relative">
        {title}
        <div className="absolute -bottom-2 left-0 h-0.5 w-12 bg-linear-to-r from-emerald-500 to-teal-500" />
      </h3>
      <ul className="space-y-3">
        {items.map((link) => (
          <li key={link.href}>
            {isNav ? (
              <button
                type="button"
                onClick={() => handleNavClick(link.href)}
                className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 cursor-pointer text-left"
              >
                <div className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-emerald-500 transition-colors" />
                <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                  {link.label}
                </span>
              </button>
            ) : (
              <Link
                href={link.href}
                className="group flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300"
              >
                <div className="w-1 h-1 rounded-full bg-slate-400 group-hover:bg-emerald-500 transition-colors" />
                <span className="text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                  {link.label}
                </span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer
      id="footer"
      className="border-t bg-linear-to-br from-muted/60 via-muted/40 to-muted/60 shadow-inner"
    >
      <div className="relative container mx-auto px-4 py-20 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.1, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10"
        >
          <motion.div
            variants={fadeInUp}
            className="md:col-span-2 lg:col-span-2 space-y-8"
          >
            <Link href="/" className="inline-block group">
              <span className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-linear-to-r from-emerald-600 via-green-500 to-teal-500 dark:from-emerald-400 dark:via-green-400 dark:to-teal-400 hover:scale-105 transition-transform">
                {siteConfig.name}
              </span>
            </Link>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-md leading-relaxed">
              {siteConfig.tagline}
            </p>
            <div className="space-y-4">
              {contactItems.map((item) => (
                <div key={item.label}>
                  {item.clickable && item.href ? (
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-slate-600 dark:text-slate-300 group cursor-pointer hover:translate-x-1 transition-transform"
                    >
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
                        <item.icon className="h-4 w-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 group hover:translate-x-1 transition-transform">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
                        <item.icon className="h-4 w-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <LinkSection title="Quick Links" items={links.quick} />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <LinkSection title="Navigation" items={links.nav} isNav />
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="border-t border-slate-200 dark:border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <Button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              variant="ghost"
              size="sm"
              className="group bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200 dark:hover:border-emerald-700 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 rounded-xl hover:scale-105 hover:cursor-pointer"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Back to Top
            </Button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
