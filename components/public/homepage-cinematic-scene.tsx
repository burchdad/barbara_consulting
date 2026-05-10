"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

type HomepageCinematicSceneProps = {
  children: React.ReactNode;
};

export function HomepageCinematicScene({ children }: HomepageCinematicSceneProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const cursorX = useMotionValue(50);
  const cursorY = useMotionValue(34);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const earthX = useTransform(scrollYProgress, [0, 1], ["-2.8%", "2%"]);
  const earthY = useTransform(scrollYProgress, [0, 1], ["-1.2%", "1.3%"]);
  const earthScale = useTransform(scrollYProgress, [0, 1], [1.07, 1.14]);

  const glowX = useTransform(scrollYProgress, [0, 1], ["-2.4%", "2.6%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0.4%", "-2.1%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.95, 0.68]);

  const particleY = useTransform(scrollYProgress, [0, 1], ["0%", "3.8%"]);
  const particleOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.04, 0.08, 0.04]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.4], [0, -14]);

  const cursorGlow = useMotionTemplate`radial-gradient(circle at ${cursorX}% ${cursorY}%, rgba(255, 64, 64, 0.16), rgba(255, 64, 64, 0) 38%)`;
  const heroShiftY = useMotionTemplate`${heroTextY}px`;

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (prefersReducedMotion || event.pointerType !== "mouse") {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    cursorX.set(Math.max(0, Math.min(100, x)));
    cursorY.set(Math.max(0, Math.min(100, y)));
  }

  return (
    <main
      ref={containerRef}
      className="homepage-cinematic-root relative overflow-x-clip"
      onPointerMove={handlePointerMove}
    >
      <div aria-hidden className="homepage-cinematic-stage">
        <div className="homepage-space-layer" />
        <motion.div
          className="homepage-earth-layer"
          style={
            prefersReducedMotion
              ? undefined
              : {
                  x: earthX,
                  y: earthY,
                  scale: earthScale,
                }
          }
        />
        <motion.div
          className="homepage-atmosphere-layer"
          style={prefersReducedMotion ? undefined : { x: glowX, y: glowY, opacity: glowOpacity }}
        />
        <motion.div
          aria-hidden
          className="homepage-orbital-arcs-layer"
          style={prefersReducedMotion ? { opacity: 0.08 } : undefined}
        />
        <motion.div
          className="homepage-particle-layer"
          style={prefersReducedMotion ? undefined : { y: particleY, opacity: particleOpacity }}
        />
        <motion.div
          className="homepage-red-glow-layer"
          style={prefersReducedMotion ? undefined : { x: glowX, y: glowY, opacity: glowOpacity }}
        />
        <div className="homepage-scanline-layer" />
        <motion.div
          className="homepage-cursor-glow-layer"
          style={prefersReducedMotion ? undefined : { backgroundImage: cursorGlow }}
        />
        <div className="homepage-edge-vignette-layer" />
        <div className="homepage-depth-vignette" />
      </div>

      <motion.div
        className="homepage-cinematic-content relative z-10"
        style={prefersReducedMotion ? undefined : { ["--hero-shift-y" as string]: heroShiftY }}
      >
        {children}
      </motion.div>
      <div aria-hidden className="homepage-scene-release" />
    </main>
  );
}
