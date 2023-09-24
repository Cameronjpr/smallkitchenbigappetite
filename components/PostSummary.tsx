import { Post } from '@/lib/types'
import { Card, CardHeader, CardContent, CardTitle } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { dongle } from '@/app/fonts'
import clsx from 'clsx'

export async function PostSummary(props: { post: Post }) {
  const { post } = props

  return (
    <Card className="transition-colors flex flex-col gap-4 bg-amber-50 border-stone-400 hover:border-stone-600 hover:bg-amber-100">
      <Link href={`/posts/${post.slug}`}>
        <CardHeader className="p-0 w-full">
          <Image
            className="rounded-t-lg object-cover h-56 sm:h-72 w-full"
            src={`https://media.graphassets.com/resize=width:${544}/${post.coverImage.url
              .split('/')
              .pop()}`}
            width="500"
            height="288"
            sizes="(max-width: 768px) 544px, 320px"
            alt={post.coverImage.altText}
          />
        </CardHeader>
      </Link>
      <CardContent>
        <Link href={`/posts/${post.slug}`}>
          <CardTitle
            className={clsx(
              dongle.className,
              'text-5xl font-normal leading-none text-lime-700'
            )}
          >
            {post.title}
          </CardTitle>
        </Link>
        <p className="text-stone-700">{post.excerpt}</p>
        <ul className="list-none flex gap-2 m-0">
          {post.tags?.map((tag: string) => {
            console.log(tag)

            return (
              <li
                key={`${post.id}-${tag}`}
                className="text-xs m-0 transition-colors text-amber-900 hover:text-amber-800 hover:bg-amber-100 border-[1px] border-amber-700 hover:border-amber-600 rounded-md px-2 py-1 leading-tight"
              >
                <Link href={`/tags/${tag}`}>
                  <span>{tag}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}
