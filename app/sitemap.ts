import { MetadataRoute } from 'next'
import { getAllLanguages, getAllCheatSheets } from "@/lib/mdx"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const languages = await getAllLanguages()
    const cheatSheets = await getAllCheatSheets()

    const baseUrl = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? 'http://localhost:3000'

    const languageUrls = languages.map((language) => ({
        url: `${baseUrl}/${language.slug}`,
        lastModified: new Date(),
    }))

    const categoryUrls = languages.flatMap((language) =>
        language.categories.map((category) => ({
            url: `${baseUrl}/${language.slug}/${category.slug}`,
            lastModified: new Date(),
        }))
    )

    const cheatSheetUrls = cheatSheets.map((cheat) => ({
        url: `${baseUrl}/${cheat.language}/${cheat.category}#${cheat.title.toLowerCase().replace(/ /g, '-')}`,
        lastModified: new Date(),
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        ...languageUrls,
        ...categoryUrls,
        ...cheatSheetUrls,
    ]
}

