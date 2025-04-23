"use client"

import { motion } from "framer-motion"
import GalleryCarousel from "@/components/gallery-carousel"
import { Button } from "@/components/ui/button"

export default function GallerySection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full"
    >
      <GalleryCarousel />

      <div className="text-center mt-12">
        <Button
          size="lg"
          className="bg-black hover:bg-black/90 text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          View Full Gallery
        </Button>
      </div>
    </motion.div>
  )
}
