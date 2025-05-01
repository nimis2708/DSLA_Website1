"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft } from "lucide-react"

interface KnowledgeObject {
  id: string
  title: string
  section: string
  level: string
  overview: string
  [key: string]: any  // Allow dynamic fields
}

export default function KnowledgeObjectPage() {
  const params = useParams()
  const id = params.id as string
  const [ko, setKo] = useState<KnowledgeObject | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/knowledge_objects.json")
        const data: KnowledgeObject[] = await res.json()
        const match = data.find((item) => item.id === id)
        setKo(match || null)
      } catch (err) {
        console.error("❌ Failed to load knowledge objects:", err)
        setError("Failed to load data.")
      }
    }
    fetchData()
  }, [id])

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "knowledge-badge-beginner"
      case "Intermediate":
        return "knowledge-badge-intermediate"
      case "Advanced":
        return "knowledge-badge-advanced"
      default:
        return ""
    }
  }

  if (error) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="mt-4">{error}</p>
      </div>
    )
  }

  if (!ko) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold">Knowledge Object Not Found</h1>
        <p className="mt-4">The knowledge object you're looking for doesn't exist.</p>
        <Button asChild className="mt-6">
          <Link href="/explore">Back to Explore</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex items-center space-x-2 mb-6">
        <Button variant="outline" size="sm" asChild className="border-education-200 hover:border-education-300">
          <Link href="/explore">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Explore
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge className={getLevelColor(ko.level)} variant="secondary">{ko.level}</Badge>
            <span className="text-sm text-muted-foreground">{ko.section}</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {ko.title}
          </h1>
          <p className="mt-2 text-muted-foreground">{ko.overview}</p>
        </div>

        <div className="space-y-6">
          {Object.entries(ko).map(([key, value]) => {
            if (["id", "title", "section", "level", "overview"].includes(key)) return null

            return (
              <div key={key}>
                <h2 className="text-xl font-semibold mb-2 text-primary">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h2>
                {Array.isArray(value) ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {value.map((item: any, i: number) => (
                      <li key={i}>{typeof item === "string" ? item : JSON.stringify(item)}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">{typeof value === "string" ? value : JSON.stringify(value)}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
