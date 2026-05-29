'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { UtensilsCrossed, Star, ImageIcon, Phone, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '#menu', label: 'Menü', icon: UtensilsCrossed },
  { href: '#reviews', label: 'Bewertungen', icon: Star },
  { href: '#gallery', label: 'Galerie', icon: ImageIcon },
  { href: '#contact', label: 'Kontakt', icon: Phone },
]

export function MobileNav() {
  const [activeSection, setActiveSection] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show mobile nav after hero section
      setIsVisible(window.scrollY > window.innerHeight * 0.5)

      // Update active section based on scroll position
      const sections = ['menu', 'reviews', 'gallery', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Bottom Navigation */}
          <motion.nav
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-border pb-safe lg:hidden"
          >
            <div className="flex items-center justify-around py-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = `#${activeSection}` === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex flex-col items-center gap-1 px-3 py-2 min-w-[64px] rounded-lg transition-all',
                      isActive
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Icon className={cn('h-5 w-5', isActive && 'scale-110')} />
                    <span className="text-xs font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-1 h-1 w-8 bg-primary rounded-full"
                      />
                    )}
                  </Link>
                )
              })}
            </div>
          </motion.nav>

          {/* Sticky Order Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="fixed bottom-20 right-4 z-50 lg:hidden"
          >
            <Link
              href="https://youtaste.com/speisekarte/pizzeria-romantica-haspe"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 transition-all"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="font-semibold">Bestellen</span>
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
