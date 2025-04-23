"use client"

import { motion } from "framer-motion"

interface AnimatedUnderlineProps {
  delay?: number
  duration?: number
  width?: string
  className?: string
}

export default function AnimatedUnderline({
  delay = 0,
  duration = 1,
  width = "100%",
  className = "",
}: AnimatedUnderlineProps) {
  return (
    <div className={`relative flex justify-center w-full ${className}`}>
      <motion.div
        className="h-[2px] bg-gradient-to-r from-transparent via-white to-transparent absolute"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width, opacity: 1 }}
        transition={{
          delay,
          duration,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
