# Bric & Broc

A tongue-in-cheek second-hand marketplace built with React. Browse a "bargain bin" of random items, add them to a cart, and pay with fake in-app credit, all wrapped in a taped-cardboard, scrapbook look.

Product data comes from the public [DummyJSON](https://dummyjson.com) API, so no backend or API key is needed.

## Features

- **Bargain Bin**: product grid with search, category filters and price sorting
- **Product page**: photo gallery, details and add-to-cart button
- **Cart**: adjust quantities, 20% tax, checkout using credit (starts at $1000)
- **Box Depot**: form to list an item for sale (visual only, not wired to an API yet)

The cart and credit balance are saved in `localStorage`, so they survive a page refresh.

## Tech stack

React · TypeScript · Vite · Tailwind CSS v4 · React Router

## Getting started

Requires [Node.js](https://nodejs.org) (LTS recommended).

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
```

Other scripts:

```bash
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Project structure
 
```
src/
├── api/              # DummyJSON fetch helpers (product list, single product, post product)
├── assets/           # Static images and SVGs
├── components/
│   ├── Basic/        # Small reusable UI pieces (Tape, Tag, Panel, BuyButton…)
│   │   └── Form/     # Taped form fields (TextInput, TextArea, Select)
│   ├── BargainBin/   # Product grid with search, filters and sorting
│   ├── Footer/
│   ├── Header/       # Logo, search, navigation, cart total and credit
│   └── ProductCard/  # Single product tile used in the grid
├── contexts/
│   ├── Cart/         # Cart state (reducer + localStorage)
│   └── Credit/       # Credit balance (localStorage)
├── pages/
│   ├── BoxDepot/     # "List an item" form
│   ├── Cart/         # Cart page, line items and checkout summary
│   ├── Home/         # Hero + Bargain Bin
│   └── ProductPage/  # Product detail page
├── types/            # Product type and category enum
├── utils/            # Deterministic tilt/random helpers, relative time
├── App.tsx           # Layout and routes
├── main.tsx          # Entry point, router and context providers
└── index.css         # Tailwind import and global styles
```

## Resetting your credit

To start over with a fresh cart and $1000 credit, clear the `bric-broc-cart` and `bric-broc-credit` keys from your browser's local storage.