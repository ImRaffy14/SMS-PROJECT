import Link from "next/link"
import { Home, Mail, Bell, BookOpen, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
      <div className="flex justify-around p-2">
        <Button asChild variant="ghost" size="icon">
          <Link href="/dashboard">
            <Home className="h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="ghost" size="icon">
          <Link href="/communications">
            <Mail className="h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="ghost" size="icon">
          <Link href="/announcements">
            <Bell className="h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="ghost" size="icon">
          <Link href="/grades">
            <BookOpen className="h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="ghost" size="icon">
          <Link href="/payments">
            <CreditCard className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  )
}