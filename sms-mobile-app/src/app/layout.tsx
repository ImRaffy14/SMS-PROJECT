// app/layout.tsx
import AuthProvider from "@/context/auth-context"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "School Management System",
  description: "Mobile school management application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <AuthProvider>
          <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}