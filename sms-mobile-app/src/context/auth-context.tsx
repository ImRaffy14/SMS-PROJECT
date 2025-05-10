"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { setCookie, deleteCookie, getCookie } from 'cookies-next'

type User = {
  id: string
  name: string
  email: string
  role: "student" | "teacher" | "admin" | "parent"
  avatar?: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Export the provider as default
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check for existing session on initial load
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userCookie = await getCookie('school-app-user')
        if (userCookie) {
          setUser(JSON.parse(userCookie as string))
        }
      } catch (err) {
        console.error("Failed to load user from cookies:", err)
      }
    }
    
    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUsers = {
        "student@school.com": {
          id: "1",
          name: "John Student",
          email: "student@school.com",
          role: "student",
          avatar: "/avatars/student.jpg"
        },
        "teacher@school.com": {
          id: "2",
          name: "Jane Teacher",
          email: "teacher@school.com",
          role: "teacher",
          avatar: "/avatars/teacher.jpg"
        },
        "parent@school.com": {
          id: "3",
          name: "Parent Smith",
          email: "parent@school.com",
          role: "parent"
        }
      }
      
      const loggedInUser = mockUsers[email as keyof typeof mockUsers]
      
      if (loggedInUser && password === "password123") {
        setUser(loggedInUser as User)
        setCookie('school-app-user', JSON.stringify(loggedInUser), {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })
        router.push('/dashboard')
      } else {
        throw new Error("Invalid email or password")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    deleteCookie('school-app-user')
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  )
}

// Export the hook as a named export
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}