import { Post } from '@/lib/types'
import { Card, CardHeader, CardContent, CardTitle } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'

export function PostSummary(props: { post: Post }) {
  const { post } = props
  return (
    <a href={`/posts/${post.slug}`} key={post.id}>
      <Card>
        <CardHeader>
          <Image
            className="rounded-lg object-cover h-56 sm:h-72"
            src={post.coverImage.url}
            width="500"
            height="288"
            alt={post.coverImage.altText}
          />
        </CardHeader>
        <CardContent>
          <CardTitle>{post.title}</CardTitle>
          <p className="text-stone-700">{post.excerpt}</p>
          <ul className="list-none flex gap-2 m-0">
            {post?.tags?.map((tag: string) => (
              <li
                className="text-green-900 border-2 border-green-700 hover:border-green-600 rounded-md px-2 py-1 leading-tight"
                key={tag}
              >
                <Link href={`/tags/${tag}`}>{tag}</Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </a>
  )
}
