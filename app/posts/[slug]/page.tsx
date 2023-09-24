import { RichText } from '@graphcms/rich-text-react-renderer'
import { GraphQLClient } from 'graphql-request'
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
        tags
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
      tags: string[]
    }
  }

  return post
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPosts(params.slug)

  return (
    <article className="flex flex-col gap-8">
      <section className="m-auto w-full flex flex-col gap-4">
        <Image
          className="rounded-lg"
          src={post.coverImage.url}
          width="700"
          height="700"
          objectFit="contain"
          alt={post.coverImage.altText}
        />
        <ul className="list-none flex gap-2 w-full m-0">
          {post.tags.map((tag: string) => (
            <li
              className="text-green-900 border-2 border-green-700 hover:border-green-600 rounded-md px-2 py-1 leading-tight"
              key={tag}
            >
              <a href={`/tags/${tag}`}>{tag}</a>
            </li>
          ))}
        </ul>
      </section>
      <h1 className="text-center sm:text-left">{post.title}</h1>
      <main>
        <RichText content={post?.content?.json} />
      </main>
    </article>
  )
}
