'use client'

import Link from 'next/link'
import { MapPin, Phone, Clock, Facebook, Instagram, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-[var(--font-playfair)] text-2xl font-bold text-primary">
                Pizzeria Romantica
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Authentische italienische Küche in Hagen seit 2009. 
              Familienrezepte, frische Zutaten, herzliche Gastfreundschaft.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/p/Pizzeria-Romantica-Haspe-100047161285897/"
                className="p-2 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              {/* <a
                href="#"
                className="p-2 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@pizza-romantica-hagen.de"
                className="p-2 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Schnelllinks</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#menu" className="text-muted-foreground hover:text-primary transition-colors">
                  Speisekarte
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="#reviews" className="text-muted-foreground hover:text-primary transition-colors">
                  Bewertungen
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="text-muted-foreground hover:text-primary transition-colors">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Kontakt</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Voerder Str. 10<br />58135 Hagen, Germany</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:023311276622" className="hover:text-primary transition-colors">
                   02331 1276622
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Öffnungszeiten</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Mo - Donn</p>
                  <p>11:00 - 15:00, 17:00 - 22:00</p>
                </div>
              </li>
                <li className="flex items-start gap-2 text-muted-foreground pl-7">
                <div>
                  <p className="font-medium text-foreground">Freitag</p>
                  <p>11:00 - 15:00, 17:00 - 23:00</p>
                </div>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground pl-7">
                <div>
                  <p className="font-medium text-foreground">Samstag</p>
                  <p>11:30 - 15:00, 17:00 - 23:00</p>
                </div>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground pl-7">
                <div>
                  <p className="font-medium text-foreground">Sonntag</p>
                  <p>15:00 - 22:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Pizzeria Romantica. Alle Rechte vorbehalten.
          </p>
          
          {/* Developed By - Center */}
          <p className="text-sm text-muted-foreground">
            Developed by{' '}
            <a 
              href="https://clearline-ai.tech/en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              ClearLine Tech
            </a>
          </p>
          
          {/* Legal Links */}
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/impressum" className="hover:text-primary transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-primary transition-colors">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
