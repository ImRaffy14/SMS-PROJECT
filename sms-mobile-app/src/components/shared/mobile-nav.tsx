"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Home, Bell, MessageSquare, BookOpen, CreditCard, LogOut } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const navItems = [
    { href: "/dashboard", icon: Home, label: "Home" },
    { href: "/announcements", icon: Bell, label: "Announce" },
    { href: "/communications", icon: MessageSquare, label: "Messages" },
    { href: "/grades", icon: BookOpen, label: "Grades" },
    { href: "/payments", icon: CreditCard, label: "Payments" },
  ]

  if (!user) return null

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
      <div className="flex overflow-x-auto scrollbar-hide">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-shrink-0 flex flex-col items-center p-2 text-xs w-[20vw] ${
              pathname.startsWith(item.href) 
                ? 'text-blue-500 bg-blue-50' 
                : 'text-gray-500'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
        <button
          onClick={() => {
            logout()
            router.push('/login')
          }}
          className="flex-shrink-0 flex flex-col items-center p-2 text-xs text-gray-500 w-[20vw]"
        >
          <LogOut className="h-5 w-5" />
          <span className="truncate">Logout</span>
        </button>
      </div>
    </nav>
  )
}