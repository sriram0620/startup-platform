"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, CheckCircle, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

// Fix the hydration error by making the ParticleAnimation and other client-side components only render on the client
// Replace the ParticleAnimation component with this updated version
const ParticleAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        // Use fixed initial values for server-side rendering
        this.x = 0
        this.y = 0
        this.size = 2
        this.speedX = 0
        this.speedY = 0
        this.color = "hsla(230, 70%, 60%, 0.2)"
      }

      // Initialize with random values only on client-side
      initialize() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25
        this.color = `hsla(${Math.random() * 60 + 220}, 70%, 60%, ${Math.random() * 0.3 + 0.1})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(100, Math.floor(window.innerWidth / 10))

    for (let i = 0; i < numberOfParticles; i++) {
      const particle = new Particle()
      particle.initialize() // Initialize with random values only on client-side
      particlesArray.push(particle)
    }

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      // Connect particles with lines
      connectParticles()

      requestAnimationFrame(animate)
    }

    // Connect particles with lines if they're close enough
    const connectParticles = () => {
      if (!ctx) return
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.strokeStyle = `hsla(230, 70%, 60%, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  if (!isMounted) return null

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

// 3D floating card component
const FloatingCard = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateXValue = (y - centerY) / 20
    const rotateYValue = (centerX - x) / 20

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative transition-transform duration-200", className)}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ translateZ: 10 }}
    >
      {children}
    </motion.div>
  )
}

// Testimonial card component
const TestimonialCard = ({
  quote,
  author,
  role,
  company,
  avatar,
  delay = 0,
}: {
  quote: string
  author: string
  role: string
  company: string
  avatar: string
  delay?: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-background/50 backdrop-blur-lg border rounded-xl p-4 shadow-lg"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={avatar || "/placeholder.svg"} alt={author} className="w-full h-full object-cover" />
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">{quote}</p>
          <div className="flex items-center gap-1">
            <p className="text-xs font-medium">{author}</p>
            <span className="text-xs text-muted-foreground">
              • {role}, {company}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Update the CounterAnimation component to fix hydration issues
const CounterAnimation = ({
  end,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
}) => {
  const [count, setCount] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const nodeRef = useRef<HTMLSpanElement>(null)
  const { scrollYProgress } = useScroll({
    target: nodeRef,
    offset: ["start end", "end start"],
  })

  useEffect(() => {
    setIsMounted(true)
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Only start counting when element is in view
      if (latest > 0 && latest < 1) {
        const progress = Math.min(latest * 2, 1) // Double the speed but cap at 1
        setCount(Math.floor(end * progress))
      }
    })

    return () => unsubscribe()
  }, [end, scrollYProgress])

  // Return 0 during server-side rendering to avoid hydration mismatch
  if (!isMounted) {
    return (
      <span ref={nodeRef}>
        {prefix}0{suffix}
      </span>
    )
  }

  return (
    <span ref={nodeRef} className="tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Add a carousel component for the hero section
const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const slides = [
    {
      title: "Platform Dashboard",
      image: "/placeholder.svg?height=600&width=800&text=Platform+Dashboard",
      stats: { label: "Funding Progress", value: "75%", amount: "$750K", goal: "$1M" },
    },
    {
      title: "Investor Matching",
      image: "/placeholder.svg?height=600&width=800&text=Investor+Matching",
      stats: { label: "Match Rate", value: "85%", amount: "85%", goal: "Success" },
    },
    {
      title: "Startup Analytics",
      image: "/placeholder.svg?height=600&width=800&text=Startup+Analytics",
      stats: { label: "Growth Rate", value: "32%", amount: "32%", goal: "Monthly" },
    },
  ]

  useEffect(() => {
    setIsMounted(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  if (!isMounted) return null

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <FloatingCard className="relative z-20 rounded-xl overflow-hidden shadow-2xl border border-primary/10">
            <img
              src={slides[currentSlide].image || "/placeholder.svg"}
              alt={slides[currentSlide].title}
              className="w-full h-auto rounded-xl"
            />

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm border border-primary/10 rounded-full px-3 py-1 text-xs font-medium">
              Live Demo
            </div>

            {/* Floating notification */}
            <motion.div
              initial={{ opacity: 0, y: 20, x: -20 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                repeatDelay: 5,
              }}
              className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm border border-primary/10 rounded-lg p-3 shadow-lg max-w-[200px]"
            >
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xs font-medium">New Connection!</p>
                  <p className="text-xs text-muted-foreground">Alex just matched with an investor</p>
                </div>
              </div>
            </motion.div>
          </FloatingCard>

          {/* Floating stats card - fixed position to avoid overlap */}
          <motion.div
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute -top-6 -left-6 z-10 bg-background/50 backdrop-blur-lg border rounded-xl p-4 shadow-lg max-w-[200px]"
            style={{ marginTop: "24px", marginLeft: "24px" }} // Add margin to prevent overlap
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{slides[currentSlide].stats.label}</span>
                <Badge variant="outline" className="text-xs bg-green-100 text-green-800 hover:bg-green-100">
                  +12%
                </Badge>
              </div>
              <div className="h-2 bg-primary/20 rounded-full mb-2 overflow-hidden">
                <motion.div
                  className="h-full bg-primary rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: slides[currentSlide].stats.value }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium">{slides[currentSlide].stats.amount}</span>
                <span className="text-muted-foreground">{slides[currentSlide].stats.goal}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel indicators */}
      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index ? "bg-primary scale-125 w-4" : "bg-primary/30"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// Update the Hero component to use the carousel
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const testimonials = [
    {
      quote: "LaunchPad helped me find the perfect technical co-founder in just 2 weeks!",
      author: "Sarah Johnson",
      role: "Founder",
      company: "HealthTech",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    },
    {
      quote: "Raised our seed round 30% faster thanks to LaunchPad's investor matching.",
      author: "Michael Chen",
      role: "CEO",
      company: "DataSync",
      avatar: "/placeholder.svg?height=40&width=40&text=MC",
    },
    {
      quote: "The resources and mentorship were game-changing for our early growth.",
      author: "Priya Patel",
      role: "Co-founder",
      company: "EcoSolutions",
      avatar: "/placeholder.svg?height=40&width=40&text=PP",
    },
  ]

  useEffect(() => {
    setIsMounted(true)
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  // Only render client-side components when mounted
  if (!isMounted) {
    return (
      <section ref={ref} className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50 z-0" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0" />
        <div className="container relative z-10">
          {/* Static content for server-side rendering */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex flex-col">
              <Badge className="mb-4 py-1.5 px-4 bg-primary/10 text-primary border-primary/20 rounded-full">
                <Star className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                <span>Trusted by 10,000+ founders</span>
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                <span className="inline bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  Launch
                </span>{" "}
                Your Startup{" "}
                <span className="inline bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  Faster
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-6 max-w-lg">
                Connect with co-founders, investors, and resources to turn your vision into reality. The all-in-one
                platform for startup success.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50 z-0" />
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0" />
      {isMounted && <ParticleAnimation />}

      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl opacity-30" />

      <motion.div style={{ y, opacity }} className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Badge className="mb-4 py-1.5 px-4 bg-primary/10 text-primary border-primary/20 rounded-full">
                <Star className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                <span>Trusted by 10,000+ founders</span>
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            >
              <span className="inline bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Launch
              </span>{" "}
              Your Startup{" "}
              <span className="inline bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Faster
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-muted-foreground mb-6 max-w-lg"
            >
              Connect with co-founders, investors, and resources to turn your vision into reality. The all-in-one
              platform for startup success.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <div className="relative flex-1">
                <Input
                  placeholder="Enter your email"
                  className="pr-32 h-12 rounded-full border-primary/20 bg-background/50 backdrop-blur-sm"
                />
                <Button className="absolute right-1 top-1 h-10 rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-muted-foreground"
            >
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                <span>Cancel anytime</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 flex flex-col sm:flex-row gap-6"
            >
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-full">
                  <Play className="h-4 w-4 mr-2 text-primary" />
                  Watch Demo
                </Button>
                <Button variant="link" size="sm" className="text-primary">
                  Learn more
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm ml-1.5 text-muted-foreground">
                  <span className="font-medium text-foreground">4.9/5</span> from 2,000+ reviews
                </span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-12 grid grid-cols-3 gap-4"
            >
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold">
                  {isMounted ? <CounterAnimation end={10000} suffix="+" /> : "10,000+"}
                </p>
                <p className="text-sm text-muted-foreground">Startups</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold">
                  {isMounted ? <CounterAnimation end={25000} suffix="+" /> : "25,000+"}
                </p>
                <p className="text-sm text-muted-foreground">Connections</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-bold">
                  {isMounted ? <CounterAnimation prefix="$" end={500} suffix="M" /> : "$500M"}
                </p>
                <p className="text-sm text-muted-foreground">Funding Raised</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Visual elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            {isMounted && <HeroCarousel />}

            {/* Floating testimonial cards */}
            <AnimatePresence mode="wait">
              {isMounted && (
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -bottom-6 -right-6 z-10 max-w-[250px]"
                >
                  <TestimonialCard {...testimonials[activeTestimonial]} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

