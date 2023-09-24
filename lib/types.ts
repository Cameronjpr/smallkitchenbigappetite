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