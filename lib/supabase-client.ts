import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Replace these with your actual Supabase URL and anon key when available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zizzliydshxwdqdbszis.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppenpsaXlkc2h4d2RxZGJzemlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjQ2MjgsImV4cCI6MjA1ODI0MDYyOH0.qNVeg-StzYnp-urP3qJd3Jp2nLXcjmUoWfmHWCXJSYA"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Course functions
export async function getCourses() {
  const { data, error } = await supabase.from("courses").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching courses:", error)
    return []
  }

  return data || []
}

export async function getCourseById(id: string) {
  const { data, error } = await supabase.from("courses").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching course:", error)
    return null
  }

  return data
}

export async function createCourse(
  course: Omit<Database["public"]["Tables"]["courses"]["Insert"], "id" | "created_at">,
) {
  const { data, error } = await supabase.from("courses").insert(course).select().single()

  if (error) {
    console.error("Error creating course:", error)
    return null
  }

  return data
}

export async function updateCourse(
  id: string,
  course: Omit<Database["public"]["Tables"]["courses"]["Update"], "id" | "created_at">,
) {
  const { data, error } = await supabase.from("courses").update(course).eq("id", id).select().single()

  if (error) {
    console.error("Error updating course:", error)
    return null
  }

  return data
}

export async function deleteCourse(id: string) {
  const { error } = await supabase.from("courses").delete().eq("id", id)

  if (error) {
    console.error("Error deleting course:", error)
    return false
  }

  return true
}

// Instructor functions
export async function getInstructors() {
  const { data, error } = await supabase.from("instructors").select("*").order("name")

  if (error) {
    console.error("Error fetching instructors:", error)
    return []
  }

  return data || []
}

export async function getInstructor(id: string) {
  const { data, error } = await supabase.from("instructors").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching instructor:", error)
    return null
  }

  return data
}

export async function getInstructorById(id: string) {
  return getInstructor(id)
}

export async function getCoursesByInstructor(instructorId: string) {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("instructor_id", instructorId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching courses by instructor:", error)
    return []
  }

  return data || []
}

export async function createInstructor(
  instructor: Omit<Database["public"]["Tables"]["instructors"]["Insert"], "id" | "created_at">,
) {
  const { data, error } = await supabase.from("instructors").insert(instructor).select().single()

  if (error) {
    console.error("Error creating instructor:", error)
    return null
  }

  return data
}

export async function updateInstructor(
  id: string,
  instructor: Omit<Database["public"]["Tables"]["instructors"]["Update"], "id" | "created_at">,
) {
  const { data, error } = await supabase.from("instructors").update(instructor).eq("id", id).select().single()

  if (error) {
    console.error("Error updating instructor:", error)
    return null
  }

  return data
}

export async function deleteInstructor(id: string) {
  const { error } = await supabase.from("instructors").delete().eq("id", id)

  if (error) {
    console.error("Error deleting instructor:", error)
    return false
  }

  return true
}

// Testimonial functions
export async function getTestimonials() {
  const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching testimonials:", error)
    return []
  }

  return data || []
}

export async function createTestimonial(testimonial: Omit<any, "id" | "created_at">) {
  const { data, error } = await supabase.from("testimonials").insert(testimonial).select().single()

  if (error) {
    console.error("Error creating testimonial:", error)
    return null
  }

  return data
}

export async function updateTestimonial(id: string, testimonial: Omit<any, "id" | "created_at">) {
  const { data, error } = await supabase.from("testimonials").update(testimonial).eq("id", id).select().single()

  if (error) {
    console.error("Error updating testimonial:", error)
    return null
  }

  return data
}

export async function deleteTestimonial(id: string) {
  const { error } = await supabase.from("testimonials").delete().eq("id", id)

  if (error) {
    console.error("Error deleting testimonial:", error)
    return false
  }

  return true
}

// File upload function
export async function uploadImage(file: File, bucket: string, path: string) {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  })

  if (error) {
    console.error("Error uploading image:", error)
    return null
  }

  // Get public URL
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(data.path)

  return publicUrl
}

