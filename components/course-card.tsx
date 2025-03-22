import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface CourseCardProps {
  id: string
  title: string
  description: string
  duration: string
  instructor_id: string
  image_url: string
}

export function CourseCard({ id, title, description, duration, instructor_id, image_url }: CourseCardProps) {
  return (
    <div className="bg-card rounded-lg border overflow-hidden card-hover">
      <div className="relative h-48">
        <Image
          src={image_url}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{duration}</span>
          <Link href={`/courses/${id}`}>
            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 