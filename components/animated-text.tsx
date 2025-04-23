"use client"

import { motion } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  charClassName?: string
  delay?: number
  duration?: number
  staggerChildren?: number
}

export default function AnimatedText({
  text,
  className = "",
  charClassName = "",
  delay = 0,
  duration = 0.05,
  staggerChildren = 0.03,
}: AnimatedTextProps) {
  // Split the text into an array of characters
  const characters = Array.from(text)

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  }

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration,
      },
    },
  }

  return (
    <motion.span className={`inline-block ${className}`} variants={container} initial="hidden" animate="visible">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className={`inline-block ${charClassName} ${char === " " ? "mr-1" : ""}`}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
