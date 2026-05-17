"use client";

import { Children } from "react";
import { motion } from "framer-motion";
import { cn } from "@/components/ui/cn";

export function Reveal({
  children,
  delay = 0,
  className,
  staggerChildren = false,
  variant = "rise",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  staggerChildren?: boolean;
  variant?: "rise" | "angleLeft" | "angleRight" | "tiltLeft" | "tiltRight";
}) {
  const childList = Children.toArray(children);
  const revealVariants = {
    rise: {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0, rotate: 0, rotateX: 0, rotateY: 0 },
    },
    angleLeft: {
      hidden: { opacity: 0, x: -44, y: 54, rotate: -5, filter: "blur(10px)" },
      visible: { opacity: 1, x: 0, y: 0, rotate: 0, filter: "blur(0px)" },
    },
    angleRight: {
      hidden: { opacity: 0, x: 48, y: 44, rotate: 4.5, filter: "blur(10px)" },
      visible: { opacity: 1, x: 0, y: 0, rotate: 0, filter: "blur(0px)" },
    },
    tiltLeft: {
      hidden: { opacity: 0, x: -32, y: 42, rotateY: 12, rotateX: -5, filter: "blur(8px)" },
      visible: { opacity: 1, x: 0, y: 0, rotateY: 0, rotateX: 0, filter: "blur(0px)" },
    },
    tiltRight: {
      hidden: { opacity: 0, x: 36, y: 42, rotateY: -12, rotateX: 5, filter: "blur(8px)" },
      visible: { opacity: 1, x: 0, y: 0, rotateY: 0, rotateX: 0, filter: "blur(0px)" },
    },
  }[variant];

  if (staggerChildren) {
    return (
      <motion.div
        className={cn(className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {childList.map((child, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial={revealVariants.hidden}
      whileInView={revealVariants.visible}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1], delay }}
      style={{ transformPerspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}
