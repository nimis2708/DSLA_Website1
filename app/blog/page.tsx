"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, User } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// Sample blog posts data
const blogPosts = [
  {
    id: "post-1",
    title: "Getting Started with Python for Data Science",
    excerpt: "A comprehensive guide to setting up your Python environment and essential libraries for data science.",
    author: "Alex Johnson",
    date: "2023-04-05T14:30:00Z",
    category: "Beginner Guides",
    level: "Beginner",
    tags: ["Python", "Setup", "Libraries"],
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: "post-2",
    title: "Advanced Techniques in Natural Language Processing",
    excerpt: "Explore cutting-edge NLP techniques and how they're revolutionizing text analysis and understanding.",
    author: "Maria Rodriguez",
    date: "2023-04-03T10:15:00Z",
    category: "Trending Topics",
    level: "Advanced",
    tags: ["NLP", "Deep Learning", "Transformers"],
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: "post-3",
    title: "From Data Analyst to Data Scientist: Making the Transition",
    excerpt:
      "Practical advice on how to level up your skills and make the career transition from analyst to scientist.",
    author: "David Chen",
    date: "2023-04-01T16:45:00Z",
    category: "Career Advice",
    level: "Intermediate",
    tags: ["Career", "Skills", "Learning Path"],
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
  },
  {
    id: "post-4",
    title: "Visualizing Data: Best Practices and Common Pitfalls",
    excerpt:
      "Learn how to create effective data visualizations and avoid common mistakes that can mislead your audience.",
    author: "Sarah Kim",
    date: "2023-03-28T09:20:00Z",
    category: "Beginner Guides",
    level: "Beginner",
    tags: ["Visualization", "Matplotlib", "Seaborn"],
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: "post-5",
    title: "Building a Recommendation System from Scratch",
    excerpt: "A step-by-step guide to implementing different types of recommendation algorithms.",
    author: "Michael Brown",
    date: "2023-03-25T11:30:00Z",
    category: "Trending Topics",
    level: "Intermediate",
    tags: ["Recommendations", "Algorithms", "Collaborative Filtering"],
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: "post-6",
    title: "How We Built the Data Science Learning Accelerator",
    excerpt: "Behind the scenes look at the development process, challenges, and lessons learned.",
    author: "Team DSLA",
    date: "2023-03-22T13:45:00Z",
    category: "Behind the Scenes",
    level: "Beginner",
    tags: ["Platform", "Development", "Learning"],
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: "post-7",
    title: "Ethical Considerations in AI and Machine Learning",
    excerpt: "Exploring the ethical implications of AI systems and how to develop responsible models.",
    author: "Elena Patel",
    date: "2023-03-20T15:10:00Z",
    category: "Trending Topics",
    level: "Intermediate",
    tags: ["Ethics", "AI", "Responsible ML"],
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
  {
    id: "post-8",
    title: "Data Science Interview Preparation Guide",
    excerpt: "Comprehensive preparation tips for technical interviews in data science roles.",
    author: "James Wilson",
    date: "2023-03-18T10:00:00Z",
    category: "Career Advice",
    level: "Intermediate",
    tags: ["Interviews", "Career", "Preparation"],
    image: "/placeholder.svg?height=400&width=600",
    featured: false,
  },
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")
  const [selectedTag, setSelectedTag] = useState("")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
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

  const featuredPosts = blogPosts.filter((post) => post.featured)

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true
    const matchesLevel = selectedLevel ? post.level === selectedLevel : true
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true

    return matchesSearch && matchesCategory && matchesLevel && matchesTag
  })

  const categories = Array.from(new Set(blogPosts.map((post) => post.category)))
  const levels = Array.from(new Set(blogPosts.map((post) => post.level)))
  const tags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)))

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground">Insights, tutorials, and updates from the data science community.</p>
        </div>

        {/* Featured Posts Carousel */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Featured Posts</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {featuredPosts.map((post) => (
                <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                  <Link href={`/blog/${post.id}`}>
                    <Card className="h-full overflow-hidden">
                      <div className="aspect-video relative">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      </div>
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{post.category}</Badge>
                          <Badge className={getLevelColor(post.level)} variant="secondary">
                            {post.level}
                          </Badge>
                        </div>
                        <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center mt-4 gap-2">
              <CarouselPrevious className="static" />
              <CarouselNext className="static" />
            </div>
          </Carousel>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">All Posts</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search posts..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger>
                <SelectValue placeholder="All Tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tags</SelectItem>
                {tags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <Link href={`/blog/${post.id}`} key={post.id}>
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-video relative">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{post.category}</Badge>
                    <Badge className={getLevelColor(post.level)} variant="secondary">
                      {post.level}
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center">
          <Button variant="outline">Load More Posts</Button>
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Subscribe to Our Newsletter</CardTitle>
            <CardDescription>
              Get the latest data science articles, tutorials, and updates delivered to your inbox.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Enter your email" />
              <Button type="submit">Subscribe</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
