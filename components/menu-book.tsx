'use client'

import { BookOpen } from 'lucide-react'
import Link from 'next/link'

// Button component to open the menu book page
export function MenuBookButton() {
  return (
    <Link
      href="/speisekarte"
      className="group relative inline-flex items-center overflow-hidden bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      <BookOpen className="w-5 h-5 mr-2" />
      Komplette Speisekarte
    </Link>
  )
}
