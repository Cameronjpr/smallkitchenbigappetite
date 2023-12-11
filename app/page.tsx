import { PostSummary } from '@/components/PostSummary'
import { Post, Recipe } from '@/lib/types'
import { GraphQLClient, gql } from 'graphql-request'

const hygraph = new GraphQLClient(
  'https://api-eu-west-2.hygraph.com/v2/clmwdmvpt158s01t2fiizhok7/master'
)

async function getEntries() {
  const { posts, recipes } = (await hygraph.request(QUERY)) as {
    posts: Post[]
    recipes: Recipe[]
  }

  const entries = [
    ...posts.map((p) => ({ ...p, type: 'post' })),
    ...recipes.map((r) => ({ ...r, type: 'recipe' })),
  ].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return {
    entries,
  }
}

export default async function Home() {
  const { entries } = await getEntries()

  return (
    <section className="flex flex-col gap-8">
      {entries.map((entry) => (
        <PostSummary key={entry.slug} post={entry} />
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
      createdAt
      tags
      excerpt
      coverImage {
        url
        altText
      }
    }
    recipes {
      id
      title
      slug
      createdAt
      tags
      coverImage {
        url
        altText
      }
    }
  }
`
