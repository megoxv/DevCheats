import { Category, Language, CheatSheet } from "@/types/cheat"
import fs from "fs/promises"
import path from "path"
import matter from "gray-matter"

const contentDir = path.join(process.cwd(), 'content')

export async function getAllCheatSheets(): Promise<CheatSheet[]> {
  const cheatSheets: CheatSheet[] = []
  const languages = await getAllLanguages()

  for (const language of languages) {
    for (const category of language.categories) {
      const categoryPath = path.join(contentDir, language.slug, category.slug)
      const files = await fs.readdir(categoryPath)

      for (const file of files) {
        if (path.extname(file) === '.mdx') {
          const filePath = path.join(categoryPath, file)
          const content = await fs.readFile(filePath, 'utf-8')
          const { data, content: mdxContent } = matter(content)

          cheatSheets.push({
            title: data.title,
            description: data.description,
            content: mdxContent,
            language: language.slug,
            category: category.slug,
            tags: data.tags || []
          })
        }
      }
    }
  }

  return cheatSheets
}

export async function getAllLanguages(): Promise<Language[]> {
  const languages: Language[] = []
  const entries = await fs.readdir(contentDir, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const languagePath = path.join(contentDir, entry.name)
      const categories = await getCategoriesForLanguage(languagePath)
      
      languages.push({
        name: entry.name.charAt(0).toUpperCase() + entry.name.slice(1),
        slug: entry.name,
        icon: entry.name, // You may want to map this to actual icon names
        categories: categories
      })
    }
  }

  return languages
}

async function getCategoriesForLanguage(languagePath: string): Promise<Category[]> {
  const categories: Category[] = []
  const entries = await fs.readdir(languagePath, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.isDirectory()) {
      categories.push({
        name: entry.name.charAt(0).toUpperCase() + entry.name.slice(1).replace(/-/g, ' '),
        slug: entry.name
      })
    }
  }

  return categories
}

export async function getAllCategories(): Promise<Category[]> {
  const categories = new Set<string>()
  const languages = await getAllLanguages()

  for (const language of languages) {
    for (const category of language.categories) {
      categories.add(category.slug)
    }
  }

  return Array.from(categories).map(category => ({
    name: category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' '),
    slug: category
  }))
}

