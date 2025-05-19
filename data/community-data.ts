export interface Post {
  id: number
  startup: {
    name: string
    logo: string
    category: string
  }
  content: string
  image?: string
  timeAgo: string
  likes: number
  comments: number
  isLiked: boolean
}

export interface Notification {
  id: number
  type: "request_accepted" | "message" | "event" | "system" | "follow_request" | "funding"
  content: string
  timeAgo: string
  read: boolean
  sender?: {
    name: string
    avatar: string
  }
  startup?: {
    name: string
    logo: string
  }
  preview?: string
  fundingDetails?: {
    goal: number
    raised: number
    percentage: number
  }
}

// Dummy data for community posts
export const communityPosts: Post[] = [
  {
    id: 1,
    startup: {
      name: "EcoVentures",
      logo: "/placeholder.svg?height=80&width=80",
      category: "Sustainability",
    },
    content:
      "We're excited to announce our new partnership with GreenTech Solutions to expand our sustainable packaging solutions!",
    image: "/placeholder.svg?height=300&width=500&text=Partnership+Announcement",
    timeAgo: "2 hours ago",
    likes: 42,
    comments: 8,
    isLiked: false,
  },
  {
    id: 2,
    startup: {
      name: "MediConnect",
      logo: "/placeholder.svg?height=80&width=80",
      category: "Healthcare",
    },
    content:
      "Just released our latest update with improved AI matching algorithms. Our platform now connects patients with specialists 30% faster!",
    timeAgo: "Yesterday",
    likes: 36,
    comments: 12,
    isLiked: true,
  },
  {
    id: 3,
    startup: {
      name: "VirtualFit",
      logo: "/placeholder.svg?height=80&width=80",
      category: "Healthcare",
    },
    content:
      "We're hosting a virtual demo day next week to showcase our new VR fitness experiences. Join us to see how we're revolutionizing home workouts!",
    image: "/placeholder.svg?height=300&width=500&text=Demo+Day+Invitation",
    timeAgo: "2 days ago",
    likes: 28,
    comments: 5,
    isLiked: false,
  },
  {
    id: 4,
    startup: {
      name: "FoodDrop",
      logo: "/placeholder.svg?height=80&width=80",
      category: "Food Delivery",
    },
    content:
      "Milestone achieved! We've now delivered over 10,000 farm-to-table meals with zero carbon footprint. Thanks to our amazing team and customers!",
    timeAgo: "3 days ago",
    likes: 54,
    comments: 15,
    isLiked: true,
  },
]

// Dummy data for notifications
export const notifications: Notification[] = [
  {
    id: 1,
    type: "request_accepted",
    content: "has accepted your request to join the team!",
    timeAgo: "Just now",
    read: false,
    startup: {
      name: "EcoVentures",
      logo: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: 2,
    type: "message",
    content: "sent you a message about the upcoming project meeting.",
    timeAgo: "1 hour ago",
    read: false,
    sender: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    },
    preview: "Hi there! Just wanted to confirm our meeting tomorrow at 2 PM to discuss the marketing strategy...",
  },
  {
    id: 3,
    type: "event",
    content: "MediConnect is hosting a virtual demo day tomorrow at 2 PM.",
    timeAgo: "3 hours ago",
    read: false,
    startup: {
      name: "MediConnect",
      logo: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: 4,
    type: "system",
    content: "Your profile has been viewed by 12 startup founders this week.",
    timeAgo: "Yesterday",
    read: true,
  },
  {
    id: 5,
    type: "message",
    content: "mentioned you in a comment on FoodDrop's latest update.",
    timeAgo: "2 days ago",
    read: true,
    sender: {
      name: "David Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=DC",
    },
  },
  {
    id: 6,
    type: "follow_request",
    content: "has requested to follow you.",
    timeAgo: "Just now",
    read: false,
    sender: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40&text=AR",
    },
  },
  {
    id: 7,
    type: "funding",
    content: "has reached 75% of their funding goal!",
    timeAgo: "2 hours ago",
    read: false,
    startup: {
      name: "EcoVentures",
      logo: "/placeholder.svg?height=80&width=80",
    },
    fundingDetails: {
      goal: 500000,
      raised: 375000,
      percentage: 75,
    },
  },
  {
    id: 8,
    type: "message",
    content: "sent you a new message about your startup.",
    timeAgo: "3 hours ago",
    read: false,
    sender: {
      name: "David Chen",
      avatar: "/placeholder.svg?height=40&width=40&text=DC",
    },
    preview: "I've reviewed your pitch deck and have some suggestions for improvement...",
  },
]

