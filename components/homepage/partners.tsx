"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const partners = [
  { name: "TechCrunch", logo: "/placeholder.svg?height=60&width=180&text=TechCrunch" },
  { name: "Forbes", logo: "/placeholder.svg?height=60&width=180&text=Forbes" },
  { name: "Sequoia", logo: "/placeholder.svg?height=60&width=180&text=Sequoia" },
  { name: "Y Combinator", logo: "/placeholder.svg?height=60&width=180&text=Y+Combinator" },
  { name: "AngelList", logo: "/placeholder.svg?height=60&width=180&text=AngelList" },
  { name: "Techstars", logo: "/placeholder.svg?height=60&width=180&text=Techstars" },
]

export default function Partners() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-12 border-b border-gray-100">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-muted-foreground">Trusted by leading companies and investors</p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
            >
              <img src={partner.logo || "/placeholder.svg"} alt={partner.name} className="h-8 md:h-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

