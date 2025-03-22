"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  getCourses, 
  getInstructors, 
  getTestimonials,
  createCourse
} from "@/lib/supabase-client"
import type { Database } from "@/types/supabase"

type Course = Database["public"]["Tables"]["courses"]["Row"]
type Instructor = Database["public"]["Tables"]["instructors"]["Row"]
type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"]

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showAddCourseForm, setShowAddCourseForm] = useState(false)
  const [courseFormData, setCourseFormData] = useState({
    title: "",
    description: "",
    duration: "",
    instructor_id: "",
    image_url: "/placeholder.svg?height=400&width=600",
    registration_link: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // State for the data
  const [courses, setCourses] = useState<Course[]>([])
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const coursesData = await getCourses()
        const instructorsData = await getInstructors()
        const testimonialsData = await getTestimonials()
        
        setCourses(coursesData)
        setInstructors(instructorsData)
        setTestimonials(testimonialsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  const handleCourseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCourseFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleInstructorSelect = (value: string) => {
    setCourseFormData(prev => ({ ...prev, instructor_id: value }))
  }
  
  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Add the course to Supabase
      const newCourse = await createCourse({
        title: courseFormData.title,
        description: courseFormData.description,
        duration: courseFormData.duration,
        instructor_id: courseFormData.instructor_id,
        image_url: courseFormData.image_url,
        registration_link: courseFormData.registration_link
      })
      
      if (newCourse) {
        // Add the new course to the local state
        setCourses(prev => [newCourse, ...prev])
        
        // Reset form and state
        setIsSubmitting(false)
        setShowAddCourseForm(false)
        setCourseFormData({
          title: "",
          description: "",
          duration: "",
          instructor_id: "",
          image_url: "/placeholder.svg?height=400&width=600",
          registration_link: ""
        })
        
        // Show success message
        alert("Course added successfully!")
      }
    } catch (error) {
      console.error("Error adding course:", error)
      alert("Failed to add course. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="instructors">Instructors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{courses.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Instructors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{instructors.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Featured Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{testimonials.length}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.slice(0, 3).map((course) => (
                    <div key={course.id} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">{course.duration}</p>
                      </div>
                      <Link href={`/courses/${course.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Instructors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {instructors.slice(0, 3).map((instructor) => (
                    <div key={instructor.id} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{instructor.name}</h4>
                        <p className="text-sm text-muted-foreground">{instructor.bio.slice(0, 50)}...</p>
                      </div>
                      <Link href={`/experts#${instructor.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="courses">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Manage Courses</h2>
            <Button onClick={() => setShowAddCourseForm(true)}>Add New Course</Button>
          </div>
          
          {showAddCourseForm ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Add New Course</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddCourse} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                      Course Title
                    </label>
                    <Input
                      id="title"
                      name="title"
                      value={courseFormData.title}
                      onChange={handleCourseChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      rows={4}
                      value={courseFormData.description}
                      onChange={handleCourseChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="duration" className="block text-sm font-medium mb-2">
                      Duration
                    </label>
                    <Input
                      id="duration"
                      name="duration"
                      placeholder="e.g. 4 weeks"
                      value={courseFormData.duration}
                      onChange={handleCourseChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="registration_link" className="block text-sm font-medium mb-2">
                      Registration Link (Optional)
                    </label>
                    <Input
                      id="registration_link"
                      name="registration_link"
                      placeholder="e.g. https://example.com/register"
                      value={courseFormData.registration_link}
                      onChange={handleCourseChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="image_url" className="block text-sm font-medium mb-2">
                      Image URL
                    </label>
                    <Input
                      id="image_url"
                      name="image_url"
                      value={courseFormData.image_url}
                      onChange={handleCourseChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="instructor" className="block text-sm font-medium mb-2">
                      Instructor
                    </label>
                    <Select 
                      onValueChange={handleInstructorSelect}
                      value={courseFormData.instructor_id}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an instructor" />
                      </SelectTrigger>
                      <SelectContent>
                        {instructors.map((instructor) => (
                          <SelectItem key={instructor.id} value={instructor.id}>
                            {instructor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowAddCourseForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Adding..." : "Add Course"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : null}
          
          <div className="space-y-4">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{course.duration}</p>
                      <p className="line-clamp-2">{course.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/courses/${course.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="instructors">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Manage Instructors</h2>
            <Button>Add New Instructor</Button>
          </div>
          
          <div className="space-y-4">
            {instructors.map((instructor) => (
              <Card key={instructor.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{instructor.name}</h3>
                      <p className="line-clamp-2">{instructor.bio}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/experts#${instructor.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 