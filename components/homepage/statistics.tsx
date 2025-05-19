"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const fundingData = [
  { name: "Seed", value: 1200000 },
  { name: "Series A", value: 3500000 },
  { name: "Series B", value: 7800000 },
  { name: "Series C", value: 15000000 },
]

const sectorData = [
  { name: "Tech", value: 35 },
  { name: "Health", value: 25 },
  { name: "Finance", value: 20 },
  { name: "Education", value: 15 },
  { name: "Other", value: 5 },
]

const COLORS = ["#4f46e5", "#7c3aed", "#2563eb", "#8b5cf6", "#3b82f6"]

export default function Statistics() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [counters, setCounters] = useState({
    startups: 0,
    investors: 0,
    funding: 0,
    success: 0,
  })

  const targetCounters = {
    startups: 2500,
    investors: 850,
    funding: 75,
    success: 92,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // ms
    const interval = 20 // ms
    const steps = duration / interval

    const incrementCounters = () => {
      setCounters((prev) => ({
        startups: Math.min(prev.startups + Math.ceil(targetCounters.startups / steps), targetCounters.startups),
        investors: Math.min(prev.investors + Math.ceil(targetCounters.investors / steps), targetCounters.investors),
        funding: Math.min(prev.funding + Math.ceil(targetCounters.funding / steps), targetCounters.funding),
        success: Math.min(prev.success + Math.ceil(targetCounters.success / steps), targetCounters.success),
      }))
    }

    const timer = setInterval(() => {
      incrementCounters()

      if (
        counters.startups === targetCounters.startups &&
        counters.investors === targetCounters.investors &&
        counters.funding === targetCounters.funding &&
        counters.success === targetCounters.success
      ) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isVisible, counters])

  const formatValue = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    }
    return `$${value.toLocaleString()}`
  }

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Platform Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform has helped thousands of entrepreneurs connect, fund, and grow their startups.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Startups Launched", value: counters.startups, suffix: "+" },
            { label: "Active Investors", value: counters.investors, suffix: "+" },
            { label: "Million in Funding", value: counters.funding, prefix: "$", suffix: "M" },
            { label: "Success Rate", value: counters.success, suffix: "%" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-none shadow-md h-full bg-gradient-to-br from-white to-primary/5">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.prefix}
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-none shadow-md h-full">
              <CardHeader>
                <CardTitle>Average Funding by Stage</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[300px] w-full p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={fundingData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${value / 1000000}M`} />
                      <Tooltip formatter={(value) => formatValue(Number(value))} />
                      <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-none shadow-md h-full">
              <CardHeader>
                <CardTitle>Startup Distribution by Sector</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sectorData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {sectorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

