# Practical 2: E-commerce Product Catalog Layout

**Title:** Build an E-commerce Product Catalog Layout  
**Technology:** HTML5 and CSS3 Only (No JavaScript, No Backend, No Database)  
**Theme:** Classic Luxury Retail (Ivory, Beige, Dark Brown, and Muted Gold)  
**Developer:** Yash Gowardhan (B.Tech IT, 3rd Year)

---

## 📖 Overview
A multi-page luxury storefront for *Aurum*, showcasing an editorial shopping experience crafted strictly using HTML5 semantics and modern CSS3 (CSS Grid, Flexbox, Custom Properties, and pseudo-class state selection).

## 📄 Pages Included
1. **Home (`index.html`):** Large promotional autumn/winter banner, category highlights, new arrivals showcase, seasonal sale banner.
2. **Catalog (`catalog.html`):** Complete product catalog grid with category filter navigation, sale tags, and badges.
3. **Product Detail (`product-detail.html`):** Deep editorial view with image gallery, rating stars, price discount calculation, pure CSS radio button size and color selectors, and expandable details accordion (`<details>` / `<summary>`).

## 🛠️ Key HTML/CSS Techniques
- **Zero JavaScript:** Interactive size and color selectors rely strictly on `<input type="radio" class="size-radio">` and adjacent sibling selectors (`:checked + label`).
- **Responsive Grid:** `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` ensures seamless card scaling on phone, tablet, and desktop.
- **Micro-Interactions:** Subtle image zooms, elevation shifts, and color swatch expansions on hover.

## 🚀 How to Run
Open `index.html` directly in any web browser:
```bash
start index.html
```
Or view via Practical Hub at: `http://localhost:3000/practical-2-ecommerce/index.html`
