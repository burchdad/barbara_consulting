"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export type SwarmNode = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  position: {
    top: string;
    left: string;
  };
};

export function AgentSwarm({ nodes }: { nodes: SwarmNode[] }) {
  const [activeId, setActiveId] = useState(nodes[0]?.id ?? "");
  const activeNode = nodes.find((node) => node.id === activeId) ?? nodes[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.6, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const activeNodeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl ring-1 ring-cyan-300/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(192,132,252,0.12),_transparent_16%)]" />
      
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
        <svg className="absolute inset-0 h-full w-full opacity-[0.03]" preserveAspectRatio="none">
          <defs>
            <pattern id="grid-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="url(#grid-gradient)" strokeWidth="1" />
            </pattern>
            <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
              <stop offset="100%" stopColor="rgba(14, 165, 233, 0.1)" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.08),transparent_70%)]"
          animate={{
            background: [
              "radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.08),transparent_70%)",
              "radial-gradient(circle_at_45%_55%,rgba(56,189,248,0.12),transparent_70%)",
              "radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.08),transparent_70%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative h-[620px] overflow-hidden rounded-[2rem] border border-cyan-200/5 bg-slate-950/90">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.14),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(14,165,233,0.08),transparent_24%)]" />
        
        <motion.div
          className="relative h-full w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {nodes.map((node, index) => (
            <motion.button
              key={node.id}
              type="button"
              onMouseEnter={() => setActiveId(node.id)}
              onFocus={() => setActiveId(node.id)}
              className="absolute max-w-[180px] rounded-full border border-cyan-200/15 bg-slate-900/95 px-4 py-3 text-left text-sm text-white shadow-[0_20px_80px_rgba(15,23,42,0.3)] transition duration-300 hover:scale-105 hover:border-cyan-200/40 hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
              style={node.position}
              variants={nodeVariants}
              whileHover={{ scale: 1.12, boxShadow: "0 25px 100px rgba(56, 189, 248, 0.25)" }}
            >
              <span className="block text-[11px] uppercase tracking-[0.3em] text-cyan-200/80">{node.subtitle}</span>
              <span className="mt-2 block text-base font-black uppercase leading-tight tracking-[0.04em] text-white">
                {node.title}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="relative mt-8 rounded-[2rem] border border-cyan-200/10 bg-slate-950/95 p-6 backdrop-blur-sm"
        variants={activeNodeVariants}
        initial="hidden"
        animate="visible"
        key={activeId}
      >
        <p className="text-xs uppercase tracking-[0.32em] text-cyan-300">Agent swarm insight</p>
        <h3 className="mt-3 text-2xl font-black uppercase text-white">{activeNode.title}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-300">{activeNode.description}</p>
      </motion.div>
    </div>
  );
}
