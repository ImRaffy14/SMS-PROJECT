"use client"

import { useState, useEffect } from "react"
import {  Search, Filter } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MobileNav } from "@/components/shared/mobile-nav"
import { PageHeader } from "@/components/shared/page-header"
import axios from "axios"

interface Announcement {
    id: string;
    title: string;
    message: string;
    audience: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [announcements, setAnnouncements] = useState<Announcement[] | null>(null)

  useEffect(() => {
    // Fetch announcements from API
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("https://sms-backend.imraffydev.com/api/announcement")
        setAnnouncements(response.data.announcements)
      } catch (error) {
        console.error("Error fetching announcements:", error)
      }
    }

    fetchAnnouncements()
  }, [])

  const filteredAnnouncements = announcements?.filter((announcement) =>
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
          {filteredAnnouncements?.map((announcement) => (
            <Card key={announcement.id} className="hover:shadow-sm transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {announcement.createdAt} • {announcement.audience}
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