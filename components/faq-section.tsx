"use client"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQItem {
  id: string
  question: string
  answer: string
}

export default function FAQSection() {
  // Group FAQs by service category
  const faqCategories = [
    {
      title: "General Questions",
      items: [
        {
          id: "general-1",
          question: "How long does a typical detailing service take?",
          answer:
            "Service duration varies based on the package and vehicle condition. Essential Detail typically takes 2-3 hours, Premium Detail 4-5 hours, and Ultimate Detail 6-8 hours. For specialized services like ceramic coating, we may keep your vehicle for 1-2 days to ensure proper application and curing.",
        },
        {
          id: "general-2",
          question: "Do I need to prepare my vehicle before bringing it in?",
          answer:
            "We recommend removing personal belongings and valuables from your vehicle before service. However, no other preparation is necessary. If you're concerned about specific items or areas in your vehicle, please let us know when you drop off your car.",
        },
        {
          id: "general-3",
          question: "Do you offer mobile detailing services?",
          answer:
            "Yes, we offer mobile detailing within a 25-mile radius of our Boston location for an additional fee. Not all services are available for mobile detailing due to equipment requirements. Please contact us for availability and pricing for mobile services.",
        },
      ],
    },
    {
      title: "Hand Wash & Dry",
      items: [
        {
          id: "wash-1",
          question: "What products do you use for hand washing?",
          answer:
            "We use pH-balanced, high-quality soaps and shampoos specifically formulated for automotive finishes. Our washing process includes a pre-rinse to remove loose dirt, two-bucket washing method to prevent swirl marks, and drying with premium microfiber towels to ensure a streak-free finish.",
        },
        {
          id: "wash-2",
          question: "How is your hand wash different from an automatic car wash?",
          answer:
            "Unlike automatic car washes that can damage your paint with harsh brushes and chemicals, our hand wash process is gentle yet thorough. We pay attention to every detail, including door jambs, wheel wells, and other areas often missed by automatic washes. Our process preserves your vehicle's finish while providing a much deeper clean.",
        },
      ],
    },
    {
      title: "Interior & Exterior Detailing",
      items: [
        {
          id: "detail-1",
          question: "What does your interior detailing service include?",
          answer:
            "Our interior detailing includes thorough vacuuming of all surfaces, steam cleaning of carpets and upholstery, cleaning and conditioning of leather surfaces, detailed cleaning of all plastic and vinyl surfaces, glass cleaning, and application of UV protectant to prevent fading and cracking. We also clean air vents, door pockets, and other hard-to-reach areas.",
        },
        {
          id: "detail-2",
          question: "Can you remove tough stains from my car's interior?",
          answer:
            "Yes, we specialize in stain removal from various interior surfaces. Using professional-grade products and techniques, we can address most common stains including coffee, food, ink, and pet stains. For particularly stubborn stains, we may recommend our deep extraction service which provides more intensive treatment.",
        },
      ],
    },
    {
      title: "Wax & Shine",
      items: [
        {
          id: "wax-1",
          question: "How long does wax protection last?",
          answer:
            "Our standard carnauba wax typically provides 2-3 months of protection, while our premium synthetic wax can last 4-6 months. Factors affecting longevity include exposure to elements, washing frequency, and whether the vehicle is garaged. We recommend quarterly waxing for optimal protection and appearance.",
        },
        {
          id: "wax-2",
          question: "What's the difference between wax and ceramic coating?",
          answer:
            "Wax provides a warm, deep shine and moderate protection that lasts 2-6 months. Ceramic coating creates a permanent chemical bond with your paint, offering superior protection against UV rays, chemical stains, and minor scratches for 2-5 years. While wax is more affordable and easier to apply, ceramic coating provides longer-lasting and more robust protection.",
        },
      ],
    },
    {
      title: "Tire & Rim Cleaning",
      items: [
        {
          id: "tire-1",
          question: "How do you clean and protect wheels and tires?",
          answer:
            "We use specialized wheel cleaners that safely dissolve brake dust and road grime without damaging wheel finishes. For tires, we deep clean the rubber to remove old dressing and brown discoloration before applying a premium water-based tire dressing that provides a satin or glossy finish (your preference) without slinging onto your paint.",
        },
        {
          id: "tire-2",
          question: "Can you restore oxidized or damaged wheels?",
          answer:
            "Yes, we offer wheel restoration services for most types of wheels. For light oxidation, our polishing service can restore shine. For more severe damage like curb rash or heavy corrosion, we offer more comprehensive restoration services that may include refinishing. We can assess your wheels and recommend the appropriate service during your consultation.",
        },
      ],
    },
    {
      title: "Ceramic Coating",
      items: [
        {
          id: "ceramic-1",
          question: "What are the benefits of ceramic coating?",
          answer:
            "Ceramic coating provides superior protection against environmental contaminants, UV rays, and light scratches. It creates a hydrophobic surface that repels water and makes cleaning easier. The coating enhances your paint's gloss and depth while providing protection that lasts years rather than months. It's an investment that helps maintain your vehicle's value and appearance over time.",
        },
        {
          id: "ceramic-2",
          question: "How should I maintain my vehicle after ceramic coating?",
          answer:
            "After ceramic coating, we recommend waiting at least 7 days before washing your vehicle. Use pH-neutral car shampoos and avoid automatic car washes with brushes. Regular maintenance washes every 2-4 weeks will help maintain the coating's performance. We provide detailed care instructions and offer maintenance services specifically designed for ceramic-coated vehicles.",
        },
      ],
    },
    {
      title: "Engine Bay Cleaning",
      items: [
        {
          id: "engine-1",
          question: "Is engine bay cleaning safe for my vehicle?",
          answer:
            "Absolutely. Our engine bay cleaning process is completely safe for modern vehicles. We carefully cover sensitive electrical components and use appropriate cleaners and water pressure. Our technicians are trained to know which areas require special attention or protection. The result is a clean engine bay that not only looks great but also allows for easier identification of leaks or issues.",
        },
        {
          id: "engine-2",
          question: "Why should I have my engine bay cleaned?",
          answer:
            "A clean engine bay not only improves your vehicle's appearance but also has practical benefits. It makes it easier to spot leaks, loose components, or other issues before they become serious problems. It can prevent premature wear of belts and hoses by removing abrasive dirt and grime. Additionally, a clean engine bay can add value when selling or trading in your vehicle.",
        },
      ],
    },
    {
      title: "Paint Correction",
      items: [
        {
          id: "paint-1",
          question: "What is paint correction and when is it necessary?",
          answer:
            "Paint correction is the process of removing imperfections in your vehicle's clear coat and paint through machine polishing. It addresses swirl marks, scratches, water spots, etching, and oxidation. Paint correction is necessary when your vehicle's paint appears dull, shows visible scratches or swirls under light, or has lost its original luster. It's often recommended before applying ceramic coating for optimal results.",
        },
        {
          id: "paint-2",
          question: "How long does paint correction take and how long does it last?",
          answer:
            "A full paint correction typically takes 1-3 days depending on your vehicle's size and condition. The results are permanent in that the removed defects won't return, but new scratches and swirls can develop over time with regular use. To maintain the results, we recommend careful washing techniques and periodic maintenance polishing. Applying a ceramic coating after correction helps preserve the results longer.",
        },
      ],
    },
  ]

  return (
    <div className="w-full">
      <div className="space-y-8">
        {faqCategories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold font-inter">{category.title}</h3>
            <Accordion type="single" collapsible className="w-full">
              {category.items.map((item) => (
                <AccordionItem key={item.id} value={item.id} className="border-b border-gray-200">
                  <AccordionTrigger className="text-left font-medium py-4 hover:no-underline">
                    <span className="text-lg font-inter">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="py-4 text-gray-700 font-inter">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
