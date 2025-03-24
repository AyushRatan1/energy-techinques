import Image from "next/image"
import { Star, Quote } from "lucide-react"

interface TestimonialCardProps {
  name: string
  position: string
  company: string
  content: string
  imageUrl: string
}

export function TestimonialCard({ name, position, company, content, imageUrl }: TestimonialCardProps) {
  return (
    <div className="bg-card rounded-lg border p-6 card-hover relative">
      {/* Decorative quote icon */}
      <div className="absolute -top-3 -left-3 bg-primary/10 rounded-full p-2">
        <Quote className="h-6 w-6 text-primary" />
      </div>
      
      {/* Star Rating */}
      <div className="flex mb-6 text-yellow-400">
        {Array(5).fill(0).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      
      <p className="text-muted-foreground mb-6 italic relative">
        "{content}"
      </p>
      
      <div className="flex items-center">
        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4 border-2 border-primary/20">
          <Image 
            src={imageUrl || "/placeholder.svg?height=100&width=100"} 
            alt={name} 
            fill 
            className="object-cover" 
          />
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{name}</h4>
          <p className="text-sm text-muted-foreground">
            {position}, {company}
          </p>
        </div>
      </div>
    </div>
  )
}

