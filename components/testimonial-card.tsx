import Image from "next/image"

interface TestimonialCardProps {
  name: string
  position: string
  company: string
  content: string
  imageUrl: string
}

export function TestimonialCard({ name, position, company, content, imageUrl }: TestimonialCardProps) {
  return (
    <div className="bg-card/50 border border-border rounded-lg p-6 card-hover">
      <div className="flex items-center mb-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
          <Image 
            src={imageUrl || "/placeholder.svg?height=100&width=100"} 
            alt={name} 
            fill 
            className="object-cover transition-transform duration-300 hover:scale-105" 
          />
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">
            {position}, {company}
          </p>
        </div>
      </div>
      <p className="text-muted-foreground italic">"{content}"</p>
    </div>
  )
}

