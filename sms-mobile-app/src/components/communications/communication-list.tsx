"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

const messages = [
  {
    id: "1",
    content: "Hi, I wanted to ask about the math assignment due next week.",
    date: new Date("2023-06-10"),
    sender: {
      name: "John Student",
      avatar: "/avatars/student.jpg",
      isMe: false
    }
  },
  {
    id: "2",
    content: "Sure, what would you like to know?",
    date: new Date("2023-06-10"),
    sender: {
      name: "Math Teacher",
      avatar: "/avatars/teacher.jpg",
      isMe: true
    }
  },
  {
    id: "3",
    content: "Is problem 5 on page 42 part of the assignment?",
    date: new Date("2023-06-10"),
    sender: {
      name: "John Student",
      avatar: "/avatars/student.jpg",
      isMe: false
    }
  }
]

export function CommunicationList() {
  return (
    <div className="flex flex-col h-[calc(100vh-9rem)]">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="/avatars/teacher.jpg" />
            <AvatarFallback>MT</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">Math Teacher</h3>
            <p className="text-sm text-muted-foreground">Last seen today at 2:45 PM</p>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex ${message.sender.isMe ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-xs rounded-lg p-3 ${message.sender.isMe ? "bg-primary text-primary-foreground" : "bg-muted"}`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${message.sender.isMe ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {format(message.date, "h:mm a")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input placeholder="Type a message..." className="flex-1" />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}