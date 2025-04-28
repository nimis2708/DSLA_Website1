"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

type KnowledgeObject = {
  id: string
  title: string
  section: string
  level: string
  overview: string
  tags: string[]
}

export default function ExplorePage() {
  const [knowledgeObjects, setKnowledgeObjects] = useState<KnowledgeObject[]>([])
  const [searchTitle, setSearchTitle] = useState("")

  useEffect(() => {
    const fetchKnowledgeObjects = async () => {
      try {
        const res = await fetch("https://data-science-learning-accelerator.onrender.com/get-knowledge-objects")
        const data = await res.json()

        // Enrich each knowledge object
        const enrichedData = data.data.map((item: any, index: number) => {
          const title = item.title || `Knowledge Object ${index + 1}`

          // Generate a simple overview from the title
          const overview = `Learn about ${title.toLowerCase()} and its importance in data science.`

          // Simple tag extraction based on keywords in the title
          const tags: string[] = []
          const lowerTitle = title.toLowerCase()
          if (lowerTitle.includes("python")) tags.push("Python")
          if (lowerTitle.includes("sql")) tags.push("SQL")
          if (lowerTitle.includes("machine learning")) tags.push("Machine Learning")
          if (lowerTitle.includes("deep learning")) tags.push("Deep Learning")
          if (lowerTitle.includes("data analysis")) tags.push("Data Analysis")
          if (lowerTitle.includes("visualization")) tags.push("Visualization")
          if (lowerTitle.includes("statistics")) tags.push("Statistics")
          if (lowerTitle.includes("nlp")) tags.push("NLP")
          if (lowerTitle.includes("big data")) tags.push("Big Data")
          if (lowerTitle.includes("ai") || lowerTitle.includes("artificial intelligence")) tags.push("AI")

          // Always put "Basics" if no technology is detected
          if (tags.length === 0) {
            tags.push("Basics")
          }

          return {
            id: item.id,
            title: title,
            section: "General",    // You can set this differently if needed
            level: "Beginner",      // Force all to Beginner
            overview: overview,
            tags: tags
          }
        })

        setKnowledgeObjects(enrichedData)

      } catch (error) {
        console.error("Failed to fetch knowledge objects", error)
      }
    }

    fetchKnowledgeObjects()
  }, [])

  const filteredKOs = knowledgeObjects.filter((ko) =>
    ko.title.toLowerCase().includes(searchTitle.toLowerCase())
  )

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">

        {/* Title and Search */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Explore Files
          </h1>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search files..."
            className="pl-8 border-education-200 focus-visible:ring-education-500"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>

        {/* Grid of knowledge objects */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredKOs.map((ko) => (
            <Link href={`/ko/${ko.id}`} key={ko.id}>
              <Card className="h-full transition-all hover:shadow-md border-2 border-education-200 hover:border-education-300">
                <CardHeader>
                  <CardTitle className="text-lg">{ko.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{ko.overview}</p>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {ko.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-education-200">
                      {tag}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}

    </div>
  )
}

