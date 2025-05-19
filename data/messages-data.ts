export interface Chat {
  id: number
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: string
  lastMessageSender?: string
  unreadCount: number
  status?: "online" | "offline"
  lastActive?: string
  isGroup: boolean
}

export interface Message {
  id: number
  chatId: number
  senderId: string
  content: string
  timestamp: string
  status: "sent" | "delivered" | "read"
  isRead: boolean
}

export const chats: Chat[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    lastMessage: "Let's discuss the project details tomorrow",
    lastMessageTime: "10:42 AM",
    unreadCount: 2,
    status: "online",
    isGroup: false,
  },
  {
    id: 2,
    name: "David Chen",
    avatar: "/placeholder.svg?height=40&width=40&text=DC",
    lastMessage: "I've sent you the investor pitch deck",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    status: "offline",
    lastActive: "3 hours ago",
    isGroup: false,
  },
  {
    id: 3,
    name: "EcoVentures Team",
    avatar: "/placeholder.svg?height=80&width=80",
    lastMessage: "We need to finalize the marketing strategy",
    lastMessageTime: "2 days ago",
    lastMessageSender: "Emily",
    unreadCount: 5,
    isGroup: true,
  },
  {
    id: 4,
    name: "Michael Park",
    avatar: "/placeholder.svg?height=40&width=40&text=MP",
    lastMessage: "Thanks for your help with the presentation",
    lastMessageTime: "3 days ago",
    unreadCount: 0,
    status: "offline",
    lastActive: "Yesterday",
    isGroup: false,
  },
  {
    id: 5,
    name: "MediConnect Project",
    avatar: "/placeholder.svg?height=80&width=80",
    lastMessage: "The new feature is ready for testing",
    lastMessageTime: "1 week ago",
    lastMessageSender: "David",
    unreadCount: 0,
    isGroup: true,
  },
  {
    id: 6,
    name: "Priya Patel",
    avatar: "/placeholder.svg?height=40&width=40&text=PP",
    lastMessage: "Are you available for a quick call?",
    lastMessageTime: "1 week ago",
    unreadCount: 0,
    status: "online",
    isGroup: false,
  },
]

export const messages: Message[] = [
  // Sarah Johnson conversation
  {
    id: 1,
    chatId: 1,
    senderId: "sarah",
    content: "Hi there! How's the startup coming along?",
    timestamp: "2025-03-15T09:30:00Z",
    status: "read",
    isRead: true,
  },
  {
    id: 2,
    chatId: 1,
    senderId: "me",
    content: "It's going well! We just finished our MVP and are preparing for beta testing.",
    timestamp: "2025-03-15T09:35:00Z",
    status: "read",
    isRead: true,
  },
  {
    id: 3,
    chatId: 1,
    senderId: "sarah",
    content: "That's fantastic news! Do you need any help with user testing?",
    timestamp: "2025-03-15T09:40:00Z",
    status: "read",
    isRead: true,
  },
  {
    id: 4,
    chatId: 1,
    senderId: "me",
    content: "Actually, yes! We're looking for early adopters. Would you be interested?",
    timestamp: "2025-03-15T09:42:00Z",
    status: "read",
    isRead: true,
  },
  {
    id: 5,
    chatId: 1,
    senderId: "sarah",
    content: "I'd love to try it out and provide feedback.",
    timestamp: "2025-03-15T10:30:00Z",
    status: "read",
    isRead: true,
  },
  {
    id: 6,
    chatId: 1,
    senderId: "sarah",
    content: "Let's discuss the project details tomorrow",
    timestamp: "2025-03-15T10:42:00Z",
    status: "delivered",
    isRead: false,
  },

  // David Chen conversation
  {
    id: 7,
    chatId: 2,
    senderId: "david",
    content: "Hey, I saw your presentation at the startup pitch event. Very impressive!",
    timestamp: "2025-03-14T14:20:00Z",
    status: "read",
    isRead: true,
  },
  {
    id: 8,
    chatId: 2,
    senderId: "me",
    content: "Thanks David! I appreciate you coming to the event.",
    timestamp: "2025-03-14T14:25:00Z",
    status: "read",
    isRead: true,
  },
  {
    id: 9,
    chatId: 2,
    senderId: "david",
    content:
      "I think my investment group might be interested in your startup. Do you have a pitch deck you could share?",
    timestamp: "2025-03-14T14:30:00Z",
    status: "read",
    isRead: true,
  },
  {
    id: 10,
    chatId: 2,
    senderId: "me",
    content: "That would be amazing! I'll prepare our latest deck and send it over.",
    timestamp: "2025-03-14T14:35:00Z",
    status: "read",
    isRead: true,
  },
  {
    id: 11,
    chatId: 2,
    senderId: "me",
    content: "Just sent the pitch deck to your email. Let me know what you think!",
    timestamp: "2025-03-14T15:20:00Z",
    status: "read",
    isRead: true,
  },
  {
    id: 12,
    chatId: 2,
    senderId: "david",
    content: "I've sent you the investor pitch deck",
    timestamp: "2025-03-14T16:45:00Z",
    status: "read",
    isRead: true,
  },

  // EcoVentures Team conversation
  {
    id: 13,
    chatId: 3,
    senderId: "sarah",
    content: "Team, our latest sustainability report is ready for review.",
    timestamp: "2025-03-13T11:00:00Z",
    status: "read",
    isRead: true,
  },
  {
    id: 14,
    chatId: 3,
    senderId: "david",
    content: "Thanks Sarah! I'll take a look at it this afternoon.",
    timestamp: "2025-03-13T11:05:00Z",
    status: "read",
    isRead: true,
  },
  {
    id: 15,
    chatId: 3,
    senderId: "me",
    content: "Great work on the report. I think we should highlight these findings in our next investor update.",
    timestamp: "2025-03-13T11:10:00Z",
    status: "read",
    isRead: true,
  },
  {
    id: 16,
    chatId: 3,
    senderId: "emily",
    content: "We need to finalize the marketing strategy",
    timestamp: "2025-03-13T11:15:00Z",
    status: "delivered",
    isRead: false,
  },
]

// Add more message types for file sharing, images, etc.
export interface FileMessage extends Message {
  fileType: "document" | "image" | "video" | "audio"
  fileName: string
  fileSize: string
  fileUrl: string
  thumbnailUrl?: string
}

export const enhancedNotifications = [
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

