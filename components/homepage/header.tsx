"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Rocket, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export default function Header() {
  // This would be determined by auth state in a real app
  const isLoggedIn = false
  const isMobile = useMobile()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Rocket className={`h-6 w-6 ${isScrolled ? "text-primary" : "text-white"}`} />
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? "text-foreground" : "text-white"}`}>
            LaunchPad
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden md:flex items-center gap-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link
            href="#"
            className={`text-sm font-medium transition-colors hover:text-primary ${isScrolled ? "text-foreground" : "text-white"}`}
          >
            Home
          </Link>
          <Link
            href="#"
            className={`text-sm font-medium transition-colors hover:text-primary ${isScrolled ? "text-muted-foreground" : "text-white/80"}`}
          >
            Explore Startups
          </Link>
          <Link
            href="#"
            className={`text-sm font-medium transition-colors hover:text-primary ${isScrolled ? "text-muted-foreground" : "text-white/80"}`}
          >
            How It Works
          </Link>
          <Link
            href="#"
            className={`text-sm font-medium transition-colors hover:text-primary ${isScrolled ? "text-muted-foreground" : "text-white/80"}`}
          >
            Community
          </Link>
          <Link
            href="#"
            className={`text-sm font-medium transition-colors hover:text-primary ${isScrolled ? "text-muted-foreground" : "text-white/80"}`}
          >
            Investors
          </Link>
        </motion.nav>

        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={isScrolled ? "" : "text-white hover:bg-white/10 hover:text-white"}
              >
                Login
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
              >
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? (
              <X className={isScrolled ? "text-foreground" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-foreground" : "text-white"} />
            )}
          </Button>
        </motion.div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-background/95 backdrop-blur-md px-4 py-6 flex flex-col gap-4 border-b">
              <Link
                href="#"
                className="text-foreground font-medium py-2 px-4 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-muted-foreground py-2 px-4 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Explore Startups
              </Link>
              <Link
                href="#"
                className="text-muted-foreground py-2 px-4 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#"
                className="text-muted-foreground py-2 px-4 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Community
              </Link>
              <Link
                href="#"
                className="text-muted-foreground py-2 px-4 rounded-md hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Investors
              </Link>
              <div className="flex flex-col gap-2 mt-2">
                <Button variant="outline" className="w-full justify-center">
                  Login
                </Button>
                <Button className="w-full justify-center bg-gradient-to-r from-primary to-primary/80">Sign Up</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

