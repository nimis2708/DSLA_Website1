"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Users, User, Search, BookOpen, GraduationCap, MapPin } from "lucide-react"

// Sample mentors data
const mentors = [
  {
    id: "mentor-1",
    name: "Dr. Sarah Johnson",
    role: "Lead Data Scientist",
    company: "Tech Corp",
    bio: "10+ years of experience in machine learning and AI. Specializes in NLP and computer vision applications.",
    expertise: ["Machine Learning", "NLP", "Computer Vision"],
    availability: "2-3 hours/week",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "mentor-2",
    name: "Michael Chen",
    role: "AI Research Scientist",
    company: "AI Research Institute",
    bio: "PhD in Computer Science with focus on deep learning. Published researcher and open source contributor.",
    expertise: ["Deep Learning", "Research", "Neural Networks"],
    availability: "1-2 hours/week",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "mentor-3",
    name: "Elena Patel",
    role: "Data Science Manager",
    company: "Finance Analytics Inc.",
    bio: "Experienced in applying data science in finance and banking. Passionate about mentoring new data scientists.",
    expertise: ["Finance Analytics", "Time Series", "Team Leadership"],
    availability: "2 hours/week",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "mentor-4",
    name: "James Wilson",
    role: "Senior ML Engineer",
    company: "Tech Startup",
    bio: "Specializes in deploying ML models to production. Expert in MLOps and scalable ML systems.",
    expertise: ["MLOps", "Production ML", "Cloud Infrastructure"],
    availability: "1 hour/week",
    image: "/placeholder.svg?height=200&width=200",
  },
]

// Sample AMA sessions
const amaSessions = [
  {
    id: "ama-1",
    title: "Career Paths in Data Science",
    host: "Dr. Sarah Johnson",
    role: "Lead Data Scientist at Tech Corp",
    date: "2023-04-20T18:00:00Z",
    participants: 45,
    description: "Explore different career paths in data science and how to position yourself for success in each.",
  },
  {
    id: "ama-2",
    title: "Deep Learning Research Trends",
    host: "Prof. Michael Chen",
    role: "AI Research Scientist",
    date: "2023-04-27T17:00:00Z",
    participants: 32,
    description: "Discussion of current research trends in deep learning and what's on the horizon.",
  },
  {
    id: "ama-3",
    title: "Building a Data Science Portfolio",
    host: "Alex Rodriguez",
    role: "Senior Data Science Recruiter",
    date: "2023-05-04T19:00:00Z",
    participants: 28,
    description: "Learn how to build an impressive portfolio that will help you land your dream data science job.",
  },
]

// Sample peer mentors
const peerMentors = [
  {
    id: "peer-1",
    name: "Taylor Smith",
    university: "Indiana University",
    program: "MS Data Science",
    interests: ["Python", "Machine Learning", "Data Visualization"],
    bio: "Second-year data science student with experience in Python and machine learning projects.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "peer-2",
    name: "Jordan Lee",
    university: "Indiana University",
    program: "MS Data Science",
    interests: ["R", "Statistics", "Bioinformatics"],
    bio: "Focusing on statistical methods and their applications in biological data analysis.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "peer-3",
    name: "Casey Brown",
    university: "Indiana University",
    program: "MS Data Science",
    interests: ["Deep Learning", "Computer Vision", "Research"],
    bio: "Research assistant working on computer vision applications in healthcare.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function MentorshipPage() {
  const [activeTab, setActiveTab] = useState("find-mentor")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedExpertise, setSelectedExpertise] = useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.bio.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesExpertise = selectedExpertise ? mentor.expertise.includes(selectedExpertise) : true

    return matchesSearch && matchesExpertise
  })

  const allExpertise = Array.from(new Set(mentors.flatMap((mentor) => mentor.expertise)))

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Mentorship</h1>
          <p className="text-muted-foreground">
            Connect with experienced mentors and peers to accelerate your data science journey.
          </p>
        </div>

        <Tabs defaultValue="find-mentor" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="find-mentor">Find a Mentor</TabsTrigger>
            <TabsTrigger value="ama">Live AMA Sessions</TabsTrigger>
            <TabsTrigger value="peer-network">Peer Network</TabsTrigger>
          </TabsList>

          <TabsContent value="find-mentor" className="mt-6">
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search mentors..."
                      className="pl-8 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
                    <SelectTrigger className="w-full sm:w-60">
                      <SelectValue placeholder="Filter by expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Expertise</SelectItem>
                      {allExpertise.map((expertise) => (
                        <SelectItem key={expertise} value={expertise}>
                          {expertise}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {filteredMentors.map((mentor) => (
                  <Card key={mentor.id} className="flex flex-col h-full">
                    <CardHeader className="flex flex-row items-start gap-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden">
                        <Image
                          src={mentor.image || "/placeholder.svg"}
                          alt={mentor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle>{mentor.name}</CardTitle>
                        <CardDescription className="flex flex-col">
                          <span>{mentor.role}</span>
                          <span>{mentor.company}</span>
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm mb-4">{mentor.bio}</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Expertise:</span>
                          <div className="flex flex-wrap gap-1">
                            {mentor.expertise.map((skill) => (
                              <Badge key={skill} variant="outline">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Availability:</span>
                          <span>{mentor.availability}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Request Mentorship</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Can't find what you're looking for?</CardTitle>
                  <CardDescription>
                    Submit a custom mentorship request and we'll try to match you with the right mentor.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="interest-area" className="text-sm font-medium">
                          Interest Area
                        </label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your primary interest" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ml">Machine Learning</SelectItem>
                            <SelectItem value="data-analysis">Data Analysis</SelectItem>
                            <SelectItem value="nlp">Natural Language Processing</SelectItem>
                            <SelectItem value="cv">Computer Vision</SelectItem>
                            <SelectItem value="big-data">Big Data</SelectItem>
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
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="goals" className="text-sm font-medium">
                        What do you hope to achieve with mentorship?
                      </label>
                      <Textarea
                        id="goals"
                        placeholder="Describe your goals and what you're looking for in a mentor"
                        rows={3}
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Submit Request</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ama" className="mt-6">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Upcoming AMA Sessions</h2>
                <Button variant="outline">View Past Sessions</Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {amaSessions.map((session) => (
                  <Card key={session.id} className="flex flex-col h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Live Session</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{session.participants} attending</span>
                        </div>
                      </div>
                      <CardTitle className="mt-2">{session.title}</CardTitle>
                      <CardDescription>{formatDate(session.date)}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <div className="flex items-center gap-2 mb-4">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          <span className="font-medium">{session.host}</span>
                          <span className="text-muted-foreground"> • {session.role}</span>
                        </span>
                      </div>
                      <p className="text-sm">{session.description}</p>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button className="flex-1">RSVP</Button>
                      <Button variant="outline" className="flex-1">
                        Add to Calendar
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Suggest an AMA Topic</CardTitle>
                  <CardDescription>What topics would you like to see covered in future AMA sessions?</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="ama-topic" className="text-sm font-medium">
                        Topic Suggestion
                      </label>
                      <Input id="ama-topic" placeholder="Suggest a topic for a future AMA session" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="ama-description" className="text-sm font-medium">
                        Why is this topic important?
                      </label>
                      <Textarea
                        id="ama-description"
                        placeholder="Briefly explain why this topic would be valuable to the community"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="suggested-speaker" className="text-sm font-medium">
                        Suggested Speaker (Optional)
                      </label>
                      <Input id="suggested-speaker" placeholder="Name of a potential speaker for this topic" />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Submit Suggestion</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="peer-network" className="mt-6">
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Networking</CardTitle>
                    <CardDescription>
                      Connect with other students to form study groups and collaborate on projects.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="relative w-full">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="Search students by name or interest..."
                            className="pl-8 w-full"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by university" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Universities</SelectItem>
                            <SelectItem value="indiana">Indiana University</SelectItem>
                            <SelectItem value="purdue">Purdue University</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Filter by interest" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Interests</SelectItem>
                            <SelectItem value="machine-learning">Machine Learning</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="r">R</SelectItem>
                            <SelectItem value="statistics">Statistics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Find Study Partners</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Become a Peer Mentor</CardTitle>
                    <CardDescription>
                      Share your knowledge and help fellow students while reinforcing your own understanding.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm">As a peer mentor, you'll:</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Help other students with concepts you're comfortable with</li>
                        <li>Host study sessions on specific topics</li>
                        <li>Review and provide feedback on projects</li>
                        <li>Build your leadership and communication skills</li>
                      </ul>
                      <p className="text-sm">
                        To qualify, you should have completed at least 5 knowledge objects and have a good understanding
                        of the topics you want to mentor in.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Apply to be a Peer Mentor</Button>
                  </CardFooter>
                </Card>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Current Peer Mentors</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {peerMentors.map((mentor) => (
                    <Card key={mentor.id} className="flex flex-col h-full">
                      <CardHeader className="text-center">
                        <div className="mx-auto relative h-24 w-24 rounded-full overflow-hidden mb-2">
                          <Image
                            src={mentor.image || "/placeholder.svg"}
                            alt={mentor.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardTitle>{mentor.name}</CardTitle>
                        <CardDescription className="flex flex-col items-center gap-1">
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-4 w-4" />
                            <span>{mentor.program}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{mentor.university}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm mb-4 text-center">{mentor.bio}</p>
                        <div className="flex flex-wrap gap-1 justify-center">
                          {mentor.interests.map((interest) => (
                            <Badge key={interest} variant="outline">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Connect
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Peer Introduction</CardTitle>
                  <CardDescription>
                    Introduce yourself to the community to find study partners and collaborators.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="university" className="text-sm font-medium">
                          University/Institution
                        </label>
                        <Input id="university" placeholder="Your university or institution" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="program" className="text-sm font-medium">
                          Program/Degree
                        </label>
                        <Input id="program" placeholder="Your program or degree" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="interests" className="text-sm font-medium">
                        Interests (comma separated)
                      </label>
                      <Input id="interests" placeholder="Python, Machine Learning, Data Visualization, etc." />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="bio" className="text-sm font-medium">
                        Brief Introduction
                      </label>
                      <Textarea
                        id="bio"
                        placeholder="Tell the community a bit about yourself, your background, and what you're hoping to learn or collaborate on"
                        rows={3}
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Post Introduction</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
