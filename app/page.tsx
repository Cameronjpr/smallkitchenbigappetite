import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { GraphQLClient, gql } from 'graphql-request'
import Image from 'next/image'
const hygraph = new GraphQLClient(
  'https://api-eu-west-2.hygraph.com/v2/clmwdmvpt158s01t2fiizhok7/master'
)

async function getPosts() {
  const { posts } = await hygraph.request(QUERY)

  return posts
}

export default async function Home() {
  const posts = await getPosts()

  console.log(posts)
  return (
    <section className="flex flex-col gap-8">
      {posts.map((post) => (
        <a href={`/posts/${post.slug}`} key={post.id}>
          <Card>
            <CardHeader>
              <Image
                src={post.coverImage.url}
                width="500"
                height="500"
                objectFit="contain"
                alt={post.coverImage.altText}
              />
            </CardHeader>
            <CardContent>
              <h2 className="text-2xl">{post.title}</h2>
            </CardContent>
          </Card>
        </a>
      ))}
    </section>
  )
}

const QUERY = gql`
  {
    posts {
      id
      title
      slug
      coverImage {
        url
        altText
      }
    }
  }
`
