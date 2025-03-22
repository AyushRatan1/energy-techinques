import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"

export const metadata = {
  title: "About Us - Energy Techniques",
  description: "Learn about our mission to provide professional energy systems training.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Energy Techniques</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 my-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                Energy Techniques was founded with a clear mission: to bridge the knowledge gap in energy systems 
                by providing professional-grade training that combines theoretical foundations with practical applications.
              </p>
              <p className="text-muted-foreground mb-4">
                We believe that proper training and education are essential for advancing the energy sector and 
                tackling the complex challenges of modern energy systems. Our courses are designed to empower 
                professionals with the knowledge and skills they need to excel in their careers.
              </p>
              <p className="text-muted-foreground">
                Through our platform, we aim to build a community of energy professionals who can share knowledge, 
                collaborate on projects, and drive innovation in the industry.
              </p>
            </div>
            
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Energy Techniques team"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          <div className="my-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  We are committed to excellence in everything we do, from the quality of our course materials 
                  to the expertise of our instructors and the support we provide to our students.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We stay at the forefront of energy technologies and teaching methodologies, 
                  constantly innovating to provide the most relevant and effective training.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-medium mb-3">Sustainability</h3>
                <p className="text-muted-foreground">
                  We are dedicated to promoting sustainable energy practices through our courses 
                  and contributing to a more sustainable future for our planet.
                </p>
              </div>
            </div>
          </div>
          
          <div className="my-16">
            <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Energy Techniques was established in 2018 by a group of energy industry veterans who recognized 
              the need for specialized, high-quality training in energy systems and technologies. 
            </p>
            <p className="text-muted-foreground mb-4">
              What began as a small initiative offering workshops and seminars has grown into a comprehensive 
              online platform serving professionals across the globe. Our team has expanded to include experts 
              from various energy disciplines, all sharing a passion for education and advancement in the field.
            </p>
            <p className="text-muted-foreground">
              Today, we continue to grow our course offerings and expert network, guided by feedback from our 
              community and developments in the energy sector. We remain committed to our founding principles 
              of excellence, innovation, and sustainability.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
} 