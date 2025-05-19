"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { QuoteIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    quote:
      "I found my co-founder and raised my first round of funding within 3 months! The platform's AI matching system is incredibly accurate.",
    name: "John Doe",
    title: "Founder of XYZ Tech",
    avatar: "/placeholder.svg?height=64&width=64",
    rating: 5,
  },
  {
    quote:
      "The AI matching system introduced me to the perfect technical co-founder for my vision. We've been working together for a year now and just secured Series A funding.",
    name: "Amanda Roberts",
    title: "CEO of GreenSolutions",
    avatar: "/placeholder.svg?height=64&width=64",
    rating: 5,
  },
  {
    quote:
      "As an investor, I've found some of the most promising startups through this platform. The quality of entrepreneurs and ideas is exceptional.",
    name: "Robert Chen",
    title: "Partner at Venture Capital",
    avatar: "/placeholder.svg?height=64&width=64",
    rating: 4,
  },
  {
    quote:
      "The networking opportunities on this platform are unmatched. I've connected with mentors who have transformed my business strategy completely.",
    name: "Sarah Johnson",
    title: "Founder of HealthTech Innovations",
    avatar: "/placeholder.svg?height=64&width=64",
    rating: 5,
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (autoplay) {
      timerRef.current = setInterval(nextTestimonial, 5000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [autoplay])

  const handleMouseEnter = () => setAutoplay(false)
  const handleMouseLeave = () => setAutoplay(true)

  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/5">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Success Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how entrepreneurs and investors are achieving their goals on our platform.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-md bg-background hover:bg-background/80"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
          </div>

          <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full shadow-md bg-background hover:bg-background/80"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>

          <div className="overflow-hidden px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-white to-primary/5">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="md:w-1/3 flex flex-col items-center">
                        <Avatar className="h-24 w-24 border-4 border-primary/10 shadow-xl">
                          <AvatarImage src={testimonials[current].avatar} alt={testimonials[current].name} />
                          <AvatarFallback>{testimonials[current].name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h4 className="font-bold text-lg mt-4 text-center">{testimonials[current].name}</h4>
                        <p className="text-sm text-muted-foreground text-center">{testimonials[current].title}</p>
                        <div className="flex mt-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < testimonials[current].rating ? "text-yellow-400" : "text-gray-300"}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>

                      <div className="md:w-2/3">
                        <QuoteIcon className="h-12 w-12 text-primary/20 mb-4" />
                        <p className="text-lg md:text-xl italic leading-relaxed">"{testimonials[current].quote}"</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  current === index ? "bg-primary scale-125" : "bg-primary/30"
                }`}
                onClick={() => setCurrent(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

