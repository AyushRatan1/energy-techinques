"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getCourses, getInstructors, deleteCourse, deleteInstructor, getTestimonials, deleteTestimonial } from "@/lib/supabase-client"
import { Edit, Plus, Trash2 } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

// Helper function to revalidate routes
async function revalidateRoutes() {
  try {
    const response = await fetch('/api/revalidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: '/',
      }),
    });

    if (!response.ok) {
      throw new Error('Revalidation failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error revalidating:', error);
    return null;
  }
}

export default function AdminDashboardPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [instructors, setInstructors] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("courses")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check if user is authenticated (for demo purposes)
  useEffect(() => {
    // In a real app, you would check for a valid session/token
    const isAuthenticated = sessionStorage.getItem("adminAuthenticated")
    if (!isAuthenticated) {
      router.push("/admin")
    }
  }, [router])

  // For demo purposes, set authenticated on component mount
  useEffect(() => {
    sessionStorage.setItem("adminAuthenticated", "true")
  }, [])

  // Fetch data from Supabase
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const [coursesData, instructorsData, testimonialsData] = await Promise.all([
          getCourses(),
          getInstructors(),
          getTestimonials()
        ])
        setCourses(coursesData)
        setInstructors(instructorsData)
        setTestimonials(testimonialsData)
      } catch (error) {
        console.error("Error fetching data:", error)
        alert("Failed to load data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDeleteCourse = async (id: string) => {
    try {
      const success = await deleteCourse(id)
      if (success) {
        setCourses(courses.filter((course) => course.id !== id))
        // Revalidate routes to update the homepage
        await revalidateRoutes()
        alert("Course deleted successfully")
      } else {
        throw new Error("Failed to delete course")
      }
    } catch (error) {
      console.error("Error deleting course:", error)
      alert("Failed to delete course. Please try again.")
    }
  }

  const handleDeleteInstructor = async (id: string) => {
    try {
      const success = await deleteInstructor(id)
      if (success) {
        setInstructors(instructors.filter((instructor) => instructor.id !== id))
        // Revalidate routes to update the homepage
        await revalidateRoutes()
        alert("Instructor deleted successfully")
      } else {
        throw new Error("Failed to delete instructor")
      }
    } catch (error) {
      console.error("Error deleting instructor:", error)
      alert("Failed to delete instructor. Please try again.")
    }
  }

  const handleDeleteTestimonial = async (id: string) => {
    try {
      const success = await deleteTestimonial(id)
      if (success) {
        setTestimonials(testimonials.filter((testimonial) => testimonial.id !== id))
        alert("Testimonial deleted successfully")
      } else {
        throw new Error("Failed to delete testimonial")
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      alert("Failed to delete testimonial. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button
              onClick={() => {
                sessionStorage.removeItem("adminAuthenticated")
                router.push("/admin")
              }}
            >
              Logout
            </Button>
          </div>

          <Tabs defaultValue="courses" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="instructors">Instructors</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            </TabsList>

            <TabsContent value="courses">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Courses</h2>
                <Link href="/admin/dashboard/courses/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Course
                  </Button>
                </Link>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {courses.map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative h-48 md:h-auto md:w-64">
                          <Image
                            src={course.image_url || "/placeholder.svg"}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="flex-1 p-6">
                          <div className="flex justify-between">
                            <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                            <div className="flex gap-2">
                              <Link href={`/admin/dashboard/courses/edit/${course.id}`}>
                                <Button variant="outline" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              
                              {/* Simple delete button */}
                              <Button 
                                variant="destructive" 
                                size="icon" 
                                onClick={() => {
                                  if (window.confirm("Are you sure you want to delete this course?")) {
                                    handleDeleteCourse(course.id)
                                  }
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
                          <div className="flex flex-wrap gap-4">
                            <div className="text-sm">
                              <span className="font-medium">Duration:</span> {course.duration}
                            </div>
                            <div className="text-sm">
                              <span className="font-medium">Instructor:</span>{" "}
                              {instructors.find((i) => i.id === course.instructor_id)?.name}
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="instructors">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Instructors</h2>
                <Link href="/admin/dashboard/instructors/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Instructor
                  </Button>
                </Link>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {instructors.map((instructor) => (
                    <Card key={instructor.id} className="overflow-hidden">
                      <div className="relative h-48 w-full">
                        <Image
                          src={instructor.image_url || "/placeholder.svg"}
                          alt={instructor.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex justify-between">
                          <h3 className="text-xl font-bold mb-2">{instructor.name}</h3>
                          <div className="flex gap-2">
                            <Link href={`/admin/dashboard/instructors/edit/${instructor.id}`}>
                              <Button variant="outline" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            
                            {/* Simple delete button */}
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              onClick={() => {
                                if (window.confirm("Are you sure you want to delete this instructor?")) {
                                  handleDeleteInstructor(instructor.id)
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-3">{instructor.bio}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="testimonials">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manage Testimonials</h2>
                <Link href="/admin/dashboard/testimonials/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Testimonial
                  </Button>
                </Link>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex justify-between mb-4">
                          <div className="flex items-center">
                            <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                              <Image
                                src={testimonial.image_url || "/placeholder.svg"}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-bold">{testimonial.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                {testimonial.position}, {testimonial.company}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Link href={`/admin/dashboard/testimonials/edit/${testimonial.id}`}>
                              <Button variant="outline" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            
                            {/* Simple delete button */}
                            <Button 
                              variant="destructive" 
                              size="icon" 
                              onClick={() => {
                                if (window.confirm("Are you sure you want to delete this testimonial?")) {
                                  handleDeleteTestimonial(testimonial.id)
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{testimonial.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

