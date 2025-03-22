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
import { getInstructorById } from "@/lib/mock-data"

interface EditInstructorPageProps {
  params: {
    id: string
  }
}

export default function EditInstructorPage({ params }: EditInstructorPageProps) {
  const router = useRouter()
  const instructor = getInstructorById(params.id)

  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)

  // Check if user is authenticated (for demo purposes)
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("adminAuthenticated")
    if (!isAuthenticated) {
      router.push("/admin")
    }
  }, [router])

  // Load instructor data
  useEffect(() => {
    if (instructor) {
      setName(instructor.name)
      setBio(instructor.bio)
      setImageUrl(instructor.image_url)
    } else {
      router.push("/admin/dashboard")
    }
  }, [instructor, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would update this data in your Supabase backend
      console.log({
        id: params.id,
        name,
        bio,
        image_url: imageUrl,
      })

      setLoading(false)
      router.push("/admin/dashboard?tab=instructors")
    }, 1000)
  }

  if (!instructor) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-12">
          <Link href="/admin/dashboard" className="text-blue-400 hover:underline mb-8 inline-block">
            ← Back to Dashboard
          </Link>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Edit Instructor</CardTitle>
              <CardDescription>Update the details for this instructor</CardDescription>
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
                  <Link href="/admin/dashboard">
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

