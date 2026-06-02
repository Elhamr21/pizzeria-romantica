'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Flame, Leaf, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MenuBookButton } from './menu-book'

type MenuCategory = 'pizza' | 'salads' | 'calzone' | 'pasta' | 'desserts' | 'drinks'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: MenuCategory
  badges?: ('popular' | 'vegetarian' | 'spicy')[]
}

const categories: { id: MenuCategory; label: string; icon: string }[] = [
  { id: 'pizza', label: 'Pizza', icon: '🍕' },
  { id: 'salads', label: 'Salate', icon: '🥗' },
  { id: 'calzone', label: 'Calzone', icon: '🧀' },
  { id: 'pasta', label: 'Pasta', icon: '🍝' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
  { id: 'drinks', label: 'Getränke', icon: '🍷' },
]

const menuItems: MenuItem[] = [
  // Pizza
  { id: '1', name: 'Margherita', description: 'Tomatensauce, Mozzarella, frisches Basilikum', price: 10.40, image: '/images/menu/margherita.jpg', category: 'pizza', badges: ['popular', 'vegetarian'] },
  { id: '2', name: 'Diavola', description: 'Tomatensauce, Mozzarella, scharfe Salami, Peperoni', price: 13.90, image: '/images/menu/diavola.jpg', category: 'pizza', badges: ['spicy'] },
  { id: '3', name: 'Quattro Formaggi', description: 'Mozzarella, Gorgonzola, Parmesan, Ricotta', price: 13.90, image: '/images/menu/quattro-formaggi.jpg', category: 'pizza', badges: ['vegetarian'] },
  { id: '4', name: 'Funghi', description: 'Tomatensauce, Mozzarella, Schinken, Champignons', price: 11.90, image: '/images/menu/prosciutto-funghi.jpg', category: 'pizza', badges: ['popular'] },
  { id: '5', name: 'Tonno', description: 'Tomatensauce, Mozzarella, Thunfisch, Zwiebeln', price: 13.60, image: '/images/menu/tonno.jpg', category: 'pizza' },
  { id: '6', name: 'Vegetariana', description: 'Tomatensauce, Mozzarella, frisches Gemüse der Saison', price: 13.90, image: '/images/menu/vegetariana.jpg', category: 'pizza', badges: ['vegetarian'] },
  // Salads
  { id: '7', name: 'Insalata Mista', description: 'Gemischter Salat mit Tomaten, Gurken, Oliven', price: 8.90, image: '/images/menu/insalata-mista.jpg', category: 'salads', badges: ['vegetarian'] },
  { id: '8', name: 'Insalata Caprese', description: 'Tomaten, Mozzarella, frisches Basilikum, Olivenöl', price: 9.90, image: '/images/menu/caprese.jpg', category: 'salads', badges: ['popular', 'vegetarian'] },
  { id: '9', name: 'Caesar Pecoraio', description: ' Blattsalat, Tomaten, Gurken, Schafskäse', price: 9.90, image: '/images/menu/caesar.jpg', category: 'salads' },
  // Calzone
  { id: '10', name: 'Calzone Classico', description: 'Gefüllt mit Schinken, Mozzarella, Champignons, Tomatensauce', price: 13.50, image: '/images/menu/calzone-classico.jpg', category: 'calzone', badges: ['popular'] },
  { id: '11', name: 'Calzone Vegetariano', description: 'Gefüllt mit Spinat, Ricotta, Mozzarella, Knoblauch', price: 12.50, image: '/images/menu/calzone-vegetariano.jpg', category: 'calzone', badges: ['vegetarian'] },
  { id: '12', name: 'Calzone Piccante', description: 'Gefüllt mit scharfer Salami, Peperoni, Mozzarella', price: 14.00, image: '/images/menu/calzone-piccante.jpg', category: 'calzone', badges: ['spicy'] },
  // Pasta
  { id: '13', name: 'Spaghetti Bolognese', description: 'Klassische Fleischsauce nach Hausrezept', price: 9.90, image: '/images/menu/bolognese.jpg', category: 'pasta', badges: ['popular'] },
  { id: '14', name: 'Penne Arrabiata', description: 'Scharfe Tomatensauce mit Knoblauch und Peperoni', price: 10.90, image: '/images/menu/arrabiata.jpg', category: 'pasta', badges: ['spicy', 'vegetarian'] },
  { id: '15', name: 'Lasagne', description: 'Hausgemachte Lasagne mit Béchamelsauce', price: 10.60, image: '/images/menu/lasagne.jpg', category: 'pasta', badges: ['popular'] },
  { id: '16', name: 'Tagliatelle Al Pesto', description: 'Basilikum, Parmesan, Knoblauch in Sahnesauce', price: 11.40, image: '/images/menu/carbonara.jpg', category: 'pasta' },
  // Desserts
  { id: '17', name: 'Tiramisu', description: 'Klassisches italienisches Tiramisu', price: 5.90, image: '/images/menu/tiramisu.jpg', category: 'desserts', badges: ['popular'] },
  { id: '18', name: 'Panna Cotta', description: 'Mit Beerensoße und frischen Früchten', price: 5.90, image: '/images/menu/panna-cotta.jpg', category: 'desserts', badges: ['vegetarian'] },
    // Drinks
  { id: '20', name: 'Hauswein Rot', description: 'Italienischer Rotwein, 0.25l', price: 5.20, image: '/images/menu/red-wine.jpg', category: 'drinks' },
  { id: '21', name: 'Hauswein Weiß', description: 'Italienischer Weißwein, 0.25l', price: 5.20, image: '/images/menu/white-wine.jpg', category: 'drinks' },
  { id: '22', name: 'Aperol Spritz', description: 'Aperol, Prosecco, Soda', price: 6.90, image: '/images/menu/aperol.jpg', category: 'drinks', badges: ['popular'] },
  { id: '23', name: 'Espresso', description: 'Italienischer Espresso', price: 2.40, image: '/images/menu/espresso.jpg', category: 'drinks' },
]

function BadgeIcon({ type }: { type: 'popular' | 'vegetarian' | 'spicy' }) {
  switch (type) {
    case 'popular':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent">
          <Star className="h-3 w-3 fill-current" /> Beliebt
        </span>
      )
    case 'vegetarian':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary/20 px-2 py-0.5 text-xs font-medium text-secondary">
          <Leaf className="h-3 w-3" /> Vegetarisch
        </span>
      )
    case 'spicy':
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
          <Flame className="h-3 w-3" /> Scharf
        </span>
      )
  }
}

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-xl bg-card shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        {/* Badges */}
        {item.badges && item.badges.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.badges.map((badge) => (
              <BadgeIcon key={badge} type={badge} />
            ))}
          </div>
        )}

        {/* Name & Price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground">{item.name}</h3>
          <span className="font-bold text-primary whitespace-nowrap">
            €{item.price.toFixed(2)}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('pizza')
  const tabsRef = useRef<HTMLDivElement>(null)
  const [isSticky, setIsSticky] = useState(false)

  const filteredItems = menuItems.filter((item) => item.category === activeCategory)

  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect()
        setIsSticky(rect.top <= 80)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium">Unsere Speisekarte</span>
          <h2 className="mt-2 font-[var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Authentische italienische Küche
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Entdecken Sie unsere handgemachten Pizzen, frischen Salate und klassischen Pasta-Gerichte – 
            alle zubereitet mit den besten Zutaten nach traditionellen Familienrezepten.
          </p>
          
          {/* Full Menu Book Button */}
          <div className="mt-8">
            <MenuBookButton />
          </div>
        </motion.div>

        {/* Category Tabs */}
        <div
          ref={tabsRef}
          className={cn(
            'sticky top-20 z-30 py-4 transition-all duration-300',
            isSticky ? 'bg-background/95 backdrop-blur-md shadow-sm' : ''
          )}
        >
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200',
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
                aria-label={`Show ${category.label} menu items`}
              >
                <span>{category.icon}</span>
                <span className="font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
