import { Post, Recipe } from '@/lib/types'
import { Card, CardHeader, CardContent, CardTitle } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { dongle } from '@/app/fonts'
import clsx from 'clsx'
import { Badge } from './ui/badge'

export async function RecipeSummary(props: { recipe: Recipe }) {
  const { recipe } = props

  return (
    <Card className="transition-colors flex flex-col gap-4 border-stone-400 hover:border-stone-600 bg-amber-100">
      <Link href={`/recipes/${recipe.slug}`}>
        <CardHeader className="p-0 w-full">
          <Image
            quality={90}
            className="rounded-t-lg object-cover h-56 sm:h-72 w-full"
            src={`https://media.graphassets.com/resize=width:${544}/${recipe.coverImage.url
              .split('/')
              .pop()}`}
            width="500"
            height="288"
            sizes="(max-width: 768px) 544px, 320px"
            alt={recipe.coverImage.altText}
          />
        </CardHeader>
      </Link>
      <CardContent>
        <Link href={`/recipes/${recipe.slug}`}>
          <CardTitle
            className={clsx(
              dongle.className,
              'text-5xl font-normal leading-none text-lime-700'
            )}
          >
            {recipe.title}
          </CardTitle>
        </Link>
        <Badge>Recipe</Badge>
        <ul className="list-none flex gap-2 m-0 pt-4">
          {recipe.tags?.map((tag: string) => (
            <Link href={`/tags/${tag}`} key={`${recipe.id}-${tag}`}>
              <li className="text-xs m-0 transition-colors text-amber-900 hover:text-amber-800 hover:bg-amber-100 border-[1px] border-amber-700 hover:border-amber-600 rounded-md px-2 py-1 leading-tight">
                {tag}
              </li>
            </Link>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
