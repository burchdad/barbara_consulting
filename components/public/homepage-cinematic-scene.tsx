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
import {
  backgroundConfig,
  normalizeSceneGlow,
  normalizeSceneType,
  type SceneGlow,
  type SceneType,
} from "@/lib/config/background";

type HomepageCinematicSceneProps = {
  children: React.ReactNode;
  sceneSettings?: {
    type?: string | SceneType | null;
    glow?: string | SceneGlow | null;
    particles?: boolean | null;
    parallax?: boolean | null;
  };
};

export function HomepageCinematicScene({ children, sceneSettings }: HomepageCinematicSceneProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const cursorX = useMotionValue(50);
  const cursorY = useMotionValue(34);
  const sceneType = normalizeSceneType(sceneSettings?.type ?? backgroundConfig.type);
  const sceneGlow = normalizeSceneGlow(sceneSettings?.glow ?? backgroundConfig.glow);
  const sceneParticles = sceneSettings?.particles ?? backgroundConfig.particles;
  const sceneParallax = sceneSettings?.parallax ?? backgroundConfig.parallax;
  const parallaxEnabled = sceneParallax && !prefersReducedMotion;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const visualX = useTransform(scrollYProgress, [0, 1], ["-2.8%", "2%"]);
  const visualY = useTransform(scrollYProgress, [0, 1], ["-1.2%", "1.3%"]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1.07, 1.14]);

  const glowX = useTransform(scrollYProgress, [0, 1], ["-2.4%", "2.6%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0.4%", "-2.1%"]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.95, 0.68]);

  const particleY = useTransform(scrollYProgress, [0, 1], ["0%", "3.8%"]);
  const particleOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.04, 0.08, 0.04]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.4], [0, -14]);

  const glowColorMap = {
    red: "255, 64, 64",
    blue: "56, 189, 248",
    green: "34, 197, 94",
    gold: "250, 204, 21",
  } as const;
  const glowColor = glowColorMap[sceneGlow];
  const cursorGlow = useMotionTemplate`radial-gradient(circle at ${cursorX}% ${cursorY}%, rgba(${glowColor}, 0.2), rgba(${glowColor}, 0) 38%)`;
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
      className={`homepage-cinematic-root scene-theme-${sceneType} scene-glow-${sceneGlow} relative overflow-x-clip`}
      onPointerMove={handlePointerMove}
    >
      <div aria-hidden className="homepage-cinematic-stage">
        <div className="homepage-space-layer" />
        <motion.div
          className="homepage-visual-layer"
          style={
            !parallaxEnabled
              ? undefined
              : {
                  x: visualX,
                  y: visualY,
                  scale: visualScale,
                }
          }
        />
        <motion.div
          className="homepage-atmosphere-layer"
          style={parallaxEnabled ? { x: glowX, y: glowY, opacity: glowOpacity } : undefined}
        />
        <motion.div
          aria-hidden
          className="homepage-orbital-arcs-layer"
          style={prefersReducedMotion ? { opacity: 0.08 } : undefined}
        />
        {sceneParticles ? (
          <motion.div
            className="homepage-particle-layer"
            style={parallaxEnabled ? { y: particleY, opacity: particleOpacity } : undefined}
          />
        ) : null}
        <motion.div
          className="homepage-primary-glow-layer"
          style={parallaxEnabled ? { x: glowX, y: glowY, opacity: glowOpacity } : undefined}
        />
        <div className="homepage-scanline-layer" />
        <motion.div
          className="homepage-cursor-glow-layer"
          style={parallaxEnabled ? { backgroundImage: cursorGlow } : undefined}
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
