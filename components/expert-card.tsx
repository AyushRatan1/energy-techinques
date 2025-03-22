import Image from "next/image"
import Link from "next/link"

interface ExpertCardProps {
  id: string
  name: string
  bio: string
  image_url: string
}

export function ExpertCard({ id, name, bio, image_url }: ExpertCardProps) {
  return (
    <Link href={`/experts/${id}`} className="block">
      <div className="bg-card rounded-lg border p-6 text-center card-hover">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={image_url}
            alt={name}
            fill
            className="rounded-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-muted-foreground line-clamp-3">{bio}</p>
      </div>
    </Link>
  )
} 