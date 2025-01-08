"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheatSheet } from "@/types/cheat"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Copy, Check } from 'lucide-react'
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CheatSheetCardProps {
  cheat: CheatSheet
}

export function CheatSheetCard({ cheat }: CheatSheetCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const components = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    code({ className, inline, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <div className="relative">
          <SyntaxHighlighter
            {...props}
            style={atomDark}
            language={match[1]}
            PreTag="div"
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
          <CopyButton content={String(children)} />
        </div>
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      )
    }
  }

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="rounded-lg border bg-card p-6 shadow-sm h-full flex flex-col">
          <h3 className="text-xl font-semibold mb-2">{cheat.title}</h3>
          <p className="text-sm text-muted-foreground flex-grow">{cheat.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary">{cheat.language}</Badge>
            {cheat.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{cheat.title}</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown components={components}>
              {cheat.content}
            </ReactMarkdown>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function CopyButton({ content }: { content: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className="absolute right-2 top-2"
      onClick={copyToClipboard}
    >
      {isCopied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  )
}