'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Review {
  id: string
  name: string
  avatar: string
  rating: number
  text: string
  date: string
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Thomas M.',
    avatar: 'TM',
    rating: 5,
    text: 'Sehr gute Pizza und Calzone, gemütlicher Ort und günstige Preise. Wir kommen immer wieder gerne!',
    date: 'vor 2 Wochen',
  },
  {
    id: '2',
    name: 'Sarah K.',
    avatar: 'SK',
    rating: 5,
    text: 'Sehr heimelige und gemütliche Atmosphäre mit netten Kellnern. Die beste Pizza in Hagen!',
    date: 'vor 1 Monat',
  },
  {
    id: '3',
    name: 'Michael B.',
    avatar: 'MB',
    rating: 5,
    text: 'Authentisch italienisch! Die Lasagne ist ein Traum und das Tiramisu zum Abschluss perfekt.',
    date: 'vor 1 Monat',
  },
  {
    id: '4',
    name: 'Laura H.',
    avatar: 'LH',
    rating: 5,
    text: 'Schnelle Lieferung und das Essen war noch heiß. Margherita ist einfach perfekt – schlicht und lecker!',
    date: 'vor 3 Wochen',
  },
  {
    id: '5',
    name: 'Andreas F.',
    avatar: 'AF',
    rating: 4,
    text: 'Super Calzone, sehr großzügig gefüllt. Der Service ist freundlich und aufmerksam.',
    date: 'vor 2 Monaten',
  },
  {
    id: '6',
    name: 'Julia R.',
    avatar: 'JR',
    rating: 5,
    text: 'Unsere Stammadresse für italienisches Essen. Die Pasta Carbonara ist unübertroffen!',
    date: 'vor 1 Woche',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < rating ? 'fill-accent text-accent' : 'text-muted-foreground/30'
          )}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <Quote className="h-8 w-8 text-primary/20 mb-4" />
      <p className="text-foreground mb-4 leading-relaxed">{review.text}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
            {review.avatar}
          </div>
          <div>
            <div className="font-medium text-foreground">{review.name}</div>
            <div className="text-xs text-muted-foreground">{review.date}</div>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
    </motion.div>
  )
}

export function ReviewsSection() {
  const averageRating = 4.8
  const totalReviews = 165

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-primary font-medium">Bewertungen</span>
          <h2 className="mt-2 font-[var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Was unsere Gäste sagen
          </h2>
        </motion.div>

        {/* Rating Summary Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto mb-12 bg-card p-8 rounded-2xl shadow-lg text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Star className="h-8 w-8 fill-accent text-accent" />
              </motion.div>
            ))}
          </div>
          <div className="text-5xl font-bold text-foreground font-[var(--font-playfair)]">
            {averageRating}
          </div>
          <div className="text-muted-foreground mt-1">
            Basierend auf {totalReviews} Bewertungen
          </div>
          <div className="flex justify-center gap-2 mt-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1 bg-muted rounded-full px-3 py-1">
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              Google
            </span>
          </div>
        </motion.div>

        {/* Review Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
