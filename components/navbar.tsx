"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Zap, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
            <Zap className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Energy Techniques
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="text-muted-foreground hover:text-foreground relative group">
              Courses
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/experts" className="text-muted-foreground hover:text-foreground relative group">
              Experts
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/admin">
              <Button variant="outline" className="border-primary/20 hover:border-primary hover:bg-primary/5">
                Admin Portal
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-muted-foreground hover:text-foreground focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4 px-2">
              <Link href="/courses" className="text-muted-foreground hover:text-foreground py-2">
                Courses
              </Link>
              <Link href="/experts" className="text-muted-foreground hover:text-foreground py-2">
                Experts
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground py-2">
                About
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground py-2">
                Contact
              </Link>
              <Link href="/admin">
                <Button variant="outline" className="w-full">Admin Portal</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 