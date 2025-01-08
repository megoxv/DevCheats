import Link from "next/link";
import { SearchBar } from "./search";
import { ThemeToggle } from "./theme-toggle";
import { Github } from "lucide-react";
import { getAllCheatSheets } from "@/lib/mdx";

export async function Header() {
    const allCheatSheets = await getAllCheatSheets()

    return (
        <header className="border-b sticky top-0 z-40 bg-background">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">DevCheats</span>
                </Link>
                <div className="flex items-center space-x-4">
                    <SearchBar cheatSheets={allCheatSheets} />
                    <ThemeToggle />
                    <Link
                        href="https://github.com/megoxv/DevCheats"
                        className="hidden sm:flex items-center space-x-2 rounded-md bg-primary px-4 py-2 text-primary-foreground"
                    >
                        <Github className="h-5 w-5" />
                        <span>Contribute</span>
                    </Link>
                </div>
            </div>
        </header>
    )
}