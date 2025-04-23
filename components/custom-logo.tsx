"use client"

import { motion } from "framer-motion"

interface LogoProps {
  className?: string
  dark?: boolean
  fontWeight?: string
  onClick?: () => void
}

export default function CustomLogo({ className = "", dark = false, fontWeight = "font-bold", onClick }: LogoProps) {
  // Always use white text for better visibility on dark backgrounds
  const textColor = "text-white"

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    if (onClick) onClick()
  }

  return (
    <motion.div
      className={`flex items-center ${className} cursor-pointer`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick()
        }
      }}
    >
      <div className="flex items-center">
        <div className={`${fontWeight} text-lg md:text-xl font-playfair tracking-wider ${textColor}`}>FRESH</div>
        <div className="relative ml-1">
          <div className={`${fontWeight} text-lg md:text-xl font-playfair tracking-wider ${textColor}`}>WHEELS</div>
          <motion.div
            className="absolute -right-9 -top-1"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="10" />
              <circle cx="50" cy="50" r="10" fill="white" />
              {/* Wheel spokes */}
              {[0, 60, 120, 180, 240, 300].map((rotation, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="15"
                  stroke="white"
                  strokeWidth="6"
                  transform={`rotate(${rotation} 50 50)`}
                />
              ))}
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
