export interface CommunityRepresentative {
  name: string
  role: string
  email: string
}

export interface Community {
  name: string
  college: string
  description: string
  logo: string
  representatives: CommunityRepresentative[]
  website: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  contributors: {
    name: string
    year?: string
    college?: string
    company?: string
    role?: string
  }[]
  github: string
  link: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  avatar: string
}

export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  registrationLink: string
}
