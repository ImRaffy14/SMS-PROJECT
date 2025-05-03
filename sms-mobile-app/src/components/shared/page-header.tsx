"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface PageHeaderProps {
  title: string
  description?: string
  backLink?: string
  actions?: React.ReactNode
}

export function PageHeader({ title, description, backLink, actions }: PageHeaderProps) {
  const router = useRouter()

  return (
    <div className="flex flex-col gap-2 pb-4">
      <div className="flex items-center gap-2">
        {backLink && (
          <Button variant="ghost" size="icon" onClick={() => router.push(backLink)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions}
      </div>
    </div>
  )
}