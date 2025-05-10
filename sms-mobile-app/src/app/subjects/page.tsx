"use client"

import { BookOpen, Clock, User } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/shared/mobile-nav"
import { PageHeader } from "@/components/shared/page-header"

const subjects = [
  {
    id: 1,
    name: "Mathematics",
    teacher: "Mr. Johnson",
    schedule: "Mon, Wed, Fri 9:00 AM",
    room: "Room 201",
  },
  {
    id: 2,
    name: "Science",
    teacher: "Ms. Davis",
    schedule: "Tue, Thu 10:30 AM",
    room: "Lab 3",
  },
]

export default function SubjectsPage() {

  return (
    <div className="pb-16">
      <PageHeader 
        title="Subjects" 
        description="Your current subjects and schedule"
      />

      <div className="px-4 space-y-4">
        {subjects.map((subject) => (
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

      <MobileNav />
    </div>
  )
}