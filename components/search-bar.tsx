"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/hooks/use-search"
import { SearchResults } from "@/components/search-results"

interface SearchBarProps {
  onSearchFocus?: () => void
}

export function SearchBar({ onSearchFocus }: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const { performSearch, clearSearch, hasQuery } = useSearch()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      performSearch(inputValue.trim())
      setIsFocused(false)
      inputRef.current?.blur()
    }
  }

  const handleClear = () => {
    setInputValue("")
    clearSearch()
    inputRef.current?.focus()
  }

  const handleFocus = () => {
    setIsFocused(true)
    onSearchFocus?.()
  }

  // Global search focus functionality
  useEffect(() => {
    const handleGlobalSearch = (e: KeyboardEvent) => {
      if (e.key === "/" && !isFocused) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleGlobalSearch)
    return () => document.removeEventListener("keydown", handleGlobalSearch)
  }, [isFocused])

  return (
    <div className="relative flex-1 max-w-2xl mx-8">
      <form onSubmit={handleSubmit} className="flex">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            placeholder="Search whitelisted videos..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0 yt-bg-raised pr-8 h-10"
          />
          {inputValue && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6"
              onClick={handleClear}
            >
              <X className="h-3 w-3 yt-text-secondary" />
            </Button>
          )}
        </div>
        <Button
          type="submit"
          className="rounded-l-none yt-bg-menu hover:yt-bg-raised yt-text-secondary border border-l-0 h-10 px-6"
        >
          <Search className="h-5 w-5" />
        </Button>
      </form>

      {isFocused && hasQuery && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1">
          <SearchResults />
        </div>
      )}
    </div>
  )
}
