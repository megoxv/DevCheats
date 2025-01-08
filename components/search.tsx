"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from 'lucide-react'
import { Button } from "./ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import { CheatSheet } from "@/types/cheat"

interface SearchProps {
  cheatSheets: CheatSheet[]
}

export function SearchBar({ cheatSheets }: SearchProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()


  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-start text-sm text-muted-foreground sm:w-64 lg:w-80"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search cheat sheets...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Cheat Sheets">
            {cheatSheets.map((cheat) => (
              <CommandItem
                key={cheat.title}
                onSelect={() => {
                  setOpen(false)
                  router.push(`/${cheat.language}/${cheat.category}`)
                }}
              >
                {cheat.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

