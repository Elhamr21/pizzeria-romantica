'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/ambient2.png"
                alt="Interior of Pizzeria Romantica with cozy Italian atmosphere"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-xl max-w-[200px]"
            >
              <div className="text-4xl font-bold text-primary font-[var(--font-playfair)]">15+</div>
              <div className="text-sm text-muted-foreground mt-1">Jahre Tradition & Leidenschaft</div>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="text-primary font-medium">Über Uns</span>
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
              Eine Familie, eine Leidenschaft, ein Geschmack
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Seit 2009 bringen wir den authentischen Geschmack Italiens nach Hagen. Was als kleiner 
                Traum einer italienischen Familie begann, ist heute ein beliebter Treffpunkt für alle, 
                die echte italienische Gastfreundschaft erleben möchten.
              </p>
              <p>
                Unsere Pizzen werden nach überlieferten Familienrezepten zubereitet – mit handverlesenem 
                Teig, der 48 Stunden ruht, und nur den frischesten Zutaten. Jeder Bissen erzählt die 
                Geschichte unserer Heimat.
              </p>
              <p>
                Ob Sie unsere berühmten Calzones probieren, die großzügig gefüllt sind, oder unsere 
                hausgemachte Pasta genießen – bei uns erwartet Sie immer eine warme Atmosphäre und 
                herzliche Bedienung.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <div className="text-2xl">🍕</div>
                <h3 className="font-semibold text-foreground">Handgemachte Pizzen</h3>
                <p className="text-sm text-muted-foreground">48h gereifter Teig für perfekte Textur</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">👨‍🍳</div>
                <h3 className="font-semibold text-foreground">Familienrezepte</h3>
                <p className="text-sm text-muted-foreground">Generationenalte italienische Tradition</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">🌿</div>
                <h3 className="font-semibold text-foreground">Frische Zutaten</h3>
                <p className="text-sm text-muted-foreground">Täglich frisch ausgewählt</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl">❤️</div>
                <h3 className="font-semibold text-foreground">Mit Liebe gemacht</h3>
                <p className="text-sm text-muted-foreground">Leidenschaft in jedem Gericht</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
