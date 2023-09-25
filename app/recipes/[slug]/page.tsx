import { RecipePrepBox } from '@/components/RecipePrepBox'
import { Checkbox } from '@/components/ui/checkbox'
import { Recipe } from '@/lib/types'
import { RichText } from '@graphcms/rich-text-react-renderer'
import { GraphQLClient } from 'graphql-request'
import Image from 'next/image'
import Link from 'next/link'

const hygraph = new GraphQLClient(
  'https://api-eu-west-2.hygraph.com/v2/clmwdmvpt158s01t2fiizhok7/master'
)

async function getRecipe(slug: string) {
  const { recipe } = (await hygraph.request(
    `
    query RecipeQuery($slug: String!) {
      recipe(where: { slug: $slug }) {
        id 
        title
        preamble {
          raw
        }
        epilogue {
          raw
        }
        slug
        ingredients
        equipment
        tags
        method {
          description
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
  )) as { recipe: Recipe }

  return recipe
}

export default async function Post({ params }: { params: { slug: string } }) {
  const recipe = await getRecipe(params.slug)

  return (
    <article className="flex flex-col gap-8 m-auto">
      <section className="w-full flex flex-col gap-8">
        <Image
          quality={90}
          className="rounded-lg object-cover h-56 sm:h-72 w-full"
          src={`https://media.graphassets.com/resize=width:${544}/${recipe.coverImage.url
            .split('/')
            .pop()}`}
          width="500"
          height="288"
          sizes="(max-width: 768px) 544px, 320px"
          alt={recipe.coverImage.altText}
        />

        <h1 className="text-center sm:text-left">{recipe.title}</h1>
      </section>
      <section>
        <RichText content={recipe?.preamble?.raw} />
      </section>
      <RecipePrepBox recipe={recipe} />
      <section className="pt-8">
        <h2 className="text-center sm:text-left">Method</h2>
        <ol className="mx-1 py-8 flex flex-col gap-8">
          {recipe?.method?.map(
            ({ description }: { description: string }, i) => (
              <li className="grid grid-cols-12 items-start" key={description}>
                <Checkbox className="col-start-1 col-span-1 rounded-full w-6 h-6 mt-1" />
                <p className="pl-2 m-0 col-start-2 col-span-11">
                  {description}
                </p>
              </li>
            )
          )}
        </ol>
        <RichText content={recipe?.epilogue?.raw} />
      </section>
      <section className="flex flex-col gap-2">
        <h3>Tagged with:</h3>
        <ul className="list-none flex gap-2 m-0 pb-4">
          {recipe.tags?.map((tag: string) => (
            <Link href={`/tags/${tag}`} key={`${recipe.id}-${tag}`}>
              <li className="text-xs m-0 transition-colors text-amber-900 hover:text-amber-800 hover:bg-amber-100 border-[1px] border-amber-700 hover:border-amber-600 rounded-md px-2 py-1 leading-tight">
                {tag}
              </li>
            </Link>
          ))}
        </ul>
      </section>
    </article>
  )
}
