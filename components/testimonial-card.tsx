import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialCardProps {
  name: string
  rating: number
  text: string
  image: string
}

export default function TestimonialCard({ name, rating, text, image }: TestimonialCardProps) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-shadow rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <h4 className="font-bold font-inter">{name}</h4>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < rating ? "fill-black text-black" : "fill-muted text-muted-foreground"}`}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-gray-700 italic font-inter">"{text}"</p>
      </CardContent>
    </Card>
  )
}
