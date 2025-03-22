import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ExpertCard } from "@/components/expert-card"
import { getInstructors } from "@/lib/supabase-client"

export const metadata = {
  title: "Our Experts - Energy Techniques",
  description: "Meet our industry-leading experts in energy systems and technologies.",
}

export const revalidate = 3600 // Revalidate every hour

export default async function ExpertsPage() {
  const instructors = await getInstructors()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Experts</h1>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Our instructors are industry leaders with extensive experience in energy systems
            and technologies. Learn from the best to advance your professional career.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {instructors.map((instructor) => (
              <div key={instructor.id}>
                <ExpertCard
                  id={instructor.id}
                  name={instructor.name}
                  bio={instructor.bio}
                  image_url={instructor.image_url}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 