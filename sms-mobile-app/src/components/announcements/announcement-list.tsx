"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"

const announcements = [
  {
    id: "1",
    title: "School Holiday",
    content: "There will be no classes on Monday due to a national holiday.",
    date: new Date("2023-06-12"),
    author: {
      name: "Principal Smith",
      avatar: "/avatars/principal.jpg"
    }
  },
  {
    id: "2",
    title: "Sports Day",
    content: "Annual sports day will be held next Friday. All students are required to participate.",
    date: new Date("2023-06-08"),
    author: {
      name: "PE Department",
      avatar: "/avatars/pe.jpg"
    }
  },
  {
    id: "3",
    title: "Parent-Teacher Meeting",
    content: "Parent-teacher meetings are scheduled for next week. Please check the schedule.",
    date: new Date("2023-06-05"),
    author: {
      name: "Admin Office",
      avatar: "/avatars/admin.jpg"
    }
  }
]

export function AnnouncementList() {
  return (
    <ScrollArea className="h-[calc(100vh-9rem)]">
      <div className="space-y-4 p-4">
        {announcements.map(announcement => (
          <Card key={announcement.id}>
            <CardHeader className="flex flex-row items-center space-y-0 space-x-3 pb-2">
              <Avatar>
                <AvatarImage src={announcement.author.avatar} />
                <AvatarFallback>{announcement.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{announcement.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {announcement.author.name} • {format(announcement.date, "MMM d, yyyy")}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p>{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}