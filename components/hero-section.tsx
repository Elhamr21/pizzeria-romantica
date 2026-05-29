'use client'

import { motion } from 'framer-motion'
import { Star, MapPin, Clock, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover scale-105"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        {/* Dark warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-4 py-2 text-white/90"
          >
            <span className="text-sm font-medium">🇮🇹 Authentisch Italienisch seit 2009</span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="font-[var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight text-balance">
            Authentic Italian Pizza
            <br />
            <span className="text-[#D4A017]">in Hagen</span>
          </h1>

          {/* Rating & Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 text-white/90"
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < 5 ? 'fill-[#D4A017] text-[#D4A017]' : 'text-white/30'}`}
                />
              ))}
              <span className="ml-2 font-semibold">4.8</span>
              <span className="text-white/70">· 165 Bewertungen</span>
            </div>
            <span className="hidden sm:inline text-white/50">|</span>
            <span className="font-medium">€10–20</span>
            <span className="hidden sm:inline text-white/50">|</span>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Hagen, Germany</span>
            </div>
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex items-center justify-center gap-2 text-white/80"
          >
            <Clock className="h-4 w-4" />
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Geöffnet · Schließt 15:00 · Öffnet wieder 17:00
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-lg px-8 py-6 shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
            >
              <Link href="#menu">Jetzt bestellen</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-lg px-8 py-6 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:text-white transition-all hover:scale-105"
            >
              <Link href="#contact">Tisch reservieren</Link>
            </Button>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-4 text-white/70 text-sm"
          >
            <span className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
              ✓ Vor Ort essen
            </span>
            <span className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
              ✓ Zum Mitnehmen
            </span>
            <span className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
              ✓ Kontaktlose Lieferung
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/70"
        >
          <span className="text-xs uppercase tracking-widest">Mehr entdecken</span>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
