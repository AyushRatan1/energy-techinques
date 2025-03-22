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
import { mockCourses, mockInstructors } from "@/lib/mock-data"
import { Edit, Plus, Trash2 } from "lucide-react"

export default function AdminDashboardPage() {
  const [courses, setCourses] = useState(mockCourses)
  const [instructors, setInstructors] = useState(mockInstructors)
  const [activeTab, setActiveTab] = useState("courses")
  const router = useRouter()

  // Sample testimonials (in a real app, these would come from Supabase)
  const [testimonials, setTestimonials] = useState([
    {
      id: "1",
      name: "John Smith",
      position: "Chief Engineer",
      company: "PowerGen Solutions",
      content:
        "The Energy Techniques courses have significantly improved my understanding of energy systems. The instructors are knowledgeable and the content is directly applicable to my work.",
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "2",
      name: "Emily Johnson",
      position: "Operations Manager",
      company: "Global Energy Corp",
      content:
        "I highly recommend the PowerUp Masterclass Series. It provided our team with practical skills that we implemented immediately, resulting in a 15% efficiency improvement.",
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "3",
      name: "Michael Wong",
      position: "Technical Director",
      company: "Renewable Systems Inc",
      content:
        "The course on Renewable Integration was exactly what our team needed. The instructors bring real-world experience that makes the content relevant and actionable.",
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
  ])

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

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter((course) => course.id !== id))
  }

  const handleDeleteInstructor = (id: string) => {
    setInstructors(instructors.filter((instructor) => instructor.id !== id))
  }

  const handleDeleteTestimonial = (id: string) => {
    setTestimonials(testimonials.filter((testimonial) => testimonial.id !== id))
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
                            <Button variant="destructive" size="icon" onClick={() => handleDeleteCourse(course.id)}>
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
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteInstructor(instructor.id)}
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                            <Image
                              src={testimonial.imageUrl || "/placeholder.svg"}
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
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteTestimonial(testimonial.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">"{testimonial.content}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}

