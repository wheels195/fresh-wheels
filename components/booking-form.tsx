"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function BookingForm() {
  const [date, setDate] = useState<Date>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      setLoading(false)
      alert("Form submitted successfully! We will contact you shortly.")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="font-inter">
            Full Name
          </Label>
          <Input id="name" placeholder="John Doe" required className="font-inter" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="font-inter">
            Email Address
          </Label>
          <Input id="email" type="email" placeholder="john@example.com" required className="font-inter" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone" className="font-inter">
            Phone Number
          </Label>
          <Input id="phone" placeholder="(123) 456-7890" required className="font-inter" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="service" className="font-inter">
            Service Type
          </Label>
          <Select>
            <SelectTrigger id="service" className="font-inter">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="essential" className="font-inter">
                Essential Detail
              </SelectItem>
              <SelectItem value="premium" className="font-inter">
                Premium Detail
              </SelectItem>
              <SelectItem value="ultimate" className="font-inter">
                Ultimate Detail
              </SelectItem>
              <SelectItem value="ceramic" className="font-inter">
                Ceramic Coating
              </SelectItem>
              <SelectItem value="paint" className="font-inter">
                Paint Correction
              </SelectItem>
              <SelectItem value="custom" className="font-inter">
                Custom Service
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="vehicle" className="font-inter">
            Vehicle Make & Model
          </Label>
          <Input id="vehicle" placeholder="Toyota Camry" required className="font-inter" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="font-inter">
            Preferred Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal font-inter",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="font-inter">
          Additional Information
        </Label>
        <Textarea
          id="message"
          placeholder="Please provide any additional details about your vehicle or service requirements."
          rows={4}
          className="font-inter"
        />
      </div>

      <Button type="submit" className="w-full bg-black hover:bg-black/90 text-white" disabled={loading}>
        {loading ? "Submitting..." : "Submit Request"}
      </Button>
    </form>
  )
}
