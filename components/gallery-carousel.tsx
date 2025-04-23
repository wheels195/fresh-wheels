"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function GalleryCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Gallery images - beautiful automobiles
  const images = [
    {
      src: "/ChatGPT_redLaFerrari.png",
      alt: "Ferrari LaFerrari with Premium Detail",
      caption: "Ferrari LaFerrari - Full Paint Correction & Ceramic Coating",
    },
    {
      src: "/ChatGPT_black%20lambo.png",
      alt: "Black Lamborghini with Ultimate Detail",
      caption: "Lamborghini Aventador - Ultimate Detail Package & PPF",
    },
    {
      src: "/ChatGPT_blue%20raptor.png",
      alt: "Ford Raptor with Off-Road Detail",
      caption: "Ford Raptor - Premium Off-Road Detail & Ceramic Protection",
    },
    {
      src: "/ChatGPT_green%20jeep.png",
      alt: "Custom Green Jeep",
      caption: "Jeep Wrangler - Full Interior & Exterior Restoration",
    },
    {
      src: "/ChatGPT_white%20tesla.png",
      alt: "Tesla Model S Detail",
      caption: "Tesla Model S - Executive Detail & Paint Enhancement",
    },
  ]

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide()
      }, 5000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [currentIndex, isAutoPlaying])

  // Pause auto-play when user interacts with carousel
  const pauseAutoPlay = () => {
    setIsAutoPlaying(false)
    // Resume after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
    pauseAutoPlay()
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    pauseAutoPlay()
  }

  // Animation variants for slide transitions
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="aspect-[16/9] relative overflow-hidden rounded-xl bg-black">
        <AnimatePresence initial={false} custom={1}>
          <motion.div
            key={currentIndex}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                className="object-cover"
                priority
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-95" />
              <div className="absolute bottom-8 left-0 right-0 text-center px-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-playfair font-semibold tracking-tight mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  {images[currentIndex].caption}
                </h3>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full z-10"
        onClick={prevSlide}
        aria-label="Previous image"
      >
        <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full z-10"
        onClick={nextSlide}
        aria-label="Next image"
      >
        <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
      </Button>

      {/* Indicator dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-black w-6" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
