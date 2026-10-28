const express = require('express');
const path = require('path');
const newsData = require('./data/articles');

const app = express();
const PORT = process.env.PORT || 3002;

// Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Global template variables
app.use(function (req, res, next) {
  res.locals.categories = newsData.categories;
  res.locals.currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  res.locals.currentPath = req.path;
  next();
});

// ---- Routes ----

// Health check endpoint
app.get('/api/health', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.json({
    ok: true,
    service: 'Practical 5 News Portal',
    port: PORT
  });
});

// Home — Newspaper Homepage
app.get('/', function (req, res) {
  const featured = newsData.getFeaturedArticle();
  const trending = newsData.getTrendingArticles();
  const allArticles = newsData.articles;
  const latest = allArticles.filter(function (a) { return a.id !== featured.id; });

  res.render('index', {
    title: 'The Daily Chronicle — Independent News & Analysis',
    featured,
    trending,
    latest,
    pageCategory: 'Home'
  });
});

// Category Page
app.get('/category/:name', function (req, res) {
  const catName = req.params.name;
  const articles = newsData.getArticlesByCategory(catName);

  res.render('category', {
    title: `${catName} — The Daily Chronicle`,
    categoryName: catName,
    articles,
    pageCategory: catName
  });
});

// Article Detail Page
app.get('/article/:id', function (req, res) {
  const article = newsData.getArticleById(req.params.id);

  if (!article) {
    return res.status(404).render('404', {
      title: 'Article Not Found — The Daily Chronicle',
      message: 'The requested news story could not be located in our archive.',
      pageCategory: ''
    });
  }

  // Related articles in same category
  const related = newsData.articles
    .filter(function (a) { return a.category === article.category && a.id !== article.id; })
    .slice(0, 3);

  res.render('article', {
    title: `${article.title} — The Daily Chronicle`,
    article,
    related,
    pageCategory: article.category
  });
});

// Search Route (Server-side query processing)
app.get('/search', function (req, res) {
  const query = req.query.q || '';
  const results = newsData.searchArticles(query);

  res.render('search', {
    title: `Search: "${query}" — The Daily Chronicle`,
    query,
    results,
    pageCategory: ''
  });
});

// 404 Handler
app.use(function (req, res) {
  res.status(404).render('404', {
    title: 'Page Not Found — The Daily Chronicle',
    message: 'The page you are looking for does not exist.',
    pageCategory: ''
  });
});

// Start Server
app.listen(PORT, function () {
  console.log(`📰 News Portal Server running on http://localhost:${PORT}`);
  console.log(`   Homepage: http://localhost:${PORT}/`);
  console.log(`   Category: http://localhost:${PORT}/category/Technology`);
});
