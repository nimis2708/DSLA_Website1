"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

const routes = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/quiz", label: "Quiz" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/community", label: "Community" },
  { href: "/blog", label: "Blog" },
  { href: "/mentorship", label: "Mentorship" },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="lg:hidden">
              <div className="px-2 py-6">
                <Link href="/" className="flex items-center gap-2 font-bold" onClick={() => setOpen(false)}>
                  <BookOpen className="h-6 w-6 text-primary" />
                  <span className="text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Data Science Learning Accelerator
                  </span>
                </Link>
                <nav className="mt-8 flex flex-col gap-4">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === route.href ? "text-primary font-semibold" : "text-foreground/70",
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="hidden items-center space-x-2 lg:flex">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Data Science Learning Accelerator
            </span>
          </Link>
          <Link href="/" className="flex items-center space-x-2 lg:hidden">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DSLA
            </span>
          </Link>
        </div>
        <nav className="hidden gap-6 lg:flex">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative",
                pathname === route.href
                  ? "text-primary font-semibold after:absolute after:bottom-[-18px] after:left-0 after:h-[3px] after:w-full after:bg-primary"
                  : "text-foreground/70",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden lg:flex text-foreground/70 hover:text-foreground">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
