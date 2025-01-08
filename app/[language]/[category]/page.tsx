import { Sidebar } from "@/components/sidebar"
import { CheatSheetCard } from "@/components/cheat-sheet-card"
import { getAllLanguages, getAllCheatSheets } from "@/lib/mdx"
import { notFound } from "next/navigation"
import { Layout } from "@/components/layout"

type Params = Promise<{
  language: string
  category: string
}>

export default async function CategoryPage(props: { params: Params }) {
  const params = await props.params;

  const languages = await getAllLanguages()
  const allCheatSheets = await getAllCheatSheets()

  const language = languages.find(lang => lang.slug === params.language)
  if (!language) {
    notFound()
  }

  const category = language.categories.find(cat => cat.slug === params.category)
  if (!category) {
    notFound()
  }

  const cheatSheets = allCheatSheets.filter(
    (cheat) => cheat.language === params.language && cheat.category === params.category
  )

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar
          languages={languages}
          currentLanguage={params.language}
          currentCategory={params.category}
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6">{language.name} - {category.name} Cheat Sheets</h1>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cheatSheets.map((cheat) => (
              <CheatSheetCard key={cheat.title} cheat={cheat} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}