import type React from "react"
import type { Metadata } from "next"
import { Inter, Great_Vibes, Playfair_Display } from "next/font/google"
import "./globals.css"

// Initialize the Inter font with more weights for better typography
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
})

// Add a true cursive font for sophisticated headings
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cursive",
  display: "swap",
})

// Add Playfair Display for elegant headings and quotes
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Fresh Wheels - Premium Auto Detailing",
  description: "Massachusetts' premier auto detailing service, providing exceptional care for your vehicle.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${greatVibes.variable} ${playfair.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
