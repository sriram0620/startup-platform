"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import {
  Search,
  Menu,
  Rocket,
  Users,
  Briefcase,
  BookOpen,
  Calendar,
  Sun,
  Moon,
  Bell,
  MessageSquare,
  User,
  Settings,
  LogOut,
  X,
  Laptop,
} from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { notifications } from "@/data/community-data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { chats } from "@/data/messages-data"
import { useTheme } from "@/components/theme-provider"

const features = [
  {
    title: "Find Co-Founders",
    href: "#",
    description: "Connect with like-minded entrepreneurs to build your dream team",
    icon: Users,
  },
  {
    title: "Explore Startups",
    href: "/explore",
    description: "Discover innovative startups and connect with founders",
    icon: Search,
  },
  {
    title: "Investor Matching",
    href: "#",
    description: "Get matched with investors who believe in your vision",
    icon: Briefcase,
  },
  {
    title: "Startup Resources",
    href: "#",
    description: "Access guides, templates, and tools to accelerate your growth",
    icon: BookOpen,
  },
  {
    title: "Events & Webinars",
    href: "#",
    description: "Join exclusive events to learn and network with industry leaders",
    icon: Calendar,
  },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const [unreadMessages, setUnreadMessages] = useState(0)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [messagesOpen, setMessagesOpen] = useState(false)
  const [localNotifications, setLocalNotifications] = useState(notifications)
  const [localChats, setLocalChats] = useState(chats)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Handle scroll effect
  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      const offset = window.scrollY
      setIsScrolled(offset > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Count unread notifications and messages
  useEffect(() => {
    if (isMounted) {
      // Count unread notifications
      const unreadCount = localNotifications.filter((notification) => !notification.read).length
      setUnreadNotifications(unreadCount)

      // Count unread messages
      const unreadMsgCount = localChats.reduce((count, chat) => count + chat.unreadCount, 0)
      setUnreadMessages(unreadMsgCount)
    }
  }, [isMounted, localNotifications, localChats])

  const markNotificationAsRead = (id: number) => {
    setLocalNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllNotificationsAsRead = () => {
    setLocalNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const markChatAsRead = (id: number) => {
    setLocalChats((prev) => prev.map((chat) => (chat.id === id ? { ...chat, unreadCount: 0 } : chat)))
  }

  const markAllChatsAsRead = () => {
    setLocalChats((prev) => prev.map((chat) => ({ ...chat, unreadCount: 0 })))
  }

  // Focus search input when expanded
  useEffect(() => {
    if (searchExpanded && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchExpanded])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-10">
          <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
            <Rocket className="h-5 w-5 text-white" />
            <div className="absolute -right-1 -top-1 w-4 h-4 bg-background rounded-full border-2 border-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight">LaunchPad</span>
        </Link>

        {/* Desktop Navigation */}
        {isMounted && (
          <>
            {isDesktop ? (
              <div className="flex items-center gap-6">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent">Features</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[500px] gap-3 p-4 md:w-[600px] md:grid-cols-2">
                          {features.map((feature) => (
                            <li key={feature.title}>
                              <NavigationMenuLink asChild>
                                <a
                                  href={feature.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="flex items-center gap-2">
                                    <feature.icon className="h-5 w-5 text-primary" />
                                    <div className="text-sm font-medium leading-none">{feature.title}</div>
                                  </div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {feature.description}
                                  </p>
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/explore" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Explore Startups
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/community" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Community</NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/profile" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>Profile</NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        {theme === "light" ? (
                          <Sun className="h-5 w-5" />
                        ) : theme === "dark" ? (
                          <Moon className="h-5 w-5" />
                        ) : (
                          <Laptop className="h-5 w-5" />
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuRadioGroup
                        value={theme}
                        onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
                      >
                        <DropdownMenuRadioItem value="light" className="cursor-pointer">
                          <Sun className="h-4 w-4 mr-2" />
                          Light
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="dark" className="cursor-pointer">
                          <Moon className="h-4 w-4 mr-2" />
                          Dark
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="system" className="cursor-pointer">
                          <Laptop className="h-4 w-4 mr-2" />
                          System
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {isDesktop && (
                    <div className={`relative transition-all duration-300 ${searchExpanded ? "w-64" : "w-10"}`}>
                      {searchExpanded ? (
                        <div className="flex items-center">
                          <Input
                            ref={searchInputRef}
                            placeholder="Search startups, founders..."
                            className="pl-9 pr-4 h-10 bg-background/80 backdrop-blur-sm border-primary/20 rounded-full"
                            onBlur={() => setSearchExpanded(false)}
                          />
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          onClick={() => setSearchExpanded(true)}
                        >
                          <Search className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  )}

                  {/* Notifications Icon with Popover */}
                  <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full relative">
                        <Bell className="h-5 w-5" />
                        {unreadNotifications > 0 && (
                          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                            {unreadNotifications}
                          </Badge>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="end">
                      <Card className="border-0 shadow-none">
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between p-3 border-b">
                            <h3 className="font-medium">Notifications</h3>
                            {unreadNotifications > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-xs"
                                onClick={markAllNotificationsAsRead}
                              >
                                Mark all as read
                              </Button>
                            )}
                          </div>
                          <ScrollArea className="h-[300px]">
                            <div className="p-2">
                              {localNotifications.slice(0, 5).map((notification) => (
                                <div
                                  key={notification.id}
                                  className={`p-2 rounded-md hover:bg-muted transition-colors cursor-pointer ${!notification.read ? "bg-primary/5" : ""}`}
                                  onClick={() => markNotificationAsRead(notification.id)}
                                >
                                  <div className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8">
                                      {notification.type === "system" ? (
                                        <div className="h-full w-full flex items-center justify-center bg-primary/10">
                                          <Bell className="h-4 w-4 text-primary" />
                                        </div>
                                      ) : (
                                        <>
                                          <AvatarImage
                                            src={notification.sender?.avatar || notification.startup?.logo}
                                            alt={notification.sender?.name || notification.startup?.name || "System"}
                                          />
                                          <AvatarFallback>
                                            {notification.sender?.name?.charAt(0) ||
                                              notification.startup?.name?.charAt(0) ||
                                              "S"}
                                          </AvatarFallback>
                                        </>
                                      )}
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs">
                                        {notification.type === "request_accepted" && (
                                          <span className="font-medium">{notification.startup?.name}</span>
                                        )}
                                        {notification.type === "message" && (
                                          <span className="font-medium">{notification.sender?.name}</span>
                                        )}{" "}
                                        {notification.content}
                                      </p>
                                      <p className="text-xs text-muted-foreground mt-1">{notification.timeAgo}</p>
                                    </div>
                                    {!notification.read && (
                                      <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0"></div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                          <div className="p-3 border-t text-center">
                            <Link href="/notifications" onClick={() => setNotificationsOpen(false)}>
                              <Button variant="ghost" size="sm" className="w-full">
                                View All Notifications
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </PopoverContent>
                  </Popover>

                  {/* Messages Icon with Popover */}
                  <Popover open={messagesOpen} onOpenChange={setMessagesOpen}>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full relative">
                        <MessageSquare className="h-5 w-5" />
                        {unreadMessages > 0 && (
                          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                            {unreadMessages}
                          </Badge>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="end">
                      <Card className="border-0 shadow-none">
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between p-3 border-b">
                            <h3 className="font-medium">Messages</h3>
                            {unreadMessages > 0 && (
                              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={markAllChatsAsRead}>
                                Mark all as read
                              </Button>
                            )}
                          </div>
                          <ScrollArea className="h-[300px]">
                            <div className="p-2">
                              {localChats.slice(0, 5).map((chat) => (
                                <div
                                  key={chat.id}
                                  className={`p-2 rounded-md hover:bg-muted transition-colors cursor-pointer ${chat.unreadCount > 0 ? "bg-primary/5" : ""}`}
                                  onClick={() => markChatAsRead(chat.id)}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="relative">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={chat.avatar} alt={chat.name} />
                                        <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      {chat.status === "online" && (
                                        <div className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 border-2 border-background"></div>
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between">
                                        <h4 className="text-xs font-medium truncate">{chat.name}</h4>
                                        <span className="text-xs text-muted-foreground">{chat.lastMessageTime}</span>
                                      </div>
                                      <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                                    </div>
                                    {chat.unreadCount > 0 && (
                                      <Badge className="ml-2 h-5 w-5 flex items-center justify-center p-0">
                                        {chat.unreadCount}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                          <div className="p-3 border-t text-center">
                            <Link href="/messages" onClick={() => setMessagesOpen(false)}>
                              <Button variant="ghost" size="sm" className="w-full">
                                View All Messages
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </PopoverContent>
                  </Popover>

                  <div className="h-6 w-px bg-border mx-1" />

                  {/* User Profile */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="rounded-full gap-2 pl-1 pr-3">
                        <Avatar className="h-7 w-7">
                          <AvatarImage
                            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                            alt="John Doe"
                          />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">John</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href="/profile">
                          <User className="h-4 w-4 mr-2" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Briefcase className="h-4 w-4 mr-2" />
                        My Startups
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Button
                    size="sm"
                    className="rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {/* Mobile Search Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setSearchExpanded(!searchExpanded)}
                >
                  <Search className="h-5 w-5" />
                </Button>

                {/* Mobile Theme Toggle */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      {theme === "light" ? (
                        <Sun className="h-5 w-5" />
                      ) : theme === "dark" ? (
                        <Moon className="h-5 w-5" />
                      ) : (
                        <Laptop className="h-5 w-5" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuRadioGroup
                      value={theme}
                      onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
                    >
                      <DropdownMenuRadioItem value="light" className="cursor-pointer">
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="dark" className="cursor-pointer">
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="system" className="cursor-pointer">
                        <Laptop className="h-4 w-4 mr-2" />
                        System
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Notifications */}
                <Link href="/notifications">
                  <Button variant="ghost" size="icon" className="rounded-full relative">
                    <Bell className="h-5 w-5" />
                    {unreadNotifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                        {unreadNotifications}
                      </Badge>
                    )}
                  </Button>
                </Link>

                {/* Mobile Messages */}
                <Link href="/messages">
                  <Button variant="ghost" size="icon" className="rounded-full relative">
                    <MessageSquare className="h-5 w-5" />
                    {unreadMessages > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                        {unreadMessages}
                      </Badge>
                    )}
                  </Button>
                </Link>

                {/* Mobile Menu Button */}
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[85vw] sm:w-[350px] p-0">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between p-4 border-b">
                        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                          <div className="relative w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                            <Rocket className="h-4 w-4 text-white" />
                          </div>
                          <span className="font-bold text-lg">LaunchPad</span>
                        </Link>
                        <SheetClose asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <X className="h-5 w-5" />
                          </Button>
                        </SheetClose>
                      </div>

                      {/* Mobile Search (when expanded) */}
                      <AnimatePresence>
                        {searchExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="p-4 border-b overflow-hidden"
                          >
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="Search startups, founders..." className="pl-9 pr-4 h-10" autoFocus />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <ScrollArea className="flex-1 py-4">
                        <div className="space-y-6 px-4">
                          {/* Features Section */}
                          <div className="space-y-3">
                            <div className="font-medium text-lg">Features</div>
                            {features.map((feature) => (
                              <Link
                                key={feature.title}
                                href={feature.href}
                                className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-accent transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                                  <feature.icon className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <div className="font-medium">{feature.title}</div>
                                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* Main Navigation */}
                          <div className="space-y-3">
                            <div className="font-medium text-lg">Navigation</div>
                            <Link
                              href="/explore"
                              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-accent transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                                <Search className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-medium">Explore Startups</span>
                            </Link>
                            <Link
                              href="/community"
                              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-accent transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                                <Users className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-medium">Community</span>
                            </Link>
                            <Link
                              href="/profile"
                              className="flex items-center gap-3 py-2 px-3 rounded-md hover:bg-accent transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-medium">Profile</span>
                            </Link>
                          </div>

                          {/* User Section */}
                          <div className="space-y-3">
                            <div className="font-medium text-lg">Account</div>
                            <div className="bg-muted/30 rounded-lg p-4">
                              <div className="flex items-center gap-3 mb-4">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                                    alt="John Doe"
                                  />
                                  <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">John Doe</div>
                                  <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Link
                                  href="/profile"
                                  className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-accent transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <User className="h-4 w-4 text-primary" />
                                  <span>My Profile</span>
                                </Link>
                                <Link
                                  href="/profile"
                                  className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-accent transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <Briefcase className="h-4 w-4 text-primary" />
                                  <span>My Startups</span>
                                </Link>
                                <Link
                                  href="/settings"
                                  className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-accent transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <Settings className="h-4 w-4 text-primary" />
                                  <span>Settings</span>
                                </Link>
                                <div className="border-t my-2"></div>
                                <button className="flex items-center gap-2 py-2 px-3 rounded-md hover:bg-accent transition-colors w-full text-left">
                                  <LogOut className="h-4 w-4 text-primary" />
                                  <span>Logout</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>

                      <div className="p-4 border-t">
                        <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                          Get Started
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            )}
          </>
        )}
      </div>

      {/* Mobile Search Overlay (when expanded on mobile) */}
      <AnimatePresence>
        {!isDesktop && searchExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b shadow-md p-4 z-50"
          >
            <div className="container">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search startups, founders..."
                  className="pl-9 pr-4 h-10"
                  autoFocus
                  onBlur={() => setSearchExpanded(false)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full"
                  onClick={() => setSearchExpanded(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

