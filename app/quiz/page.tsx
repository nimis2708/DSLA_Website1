"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft } from "lucide-react"

const quizQuestions = [
  {
    id: "experience",
    question: "What is your current experience level?",
    type: "radio",
    options: [
      { id: "beginner", label: "Beginner - I'm just starting out" },
      { id: "intermediate", label: "Intermediate - I have some experience" },
      { id: "advanced", label: "Advanced - I'm experienced and looking to specialize" },
    ],
  },
  {
    id: "interests",
    question: "What areas are you most interested in?",
    type: "checkbox",
    options: [
      { id: "data-analysis", label: "Data Analysis" },
      { id: "machine-learning", label: "Machine Learning" },
      { id: "deep-learning", label: "Deep Learning" },
      { id: "nlp", label: "Natural Language Processing" },
      { id: "visualization", label: "Data Visualization" },
      { id: "big-data", label: "Big Data" },
    ],
  },
  {
    id: "goal",
    question: "What is your main goal?",
    type: "radio",
    options: [
      { id: "job", label: "Get a job in data science" },
      { id: "portfolio", label: "Build a portfolio of projects" },
      { id: "skills", label: "Improve my current skills" },
      { id: "fun", label: "Learn for fun and curiosity" },
    ],
  },
]

export default function QuizPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({
    experience: "",
    interests: [],
    goal: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQuestion = quizQuestions[currentStep]
  const progress = ((currentStep + 1) / quizQuestions.length) * 100

  const handleRadioChange = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    })
  }

  const handleCheckboxChange = (value: string) => {
    const currentInterests = answers.interests as string[]
    const updatedInterests = currentInterests.includes(value)
      ? currentInterests.filter((item) => item !== value)
      : [...currentInterests, value]

    setAnswers({
      ...answers,
      interests: updatedInterests,
    })
  }

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Simulate API call to generate learning path
    setTimeout(() => {
      // In a real app, you would send the answers to your backend
      // and redirect to the dashboard with the generated learning path
      router.push("/dashboard")
    }, 1500)
  }

  const isNextDisabled = () => {
    if (currentQuestion.type === "radio") {
      return !answers[currentQuestion.id]
    } else if (currentQuestion.type === "checkbox") {
      return (answers.interests as string[]).length === 0
    }
    return false
  }

  return (
    <div className="container max-w-2xl py-10">
      <div className="space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Learning Path Quiz</h1>
          <p className="text-muted-foreground">Answer these 3 questions to get a personalized learning path.</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>
              Question {currentStep + 1} of {quizQuestions.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{currentQuestion.question}</CardTitle>
            <CardDescription>
              {currentQuestion.type === "checkbox" ? "Select all that apply" : "Select one option"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentQuestion.type === "radio" ? (
              <RadioGroup value={answers[currentQuestion.id]} onValueChange={handleRadioChange} className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Label htmlFor={option.id} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={(answers.interests as string[]).includes(option.id)}
                      onCheckedChange={() => handleCheckboxChange(option.id)}
                    />
                    <Label htmlFor={option.id} className="cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleNext} disabled={isNextDisabled() || isSubmitting}>
              {isSubmitting ? (
                "Generating your path..."
              ) : currentStep === quizQuestions.length - 1 ? (
                "Generate Learning Path"
              ) : (
                <>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
