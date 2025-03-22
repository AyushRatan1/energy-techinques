export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          duration: string
          instructor_id: string
          image_url: string
          registration_link: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          duration: string
          instructor_id: string
          image_url: string
          registration_link: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          duration?: string
          instructor_id?: string
          image_url?: string
          registration_link?: string
        }
      }
      instructors: {
        Row: {
          id: string
          created_at: string
          name: string
          bio: string
          image_url: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          bio: string
          image_url: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          bio?: string
          image_url?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          created_at: string
          name: string
          position: string
          company: string
          content: string
          image_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          position: string
          company: string
          content: string
          image_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          position?: string
          company?: string
          content?: string
          image_url?: string | null
        }
      }
    }
  }
}

