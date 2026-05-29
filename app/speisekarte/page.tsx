'use client'

import { useState, useRef, forwardRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import HTMLFlipBook from 'react-pageflip'
import { ChevronLeft, ChevronRight, Home, Flame, Leaf, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'

// Updated Menu Data - New prices and items
const menuData = {
  pizza: [
    { name: 'Margherita', desc: 'Tomaten und Käse', prices: ['5,90', '8,40', '10,40'] },
    { name: 'Cipolla', desc: 'Zwiebeln', prices: ['6,60', '8,60', '10,60'] },
    { name: 'Rindersalami', desc: 'Rindersalami', prices: ['7,90', '9,90', '11,90'] },
    { name: 'Napoli', desc: 'Sardellen, Oliven', prices: ['7,90', '9,90', '11,90'] },
    { name: 'Paprika', desc: 'Paprika', prices: ['7,90', '9,90', '11,90'], vegetarian: true },
    { name: 'Sucuk', desc: 'Knoblauchwurst', prices: ['8,40', '10,60', '12,60'] },
    { name: 'Schinken', desc: 'Schinken', prices: ['7,90', '9,90', '11,90'] },
    { name: 'Salami', desc: 'Salami', prices: ['7,90', '9,90', '11,90'] },
    { name: 'Funghi', desc: 'Champignons', prices: ['7,90', '9,90', '11,90'], vegetarian: true },
    { name: 'Tonno', desc: 'Thunfisch', prices: ['8,40', '10,90', '13,60'] },
    { name: 'Calabria', desc: 'Schinken, Champignons', prices: ['8,40', '10,90', '13,60'] },
    { name: 'Sicilia', desc: 'Salami, Champignons', prices: ['8,40', '10,90', '13,60'] },
    { name: 'Hawaii', desc: 'Schinken, Ananas', prices: ['8,40', '10,90', '13,60'] },
    { name: 'alla Diavolo', desc: 'scharfe Peperoni, Salami, Paprika, Zwiebeln', prices: ['8,60', '11,40', '13,90'], spicy: true },
    { name: 'Bolognese', desc: 'Bolognesesauce', prices: ['8,40', '10,90', '13,60'] },
    { name: 'Spaghetti', desc: 'Spaghetti, Bolognesesauce', prices: ['8,60', '11,60', '13,90'] },
    { name: 'Romana', desc: 'Schinken, Salami, Champignons', prices: ['8,60', '11,60', '13,90'] },
    { name: 'O Sole Mio', desc: 'Schinken, Champignons, Spargel, Spiegelei', prices: ['8,60', '11,60', '13,90'] },
    { name: 'Capricciosa', desc: 'Champignons, Mais, Artischocken, gek. Ei', prices: ['8,80', '11,60', '13,90'] },
    { name: 'Quattro Stagioni', desc: 'Schinken, Salami, Champignons, Thunfisch', prices: ['8,60', '11,60', '13,90'] },
    { name: 'Celina', desc: 'Spinat, Gorgonzola, Knoblauch, Käse', prices: ['9,40', '11,90', '13,90'] },
    { name: 'Calzone I', desc: 'gefüllt mit Schinken, Salami, Champignons', prices: ['8,60', '11,90', '13,90'] },
    { name: 'Calzone II', desc: 'gefüllt mit Thunfisch, Zwiebeln, Peperoni scharf', prices: ['8,60', '11,90', '13,90'], spicy: true },
    { name: 'Italia', desc: 'Cherrytomaten, Mozz., Parmaschinken, Rucola, Parmesan', prices: ['9,90', '12,60', '14,90'], popular: true },
    { name: 'Pazza', desc: 'Salami, Spargel, Oliven, Zwiebeln, Kapern, Knoblauch', prices: ['8,60', '11,60', '13,90'] },
    { name: 'Punto Rossa', desc: 'Schinken, Salami, Paprika, Ei, Artischocken', prices: ['8,60', '11,90', '13,90'] },
    { name: 'Rustica', desc: 'Champignons, Paprika, Artischocken, Spargel, Zwiebeln, Oliven, Kapern', prices: ['8,60', '11,90', '13,90'], vegetarian: true },
    { name: 'Toscana', desc: 'Schinken, Broccoli, Sauce Hollandaise', prices: ['9,90', '12,90', '14,90'] },
    { name: 'Venezia', desc: 'Broccoli, Hähnchenbrust, Sauce Hollandaise', prices: ['10,90', '12,90', '14,90'] },
    { name: 'Gorgonzola', desc: 'Gorgonzola', prices: ['8,90', '11,60', '13,90'] },
    { name: 'Mozzarella', desc: 'frische Tomatenscheiben, Mozzarella, Basilikum', prices: ['8,90', '11,60', '13,90'], vegetarian: true },
    { name: 'de Parma', desc: 'frische Tomatenscheiben, Mozz., Parmaschinken, Basilikum', prices: ['10,90', '12,90', '14,90'] },
    { name: 'Quattro Formaggi', desc: '4 verschiedene Käsesorten', prices: ['8,90', '11,90', '13,90'], vegetarian: true },
    { name: 'Spinaci', desc: 'Spinat, Knoblauch', prices: ['7,90', '9,90', '11,90'], vegetarian: true },
    { name: 'Broccoli', desc: 'Broccoli, Knoblauch', prices: ['7,90', '9,90', '11,90'], vegetarian: true },
    { name: 'Vegetaria', desc: 'Spinat, Broccoli, Paprika, Champignons, Knoblauch', prices: ['9,40', '11,90', '13,90'], vegetarian: true },
    { name: 'Gamberetti', desc: 'Krabben, Knoblauch', prices: ['9,90', '11,90', '13,90'] },
    { name: 'Frutti di Mare', desc: 'Meeresfrüchte, Knoblauch', prices: ['9,90', '11,90', '13,90'] },
    { name: 'Rucola e Salmone', desc: 'Cherrytomaten, Lachs, Zwiebeln, Rucola', prices: ['10,90', '12,90', '14,90'] },
    { name: 'Chili con Carne', desc: 'Bolognese, Zwiebeln, Kidneybohnen', prices: ['8,90', '10,90', '12,90'], spicy: true },
    { name: 'Tacchino', desc: 'Putenfleisch, Champignons, Zwiebeln', prices: ['9,90', '11,90', '13,90'] },
    { name: 'Speciale', desc: 'Krabben, Spinat, Knoblauch, Sahnesauce', prices: ['10,90', '13,60', '14,90'] },
    { name: 'Romantica', desc: 'nach Art des Hauses', prices: ['10,90', '12,90', '14,90'], popular: true },
  ],
  pasta: [
    { name: 'Spaghetti Napoli', desc: 'Tomatensauce', price: '8,90', vegetarian: true },
    { name: 'Spaghetti Bolognese', desc: 'Tomaten-Fleischsauce', price: '10,40', popular: true },
    { name: 'Spaghetti Carbonara', desc: 'Schinken, Ei, Sahnesauce', price: '11,90' },
    { name: 'Spaghetti Arrabiata', desc: 'Paprika, Oliven, Peperoni, Knoblauch, Tomatensauce', price: '11,60', spicy: true },
    { name: 'Spaghetti al Gusto Vivo', desc: 'Thunfisch, Zwiebeln, Champignons, Tomatensauce', price: '11,60' },
    { name: 'Spaghetti La Crema', desc: 'Steinpilze, Cherrytomaten, Rindfleischstreifen, Spezialsauce', price: '13,90' },
    { name: 'Spaghetti con Scampi', desc: 'Scampi, Oliven, Cherrytomatensauce', price: '14,90' },
    { name: 'Spaghetti Frutti di Mare', desc: 'Meeresfrüchte, Knoblauch, Tomatensauce', price: '12,90' },
    { name: 'Spaghetti Aglio e Olio', desc: 'Oliven, frische Tomate, Peperoni, Knoblauch, Olivenöl', price: '10,90', spicy: true },
    { name: 'Spaghetti Casalinghi', desc: 'Broccoli, Spinat, Schinken, Sahnesauce, überbacken', price: '11,90' },
    { name: 'Spaghetti Romantica', desc: 'Krabben, Muscheln, Champignons, Sahnesauce', price: '14,60', popular: true },
    { name: 'Spaghetti al Verdure', desc: 'Gemüse, Putenbrust, Olivenöl', price: '12,60' },
    { name: 'Penne Bolognese', desc: 'Tomaten-Fleischsauce', price: '10,40' },
    { name: 'Penne dello Chef', desc: 'Champignons, frische Paprika, Putenbrust, Tomaten-Sahnesauce', price: '12,90' },
    { name: 'Penne Gorgonzola', desc: 'Gorgonzola, Sahnesauce', price: '11,40' },
    { name: 'Penne Quattro Formaggi', desc: '4 verschiedene Käsesorten, Sahnesauce', price: '11,60' },
    { name: 'Penne Boscaiola', desc: 'Schinken, Champignons, Sahnesauce', price: '11,40' },
    { name: 'Penne Mozzarella', desc: 'Mozzarella, Zwiebeln, Basilikum, Tomatensauce', price: '11,60' },
    { name: 'Penne al Forno', desc: 'Schinken, gekochtes Ei, Erbsen, Fleisch-Sahnesauce, überbacken', price: '11,60' },
    { name: 'Penne alla Trattoria', desc: 'Schinken, Broccoli, Gorgonzola, Sahnesauce', price: '11,90' },
    { name: 'Penne Romantica', desc: 'Schinken, Broccoli, Spinat, Sahnesauce, überbacken', price: '11,90' },
    { name: 'Penne al Verdure', desc: 'frisches Gemüse, Tomatensauce, überbacken', price: '11,60', vegetarian: true },
    { name: 'Tortellini alla Panna', desc: 'Schinken, Sahnesauce', price: '11,60' },
    { name: 'Tortellini Spinaci e Gorgonzola', desc: 'Spinat, Gorgonzola, Sahnesauce', price: '11,90' },
    { name: 'Tortellini Casalinghi', desc: 'Schinken, Broccoli, Spinat, Sahnesauce, überbacken', price: '11,90' },
    { name: 'Tortellini Quattro Formaggi', desc: '4 verschiedene Käsesorten, Sahnesauce', price: '11,90' },
    { name: 'Tortellini al Forno', desc: 'Schinken, gekochtes Ei, Fleisch-Sahnesauce, überbacken', price: '11,90' },
    { name: 'Tortellini con Tonno', desc: 'Schinken, Thunfisch, Champignons, Sahnesauce, überbacken', price: '11,90' },
    { name: 'Tagliatelle al Pesto', desc: 'Basilikum, Parmesan, Knoblauch, Sahnesauce', price: '11,60' },
    { name: 'Tagliatelle Montanara', desc: 'Schinken, Champignons, Erbsen, gekochtes Ei, Fleischsauce, überbacken', price: '11,60' },
    { name: 'Tagliatelle al Salmone', desc: 'Lachs, Sahnesauce', price: '14,90' },
    { name: 'Tagliatelle al Gusto Mio', desc: 'Krabben, Paprika, Champignons, Knoblauch, Sahnesauce', price: '13,60' },
    { name: 'Tagliatelle Leonardo', desc: 'Schinken, Broccoli, Spinat, Sahnesauce, überbacken', price: '11,90' },
    { name: 'Tagliatelle dello Chef', desc: 'Putenfleisch, Champignons, Knoblauch, Sahnesauce', price: '12,60' },
    { name: 'Tagliatelle Regine', desc: 'Cherrytomaten, Pfifferlinge, Speck, Lauchzwiebeln', price: '12,60' },
    { name: 'Tagliatelle al Verdure', desc: 'Gemüse, Putenbrust, Olivenöl', price: '12,90' },
    { name: 'Gnocchi Romantica', desc: 'Mozzarella, Basilikum, Tomatensauce', price: '11,60' },
    { name: 'Gnocchi al Gorgonzola', desc: 'Gorgonzola, Sahnesauce', price: '11,60' },
    { name: 'Gnocchi alla Campagna', desc: 'Schinken, Champignons, Aubergine, Tomatensauce', price: '11,90' },
    { name: 'Gnocchi Gratinati', desc: 'Schinken, gekochtes Ei, Fleisch-Sahnesauce, überbacken', price: '11,90' },
    { name: 'Gnocchi La Crema', desc: 'Steinpilze, Cherrytomaten, Spezialsauce', price: '12,60' },
    { name: 'Lasagne', desc: 'mit gekochtem Ei und Fleisch-Sahnesauce, überbacken', price: '11,40', popular: true },
    { name: 'Cannelloni', desc: 'mit Hackfleischfüllung und Fleisch-Sahnesauce, überbacken', price: '11,60' },
    { name: 'Tris di Pasta I', desc: 'Lasagne, Tortellini, Maccheroni mit Fleischsauce, überbacken', price: '11,90' },
    { name: 'Tris di Pasta II', desc: 'Lasagne, Cannelloni, Tagliatelle mit Fleischsauce, überbacken', price: '11,90' },
    { name: 'Cannelloni Spinat', desc: 'mit Spinat, Tomaten und Käse, überbacken', price: '11,60', vegetarian: true },
  ],
  fleisch: [
    { name: 'Zigeunerschnitzel', desc: 'mit Zigeunersauce, Pommes Frites und Salat', price: '15,90' },
    { name: 'Jägerschnitzel', desc: 'mit Jägersauce, Pommes Frites und Salat', price: '15,90' },
    { name: 'Schnitzel Béarnaise', desc: 'mit Sauce Béarnaise, Pommes Frites und Salat, überbacken', price: '15,90' },
    { name: 'Schnitzel Hollandaise', desc: 'mit Sauce Hollandaise, Pommes Frites und Salat, überbacken', price: '15,90' },
    { name: 'Rahmschnitzel', desc: 'mit Champignon-Rahmsauce, Pommes Frites und Salat, überbacken', price: '15,90' },
    { name: 'Schnitzel des Hauses', desc: 'mit Pfeffersauce, Pommes Frites und Salat', price: '15,90' },
    { name: 'Schnitzel Hawaii', desc: 'mit Schinken, Ananas und Sauce Hollandaise, überbacken', price: '15,90' },
    { name: 'Pfeffer-Hähnchenschnitzel', desc: 'mit Pfeffersauce, Pommes Frites und Salat, überbacken', price: '15,90' },
    { name: 'Hähnchenschnitzel des Hauses', desc: 'mit Schafskäse und Sauce Hollandaise, überbacken', price: '15,90' },
    { name: 'Hähnchenschnitzel Funghi', desc: 'mit Champignon-Rahmsauce, Pommes Frites und Salat, überbacken', price: '15,90' },
    { name: 'Gyros-Teller', desc: 'Gyros mit Zwiebeln und Tzatziki, Pommes Frites und Salat', price: '15,90' },
    { name: 'Gyros Béarnaise', desc: 'Gyros mit Sauce Béarnaise, Pommes Frites und Salat, überbacken', price: '15,90' },
    { name: 'Gyros Hollandaise', desc: 'Gyros mit Sauce Hollandaise, Pommes Frites und Salat, überbacken', price: '15,90' },
    { name: 'Gyros Funghi', desc: 'Gyros mit Champignons und Sahnesauce, Pommes Frites und Salat, überbacken', price: '15,90' },
    { name: 'Gyros des Hauses', desc: 'Gyros mit Pfeffersauce, Pommes Frites und Salat, überbacken', price: '15,90' },
    { name: 'Gyros Metaxa', desc: 'Gyros mit Metaxasauce, Pommes Frites und Salat, überbacken', price: '15,90' },
    { name: 'Argentinisches Steak', desc: 'Argentinisches Rindersteak vom Grill mit Kräuterbutter', price: '26,90', popular: true },
    { name: 'Bistecca Zingara', desc: 'Rumpsteak mit Pilzen, Zwiebeln, Paprika und Gurken', price: '26,90' },
    { name: 'Bistecca alla Funghi', desc: 'Rumpsteak mit Champignons und Sahnesauce', price: '26,90' },
    { name: 'Bistecca Pizzaiola', desc: 'Rumpsteak mit Knoblauch und Tomatensauce', price: '26,90' },
    { name: 'Steak Diavolo', desc: 'mit Krabben und gemischten Pilzen, pikant und scharf', price: '26,90', spicy: true },
    { name: 'Pollo alla Milanese', desc: 'Paniertes Hähnchenbrustfilet, Pommes Frites und Salat', price: '14,90' },
    { name: 'Pollo al Vino Bianco', desc: 'Hähnchenbrustfilet mit Knoblauch-Weißweinsauce', price: '15,90' },
    { name: 'Pollo Hawaii', desc: 'Hähnchenbrustfilet mit Ananas und Ingwer-Sahnesauce', price: '15,90' },
    { name: 'Pollo Pepe', desc: 'Hähnchenbrustfilet vom Grill mit Pfeffersauce', price: '17,90' },
    { name: 'Scaloppina Gorgonzola', desc: 'Schweinemedaillons mit Champignons und Gorgonzola-Sahnesauce', price: '18,90' },
    { name: 'Scaloppina al Vino Bianco', desc: 'Schweinemedaillons mit Knoblauch-Weißweinsauce', price: '18,90' },
    { name: 'Scaloppina alla Funghi', desc: 'Schweinemedaillons mit Champignons und Sahnesauce', price: '18,90' },
    { name: 'Scaloppina Caprese', desc: 'Schweinemedaillons mit Tomatenscheiben und Mozzarella, überbacken', price: '19,90' },
  ],
  fisch: [
    { name: 'Fischplatte', desc: 'Scampi, Calamari und gegrilltes Lachsfilet mit Knoblauch, frischer Salat', price: '24,90', popular: true },
    { name: 'Calamari Fritti', desc: 'Frittierte Calamari, gemischter Salat', price: '16,90' },
    { name: 'Calamari alla Griglia', desc: 'Gegrillte Calamari mit Knoblauch, gemischter Salat', price: '16,90' },
    { name: 'Calamari alla Napoli', desc: 'Calamari mit Knoblauch und Tomatensauce, frischer Salat', price: '16,90' },
    { name: 'Cozze al Forno', desc: 'Muscheln mit delikater Sahnesauce und Knoblauch, überbacken', price: '15,90' },
    { name: 'Cozze alla Napoli', desc: 'Muscheln mit Knoblauch, Kapern, Oliven, Zwiebeln und Tomatensauce', price: '15,90' },
    { name: 'Cozze al Vino Bianco', desc: 'Muscheln mit Knoblauch-Weißweinsauce', price: '15,90' },
    { name: 'Scampi alla Griglia', desc: 'Scampi vom Grill mit Knoblauch, gemischter Salat', price: '23,90' },
    { name: 'Scampi alla Napoli', desc: 'Scampi mit Tomatensauce und Knoblauch, gemischter Salat', price: '23,90' },
    { name: 'Gamberoni Vesuviana', desc: 'Riesenscampi mit Cognac-Sahnesauce, Krabben und grünem Pfeffer', price: '24,90' },
    { name: 'Salmone Spinaci', desc: 'Lachs mit Sahnesauce auf Spinatnudeln', price: '24,90' },
  ],
  salate: [
    { name: 'Insalata Verde', desc: 'Grüner Salat', prices: ['5,90', '7,60'], vegetarian: true },
    { name: 'Insalata Rucola', desc: 'Rucola, Cherrytomaten, Rindfleischstreifen, Parmesan', prices: ['10,60', '13,40'] },
    { name: 'Insalata Salmone', desc: 'Rucola, Lachs, Cherrytomaten, Parmesan', prices: ['10,60', '13,40'] },
    { name: 'Insalata Pomodore', desc: 'Tomatensalat mit Oregano', prices: ['6,90', '8,90'], vegetarian: true },
    { name: 'Insalata Cetrioli', desc: 'Gurkensalat mit Oregano', prices: ['6,40', '8,40'], vegetarian: true },
    { name: 'Insalata Pecoraio', desc: 'Blattsalat mit Tomate, Gurke, Schafskäse', prices: ['8,40', '10,40'], vegetarian: true },
    { name: 'Insalata Caprese', desc: 'Blattsalat mit Tomate, Mozzarella, Basilikum', prices: ['8,40', '10,40'], vegetarian: true },
    { name: 'Insalata Bel Paese', desc: 'Blattsalat mit Tomate, Gurke, Thunfisch, Zwiebeln, Ei', prices: ['8,40', '10,90'] },
    { name: 'Insalata Mista', desc: 'Gemischter Salat mit Blattsalat, Tomate, Gurke, Mais, Paprika, Kidneybohnen, Zwiebeln', prices: ['7,40', '9,90'], vegetarian: true },
    { name: 'Insalata Frutti di Mare', desc: 'Insalata Mista mit Thunfisch und Meeresfrüchten', prices: ['9,40', '11,40'] },
    { name: 'Insalata Italiana', desc: 'Insalata Mista mit Thunfisch, Schinken, Käse, Artischocken, Ei, Zwiebeln', prices: ['9,40', '11,90'] },
    { name: 'Insalata dello Chef', desc: 'Insalata Mista mit Putenfleisch und Ei', prices: ['9,40', '11,90'] },
    { name: 'Insalata Romantica', desc: 'Insalata Mista mit Thunfisch, Schinken, Artischocken, Ei, Krabben, Oliven, Kapern, Käse', prices: ['9,90', '12,40'], popular: true },
    { name: 'Insalata Funghi', desc: 'Insalata Mista mit gebratenen Champignons', prices: ['8,90', '10,90'], vegetarian: true },
    { name: 'Insalata Hawaii', desc: 'Grüner Salat mit Tomate, Gurke, Mais, Schinken, Ananas', prices: ['8,40', '10,40'] },
    { name: 'Insalata Gambas', desc: 'Rucolasalat, Parmesan, Gambas, Cherrytomaten', prices: ['11,40', '15,90'] },
  ],
  desserts: [
    { name: 'Tiramisu', desc: 'Klassisches italienisches Tiramisu', price: '5,90', popular: true },
    { name: 'Panna Cotta', desc: 'Italienische Panna Cotta mit Beerensoße', price: '5,90' },
  ],
  drinks: [
    { name: 'Coca-Cola (1,0l)', desc: 'Erfrischungsgetränk', price: '4,40' },
    { name: 'Coca-Cola light (1,0l)', desc: 'Erfrischungsgetränk', price: '4,40' },
    { name: 'Fanta (1,0l)', desc: 'Erfrischungsgetränk', price: '4,40' },
    { name: 'Sprite (1,0l)', desc: 'Erfrischungsgetränk', price: '4,40' },
    { name: 'Mineralwasser (1,0l)', desc: 'Mineralwasser', price: '3,90' },
    { name: 'Bitburger Pils (0,33l)', desc: 'Alk. 4.8% vol.', price: '3,40' },
    { name: 'Köstritzer Schwarzbier (0,33l)', desc: 'Dunkles Bier', price: '3,90' },
    { name: 'Frascati (0,7l)', desc: 'Italienischer Weißwein', price: '15,90' },
    { name: 'Pinot Grigio (0,7l)', desc: 'Italienischer Weißwein', price: '15,40' },
    { name: 'Lambrusco (0,7l)', desc: 'Italienischer Rotwein', price: '15,40' },
    { name: 'Chianti (0,7l)', desc: 'Italienischer Rotwein', price: '15,90' },
    { name: 'Merlot (0,7l)', desc: 'Italienischer Rotwein', price: '15,90' },
  ],
}

// Page component with forwardRef for react-pageflip - Italian theme
const Page = forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string; pageNumber?: number }>(
  ({ children, className, pageNumber }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative bg-gradient-to-br from-[#fefefe] via-[#f8f5f0] to-[#f5f0e8] overflow-hidden',
          'shadow-[inset_0_0_30px_rgba(0,0,0,0.08)]',
          className
        )}
      >
        {/* Italian flag accent stripe at top */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-green-600" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-red-600" />
        </div>
        
        {/* Page edge shadow */}
        <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/10 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
        
        {/* Content */}
        <div className="relative h-full p-6 sm:p-8 lg:p-10 pt-8 overflow-y-auto scrollbar-hide">
          {children}
        </div>
        
        {/* Page number */}
        {pageNumber && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-green-800/60 text-sm font-serif">
            {pageNumber}
          </div>
        )}
      </div>
    )
  }
)
Page.displayName = 'Page'

// Cover Page - Italian flag themed
function CoverPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 lg:p-16 bg-gradient-to-br from-green-800 via-[#1a1a1a] to-red-900 relative overflow-hidden">
      {/* Italian flag stripe accents at top */}
      <div className="absolute top-0 left-0 right-0 h-3 flex">
        <div className="flex-1 bg-green-500" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-red-500" />
      </div>
      
      {/* Background decorative elements with Italian colors */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-16 left-8 w-32 h-32 border-2 border-green-400 rounded-full" />
        <div className="absolute bottom-16 right-8 w-28 h-28 border-2 border-red-400 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border border-white/40 rounded-full" />
      </div>
      
      {/* Decorative border */}
      <div className="absolute inset-4 lg:inset-8 border-2 border-white/40 rounded-xl pointer-events-none" />
      <div className="absolute inset-6 lg:inset-12 border border-white/20 rounded-lg pointer-events-none" />
      
      {/* Corner decorations - green and red */}
      <div className="absolute top-4 left-4 lg:top-8 lg:left-8 w-16 h-16 border-t-3 border-l-3 border-green-400 rounded-tl-xl" />
      <div className="absolute top-4 right-4 lg:top-8 lg:right-8 w-16 h-16 border-t-3 border-r-3 border-red-400 rounded-tr-xl" />
      <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8 w-16 h-16 border-b-3 border-l-3 border-green-400 rounded-bl-xl" />
      <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 w-16 h-16 border-b-3 border-r-3 border-red-400 rounded-br-xl" />
      
      {/* Logo/Title */}
      <div className="relative z-10">
        <div className="absolute -inset-20 bg-white/5 rounded-full blur-3xl" />
        <p className="text-white/70 text-sm lg:text-base tracking-[0.5em] uppercase mb-6 font-light">Willkommen bei</p>
        <h1 className="relative font-serif text-4xl sm:text-5xl lg:text-7xl font-bold text-green-400 tracking-wide drop-shadow-lg">
          Pizzeria
        </h1>
        <h1 className="relative font-serif text-5xl sm:text-6xl lg:text-8xl font-bold text-white tracking-wider mt-2 lg:mt-4 drop-shadow-lg">
          Romantica
        </h1>
      </div>
      
      {/* Decorative line - Italian flag colors */}
      <div className="my-10 lg:my-14 flex items-center gap-3 relative z-10">
        <div className="h-1.5 w-16 lg:w-24 bg-gradient-to-r from-transparent via-green-500 to-green-500 rounded-full" />
        <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-white shadow-lg" />
        <div className="h-1.5 w-16 lg:w-24 bg-gradient-to-l from-transparent via-red-500 to-red-500 rounded-full" />
      </div>
      
      {/* Subtitle in German */}
      <p className="text-white/90 text-lg sm:text-xl lg:text-2xl font-light italic max-w-md relative z-10 px-4">
        Authentische italienische Küche seit 2009
      </p>
      
      <p className="text-white/60 text-sm lg:text-base mt-6 max-w-sm relative z-10 px-4 leading-relaxed">
        Blättern Sie durch unsere Speisekarte und entdecken Sie unsere kulinarischen Köstlichkeiten
      </p>
      
      {/* Year/Label */}
      <div className="mt-10 lg:mt-14 text-white/70 text-base lg:text-lg tracking-[0.5em] uppercase relative z-10 font-light">
        Speisekarte
      </div>
      
      {/* Italian flag stripe at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-3 flex">
        <div className="flex-1 bg-green-500" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-red-500" />
      </div>
      
      {/* Hint to flip */}
      <div className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 text-white/50 text-xs lg:text-sm animate-bounce">
        Seite umblättern &rarr;
      </div>
    </div>
  )
}

// Menu Item Component - Italian themed
function MenuItem({ 
  item, 
  showSizes = false,
  twoSizes = false
}: { 
  item: { name: string; desc: string; price?: string; prices?: string[]; spicy?: boolean; vegetarian?: boolean; popular?: boolean }
  showSizes?: boolean
  twoSizes?: boolean
}) {
  return (
    <div className="group py-3 border-b border-green-800/10 last:border-0">
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-green-900 font-semibold text-base lg:text-lg">{item.name}</h4>
            {item.spicy && <Flame className="w-4 h-4 text-red-500 shrink-0" />}
            {item.vegetarian && <Leaf className="w-4 h-4 text-green-600 shrink-0" />}
            {item.popular && <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />}
          </div>
          <p className="text-gray-600 text-sm lg:text-base mt-0.5 leading-relaxed">{item.desc}</p>
        </div>
        <div className="text-right shrink-0">
          {showSizes && item.prices ? (
            <div className="flex flex-col gap-0.5 text-sm lg:text-base">
              {item.prices.map((p, i) => (
                <span key={i} className="text-red-700 font-bold whitespace-nowrap">
                  {twoSizes ? ['Kl.', 'Gr.'][i] : ['24cm', '28cm', '32cm'][i]}: {p}€
                </span>
              ))}
            </div>
          ) : (
            <span className="text-red-700 font-bold text-base lg:text-lg">
              {item.price || (item.prices && item.prices[0])}€
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// Category Header - Italian themed
function CategoryHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-6 lg:mb-8">
      <h2 className="font-serif text-2xl lg:text-4xl text-green-800 font-bold">{title}</h2>
      {subtitle && <p className="text-gray-500 text-base lg:text-lg mt-1">{subtitle}</p>}
      <div className="mt-4 flex items-center justify-center gap-3">
        <div className="h-0.5 w-12 lg:w-16 bg-gradient-to-r from-transparent to-green-600 rounded-full" />
        <div className="w-2 h-2 rounded-full bg-white border-2 border-green-600" />
        <div className="h-0.5 w-12 lg:w-16 bg-gradient-to-l from-transparent to-red-600 rounded-full" />
      </div>
    </div>
  )
}

export default function SpeisekartePage() {
  const [currentPage, setCurrentPage] = useState(0)
  const bookRef = useRef<{ pageFlip: () => { flipNext: () => void; flipPrev: () => void; getCurrentPageIndex: () => number; getPageCount: () => number } }>(null)
  const [dimensions, setDimensions] = useState({ width: 650, height: 850 })
  const [totalPages, setTotalPages] = useState(14)
  const [isMobile, setIsMobile] = useState(false)
  const [isReady, setIsReady] = useState(false)

  // Update dimensions based on screen size
  const updateDimensions = useCallback(() => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    
    if (mobile) {
      setDimensions({ 
        width: Math.min(window.innerWidth - 24, 420), 
        height: Math.min(window.innerHeight - 140, 700) 
      })
    } else if (window.innerWidth < 1280) {
      setDimensions({ width: 520, height: 720 })
    } else if (window.innerWidth < 1536) {
      setDimensions({ width: 600, height: 800 })
    } else {
      setDimensions({ width: 700, height: 900 })
    }
  }, [])

  // Handle resize and initial setup
  useEffect(() => {
    updateDimensions()
    const timer = setTimeout(() => setIsReady(true), 100)
    
    window.addEventListener('resize', updateDimensions)
    return () => {
      window.removeEventListener('resize', updateDimensions)
      clearTimeout(timer)
    }
  }, [updateDimensions])

  const flipNext = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext()
    }
  }

  const flipPrev = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev()
    }
  }

  const onFlip = (e: { data: number }) => {
    setCurrentPage(e.data)
  }

  const onInit = () => {
    if (bookRef.current) {
      setTotalPages(bookRef.current.pageFlip().getPageCount())
    }
  }

  // Split pizza items for multiple pages
  const pizzaPage1 = menuData.pizza.slice(0, 15)
  const pizzaPage2 = menuData.pizza.slice(15, 30)
  const pizzaPage3 = menuData.pizza.slice(30)
  
  // Split pasta items
  const pastaPage1 = menuData.pasta.slice(0, 16)
  const pastaPage2 = menuData.pasta.slice(16, 32)
  const pastaPage3 = menuData.pasta.slice(32)

  // Split fleisch items
  const fleischPage1 = menuData.fleisch.slice(0, 15)
  const fleischPage2 = menuData.fleisch.slice(15)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-gray-900 to-red-900 flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 flex items-center justify-between border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 text-white hover:text-green-300 transition-colors">
          <Home className="w-5 h-5" />
          <span className="hidden sm:inline font-medium">Zurück zur Startseite</span>
        </Link>
        <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">Speisekarte</h1>
        <div className="w-20" /> {/* Spacer for centering */}
      </header>

      {/* Navigation controls */}
      <div className="flex justify-center gap-4 py-4">
        <Button
          onClick={flipPrev}
          variant="outline"
          size="icon"
          className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
          disabled={currentPage === 0}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          onClick={flipNext}
          variant="outline"
          size="icon"
          className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
          disabled={currentPage >= totalPages - 1}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Book Container */}
      <div className="flex-1 flex items-center justify-center py-8 px-4">
        {!isReady ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
            <p className="text-white/60 text-lg">Speisekarte wird geladen...</p>
          </div>
        ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
          style={{ perspective: '3000px' }}
        >
          {/* Book */}
          {/* @ts-expect-error - react-pageflip types are incomplete */}
          <HTMLFlipBook
            ref={bookRef}
            width={dimensions.width}
            height={dimensions.height}
            size="fixed"
            minWidth={380}
            maxWidth={750}
            minHeight={600}
            maxHeight={950}
            showCover={true}
            flippingTime={700}
            usePortrait={isMobile}
            startZIndex={0}
            autoSize={false}
            maxShadowOpacity={0.6}
            mobileScrollSupport={true}
            onFlip={onFlip}
            onInit={onInit}
            className="shadow-[0_25px_100px_rgba(0,0,0,0.5)]"
            style={{}}
            startPage={0}
            drawShadow={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            {/* Cover */}
            <Page>
              <CoverPage />
            </Page>

            {/* Pizza Page 1 */}
            <Page pageNumber={1}>
              <CategoryHeader title="Pizza" subtitle="Alle Pizzen mit Tomaten und Käse" />
              <p className="text-gray-500 text-xs text-center mb-4 font-medium">Größen: Klein (24cm) | Normal (28cm) | Groß (32cm)</p>
              <div className="space-y-0">
                {pizzaPage1.map((item, i) => (
                  <MenuItem key={i} item={item} showSizes />
                ))}
              </div>
            </Page>

            {/* Pizza Page 2 */}
            <Page pageNumber={2}>
              <CategoryHeader title="Pizza" subtitle="Weitere Auswahl" />
              <p className="text-gray-500 text-xs text-center mb-4 font-medium">Größen: Klein (24cm) | Normal (28cm) | Groß (32cm)</p>
              <div className="space-y-0">
                {pizzaPage2.map((item, i) => (
                  <MenuItem key={i} item={item} showSizes />
                ))}
              </div>
            </Page>

            {/* Pizza Page 3 */}
            <Page pageNumber={3}>
              <CategoryHeader title="Pizza" subtitle="Spezialitäten" />
              <p className="text-gray-500 text-xs text-center mb-4 font-medium">Größen: Klein (24cm) | Normal (28cm) | Groß (32cm)</p>
              <div className="space-y-0">
                {pizzaPage3.map((item, i) => (
                  <MenuItem key={i} item={item} showSizes />
                ))}
              </div>
            </Page>

            {/* Pasta Page 1 */}
            <Page pageNumber={4}>
              <CategoryHeader title="Pasta" subtitle="Hausgemacht" />
              <div className="space-y-0">
                {pastaPage1.map((item, i) => (
                  <MenuItem key={i} item={item} />
                ))}
              </div>
            </Page>

            {/* Pasta Page 2 */}
            <Page pageNumber={5}>
              <CategoryHeader title="Pasta" subtitle="Weitere Auswahl" />
              <div className="space-y-0">
                {pastaPage2.map((item, i) => (
                  <MenuItem key={i} item={item} />
                ))}
              </div>
            </Page>

            {/* Pasta Page 3 */}
            <Page pageNumber={6}>
              <CategoryHeader title="Pasta" subtitle="Spezialitäten" />
              <div className="space-y-0">
                {pastaPage3.map((item, i) => (
                  <MenuItem key={i} item={item} />
                ))}
              </div>
            </Page>

            {/* Fleischgerichte Page 1 */}
            <Page pageNumber={7}>
              <CategoryHeader title="Fleischgerichte" subtitle="Carne" />
              <div className="space-y-0">
                {fleischPage1.map((item, i) => (
                  <MenuItem key={i} item={item} />
                ))}
              </div>
            </Page>

            {/* Fleischgerichte Page 2 */}
            <Page pageNumber={8}>
              <CategoryHeader title="Fleischgerichte" subtitle="Weitere Auswahl" />
              <div className="space-y-0">
                {fleischPage2.map((item, i) => (
                  <MenuItem key={i} item={item} />
                ))}
              </div>
            </Page>

            {/* Fisch */}
            <Page pageNumber={9}>
              <CategoryHeader title="Fisch & Meeresfrüchte" subtitle="Pesce e Frutti di Mare" />
              <div className="space-y-0">
                {menuData.fisch.map((item, i) => (
                  <MenuItem key={i} item={item} />
                ))}
              </div>
            </Page>

            {/* Salate */}
            <Page pageNumber={10}>
              <CategoryHeader title="Salate" subtitle="Insalate" />
              <p className="text-gray-500 text-xs text-center mb-4 font-medium">Größen: Klein | Groß</p>
              <div className="space-y-0">
                {menuData.salate.map((item, i) => (
                  <MenuItem key={i} item={item} showSizes twoSizes />
                ))}
              </div>
            </Page>

            {/* Desserts & Drinks */}
            <Page pageNumber={11}>
              <CategoryHeader title="Desserts & Getränke" subtitle="Dolci e Bevande" />
              <div className="mb-8">
                <h3 className="text-green-800 font-semibold text-lg mb-4 border-b border-green-800/20 pb-2">Desserts</h3>
                {menuData.desserts.map((item, i) => (
                  <MenuItem key={i} item={item} />
                ))}
              </div>
              <div>
                <h3 className="text-green-800 font-semibold text-lg mb-4 border-b border-green-800/20 pb-2">Getränke</h3>
                {menuData.drinks.map((item, i) => (
                  <MenuItem key={i} item={item} />
                ))}
              </div>
            </Page>

            {/* Back Cover */}
            <Page>
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-green-800 via-gray-800 to-red-900 -m-6 sm:-m-8 lg:-m-10">
                {/* Italian flag stripe at top */}
                <div className="absolute top-0 left-0 right-0 h-2 flex">
                  <div className="flex-1 bg-green-500" />
                  <div className="flex-1 bg-white" />
                  <div className="flex-1 bg-red-500" />
                </div>
                
                <div className="absolute inset-6 border-2 border-white/30 rounded-xl pointer-events-none" />
                <h2 className="font-serif text-4xl lg:text-5xl text-white font-bold">Grazie!</h2>
                <p className="text-white/70 mt-6 text-lg max-w-xs leading-relaxed">
                  Vielen Dank für Ihren Besuch bei Pizzeria Romantica
                </p>
                <div className="my-8 flex items-center gap-3">
                  <div className="h-1 w-16 bg-green-500 rounded-full" />
                  <div className="w-3 h-3 rounded-full bg-white" />
                  <div className="h-1 w-16 bg-red-500 rounded-full" />
                </div>
                <p className="text-white/50 text-sm">
                  Wir freuen uns auf Ihren nächsten Besuch!
                </p>
                <div className="mt-10 text-white/40 text-sm tracking-widest">
                  PIZZERIA ROMANTICA
                </div>
                
                {/* Italian flag stripe at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-2 flex">
                  <div className="flex-1 bg-green-500" />
                  <div className="flex-1 bg-white" />
                  <div className="flex-1 bg-red-500" />
                </div>
              </div>
            </Page>
          </HTMLFlipBook>
        </motion.div>
        )}
      </div>

      {/* Page indicator */}
      {isReady && (
      <div className="py-4 text-center text-white/70 text-base">
        Seite {currentPage + 1} von {totalPages}
      </div>
      )}

      {/* Legend */}
      <div className="py-4 px-4 border-t border-white/10 flex justify-center gap-6 lg:gap-8 text-sm text-white/60 flex-wrap">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-red-400" />
          <span>Scharf</span>
        </div>
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-green-400" />
          <span>Vegetarisch</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          <span>Beliebt</span>
        </div>
      </div>
    </div>
  )
}
