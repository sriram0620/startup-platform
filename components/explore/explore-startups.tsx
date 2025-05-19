"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ExploreHeader from "./explore-header"
import StartupFeed from "./startup-feed"
import SidebarFilters from "./sidebar-filters"
import RecommendedStartups from "./recommended-startups"
import TrendingTopics from "./trending-topics"
import CommunitySection from "./community-section"
import Navbar from "../homepage/navbar"
import Footer from "../homepage/footer"
import { startups as initialStartups, type Startup, teamSizes } from "@/data/startups"

export default function ExploreStartups() {
  // Filter states
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStages, setSelectedStages] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedTeamSizes, setSelectedTeamSizes] = useState<string[]>([])
  const [fundingRange, setFundingRange] = useState([0, 2000000])
  const [sortBy, setSortBy] = useState("latest")
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>(initialStartups)
  const [showFilterModal, setShowFilterModal] = useState(false)

  // Check for global startups (updated from profile page)
  const [startups, setStartups] = useState<Startup[]>(initialStartups)

  // Listen for changes to global startups
  useEffect(() => {
    // Check if window.startups exists (set from profile page)
    if (typeof window !== "undefined" && window.startups) {
      // @ts-ignore
      setStartups(window.startups)
    }

    // Set up event listener for startup changes
    const handleStartupChange = (e: CustomEvent) => {
      // @ts-ignore
      if (e.detail && e.detail.startups) {
        // @ts-ignore
        setStartups(e.detail.startups)
      }
    }

    // Add event listener
    window.addEventListener("startupsChanged", handleStartupChange)

    // Cleanup
    return () => {
      window.removeEventListener("startupsChanged", handleStartupChange)
    }
  }, [])

  // Apply all filters
  useEffect(() => {
    let filtered = [...startups]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (startup) =>
          startup.name.toLowerCase().includes(query) ||
          startup.description.toLowerCase().includes(query) ||
          startup.category.toLowerCase().includes(query) ||
          (startup.tags && startup.tags.some((tag) => tag.toLowerCase().includes(query))),
      )
    }

    // Apply tab filter
    if (activeTab !== "all") {
      if (activeTab === "trending") {
        filtered = filtered.filter((startup) => startup.isTrending)
      } else if (activeTab === "new") {
        filtered = filtered.filter((startup) => startup.isNew)
      } else if (activeTab === "following") {
        filtered = filtered.filter((startup) => startup.isFollowing)
      }
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((startup) => selectedCategories.includes(startup.category))
    }

    // Apply stage filter
    if (selectedStages.length > 0) {
      filtered = filtered.filter((startup) => selectedStages.includes(startup.stage))
    }

    // Apply location filter
    if (selectedLocations.length > 0) {
      filtered = filtered.filter((startup) => {
        if (selectedLocations.includes("remote") && startup.isRemote) return true
        if (selectedLocations.includes("local")) {
          // In a real app, we would check if the startup is within 50 miles
          // For now, we'll just check if it's in a specific set of locations
          const localCities = ["San Francisco, CA", "Boston, MA", "New York, NY"]
          return localCities.includes(startup.location)
        }
        if (selectedLocations.includes("global")) return true
        return false
      })
    }

    // Apply team size filter
    if (selectedTeamSizes.length > 0) {
      filtered = filtered.filter((startup) => {
        return selectedTeamSizes.some((sizeId) => {
          const size = teamSizes.find((s) => s.id === sizeId)
          if (!size) return false
          return startup.teamSize >= size.range[0] && startup.teamSize <= size.range[1]
        })
      })
    }

    // Apply funding range filter
    filtered = filtered.filter(
      (startup) =>
        (typeof startup.fundingRaised === "number" && !isNaN(startup.fundingRaised) ? startup.fundingRaised : 0) >=
          fundingRange[0] &&
        (typeof startup.fundingRaised === "number" && !isNaN(startup.fundingRaised) ? startup.fundingRaised : 0) <=
          fundingRange[1],
    )

    // Apply sorting
    switch (sortBy) {
      case "latest":
        filtered.sort((a, b) => new Date(b.founded).getTime() - new Date(a.founded).getTime())
        break
      case "popular":
        filtered.sort(
          (a, b) =>
            (typeof b.followers === "number" && !isNaN(b.followers) ? b.followers : 0) -
            (typeof a.followers === "number" && !isNaN(a.followers) ? a.followers : 0),
        )
        break
      case "trending":
        filtered.sort((a, b) => {
          const aGrowth = Number.parseFloat((a.growth || "+0%").replace("%", "").replace("+", ""))
          const bGrowth = Number.parseFloat((b.growth || "+0%").replace("%", "").replace("+", ""))
          return bGrowth - aGrowth
        })
        break
      case "funding":
        filtered.sort(
          (a, b) =>
            (typeof b.fundingRaised === "number" && !isNaN(b.fundingRaised) ? b.fundingRaised : 0) -
            (typeof a.fundingRaised === "number" && !isNaN(a.fundingRaised) ? a.fundingRaised : 0),
        )
        break
    }

    setFilteredStartups(filtered)
  }, [
    searchQuery,
    activeTab,
    selectedCategories,
    selectedStages,
    selectedLocations,
    selectedTeamSizes,
    fundingRange,
    sortBy,
    startups,
  ])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-16">
        <ExploreHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setSortBy={setSortBy}
          sortBy={sortBy}
          showFilterModal={showFilterModal}
          setShowFilterModal={setShowFilterModal}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />

        <div className="container mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Filters */}
            <motion.div
              className="lg:col-span-3 order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SidebarFilters
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedStages={selectedStages}
                setSelectedStages={setSelectedStages}
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
                selectedTeamSizes={selectedTeamSizes}
                setSelectedTeamSizes={setSelectedTeamSizes}
                fundingRange={fundingRange}
                setFundingRange={setFundingRange}
                showFilterModal={showFilterModal}
                setShowFilterModal={setShowFilterModal}
              />
            </motion.div>

            {/* Main Content */}
            <motion.div
              className="lg:col-span-9 order-1 lg:order-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <RecommendedStartups startups={filteredStartups.slice(0, 5)} />
              <TrendingTopics />
              <StartupFeed startups={filteredStartups} activeTab={activeTab} searchQuery={searchQuery} />
              <CommunitySection />
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

