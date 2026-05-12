"use client";

import { useState, useMemo } from "react";
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

// Generate edge connections between nodes
function generateEdges(nodeCount: number) {
  const edges: Array<[number, number]> = [];
  // Create a network where each node connects to 2-3 nearby nodes
  for (let i = 0; i < nodeCount; i++) {
    const connectTo = [(i + 1) % nodeCount, (i + 2) % nodeCount];
    if (Math.random() > 0.3 && i + 3 < nodeCount) connectTo.push((i + 3) % nodeCount);
    connectTo.forEach((j) => {
      if (i < j) edges.push([i, j]);
    });
  }
  return edges;
}

export function AgentSwarm({ nodes }: { nodes: SwarmNode[] }) {
  const [activeId, setActiveId] = useState(nodes[0]?.id ?? "");
  const activeNode = nodes.find((node) => node.id === activeId) ?? nodes[0];

  const edges = useMemo(() => generateEdges(nodes.length), [nodes.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.15,
      },
    },
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
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

  // Parse positions from percentage strings to pixel values
  const nodePositions = nodes.map((node) => {
    const top = parseFloat(node.position.top);
    const left = parseFloat(node.position.left);
    return { top, left };
  });

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl ring-1 ring-cyan-300/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(192,132,252,0.12),_transparent_16%)]" />

      <div className="relative h-[620px] overflow-hidden rounded-[2rem] border border-cyan-200/5 bg-slate-950/90">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.14),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(14,165,233,0.08),transparent_24%)]" />

        {/* SVG Network Lines */}
        <svg className="absolute inset-0 h-full w-full" style={{ pointerEvents: "none" }}>
          <defs>
            <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
              <stop offset="100%" stopColor="rgba(14, 165, 233, 0.2)" />
            </linearGradient>
          </defs>
          {edges.map((edge, idx) => {
            const [i, j] = edge;
            const x1 = nodePositions[i].left;
            const y1 = nodePositions[i].top;
            const x2 = nodePositions[j].left;
            const y2 = nodePositions[j].top;
            return (
              <motion.line
                key={`edge-${idx}`}
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="url(#edge-gradient)"
                strokeWidth="1.5"
                opacity="0.4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              />
            );
          })}
        </svg>

        <motion.div
          className="relative h-full w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {nodes.map((node) => (
            <motion.button
              key={node.id}
              type="button"
              onMouseEnter={() => setActiveId(node.id)}
              onFocus={() => setActiveId(node.id)}
              className="absolute max-w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-300/40 bg-gradient-to-br from-cyan-600/30 to-blue-900/40 px-4 py-3 text-center text-white shadow-[0_0_32px_rgba(56,189,248,0.35)] transition duration-300 hover:border-cyan-200 hover:from-cyan-500/50 hover:to-blue-800/60 hover:shadow-[0_0_48px_rgba(56,189,248,0.5)] focus:outline-none focus:ring-2 focus:ring-cyan-300/70"
              style={{ top: node.position.top, left: node.position.left }}
              variants={nodeVariants}
              whileHover={{ scale: 1.2 }}
            >
              <span className="block text-[10px] uppercase tracking-[0.25em] text-cyan-100/70">{node.subtitle}</span>
              <span className="mt-1.5 block text-sm font-black uppercase leading-tight tracking-[0.03em] text-white">
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
