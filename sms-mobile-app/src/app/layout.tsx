// app/layout.tsx
import AuthProvider from "@/context/auth-context"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "School Management System",
  description: "Mobile school management application",
  themeColor: "#000000", // Ensure theme color consistency
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#000000" />
      </head>
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
