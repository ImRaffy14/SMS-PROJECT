"use client"

import { useState } from "react"
import { Bell, Plus, Search, Filter, MoreVertical, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "@/components/shared/mobile-nav"
import { PageHeader } from "@/components/shared/page-header"

const announcements = [
  {
    id: 1,
    title: "End of Term Exams",
    message: "Exams begin next week. Prepare well!",
    date: "2023-11-15",
    audience: "All Students",
    status: "published",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    message: "Scheduled for November 20th",
    date: "2023-11-20",
    audience: "Parents",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Sports Day",
    message: "Annual sports day on December 5th",
    date: "2023-12-05",
    audience: "All",
    status: "upcoming",
  },
]

export default function AnnouncementsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="pb-16">
      <PageHeader 
        title="Announcements" 
        description="Important school announcements" 
      />

      <div className="px-4 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search announcements..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {filteredAnnouncements.map((announcement) => (
            <Card key={announcement.id} className="hover:shadow-sm transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {announcement.date} • {announcement.audience}
                    </p>
                  </div>
                  <Badge variant={announcement.status === "published" ? "default" : "secondary"}>
                    {announcement.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{announcement.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <MobileNav />
    </div>
  )
}