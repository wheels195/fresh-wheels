"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface PricingCardProps {
  title: string
  price: number
  features: Array<{
    name: string
    included: boolean
  }>
  popular?: boolean
  onBookNow: () => void
}

export default function PricingCard({ title, price, features, popular = false, onBookNow }: PricingCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }} className="h-full">
      <Card
        className={`relative h-full border-none shadow-lg rounded-xl ${popular ? "shadow-xl ring-2 ring-black" : ""}`}
      >
        {popular && (
          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
            <div className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
          </div>
        )}

        <CardContent className="pt-6 pb-2 px-6">
          <h3 className="text-xl font-bold mb-2 font-inter">{title}</h3>
          <div className="mb-4">
            <span className="text-3xl font-bold">${price}</span>
          </div>

          <ul className="space-y-3 mb-6">
            {features.map((feature, index) => (
              <li key={index} className={`flex items-start ${!feature.included ? "opacity-50" : ""}`}>
                {feature.included ? (
                  <Check className="h-5 w-5 text-black shrink-0 mr-2 mt-0.5" />
                ) : (
                  <X className="h-5 w-5 text-gray-400 shrink-0 mr-2 mt-0.5" />
                )}
                <span className={`${feature.included ? "text-gray-700" : "text-gray-400"} font-inter`}>
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="px-6 pb-6">
          <Button
            onClick={onBookNow}
            className={`w-full ${popular ? "bg-black hover:bg-black/90 text-white" : "bg-white text-black border border-black hover:bg-black hover:text-white"}`}
          >
            Book Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
