"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

// Sample knowledge objects data
const knowledgeObjects = [
  {
    id: "ko-1",
    title: "Introduction to Python for Data Science",
    section: "Programming Fundamentals",
    level: "Beginner",
    overview: "Learn the basics of Python programming for data science applications.",
    tags: ["Python", "Programming", "Basics"],
  },
  {
    id: "ko-2",
    title: "Data Cleaning and Preprocessing",
    section: "Data Preparation",
    level: "Beginner",
    overview: "Master essential techniques for cleaning and preparing data for analysis.",
    tags: ["Data Cleaning", "Pandas", "Preprocessing"],
  },
  {
    id: "ko-3",
    title: "Exploratory Data Analysis",
    section: "Data Analysis",
    level: "Intermediate",
    overview: "Learn how to explore and visualize data to extract meaningful insights.",
    tags: ["EDA", "Visualization", "Analysis"],
  },
  {
    id: "ko-4",
    title: "Statistical Inference",
    section: "Statistics",
    level: "Intermediate",
    overview: "Understand key concepts in statistical inference and hypothesis testing.",
    tags: ["Statistics", "Hypothesis Testing", "Inference"],
  },
  {
    id: "ko-5",
    title: "Machine Learning Fundamentals",
    section: "Machine Learning",
    level: "Intermediate",
    overview: "Introduction to core machine learning concepts, algorithms, and workflows.",
    tags: ["ML", "Algorithms", "Supervised Learning"],
  },
  {
    id: "ko-6",
    title: "Deep Learning with Neural Networks",
    section: "Deep Learning",
    level: "Advanced",
    overview: "Explore neural network architectures and deep learning applications.",
    tags: ["Deep Learning", "Neural Networks", "TensorFlow"],
  },
  {
    id: "ko-7",
    title: "Natural Language Processing",
    section: "NLP",
    level: "Advanced",
    overview: "Learn techniques for processing and analyzing text data.",
    tags: ["NLP", "Text Mining", "Language Models"],
  },
  {
    id: "ko-8",
    title: "Time Series Analysis",
    section: "Specialized Analysis",
    level: "Advanced",
    overview: "Methods and models for analyzing time-dependent data.",
    tags: ["Time Series", "Forecasting", "ARIMA"],
  },
  {
    id: "ko-9",
    title: "Data Visualization Best Practices",
    section: "Data Visualization",
    level: "Intermediate",
    overview: "Learn principles and techniques for effective data visualization.",
    tags: ["Visualization", "Matplotlib", "Seaborn"],
  },
  {
    id: "ko-10",
    title: "Big Data Processing with Spark",
    section: "Big Data",
    level: "Advanced",
    overview: "Process and analyze large-scale datasets using Apache Spark.",
    tags: ["Big Data", "Spark", "Distributed Computing"],
  },
  {
    id: "ko-11",
    title: "SQL for Data Scientists",
    section: "Data Management",
    level: "Beginner",
    overview: "Learn SQL fundamentals for data extraction and manipulation.",
    tags: ["SQL", "Databases", "Data Extraction"],
  },
  {
    id: "ko-12",
    title: "Data Ethics and Privacy",
    section: "Professional Skills",
    level: "Intermediate",
    overview: "Understand ethical considerations and privacy concerns in data science.",
    tags: ["Ethics", "Privacy", "Responsible AI"],
  },
]

export default function ExplorePage() {
  const [searchTitle, setSearchTitle] = useState("")
  const [selectedLevel, setSelectedLevel] = useState<string>("")
  const [searchOverview, setSearchOverview] = useState("")

  const filteredKOs = knowledgeObjects.filter((ko) => {
    const matchesTitle = ko.title.toLowerCase().includes(searchTitle.toLowerCase())
    const matchesLevel = selectedLevel ? ko.level === selectedLevel : true
    const matchesOverview = ko.overview.toLowerCase().includes(searchOverview.toLowerCase())

    return matchesTitle && matchesLevel && matchesOverview
  })

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

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Explore Knowledge Objects
          </h1>
          <p className="text-muted-foreground">
            Browse our collection of knowledge objects to accelerate your data science learning.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title..."
              className="pl-8 border-education-200 focus-visible:ring-education-500"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="border-education-200 focus-visible:ring-education-500">
              <SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="text"
            placeholder="Search in overview..."
            className="border-education-200 focus-visible:ring-education-500"
            value={searchOverview}
            onChange={(e) => setSearchOverview(e.target.value)}
          />
        </div>

        {/* Knowledge Objects Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredKOs.map((ko) => (
            <Link href={`/ko/${ko.id}`} key={ko.id}>
              <Card className="h-full transition-all hover:shadow-md border-2 border-education-200 hover:border-education-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl">{ko.title}</CardTitle>
                  <CardDescription>{ko.section}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className={getLevelColor(ko.level)} variant="secondary">
                    {ko.level}
                  </Badge>
                  <p className="mt-3 text-sm text-muted-foreground">{ko.overview}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {ko.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-education-200">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
