import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getInstructor, getCoursesByInstructor } from "@/lib/supabase-client"
import type { Database } from "@/types/supabase"

interface ExpertPageProps {
  params: {
    id: string
  }
}

type Course = Database["public"]["Tables"]["courses"]["Row"]

export default async function ExpertPage({ params }: ExpertPageProps) {
  const instructor = await getInstructor(params.id)
  
  if (!instructor) {
    notFound()
  }
  
  const courses = await getCoursesByInstructor(params.id)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
          <div className="aspect-square relative rounded-lg overflow-hidden mb-6">
            <Image
              src={instructor.image_url}
              alt={instructor.name}
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold mb-4">{instructor.name}</h1>
          <div className="flex space-x-4 mb-6">
            <Link href="/experts">
              <Button variant="outline">Back to Experts</Button>
            </Link>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Biography</h2>
          <div className="prose dark:prose-invert max-w-none mb-8">
            {instructor.bio.split('\n').map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          
          {courses.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Courses by {instructor.name}</h2>
              <div className="grid grid-cols-1 gap-6">
                {courses.map((course: Course) => (
                  <Card key={course.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4 aspect-video relative rounded overflow-hidden">
                          <Image
                            src={course.image_url}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="md:w-3/4">
                          <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{course.duration}</p>
                          <p className="line-clamp-3 mb-4">{course.description}</p>
                          <Link href={`/courses/${course.id}`}>
                            <Button>View Course</Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
} 