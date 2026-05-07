export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contact_leads: {
        Row: {
          id: string
          name: string
          email: string
          destination: string | null
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          destination?: string | null
          message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          destination?: string | null
          message?: string | null
          created_at?: string
        }
      }
      quiz_leads: {
        Row: {
          id: string
          name: string
          email: string
          whatsapp: string | null
          destination: string | null
          traveler_type: string | null
          pace: string | null
          vibes: string[] | null
          accommodation: string | null
          timeline: string | null
          special_request: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          whatsapp?: string | null
          destination?: string | null
          traveler_type?: string | null
          pace?: string | null
          vibes?: string[] | null
          accommodation?: string | null
          timeline?: string | null
          special_request?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          whatsapp?: string | null
          destination?: string | null
          traveler_type?: string | null
          pace?: string | null
          vibes?: string[] | null
          accommodation?: string | null
          timeline?: string | null
          special_request?: string | null
          status?: string
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string | null
          cover_image: string | null
          category: string | null
          published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content?: string | null
          cover_image?: string | null
          category?: string | null
          published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string | null
          cover_image?: string | null
          category?: string | null
          published?: boolean
          created_at?: string
        }
      }
    }
  }
}
