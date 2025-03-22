"use client"

import { Loader2 } from "lucide-react"

export function LoadingSpinner({ size = "medium" }: { size?: "small" | "medium" | "large" }) {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12"
  }

  return (
    <div className="flex justify-center items-center h-full w-full">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="h-64 flex justify-center items-center">
      <LoadingSpinner size="large" />
    </div>
  )
}

export function LoadingSection() {
  return (
    <div className="h-32 flex justify-center items-center">
      <LoadingSpinner />
    </div>
  )
} 