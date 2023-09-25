export type Post = {
  id: string
  title: string
  slug: string
  date?: string
  excerpt?: string
  coverImage: {
    url: string
    altText: string
  }
  tags?: string[]
}

export type Recipe = {
  id: string
  title: string
  preamble?: string
  slug: string
  date?: string
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