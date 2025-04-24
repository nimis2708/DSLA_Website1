"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Users, Calendar, Search, ChevronUp, ChevronDown } from "lucide-react"

// Sample forum threads data
const forumThreads = [
  {
    id: "thread-1",
    title: "Best approach for time series forecasting?",
    author: "data_explorer",
    date: "2023-04-05T14:30:00Z",
    replies: 12,
    views: 145,
    tags: ["ML", "Time Series", "Forecasting"],
  },
  {
    id: "thread-2",
    title: "How to handle imbalanced datasets in classification?",
    author: "ml_learner",
    date: "2023-04-04T10:15:00Z",
    replies: 8,
    views: 98,
    tags: ["ML", "Classification", "Data Preparation"],
  },
  {
    id: "thread-3",
    title: "Career transition: Marketing to Data Science",
    author: "career_switcher",
    date: "2023-04-03T16:45:00Z",
    replies: 15,
    views: 210,
    tags: ["Careers", "Transition", "Learning Path"],
  },
  {
    id: "thread-4",
    title: "Visualizing high-dimensional data: techniques?",
    author: "viz_enthusiast",
    date: "2023-04-02T09:20:00Z",
    replies: 6,
    views: 87,
    tags: ["Visualization", "Dimensionality Reduction"],
  },
  {
    id: "thread-5",
    title: "Python vs. R for statistical analysis: 2023 perspective",
    author: "stats_geek",
    date: "2023-04-01T11:30:00Z",
    replies: 24,
    views: 312,
    tags: ["Python", "R", "Statistics"],
  },
]

// Sample weekly challenges data
const weeklyChallenges = [
  {
    id: "challenge-1",
    title: "Predict Housing Prices",
    description: "Build a regression model to predict housing prices using the Boston Housing dataset.",
    difficulty: "Intermediate",
    participants: 78,
    submissions: 42,
    dueDate: "2023-04-15T23:59:59Z",
  },
  {
    id: "challenge-2",
    title: "Customer Segmentation",
    description: "Apply clustering techniques to segment customers based on their purchasing behavior.",
    difficulty: "Intermediate",
    participants: 65,
    submissions: 31,
    dueDate: "2023-04-22T23:59:59Z",
  },
  {
    id: "challenge-3",
    title: "Sentiment Analysis on Movie Reviews",
    description: "Develop an NLP model to classify movie reviews as positive or negative.",
    difficulty: "Advanced",
    participants: 54,
    submissions: 23,
    dueDate: "2023-04-29T23:59:59Z",
  },
]

// Sample help threads data
const helpThreads = [
  {
    id: "help-1",
    title: "Understanding backpropagation in neural networks",
    author: "nn_beginner",
    date: "2023-04-06T15:20:00Z",
    question:
      "I'm struggling to understand how backpropagation works in neural networks. Can someone explain it in simple terms?",
    answers: [
      {
        id: "answer-1",
        author: "ai_expert",
        content:
          "Backpropagation is essentially a way for the network to learn by calculating how much each neuron contributed to the error...",
        votes: 15,
        isMentor: true,
      },
      {
        id: "answer-2",
        author: "math_whiz",
        content:
          "Think of it as a chain rule from calculus. We're calculating partial derivatives to find how each weight affects the final error...",
        votes: 8,
        isMentor: false,
      },
    ],
  },
  {
    id: "help-2",
    title: "Handling missing values: imputation strategies",
    author: "data_cleaner",
    date: "2023-04-05T11:10:00Z",
    question:
      "What's the best approach for handling missing values in a dataset with both numerical and categorical features?",
    answers: [
      {
        id: "answer-3",
        author: "stats_pro",
        content:
          "For numerical features, you can use mean/median imputation or more advanced methods like KNN imputation...",
        votes: 12,
        isMentor: true,
      },
      {
        id: "answer-4",
        author: "ml_practitioner",
        content:
          "I recommend using multiple imputation techniques and comparing their impact on your model performance...",
        votes: 7,
        isMentor: false,
      },
    ],
  },
]

// Sample upcoming AMA sessions
const amaSessions = [
  {
    id: "ama-1",
    title: "Career Paths in Data Science",
    host: "Dr. Sarah Johnson",
    role: "Lead Data Scientist at Tech Corp",
    date: "2023-04-20T18:00:00Z",
    participants: 45,
  },
  {
    id: "ama-2",
    title: "Deep Learning Research Trends",
    host: "Prof. Michael Chen",
    role: "AI Research Scientist",
    date: "2023-04-27T17:00:00Z",
    participants: 32,
  },
  {
    id: "ama-3",
    title: "Building a Data Science Portfolio",
    host: "Alex Rodriguez",
    role: "Senior Data Science Recruiter",
    date: "2023-05-04T19:00:00Z",
    participants: 28,
  },
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("forum")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
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

  const filteredThreads = forumThreads.filter((thread) => {
    const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = selectedTag === "all" || selectedTag === "" ? true : thread.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const allTags = Array.from(new Set(forumThreads.flatMap((thread) => thread.tags)))

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-muted-foreground">
            Connect with fellow learners, ask questions, and participate in challenges.
          </p>
        </div>

        <Tabs defaultValue="forum" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="forum">Discussion Forum</TabsTrigger>
            <TabsTrigger value="challenges">Weekly Challenges</TabsTrigger>
            <TabsTrigger value="help">Help Me Understand</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
          </TabsList>

          <TabsContent value="forum" className="mt-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search discussions..."
                      className="pl-8 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={selectedTag} onValueChange={setSelectedTag}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Filter by tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tags</SelectItem>
                      {allTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button>Start New Discussion</Button>
              </div>

              <div className="space-y-4">
                {filteredThreads.map((thread) => (
                  <Card key={thread.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">
                          <Link href={`/community/thread/${thread.id}`} className="hover:underline">
                            {thread.title}
                          </Link>
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MessageSquare className="h-4 w-4" />
                          <span>{thread.replies}</span>
                        </div>
                      </div>
                      <CardDescription>
                        Posted by {thread.author} on {formatDate(thread.date)}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2 flex justify-between">
                      <div className="flex flex-wrap gap-2">
                        {thread.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/community/thread/${thread.id}`}>View Discussion</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="flex justify-center">
                <Button variant="outline">Load More Discussions</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="mt-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Weekly Challenges</h2>
                <Button>View Past Challenges</Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {weeklyChallenges.map((challenge) => (
                  <Card key={challenge.id} className="h-full flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{challenge.title}</CardTitle>
                        <Badge className={getDifficultyColor(challenge.difficulty)} variant="secondary">
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      <CardDescription>Due: {formatDateTime(challenge.dueDate)}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm">{challenge.description}</p>
                      <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{challenge.participants} participants</span>
                        </div>
                        <div>{challenge.submissions} submissions</div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Join Challenge</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Challenge Idea</CardTitle>
                  <CardDescription>
                    Have an interesting data science problem? Submit it as a challenge for the community.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="challenge-title" className="text-sm font-medium">
                        Challenge Title
                      </label>
                      <Input id="challenge-title" placeholder="Enter a title for your challenge" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="challenge-description" className="text-sm font-medium">
                        Description
                      </label>
                      <Textarea
                        id="challenge-description"
                        placeholder="Describe the challenge, goals, and evaluation criteria"
                        rows={4}
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="challenge-difficulty" className="text-sm font-medium">
                          Difficulty Level
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="challenge-category" className="text-sm font-medium">
                          Category
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                            <SelectItem value="Natural Language Processing">Natural Language Processing</SelectItem>
                            <SelectItem value="Computer Vision">Computer Vision</SelectItem>
                            <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Submit Challenge Idea</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="help" className="mt-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Help Me Understand This</h2>
                <Button>Ask a Question</Button>
              </div>

              <div className="space-y-6">
                {helpThreads.map((thread) => (
                  <Card key={thread.id}>
                    <CardHeader>
                      <CardTitle className="text-xl">{thread.title}</CardTitle>
                      <CardDescription>
                        Asked by {thread.author} on {formatDate(thread.date)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p>{thread.question}</p>
                      <div className="space-y-4 pt-4 border-t">
                        <h3 className="font-semibold">Answers ({thread.answers.length})</h3>
                        {thread.answers.map((answer) => (
                          <div key={answer.id} className="flex gap-4 p-4 rounded-md bg-muted/50">
                            <div className="flex flex-col items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ChevronUp className="h-4 w-4" />
                              </Button>
                              <span className="text-sm font-medium">{answer.votes}</span>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium">{answer.author}</span>
                                {answer.isMentor && <Badge variant="secondary">Mentor</Badge>}
                              </div>
                              <p className="text-sm">{answer.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Add Your Answer
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mentorship" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Find a Mentor</CardTitle>
                  <CardDescription>
                    Connect with experienced data scientists who can guide your learning journey.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="interest-area" className="text-sm font-medium">
                        Interest Area
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your primary interest" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                          <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                          <SelectItem value="Natural Language Processing">Natural Language Processing</SelectItem>
                          <SelectItem value="Computer Vision">Computer Vision</SelectItem>
                          <SelectItem value="Big Data">Big Data</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="experience-level" className="text-sm font-medium">
                        Your Experience Level
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-preference" className="text-sm font-medium">
                        Contact Preference
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="How would you like to connect?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Email">Email</SelectItem>
                          <SelectItem value="Platform Chat">Platform Chat</SelectItem>
                          <SelectItem value="Video Call">Video Call</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="goals" className="text-sm font-medium">
                        Your Goals
                      </label>
                      <Textarea
                        id="goals"
                        placeholder="Briefly describe what you hope to achieve with mentorship"
                        rows={3}
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Submit Mentorship Request</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming AMA Sessions</CardTitle>
                  <CardDescription>Ask Me Anything sessions with industry experts and mentors.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {amaSessions.map((session) => (
                    <div key={session.id} className="flex gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">{session.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {session.host}, {session.role}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span>{formatDateTime(session.date)}</span>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{session.participants} attending</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All AMA Sessions
                  </Button>
                </CardFooter>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Become a Peer Mentor</CardTitle>
                  <CardDescription>Share your knowledge and help others in their data science journey.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      Peer mentoring is a great way to reinforce your own knowledge while helping others. As a peer
                      mentor, you'll:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Answer questions in the community forum</li>
                      <li>Provide feedback on projects and challenges</li>
                      <li>Host study groups on specific topics</li>
                      <li>Create and share learning resources</li>
                    </ul>
                    <p>
                      To become a peer mentor, you should have completed at least 5 knowledge objects and have a good
                      understanding of the topics you want to mentor in.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    You need to complete 2 more knowledge objects to qualify.
                  </div>
                  <Button disabled>Apply to be a Mentor</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
