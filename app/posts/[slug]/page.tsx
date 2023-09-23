import { RichText } from '@graphcms/rich-text-react-renderer'
import { GraphQLClient, gql } from 'graphql-request'
import Image from 'next/image'

const hygraph = new GraphQLClient(
  'https://api-eu-west-2.hygraph.com/v2/clmwdmvpt158s01t2fiizhok7/master'
)

async function getPosts(slug: string) {
  const { post } = (await hygraph.request(
    `
    query BlogPostQuery($slug: String!) {
      post(where: { slug: $slug }) {
        title
        content {
          json
        }
        coverImage {
          url
          altText
        }
      }
    }
  `,
    {
      slug,
    }
  )) as {
    post: {
      title: string
      content: { json: any }
      coverImage: {
        url: string
        altText: string
      }
    }
  }

  return post
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPosts(params.slug)

  return (
    <article className="flex flex-col gap-8">
      <section className="m-auto w-full flex items-center justify-center">
        <Image
          className="rounded-lg"
          src={post.coverImage.url}
          width="500"
          height="500"
          objectFit="contain"
          alt={post.coverImage.altText}
        />
      </section>
      <h1 className="text-center sm:text-left">{post.title}</h1>
      <main>
        <RichText content={post?.content?.json} />
      </main>
    </article>
  )
}
