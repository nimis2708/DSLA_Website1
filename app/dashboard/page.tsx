"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpen, CheckCircle, Clock, ChevronRight } from "lucide-react"

// Sample learning path data
const learningPath = [
  {
    id: "ko-1",
    title: "Introduction to Python for Data Science",
    section: "Programming Fundamentals",
    level: "Beginner",
    progress: 100,
    estimatedTime: "3 hours",
    completed: true,
  },
  {
    id: "ko-2",
    title: "Data Cleaning and Preprocessing",
    section: "Data Preparation",
    level: "Beginner",
    progress: 75,
    estimatedTime: "4 hours",
    completed: false,
  },
  {
    id: "ko-3",
    title: "Exploratory Data Analysis",
    section: "Data Analysis",
    level: "Intermediate",
    progress: 30,
    estimatedTime: "5 hours",
    completed: false,
  },
  {
    id: "ko-11",
    title: "SQL for Data Scientists",
    section: "Data Management",
    level: "Beginner",
    progress: 0,
    estimatedTime: "4 hours",
    completed: false,
  },
  {
    id: "ko-5",
    title: "Machine Learning Fundamentals",
    section: "Machine Learning",
    level: "Intermediate",
    progress: 0,
    estimatedTime: "6 hours",
    completed: false,
  },
]

// Sample history data
const koHistory = [
  {
    id: "ko-1",
    title: "Introduction to Python for Data Science",
    lastViewed: "2023-04-07T14:30:00Z",
  },
  {
    id: "ko-2",
    title: "Data Cleaning and Preprocessing",
    lastViewed: "2023-04-06T10:15:00Z",
  },
  {
    id: "ko-3",
    title: "Exploratory Data Analysis",
    lastViewed: "2023-04-05T16:45:00Z",
  },
]

const quizHistory = [
  {
    id: "quiz-1",
    title: "Python Basics Quiz",
    score: 90,
    totalQuestions: 10,
    date: "2023-04-07T15:30:00Z",
  },
  {
    id: "quiz-2",
    title: "Data Cleaning Quiz",
    score: 80,
    totalQuestions: 10,
    date: "2023-04-06T11:20:00Z",
  },
  {
    id: "quiz-3",
    title: "EDA Concepts Quiz",
    score: 70,
    totalQuestions: 10,
    date: "2023-04-05T17:45:00Z",
  },
]

// Sample recommendations
const recommendations = [
  {
    id: "ko-9",
    title: "Data Visualization Best Practices",
    section: "Data Visualization",
    level: "Intermediate",
  },
  {
    id: "ko-12",
    title: "Data Ethics and Privacy",
    section: "Professional Skills",
    level: "Intermediate",
  },
  {
    id: "ko-4",
    title: "Statistical Inference",
    section: "Statistics",
    level: "Intermediate",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("path")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      case "Intermediate":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
      case "Advanced":
        return "bg-red-100 text-red-800 hover:bg-red-100/80"
      default:
        return ""
    }
  }

  const overallProgress = Math.round(
    (learningPath.reduce((acc, ko) => acc + ko.progress, 0) / (learningPath.length * 100)) * 100,
  )

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Your Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and continue your data science learning journey.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-4xl font-bold">{overallProgress}%</div>
                <Progress value={overallProgress} className="h-2 w-full" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Completed KOs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-4xl font-bold">
                  {learningPath.filter((ko) => ko.completed).length}/{learningPath.length}
                </div>
                <p className="text-sm text-muted-foreground">Knowledge Objects</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Learning Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="text-4xl font-bold">5</div>
                <p className="text-sm text-muted-foreground">Days in a row</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="path" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="path">Learning Path</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="path" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Personalized Learning Path</CardTitle>
                <CardDescription>
                  Based on your quiz results, we've created a customized learning path for you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {learningPath.map((ko, index) => (
                    <div key={ko.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              ko.completed ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{ko.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{ko.section}</span>
                              <span>•</span>
                              <Badge className={getLevelColor(ko.level)} variant="secondary">
                                {ko.level}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {ko.estimatedTime}
                          </div>
                          {ko.completed ? (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          ) : (
                            <Button asChild size="sm">
                              <Link href={`/ko/${ko.id}`}>{ko.progress > 0 ? "Continue" : "Start"}</Link>
                            </Button>
                          )}
                        </div>
                      </div>
                      <Progress value={ko.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Retake Quiz to Update Path
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recently Viewed Knowledge Objects</CardTitle>
                <CardDescription>Your learning history from the past 30 days.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {koHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <Link href={`/ko/${item.id}`} className="font-medium hover:underline">
                            {item.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">Last viewed: {formatDate(item.lastViewed)}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/ko/${item.id}`}>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Full History
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="quizzes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Quiz History</CardTitle>
                <CardDescription>Your quiz results and performance over time.</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {quizHistory.map((quiz) => (
                    <AccordionItem key={quiz.id} value={quiz.id}>
                      <AccordionTrigger>
                        <div className="flex items-center justify-between w-full pr-4">
                          <span>{quiz.title}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant={quiz.score >= 80 ? "default" : "outline"}>{quiz.score}%</Badge>
                            <span className="text-sm text-muted-foreground">{formatDate(quiz.date)}</span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Score: {quiz.score}%</span>
                            <span className="text-sm">
                              {quiz.score / 10} of {quiz.totalQuestions} correct
                            </span>
                          </div>
                          <Progress value={quiz.score} className="h-2" />
                          <div className="pt-2 flex justify-between">
                            <Button variant="outline" size="sm">
                              Review Answers
                            </Button>
                            <Button size="sm">Retake Quiz</Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Take a Practice Quiz
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Based on your interests and learning progress.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {recommendations.map((ko) => (
                    <Card key={ko.id} className="h-full">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{ko.title}</CardTitle>
                        <CardDescription>{ko.section}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <Badge className={getLevelColor(ko.level)} variant="secondary">
                          {ko.level}
                        </Badge>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" size="sm" asChild className="w-full">
                          <Link href={`/ko/${ko.id}`}>
                            Explore
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Recommendations
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
