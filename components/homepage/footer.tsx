"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Rocket, Linkedin, Twitter, Instagram, ArrowRight, Mail, MapPin, Phone } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
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
    <footer className="bg-secondary-foreground text-secondary">
      <div className="container py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div className="space-y-4" variants={item}>
            <div className="flex items-center gap-2">
              <Rocket className="h-6 w-6" />
              <span className="text-xl font-bold">LaunchPad</span>
            </div>
            <p className="text-secondary/70 max-w-xs">
              The premier platform for startup networking, team building, and funding.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-secondary/70 hover:text-secondary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-secondary/70 hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-secondary/70 hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-secondary/70 hover:text-secondary transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary/70 hover:text-secondary transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary/70 hover:text-secondary transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary/70 hover:text-secondary transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-secondary/70 hover:text-secondary transition-colors flex items-center gap-2 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="text-lg font-medium mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-secondary/70">
                <Mail className="h-5 w-5 mt-0.5 text-primary/70" />
                <span>support@launchpad.com</span>
              </li>
              <li className="flex items-start gap-3 text-secondary/70">
                <Phone className="h-5 w-5 mt-0.5 text-primary/70" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-secondary/70">
                <MapPin className="h-5 w-5 mt-0.5 text-primary/70" />
                <span>123 Startup Avenue, Innovation District, CA 94103</span>
              </li>
              <li>
                <Link href="#" className="text-secondary/70 hover:text-secondary transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="text-lg font-medium mb-4">Stay Updated</h3>
            <p className="text-secondary/70 mb-4">Stay updated with startup trends and opportunities!</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border-white/20 text-secondary placeholder:text-secondary/50 focus-visible:ring-primary"
              />
              <Button variant="default" className="bg-primary hover:bg-primary/90 group">
                <span className="sr-only md:not-sr-only md:inline-block">Subscribe</span>
                <ArrowRight className="h-4 w-4 md:ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <p className="text-xs text-secondary/70">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-secondary/20 mt-12 pt-6 text-center text-secondary/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>&copy; {new Date().getFullYear()} LaunchPad. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

