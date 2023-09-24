import { PostSummary } from '@/components/PostSummary'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GraphQLClient, gql } from 'graphql-request'

const hygraph = new GraphQLClient(
  'https://api-eu-west-2.hygraph.com/v2/clmwdmvpt158s01t2fiizhok7/master'
)

async function getPosts() {
  const { posts } = (await hygraph.request(QUERY)) as {
    posts: {
      id: string
      title: string
      slug: string
      tags: string[]
      excerpt: string
      coverImage: {
        url: string
        altText: string
      }
    }[]
  }

  return posts
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <section className="flex flex-col gap-8">
      {posts.map((post) => (
        <PostSummary key={post.slug} post={post} />
      ))}
    </section>
  )
}

const QUERY = gql`
  {
    posts(orderBy: date_DESC) {
      id
      title
      slug
      date
      tags
      excerpt
      coverImage {
        url
        altText
      }
    }
  }
`
