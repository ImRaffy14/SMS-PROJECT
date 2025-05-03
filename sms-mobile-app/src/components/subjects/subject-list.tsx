"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, User } from "lucide-react"

const subjects = [
  {
    id: "1",
    name: "Mathematics",
    teacher: "Mr. Johnson",
    schedule: "Mon, Wed, Fri 9:00 AM",
    room: "Room 201"
  },
  {
    id: "2",
    name: "Science",
    teacher: "Ms. Davis",
    schedule: "Tue, Thu 10:30 AM",
    room: "Lab 3"
  },
  {
    id: "3",
    name: "English",
    teacher: "Mrs. Smith",
    schedule: "Mon-Fri 11:00 AM",
    room: "Room 105"
  },
  {
    id: "4",
    name: "History",
    teacher: "Mr. Brown",
    schedule: "Tue, Thu 1:00 PM",
    room: "Room 202"
  }
]

export function SubjectList() {
  return (
    <ScrollArea className="h-[calc(100vh-9rem)]">
      <div className="space-y-4 p-4">
        {subjects.map(subject => (
          <Card key={subject.id}>
            <CardHeader>
              <CardTitle className="text-lg">{subject.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{subject.teacher}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{subject.schedule}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span>{subject.room}</span>
              </div>
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm">
                  Materials
                </Button>
                <Button variant="outline" size="sm">
                  Assignments
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}