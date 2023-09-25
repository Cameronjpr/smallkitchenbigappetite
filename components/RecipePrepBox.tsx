import { Recipe } from '@/lib/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

export function RecipePrepBox(props: { recipe: Recipe }) {
  const { recipe } = props

  return (
    <Tabs
      defaultValue="ingredients"
      className="w-full border-lime-700 rounded-md bg-amber-50 shadow-lg shadow-stone-300"
    >
      <TabsList className="w-full bg-amber-300 text-lime-900">
        <TabsTrigger
          value="ingredients"
          className="w-1/2 data-[state=active]:bg-amber-50 rounded-md data-[state=active]:text-lime-800 text-md p-1"
        >
          Ingredients
        </TabsTrigger>
        <TabsTrigger
          value="equipment"
          className="w-1/2 data-[state=active]:bg-amber-50 rounded-md data-[state=active]:text-lime-800 text-md p-1"
        >
          Equipment
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ingredients" className="px-4 py-2 text-lime-900">
        <ul className="list-none p-0 m-0">
          {recipe?.ingredients?.split('\n').map((ingredient: string) => (
            <li className="py-1" key={ingredient}>
              {ingredient}
            </li>
          ))}
        </ul>
      </TabsContent>
      <TabsContent value="equipment" className="p-4">
        <ul className="list-none p-0 m-0">
          {recipe?.equipment?.split('\n').map((equipment: string) => (
            <li className="py-1" key={equipment}>
              {equipment}
            </li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  )
}
