"use client"

import type React from "react"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ServiceCard from "@/components/service-card"
import PricingCard from "@/components/pricing-card"
import SubscriptionCard from "@/components/subscription-card"
import TestimonialCard from "@/components/testimonial-card"
import BookingForm from "@/components/booking-form"
import CustomLogo from "@/components/custom-logo"
import HeroSection from "@/components/hero-section"
import FAQSection from "@/components/faq-section"
import GallerySection from "@/components/gallery-section"

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const aboutRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const bookingRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToSection = (section: string) => {
    switch (section) {
      case "about":
        scrollTo(aboutRef)
        break
      case "services":
        scrollTo(servicesRef)
        break
      case "gallery":
        scrollTo(galleryRef)
        break
      case "pricing":
        scrollTo(pricingRef)
        break
      case "testimonials":
        scrollTo(testimonialsRef)
        break
      case "booking":
        scrollTo(bookingRef)
        break
      case "faq":
        scrollTo(faqRef)
        break
      case "contact":
        scrollTo(bookingRef)
        break
      default:
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMobileNavClick = (section: string) => {
    scrollToSection(section)
    setIsMobileMenuOpen(false)
  }

  const services = [
    {
      title: "Hand Wash & Dry",
      description: "Meticulous hand washing and drying using premium microfiber towels and pH-balanced soaps.",
      icon: "/icons/hand-wash.svg",
      image: "/gleaming-luxury-wash.png",
    },
    {
      title: "Interior & Exterior Detailing",
      description: "Comprehensive cleaning of all interior surfaces and exterior components for a like-new appearance.",
      icon: "/icons/interior.svg",
      image: "/pristine-car-interior.png",
    },
    {
      title: "Wax & Shine",
      description: "Premium wax application that provides a deep, glossy finish and lasting protection.",
      icon: "/icons/wax.svg",
      image: "/gleaming-red-coupe.png",
    },
    {
      title: "Tire & Rim Cleaning",
      description: "Specialized cleaning and dressing of tires and rims to restore their original luster.",
      icon: "/icons/tire.svg",
      image: "/gleaming-wheels.png",
    },
    {
      title: "Engine Bay Cleaning",
      description: "Safe and effective cleaning of your engine bay to remove grime and restore its appearance.",
      icon: "/icons/engine.svg",
      image: "/sparkling-engine-bay.png",
    },
    {
      title: "Paint Correction",
      description:
        "Professional paint correction to remove swirls, scratches, and imperfections for a flawless finish.",
      icon: "/icons/paint.svg",
      image: "/glossy-black-transformation.png",
    },
    {
      title: "Ceramic Coating",
      description: "Advanced ceramic coating that provides superior protection and an unmatched shine for years.",
      icon: "/icons/ceramic.svg",
      image: "/ceramic-coating-detail.png",
    },
  ]

  // Define all possible features across all packages
  const allFeatures = [
    "Exterior Hand Wash & Dry",
    "Wheel & Tire Cleaning",
    "Interior Vacuum & Dusting",
    "Dashboard & Console Cleaning",
    "Window Cleaning",
    "Tire Dressing",
    "Clay Bar Treatment",
    "One-Step Polish",
    "Carnauba Wax Application",
    "Leather Conditioning",
    "Interior Fabric Protection",
    "Engine Bay Cleaning",
    "Two-Step Paint Correction",
    "Ceramic Coating Application",
    "Headlight Restoration",
    "Deep Interior Extraction",
    "Odor Elimination",
    "Paint Sealant (12-month protection)",
  ]

  // Define which features are included in each package
  const essentialFeatures = [
    "Exterior Hand Wash & Dry",
    "Wheel & Tire Cleaning",
    "Interior Vacuum & Dusting",
    "Dashboard & Console Cleaning",
    "Window Cleaning",
    "Tire Dressing",
  ]

  const premiumFeatures = [
    ...essentialFeatures,
    "Clay Bar Treatment",
    "One-Step Polish",
    "Carnauba Wax Application",
    "Leather Conditioning",
    "Interior Fabric Protection",
    "Engine Bay Cleaning",
  ]

  const ultimateFeatures = [
    ...premiumFeatures,
    "Two-Step Paint Correction",
    "Ceramic Coating Application",
    "Headlight Restoration",
    "Deep Interior Extraction",
    "Odor Elimination",
    "Paint Sealant (12-month protection)",
  ]

  // Create the packages with included/excluded features
  const packages = [
    {
      title: "Essential Detail",
      price: 149,
      features: allFeatures.map((feature) => ({
        name: feature,
        included: essentialFeatures.includes(feature),
      })),
      popular: false,
    },
    {
      title: "Premium Detail",
      price: 249,
      features: allFeatures.map((feature) => ({
        name: feature,
        included: premiumFeatures.includes(feature),
      })),
      popular: true,
    },
    {
      title: "Ultimate Detail",
      price: 399,
      features: allFeatures.map((feature) => ({
        name: feature,
        included: ultimateFeatures.includes(feature),
      })),
      popular: false,
    },
  ]

  // Subscription features
  const subscriptionFeatures = [
    "Weekly Exterior Hand Wash & Dry",
    "Weekly Wheel & Tire Cleaning",
    "Bi-weekly Interior Vacuum & Dusting",
    "Bi-weekly Dashboard & Console Cleaning",
    "Bi-weekly Window Cleaning",
    "Bi-weekly Tire Dressing",
    "Monthly Leather Conditioning",
    "Quarterly Wax Application",
    "Quarterly Engine Bay Cleaning",
    "Annual Headlight Restoration",
    "Priority Scheduling",
    "15% Off Additional Services",
  ]

  // Monthly Refresh features (subset of premium features)
  const monthlyRefreshIncluded = [
    "Bi-weekly Exterior Hand Wash & Dry",
    "Bi-weekly Wheel & Tire Cleaning",
    "Monthly Interior Vacuum & Dusting",
    "Monthly Dashboard & Console Cleaning",
    "Monthly Window Cleaning",
    "Monthly Tire Dressing",
    "Priority Scheduling",
    "10% Off Additional Services",
  ]

  // Create subscription packages
  const subscriptions = [
    {
      title: "Monthly Refresh",
      price: 99,
      frequency: "month",
      features: [
        { name: "Bi-weekly Exterior Hand Wash & Dry", included: true },
        { name: "Bi-weekly Wheel & Tire Cleaning", included: true },
        { name: "Monthly Interior Vacuum & Dusting", included: true },
        { name: "Monthly Dashboard & Console Cleaning", included: true },
        { name: "Monthly Window Cleaning", included: true },
        { name: "Monthly Tire Dressing", included: true },
        { name: "Monthly Leather Conditioning", included: false },
        { name: "Quarterly Wax Application", included: false },
        { name: "Quarterly Engine Bay Cleaning", included: false },
        { name: "Annual Headlight Restoration", included: false },
        { name: "Priority Scheduling", included: true },
        { name: "10% Off Additional Services", included: true },
      ],
      savings: "up to 25%",
      popular: false,
    },
    {
      title: "Monthly Premium",
      price: 199,
      frequency: "month",
      features: [
        { name: "Weekly Exterior Hand Wash & Dry", included: true },
        { name: "Weekly Wheel & Tire Cleaning", included: true },
        { name: "Bi-weekly Interior Vacuum & Dusting", included: true },
        { name: "Bi-weekly Dashboard & Console Cleaning", included: true },
        { name: "Bi-weekly Window Cleaning", included: true },
        { name: "Bi-weekly Tire Dressing", included: true },
        { name: "Monthly Leather Conditioning", included: true },
        { name: "Quarterly Wax Application", included: true },
        { name: "Quarterly Engine Bay Cleaning", included: true },
        { name: "Annual Headlight Restoration", included: true },
        { name: "Priority Scheduling", included: true },
        { name: "15% Off Additional Services", included: true },
      ],
      savings: "up to 35%",
      popular: true,
    },
  ]

  const testimonials = [
    {
      name: "Michael Thompson",
      rating: 5,
      text: "Absolutely blown away by the results! My BMW looks better than when I first bought it. The ceramic coating is worth every penny.",
      image: "/confident-executive.png",
    },
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "I've tried several detailing services in Massachusetts, but Fresh Wheels is truly on another level. Attention to detail is impeccable!",
      image: "/confident-professional.png",
    },
    {
      name: "David Martinez",
      rating: 5,
      text: "The monthly premium subscription is a game-changer! My Tesla always looks showroom-ready, and the bi-weekly service fits perfectly into my schedule. The attention to detail and consistency is outstanding.",
      image: "/confident-young-professional.png",
    },
    {
      name: "Jennifer Williams",
      rating: 5,
      text: "The paint correction service removed years of swirl marks and scratches. My car looks showroom new again!",
      image: "/thoughtful-gaze.png",
    },
  ]

  return (
    <div className="relative min-h-screen bg-white">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <CustomLogo className="h-8 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection("about")} className="text-white hover:text-gray-300 transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection("services")} className="text-white hover:text-gray-300 transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection("gallery")} className="text-white hover:text-gray-300 transition-colors">
              Gallery
            </button>
            <button onClick={() => scrollToSection("pricing")} className="text-white hover:text-gray-300 transition-colors">
              Pricing
            </button>
            <button onClick={() => scrollToSection("faq")} className="text-white hover:text-gray-300 transition-colors">
              FAQ
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-white hover:text-gray-300 transition-colors">
              Contact
            </button>
          </nav>

          {/* Book Now button and Mobile Menu */}
          <div className="flex items-center">
            <Button
              onClick={() => scrollTo(bookingRef)}
              className="hidden md:flex bg-white text-black hover:bg-white/90 rounded-md"
            >
              Book Now
            </Button>

            {/* Mobile menu button */}
            <button onClick={toggleMobileMenu} className="md:hidden p-2">
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <button
                onClick={() => handleMobileNavClick("about")}
                className="text-white hover:text-gray-300 transition-colors text-left py-2 text-lg"
              >
                About
              </button>
              <button
                onClick={() => handleMobileNavClick("services")}
                className="text-white hover:text-gray-300 transition-colors text-left py-2 text-lg"
              >
                Services
              </button>
              <button
                onClick={() => handleMobileNavClick("gallery")}
                className="text-white hover:text-gray-300 transition-colors text-left py-2 text-lg"
              >
                Gallery
              </button>
              <button
                onClick={() => handleMobileNavClick("pricing")}
                className="text-white hover:text-gray-300 transition-colors text-left py-2 text-lg"
              >
                Pricing
              </button>
              <button
                onClick={() => handleMobileNavClick("faq")}
                className="text-white hover:text-gray-300 transition-colors text-left py-2 text-lg"
              >
                FAQ
              </button>
              <button
                onClick={() => handleMobileNavClick("contact")}
                className="text-white hover:text-gray-300 transition-colors text-left py-2 text-lg"
              >
                Contact
              </button>
              <Button
                onClick={() => handleMobileNavClick("booking")}
                className="bg-white text-black hover:bg-white/90 rounded-md w-full mt-2"
              >
                Book Now
              </Button>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <HeroSection onScrollToSection={scrollToSection} />

      {/* About Us Section */}
      <section ref={aboutRef} className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 font-inter">About Fresh Wheels</h2>
            <div className="w-16 md:w-20 h-1 bg-black mx-auto mb-4 md:mb-6"></div>
            <p className="text-base sm:text-lg text-gray-700 mb-6 md:mb-8 font-inter">
              Fresh Wheels is a premium automobile detailing service proudly owned and operated by Bob Wheeler, a lifelong car enthusiast with a sharp eye for shine and perfection. Located in the heart of Pepperell, Massachusetts, Fresh Wheels has quickly become the go-to destination for vehicle owners who demand the absolute best for their cars, trucks, and SUVs.
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-6 md:mb-8 font-inter">
              What started as a passion project over 20 years ago, detailing vehicles in his own garage for friends and family, has now evolved into a full-fledged business built on quality, trust, and a relentless commitment to that "just-detailed" look.
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-6 md:mb-8 font-inter">
              Bob brings two decades of experience, skill, and love for the craft to every vehicle that rolls through the bay — from luxury exotics to daily drivers. At Fresh Wheels, every detail matters. Whether it's a hand wash, paint correction, ceramic coating, or interior restoration, your ride will leave looking fresh, flawless, and ready to turn heads.
            </p>
            <p className="text-base sm:text-lg text-gray-700 font-inter">
              If you're in Pepperell, MA or surrounding areas, and want your car detailed by someone who treats it like his own, Fresh Wheels is your first and final stop.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl transform hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image src="/golden-trophy-icon.png" alt="Excellence" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 font-inter">Uncompromising Quality</h3>
                <p className="text-gray-600 font-inter">
                  We never cut corners. Every vehicle receives our complete attention and the highest standard of care.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl transform hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image src="/gold-certified-badge.png" alt="Certified" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 font-inter">Decades of Experience</h3>
                <p className="text-gray-600 font-inter">
                  With over 20 years of detailing expertise, we know exactly what it takes to make your vehicle shine.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl transform hover:-translate-y-2">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-black/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Image src="/sprouting-leaf-globe.png" alt="Eco-Friendly" width={32} height={32} />
                </div>
                <h3 className="text-xl font-bold mb-2 font-inter">Personal Touch</h3>
                <p className="text-gray-600 font-inter">
                  Every vehicle is treated with the same care and attention as if it were our own personal car.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 font-inter">Our Premium Services</h2>
            <div className="w-16 md:w-20 h-1 bg-black mx-auto mb-4 md:mb-6"></div>
            <p className="text-base sm:text-lg text-gray-700 font-inter">
              We offer a comprehensive range of detailing services tailored to meet the unique needs of your vehicle.
              Each service is performed with meticulous attention to detail and premium products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} title={service.title} description={service.description} image={service.image} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-inter">Our Work</h2>
            <div className="w-20 h-1 bg-black mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 font-inter">
              Browse through our gallery of premium automobiles we've detailed. These images showcase the quality and
              attention to detail that defines our work.
            </p>
          </div>

          <GallerySection />
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-inter">Transparent Pricing</h2>
            <div className="w-20 h-1 bg-black mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 font-inter">
              Choose from our carefully crafted packages designed to meet different needs and budgets. Custom packages
              are also available upon request.
            </p>
          </div>

          {/* One-time service packages */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center font-inter">One-Time Services</h3>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {packages.map((pkg, index) => (
                <PricingCard
                  key={index}
                  title={pkg.title}
                  price={pkg.price}
                  features={pkg.features}
                  popular={pkg.popular}
                  onBookNow={() => scrollTo(bookingRef)}
                />
              ))}
            </div>
          </div>

          {/* Monthly subscription packages */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center font-inter">Monthly Subscriptions</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {subscriptions.map((sub, index) => (
                <SubscriptionCard
                  key={index}
                  title={sub.title}
                  price={sub.price}
                  frequency={sub.frequency}
                  features={sub.features}
                  savings={sub.savings}
                  popular={sub.popular}
                  onSubscribe={() => scrollTo(bookingRef)}
                />
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto text-center mt-12">
            <p className="text-gray-600 italic font-inter">
              * Prices may vary based on vehicle size, condition, and additional services requested. Contact us for a
              personalized quote.
            </p>
            <p className="text-gray-600 italic font-inter mt-2">
              ** Subscriptions require a 3-month minimum commitment. Cancel anytime after the initial period.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} id="faq-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-inter">Frequently Asked Questions</h2>
              <div className="w-20 h-1 bg-black mx-auto mb-6"></div>
              <p className="text-lg text-gray-700 font-inter">
                Find answers to common questions about our detailing services. If you don't see your question here, feel
                free to contact us directly.
              </p>
            </div>

            <FAQSection />

            <div className="mt-12 text-center">
              <Button onClick={() => scrollTo(bookingRef)} className="bg-black hover:bg-black/90 text-white">
                Still Have Questions? Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-inter">What Our Clients Say</h2>
            <div className="w-20 h-1 bg-black mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 font-inter">
              Don't just take our word for it. Here's what our satisfied customers have to say about their experience
              with Fresh Wheels.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                rating={testimonial.rating}
                text={testimonial.text}
                image={testimonial.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section ref={bookingRef} className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-inter">Book Your Appointment</h2>
                <div className="w-20 h-1 bg-black mb-6"></div>
                <p className="text-lg text-gray-700 mb-8 font-inter">
                  Ready to experience the Fresh Wheels difference? Schedule your appointment today and give your vehicle
                  the premium care it deserves.
                </p>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 font-inter">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center mr-4 mt-1">
                        <Image src="/red-location-pin.png" alt="Address" width={20} height={20} />
                      </div>
                      <div>
                        <p className="font-medium font-inter">Our Location</p>
                        <p className="text-gray-600 font-inter">123 Detailing Drive, Boston, MA 02108</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center mr-4 mt-1">
                        <Image src="/classic-phone-icon.png" alt="Phone" width={20} height={20} />
                      </div>
                      <div>
                        <p className="font-medium font-inter">Phone Number</p>
                        <p className="text-gray-600 font-inter">(617) 555-1234</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center mr-4 mt-1">
                        <Image src="/simple-email-icon.png" alt="Email" width={20} height={20} />
                      </div>
                      <div>
                        <p className="font-medium font-inter">Email Address</p>
                        <p className="text-gray-600 font-inter">info@freshwheels.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center mr-4 mt-1">
                        <Image src="/classic-clock-icon.png" alt="Hours" width={20} height={20} />
                      </div>
                      <div>
                        <p className="font-medium font-inter">Business Hours</p>
                        <p className="text-gray-600 font-inter">Monday - Friday: 8am - 6pm</p>
                        <p className="text-gray-600 font-inter">Saturday: 9am - 4pm</p>
                        <p className="text-gray-600 font-inter">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Card className="border-none shadow-xl rounded-xl">
                  <CardContent className="p-6 sm:p-8">
                    <h3 className="text-2xl font-bold mb-6 font-inter">Request a Quote</h3>
                    <BookingForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="mb-4">
                <CustomLogo dark={true} />
              </div>
              <p className="text-gray-400 mb-4 font-inter">
                New England's premier auto detailing service, providing exceptional care for your vehicle.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Image src="/facebook-logo-on-white.png" alt="Facebook" width={24} height={24} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Image src="/instagram-icon-inspired-design.png" alt="Instagram" width={24} height={24} />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Image src="/blue-bird-logo.png" alt="Twitter" width={24} height={24} />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 font-inter">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="text-gray-400 hover:text-white transition-colors font-inter"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo(aboutRef)}
                    className="text-gray-400 hover:text-white transition-colors font-inter"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo(servicesRef)}
                    className="text-gray-400 hover:text-white transition-colors font-inter"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo(galleryRef)}
                    className="text-gray-400 hover:text-white transition-colors font-inter"
                  >
                    Gallery
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo(pricingRef)}
                    className="text-gray-400 hover:text-white transition-colors font-inter"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo(faqRef)}
                    className="text-gray-400 hover:text-white transition-colors font-inter"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollTo(bookingRef)}
                    className="text-gray-400 hover:text-white transition-colors font-inter"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 font-inter">Services</h4>
              <ul className="space-y-2">
                {services.slice(0, 5).map((service, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollTo(servicesRef)}
                      className="text-gray-400 hover:text-white transition-colors font-inter"
                    >
                      {service.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-4 font-inter">Service Areas</h4>
              <ul className="space-y-2">
                <li className="text-gray-400 font-inter">Boston</li>
                <li className="text-gray-400 font-inter">Cambridge</li>
                <li className="text-gray-400 font-inter">Brookline</li>
                <li className="text-gray-400 font-inter">Newton</li>
                <li className="text-gray-400 font-inter">Somerville</li>
                <li className="text-gray-400 font-inter">Quincy</li>
                <li className="text-gray-400 font-inter">Surrounding Areas</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 font-inter">
            <p>&copy; {new Date().getFullYear()} Fresh Wheels Detailing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
