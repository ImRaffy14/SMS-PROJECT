"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { setCookie, deleteCookie, getCookie } from 'cookies-next'
import axios from "axios"

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    department: string;
    image: {
        imageUrl: string;
        publicId: string;
    }
    createdAt: string;
    updatedAt: string;
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
      const result = await axios.post('https://sms-backend.imraffydev.com/api/auth/login', {email, password}, {
        withCredentials: true,
      })


      if (result.data.status === "success") {
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