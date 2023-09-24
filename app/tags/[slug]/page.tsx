import { PostSummary } from '@/components/PostSummary'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Post } from '@/lib/types'
import { GraphQLClient, gql } from 'graphql-request'
import Image from 'next/image'
const hygraph = new GraphQLClient(
  'https://api-eu-west-2.hygraph.com/v2/clmwdmvpt158s01t2fiizhok7/master'
)

async function getPosts(tag: string) {
  const { posts } = (await hygraph.request(
    `
    query BlogPostQuery() {
     posts(where: {tags_contains_some: ${tag}}) {
        id
        title
        slug
        excerpt
        coverImage {
          url
          altText
        }
      }
    }
  `
  )) as {
    posts: {
      id: string
      title: string
      slug: string
      excerpt: string
      coverImage: {
        url: string
        altText: string
      }
    }[]
  }

  return posts
}

export default async function TagPage({
  params,
}: {
  params: { slug: string }
}) {
  const posts = await getPosts(params.slug)

  console.log(posts)
  return (
    <section className="flex flex-col gap-8">
      <h1>
        Posts tagged with <span className="text-green-700">{params.slug}</span>
      </h1>
      {posts.map((post) => (
        <PostSummary key={post.id} post={post} />
      ))}
    </section>
  )
}
