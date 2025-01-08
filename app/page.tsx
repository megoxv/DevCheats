import { Sidebar } from "@/components/sidebar"
import { CheatSheetCard } from "@/components/cheat-sheet-card"
import { getAllLanguages, getAllCheatSheets } from "@/lib/mdx"
import Link from "next/link"
import { ArrowRight } from 'lucide-react'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default async function Home() {
  const languages = await getAllLanguages()
  const cheatSheets = await getAllCheatSheets()

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex">
        <Sidebar languages={languages} />
        <div className="flex-1">
          <section className="bg-background py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col items-center space-y-4 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Your Ultimate Programming Resource
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Access comprehensive cheat sheets for various programming languages and frameworks. Boost your productivity and never forget a syntax again.
                </p>
                <Link
                  href={`/${languages[0]?.slug || '#'}`}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
          <section className="py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 mx-auto">
              <h2 className="mb-8 text-3xl font-bold tracking-tighter sm:text-4xl">Featured Cheat Sheets</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cheatSheets.slice(0, 6).map((cheat) => (
                  <CheatSheetCard key={cheat.title} cheat={cheat} />
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

