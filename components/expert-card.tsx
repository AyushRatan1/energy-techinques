import Image from "next/image"
import Link from "next/link"
import { Twitter, Linkedin, Globe } from "lucide-react"

interface ExpertCardProps {
  id: string
  name: string
  bio: string
  image_url: string
}

export function ExpertCard({ id, name, bio, image_url }: ExpertCardProps) {
  return (
    <Link href={`/experts/${id}`} className="block">
      <div className="bg-card rounded-lg border p-6 text-center card-hover group relative overflow-hidden">
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full transform transition-transform duration-300 group-hover:scale-125"></div>
        
        <div className="relative w-32 h-32 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full bg-primary/10 transform scale-90 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          <Image
            src={image_url}
            alt={name}
            fill
            className="rounded-full object-cover transition-all duration-300 group-hover:scale-105 z-10 relative"
          />
        </div>
        
        <h3 className="text-xl font-semibold mb-2 transition-colors group-hover:text-primary">{name}</h3>
        <p className="text-muted-foreground line-clamp-3 mb-4">{bio}</p>
        
        {/* Social icons */}
        <div className="flex items-center justify-center space-x-3 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
            <Twitter className="h-4 w-4" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
            <Linkedin className="h-4 w-4" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
            <Globe className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  )
} 