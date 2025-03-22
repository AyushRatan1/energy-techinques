import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CourseCard } from "@/components/course-card"
import { getCourses } from "@/lib/supabase-client"

export const metadata = {
  title: "Courses - Energy Techniques",
  description: "Browse our professional energy systems training courses.",
}

export const revalidate = 3600 // Revalidate every hour

export default async function CoursesPage() {
  const courses = await getCourses()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Courses</h1>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Explore our comprehensive range of professional energy systems training courses designed
            by industry experts to elevate your expertise in energy technologies and systems optimization.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {courses.map((course) => (
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
      </main>
      
      <Footer />
    </div>
  )
} 