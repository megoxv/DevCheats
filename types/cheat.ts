export type Language = {
    name: string
    slug: string
    icon: string
    categories: Category[]
}

export type Category = {
    name: string
    slug: string
}

export type CheatSheet = {
    title: string
    description: string
    content: string
    language: string
    category: string
    tags: string[]
}

