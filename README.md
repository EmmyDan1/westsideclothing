# Westside Clothing 🖤

A premium thrift e-commerce website built for a Lagos-based clothing business. Customers can browse shoes, jeans, and t-shirts, view product details, and checkout directly via WhatsApp. Simple, fast, and built to grow.

**Live site:** [westsideclothes.com](https://westsideclothes.com)

---

## What This Project Is

Westside Clothing is a hand-built storefront for a real thrift business. Every piece on the site is hand-picked and quality checked. The site was built to make it easy for customers to browse and order, and easy for the business owners to manage products without touching any code.

---

## What's Inside

- Browse products by category — Shoes, Jeans, T-shirts, New Arrivals
- Search for specific items
- Click any product image to view it fullscreen
- Add items to cart and checkout via WhatsApp with a pre-filled order message
- Mobile friendly from top to bottom
- Admin panel for uploading, editing, and deleting products directly from the live site

---

## Tech Stack

| Tool | What it's used for |
|---|---|
| React + Vite | Frontend framework |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Supabase | Database and image storage |
| Vercel | Hosting and deployment |
| GitHub | Version control |

**Fonts:** Playfair Display + DM Sans  
**Domain:** Registered on Spaceship, connected to Vercel

---

## Project Structure

```
westsideclothing/
├── src/
│   ├── lib/
│   │   └── supabase.js           # Supabase client and all database functions
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductCard.jsx
│   │   ├── CartSummary.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CategoryFilter.jsx
│   │   ├── Footer.jsx
│   │   └── admin/
│   │       ├── AdminLogin.jsx
│   │       ├── ProductForm.jsx
│   │       ├── ImageUploader.jsx
│   │       ├── ProductRow.jsx
│   │       └── SuccessMessage.jsx
│   ├── pages/
│   │   └── Admin.jsx
│   ├── App.jsx
│   └── index.css
├── .env                          # Your Supabase keys (never commit this)
├── vercel.json                   # Tells Vercel to handle React Router properly
├── tailwind.config.js
└── package.json
```

---

## Getting Started

If you're setting this up fresh on a new machine, here's everything you need:

**1. Clone the repo**
```bash
git clone https://github.com/EmmyDan1/westsideclothing.git
cd westsideclothing
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up your environment variables**

Create a `.env` file in the root folder and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
You can find both of these on your Supabase dashboard under Settings → API.

**4. Run the project locally**
```bash
npm run dev
```

The site will open at `http://localhost:5173`

---

## Supabase Setup

**Database table:** `products`

| Column | Type | Notes |
|---|---|---|
| id | int8 | Auto generated |
| name | text | Product name |
| category | text | Shoes, Jeans, T-shirts |
| price | numeric | In Naira |
| size | text | e.g. M, L, 42 |
| color | text | e.g. Black, Navy Blue |
| condition | text | New, New Arrivals, Hidden, Sold |
| main_image_url | text | Full public URL from storage |
| thumbnails | jsonb | Array of image URLs |
| is_sold | bool | Hides product from storefront when true |

**Storage bucket:** `products-image` (set to public)

**RLS:** Disabled on the products table so the storefront can read freely.

---

## Admin Panel

Visit `/admin` on the live site or locally to manage products.

The admin is password protected. To change the password open `src/components/admin/AdminLogin.jsx` and update the `ADMIN_PASSWORD` value at the top of the file.

From the admin you can:
- Add new products with images uploaded directly to Supabase storage
- Edit any existing product
- Mark products as sold
- Delete products

---

## Deployment

The project deploys automatically to Vercel every time you push to the `main` branch on GitHub.

Make sure these environment variables are added in your Vercel dashboard under **Settings → Environment Variables:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## Image Guidelines

To keep the site fast and within Supabase free tier limits, compress every image before uploading:

- Main product image — under 200KB
- Thumbnails — under 100KB
- Recommended tools: tinypng.com or imagecompressor.com
- Recommended format: JPG or WebP

---

## WhatsApp Checkout

When a customer clicks checkout, a WhatsApp message is automatically generated with their full order — product names, sizes, quantities, and total price. The message opens directly in WhatsApp.

To update the WhatsApp number, open `src/components/CartSummary.jsx` and update the `WHATSAPP_NUMBER` constant at the top. Use international format without the `+` sign:

```js
const WHATSAPP_NUMBER = '2349167194813'
```

---

## Built By

Developed by Daniel for Westside Clothing, Ibadan.  
A real project for a real business. Built with care from the ground up.
