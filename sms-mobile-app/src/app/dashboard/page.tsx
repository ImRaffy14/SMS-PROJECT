"use client"

import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Bell, MessageSquare, BookOpen, CreditCard } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  const features = [
    {
      title: "Announcements",
      icon: <Bell className="h-6 w-6" />,
      onClick: () => router.push("/announcements")
    },
    {
      title: "Messages",
      icon: <MessageSquare className="h-6 w-6" />,
      onClick: () => router.push("/communications")
    },
    {
      title: "Payments",
      icon: <CreditCard className="h-6 w-6" />,
      onClick: () => router.push("/payments")
    },
    {
      title: "Grades",
      icon: <BookOpen className="h-6 w-6" />,
      onClick: () => router.push("/grades")
    }
  ]

  if (!user) return null

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <Card className="bg-blue-50 border-blue-100">
        <CardHeader>
          <CardTitle className="text-xl">
            Welcome back, <span className="text-blue-600">{user.name}</span>!
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </CardHeader>
      </Card>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <Button 
            key={index}
            variant="outline" 
            className="h-24 flex flex-col items-center justify-center gap-2"
            onClick={feature.onClick}
          >
            {feature.icon}
            <span>{feature.title}</span>
          </Button>
        ))}
      </div>

      {/* Quick Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Unread Messages</span>
              <span className="font-medium">3</span>
            </div>
            <div className="flex justify-between">
              <span>Pending Payments</span>
              <span className="font-medium">$120.50</span>
            </div>
            <div className="flex justify-between">
              <span>Upcoming Assignments</span>
              <span className="font-medium">2</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}