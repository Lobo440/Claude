# PawTag 3D — Landing Page

A modern, responsive landing page for a business that sells custom **3D-printed
keychains crafted from a customer's pet photo**. Built with **React + Vite**.

## Features

- Sticky, responsive navbar with mobile menu
- Hero with animated floating keychain
- "How it works" 3-step explainer
- Gallery of sample pieces
- Feature highlights and pricing tiers
- Customer testimonials
- Order form with photo upload + success state (front-end only)
- Fully responsive and accessible (reduced-motion friendly)

## Getting started

```bash
cd website
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## Project structure

```
website/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── HowItWorks.jsx
        ├── Gallery.jsx
        ├── Features.jsx
        ├── Pricing.jsx
        ├── Testimonials.jsx
        ├── OrderCTA.jsx
        └── Footer.jsx
```

## Customizing

- **Brand & copy:** text lives directly in each component under `src/components/`.
- **Colors & spacing:** edit the CSS custom properties at the top of `src/index.css`.
- **Pet images:** sample pieces currently use emoji placeholders in
  `Gallery.jsx` and `Hero.jsx` — swap these for real product photos.
- **Order form:** `OrderCTA.jsx` handles submission on the front end only.
  Wire `handleSubmit` to your backend, email service, or e-commerce/checkout
  provider to accept real orders and uploads.
