"use client"

import { Language } from "@/types/cheat"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { ChevronDown, ChevronRight, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"

interface SidebarProps {
    languages: Language[]
    currentLanguage?: string
    currentCategory?: string
}

export function Sidebar({
    languages,
    currentLanguage,
    currentCategory,
}: SidebarProps) {
    const [expandedLanguages, setExpandedLanguages] = useState<string[]>([currentLanguage || ''])

    const toggleLanguage = (slug: string) => {
        setExpandedLanguages(prev =>
            prev.includes(slug)
                ? prev.filter(lang => lang !== slug)
                : [...prev, slug]
        )
    }

    const SidebarContent = () => (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64 space-y-6 py-4"
        >
            <div>
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Languages & Frameworks
                </h2>
                <div className="space-y-1">
                    {languages.map((language) => (
                        <div key={language.slug}>
                            <button
                                onClick={() => toggleLanguage(language.slug)}
                                className={`flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${currentLanguage === language.slug
                                        ? "bg-accent text-accent-foreground"
                                        : ""
                                    }`}
                            >
                                <span>{language.name}</span>
                                {expandedLanguages.includes(language.slug) ? (
                                    <ChevronDown className="h-4 w-4" />
                                ) : (
                                    <ChevronRight className="h-4 w-4" />
                                )}
                            </button>
                            {expandedLanguages.includes(language.slug) && (
                                <div className="ml-4 mt-1 space-y-1">
                                    {language.categories.map((category) => (
                                        <Link
                                            key={`${language.slug}-${category.slug}`}
                                            href={`/${language.slug}/${category.slug}`}
                                            className={`block rounded-lg px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${currentLanguage === language.slug &&
                                                    currentCategory === category.slug
                                                    ? "bg-accent text-accent-foreground"
                                                    : ""
                                                }`}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )

    return (
        <>
            <div className="hidden md:block">
                <SidebarContent />
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button className="md:hidden fixed bottom-4 right-4 z-90 bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <SidebarContent />
                </SheetContent>
            </Sheet>
        </>
    )
}

