# Daily Pulse — Responsive News Portal

A complete news portal built with:

- Node.js
- Express
- EJS
- HTML5
- CSS Grid
- Flexbox
- Media Queries
- z-index / sticky navigation
- Vanilla JavaScript

## No Database

This project intentionally does **not** use MongoDB, MySQL, Firebase, SQLite, or any other database.

All news is stored as a JavaScript array inside:

`server.js`

You can replace the sample news with your own raw data.

## Features

- Responsive desktop, laptop, tablet and mobile layout
- Working navbar
- Mobile hamburger menu
- Working search
- Category filtering
- Trending news section
- News article pages
- Related stories
- Breaking-news ticker
- Local/raw data only
- No login required
- No database
- EJS reusable partials
- CSS Grid + Flexbox
- Sticky header and sidebar
- 404 page

## Run on localhost

### 1. Install Node.js

Install a current LTS version of Node.js.

### 2. Open the project folder

```bash
cd news_portal_ejs
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
npm start
```

### 5. Open in browser

`http://localhost:3000`

For automatic restart while editing:

```bash
npm run dev
```

## Change the news data

Open:

`server.js`

Find:

```js
const news = [
```

Each story follows this structure:

```js
{
  id: 1,
  category: "Technology",
  title: "Your headline",
  summary: "Short description",
  content: "Full article content",
  author: "Your Name",
  date: "October 8, 2026",
  time: "08:10 AM",
  image: "https://example.com/image.jpg",
  featured: true,
  trending: true
}
```

Add or remove stories from the array.

## Project structure

```text
news_portal_ejs/
├── package.json
├── server.js
├── README.md
├── views/
│   ├── home.ejs
│   ├── search.ejs
│   ├── article.ejs
│   ├── 404.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
└── public/
    ├── css/
    │   └── style.css
    ├── js/
    │   └── app.js
    └── images/
```

## Important

The demo uses remote Unsplash image URLs for sample stories. If you want the portal to work completely offline, download your own images into `public/images/` and replace the image URLs in `server.js` with paths such as:

```text
/images/my-news-image.jpg
```
