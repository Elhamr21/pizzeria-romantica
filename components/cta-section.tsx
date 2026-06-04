'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/cta-background.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />
      </div>

      {/* Floating Light Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="inline-block text-accent font-medium uppercase tracking-wider text-sm">
            Jetzt bestellen
          </span>
          <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance">
            Lust auf italienische Küche?
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Bestellen Sie jetzt online und genießen Sie authentische italienische Spezialitäten 
            – direkt zu Ihnen nach Hause oder zum Abholen bereit.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto text-lg px-8 py-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:shadow-primary/40 hover:scale-105"
            >
              <Link href="https://youtaste.com/zuhause?delivery-time=true&delivery-type=DELIVERY" target="_blank" rel="noopener noreferrer">
                Online bestellen
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-lg px-8 py-6 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:text-white transition-all hover:scale-105"
            >
              <a href="tel:023311276622">
                 02331 1276622
              </a>
            </Button>
          </motion.div>

          {/* Delivery Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-6 text-white/70 text-sm"
          >
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
              Kontaktlose Lieferung
            </span>
            <span className="text-white/30">|</span>
            <span>Lieferung in 30-45 Min</span>
            <span className="text-white/30">|</span>
            <span>Mindestbestellwert €15</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
