# Practical 1: Design a Responsive Restaurant Landing Page

| Experiment | Title | Real-Life Scenario | Concepts Covered |
| :---: | :--- | :--- | :--- |
| **1** | **Design a Responsive Restaurant Landing Page** | A restaurant wants a website that works seamlessly on mobile, tablet, and desktop devices. | **CSS Flexbox, Grid, Media Queries** |

---

## 📌 Project Overview
This project implements **Practical 1** for the **BLACK PLATE** restaurant landing page, matching the exact UI design and content from the lab manual specification.

- **Theme**: Luxury Black & White / Dark Slate aesthetic
- **Responsive Targets**: Mobile (<680px), Tablet (681px - 992px), and Desktop (>992px)
- **Technologies Used**: HTML5, Modern CSS3 (Flexbox, CSS Grid, Media Queries)

---

## 📁 File Structure
```
d:\dash\
│
├── index.html        # Semantic HTML5 markup matching the exact sections & text
├── styles.css        # Clean responsive styles using Flexbox, Grid & Media Queries
├── README.md         # Practical documentation & lab submission details
└── images/           # High-resolution offline image assets
    ├── hero.jpg      # Luxury restaurant dining hall
    ├── about.jpg     # Fine dining interior
    ├── steak.jpg     # Grilled Steak dish
    ├── pizza.jpg     # Italian Pizza
    └── burger.jpg    # Special Burger
```

---

## 🧩 Sections Included (Strictly as per UI Specification)
1. **Header / Navbar**:
   - Brand logo: `BLACK PLATE`
   - Navigation links: `Home`, `About`, `Menu`, `Contact`
   - Sticky top positioning with backdrop blur

2. **Hero Section**:
   - 2-Column layout on desktop (Flexbox)
   - Headline: `Luxury Dining Experience`
   - Description: `Experience premium cuisine crafted by world-class chefs. Enjoy unforgettable flavors in an elegant atmosphere.`
   - Call to Action button: `Reserve Table` (Pill-shaped)
   - Hero restaurant interior image

3. **About Us Section**:
   - 2-Column layout on desktop (Flexbox)
   - Restaurant interior image on left
   - Heading: `About Us`
   - Description: `BLACK PLATE delivers an unforgettable fine dining experience with handcrafted dishes, premium ingredients, and modern interiors. Whether it's family dinner or business meetings, every moment becomes memorable.`

4. **Our Signature Menu Section**:
   - 3-Column responsive card layout (CSS Grid)
   - Cards:
     - **Grilled Steak** (`$28`) - *Premium grilled steak served with fresh vegetables.*
     - **Italian Pizza** (`$18`) - *Fresh handmade pizza with authentic Italian cheese.*
     - **Special Burger** (`$20`) - *Juicy burger prepared with premium ingredients.*

5. **Features Section (Why Choose Us)**:
   - 3-Column card layout (CSS Grid)
   - Cards:
     - **Premium Quality** - *Fresh ingredients with world-class recipes.*
     - **Fast Service** - *Professional chefs and experienced staff.*
     - **Luxury Interior** - *Elegant black & white ambience for every occasion.*

6. **Reservation CTA Section**:
   - Centered CTA layout
   - Heading: `Reserve Your Table`
   - Timings: `Open Daily • 10:00 AM - 11:00 PM`
   - Call to Action button: `Book Now` (Pill-shaped)

7. **Footer**:
   - Centered copyright notice: `© 2026 BLACK PLATE Restaurant | Premium Dining Experience`

---

## 🎯 Implementation of Concepts Covered

### 1. CSS Flexbox
- **Navbar**: `display: flex; justify-content: space-between; align-items: center;`
- **Hero & About Sections**: `display: flex; align-items: center; justify-content: space-between; gap: 48px;`
- **Menu Card Details**: `display: flex; flex-direction: column;` to align titles, descriptions, and bottom price tags evenly.

### 2. CSS Grid
- **Menu Section**: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;`
- **Features Section**: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;`

### 3. Media Queries (Responsive Design)
- **Tablet (`max-width: 992px`)**:
  - Re-adjusts grid layouts from 3 columns to 2 columns for comfortable reading.
  - Decreases heading sizes for proportional hierarchy.
- **Mobile (`max-width: 680px`)**:
  - Navbar switches to vertical flex column layout.
  - Hero and About sections stack into single-column layouts with full-width images.
  - Menu and Features grids collapse into 1-column cards (`grid-template-columns: 1fr`).
  - Minimum touch targets (≥44px) maintained for links and buttons.

---

## 🚀 How to Run
Double-click `index.html` or open it with any web browser (Chrome, Edge, Firefox, Safari). All images load locally from the `images/` directory and will work completely offline.

