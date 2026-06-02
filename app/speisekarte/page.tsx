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
    { name: 'Capriciosa', desc: 'Champignons, Mais, Artischocken, gek. Ei', prices: ['8,80', '11,60', '13,90'] },
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
    { name: 'de Parma', desc: 'frische Tomatenscheiben, Mozz., Parmaschinken, Basilikum', prices: ['10,60', '12,60', '13,60'] },
    { name: 'Quattro Formaggi', desc: '4 verschiedene Käsesorten', prices: ['8,90', '11,60', '13,90'], vegetarian: true },
    { name: 'Spinaci', desc: 'Spinat, Knoblauch', prices: ['7,90', '9,90', '11,90'], vegetarian: true },
    { name: 'Broccoli', desc: 'Broccoli, Knoblauch', prices: ['7,90', '9,90', '11,90'], vegetarian: true },
    { name: 'Vegetaria', desc: 'Spinat, Broccoli, Paprika, Champignons, Knoblauch', prices: ['9,40', '10,90', '13,90'], vegetarian: true },
    { name: 'Gamberetti', desc: 'Krabben, Knoblauch', prices: ['9,60', '11,90', '13,90'] },
    { name: 'Frutti di Mare', desc: 'Meeresfrüchte, Knoblauch', prices: ['9,60', '11,90', '13,90'] },
    { name: 'Rucola e Salmone', desc: 'Lachs, Cherrytomaten, Zwiebeln, Rucola', prices: ['10,90', '12,90', '15,90'] },
    { name: 'Chili con Carne', desc: 'Bolognese, Zwiebeln, Kidneybohnen', prices: ['8,60', '10,90', '13,90'], spicy: true },
    { name: 'Tacchino', desc: 'Hähnchenfleisch, Champignons, Zwiebeln', prices: ['9,60', '11,90', '13,90'] },
    { name: 'Speciale', desc: 'Krabben, Spinat, Knoblauch, Sahnesauce', prices: ['10,60', '13,90', '14,90'] },
    { name: 'Romantica', desc: 'nach Art des Hauses', prices: ['10,60', '13,90', '14,90'], popular: true },
    { name: 'Überraschung für 2 Personen', desc: 'Spezialüberraschung für zwei Personen', prices: [ , ,'19,90'] },
    { name: 'Extra Zutat (ausgenommen Lachs)', desc: 'Extra Belag Ihrer Wahl', prices: ['1,00', '1,50', '2,50'] },
    { name: 'Extra Zutat Lachs', desc: 'Extra Lachsbelag', prices: ['2,00', '3,00', '4,00'] },
    { name: 'Pizzabrötchen', desc: '10 Stk. mit Kräuterbutter oder Aioli', prices: ['4,50',] },
    { name: 'gefüllte Pizzabrötchen', desc: '8 Stk. mit Käse und 1 Füllung nach Wahl (Salami, Schinken, Spinat, Champignons oder Thunfisch)', prices: ['8,50'] },
  ],
  salate: [
    { name: 'Verde', desc: 'Grüner Salat', prices: ['4,40', '5,90'], vegetarian: true },
    { name: 'Rucola', desc: 'Rucola, Cherrytomaten, Rindfleischstreifen, Parmesan', prices: ['9,90', '12,90'] },
    { name: 'Salmone', desc: 'Rucola, Lachs, Cherrytomaten, Parmesan', prices: ['9,90', '12,90'] },
    { name: 'Pomodore', desc: 'Tomatensalat mit Oregano', prices: ['6,40', '8,60'], vegetarian: true },
    { name: 'Cetrioli', desc: 'Gurkensalat mit Oregano', prices: ['5,90', '8,20'], vegetarian: true },
    { name: 'Toscana', desc: 'Gemischter Salat mit paniertem Schafskäse', prices: ['8,90', '10,90'], vegetarian: true },
    { name: 'Pecoraio', desc: 'Blattsalat, Tomaten, Gurken, Schafskäse', prices: ['7,90', '9,90'], vegetarian: true },
    { name: 'Caprese', desc: 'Blattsalat, Tomaten, Mozzarella, Basilikum', prices: ['7,90', '9,90'], vegetarian: true },
    { name: 'Bel Paese', desc: 'Blattsalat, Tomaten, Gurken, Thunfisch, rote Zwiebeln, Ei', prices: ['7,90', '9,90'] },
    { name: 'Mista', desc: 'Blattsalat, Tomaten, Gurken, Mais, Paprika, Kidneybohnen, rote Zwiebeln', prices: ['5,90', '8,90'], vegetarian: true },
    { name: 'Frutti di Mare', desc: 'Blattsalat, Tomaten, Gurken, Mais, Paprika, Kidneybohnen, Thunfisch, Meeresfrüchte', prices: ['7,90', '9,90'] },
    { name: 'Italiana', desc: 'Blattsalat, Tomaten, Gurken, Mais, Paprika, Kidneybohnen, Thunfisch, Schinken, Käse, Artischocken, Ei', prices: ['8,90', '10,90'] },
    { name: 'Dello Chef', desc: 'Blattsalat, Tomaten, Gurken, Mais, Paprika, Kidneybohnen, Hähnchenbrust, Ei', prices: ['8,90', '11,60'] },
    { name: 'Romantica', desc: 'Blattsalat, Tomaten, Gurken, Mais, Paprika, Kidneybohnen, Thunfisch, Schinken, Artischocken, Ei, Krabben, Oliven, Kapern, Käse', prices: ['8,90', '11,60'], popular: true },
    { name: 'Funghi', desc: 'Blattsalat, Tomaten, Gurken, Mais, Paprika, Kidneybohnen, gebratene Champignons', prices: ['7,90', '10,60'], vegetarian: true },
    { name: 'Hawaii', desc: 'Grüner Salat, Tomaten, Gurken, Mais, Schinken, Ananas', prices: ['7,90', '9,90'] },
    { name: 'Gambas', desc: 'Rucolasalat, Gambas, Cherrytomaten, Parmesan', prices: ['10,30', '13,90'] },
  ],
  pasta: [
    { name: 'Spaghetti Napoli', desc: 'Tomatensauce', price: '8,90', vegetarian: true },
    { name: 'Spaghetti Bolognese', desc: 'Tomaten-Fleischsauce', price: '9,90', popular: true },
    { name: 'Spaghetti Carbonara', desc: 'Schinken, Ei, Sahnesauce', price: '10,90' },
    { name: 'Spaghetti Arrabbiata', desc: 'scharf, Paprika, Oliven, Knoblauch in Tomatensauce', price: '10,90', spicy: true },
    { name: 'Spaghetti al Gusto Vino', desc: 'Thunfisch, Zwiebeln, Champignons in Tomatensauce', price: '11,90' },
    { name: 'Spaghetti con Scampi', desc: 'Scampi, Oliven in Cherry-Tomatensauce', price: '13,90' },
    { name: 'Spaghetti La Crema', desc: 'Steinpilze, Cherrytomaten, Rinderstreifen in Spezialsauce', price: '13,90' },
    { name: 'Spaghetti Frutti di Mare', desc: 'Meeresfrüchte, Knoblauch in Tomatensauce', price: '12,60' },
    { name: 'Spaghetti Aglio e Olio', desc: 'Oliven, frische Tomaten, Peperoni, Knoblauch in Olivenöl', price: '9,90', spicy: true },
    { name: 'Spaghetti Casalinghi', desc: 'Broccoli, Spinat, Schinken, Sahnesauce mit Käse überbacken', price: '11,60' },
    { name: 'Spaghetti Romantica', desc: 'Krabben, Muscheln, Champignons in Sahnesauce', price: '12,90', popular: true },
    { name: 'Spaghetti al Verdure', desc: 'Gemüse, Hähnchenbrust und Olivenöl', price: '12,90' },
    { name: 'Penne Bolognese', desc: 'Tomaten-Fleischsauce', price: '9,90' },
    { name: 'Penne Dello Chef', desc: 'Champignons, frische Paprika, Hähnchenbrust, Tomaten-Sahnesauce', price: '12,90' },
    { name: 'Penne Gorgonzola', desc: 'Gorgonzola und Sahnesauce', price: '11,40' },
    { name: 'Penne Quattro Formaggi', desc: '4 verschiedene Käsesorten in Sahnesauce', price: '11,40' },
    { name: 'Penne Boscaiola', desc: 'Schinken, Champignons, Sahnesauce', price: '11,40' },
    { name: 'Penne Mozzarella', desc: 'Mozzarella, Zwiebeln, Basilikum, Tomatensauce', price: '11,40' },
    { name: 'Penne al Forno', desc: 'Schinken, gekochtes Ei, Erbsen, Fleisch-Sahnesauce, überbacken', price: '11,40' },
    { name: 'Penne alla Trattoria', desc: 'Schinken, Broccoli, Gorgonzola in Sahnesauce', price: '11,40' },
    { name: 'Penne Romantica', desc: 'Schinken, Broccoli, Spinat, Sahnesauce, überbacken', price: '11,40' },
    { name: 'Penne al Verdure', desc: 'verschiedenes frisches Gemüse, Tomatensauce, Käse überbacken', price: '11,40', vegetarian: true },
    { name: 'Tortellini alla Panna', desc: 'Schinken in Sahnesauce', price: '10,90' },
    { name: 'Tortellini Spinaci e Gorgonzola', desc: 'Spinat, Gorgonzola in Sahnesauce', price: '11,60' },
    { name: 'Tortellini Consalinghi', desc: 'Schinken, Broccoli, Spinat, Sahnesauce, Käse überbacken', price: '11,60' },
    { name: 'Tortellini Quattro Formaggi', desc: '4 verschiedene Käsesorten in Sahnesauce', price: '11,60' },
    { name: 'Tortellini al Forno', desc: 'Schinken, gekochtes Ei, Fleisch-Sahnesauce, Käse überbacken', price: '11,60' },
    { name: 'Tortellini con Tonno', desc: 'Schinken, Thunfisch, Champignons, Sahnesauce, überbacken', price: '11,60' },
    { name: 'Tagliatelle al Pesto', desc: 'Basilikum, Parmesan, Knoblauch in Sahnesauce', price: '11,40' },
    { name: 'Tagliatelle Montanara', desc: 'Schinken, Champignons, Erbsen, gekochtes Ei, Fleischsauce, überbacken', price: '11,90' },
    { name: 'Tagliatelle al Salmone', desc: 'Lachs in Sahnesauce', price: '14,60' },
    { name: 'Tagliatelle al Gusto Mio', desc: 'Krabben, Paprika, Champignons, Knoblauch, Sahnesauce', price: '13,60' },
    { name: 'Tagliatelle Leonardo', desc: 'Schinken, Broccoli, Spinat, Sahnesauce, überbacken', price: '11,90' },
    { name: 'Tagliatelle Dello Chef', desc: 'Putenfleisch, Champignons, Knoblauch in Sahnesauce', price: '12,90' },
    { name: 'Tagliatelle Regine', desc: 'Cherrytomaten, Pfifferlinge, Parmaschinken, Lauchzwiebeln', price: '12,90' },
    { name: 'Tagliatelle al Verdure', desc: 'Gemüse, Putenbrust und Olivenöl', price: '12,90' },
    { name: 'Gnocchi Romantica', desc: 'Mozzarella und Basilikum, in Tomatensauce', price: '11,40' },
    { name: 'Gnocchi al Gorgonzola', desc: 'Gorgonzola in Sahnesauce', price: '11,40' },
    { name: 'Gnocchi alla Campagna', desc: 'Schinken, Champignons, Auberginen in Tomatensauce', price: '11,40' },
    { name: 'Gnocchi Grantinate', desc: 'Schinken, gekochtes Ei, Fleisch-Sahnesauce, Käse überbacken', price: '11,40' },
    { name: 'Gnocchi La Crema', desc: 'Steinpilze, Cherrytomaten, Spezialsauce', price: '11,40' },
    { name: 'Lasagne', desc: 'Fleisch-Sahnesauce, Käse überbacken', price: '10,60', popular: true },
    { name: 'Cannelloni', desc: 'Hackfleischfüllung, Fleisch-Sahnesauce, Käse überbacken', price: '10,90' },
    { name: 'Tris di Pasta I', desc: 'Lasagne, Penne, Tortellini mit Fleischsauce, Käse überbacken', price: '10,90' },
    { name: 'Tris di Pasta II', desc: 'Lasagne, Cannelloni, Tagliatelle, Fleischsauce, Käse überbacken', price: '10,90' },
    { name: 'Cannelloni Ricotta', desc: 'mit Spinat in Tomatensauce, Käse überbacken', price: '10,90', vegetarian: true },
  ],
  fleisch: [
    { name: 'Zigeunerschnitzel', desc: 'Schweineschnitzel', price: '13,90' },
    { name: 'Jägerschnitzel', desc: 'Schweineschnitzel', price: '13,90' },
    { name: 'Schnitzel Béarnaise', desc: 'Sauce Béarnaise, Käse überbacken', price: '13,90' },
    { name: 'Schnitzel Hollandaise', desc: 'Sauce Hollandaise, Käse überbacken', price: '13,90' },
    { name: 'Rahmschnitzel', desc: 'Champignon-Rahmsauce', price: '13,90' },
    { name: 'Schnitzel des Hauses', desc: 'mit Pfeffersauce', price: '13,90' },
    { name: 'Schnitzel Hawaii', desc: 'Schinken, Ananas, Sauce Hollandaise, Käse überbacken', price: '13,90' },
    { name: 'Pfeffer-Hähnchenschnitzel', desc: 'Pfeffersauce, Käse überbacken', price: '13,90' },
    { name: 'Hähnchenschnitzel des Hauses', desc: 'Schafskäse, Sauce Hollandaise, Käse überbacken', price: '13,90' },
    { name: 'Hähnchenschnitzel Funghi', desc: 'Champignon-Rahmsauce, Käse überbacken', price: '13,90' },
    { name: 'Pollo alla Milanese', desc: 'Paniertes Hähnchenbrustfilet', price: '11,90' },
    { name: 'Pollo al Vino Bianco', desc: 'Hähnchenbrustfilet in Knoblauch-Weißweinsauce', price: '14,90' },
    { name: 'Pollo Hawaii', desc: 'Hähnchenbrustfilet in rassiger Ingwer-Sahnesauce, Ananas', price: '15,90' },
    { name: 'Pollo Pepe', desc: 'Hähnchenbrustfilet in Pfeffersauce', price: '15,90' },
    { name: 'Scaloppina Gorgonzola', desc: 'Schweinemedaillons in Gorgonzola-Sahnesauce', price: '15,90' },
    { name: 'Scaloppina al Vino Bianco', desc: 'Schweinemedaillons in Knoblauch-Weißweinsauce', price: '15,90' },
    { name: 'Scaloppina alla Funghi', desc: 'Schweinemedaillons, Champignons in Sahnesauce', price: '15,90' },
    { name: 'Scaloppina Caprese', desc: 'Schweinemedaillons, Tomatenscheiben, Mozzarella überbacken', price: '17,90' },
    { name: 'Argentinisches Steak', desc: 'gegr. Argentinisches Rumpsteak mit Kräuterbutter', price: '23,90', popular: true },
    { name: 'Bistecca Zingara', desc: 'Rumpsteak, Pilze, Zwiebeln, Paprika, Gurken', price: '23,90' },
    { name: 'Bistecca alla Funghi', desc: 'gegr. Argentinisches Rumpsteak, Champignons in Sahnesauce', price: '23,90' },
    { name: 'Bistecca Pizzaiola', desc: 'gegr. Argentinisches Rumpsteak, Knoblauch, in Tomatensauce', price: '23,90' },
    { name: 'Steak Diavolo', desc: 'mit Krabben, Mischpilzen (pikant, scharf)', price: '24,90', spicy: true },
  ],
gyros: [
    { name: 'Gyros-Teller', desc: 'mit Gyros, Zwiebeln, Tzatziki', price: '14,10' },
    { name: 'Gyros Bernaise', desc: 'Gyros mit Sauce Bernaise, Käse überbacken', price: '14,60' },
    { name: 'Gyros Hollandaise', desc: 'Gyros mit Sauce Hollandaise, Käse überbacken', price: '14,60' },
    { name: 'Gyros Funghi', desc: 'Gyros mit Champignons, Sahnesauce, Käse überbacken', price: '14,60' },
    { name: 'Gyros des Hauses', desc: 'Gyros, Pfeffersauce, Käse überbacken', price: '14,60' },
    { name: 'Gyros Metaxa', desc: 'Gyros, Metaxasauce, Käse überbacken', price: '14,60' },
    { name: 'Gyros Pizza', desc: 'Gyros, Zwiebeln, Peperoni', prices: ['11,90€ , 12,90'] },
    { name: 'Gyros Pizza Spezial', desc: 'Gyros, Salat, Tzatziki (nach dem Backen)', prices: ['12,90€ , 13,90'] },
    { name: 'extra Tzatziki', desc: 'Kräuterbutter & Aioli', price: '2,00' },
    { name: 'Pommes oder Kroketten', desc: 'Beilage', price: '4,00' },
    { name: 'Chicken Nuggets', desc: '9 Stk.', price: '5,90' },
    { name: 'Ketchup', desc: 'Sauce', price: '1,00' },
    { name: 'Mayonnaise', desc: 'Sauce', price: '1,00' },
  ],
  fisch: [
    { name: 'Fischplatte', desc: 'Scampi, Calamari, gegrilltes Lachsfilet, Knoblauch, gemischter Salat', price: '22,90', popular: true },
    { name: 'Calamari Fritti', desc: 'Frittierte Calamari, gemischter Salat', price: '16,90' },
    { name: 'Calamari alla Griglia', desc: 'Gegrillte Calamari, Knoblauch, gemischter Salat', price: '16,90' },
    { name: 'Calamari alla Napoli', desc: 'Calamari mit Knoblauch in Tomatensauce, gemischter Salat', price: '16,90' },
    { name: 'Cozze al Forno', desc: 'Muscheln, delikate Sahnesauce, Knoblauch, Käse überbacken', price: '14,90' },
    { name: 'Cozze alla Napoli', desc: 'Muscheln, Knoblauch, Tomatensauce, Oliven, Kapern, Zwiebeln', price: '14,90' },
    { name: 'Cozze al Vino Bianco', desc: 'Muscheln, Knoblauch-Weissweinsauce', price: '14,90' },
    { name: 'Scampi alla Griglia', desc: 'gegrillte Scampi, Knoblauch, gemischter Salat', price: '20,90' },
    { name: 'Scampi alla Napoli', desc: 'Scampi, Tomatensauce, Knoblauch, gemischter Salat', price: '20,90' },
    { name: 'Gamberoni Vesuviana', desc: 'Riesenscampi, Cognac-Sahnesauce, Krabben, grüner Pfeffer, gemischter Salat', price: '21,90' },
    { name: 'Salmone Spinaci', desc: 'Lachs in Sahnesauce auf Spinatnudeln', price: '22,90' },
  ],
  antipasti: [
    { name: 'Lumache Romantica', desc: 'Schnecken, Sahnesauce, Knoblauch, Käse überbacken', price: '9,90' },
    { name: 'Lumache al Pepe', desc: 'Schnecken in grüner Pfeffersauce, Käse überbacken', price: '9,90' },
    { name: 'Lumache III', desc: 'Schnecken, Kräuterbutter, Käse überbacken', price: '9,90' },
    { name: 'Caprese', desc: 'Mozzarella, Tomaten, Gewürze', price: '10,90' },
    { name: 'Antipasta Parma', desc: 'Parmaschinken, Parmesan, Rucola, Cherrytomaten', price: '10,90' },
    { name: 'Antipasta Mista', desc: 'kalte Vorspeise nach Art des Hauses', price: '11,90' },
    { name: 'Carpaccio', desc: 'Rind, Rucolasalat, Parmesan, Cherrytomaten', price: '11,90' },
    { name: 'Bruschetta', desc: 'Tomaten, Mozzarella, Zwiebeln', price: '9,90' },
  ],
  omelette: [
    { name: 'Omelette Spinaci', desc: 'Spinat und gemischter Salat', price: '10,90' },
    { name: 'Omelette Prosciutto', desc: 'Schinken und gemischter Salat', price: '10,90' },
    { name: 'Omelette Tonnos', desc: 'Thunfisch, Zwiebeln und gemischter Salat', price: '10,90' },
    { name: 'Omelette Mozzarella', desc: 'Mozzarella und gemischter Salat', price: '10,90' },
    { name: 'Omelette Funghi', desc: 'Champignons und gemischter Salat', price: '10,90' },
  ],
  rice: [
    { name: 'Risotto del Pescatore', desc: 'Meeresfrüchte, Knoblauch, Tomatensauce', price: '11,90' },
    { name: 'Risotto Milanese', desc: 'Schinken, Champignons, Sahnesauce', price: '10,60' },
    { name: 'Risotto dello Chef', desc: 'Hähnchenfleisch, Champignons, Sahnesauce', price: '12,90' },
    { name: 'Risotto al Verdure', desc: 'Gemüse, Hähnchenbrust, in Olivenöl', price: '12,90' },
  ],
  vegetable: [
    { name: 'Zucchini mit Schinken', desc: 'in Tomaten-Sahnesauce, Käse überbacken', price: '10,60' },
    { name: 'Broccoli al Forno', desc: 'Broccoli, Kartoffeln in Spezialsauce, Käse überbacken', price: '10,60' },
    { name: 'Funghi al Forno', desc: 'Champignons in Spezialsauce, Käse überbacken', price: '10,60' },
    { name: 'Verdure al Forno', desc: 'verschiedene Gemüsearten, Knoblauch in Tomaten-Sahnesauce, Käse überbacken', price: '10,60' },
  ],
  desserts: [
    { name: 'Tiramisu', desc: 'Klassisches italienisches Tiramisu', price: '5,90', popular: true },
    { name: 'Panna Cotta', desc: 'Italienische Panna Cotta', price: '5,90' },
  ],
  drinks: [
    // Bier (Flaschen)
    { name: 'Bitburger Pils', desc: '0,33 l', price: '3,20' },
    { name: 'Bitburger Pils', desc: '0,5 l', price: '5,20' },
    { name: 'Bitburger Radler', desc: '0,33 l', price: '3,20' },
    { name: 'Bitburger Radler', desc: '0,5 l', price: '5,20' },
    { name: 'Bitburger Alsterwasser', desc: '0,33 l', price: '3,20' },
    { name: 'Bitburger Alsterwasser', desc: '0,5 l', price: '5,20' },
    { name: 'Bitburger mit Cola', desc: '0,33 l', price: '3,20' },
    { name: 'Bitburger mit Cola', desc: '0,5 l', price: '5,20' },
    { name: 'Köstritzer Schwarzbier', desc: '0,33 l', price: '3,90' },
    
    // Bier vom Fass
    { name: 'Benediktiner Hefeweissbier', desc: '0,5 l', price: '5,20' },
    { name: 'Benediktiner Weissbier Dunkel', desc: '0,5 l', price: '5,20' },
    { name: 'Benediktiner Weissbier Alkoholfrei', desc: '0,5 l', price: '5,20' },
    { name: 'Bitburger Alkoholfrei', desc: '0,33 l', price: '3,90' },
    { name: 'Radler Alkoholfrei', desc: '0,33 l', price: '3,90' },
    { name: 'Vitamalz Malzbier', desc: '0,33 l', price: '3,20' },
    
    // Heiße Getränke
    { name: 'Kaffee', desc: '', price: '2,40' },
    { name: 'Milchkaffee', desc: '', price: '3,20' },
    { name: 'Cappuccino', desc: 'mit Milch', price: '2,90' },
    { name: 'Latte Macchiato', desc: '', price: '3,40' },
    { name: 'Espresso', desc: '', price: '2,40' },
    { name: 'Espresso Doppio', desc: '', price: '3,60' },
    { name: 'Espresso Corretto', desc: 'mit einem Schuss Grappa', price: '4,20' },
    { name: 'Heiße Schokolade', desc: '', price: '2,90' },
    { name: 'Heißer Tee', desc: 'versch. Sorten', price: '2,20' },
    
    // Mineralwasser
    { name: 'Gerolsteiner classic', desc: '0,25 l', price: '2,60' },
    { name: 'Gerolsteiner classic', desc: '0,75 l', price: '5,90' },
    { name: 'Gerolsteiner Naturell', desc: '0,25 l', price: '2,60' },
    { name: 'Gerolsteiner Naturell', desc: '0,75 l', price: '5,90' },
    
    // Softdrinks
    { name: 'Coca-Cola', desc: '0,2 l', price: '2,60' },
    { name: 'Coca-Cola', desc: '0,4 l', price: '4,20' },
    { name: 'Coca-Cola light', desc: '0,2 l', price: '2,60' },
    { name: 'Coca-Cola light', desc: '0,4 l', price: '4,20' },
    { name: 'Coca-Cola Zero', desc: '0,2 l', price: '2,60' },
    { name: 'Coca-Cola Zero', desc: '0,4 l', price: '4,20' },
    { name: 'Fanta', desc: '0,2 l', price: '2,60' },
    { name: 'Fanta', desc: '0,4 l', price: '4,20' },
    { name: 'Sprite', desc: '0,2 l', price: '2,60' },
    { name: 'Sprite', desc: '0,4 l', price: '4,20' },
    { name: 'Mezzo Mix', desc: '0,2 l', price: '2,60' },
    { name: 'Mezzo Mix', desc: '0,4 l', price: '4,20' },
    { name: 'Orangensaft', desc: '0,2 l', price: '2,60' },
    { name: 'Orangensaft', desc: '0,4 l', price: '4,20' },
    { name: 'Apfelsaft', desc: '0,2 l', price: '2,60' },
    { name: 'Apfelsaft', desc: '0,4 l', price: '4,20' },
    { name: 'Maracujaschorle', desc: '0,2 l', price: '2,60' },
    { name: 'Maracujaschorle', desc: '0,4 l', price: '4,20' },
    { name: 'Gerolsteiner Apfelschorle', desc: '0,33 l', price: '3,60' },
    { name: 'Schwarzer Tee, Pfirsich', desc: '0,33 l', price: '3,60' },
    { name: 'Vio Schorle', desc: 'Johannisbeere oder Apfel, 0,25 l', price: '3,60' },
    
    // Offene Weine (Weißwein)
    { name: 'Pino Grigio Corte Nova IGT', desc: 'Italien, Venetien, 0,2 l', price: '5,20' },
    { name: 'Weißwein, lieblich', desc: 'Kollektion Pfalz, Deutschland, 0,2 l', price: '5,20' },
    
    // Offene Weine (Rotwein)
    { name: 'Merlot Rocca Bastia IGT', desc: 'Italien, Venetien, 0,2 l', price: '5,20' },
    { name: 'Lambrusco Rocca Bastian', desc: 'lieblich, Italien, Venetien, 0,2 l', price: '5,20' },
    { name: 'Rose', desc: '0,2 l', price: '5,20' },
    { name: 'Primitivo', desc: '0,2 l', price: '5,20' },
    { name: 'Rotwein', desc: 'Kroatien, 0,2 l', price: '5,20' },
    
    // Spirituosen (2 cl)
    { name: 'Haus Grappe', desc: '2 cl', price: '2,90' },
    { name: 'Ramazotti', desc: '2 cl', price: '2,90' },
    { name: 'Averna', desc: '2 cl', price: '2,90' },
    { name: 'Sambuca', desc: '2 cl', price: '2,90' },
    { name: 'Gernet Branca', desc: '2 cl', price: '2,90' },
    { name: 'Wodka', desc: '2 cl', price: '2,90' },
    { name: 'Eversbusch', desc: '2 cl', price: '2,90' },
    { name: 'Campari Orange', desc: '', price: '4,90' },
    { name: 'Ouzo', desc: '2 cl', price: '2,90' }
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
  item: { name: string; desc: string; price?: string; prices?: (string | undefined)[]; spicy?: boolean; vegetarian?: boolean; popular?: boolean }
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
  const pastaPage1 = menuData.pasta.slice(0, 13)
  const pastaPage2 = menuData.pasta.slice(13, 26)
  const pastaPage3 = menuData.pasta.slice(26)

  // Split fleisch items
  const fleischPage1 = menuData.fleisch.slice(0, 12)
  const fleischPage2 = menuData.fleisch.slice(12)
  
  // Split salate items
  const salateAll = menuData.salate

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

            {/* Antipasti */}
            <Page pageNumber={10}>
              <CategoryHeader title="Antipasti" subtitle="Vorspeisen" />
              <div className="space-y-0">
                {menuData.antipasti.map((item, i) => (
                  <MenuItem key={i} item={item} />
                ))}
              </div>
            </Page>

            {/* Gyros */}
            <Page pageNumber={11}>
              <CategoryHeader title="Gyros Gerichte" subtitle="mit Pommes & Salat" />
              <div className="space-y-0">
                {menuData.gyros.map((item, i) => (
                  <MenuItem key={i} item={item} />
                ))}
              </div>
            </Page>

            {/* Omelette & Rice */}
            <Page pageNumber={12}>
              <div className="mb-8">
                <CategoryHeader title="Omelette" subtitle="Frittata" />
                <div className="space-y-0">
                  {menuData.omelette.map((item, i) => (
                    <MenuItem key={i} item={item} />
                  ))}
                </div>
              </div>
              <div>
                <CategoryHeader title="Reis" subtitle="Risotto" />
                <div className="space-y-0">
                  {menuData.rice.map((item, i) => (
                    <MenuItem key={i} item={item} />
                  ))}
                </div>
              </div>
            </Page>

            {/* Vegetable Dishes */}
            <Page pageNumber={13}>
              <CategoryHeader title="Gemüse Gerichte" subtitle="Verdure" />
              <div className="space-y-0">
                {menuData.vegetable.map((item, i) => (
                  <MenuItem key={i} item={item} />
                ))}
              </div>
            </Page>

            {/* Salate */}
            <Page pageNumber={14}>
              <CategoryHeader title="Salate" subtitle="Insalate" />
              <p className="text-gray-500 text-xs text-center mb-4 font-medium">Größen: Klein | Groß</p>
              <div className="space-y-0">
                {salateAll.map((item, i) => (
                  <MenuItem key={i} item={item} showSizes twoSizes />
                ))}
              </div>
            </Page>

            {/* Desserts & Drinks */}
            <Page pageNumber={15}>
              <CategoryHeader title="Desserts & Getränke" subtitle="Dolci e Bevande" />
              <div className="mb-8">
                <h3 className="text-green-800 font-semibold text-lg mb-4 border-b border-green-800/20 pb-2">Desserts</h3>
                {menuData.desserts.map((item, i) => (
                  <MenuItem key={i} item={item} />
                ))}
              </div>
              <div>
                <h3 className="text-green-800 font-semibold text-lg mb-4 border-b border-green-800/20 pb-2">Heiße Getränke</h3>
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
