"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ServiceCardProps {
  title: string
  description: string
  image: string
}

export default function ServiceCard({ title, description, image }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card
        className="overflow-hidden border-none shadow-lg h-full rounded-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden rounded-t-xl">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl font-inter">{title}</h3>
        </div>
        <CardContent className="p-6">
          <p className="text-gray-700 mb-4 font-inter">{description}</p>
          <Button
            variant="outline"
            className="w-full bg-black text-white hover:bg-black/80 transition-colors"
            onClick={() => document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth" })}
          >
            Learn More
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
