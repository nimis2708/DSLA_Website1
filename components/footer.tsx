import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Globe, BookOpen } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Data Science Learning Accelerator
              </h3>
            </div>
            <p className="text-sm text-muted-foreground">
              An educational platform created by Master&apos;s Data Science Students at Indiana University Bloomington
              to help learners master data science concepts through structured learning paths.
            </p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com/IUBloomington" target="_blank" rel="noreferrer">
                <Twitter className="h-5 w-5 text-primary hover:text-primary/80" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://facebook.com/IndianaUniversity" target="_blank" rel="noreferrer">
                <Facebook className="h-5 w-5 text-primary hover:text-primary/80" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com/iubloomington" target="_blank" rel="noreferrer">
                <Instagram className="h-5 w-5 text-primary hover:text-primary/80" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://youtube.com/user/iu" target="_blank" rel="noreferrer">
                <Youtube className="h-5 w-5 text-primary hover:text-primary/80" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">IU Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://datascience.indiana.edu/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  Luddy School Data Science Program
                </Link>
              </li>
              <li>
                <Link
                  href="https://luddy.indiana.edu/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  Luddy School of Informatics
                </Link>
              </li>
              <li>
                <Link
                  href="https://libraries.indiana.edu/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  IU Libraries
                </Link>
              </li>
              <li>
                <Link
                  href="https://uits.iu.edu/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  University Information Technology Services
                </Link>
              </li>
              <li>
                <Link
                  href="https://bigdatahub.iu.edu/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  IU Big Data Hub
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/explore" className="text-muted-foreground hover:text-primary transition-colors">
                  Knowledge Objects
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-muted-foreground hover:text-primary transition-colors">
                  Learning Path Quiz
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-primary transition-colors">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog & Resources
                </Link>
              </li>
              <li>
                <Link href="/mentorship" className="text-muted-foreground hover:text-primary transition-colors">
                  Mentorship Program
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">Luddy Hall, 700 N. Woodlawn Avenue, Bloomington, IN 47408</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <Link
                  href="mailto:dsla@indiana.edu"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  dsla@indiana.edu
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <Link href="tel:+18128556159" className="text-muted-foreground hover:text-primary transition-colors">
                  (812) 855-6159
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <Link
                  href="https://www.indiana.edu"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.indiana.edu
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} The Trustees of Indiana University. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:justify-end">
              <Link
                href="https://accessibility.iu.edu"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                Accessibility
              </Link>
              <Link
                href="https://www.iu.edu/privacy/index.html"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                Privacy Notice
              </Link>
              <Link
                href="https://www.iu.edu/copyright/index.html"
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noreferrer"
              >
                Copyright
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
