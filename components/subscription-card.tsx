"use client"

import { motion } from "framer-motion"
import { Check, X, Calendar } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SubscriptionCardProps {
  title: string
  price: number
  frequency: string
  features: Array<{
    name: string
    included: boolean
  }>
  savings: string
  popular?: boolean
  onSubscribe: () => void
}

export default function SubscriptionCard({
  title,
  price,
  frequency,
  features,
  savings,
  popular = false,
  onSubscribe,
}: SubscriptionCardProps) {
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

        <div className="absolute top-0 left-0 transform -translate-x-2 -translate-y-2">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            SUBSCRIPTION
          </div>
        </div>

        <CardContent className="pt-8 pb-2 px-6">
          <h3 className="text-xl font-bold mb-2 font-inter">{title}</h3>
          <div className="mb-1">
            <span className="text-3xl font-bold">${price}</span>
            <span className="text-gray-500 ml-1">/{frequency}</span>
          </div>
          <div className="mb-4">
            <span className="text-green-600 font-medium text-sm">Save {savings}</span>
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
            onClick={onSubscribe}
            className={`w-full ${
              popular
                ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                : "bg-white text-black border border-black hover:bg-black hover:text-white"
            }`}
          >
            Subscribe Now
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
