"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"

// This is a simplified auth check for demo purposes
// In a real app, you would use a proper auth solution
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  
  // For demo purposes, we'll just use a static password
  // In production, use a proper authentication system
  const ADMIN_PASSWORD = "sinha123"
  
  // Check if user is already authenticated (using localStorage for demo)
  useEffect(() => {
    const auth = localStorage.getItem("isAdminAuthenticated")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem("isAdminAuthenticated", "true")
      setError("")
    } else {
      setError("Invalid password. Please try again.")
    }
  }
  
  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("isAdminAuthenticated")
    router.push("/")
  }
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-md p-8 bg-card border rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
            
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </div>
        </main>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-card border-b py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h2 className="font-semibold">Admin Dashboard</h2>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      
      {children}
    </div>
  )
} 