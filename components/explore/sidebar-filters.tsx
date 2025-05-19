"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Briefcase, TrendingUp, MapPin, Calendar, Star, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { categories, stages, teamSizes, locations } from "@/data/startups"

interface SidebarFiltersProps {
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  selectedStages: string[]
  setSelectedStages: (stages: string[]) => void
  selectedLocations: string[]
  setSelectedLocations: (locations: string[]) => void
  selectedTeamSizes: string[]
  setSelectedTeamSizes: (sizes: string[]) => void
  fundingRange: number[]
  setFundingRange: (range: number[]) => void
  showFilterModal: boolean
  setShowFilterModal: (show: boolean) => void
}

export default function SidebarFilters({
  selectedCategories,
  setSelectedCategories,
  selectedStages,
  setSelectedStages,
  selectedLocations,
  setSelectedLocations,
  selectedTeamSizes,
  setSelectedTeamSizes,
  fundingRange,
  setFundingRange,
  showFilterModal,
  setShowFilterModal,
}: SidebarFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    stage: true,
    location: true,
    funding: true,
    teamSize: true,
  })

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  const toggleStage = (stage: string) => {
    if (selectedStages.includes(stage)) {
      setSelectedStages(selectedStages.filter((s) => s !== stage))
    } else {
      setSelectedStages([...selectedStages, stage])
    }
  }

  const toggleLocation = (locationId: string) => {
    if (selectedLocations.includes(locationId)) {
      setSelectedLocations(selectedLocations.filter((l) => l !== locationId))
    } else {
      setSelectedLocations([...selectedLocations, locationId])
    }
  }

  const toggleTeamSize = (sizeId: string) => {
    if (selectedTeamSizes.includes(sizeId)) {
      setSelectedTeamSizes(selectedTeamSizes.filter((s) => s !== sizeId))
    } else {
      setSelectedTeamSizes([...selectedTeamSizes, sizeId])
    }
  }

  const formatFundingValue = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`
    }
    return `$${value}`
  }

  const resetAllFilters = () => {
    setSelectedCategories([])
    setSelectedStages([])
    setSelectedLocations([])
    setSelectedTeamSizes([])
    setFundingRange([0, 2000000])
  }

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="p-0">
          <div className="h-20 bg-gradient-to-r from-primary to-purple-600"></div>
        </CardHeader>
        <CardContent className="pt-0 p-4">
          <div className="flex flex-col items-center -mt-10">
            <Avatar className="h-16 w-16 border-4 border-background">
              <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold mt-2">John Doe</h3>
            <p className="text-sm text-muted-foreground">Tech Entrepreneur</p>

            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs bg-green-100 text-green-800">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Verified
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Star className="h-3 w-3 mr-1 text-yellow-500" />
                4.9
              </Badge>
            </div>

            <div className="grid grid-cols-3 w-full mt-4 text-center">
              <div>
                <p className="text-sm font-semibold">12</p>
                <p className="text-xs text-muted-foreground">Connections</p>
              </div>
              <div>
                <p className="text-sm font-semibold">3</p>
                <p className="text-xs text-muted-foreground">Startups</p>
              </div>
              <div>
                <p className="text-sm font-semibold">8</p>
                <p className="text-xs text-muted-foreground">Following</p>
              </div>
            </div>

            <Button variant="outline" size="sm" className="mt-4 w-full">
              View Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-primary" />
            Filters
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-foreground"
            onClick={resetAllFilters}
          >
            Reset All
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Categories */}
          <div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleSection("categories")}
            >
              <h3 className="font-medium text-sm">Categories</h3>
              {expandedSections.categories ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            <AnimatePresence>
              {expandedSections.categories && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 space-y-2"
                >
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label htmlFor={`category-${category}`} className="text-sm flex items-center cursor-pointer">
                        <Briefcase className="h-3.5 w-3.5 mr-1.5 text-primary" />
                        {category}
                      </label>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Startup Stage */}
          <div>
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("stage")}>
              <h3 className="font-medium text-sm">Startup Stage</h3>
              {expandedSections.stage ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            <AnimatePresence>
              {expandedSections.stage && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 space-y-2"
                >
                  {stages.map((stage) => (
                    <div key={stage} className="flex items-center space-x-2">
                      <Checkbox
                        id={`stage-${stage}`}
                        checked={selectedStages.includes(stage)}
                        onCheckedChange={() => toggleStage(stage)}
                      />
                      <label htmlFor={`stage-${stage}`} className="text-sm cursor-pointer">
                        {stage}
                      </label>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Location */}
          <div>
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("location")}>
              <h3 className="font-medium text-sm">Location</h3>
              {expandedSections.location ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            <AnimatePresence>
              {expandedSections.location && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 space-y-2"
                >
                  {locations.map((location) => (
                    <div key={location.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${location.id}`}
                        checked={selectedLocations.includes(location.id)}
                        onCheckedChange={() => toggleLocation(location.id)}
                      />
                      <label htmlFor={`location-${location.id}`} className="text-sm flex items-center cursor-pointer">
                        <MapPin className="h-3.5 w-3.5 mr-1.5 text-primary" />
                        {location.label}
                      </label>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Funding Range */}
          <div>
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("funding")}>
              <h3 className="font-medium text-sm">Funding Range</h3>
              {expandedSections.funding ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            <AnimatePresence>
              {expandedSections.funding && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 px-2"
                >
                  <Slider
                    min={0}
                    max={2000000}
                    step={50000}
                    value={fundingRange}
                    onValueChange={setFundingRange}
                    className="mt-6"
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>{formatFundingValue(fundingRange[0])}</span>
                    <span>{formatFundingValue(fundingRange[1])}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Team Size */}
          <div>
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection("teamSize")}>
              <h3 className="font-medium text-sm">Team Size</h3>
              {expandedSections.teamSize ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>

            <AnimatePresence>
              {expandedSections.teamSize && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-2 space-y-2"
                >
                  {teamSizes.map((size) => (
                    <div key={size.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`size-${size.id}`}
                        checked={selectedTeamSizes.includes(size.id)}
                        onCheckedChange={() => toggleTeamSize(size.id)}
                      />
                      <label htmlFor={`size-${size.id}`} className="text-sm cursor-pointer">
                        {size.label}
                      </label>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 group cursor-pointer">
              <div className="bg-primary/10 text-primary rounded-md p-2 text-center min-w-[48px]">
                <div className="text-xs font-medium">APR</div>
                <div className="text-lg font-bold">15</div>
              </div>
              <div>
                <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                  Startup Pitch Competition
                </h4>
                <p className="text-xs text-muted-foreground">Virtual Event • 2:00 PM EST</p>
              </div>
            </div>

            <div className="flex items-start gap-3 group cursor-pointer">
              <div className="bg-primary/10 text-primary rounded-md p-2 text-center min-w-[48px]">
                <div className="text-xs font-medium">APR</div>
                <div className="text-lg font-bold">22</div>
              </div>
              <div>
                <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                  Founder Networking Mixer
                </h4>
                <p className="text-xs text-muted-foreground">New York, NY • 6:30 PM EST</p>
              </div>
            </div>

            <Button variant="ghost" size="sm" className="w-full text-primary text-xs mt-2">
              View All Events
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

