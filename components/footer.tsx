import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Zap, Twitter, Linkedin, Youtube, Mail, MapPin, Phone, ArrowRight } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary/5 border-t">
      <div className="container mx-auto px-4 py-16">
        {/* Newsletter Section */}
        <div className="bg-card rounded-lg p-8 shadow-lg mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
              <p className="text-muted-foreground mb-0">
                Get the latest updates on new courses, events, and energy industry insights.
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-grow focus:ring-primary" 
                />
                <Button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-4">
              <Zap className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-xl font-bold">Energy Techniques</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Empowering professionals with advanced energy systems knowledge through expert-led training.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3" />
                <p className="text-sm text-muted-foreground">
                  123 Energy Street, Suite 100<br />
                  San Francisco, CA 94107
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <p className="text-sm text-muted-foreground">info@energytechniques.com</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-5">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/experts" className="text-muted-foreground hover:text-primary flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                  Experts
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-5">Resources</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-5">Connect With Us</h4>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary p-2 rounded-full transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary p-2 rounded-full transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary p-2 rounded-full transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Follow us on social media for industry updates, course announcements, and energy insights.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Energy Techniques. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 