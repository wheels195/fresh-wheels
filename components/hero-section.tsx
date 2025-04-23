"use client"

import { ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import AnimatedText from "@/components/animated-text"
import FloatingBubblesScene from "@/components/floating-bubbles-scene"
import { motion } from "framer-motion"
import React from "react"

export default function HeroSection({ onScrollToSection }) {
  return (
    <section className="hero bg-[#0a0a0a] min-h-screen flex flex-col justify-start items-center relative overflow-hidden">
      {/* Floating Bubbles Scene */}
      <FloatingBubblesScene />

      {/* Main content container with adjusted spacing - moved title closer to top */}
      <div className="container mx-auto px-2 z-10 flex flex-col items-center h-full pt-24 md:pt-28 pb-16 relative">
        {/* Text and buttons container - reduced bottom margin */}
        <div className="text-center max-w-3xl mx-auto mb-4 md:mb-8">
          <div className="mb-2 md:mb-4 relative">
            {/* Split headline into two parts with different styles */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white font-cursive inline">
              <AnimatedText text="Fresh Wheels" delay={0.5} staggerChildren={0.04} className="font-cursive" />
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold font-inter inline ml-2 md:ml-4">
              <AnimatedText text="DETAILING" delay={1.2} staggerChildren={0.04} className="tracking-wide" />
            </h1>

            {/* Subtle underline effect that appears after images load */}
            <div className="relative flex justify-center mt-2">
              <motion.div
                className="h-[2px] bg-gradient-to-r from-transparent via-white to-transparent absolute"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "80%", opacity: 1 }}
                transition={{
                  delay: 2.8, // Appears shortly after the text animations
                  duration: 1.2,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-4 md:mb-6 font-light tracking-normal sm:tracking-tighter px-4 sm:px-0">
            <AnimatedText
              text="New England's Premier Auto Detailing "
              delay={1.9}
              staggerChildren={0.02}
              className="inline-block"
            />
            <AnimatedText
              text="Experience"
              delay={2.1}
              staggerChildren={0.02}
              className="inline-block whitespace-nowrap"
            />
          </p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center mb-6 md:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            <Button
              onClick={() => onScrollToSection("booking")}
              size="lg"
              className="bg-black hover:bg-black/80 text-white rounded-md border border-white/20"
            >
              Book Now
            </Button>
            <Button
              onClick={() => onScrollToSection("services")}
              size="lg"
              variant="outline"
              className="bg-white text-black hover:bg-white/90 rounded-md"
            >
              <span>Explore Services</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {/* Cars Road Image with Reveal Animation - WITH BLENDED CORNERS */}
        <div className="w-full max-w-[1400px] overflow-hidden mt-2 md:mt-4">
          <motion.div
            className="relative w-full rounded-3xl overflow-hidden image-container"
            style={{ aspectRatio: "1920/1080" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <RevealImage src="/cars-road-sunset.png" alt="Luxury cars on a sunset road" duration={5} delay={2.5} />

            {/* Corner blending overlays */}
            <div className="absolute top-0 left-0 w-[100px] h-[100px] bg-gradient-to-br from-[#0a0a0a] to-transparent rounded-tl-3xl z-30 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-gradient-to-bl from-[#0a0a0a] to-transparent rounded-tr-3xl z-30 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[100px] h-[100px] bg-gradient-to-tr from-[#0a0a0a] to-transparent rounded-bl-3xl z-30 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[100px] h-[100px] bg-gradient-to-tl from-[#0a0a0a] to-transparent rounded-br-3xl z-30 pointer-events-none"></div>

            {/* Subtle edge blending */}
            <div className="absolute top-0 left-0 right-0 h-[30px] bg-gradient-to-b from-[#0a0a0a] to-transparent z-30 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[30px] bg-gradient-to-t from-[#0a0a0a] to-transparent z-30 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 left-0 w-[30px] bg-gradient-to-r from-[#0a0a0a] to-transparent z-30 pointer-events-none"></div>
            <div className="absolute top-0 bottom-0 right-0 w-[30px] bg-gradient-to-l from-[#0a0a0a] to-transparent z-30 pointer-events-none"></div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.7, duration: 0.5 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60 z-0"></div>
    </section>
  )
}

// Improved reveal animation component with modern loader
function RevealImage({ src, alt, duration = 5, delay = 0 }) {
  return (
    <div className="relative w-full h-full">
      {/* Base image with overlay blend */}
      <div className="absolute inset-0 z-10">
        <Image 
          src={src || "/placeholder.svg"} 
          alt={alt} 
          fill 
          className="object-cover opacity-95 mix-blend-luminosity" 
          priority 
        />
        {/* Additional ambient gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-orange-900/20 mix-blend-overlay"></div>
        {/* Brightness boost overlay */}
        <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
      </div>

      {/* Animated reveal overlay with enhanced effects */}
      <motion.div
        className="absolute inset-0 z-20 bg-[#0a0a0a]"
        initial={{ opacity: 1 }}
        animate={{
          opacity: 0,
          transition: {
            delay: delay,
            duration: duration * 0.8, // Slightly faster reveal
            ease: [0.645, 0.045, 0.355, 1],
          },
        }}
      >
        {/* Modern animated loader that shows before animation starts */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: {
              delay: delay,
              duration: 0.8,
              ease: "easeInOut",
            },
          }}
        >
          <ModernLoader />
        </motion.div>

        <motion.div
          className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-30"
          initial={{ scale: 1.2, opacity: 0.3 }}
          animate={{
            scale: 1,
            opacity: 0,
            transition: {
              delay: delay,
              duration: duration,
              ease: "easeInOut",
            },
          }}
        />

        {/* Enhanced dust particles effect */}
        <StardustEffect duration={duration} delay={delay} />
      </motion.div>
    </div>
  )
}

// Modern animated loader component
function ModernLoader() {
  // Car silhouette animation
  const carVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  }

  // Animated bars for the loader
  const bars = Array.from({ length: 5 }).map((_, i) => (
    <motion.div
      key={i}
      className="h-1 bg-gradient-to-r from-white/30 to-white/80 rounded-full"
      initial={{ width: 0 }}
      animate={{
        width: ["0%", "100%", "0%"],
        opacity: [0.3, 1, 0.3],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        delay: i * 0.15,
        ease: "easeInOut",
      }}
    />
  ))

  // Animated dots for the loader
  const dots = Array.from({ length: 3 }).map((_, i) => (
    <motion.div
      key={i}
      className="w-2 h-2 bg-white rounded-full mx-1"
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        delay: i * 0.2,
        ease: "easeInOut",
      }}
    />
  ))

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Car silhouette with shine effect */}
      <div className="relative">
        <motion.div className="relative" variants={carVariants} initial="hidden" animate="visible">
          <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M110,25 L100,10 L30,10 L20,25 L10,25 C5,25 5,30 10,30 L20,30 C20,35 25,35 25,30 L95,30 C95,35 100,35 100,30 L110,30 C115,30 115,25 110,25 Z"
              fill="white"
              fillOpacity="0.8"
            />
            <path d="M30,10 L40,25 L90,25 L100,10" fill="white" fillOpacity="0.2" />
          </svg>

          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            initial={{ x: -120, opacity: 0 }}
            animate={{
              x: 120,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Loading text with animated dots */}
      <div className="flex items-center">
        <span className="text-white/80 text-sm mr-2 font-inter tracking-wider">LOADING</span>
        <div className="flex">{dots}</div>
      </div>

      {/* Animated progress bars */}
      <div className="w-40 space-y-2">{bars}</div>
    </div>
  )
}

// Enhanced stardust particle effect component with more dramatic effects
function StardustEffect({ duration, delay }) {
  const [particles, setParticles] = React.useState([]);

  React.useEffect(() => {
    // Generate particles only on client-side with more dramatic parameters
    const newParticles = Array.from({ length: 300 }).map((_, i) => ({
      width: Math.random() * 4 + 1,
      height: Math.random() * 4 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color:
        i % 6 === 0
          ? "#ffd700" // Gold
          : i % 6 === 1
          ? "#ff8c00" // Dark Orange
          : i % 6 === 2
          ? "#00ffff" // Cyan
          : i % 6 === 3
          ? "#ff1493" // Deep Pink
          : i % 6 === 4
          ? "#7fff00" // Chartreuse
          : "#ffffff", // White
      glow: i % 5 === 0, // More frequent glow effect
      scale: Math.random() * 4 + 1,
      xOffset: (Math.random() - 0.5) * 800, // Increased movement range
      yOffset: (Math.random() - 0.5) * 800,
      animationDelay: Math.random() * duration * 0.8, // Slightly compressed timing for more intensity
      animationDuration: duration * (0.2 + Math.random() * 0.6), // Faster animations
      opacity: Math.random() * 0.4 + 0.6, // Higher base opacity
    }));
    setParticles(newParticles);
  }, [duration]);

  if (particles.length === 0) return null;

  return (
    <>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: particle.width + "px",
            height: particle.height + "px",
            left: particle.left + "%",
            top: particle.top + "%",
            backgroundColor: particle.color,
            boxShadow: particle.glow 
              ? `0 0 ${particle.width * 2}px ${particle.width}px ${particle.color}` 
              : "none",
          }}
          initial={{
            opacity: particle.opacity,
            scale: 0,
            x: 0,
            y: 0,
            rotate: 0,
          }}
          animate={{
            opacity: 0,
            scale: particle.scale,
            x: particle.xOffset,
            y: particle.yOffset,
            rotate: Math.random() * 360, // Added rotation
            transition: {
              delay: delay + particle.animationDelay,
              duration: particle.animationDuration,
              ease: "easeOut",
            },
          }}
        />
      ))}
    </>
  );
}
