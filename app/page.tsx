import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/course-card"
import { ExpertCard } from "@/components/expert-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { getCourses, getInstructors, getTestimonials } from "@/lib/supabase-client"
import { Analytics } from "@vercel/analytics/react"
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

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="hero-gradient py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Master Energy Systems with <span className="gradient-text">Industry Experts</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Professional training courses designed to elevate your expertise in energy technologies and systems
                optimization.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/courses">
                  <Button size="lg" className="w-full sm:w-auto">
                    Explore Courses
                  </Button>
                </Link>
                <Link href="/#experts">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Meet Our Experts
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Featured Courses</h2>
              <Link href="/courses" className="text-blue-400 hover:underline">
                View All Courses →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  description={course.description}
                  duration={course.duration}
                  instructor_id={course.instructor_id}
                  image_url={course.image_url}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Experts Section */}
        <section id="experts" className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Experts</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {instructors.map((instructor) => (
                <ExpertCard
                  key={instructor.id}
                  id={instructor.id}
                  name={instructor.name}
                  bio={instructor.bio}
                  image_url={instructor.image_url}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">What Our Students Say</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  name={testimonial.name}
                  position={testimonial.position}
                  company={testimonial.company}
                  content={testimonial.content}
                  imageUrl={testimonial.image_url || "/placeholder.svg?height=100&width=100"}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Advance Your Energy Expertise?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our professional community of energy experts and elevate your career with industry-leading training.
            </p>
            <Link href="/courses">
              <Button size="lg">Browse All Courses</Button>
            </Link>
          </div>
        </section>
      </main>
      <Analytics/>
      <Footer />
    </div>
  )
}

