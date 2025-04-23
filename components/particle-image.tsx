"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface ParticleImageProps {
  src: string
  alt: string
  className?: string
  duration?: number
  delay?: number
}

export default function ParticleImage({ src, alt, className = "", duration = 5, delay = 0 }: ParticleImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [particles, setParticles] = useState<any[]>([])
  const [animationStarted, setAnimationStarted] = useState(false)
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()
  const startTimeRef = useRef<number>()
  const particlesRef = useRef<any[]>([])

  // Load the image and create particles
  useEffect(() => {
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.src = src

    image.onload = () => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Set canvas dimensions to match image aspect ratio
      const containerWidth = canvas.clientWidth
      const containerHeight = canvas.clientHeight

      // Draw the image to get pixel data
      ctx.drawImage(image, 0, 0, containerWidth, containerHeight)
      const imageData = ctx.getImageData(0, 0, containerWidth, containerHeight)

      // Clear the canvas
      ctx.clearRect(0, 0, containerWidth, containerHeight)

      // Create particles
      const particleArray: any[] = []
      const pixelDensity = 4 // Adjust for more/fewer particles

      for (let y = 0; y < containerHeight; y += pixelDensity) {
        for (let x = 0; x < containerWidth; x += pixelDensity) {
          const index = (y * containerWidth + x) * 4
          const alpha = imageData.data[index + 3]

          if (alpha > 128) {
            // Only create particles for non-transparent pixels
            const r = imageData.data[index]
            const g = imageData.data[index + 1]
            const b = imageData.data[index + 2]

            particleArray.push({
              x: x,
              y: y,
              originX: x,
              originY: y,
              color: `rgb(${r},${g},${b})`,
              size: Math.random() * 2 + 1,
              vx: (Math.random() - 0.5) * 20,
              vy: (Math.random() - 0.5) * 20,
              ease: Math.random() * 0.1 + 0.05,
            })
          }
        }
      }

      setParticles(particleArray)
      particlesRef.current = particleArray
      setImageLoaded(true)
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [src])

  // Animation loop
  useEffect(() => {
    if (!imageLoaded || !canvasRef.current) return

    // Start animation after delay
    const timer = setTimeout(() => {
      setAnimationStarted(true)
      startTimeRef.current = performance.now()

      const animate = (time: number) => {
        if (!previousTimeRef.current) previousTimeRef.current = time
        if (!startTimeRef.current) startTimeRef.current = time

        const elapsedTime = time - startTimeRef.current
        const progress = Math.min(elapsedTime / (duration * 1000), 1)

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particlesRef.current.forEach((particle) => {
          // Calculate position based on progress
          if (progress < 1) {
            particle.x += (particle.originX - particle.x) * particle.ease
            particle.y += (particle.originY - particle.y) * particle.ease
          } else {
            particle.x = particle.originX
            particle.y = particle.originY
          }

          // Draw particle
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.closePath()
          ctx.fill()
        })

        if (progress < 1) {
          requestRef.current = requestAnimationFrame(animate)
        }
      }

      requestRef.current = requestAnimationFrame(animate)
    }, delay * 1000)

    return () => {
      clearTimeout(timer)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [imageLoaded, duration, delay])

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight

      // Redraw particles at their final positions
      if (imageLoaded && particlesRef.current.length > 0) {
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particlesRef.current.forEach((particle) => {
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(particle.originX, particle.originY, particle.size, 0, Math.PI * 2)
          ctx.closePath()
          ctx.fill()
        })
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Initial setup

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [imageLoaded])

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
      {!animationStarted && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </motion.div>
  )
}
