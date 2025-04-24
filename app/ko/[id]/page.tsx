"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronLeft, ChevronRight, Code, BookOpen, CheckCircle, ExternalLink } from "lucide-react"

// Sample knowledge objects data
const knowledgeObjects = [
  {
    id: "ko-1",
    title: "Introduction to Python for Data Science",
    section: "Programming Fundamentals",
    level: "Beginner",
    overview: "Learn the basics of Python programming for data science applications.",
    tags: ["Python", "Programming", "Basics"],
    learningObjectives: [
      "Understand Python syntax and data structures",
      "Learn to use Python libraries for data science (NumPy, Pandas)",
      "Create basic data analysis scripts",
    ],
    prerequisites: ["Basic programming concepts", "Familiarity with command line interfaces"],
    keyConcepts: [
      "Variables and data types",
      "Control structures (if/else, loops)",
      "Functions and modules",
      "Working with libraries",
    ],
    quiz: [
      {
        question: "Which of the following is NOT a built-in data type in Python?",
        options: ["List", "Dictionary", "DataFrame", "Tuple"],
        answer: "DataFrame",
      },
      {
        question: "What function would you use to get the length of a list?",
        options: ["size()", "count()", "length()", "len()"],
        answer: "len()",
      },
      {
        question: "Which library is primarily used for data manipulation in Python?",
        options: ["NumPy", "Matplotlib", "Pandas", "Scikit-learn"],
        answer: "Pandas",
      },
    ],
    resources: [
      { title: "Python Documentation", url: "https://docs.python.org/3/" },
      { title: "Pandas Documentation", url: "https://pandas.pydata.org/docs/" },
      { title: "NumPy Documentation", url: "https://numpy.org/doc/" },
    ],
  },
  {
    id: "ko-2",
    title: "Data Cleaning and Preprocessing",
    section: "Data Preparation",
    level: "Beginner",
    overview: "Master essential techniques for cleaning and preparing data for analysis.",
    tags: ["Data Cleaning", "Pandas", "Preprocessing"],
    learningObjectives: [
      "Identify common data quality issues",
      "Apply techniques to handle missing values",
      "Normalize and standardize data",
    ],
    prerequisites: ["Introduction to Python for Data Science", "Basic understanding of data structures"],
    keyConcepts: [
      "Missing value imputation",
      "Outlier detection and handling",
      "Feature scaling and normalization",
      "Data type conversion",
    ],
    quiz: [
      {
        question: "Which method is commonly used to handle missing values?",
        options: ["Deletion", "Mean imputation", "Regression imputation", "All of the above"],
        answer: "All of the above",
      },
      {
        question: "What is the purpose of feature scaling?",
        options: [
          "To increase the number of features",
          "To make features comparable",
          "To reduce dimensionality",
          "To create new features",
        ],
        answer: "To make features comparable",
      },
    ],
    resources: [
      { title: "Pandas Data Cleaning Guide", url: "https://pandas.pydata.org/docs/user_guide/missing_data.html" },
      { title: "Scikit-learn Preprocessing", url: "https://scikit-learn.org/stable/modules/preprocessing.html" },
    ],
  },
  {
    id: "ko-3",
    title: "Exploratory Data Analysis",
    section: "Data Analysis",
    level: "Intermediate",
    overview: "Learn how to explore and visualize data to extract meaningful insights.",
    tags: ["EDA", "Visualization", "Analysis"],
    learningObjectives: [
      "Apply statistical methods to understand data distributions",
      "Create effective visualizations to communicate insights",
      "Identify patterns and relationships in data",
    ],
    prerequisites: ["Data Cleaning and Preprocessing", "Basic statistics knowledge"],
    keyConcepts: [
      "Descriptive statistics",
      "Data visualization techniques",
      "Correlation analysis",
      "Distribution analysis",
    ],
    quiz: [
      {
        question: "Which plot is best for showing the distribution of a continuous variable?",
        options: ["Bar plot", "Scatter plot", "Histogram", "Pie chart"],
        answer: "Histogram",
      },
      {
        question: "What does a correlation coefficient of -0.9 indicate?",
        options: [
          "Strong positive correlation",
          "Weak positive correlation",
          "Strong negative correlation",
          "No correlation",
        ],
        answer: "Strong negative correlation",
      },
    ],
    resources: [
      { title: "Matplotlib Documentation", url: "https://matplotlib.org/stable/contents.html" },
      { title: "Seaborn Documentation", url: "https://seaborn.pydata.org/" },
    ],
  },
]

// Function to find related KOs based on section and level
const findRelatedKOs = (currentId: string, currentSection: string, currentLevel: string) => {
  return knowledgeObjects
    .filter((ko) => ko.id !== currentId && (ko.section === currentSection || ko.level === currentLevel))
    .slice(0, 3)
}

export default function KnowledgeObjectPage() {
  const params = useParams()
  const id = params.id as string
  const [showAnswers, setShowAnswers] = useState(false)

  const ko = knowledgeObjects.find((item) => item.id === id)

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
                  {ko.prerequisites.map((prerequisite, index) => (
                    <li key={index}>{prerequisite}</li>
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
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-education-600 hover:text-education-700 hover:bg-education-50"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      View Code Examples
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-2">
                  <div className="rounded-md bg-muted p-4 border-2 border-education-100">
                    <pre className="text-sm">
                      {ko.id === "ko-1"
                        ? `# Example: Basic Python for Data Science
import numpy as np
import pandas as pd

# Create a simple dataset
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'David'],
    'Age': [25, 30, 35, 40],
    'City': ['New York', 'San Francisco', 'Los Angeles', 'Chicago']
}

# Create a DataFrame
df = pd.DataFrame(data)

# Display the DataFrame
print(df)

# Basic statistics
print("\\nBasic Statistics:")
print(df.describe())`
                        : `# This is a sample code snippet
# Actual content would depend on the knowledge object`}
                    </pre>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-primary">Quiz</h2>
                <Accordion type="single" collapsible className="w-full">
                  {ko.quiz.map((quizItem, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-education-200">
                      <AccordionTrigger className="hover:text-primary">
                        <span className="text-left">{quizItem.question}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {quizItem.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`p-2 rounded-md ${
                                showAnswers && option === quizItem.answer
                                  ? "bg-knowledge-100 border border-knowledge-300"
                                  : "bg-muted"
                              }`}
                            >
                              {option}
                              {showAnswers && option === quizItem.answer && (
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
                  className="mt-4 border-education-200 hover:border-education-300 text-education-700 hover:text-education-800"
                  onClick={() => setShowAnswers(!showAnswers)}
                >
                  {showAnswers ? "Hide Answers" : "Show Answers"}
                </Button>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 text-primary">Resources</h2>
                <ul className="space-y-2">
                  {ko.resources.map((resource, index) => (
                    <li key={index}>
                      <Link
                        href={resource.url}
                        target="_blank"
                        className="flex items-center text-education-600 hover:text-education-700 hover:underline"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {resource.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button
                variant="outline"
                className="gap-1 border-education-200 hover:border-education-300 text-education-700"
              >
                <BookOpen className="h-4 w-4" />
                Review This First
              </Button>
              <Button
                variant="outline"
                className="gap-1 border-education-200 hover:border-education-300 text-education-700"
              >
                <ChevronRight className="h-4 w-4" />
                Learn This Next
              </Button>
              <Button
                variant="outline"
                className="gap-1 border-education-200 hover:border-education-300 text-education-700"
              >
                <CheckCircle className="h-4 w-4" />
                Test Your Knowledge
              </Button>
              <Button className="gap-1 bg-primary hover:bg-primary/90">
                <Code className="h-4 w-4" />
                Open Interactive Code Notebook
              </Button>
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

            <Card className="border-2 border-education-100">
              <CardHeader>
                <CardTitle className="text-primary">Learning Path</CardTitle>
                <CardDescription>Where this fits in your journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="h-2 rounded-full bg-primary"></div>
                    </div>
                  </div>
                  <p className="text-sm">
                    This knowledge object is part of the{" "}
                    <span className="font-medium text-primary">Data Science Fundamentals</span> learning path.
                  </p>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full border-education-200 hover:border-education-300 text-education-700"
                  >
                    <Link href="/dashboard">View Your Learning Path</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
