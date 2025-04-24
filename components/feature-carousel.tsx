"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Autoplay from "embla-carousel-autoplay"

const carouselItems = [
  {
    id: 1,
    title: "Interactive Data Visualization",
    description: "Students learning to create interactive visualizations with Python",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Machine Learning Workshop",
    description: "Hands-on workshop on implementing machine learning algorithms",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Data Analysis Project",
    description: "Students collaborating on real-world data analysis projects",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "AI Ethics Discussion",
    description: "Group discussion on ethical considerations in AI development",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "Coding Challenge",
    description: "Students participating in a data science coding challenge",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function FeatureCarousel() {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap())
    }

    api.on("select", onSelect)
    api.on("reInit", onSelect)

    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [api])

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      setApi={setApi}
      className="w-full"
    >
      <CarouselContent>
        {carouselItems.map((item) => (
          <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
            <Card className="border-2 border-education-100 hover:border-education-200 transition-colors">
              <CardContent className="flex flex-col p-4">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={600}
                  height={400}
                  className="rounded-md object-cover aspect-video shadow-sm"
                />
                <div className="pt-4">
                  <h3 className="font-semibold text-primary">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-center mt-4 gap-2">
        <CarouselPrevious className="static bg-white text-primary border-education-200 hover:bg-education-50 hover:text-primary" />
        <div className="flex gap-1">
          {carouselItems.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${current === index ? "bg-primary" : "bg-muted-foreground/30"}`}
            />
          ))}
        </div>
        <CarouselNext className="static bg-white text-primary border-education-200 hover:bg-education-50 hover:text-primary" />
      </div>
    </Carousel>
  )
}
