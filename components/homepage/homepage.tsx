"use client"

import { useEffect, useState } from "react"
import Navbar from "./navbar"
import Hero from "./hero"
import Features from "./features"
import TrendingStartups from "./trending-startups"
import Testimonials from "./testimonials"
import HowItWorks from "./how-it-works"
import CallToAction from "./call-to-action"
import Footer from "./footer"
import Statistics from "./statistics"
import Partners from "./partners"
import PricingPlans from "./pricing-plans"
import BlogPreview from "./blog-preview"
import UpcomingEvents from "./upcoming-events"
import Faq from "./faq"
import { motion } from "framer-motion"

export default function Homepage() {
  const [isMounted, setIsMounted] = useState(false)

  // Initialize AOS-like scroll animations
  useEffect(() => {
    setIsMounted(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".animate-on-scroll").forEach((element) => {
      observer.observe(element)
    })

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((element) => {
        observer.unobserve(element)
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Hero />
        <Partners />
        <Features />
        <Statistics />
        <TrendingStartups />
        <HowItWorks />
        <PricingPlans />
        <Testimonials />
        <UpcomingEvents />
        <BlogPreview />
        <Faq />
        <CallToAction />
      </motion.main>
      <Footer />
    </div>
  )
}

