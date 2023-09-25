export type Post = {
  id: string
  title: string
  slug: string
  date?: string
  createdAt: string
  excerpt?: string
  content?: {
    json: any
  }
  coverImage: {
    url: string
    altText: string
  }
  tags?: string[]
}

export type Recipe = {
  id: string
  title: string
  preamble?: {
    raw: any
  }
  epilogue?: {
    raw: any
  }
  slug: string
  date?: string
  createdAt: string
  coverImage: {
    url: string
    altText: string
  }
  tags?: string[]
  ingredients?: string
  equipment?: string
  method?: {
    description: string
  }[]
}