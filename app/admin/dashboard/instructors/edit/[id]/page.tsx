"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getInstructor, updateInstructor, deleteInstructor } from "@/lib/supabase-client"
import { Trash2 } from "lucide-react"

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

interface EditInstructorPageProps {
  params: {
    id: string
  }
}

export default function EditInstructorPage({ params }: EditInstructorPageProps) {
  const router = useRouter()
  const [instructor, setInstructor] = useState<any>(null)
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [fetching, setFetching] = useState(true)

  // Check if user is authenticated (for demo purposes)
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("adminAuthenticated")
    if (!isAuthenticated) {
      router.push("/admin")
    }
  }, [router])

  // Load instructor data
  useEffect(() => {
    async function fetchInstructor() {
      try {
        const data = await getInstructor(params.id)
        if (data) {
          setInstructor(data)
          setName(data.name)
          setBio(data.bio || "")
          setImageUrl(data.image_url || "")
        } else {
          router.push("/admin/dashboard")
        }
      } catch (error) {
        console.error("Error fetching instructor:", error)
        alert("Failed to load instructor data")
        router.push("/admin/dashboard")
      } finally {
        setFetching(false)
      }
    }

    fetchInstructor()
  }, [params.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Update instructor in Supabase
      const updated = await updateInstructor(params.id, {
        name,
        bio,
        image_url: imageUrl,
      })

      if (updated) {
        // Revalidate the homepage to reflect changes
        await revalidateRoutes()
        alert("Instructor updated successfully")
        router.push("/admin/dashboard?tab=instructors")
      } else {
        throw new Error("Failed to update instructor")
      }
    } catch (error) {
      console.error("Error updating instructor:", error)
      alert("Failed to update instructor. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this instructor? This action cannot be undone.")) {
      setDeleting(true)

      try {
        // Delete instructor from Supabase
        const success = await deleteInstructor(params.id)
        
        if (success) {
          // Revalidate the homepage to reflect changes
          await revalidateRoutes()
          alert("Instructor deleted successfully")
          router.push("/admin/dashboard?tab=instructors")
        } else {
          throw new Error("Failed to delete instructor")
        }
      } catch (error) {
        console.error("Error deleting instructor:", error)
        alert("Failed to delete instructor. Please try again.")
      } finally {
        setDeleting(false)
      }
    }
  }

  if (fetching) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!instructor) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <Link href="/admin/dashboard?tab=instructors" className="text-blue-400 hover:underline mb-8 inline-block">
            ← Back to Dashboard
          </Link>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-bold">Edit Instructor</CardTitle>
                  <CardDescription>Update the details for this instructor</CardDescription>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  {deleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Instructor Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Instructor Bio</Label>
                  <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={5} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Profile Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="/placeholder.svg"
                  />
                  <p className="text-xs text-muted-foreground">
                    In a real app, this would be an image upload field connected to Supabase Storage
                  </p>
                </div>

                <div className="flex justify-end gap-4">
                  <Link href="/admin/dashboard?tab=instructors">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update Instructor"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

