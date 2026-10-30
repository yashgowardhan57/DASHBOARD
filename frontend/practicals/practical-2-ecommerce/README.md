# Practical 2: Build an E-commerce Product Catalog Layout

| Experiment | Title | Real-Life Scenario | Concepts Covered |
| :---: | :--- | :--- | :--- |
| **2** | **Build an E-commerce Product Catalog Layout** | An online shopping website needs an attractive product display with responsive cards and banners. | **CSS Grid, Flexbox, Responsive Design, Positioning** |

---

## 📌 Project Overview
This project implements **Practical 2** for the **JOGE STORE** e-commerce catalog layout, matching the exact UI design, components, and text from the lab manual reference.

- **Theme**: Modern Clean Commerce (Light background, Dark promotional banners & feature blocks)
- **Responsive Targets**: Mobile (<640px), Tablet (641px - 992px), Desktop (>992px)
- **Technologies Used**: HTML5, Modern CSS3 (Flexbox, CSS Grid, Positioning, Media Queries)

---

## 📁 File Structure
```
d:\dash\practical-2\
│
├── index.html         # Semantic HTML5 catalog page
├── styles.css         # Responsive styles (Flexbox, Grid, Positioning)
├── README.md          # Lab practical report & documentation
└── images/            # Local offline product & lifestyle imagery
    ├── headphones.jpg # Wireless Studio Headphones
    ├── watch.jpg      # Minimalist Smart Watch
    ├── shoes.jpg      # Crimson Running Shoes
    ├── tote.jpg       # Classic Leather Tote
    ├── boutique.jpg   # Flagship Boutique
    ├── openshop.jpg   # Curated Displays
    └── artisan.jpg    # Artisan Craftsmanship
```

---

## 🧩 Sections Included (Strictly as per UI Reference)
1. **Header / Navbar**:
   - Brand name: `JOGE STORE`
   - Navigation links: `Home`, `Catalog`, `Cart (0)`
   - Sticky positioning (`position: sticky; top: 0;`)

2. **Promotional Hero Banner**:
   - Badge: `LIMITED OFFER`
   - Title: `Exclusive Summer Collection`
   - Description: `Upgrade your style with top-rated items at up to 40% off.`

3. **Featured Products Section**:
   - Title: `Featured Products` with custom dark underline accent
   - 4-Column responsive product grid (`CSS Grid`)
   - Product Cards with:
     - Absolute positioned badges: `Sale` on Headphones, `Hot` on Running Shoes
     - Category labels: `AUDIO`, `WEARABLES`, `FOOTWEAR`, `ACCESSORIES`
     - Product Titles & dual-price display (current & strikethrough original price)
     - `Add to Cart` call-to-action button

4. **The Aura Lifestyle Experience Section**:
   - Title: `The Aura Lifestyle Experience` with underline accent
   - Subtitle: `Curated for quality, built for everyday elegance.`
   - 3-Column lifestyle card grid with dark gradient overlay and bottom-left positioned text:
     - `Flagship Boutique`
     - `Curated Displays`
     - `Artisan Craftsmanship`

5. **Features Section (Dark Contrast Container)**:
   - 3-Column card layout (`CSS Grid`)
   - Feature 1: `Free Express Shipping` (`🚚`) - *On all orders over $50. Delivered right to your doorstep within 2-3 business days.*
   - Feature 2: `2-Year Warranty` (`🛡️`) - *All products come with our extended manufacturer coverage and 30-day money back guarantee.*
   - Feature 3: `24/7 Dedicated Support` (`🎧`) - *Our customer experience team is always active to assist with queries or returns.*

---

## 🎯 Implementation of Concepts Covered

### 1. CSS Flexbox
- **Navbar**: `display: flex; justify-content: space-between; align-items: center;`
- **Product Card Layout**: `display: flex; flex-direction: column;` to align card contents and push buttons to equal baseline.
- **Price Container**: `display: flex; align-items: baseline; gap: 8px;`

### 2. CSS Grid
- **Products Grid**: `display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px;`
- **Lifestyle Grid**: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;`
- **Features Grid**: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px;`

### 3. CSS Positioning
- **Sticky Navbar**: `position: sticky; top: 0; z-index: 1000;`
- **Product Badges (`Sale`, `Hot`)**: `position: absolute; top: 10px; left: 10px;` over relative image wrapper.
- **Lifestyle Labels**: `position: absolute; bottom: 16px; left: 18px;` over dark gradient overlay.

### 4. Responsive Design (Media Queries)
- **Tablet (`max-width: 992px`)**: Products and lifestyle collapse from 4/3 columns to 2 columns.
- **Mobile (`max-width: 640px`)**: Complete single-column layout (`grid-template-columns: 1fr`) with stacked navigation.

