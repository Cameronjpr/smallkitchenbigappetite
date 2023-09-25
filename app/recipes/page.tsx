import { RecipeSummary } from '@/components/RecipeSummary'
import { Recipe } from '@/lib/types'
import { GraphQLClient } from 'graphql-request'

const hygraph = new GraphQLClient(
  'https://api-eu-west-2.hygraph.com/v2/clmwdmvpt158s01t2fiizhok7/master'
)

async function getRecipes(slug: string) {
  const { recipes } = (await hygraph.request(
    `
    query RecipeQuery {
      recipes {
        id
        title
        slug
        tags
        coverImage {
          url
          altText
        }
      }
    }
  `
  )) as {
    recipes: Recipe[]
  }

  return recipes
}

export default async function Post({ params }: { params: { slug: string } }) {
  const recipes = await getRecipes(params.slug)

  return (
    <article className="flex flex-col gap-8">
      {/* {JSON.stringify(recipes)} */}
      <section className="m-auto w-full flex flex-col gap-4">
        {recipes?.map((recipe) => (
          <RecipeSummary key={recipe.slug} recipe={recipe} />
        ))}
      </section>
    </article>
  )
}
