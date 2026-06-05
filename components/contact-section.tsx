'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'

export function ContactSection() {
  const openingHours = [
    { day: 'Montag - Donnerstag', hours: '11:00 - 15:00, 17:00 - 22:00' },
    {day: 'Freitag', hours: '11:00 - 15:00, 17:00 - 23:00' },
    { day: 'Samstag', hours: '11:30 - 15:00, 17:00 - 23:00' },
    { day: 'Sonntag & Feiertag', hours: '15:00 - 22:00' },
  ]

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium">Kontakt & Anfahrt</span>
          <h2 className="mt-2 font-[var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Besuchen Sie uns
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Wir freuen uns auf Ihren Besuch in unserer Pizzeria
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Contact Cards */}
            <div className="grid gap-4">
              <div className="bg-card p-6 rounded-xl shadow-md flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Adresse</h4>
                  <p className="text-muted-foreground">Voerder Str. 10</p>
                  <p className="text-muted-foreground">58135 Hagen, Germany</p>
                  <a
                    href="https://maps.google.com/?q=Voerder+Str.+10,+58135+Hagen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-sm hover:underline mt-1 inline-block"
                  >
                    Route planen →
                  </a>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-md flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Telefon</h4>
                  <a
                    href="tel:023311276622"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                     02331 1276622
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">Zum Anrufen klicken</p>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-md flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Email</h4>
                  <a
                    href="mailto:bejta1979@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    bejta1979@gmail.com
                  </a>
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl shadow-md flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">Öffnungszeiten</h4>
                  <div className="space-y-1">
                    {openingHours.map((item) => (
                      <div key={item.day} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.day}</span>
                        <span className="text-foreground">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google Maps Embed - Full Height */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="h-full min-h-[400px] lg:min-h-0"
          >
            <div className="rounded-xl overflow-hidden shadow-lg h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.5!2d7.4567!3d51.3567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b931b8b8b8b8b8%3A0x0!2sVoerder%20Str.%2010%2C%2058135%20Hagen!5e0!3m2!1sde!2sde!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pizzeria Romantica Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
