"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { AntiGravityBackground } from "@/components/Antigravitybackground";

export function HeroSection() {
  return (
    <section className="relative container justify-center text-center flex mx-auto px-4 py-12 md:py-24 lg:py-32 overflow-hidden">
      {/* Anti-gravity particle field — scoped only to this section */}
      <AntiGravityBackground />

      <div className="relative z-10 grid lg:grid-cols-2 max-w-7xl gap-8 items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-6"
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Connecting College{" "}
              <span className="bg-clip-text text-transparent bg-linear-to-r from-green-500 to-green-400">
                Tech Communities
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              {siteConfig.tagline}
            </p>
          </div>
          <div className="flex flex-col justify-center sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/join">Join the Community</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects">Explore Projects</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative h-100 rounded-lg overflow-hidden bg-[#0E0E0E]"
        >
          <Image
            src="/logo_new.png"
            alt="DK24 Logo"
            fill
            className="object-contain p-8"
            onError={(e) => {
              console.error("Image failed to load:", e);
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
