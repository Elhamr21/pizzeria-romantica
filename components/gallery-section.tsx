'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type GalleryCategory = 'all' | 'food' | 'pizza' | 'interior' | 'drinks'

interface GalleryImage {
  id: string
  src: string
  alt: string
  category: GalleryCategory
}

const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'Alle' },
  { id: 'food', label: 'Gerichte' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'interior', label: 'Restaurant' },
  { id: 'drinks', label: 'Getränke' },
]

const galleryImages: GalleryImage[] = [
  { id: '1', src: '/images/food.png', alt: 'Frisch gebackene Margherita Pizza', category: 'pizza' },
  { id: '2', src: '/images/ambient1.png', alt: 'Gemütlicher Innenbereich des Restaurants', category: 'interior' },
  { id: '3', src: '/images/food1.png', alt: 'Hausgemachte Spaghetti Bolognese', category: 'food' },
  { id: '4', src: '/images/food2.png', alt: 'Pizza Diavola mit scharfer Salami', category: 'pizza' },
  { id: '5', src: '/images/gallery/drinks-1.jpg', alt: 'Aperol Spritz Cocktail', category: 'drinks' },
  { id: '6', src: '/images/ambient2.png', alt: 'Romantische Tischdekoration', category: 'interior' },
  { id: '7', src: '/images/gallery/calzone-1.jpg', alt: 'Knusprige Calzone', category: 'food' },
  { id: '8', src: '/images/food3.png', alt: 'Quattro Formaggi Pizza', category: 'pizza' },
  { id: '9', src: '/images/gallery/drinks-2.jpg', alt: 'Italienischer Rotwein', category: 'drinks' },
  { id: '10', src: '/images/food4.png', alt: 'Klassisches Tiramisu', category: 'food' },
  { id: '11', src: '/images/ambient3.png', alt: 'Stimmungsvolle Beleuchtung am Abend', category: 'interior' },
  { id: '12', src: '/images/food5.png', alt: 'Pizza mit frischem Rucola', category: 'pizza' },
]

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all')
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory)

  const openLightbox = (index: number) => setSelectedImageIndex(index)
  const closeLightbox = () => setSelectedImageIndex(null)

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? filteredImages.length - 1 : selectedImageIndex - 1
      )
    }
  }

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === filteredImages.length - 1 ? 0 : selectedImageIndex + 1
      )
    }
  }

  return (
    <section id="gallery" className="py-20 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium">Galerie</span>
          <h2 className="mt-2 font-[var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Einblicke in unsere Welt
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Entdecken Sie die Atmosphäre und Köstlichkeiten der Pizzeria Romantica
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {galleryCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-card text-muted-foreground hover:bg-card/80'
              )}
              aria-label={`Filter gallery by ${category.label}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">
                    Ansehen
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Image */}
            <motion.div
              key={selectedImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl max-h-[80vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[selectedImageIndex].src}
                alt={filteredImages[selectedImageIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-4 text-white text-sm">
              {selectedImageIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
