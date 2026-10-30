const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3002;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Health check probe for Dashboard
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'practical-5-news-portal' }));

app.use(express.static(path.join(__dirname, "..", "public")));

const categories = ["All", "National", "World", "Technology", "Business", "Sports", "Entertainment", "Science"];

const news = [
  {
    id: 1,
    category: "Technology",
    title: "AI tools are changing how students learn, create and work",
    summary: "New generations of AI assistants are becoming everyday tools for research, coding, writing and creative projects.",
    content: "Artificial intelligence is moving from experimentation into everyday workflows. Students and professionals are using AI assistants for research, coding, writing, planning and creative work. The biggest shift is not simply automation, but the ability to combine human judgment with fast digital assistance.",
    author: "Daily Pulse Desk",
    date: "October 8, 2026",
    time: "08:10 AM",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    trending: true
  },
  {
    id: 2,
    category: "National",
    title: "Cities focus on smarter public services and digital access",
    summary: "Local administrations are expanding digital-first services while improving access for citizens who prefer in-person support.",
    content: "Public services are increasingly being redesigned around simpler digital experiences. Alongside online portals, administrations are also emphasizing accessible offline support so that technology improves convenience without leaving people behind.",
    author: "News Bureau",
    date: "October 8, 2026",
    time: "07:45 AM",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1000&q=80",
    trending: true
  },
  {
    id: 3,
    category: "Business",
    title: "Small businesses adopt digital payments and local online stores",
    summary: "Entrepreneurs are combining neighborhood relationships with online discovery to reach more customers.",
    content: "Small businesses are increasingly using digital payments, social platforms and lightweight online stores. The approach allows local businesses to keep their community identity while becoming easier to discover and contact.",
    author: "Business Desk",
    date: "October 8, 2026",
    time: "07:20 AM",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
    category: "Sports",
    title: "Young athletes turn training data into a competitive advantage",
    summary: "Wearable technology and video analysis are helping players understand performance beyond the scoreboard.",
    content: "Sports teams are using accessible analytics to measure training load, movement and recovery. Coaches say data works best when it supports—not replaces—experience and direct observation.",
    author: "Sports Desk",
    date: "October 8, 2026",
    time: "06:55 AM",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=80",
    trending: true
  },
  {
    id: 5,
    category: "World",
    title: "Global cities share ideas for cleaner and more resilient neighborhoods",
    summary: "Urban planners are comparing practical approaches to public transport, heat management and green spaces.",
    content: "Cities around the world are sharing practical ideas for making neighborhoods more resilient. Projects include shaded public areas, improved transit connections and better use of existing urban spaces.",
    author: "World Desk",
    date: "October 8, 2026",
    time: "06:30 AM",
    image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 6,
    category: "Science",
    title: "Researchers explore new ways to make everyday technology more efficient",
    summary: "Energy efficiency and practical engineering remain major themes across current research projects.",
    content: "Researchers are studying ways to improve efficiency in everyday devices and infrastructure. The work spans materials, electronics and energy systems, with a focus on solutions that can scale beyond laboratories.",
    author: "Science Desk",
    date: "October 8, 2026",
    time: "06:10 AM",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 7,
    category: "Entertainment",
    title: "Streaming platforms experiment with shorter and more interactive formats",
    summary: "Creators are testing new storytelling styles designed for mobile-first audiences.",
    content: "Entertainment creators are experimenting with shorter episodes, interactive features and mobile-first storytelling. The trend reflects changing audience habits while traditional long-form productions remain popular.",
    author: "Culture Desk",
    date: "October 8, 2026",
    time: "05:40 AM",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 8,
    category: "Technology",
    title: "Web developers build faster interfaces with modern CSS and JavaScript",
    summary: "Responsive design continues to evolve as users expect smooth experiences across phones, tablets and laptops.",
    content: "Modern web development increasingly combines responsive CSS, accessible components and lightweight JavaScript. Developers are paying close attention to performance and usability across a wide range of screen sizes.",
    author: "Tech Desk",
    date: "October 7, 2026",
    time: "09:15 PM",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
    trending: true
  },
  {
    id: 9,
    category: "National",
    title: "Education projects put greater emphasis on practical digital skills",
    summary: "Schools and training programs are adding project-based activities to complement classroom learning.",
    content: "Practical projects can help learners connect classroom concepts with real-world tasks. Digital skills, presentation, teamwork and problem solving are increasingly being combined in project-based learning.",
    author: "Education Desk",
    date: "October 7, 2026",
    time: "08:40 PM",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 10,
    category: "Business",
    title: "Consumers compare value, convenience and trust before buying online",
    summary: "Clear product information and reliable service are becoming central to digital shopping decisions.",
    content: "Online shoppers increasingly compare more than price. Delivery reliability, transparent information, customer support and trust signals can all influence purchasing decisions.",
    author: "Business Desk",
    date: "October 7, 2026",
    time: "07:55 PM",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=80"
  }
];

app.locals.site = {
  name: "DAILY PULSE",
  tagline: "Your world. Your story. Every day."
};

app.get("/", (req, res) => {
  const trending = news.filter(n => n.trending);
  res.render("home", { news, trending, categories, activeCategory: "All", query: "" });
});

app.get("/category/:category", (req, res) => {
  const requested = req.params.category;
  const category = categories.find(c => c.toLowerCase() === requested.toLowerCase()) || "All";
  const filtered = category === "All" ? news : news.filter(n => n.category === category);
  res.render("home", {
    news: filtered,
    trending: news.filter(n => n.trending),
    categories,
    activeCategory: category,
    query: ""
  });
});

app.get("/search", (req, res) => {
  const query = String(req.query.q || "").trim();
  const lower = query.toLowerCase();
  const results = query
    ? news.filter(n =>
        [n.title, n.summary, n.category, n.content].some(value =>
          value.toLowerCase().includes(lower)
        )
      )
    : news;

  res.render("search", {
    news: results,
    trending: news.filter(n => n.trending),
    categories,
    activeCategory: "All",
    query
  });
});

app.get("/article/:id", (req, res) => {
  const article = news.find(n => n.id === Number(req.params.id));
  if (!article) return res.status(404).render("404", { categories });
  const related = news.filter(n => n.category === article.category && n.id !== article.id).slice(0, 3);
  res.render("article", { article, related, categories, activeCategory: article.category });
});

app.use((req, res) => res.status(404).render("404", { categories }));

app.listen(PORT, () => {
  console.log(`Daily Pulse running at http://localhost:${PORT}`);
});
