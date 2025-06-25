export interface CollegeRepresentative {
  name: string
  role: string
  email: string
}

export interface College {
  name: string
  college: string
  description: string
  logo: string
  representatives: CollegeRepresentative[]
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
    college: string
    role: string
  }[]
  github: string
  demo: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
  avatar: string
}
