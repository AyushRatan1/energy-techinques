import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock, Users, ArrowRight } from "lucide-react"

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
    <div className="bg-card rounded-lg border overflow-hidden card-hover group">
      {/* Image container with overlay effect */}
      <div className="relative h-52">
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full z-20">
          Featured
        </div>
        <Image
          src={image_url}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground mb-6 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            <span>24 students</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-muted-foreground">Enrolling Now</span>
          </div>
          <Link href={`/courses/${id}`}>
            <Button 
              variant="outline" 
              size="sm" 
              className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 px-4"
            >
              <span>Details</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 