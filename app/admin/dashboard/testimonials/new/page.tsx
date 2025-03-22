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

export default function NewTestimonialPage() {
  const [name, setName] = useState("")
  const [position, setPosition] = useState("")
  const [company, setCompany] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("/placeholder.svg?height=100&width=100")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Check if user is authenticated (for demo purposes)
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("adminAuthenticated")
    if (!isAuthenticated) {
      router.push("/admin")
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would send this data to your Supabase backend
      console.log({
        name,
        position,
        company,
        content,
        image_url: imageUrl,
      })

      setLoading(false)
      router.push("/admin/dashboard?tab=testimonials")
    }, 1000)
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
              <CardTitle className="text-2xl font-bold">Add New Testimonial</CardTitle>
              <CardDescription>Create a new testimonial to be displayed on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input id="position" value={position} onChange={(e) => setPosition(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Testimonial Content</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                    required
                  />
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
                    {loading ? "Creating..." : "Create Testimonial"}
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

