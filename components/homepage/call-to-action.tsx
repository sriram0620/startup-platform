"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2 } from "lucide-react"

export default function CallToAction() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      // In a real app, you would send this to your backend
      console.log("Email submitted:", email)
    }
  }

  return (
    <section className="relative overflow-hidden py-24">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 brightness-[0.2]"
        style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-primary/40 mix-blend-multiply z-0" />

      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/30"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/20 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl mb-6">
                Ready to turn your ideas into reality?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of entrepreneurs, investors, and innovators today!
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {!submitted ? (
                <form onSubmit={handleSubmit} className="w-full max-w-md mb-8">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus-visible:ring-white"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button type="submit" className="bg-white text-primary hover:bg-white/90 transition-all">
                      Get Started
                    </Button>
                  </div>
                </form>
              ) : (
                <motion.div
                  className="flex items-center gap-2 text-white bg-white/20 p-4 rounded-md mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <CheckCircle2 className="h-5 w-5 text-green-300" />
                  <span>Thank you! We'll be in touch soon.</span>
                </motion.div>
              )}

              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 group">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Explore Startups
                </Button>
              </div>
            </motion.div>
          </motion.div>

          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-4xl font-bold text-white mb-2">10k+</div>
              <div className="text-white/80">Active Users</div>
            </motion.div>
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-4xl font-bold text-white mb-2">$50M+</div>
              <div className="text-white/80">Funding Secured</div>
            </motion.div>
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-white/80">Successful Startups</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

