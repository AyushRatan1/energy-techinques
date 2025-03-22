export const mockInstructors = [
  {
    id: "1",
    name: "Dr. Sarah Reynolds",
    bio: "Dr. Reynolds is a leading expert in energy systems with over 15 years of experience in turbine optimization and power plant efficiency.",
    image_url: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "2",
    name: "Prof. James Chen",
    bio: "Professor Chen specializes in renewable energy integration and has consulted for major energy corporations worldwide on sustainable practices.",
    image_url: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "3",
    name: "Eng. Maria Rodriguez",
    bio: "Engineer Rodriguez brings practical field experience from her 20+ years working with industrial steam systems and energy recovery technologies.",
    image_url: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "4",
    name: "PK Sinha",
    bio: "PK Sinha is a renowned energy expert with over 25 years of experience in power generation, transmission, and distribution systems. He has led major energy infrastructure projects across Asia and Europe.",
    image_url: "/placeholder.svg?height=400&width=400",
  },
]

export const mockCourses = [
  {
    id: "1",
    title: "PowerUp Masterclass Series - Steam Turbine Distress Signals",
    description:
      "Learn to identify and troubleshoot critical steam turbine distress signals. This comprehensive course covers early detection methods, analysis techniques, and preventative maintenance strategies to optimize turbine performance and prevent costly failures.",
    duration: "6 Weeks",
    instructor_id: "1",
    image_url: "/placeholder.svg?height=600&width=800",
    registration_link: "https://lnkd.in/dhseGAEP",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Advanced Energy Efficiency Optimization",
    description:
      "Master the latest techniques in energy efficiency optimization for industrial systems. This course provides hands-on training in energy auditing, system analysis, and implementation of efficiency measures that deliver significant cost savings.",
    duration: "8 Weeks",
    instructor_id: "2",
    image_url: "/placeholder.svg?height=600&width=800",
    registration_link: "https://example.com/register",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Renewable Integration for Power Engineers",
    description:
      "Develop expertise in integrating renewable energy sources into existing power systems. Learn about grid stability, energy storage solutions, and smart grid technologies that enable seamless renewable integration.",
    duration: "10 Weeks",
    instructor_id: "3",
    image_url: "/placeholder.svg?height=600&width=800",
    registration_link: "https://example.com/register",
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Industrial Energy Management Systems",
    description:
      "Comprehensive training on implementing and managing energy management systems in industrial settings. Learn ISO 50001 standards, energy performance indicators, and continuous improvement methodologies.",
    duration: "6 Weeks",
    instructor_id: "2",
    image_url: "/placeholder.svg?height=600&width=800",
    registration_link: "https://example.com/register",
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Power Plant Reliability Engineering",
    description:
      "Enhance your skills in reliability-centered maintenance for power generation facilities. This course covers failure mode analysis, condition monitoring, and predictive maintenance strategies to maximize uptime and asset life.",
    duration: "8 Weeks",
    instructor_id: "1",
    image_url: "/placeholder.svg?height=600&width=800",
    registration_link: "https://example.com/register",
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Energy Storage Technologies",
    description:
      "Explore the rapidly evolving field of energy storage technologies. From batteries to thermal storage, learn about selection criteria, sizing methodologies, and economic analysis for various applications.",
    duration: "7 Weeks",
    instructor_id: "3",
    image_url: "/placeholder.svg?height=600&width=800",
    registration_link: "https://example.com/register",
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Power System Protection and Control",
    description:
      "Master the fundamentals and advanced concepts of power system protection and control. This course covers relay coordination, fault analysis, and modern digital protection systems for reliable power delivery.",
    duration: "9 Weeks",
    instructor_id: "4",
    image_url: "/placeholder.svg?height=600&width=800",
    registration_link: "https://example.com/register",
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    title: "Smart Grid Technologies and Implementation",
    description:
      "Learn about cutting-edge smart grid technologies and their practical implementation. This course covers advanced metering infrastructure, distribution automation, and grid modernization strategies.",
    duration: "8 Weeks",
    instructor_id: "4",
    image_url: "/placeholder.svg?height=600&width=800",
    registration_link: "https://example.com/register",
    created_at: new Date().toISOString(),
  },
]

export function getInstructorById(id: string) {
  return mockInstructors.find((instructor) => instructor.id === id)
}

export function getCourseById(id: string) {
  return mockCourses.find((course) => course.id === id)
}

