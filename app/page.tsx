import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Compass, MessageSquare, FileText, ChevronRight } from "lucide-react"
import FeatureCarousel from "@/components/feature-carousel"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 gradient-hero text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Data Science Learning Accelerator
                </h1>
                <p className="max-w-[600px] text-white/80 md:text-xl">
                  Created by Master&apos;s Data Science Students at Indiana University
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="gap-1 bg-white text-primary hover:bg-white/90">
                  <Link href="/quiz">
                    Take the 3 Question Quiz to Get Started
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-education-100 text-primary border-2 border-white hover:bg-education-200 font-medium"
                >
                  <Link href="/explore?level=beginner">New to Data Science? Start Here!</Link>
                </Button>
              </div>
            </div>
            <Image
              src="/placeholder.svg?height=550&width=550"
              width={550}
              height={550}
              alt="Data Science Learning"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Accelerate Your Data Science Journey
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our platform offers everything you need to master data science concepts and skills.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-5">
            <Card className="bg-background border-2 border-education-200 hover:border-education-300 transition-colors">
              <CardHeader className="pb-2 text-center">
                <BookOpen className="h-8 w-8 mx-auto text-education-600" />
                <CardTitle className="text-lg">Knowledge Objects</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Bite-sized learning modules designed for efficient mastery
              </CardContent>
            </Card>
            <Card className="bg-background border-2 border-education-200 hover:border-education-300 transition-colors">
              <CardHeader className="pb-2 text-center">
                <Compass className="h-8 w-8 mx-auto text-education-600" />
                <CardTitle className="text-lg">Learning Paths</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Customized routes to achieve your specific learning goals
              </CardContent>
            </Card>
            <Card className="bg-background border-2 border-education-200 hover:border-education-300 transition-colors">
              <CardHeader className="pb-2 text-center">
                <Users className="h-8 w-8 mx-auto text-education-600" />
                <CardTitle className="text-lg">Community</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Connect with fellow learners to share insights and challenges
              </CardContent>
            </Card>
            <Card className="bg-background border-2 border-education-200 hover:border-education-300 transition-colors">
              <CardHeader className="pb-2 text-center">
                <MessageSquare className="h-8 w-8 mx-auto text-education-600" />
                <CardTitle className="text-lg">Mentorship</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Get guidance from experienced data scientists and peers
              </CardContent>
            </Card>
            <Card className="bg-background border-2 border-education-200 hover:border-education-300 transition-colors">
              <CardHeader className="pb-2 text-center">
                <FileText className="h-8 w-8 mx-auto text-education-600" />
                <CardTitle className="text-lg">Blog</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-sm text-muted-foreground">
                Stay updated with the latest trends and insights
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Learning in Action
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                See how our platform is helping students master data science concepts.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-5xl py-12">
            <FeatureCarousel />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                What Our Students Say
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Hear from students who have accelerated their data science learning journey.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Alex Johnson</CardTitle>
                <CardDescription>Indiana University, MS Data Science</CardDescription>
              </CardHeader>
              <CardContent>
                "The Knowledge Objects approach helped me understand complex machine learning concepts in a structured
                way. The learning paths were perfectly tailored to my goals."
              </CardContent>
            </Card>
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Maria Rodriguez</CardTitle>
                <CardDescription>Career Switcher, Former Marketing Analyst</CardDescription>
              </CardHeader>
              <CardContent>
                "As someone transitioning to data science, the beginner-friendly content and supportive community made
                all the difference. I landed my first data role after 6 months!"
              </CardContent>
            </Card>
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>David Chen</CardTitle>
                <CardDescription>PhD Student, Computer Science</CardDescription>
              </CardHeader>
              <CardContent>
                "The advanced topics and mentorship opportunities helped me bridge the gap between theoretical knowledge
                and practical applications in my research."
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 gradient-hero text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to Accelerate Your Learning?
              </h2>
              <p className="mx-auto max-w-[700px] md:text-xl text-white/80">
                Join thousands of students who are mastering data science through our platform.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" variant="secondary" className="gap-1 bg-white text-primary hover:bg-white/90">
                <Link href="/quiz">
                  Take the Quiz Now
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-education-100 text-primary border-2 border-white hover:bg-education-200 font-medium"
              >
                <Link href="/explore">Explore Knowledge Objects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
