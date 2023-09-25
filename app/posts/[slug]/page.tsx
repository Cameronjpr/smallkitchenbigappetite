import { Post } from '@/lib/types'
import { RichText } from '@graphcms/rich-text-react-renderer'
import { GraphQLClient } from 'graphql-request'
import Image from 'next/image'
import Link from 'next/link'

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
    post: Post
  }

  return post
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPosts(params.slug)

  return (
    <article className="flex flex-col gap-8">
      <section className="m-auto w-full flex flex-col gap-4">
        <Image
          quality={90}
          className="rounded-t-lg object-cover h-56 sm:h-72 w-full"
          src={`https://media.graphassets.com/resize=width:${544}/${post.coverImage.url
            .split('/')
            .pop()}`}
          width="500"
          height="288"
          sizes="(max-width: 768px) 544px, 320px"
          alt={post.coverImage.altText}
        />
        <ul className="list-none flex gap-2 m-0">
          {post?.tags?.map((tag: string) => (
            <li
              className="transition-colors text-amber-900 hover:text-amber-800 hover:bg-amber-100 border-2 border-amber-700 hover:border-amber-600 rounded-md px-2 py-1 leading-tight"
              key={tag}
            >
              <Link href={`/tags/${tag}`}>{tag}</Link>
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
