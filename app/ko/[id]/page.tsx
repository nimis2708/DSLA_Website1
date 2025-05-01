"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronLeft, ChevronRight, Code, BookOpen, CheckCircle, ExternalLink } from "lucide-react"

interface QuizItem {
  question: string
  options: string[]
  answer: string
}

interface ResourceItem {
  title: string
  url: string
}

interface KnowledgeObject {
  id: string
  title: string
  section: string
  level: string
  overview: string
  tags: string[]
  learningObjectives: string[]
  prerequisites: string[]
  keyConcepts: string[]
  quiz: QuizItem[]
  resources: ResourceItem[]
}

export default function KnowledgeObjectPage() {
  const params = useParams()
  const id = params.id as string
  const [ko, setKo] = useState<KnowledgeObject | null>(null)
  const [allKOs, setAllKOs] = useState<KnowledgeObject[]>([])
  const [showAnswers, setShowAnswers] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/knowledge_objects.json")
        const data: KnowledgeObject[] = await res.json()
        setAllKOs(data)
        const match = data.find((item) => item.id === id)
        setKo(match || null)
      } catch (error) {
        console.error("Failed to load knowledge objects:", error)
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

  const findRelatedKOs = (currentId: string, currentSection: string, currentLevel: string) => {
    return allKOs
      .filter((ko) => ko.id !== currentId && (ko.section === currentSection || ko.level === currentLevel))
      .slice(0, 3)
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

  const relatedKOs = findRelatedKOs(ko.id, ko.section, ko.level)

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild className="border-education-200 hover:border-education-300">
            <Link href="/explore">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Explore
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getLevelColor(ko.level)} variant="secondary">
                  {ko.level}
                </Badge>
                <span className="text-sm text-muted-foreground">{ko.section}</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {ko.title}
              </h1>
              <p className="mt-2 text-muted-foreground">{ko.overview}</p>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-primary">Learning Objectives</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {ko.learningObjectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-primary">Prerequisites</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {ko.prerequisites.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-primary">Key Concepts</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {ko.keyConcepts.map((concept, index) => (
                    <li key={index}>{concept}</li>
                  ))}
                </ul>
              </div>

              <Collapsible className="w-full">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-primary">Hands-On Practice</h2>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Code className="h-4 w-4 mr-2" /> View Code Examples
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-2">
                  <div className="rounded-md bg-muted p-4 border-2 border-education-100">
                    <pre className="text-sm"># Code examples would go here</pre>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-primary">Quiz</h2>
                <Accordion type="single" collapsible className="w-full">
                  {ko.quiz.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-education-200">
                      <AccordionTrigger className="hover:text-primary">
                        <span className="text-left">{item.question}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {item.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`p-2 rounded-md ${
                                showAnswers && option === item.answer
                                  ? "bg-knowledge-100 border border-knowledge-300"
                                  : "bg-muted"
                              }`}
                            >
                              {option}
                              {showAnswers && option === item.answer && (
                                <CheckCircle className="inline ml-2 h-4 w-4 text-knowledge-600" />
                              )}
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setShowAnswers(!showAnswers)}
                >
                  {showAnswers ? "Hide Answers" : "Show Answers"}
                </Button>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-primary">Resources</h2>
                <ul className="space-y-2">
                  {ko.resources.map((res, index) => (
                    <li key={index}>
                      <Link href={res.url} target="_blank" className="text-education-600 hover:underline">
                        <ExternalLink className="h-4 w-4 mr-2 inline" /> {res.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-education-100">
              <CardHeader>
                <CardTitle className="text-primary">Related Knowledge Objects</CardTitle>
                <CardDescription>Explore these related topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {relatedKOs.map((relatedKO) => (
                    <Link href={`/ko/${relatedKO.id}`} key={relatedKO.id}>
                      <div className="group flex flex-col space-y-1 rounded-md p-3 hover:bg-education-50">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium group-hover:text-primary group-hover:underline">
                            {relatedKO.title}
                          </h3>
                          <Badge className={getLevelColor(relatedKO.level)} variant="secondary">
                            {relatedKO.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{relatedKO.section}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
