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
  createCourse,
  createInstructor,
  updateCourse,
  updateInstructor,
  deleteCourse,
  deleteInstructor
} from "@/lib/supabase-client"
import type { Database } from "@/types/supabase"
import { LoadingPage } from "@/components/ui/loading"

type Course = Database["public"]["Tables"]["courses"]["Row"]
type Instructor = Database["public"]["Tables"]["instructors"]["Row"]
type Testimonial = Database["public"]["Tables"]["testimonials"]["Row"]

export default function AdminPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showAddCourseForm, setShowAddCourseForm] = useState(false)
  const [showEditCourseForm, setShowEditCourseForm] = useState(false)
  const [showAddInstructorForm, setShowAddInstructorForm] = useState(false)
  const [showEditInstructorForm, setShowEditInstructorForm] = useState(false)
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null)
  const [currentInstructor, setCurrentInstructor] = useState<Instructor | null>(null)
  
  const [courseFormData, setCourseFormData] = useState({
    title: "",
    description: "",
    duration: "",
    instructor_id: "",
    image_url: "/placeholder.svg?height=400&width=600",
    registration_link: ""
  })
  
  const [instructorFormData, setInstructorFormData] = useState({
    name: "",
    bio: "",
    image_url: "/placeholder.svg?height=400&width=400"
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
  
  const handleInstructorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setInstructorFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleInstructorSelect = (value: string) => {
    setCourseFormData(prev => ({ ...prev, instructor_id: value }))
  }
  
  // Trigger revalidation of routes after data changes
  const revalidateRoutes = async () => {
    try {
      // Revalidate home page
      await fetch('/api/revalidate?path=/')
      
      // Revalidate courses page
      await fetch('/api/revalidate?path=/courses')
      
      // Revalidate experts page
      await fetch('/api/revalidate?path=/experts')
      
      console.log('Routes revalidated successfully')
    } catch (error) {
      console.error('Failed to revalidate routes:', error)
    }
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
        
        // Trigger revalidation
        await revalidateRoutes()
        
        // Show success message
        alert("Course added successfully!")
        
        // Refresh the page to show updated data
        router.refresh()
      }
    } catch (error) {
      console.error("Error adding course:", error)
      alert("Failed to add course. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleEditCourse = (course: Course) => {
    setCurrentCourse(course)
    setCourseFormData({
      title: course.title,
      description: course.description,
      duration: course.duration,
      instructor_id: course.instructor_id,
      image_url: course.image_url,
      registration_link: course.registration_link || ""
    })
    setShowEditCourseForm(true)
  }
  
  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!currentCourse) return
    
    setIsSubmitting(true)
    
    try {
      const updatedCourse = await updateCourse(currentCourse.id, {
        title: courseFormData.title,
        description: courseFormData.description,
        duration: courseFormData.duration,
        instructor_id: courseFormData.instructor_id,
        image_url: courseFormData.image_url,
        registration_link: courseFormData.registration_link
      })
      
      if (updatedCourse) {
        // Update the course in local state
        setCourses(prev => 
          prev.map(course => 
            course.id === updatedCourse.id ? updatedCourse : course
          )
        )
        
        // Reset form and state
        setIsSubmitting(false)
        setShowEditCourseForm(false)
        setCurrentCourse(null)
        setCourseFormData({
          title: "",
          description: "",
          duration: "",
          instructor_id: "",
          image_url: "/placeholder.svg?height=400&width=600",
          registration_link: ""
        })
        
        // Trigger revalidation
        await revalidateRoutes()
        
        // Show success message
        alert("Course updated successfully!")
        
        // Refresh the page to show updated data
        router.refresh()
      }
    } catch (error) {
      console.error("Error updating course:", error)
      alert("Failed to update course. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteCourse = async () => {
    if (!currentCourse) return
    
    if (window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      setIsSubmitting(true)
      
      try {
        // Delete the course from Supabase
        const success = await deleteCourse(currentCourse.id)
        
        if (success) {
          // Remove the course from the local state
          setCourses(prev => prev.filter(course => course.id !== currentCourse.id))
          
          // Reset form and state
          setIsSubmitting(false)
          setShowEditCourseForm(false)
          setCurrentCourse(null)
          setCourseFormData({
            title: "",
            description: "",
            duration: "",
            instructor_id: "",
            image_url: "/placeholder.svg?height=400&width=600",
            registration_link: ""
          })
          
          // Trigger revalidation
          await revalidateRoutes()
          
          // Show success message
          alert("Course deleted successfully!")
          
          // Refresh the page to show updated data
          router.refresh()
        } else {
          throw new Error("Failed to delete course")
        }
      } catch (error) {
        console.error("Error deleting course:", error)
        alert("Failed to delete course. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }
  
  const handleAddInstructor = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Add the instructor to Supabase
      const newInstructor = await createInstructor({
        name: instructorFormData.name,
        bio: instructorFormData.bio,
        image_url: instructorFormData.image_url
      })
      
      if (newInstructor) {
        // Add the new instructor to the local state
        setInstructors(prev => [newInstructor, ...prev])
        
        // Reset form and state
        setIsSubmitting(false)
        setShowAddInstructorForm(false)
        setInstructorFormData({
          name: "",
          bio: "",
          image_url: "/placeholder.svg?height=400&width=400"
        })
        
        // Trigger revalidation
        await revalidateRoutes()
        
        // Show success message
        alert("Instructor added successfully!")
        
        // Refresh the page to show updated data
        router.refresh()
      }
    } catch (error) {
      console.error("Error adding instructor:", error)
      alert("Failed to add instructor. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const handleEditInstructor = (instructor: Instructor) => {
    setCurrentInstructor(instructor)
    setInstructorFormData({
      name: instructor.name,
      bio: instructor.bio,
      image_url: instructor.image_url
    })
    setShowEditInstructorForm(true)
  }
  
  const handleUpdateInstructor = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!currentInstructor) return
    
    setIsSubmitting(true)
    
    try {
      const updatedInstructor = await updateInstructor(currentInstructor.id, {
        name: instructorFormData.name,
        bio: instructorFormData.bio,
        image_url: instructorFormData.image_url
      })
      
      if (updatedInstructor) {
        // Update the instructor in local state
        setInstructors(prev => 
          prev.map(instructor => 
            instructor.id === updatedInstructor.id ? updatedInstructor : instructor
          )
        )
        
        // Reset form and state
        setIsSubmitting(false)
        setShowEditInstructorForm(false)
        setCurrentInstructor(null)
        setInstructorFormData({
          name: "",
          bio: "",
          image_url: "/placeholder.svg?height=400&width=400"
        })
        
        // Trigger revalidation
        await revalidateRoutes()
        
        // Show success message
        alert("Instructor updated successfully!")
        
        // Refresh the page to show updated data
        router.refresh()
      }
    } catch (error) {
      console.error("Error updating instructor:", error)
      alert("Failed to update instructor. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteInstructor = async () => {
    if (!currentInstructor) return
    
    if (window.confirm("Are you sure you want to delete this instructor? This action cannot be undone.")) {
      setIsSubmitting(true)
      
      try {
        // Delete the instructor from Supabase
        const success = await deleteInstructor(currentInstructor.id)
        
        if (success) {
          // Remove the instructor from the local state
          setInstructors(prev => prev.filter(instructor => instructor.id !== currentInstructor.id))
          
          // Reset form and state
          setIsSubmitting(false)
          setShowEditInstructorForm(false)
          setCurrentInstructor(null)
          setInstructorFormData({
            name: "",
            bio: "",
            image_url: "/placeholder.svg?height=400&width=400"
          })
          
          // Trigger revalidation
          await revalidateRoutes()
          
          // Show success message
          alert("Instructor deleted successfully!")
          
          // Refresh the page to show updated data
          router.refresh()
        } else {
          throw new Error("Failed to delete instructor")
        }
      } catch (error) {
        console.error("Error deleting instructor:", error)
        alert("Failed to delete instructor. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  if (isLoading) {
    return <LoadingPage />
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
                      <Link href={`/experts/${instructor.id}`}>
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
          
          {showEditCourseForm && currentCourse ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Edit Course: {currentCourse.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateCourse} className="space-y-4">
                  <div>
                    <label htmlFor="edit-title" className="block text-sm font-medium mb-2">
                      Course Title
                    </label>
                    <Input
                      id="edit-title"
                      name="title"
                      value={courseFormData.title}
                      onChange={handleCourseChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="edit-description" className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <Textarea
                      id="edit-description"
                      name="description"
                      rows={4}
                      value={courseFormData.description}
                      onChange={handleCourseChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="edit-duration" className="block text-sm font-medium mb-2">
                      Duration
                    </label>
                    <Input
                      id="edit-duration"
                      name="duration"
                      value={courseFormData.duration}
                      onChange={handleCourseChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="edit-registration_link" className="block text-sm font-medium mb-2">
                      Registration Link (Optional)
                    </label>
                    <Input
                      id="edit-registration_link"
                      name="registration_link"
                      value={courseFormData.registration_link}
                      onChange={handleCourseChange}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="edit-image_url" className="block text-sm font-medium mb-2">
                      Image URL
                    </label>
                    <Input
                      id="edit-image_url"
                      name="image_url"
                      value={courseFormData.image_url}
                      onChange={handleCourseChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="edit-instructor" className="block text-sm font-medium mb-2">
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
                  
                  <div className="flex justify-between space-x-2 pt-4">
                    <Button 
                      type="button" 
                      variant="destructive" 
                      onClick={handleDeleteCourse}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Deleting..." : "Delete Course"}
                    </Button>
                    
                    <div className="flex space-x-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setShowEditCourseForm(false)
                          setCurrentCourse(null)
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Course"}
                      </Button>
                    </div>
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
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditCourse(course)}
                      >
                        Edit
                      </Button>
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
            <Button onClick={() => setShowAddInstructorForm(true)}>Add New Instructor</Button>
          </div>
          
          {showAddInstructorForm ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Add New Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddInstructor} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Instructor Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={instructorFormData.name}
                      onChange={handleInstructorChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium mb-2">
                      Bio
                    </label>
                    <Textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={instructorFormData.bio}
                      onChange={handleInstructorChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="image_url" className="block text-sm font-medium mb-2">
                      Profile Image URL
                    </label>
                    <Input
                      id="image_url"
                      name="image_url"
                      value={instructorFormData.image_url}
                      onChange={handleInstructorChange}
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowAddInstructorForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Adding..." : "Add Instructor"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : null}
          
          {showEditInstructorForm && currentInstructor ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Edit Instructor: {currentInstructor.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateInstructor} className="space-y-4">
                  <div>
                    <label htmlFor="edit-name" className="block text-sm font-medium mb-2">
                      Instructor Name
                    </label>
                    <Input
                      id="edit-name"
                      name="name"
                      value={instructorFormData.name}
                      onChange={handleInstructorChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="edit-bio" className="block text-sm font-medium mb-2">
                      Bio
                    </label>
                    <Textarea
                      id="edit-bio"
                      name="bio"
                      rows={4}
                      value={instructorFormData.bio}
                      onChange={handleInstructorChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="edit-image_url" className="block text-sm font-medium mb-2">
                      Profile Image URL
                    </label>
                    <Input
                      id="edit-image_url"
                      name="image_url"
                      value={instructorFormData.image_url}
                      onChange={handleInstructorChange}
                      required
                    />
                  </div>
                  
                  <div className="flex justify-between space-x-2 pt-4">
                    <Button 
                      type="button" 
                      variant="destructive" 
                      onClick={handleDeleteInstructor}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Deleting..." : "Delete Instructor"}
                    </Button>
                    
                    <div className="flex space-x-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          setShowEditInstructorForm(false)
                          setCurrentInstructor(null)
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Updating..." : "Update Instructor"}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : null}
          
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
                      <Link href={`/experts/${instructor.id}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditInstructor(instructor)}
                      >
                        Edit
                      </Button>
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