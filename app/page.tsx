import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/course-card"
import { ExpertCard } from "@/components/expert-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { getCourses, getInstructors, getTestimonials } from "@/lib/supabase-client"
import { Analytics } from "@vercel/analytics/react"
import { 
  Zap, Users, Award, BookOpen, BarChart2, 
  Target, Clock, CheckCircle 
} from "lucide-react"

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  // Fetch data from Supabase
  const courses = await getCourses()
  const instructors = await getInstructors()
  const testimonials = await getTestimonials()

  // Get featured courses (first 3)
  const featuredCourses = courses.slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section with improved design */}
        <section className="hero-gradient py-24 md:py-32 relative">
          <div className="container mx-auto px-4 relative z-10 hero-content">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-block p-2 px-4 bg-primary/10 rounded-full mb-6">
                <span className="text-sm font-medium text-primary">Professional Energy Training</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Master Energy Systems with <span className="gradient-text">Industry Experts</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Professional training courses designed to elevate your expertise in energy technologies and systems
                optimization.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/courses">
                  <Button size="lg" className="btn-primary w-full sm:w-auto">
                    Explore Courses
                  </Button>
                </Link>
                <Link href="/#experts">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Meet Our Experts
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-3xl font-bold text-primary">{courses.length}+</p>
                  <p className="text-sm text-muted-foreground">Courses Available</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">{instructors.length}+</p>
                  <p className="text-sm text-muted-foreground">Industry Experts</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">94%</p>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground">Expert Support</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="h-16 w-full fill-current text-background">
              <path fillOpacity="1" d="M0,32L80,48C160,64,320,96,480,96C640,96,800,64,960,48C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
            </svg>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-24 section-primary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-slide-up">
              <p className="text-primary font-medium mb-2">WHY CHOOSE US</p>
              <h2 className="text-3xl font-bold mb-6">Training That Transforms Your Energy Career</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our courses are designed by industry experts to provide you with practical skills and knowledge needed for modern energy systems management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="card-hover rounded-lg p-6 animate-slide-up">
                <div className="feature-icon">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert-Led Content</h3>
                <p className="text-muted-foreground">
                  Learn directly from industry professionals with real-world experience in energy systems.
                </p>
              </div>
              
              <div className="card-hover rounded-lg p-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="feature-icon">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Practical Training</h3>
                <p className="text-muted-foreground">
                  Apply what you learn with hands-on projects and real-world case studies.
                </p>
              </div>
              
              <div className="card-hover rounded-lg p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <div className="feature-icon">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Industry Certification</h3>
                <p className="text-muted-foreground">
                  Gain recognized certifications that will boost your career prospects.
                </p>
              </div>
              
              <div className="card-hover rounded-lg p-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                <div className="feature-icon">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Flexible Learning</h3>
                <p className="text-muted-foreground">
                  Choose between in-person or online courses to fit your schedule.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-24 section-secondary wave-bottom">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <p className="text-primary font-medium mb-2">FEATURED COURSES</p>
                <h2 className="text-3xl font-bold">Trending Energy Courses</h2>
              </div>
              <Link href="/courses" className="text-primary hover:underline flex items-center group">
                View All Courses
                <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course, index) => (
                <div key={course.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CourseCard
                    id={course.id}
                    title={course.title}
                    description={course.description}
                    duration={course.duration}
                    instructor_id={course.instructor_id}
                    image_url={course.image_url}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experts Section with improved layout */}
        <section id="experts" className="py-24 section-accent">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-primary font-medium mb-2">OUR EXPERTS</p>
              <h2 className="text-3xl font-bold mb-6">Learn From Industry Leaders</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our instructors bring years of real-world experience and expertise to help you master energy systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {instructors.map((instructor, index) => (
                <div key={instructor.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ExpertCard
                    id={instructor.id}
                    name={instructor.name}
                    bio={instructor.bio}
                    image_url={instructor.image_url}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section with improved cards */}
        <section id="testimonials" className="py-24 section-primary dot-pattern">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-primary font-medium mb-2">TESTIMONIALS</p>
              <h2 className="text-3xl font-bold mb-6">What Our Students Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Hear from professionals who have transformed their careers with our training programs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <TestimonialCard
                    name={testimonial.name}
                    position={testimonial.position}
                    company={testimonial.company}
                    content={testimonial.content}
                    imageUrl={testimonial.image_url || "/placeholder.svg?height=100&width=100"}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl font-bold mb-2">10+</p>
                <p>Years Experience</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">150+</p>
                <p>Completed Projects</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">5,000+</p>
                <p>Satisfied Students</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">15+</p>
                <p>Industry Partners</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section with enhanced design */}
        <section className="py-24 bg-gradient-to-r from-primary/10 to-secondary/10 relative">
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-2xl mx-auto">
              <p className="text-primary font-medium mb-2">GET STARTED TODAY</p>
              <h2 className="text-3xl font-bold mb-6">Ready to Advance Your Energy Expertise?</h2>
              <p className="text-xl text-muted-foreground mb-10">
                Join our professional community of energy experts and elevate your career with industry-leading training.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/courses">
                  <Button size="lg" className="btn-primary w-full sm:w-auto">
                    Browse All Courses
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full"></div>
            <div className="absolute top-20 right-20 w-20 h-20 bg-secondary/5 rounded-full"></div>
            <div className="absolute bottom-10 left-1/4 w-32 h-32 bg-accent/5 rounded-full"></div>
          </div>
        </section>
      </main>
      <Analytics/>
      <Footer />
    </div>
  )
}

