"use client"

import { useState } from "react"
import { MessageSquare, Plus, Search, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "@/components/shared/mobile-nav"
import { PageHeader } from "@/components/shared/page-header"

const messages = [
  {
    id: 1,
    sender: "Mr. Johnson",
    role: "Math Teacher",
    message: "About your child's progress in algebra",
    time: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    sender: "School Admin",
    role: "Administration",
    message: "Fee payment reminder for Q3",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    sender: "Ms. Davis",
    role: "Science Teacher",
    message: "Science project submission date extended",
    time: "2 days ago",
    unread: false,
  },
]

export default function CommunicationsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredMessages = messages.filter((msg) =>
    msg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="pb-16">
      <PageHeader 
        title="Messages" 
        description="Communications with teachers and staff"
        actions={
          <Button size="sm" onClick={() => router.push("/communications/new")}>
            <Plus className="mr-2 h-4 w-4" />
            New
          </Button>
        }
      />

      <div className="px-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          {filteredMessages.map((message) => (
            <Card 
              key={message.id} 
              className="hover:shadow-sm transition-shadow cursor-pointer"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{message.sender}</CardTitle>
                      <span className="text-sm text-muted-foreground">{message.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{message.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-sm">{message.message}</p>
                  {message.unread && <Badge className="h-2 w-2 p-0 rounded-full" />}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <MobileNav />
    </div>
  )
}