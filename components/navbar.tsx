import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Energy Techniques
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="text-muted-foreground hover:text-foreground">
              Courses
            </Link>
            <Link href="/experts" className="text-muted-foreground hover:text-foreground">
              Experts
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/admin">
              <Button variant="outline">Admin</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 