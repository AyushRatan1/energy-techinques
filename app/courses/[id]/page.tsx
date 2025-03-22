import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getCourseById, getInstructorById } from "@/lib/supabase-client"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata({ params }: { params: { id: string } }) {
  const course = await getCourseById(params.id)
  
  if (!course) {
    return {
      title: "Course Not Found - Energy Techniques",
      description: "The requested course could not be found."
    }
  }
  
  return {
    title: `${course.title} - Energy Techniques`,
    description: course.description,
  }
}

export default async function CoursePage({ params }: { params: { id: string } }) {
  const course = await getCourseById(params.id)
  
  if (!course) {
    notFound()
  }
  
  const instructor = await getInstructorById(course.instructor_id)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative h-[300px] md:h-[400px] mb-6 rounded-lg overflow-hidden">
                <Image 
                  src={course.image_url} 
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              
              <div className="flex items-center mb-6">
                <span className="text-muted-foreground">{course.duration}</span>
                <span className="mx-2">•</span>
                <span className="text-muted-foreground">Instructor: {instructor?.name || "Unknown"}</span>
              </div>
              
              <div className="prose dark:prose-invert max-w-none mb-8">
                <h2 className="text-2xl font-semibold mb-4">Course Description</h2>
                <p className="mb-4">{course.description}</p>
                <p className="mb-4">This comprehensive course covers all aspects of energy systems optimization and management. You'll learn practical techniques and methodologies that can be immediately applied in your professional work.</p>
                
                <h2 className="text-2xl font-semibold mb-4 mt-8">What You'll Learn</h2>
                <ul className="space-y-2">
                  <li>Advanced energy system design principles</li>
                  <li>Optimization techniques for maximum efficiency</li>
                  <li>Industry best practices and standards</li>
                  <li>Practical implementation strategies</li>
                  <li>Real-world case studies and examples</li>
                </ul>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Course Details</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level:</span>
                    <span className="font-medium">Professional</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Format:</span>
                    <span className="font-medium">Online / On-site</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Certificate:</span>
                    <span className="font-medium">Yes</span>
                  </div>
                </div>
                
                {course.registration_link ? (
                  <Link href={course.registration_link} target="_blank">
                    <Button className="w-full mb-4">Enroll Now</Button>
                  </Link>
                ) : (
                  <Button className="w-full mb-4">Enroll Now</Button>
                )}
                <Button variant="outline" className="w-full">Download Syllabus</Button>
                
                {instructor && (
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-semibold mb-2">About the Instructor</h3>
                    <Link href={`/experts#${instructor.id}`} className="flex items-center space-x-3 hover:opacity-80">
                      <div className="relative w-10 h-10">
                        <Image 
                          src={instructor.image_url} 
                          alt={instructor.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{instructor.name}</p>
                        <p className="text-sm text-muted-foreground">Expert Instructor</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 