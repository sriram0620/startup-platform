"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import {
  MessageSquare,
  Users,
  Search,
  Send,
  Paperclip,
  Image,
  File,
  Mic,
  MoreHorizontal,
  Phone,
  Video,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Plus,
} from "lucide-react"
import Navbar from "../homepage/navbar"
import Footer from "../homepage/footer"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { chats, messages, type Chat, type Message } from "@/data/messages-data"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("direct")
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [localChats, setLocalChats] = useState<Chat[]>(chats)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Set messages when a chat is selected
  useEffect(() => {
    if (selectedChat) {
      setChatMessages(messages.filter((message) => message.chatId === selectedChat.id))
    }
  }, [selectedChat])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  // Filter chats based on search query
  const filteredChats = localChats.filter((chat) => {
    if (!searchQuery) return true
    return chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // Get direct messages and group chats
  const directChats = filteredChats.filter((chat) => !chat.isGroup)
  const groupChats = filteredChats.filter((chat) => chat.isGroup)

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return

    const newMsg: Message = {
      id: chatMessages.length + 1,
      chatId: selectedChat.id,
      senderId: "me",
      content: newMessage,
      timestamp: new Date().toISOString(),
      status: "sent",
      isRead: false,
    }

    setChatMessages([...chatMessages, newMsg])
    setNewMessage("")

    // Update last message in chat list
    setLocalChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat.id
          ? {
              ...chat,
              lastMessage: newMessage,
              lastMessageTime: "Just now",
              unreadCount: 0,
            }
          : chat,
      ),
    )
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16 pb-16">
        <div className="container mt-8 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Link href="/community">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Messages</h1>
            </div>

            <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80">
              <Plus className="h-4 w-4" />
              New Message
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-200px)] min-h-[500px]">
            {/* Chat List */}
            <Card className="lg:col-span-4 border-none shadow-md overflow-hidden flex flex-col">
              <CardHeader className="p-4 pb-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-9 pr-4 h-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>

              <Tabs defaultValue="direct" onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <div className="px-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="direct"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Direct
                    </TabsTrigger>
                    <TabsTrigger
                      value="groups"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Groups
                    </TabsTrigger>
                  </TabsList>
                </div>

                <CardContent className="p-0 flex-1 overflow-hidden">
                  <ScrollArea className="h-full">
                    <TabsContent value="direct" className="m-0">
                      {isLoading ? (
                        <div className="p-4 space-y-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3">
                              <Skeleton className="h-12 w-12 rounded-full" />
                              <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-40" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : directChats.length === 0 ? (
                        <div className="p-8 text-center">
                          <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">No direct messages found</p>
                        </div>
                      ) : (
                        <div className="divide-y">
                          {directChats.map((chat, index) => (
                            <motion.div
                              key={chat.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors ${selectedChat?.id === chat.id ? "bg-primary/5" : ""}`}
                              onClick={() => setSelectedChat(chat)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={chat.avatar} alt={chat.name} />
                                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  {chat.status === "online" && (
                                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></div>
                                  )}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <h3 className="font-medium text-sm truncate">{chat.name}</h3>
                                    <span className="text-xs text-muted-foreground">{chat.lastMessageTime}</span>
                                  </div>
                                  <div className="flex items-center justify-between mt-1">
                                    <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                                      {chat.lastMessage}
                                    </p>
                                    {chat.unreadCount > 0 && <Badge className="ml-2">{chat.unreadCount}</Badge>}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="groups" className="m-0">
                      {isLoading ? (
                        <div className="p-4 space-y-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3">
                              <Skeleton className="h-12 w-12 rounded-full" />
                              <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-40" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : groupChats.length === 0 ? (
                        <div className="p-8 text-center">
                          <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">No group chats found</p>
                        </div>
                      ) : (
                        <div className="divide-y">
                          {groupChats.map((chat, index) => (
                            <motion.div
                              key={chat.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors ${selectedChat?.id === chat.id ? "bg-primary/5" : ""}`}
                              onClick={() => setSelectedChat(chat)}
                            >
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <Avatar className="h-12 w-12">
                                    <AvatarImage src={chat.avatar} alt={chat.name} />
                                    <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-primary/10 border-2 border-background flex items-center justify-center">
                                    <Users className="h-2 w-2 text-primary" />
                                  </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <h3 className="font-medium text-sm truncate">{chat.name}</h3>
                                    <span className="text-xs text-muted-foreground">{chat.lastMessageTime}</span>
                                  </div>
                                  <div className="flex items-center justify-between mt-1">
                                    <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                                      <span className="font-medium">{chat.lastMessageSender}: </span>
                                      {chat.lastMessage}
                                    </p>
                                    {chat.unreadCount > 0 && <Badge className="ml-2">{chat.unreadCount}</Badge>}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </ScrollArea>
                </CardContent>
              </Tabs>
            </Card>

            {/* Chat Window */}
            <Card className="lg:col-span-8 border-none shadow-md overflow-hidden flex flex-col">
              {selectedChat ? (
                <>
                  <CardHeader className="p-4 border-b flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                        <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{selectedChat.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {selectedChat.status === "online" ? (
                            <span className="flex items-center">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5"></span>
                              Online
                            </span>
                          ) : (
                            <span>Last active {selectedChat.lastActive || "recently"}</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Video className="h-5 w-5" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View profile</DropdownMenuItem>
                          <DropdownMenuItem>Search in conversation</DropdownMenuItem>
                          <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Block user</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0 flex-1 overflow-hidden">
                    <ScrollArea className="h-[calc(100vh-350px)] min-h-[300px] p-4">
                      <div className="space-y-4">
                        {chatMessages.map((message, index) => {
                          const isMe = message.senderId === "me"
                          const showDate =
                            index === 0 ||
                            new Date(message.timestamp).toDateString() !==
                              new Date(chatMessages[index - 1].timestamp).toDateString()

                          return (
                            <div key={message.id}>
                              {showDate && (
                                <div className="flex justify-center my-4">
                                  <Badge variant="outline" className="bg-muted/50">
                                    {new Date(message.timestamp).toLocaleDateString()}
                                  </Badge>
                                </div>
                              )}

                              <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                <div className="flex items-end gap-2 max-w-[80%]">
                                  {!isMe && (
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={selectedChat.avatar} alt={selectedChat.name} />
                                      <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                  )}

                                  <div
                                    className={`rounded-lg p-3 ${isMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                                  >
                                    <p className="text-sm">{message.content}</p>
                                    <div className="flex items-center justify-end gap-1 mt-1">
                                      <span className="text-xs opacity-70">{formatTime(message.timestamp)}</span>
                                      {isMe &&
                                        (message.status === "read" ? (
                                          <CheckCircle2 className="h-3 w-3 text-blue-400" />
                                        ) : message.status === "delivered" ? (
                                          <CheckCircle2 className="h-3 w-3 opacity-70" />
                                        ) : (
                                          <Clock className="h-3 w-3 opacity-70" />
                                        ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                  </CardContent>

                  <CardFooter className="p-4 border-t">
                    <div className="flex items-center gap-2 w-full">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <Paperclip className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem>
                            <Image className="h-4 w-4 mr-2" />
                            Image
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <File className="h-4 w-4 mr-2" />
                            Document
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <Input
                        placeholder="Type a message..."
                        className="flex-1"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                      />

                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Mic className="h-5 w-5" />
                      </Button>

                      <Button
                        className="rounded-full bg-primary"
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardFooter>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MessageSquare className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Your Messages</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Select a conversation from the list to start chatting or create a new message.
                  </p>
                  <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80">
                    <Plus className="h-4 w-4" />
                    New Message
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

