"use client"

import { LightbulbIcon, Users, DollarSign, Brain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

const features = [
  {
    icon: LightbulbIcon,
    title: "Post Your Startup Idea",
    description: "Share your vision and get noticed by the right people in our community.",
  },
  {
    icon: Users,
    title: "Find the Right Team",
    description: "Connect with skilled professionals who share your passion and vision.",
  },
  {
    icon: DollarSign,
    title: "Secure Funding",
    description: "Get noticed by investors and secure the capital needed to grow.",
  },
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Our intelligent algorithm connects you with relevant startup ideas and people.",
  },
]

export default function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="container py-24">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why Join Our Platform?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our platform offers unique features designed to help entrepreneurs succeed.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={item}>
            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 h-full overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="pb-2 relative">
                <div className="mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

