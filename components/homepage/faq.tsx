"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const faqCategories = [
  {
    id: "general",
    label: "General",
    questions: [
      {
        question: "What is LaunchPad?",
        answer:
          "LaunchPad is a comprehensive platform designed to connect entrepreneurs, investors, and professionals. Our mission is to help startups find co-founders, secure funding, and access resources needed for growth.",
      },
      {
        question: "How do I get started?",
        answer:
          "Getting started is easy! Simply sign up for a free account, complete your profile with your skills and interests, and start exploring startup ideas or posting your own. Our AI-powered matching system will help connect you with relevant opportunities.",
      },
      {
        question: "Is LaunchPad available worldwide?",
        answer:
          "Yes, LaunchPad is available globally. We have users from over 100 countries and support multiple languages to facilitate international collaboration and networking.",
      },
      {
        question: "How much does it cost to use LaunchPad?",
        answer:
          "We offer a free basic plan that allows you to explore the platform and connect with a limited number of users. For more advanced features, we offer Pro and Enterprise plans with additional benefits. Check our Pricing section for details.",
      },
    ],
  },
  {
    id: "founders",
    label: "For Founders",
    questions: [
      {
        question: "How can I find a co-founder?",
        answer:
          "Our platform uses AI-powered matching to connect you with potential co-founders based on complementary skills, shared interests, and compatible working styles. You can browse profiles, send connection requests, and chat with potential matches.",
      },
      {
        question: "How do I pitch my startup to investors?",
        answer:
          "You can create a detailed startup profile highlighting your business model, traction, team, and funding needs. Our platform allows you to submit your pitch to our network of verified investors or participate in virtual pitch events for more visibility.",
      },
      {
        question: "Can I protect my startup idea on the platform?",
        answer:
          "We take intellectual property seriously. You can control how much information you share publicly, and we offer NDAs for sensitive discussions. However, we encourage sharing enough details to attract the right partners and investors.",
      },
      {
        question: "What resources do you offer for early-stage startups?",
        answer:
          "We provide educational content, mentorship opportunities, legal templates, fundraising guidance, and networking events specifically designed for early-stage startups. Our resource library is constantly updated with the latest industry insights.",
      },
    ],
  },
  {
    id: "investors",
    label: "For Investors",
    questions: [
      {
        question: "How are startups vetted on LaunchPad?",
        answer:
          "We have a multi-stage verification process that includes identity verification, business registration checks, and traction validation. Additionally, our community rating system provides social proof and transparency.",
      },
      {
        question: "Can I set specific criteria for startup opportunities?",
        answer:
          "Yes, investors can set detailed preferences including industry, stage, location, funding amount, and specific metrics. Our AI matching system will then prioritize startups that match your investment thesis.",
      },
      {
        question: "How do I conduct due diligence through the platform?",
        answer:
          "We provide a secure data room feature where startups can share confidential documents with potential investors. You can also request additional information, schedule meetings, and track your due diligence process all within the platform.",
      },
      {
        question: "What fees does LaunchPad charge for investments?",
        answer:
          "LaunchPad does not charge any commission on investments made through the platform. We operate on a subscription model for both startups and investors, keeping the investment process transparent and cost-effective.",
      },
    ],
  },
]

export default function Faq() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeCategory, setActiveCategory] = useState("general")

  return (
    <section ref={ref} className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Find answers to common questions about our platform</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="general" onValueChange={setActiveCategory}>
            <TabsList className="grid grid-cols-3 mb-8">
              {faqCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {faqCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <Card className="border-none shadow-lg">
                  <Accordion type="single" collapsible className="p-6">
                    <AnimatePresence>
                      {category.questions.map((faq, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <AccordionItem value={`item-${index}`} className="border-b border-gray-200 last:border-0">
                            <AccordionTrigger className="text-lg font-medium py-4 hover:text-primary transition-colors">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground py-4">{faq.answer}</AccordionContent>
                          </AccordionItem>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </Accordion>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground">
              Still have questions? Contact our support team at{" "}
              <a href="mailto:support@launchpad.com" className="text-primary hover:underline">
                support@launchpad.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

