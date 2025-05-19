"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, X } from "lucide-react"

const plans = [
  {
    name: "Free",
    description: "Perfect for exploring and getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { name: "Basic profile", included: true },
      { name: "Browse startups", included: true },
      { name: "Connect with 5 users/month", included: true },
      { name: "Basic analytics", included: true },
      { name: "AI matching", included: false },
      { name: "Investor access", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    description: "For serious entrepreneurs and teams",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      { name: "Enhanced profile", included: true },
      { name: "Unlimited browsing", included: true },
      { name: "Unlimited connections", included: true },
      { name: "Advanced analytics", included: true },
      { name: "AI matching", included: true },
      { name: "Investor access", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For established startups seeking funding",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      { name: "Premium profile", included: true },
      { name: "Unlimited browsing", included: true },
      { name: "Unlimited connections", included: true },
      { name: "Advanced analytics", included: true },
      { name: "AI matching", included: true },
      { name: "Investor access", included: true },
      { name: "Priority support", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export default function PricingPlans() {
  const [annual, setAnnual] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Membership Plans</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to accelerate your startup journey
          </p>

          <div className="flex items-center justify-center mt-8">
            <span className={`mr-2 ${!annual ? "text-foreground font-medium" : "text-muted-foreground"}`}>Monthly</span>
            <Switch checked={annual} onCheckedChange={setAnnual} className="data-[state=checked]:bg-primary" />
            <span className={`ml-2 ${annual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              Annual{" "}
              <Badge variant="outline" className="ml-1 bg-green-100 text-green-800 hover:bg-green-100">
                Save 20%
              </Badge>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`border h-full flex flex-col relative overflow-hidden ${
                  plan.popular ? "border-primary shadow-lg shadow-primary/10" : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <p className="text-4xl font-bold">
                      ${annual ? plan.yearlyPrice : plan.monthlyPrice}
                      <span className="text-base font-normal text-muted-foreground">
                        {plan.monthlyPrice > 0 ? (annual ? "/year" : "/month") : ""}
                      </span>
                    </p>
                    {annual && plan.monthlyPrice > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        ${Math.round(plan.yearlyPrice / 12)} per month, billed annually
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground mr-2 shrink-0" />
                        )}
                        <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

