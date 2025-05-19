"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, TrendingUp, Zap, Users, MapPin, ChevronDown, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { categories } from "@/data/startups"

interface ExploreHeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  activeTab: string
  setActiveTab: (tab: string) => void
  setSortBy: (sort: string) => void
  sortBy: string
  showFilterModal: boolean
  setShowFilterModal: (show: boolean) => void
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
}

export default function ExploreHeader({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  setSortBy,
  sortBy,
  showFilterModal,
  setShowFilterModal,
  selectedCategories,
  setSelectedCategories,
}: ExploreHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [quickFilters, setQuickFilters] = useState<string[]>([])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleQuickFilter = (filter: string) => {
    if (quickFilters.includes(filter)) {
      setQuickFilters(quickFilters.filter((f) => f !== filter))
      setSelectedCategories(selectedCategories.filter((c) => c !== filter))
    } else {
      setQuickFilters([...quickFilters, filter])
      setSelectedCategories([...selectedCategories, filter])
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  const getSortLabel = () => {
    switch (sortBy) {
      case "latest":
        return "Latest"
      case "popular":
        return "Most Popular"
      case "trending":
        return "Trending"
      case "funding":
        return "Most Funded"
      default:
        return "Latest"
    }
  }

  return (
    <div
      className={`sticky top-16 z-30 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-4"
          : "bg-gradient-to-r from-primary/5 to-purple-500/5 py-8"
      }`}
    >
      <div className="container">
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Explore Startups</h1>
              <p className="text-muted-foreground mt-1">Discover innovative ideas and connect with founders</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  Sort: {getSortLabel()}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                  <DropdownMenuRadioItem value="latest">Latest</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="popular">Most Popular</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="trending">Trending</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="funding">Most Funded</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search startups, founders, or industries..."
                className="pl-9 pr-10 h-12 bg-background border-primary/20 rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={clearSearch}
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <Sheet open={showFilterModal} onOpenChange={setShowFilterModal}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-12 w-12 rounded-full">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Startups</SheetTitle>
                  <SheetDescription>Apply filters to find exactly what you're looking for</SheetDescription>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge
                          key={category}
                          variant={selectedCategories.includes(category) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            if (selectedCategories.includes(category)) {
                              setSelectedCategories(selectedCategories.filter((c) => c !== category))
                            } else {
                              setSelectedCategories([...selectedCategories, category])
                            }
                          }}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <SheetClose asChild>
                    <Button variant="outline" onClick={() => setSelectedCategories([])}>
                      Reset
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button>Apply Filters</Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Technology", "Healthcare", "Finance", "Education", "Sustainability"].map((category) => (
              <Badge
                key={category}
                variant={quickFilters.includes(category) ? "default" : "outline"}
                className="rounded-full px-3 py-1 cursor-pointer"
                onClick={() => toggleQuickFilter(category)}
              >
                {category}
              </Badge>
            ))}
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 flex items-center gap-1 cursor-pointer"
              onClick={() => setShowFilterModal(true)}
            >
              <MapPin className="h-3 w-3" />
              More Filters
            </Badge>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent p-0 h-auto space-x-2">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-1.5 text-sm h-auto"
              >
                All Startups
              </TabsTrigger>
              <TabsTrigger
                value="trending"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-1.5 text-sm h-auto"
              >
                <TrendingUp className="h-3.5 w-3.5 mr-1" />
                Trending
              </TabsTrigger>
              <TabsTrigger
                value="new"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-1.5 text-sm h-auto"
              >
                <Zap className="h-3.5 w-3.5 mr-1" />
                New
              </TabsTrigger>
              <TabsTrigger
                value="following"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full px-4 py-1.5 text-sm h-auto"
              >
                <Users className="h-3.5 w-3.5 mr-1" />
                Following
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

