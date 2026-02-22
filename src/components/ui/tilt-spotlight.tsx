"use client";

import { useRef, useState, useCallback, ReactNode } from "react";

interface TiltSpotlightProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
}

export function TiltSpotlight({
  children,
  className = "",
  maxTilt = 12,
  scale = 1.025,
}: TiltSpotlightProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const nx = (e.clientX - cx) / (rect.width / 2);
      const ny = (e.clientY - cy) / (rect.height / 2);

      setTilt({
        x: -ny * maxTilt,
        y: nx * maxTilt,
      });

      const gx = ((e.clientX - rect.left) / rect.width) * 100;
      const gy = ((e.clientY - rect.top) / rect.height) * 100;

      setGlare({ x: gx, y: gy, opacity: 0.18 });
    },
    [maxTilt]
  );

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare((g) => ({ ...g, opacity: 0 }));
  };

  return (
    <div
      ref={wrapperRef}
      className={`group ${className}`}
      style={{
        perspective: "900px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
            isHovered ? scale : 1
          })`,
          transition: isHovered
            ? "transform 0.08s linear"
            : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative"
      >
        {/* Spotlight Glare */}
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 65%)`,
            transition: isHovered
              ? "opacity 0.08s linear"
              : "opacity 0.4s ease",
          }}
        />

        {children}
      </div>
    </div>
  );
          }
