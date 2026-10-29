# Practical 5: Responsive News Portal (EJS & Express)

**Title:** Design a Responsive News Portal Homepage  
**Technology:** EJS, Node.js, Express.js, HTML5, and CSS3 (No Database)  
**Theme:** Newspaper White, Ink Black, and Muted Red (`#C41E3A`)  
**Developer:** Yash Gowardhan (B.Tech IT, 3rd Year)

---

## 📖 Overview
*The Daily Chronicle* is a multi-page editorial news portal demonstrating server-side template rendering with EJS. It includes reusable partials, route-driven category filtering, dynamic article views, and server-side query search over a local JSON demonstration archive.

> **Constraint Compliance:** This practical **does not connect to a database**. All sample demonstration data is managed in `data/articles.js`.

---

## 📄 Architecture & Routes
- `GET /` — Front page with trending ticker, hero cover story, latest dispatches, and desk highlights.
- `GET /category/:name` — Filtered category views (Technology, Education, Business, Sports, Entertainment).
- `GET /article/:id` — Deep article view with author byline, full prose, tags, and related stories.
- `GET /search?q=...` — Server-side article search filtering titles, summaries, tags, and authors.

### Reusable EJS Partials
- `views/partials/header.ejs` — Newspaper masthead, edition metadata, search bar, and navigation.
- `views/partials/footer.ejs` — Editorial colophon, links, and student developer credits.
- `views/partials/news-card.ejs` — Reusable story card component.

---

## 🚀 Setup & Execution Instructions

```bash
# 1. Navigate to directory
cd practical-5-news-portal

# 2. Install dependencies (express, ejs)
npm install

# 3. Start server
npm start
```

Access in your browser:
- **Homepage:** `http://localhost:3002/`
- **Technology Desk:** `http://localhost:3002/category/Technology`
- **Article Detail:** `http://localhost:3002/article/1`
- **Search Query:** `http://localhost:3002/search?q=browsers`
- **Launcher & Status Probe:** `http://localhost:3000/practical-5-news-portal/index.html`
