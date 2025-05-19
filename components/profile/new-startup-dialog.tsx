"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, DollarSign, MapPin, Tag, Upload, X, Plus, ChevronRight, ChevronLeft, Check } from "lucide-react"
import { categories, stages } from "@/data/startups"

interface NewStartupDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddStartup: (startup: any) => void
}

export default function NewStartupDialog({ open, onOpenChange, onAddStartup }: NewStartupDialogProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: categories[0],
    stage: stages[0],
    location: "",
    teamSize: 1,
    fundingGoal: 100000,
    fundingRaised: 0,
    tags: [] as string[],
    logo: "/placeholder.svg?height=80&width=80",
    coverImage: "/placeholder.svg?height=400&width=600&text=Startup+Cover",
    founded: new Date().toISOString().split("T")[0],
  })

  const totalSteps = 4

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData({ ...formData, [name]: value[0] })
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setLogoPreview(result)
        setFormData({ ...formData, logo: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setCoverPreview(result)
        setFormData({ ...formData, coverImage: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()]
      setTags(newTags)
      setFormData({ ...formData, tags: newTags })
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(newTags)
    setFormData({ ...formData, tags: newTags })
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Generate a unique ID for the new startup
    const id = Date.now()

    // Create the new startup object with all required fields for proper display and filtering
    const newStartup = {
      id,
      name: formData.name,
      logo: formData.logo,
      founder: {
        name: "John Doe", // Current user's name
        avatar: "/placeholder.svg?height=40&width=40&text=JD", // Current user's avatar
      },
      founderName: "John Doe", // For profile-startups.tsx
      founderAvatar: "/placeholder.svg?height=40&width=40&text=JD", // For profile-startups.tsx
      category: formData.industry,
      industry: formData.industry, // For profile-startups.tsx
      description: formData.description,
      image: formData.coverImage,
      coverImage: formData.coverImage, // For profile-startups.tsx
      likes: 0,
      comments: 0,
      shares: 0,
      followers: 0,
      growth: "+0%",
      fundingGoal: Number.parseInt(formData.fundingGoal.toString()),
      fundingRaised: Number.parseInt(formData.fundingRaised.toString()),
      location: formData.location,
      teamSize: Number.parseInt(formData.teamSize.toString()),
      founded: formData.founded,
      stage: formData.stage,
      tags: formData.tags,
      isFollowing: false,
      isLiked: false,
      isBookmarked: false,
      isRemote: formData.location.toLowerCase().includes("remote"),
      isTrending: false,
      isNew: true,
      role: "Founder", // For profile-startups.tsx
    }

    // Pass the new startup to the parent component
    onAddStartup(newStartup)

    // Reset form and close dialog
    setFormData({
      name: "",
      description: "",
      industry: categories[0],
      stage: stages[0],
      location: "",
      teamSize: 1,
      fundingGoal: 100000,
      fundingRaised: 0,
      tags: [],
      logo: "/placeholder.svg?height=80&width=80",
      coverImage: "/placeholder.svg?height=400&width=600&text=Startup+Cover",
      founded: new Date().toISOString().split("T")[0],
    })
    setTags([])
    setCurrentStep(1)
    setLogoPreview(null)
    setCoverPreview(null)
    onOpenChange(false)
  }

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== "" && formData.description.trim() !== ""
      case 2:
        return formData.industry !== "" && formData.stage !== "" && formData.location.trim() !== ""
      case 3:
        return true // Funding and team size always have default values
      case 4:
        return true // Tags are optional
      default:
        return false
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold">Create New Startup</DialogTitle>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="px-6">
          <div className="flex justify-between mb-2">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep > index + 1
                    ? "bg-primary text-primary-foreground"
                    : currentStep === index + 1
                      ? "bg-primary/20 text-primary border border-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > index + 1 ? <Check className="h-4 w-4" /> : <span>{index + 1}</span>}
              </div>
            ))}
          </div>
          <div className="w-full bg-muted h-1 mb-6">
            <div
              className="bg-primary h-1 transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="px-6 pb-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-primary" />
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Startup Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter your startup name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 rounded-md">
                      <AvatarImage src={logoPreview || formData.logo} alt="Logo preview" />
                      <AvatarFallback className="rounded-md bg-primary/10">
                        {formData.name ? formData.name.charAt(0) : "S"}
                      </AvatarFallback>
                    </Avatar>
                    <Label
                      htmlFor="logo-upload"
                      className="cursor-pointer bg-muted hover:bg-muted/80 px-4 py-2 rounded-md text-sm flex items-center"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Label>
                    <Input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your startup and its mission"
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Cover Image</Label>
                <div className="border border-dashed border-muted-foreground/30 rounded-lg p-4 text-center">
                  {coverPreview ? (
                    <div className="relative">
                      <img
                        src={coverPreview || "/placeholder.svg"}
                        alt="Cover preview"
                        className="max-h-[200px] mx-auto rounded-md object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full"
                        onClick={() => {
                          setCoverPreview(null)
                          setFormData({
                            ...formData,
                            coverImage: "/placeholder.svg?height=400&width=600&text=Startup+Cover",
                          })
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Label
                        htmlFor="cover-upload"
                        className="cursor-pointer flex flex-col items-center justify-center gap-2"
                      >
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <span className="text-muted-foreground">Click to upload a cover image</span>
                        <span className="text-xs text-muted-foreground">(Recommended: 1200×400px)</span>
                      </Label>
                      <Input
                        id="cover-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverUpload}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Industry & Location */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Industry & Location
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="industry">
                    Industry/Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.industry} onValueChange={(value) => handleSelectChange("industry", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stage">
                    Startup Stage <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.stage} onValueChange={(value) => handleSelectChange("stage", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {stages.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {stage}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">
                  Location <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, Country or Remote"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="founded">Founded Date</Label>
                <Input id="founded" name="founded" type="date" value={formData.founded} onChange={handleInputChange} />
              </div>
            </div>
          )}

          {/* Step 3: Funding & Team */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-primary" />
                Funding & Team
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="fundingGoal">Funding Goal</Label>
                  <span className="text-primary font-medium">${formData.fundingGoal.toLocaleString()}</span>
                </div>
                <Tabs defaultValue="slider" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="slider">Slider</TabsTrigger>
                    <TabsTrigger value="input">Custom Input</TabsTrigger>
                  </TabsList>
                  <TabsContent value="slider" className="pt-4">
                    <Slider
                      value={[formData.fundingGoal]}
                      min={10000}
                      max={10000000}
                      step={10000}
                      onValueChange={(value) => handleSliderChange("fundingGoal", value)}
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>$10K</span>
                      <span>$10M</span>
                    </div>
                  </TabsContent>
                  <TabsContent value="input" className="pt-4">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                      <Input
                        type="number"
                        name="fundingGoal"
                        value={formData.fundingGoal}
                        onChange={handleInputChange}
                        min={0}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="fundingRaised">Funding Raised So Far</Label>
                  <span className="text-primary font-medium">${formData.fundingRaised.toLocaleString()}</span>
                </div>
                <Tabs defaultValue="slider" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="slider">Slider</TabsTrigger>
                    <TabsTrigger value="input">Custom Input</TabsTrigger>
                  </TabsList>
                  <TabsContent value="slider" className="pt-4">
                    <Slider
                      value={[formData.fundingRaised]}
                      min={0}
                      max={formData.fundingGoal}
                      step={5000}
                      onValueChange={(value) => handleSliderChange("fundingRaised", value)}
                    />
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <span>$0</span>
                      <span>${formData.fundingGoal.toLocaleString()}</span>
                    </div>
                  </TabsContent>
                  <TabsContent value="input" className="pt-4">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                      <Input
                        type="number"
                        name="fundingRaised"
                        value={formData.fundingRaised}
                        onChange={handleInputChange}
                        min={0}
                        max={formData.fundingGoal}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <span className="text-primary font-medium">
                    {formData.teamSize} {formData.teamSize === 1 ? "person" : "people"}
                  </span>
                </div>
                <Slider
                  value={[formData.teamSize]}
                  min={1}
                  max={50}
                  step={1}
                  onValueChange={(value) => handleSliderChange("teamSize", value)}
                />
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>1 person</span>
                  <span>50 people</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Tags */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <Tag className="h-5 w-5 mr-2 text-primary" />
                Tags & Keywords
              </h3>

              <div className="space-y-2">
                <Label>Add Tags (helps with discovery)</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag and press Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addTag()
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag} disabled={!tagInput.trim()}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1">
                      {tag}
                      <button className="ml-2 hover:text-destructive" onClick={() => removeTag(tag)}>
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {tags.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No tags added yet. Tags help users discover your startup.
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg mt-6">
                <h4 className="font-medium mb-2 flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Preview
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 rounded-md">
                      <AvatarImage src={logoPreview || formData.logo} alt="Logo preview" />
                      <AvatarFallback className="rounded-md bg-primary/10">
                        {formData.name ? formData.name.charAt(0) : "S"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{formData.name || "Your Startup Name"}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {formData.industry}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {formData.stage}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {formData.description || "Your startup description will appear here."}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {tags.length === 0 && (
                      <Badge variant="secondary" className="text-xs">
                        Example Tag
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="p-6 pt-2 border-t flex flex-row justify-between">
          {currentStep > 1 ? (
            <Button variant="outline" onClick={prevStep}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          ) : (
            <div></div> // Empty div to maintain layout
          )}

          {currentStep < totalSteps ? (
            <Button onClick={nextStep} disabled={!isStepComplete()}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!isStepComplete()}>
              Create Startup
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

