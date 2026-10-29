// Demonstration News Articles for Practical 5 — The Daily Chronicle
// Supports both Browser Window and Node.js CommonJS

const articles = [
  {
    id: 1,
    title: "Next-Generation Web Standards: How Modern Browsers Are Revolutionizing Performance",
    slug: "next-generation-web-standards-browsers-performance",
    category: "Technology",
    summary: "From WebAssembly components to native CSS nesting and scroll-driven animations, explore how browser engines are delivering unprecedented client-side speed.",
    content: `
      <p>The web platform is advancing at a breathtaking velocity. Over the past twelve months, the browser consensus mechanism has ratified features that developers once required heavy preprocessors and runtime libraries to achieve.</p>
      <p>Key among these breakthroughs is native CSS nesting, which has gained universal browser support, alongside container queries that allow components to respond dynamically to their parents rather than the full viewport. Furthermore, hardware-accelerated WebAssembly modules enable heavy computational tasks — such as client-side image processing, cryptography, and real-time audio synthesis — to execute at near-native speeds directly in the browser thread.</p>
      <p>As engineering teams deprecate legacy polyfills and transition toward modular native JavaScript and semantic web elements, initial page payload sizes have plunged by up to 40% in enterprise benchmarks. The future of software architecture continues its inexorable migration towards decentralized, high-fidelity browser applications.</p>
    `,
    author: "Elena Rostova",
    date: "October 24, 2026",
    readTime: "4 min read",
    isFeatured: true,
    isTrending: true,
    views: 14820,
    tags: ["Web Dev", "Performance", "Browsers", "CSS"],
    imageGradient: "linear-gradient(135deg, #1E3A8A, #3B82F6)",
    imageEmoji: "⚡",
    image: null
  },
  {
    id: 2,
    title: "Higher Education Institutions Adopt AI-Assisted Interactive Coding Curriculum",
    slug: "higher-education-adopts-ai-interactive-coding",
    category: "Education",
    summary: "Leading technical universities are integrating live pair-programming assistants into laboratory courses to teach deeper architectural reasoning.",
    content: `
      <p>Universities worldwide are fundamentally updating their computer science and information technology pedagogy. Rather than banning artificial intelligence tools, computer science departments are mandating active code auditing and architectural inspection in sophomore and junior laboratory practicals.</p>
      <p>“The modern engineer needs to excel at problem decomposition, verifying edge cases, and auditing security vectors rather than writing boilerplate syntax from scratch,” explains Dr. Marcus Vance, Chair of Computing at the National Institute of Technology.</p>
      <p>Students now spend the majority of laboratory sessions testing multi-tier architectures, benchmarking PostgreSQL query plans, and conducting peer code reviews on reactive component libraries.</p>
    `,
    author: "Julian Chen",
    date: "October 23, 2026",
    readTime: "3 min read",
    isFeatured: false,
    isTrending: true,
    views: 9240,
    tags: ["Education", "Curriculum", "Coding", "AI"],
    imageGradient: "linear-gradient(135deg, #065F46, #10B981)",
    imageEmoji: "🎓",
    image: null
  },
  {
    id: 3,
    title: "Global Semiconductor Supply Chains Stabilize as New Foundry Nodes Enter Production",
    slug: "global-semiconductor-foundry-nodes-production",
    category: "Business",
    summary: "Venture investments in domestic chip fabrication plants are yielding initial commercial wafers, easing automotive and consumer tech lead times.",
    content: `
      <p>Following years of multi-billion dollar capital expenditure, next-generation semiconductor fabrication complexes across Europe, North America, and East Asia have commenced volume wafer distribution.</p>
      <p>Industry analysts project a steady reduction in component lead times for automotive microcontroller units and edge IoT sensors. Corporate technology margins, which had been strained by premium broker surcharges, are showing strong signs of stabilization heading into the upcoming fiscal quarter.</p>
    `,
    author: "Samantha Sterling",
    date: "October 22, 2026",
    readTime: "5 min read",
    isFeatured: false,
    isTrending: false,
    views: 6510,
    tags: ["Business", "Semiconductors", "Supply Chain", "Finance"],
    imageGradient: "linear-gradient(135deg, #78350F, #D97706)",
    imageEmoji: "📈",
    image: null
  },
  {
    id: 4,
    title: "Champions League Quarterfinals: High-Press Tactics Redefine Modern European Football",
    slug: "champions-league-tactics-modern-football",
    category: "Sports",
    summary: "Advanced telemetry tracking reveals how data-driven pressing schemes are breaking traditional low-block defenses in record time.",
    content: `
      <p>The intersection of sports analytics and pitch execution has reached a new peak in this season's European club football tournaments. High-frequency wearable telemetry and optical tracking cameras now analyze team compactness in real time.</p>
      <p>Tactical managers are leveraging instant spatial heatmaps during halftime intervals, resulting in significantly higher transition scoring rates within the first ten minutes of second-half resumptions.</p>
    `,
    author: "Mateo Rossi",
    date: "October 24, 2026",
    readTime: "4 min read",
    isFeatured: false,
    isTrending: true,
    views: 11200,
    tags: ["Sports", "Football", "Analytics", "Champions League"],
    imageGradient: "linear-gradient(135deg, #831843, #EC4899)",
    imageEmoji: "⚽",
    image: null
  },
  {
    id: 5,
    title: "Cinematic Virtual Production Studios Replace Green Screens with Real-Time LED Volumes",
    slug: "virtual-production-led-volumes-cinema",
    category: "Entertainment",
    summary: "Independent filmmakers and blockbuster studios alike embrace in-camera visual effects powered by game engines and massive digital walls.",
    content: `
      <p>Virtual production has transformed the economics and creative freedom of modern cinema. By synchronizing camera motion with photorealistic real-time 3D environments projected onto curved LED walls, directors can capture practical lighting and realistic reflections directly in camera.</p>
      <p>Post-production schedules have dropped by several months, while actors benefit from immediate immersion within the scene rather than performing against blank monochromatic backdrops.</p>
    `,
    author: "Clara Moreau",
    date: "October 21, 2026",
    readTime: "3 min read",
    isFeatured: false,
    isTrending: false,
    views: 7890,
    tags: ["Entertainment", "Cinema", "Virtual Production", "VFX"],
    imageGradient: "linear-gradient(135deg, #4C1D95, #8B5CF6)",
    imageEmoji: "🎬",
    image: null
  },
  {
    id: 6,
    title: "Open-Source Relational Databases Advance with Native JSON Query Optimization",
    slug: "open-source-relational-databases-json-performance",
    category: "Technology",
    summary: "Engineers bridge document convenience with ACID compliance as relational storage engines match specialized NoSQL latency.",
    content: `
      <p>The classic debate between document-oriented storage and relational tabular data has arrived at an elegant synthesis. Through specialized inverted indices and binary JSON representations, modern relational engines provide sub-millisecond document traversal without compromising strict foreign key integrity.</p>
      <p>Developers enjoy the agility of rapid prototyping with unstructured schemas alongside the rock-solid consistency and reporting power of SQL queries.</p>
    `,
    author: "Elena Rostova",
    date: "October 20, 2026",
    readTime: "4 min read",
    isFeatured: false,
    isTrending: false,
    views: 8320,
    tags: ["Database", "SQL", "Technology", "Backend"],
    imageGradient: "linear-gradient(135deg, #1E293B, #0284C7)",
    imageEmoji: "💾",
    image: null
  },
  {
    id: 7,
    title: "Hybrid Learning Frameworks Show 28% Improvement in Laboratory Mastery",
    slug: "hybrid-learning-frameworks-laboratory-mastery",
    category: "Education",
    summary: "Combining on-demand interactive simulators with hands-on hardware benches yields superior conceptual retention among engineering undergraduates.",
    content: `
      <p>A multi-university longitudinal study tracking thousands of engineering candidates has validated hybrid pedagogical approaches. Students who simulate circuit behavior or software deployments prior to physical laboratory sessions demonstrate markedly higher comprehension in oral viva assessments.</p>
    `,
    author: "Julian Chen",
    date: "October 19, 2026",
    readTime: "3 min read",
    isFeatured: false,
    isTrending: false,
    views: 5410,
    tags: ["Education", "Engineering", "STEM", "Learning"],
    imageGradient: "linear-gradient(135deg, #064E3B, #059669)",
    imageEmoji: "📚",
    image: null
  },
  {
    id: 8,
    title: "Renewable Microgrid Investments Surge Across Emerging Manufacturing Hubs",
    slug: "renewable-microgrids-manufacturing-surge",
    category: "Business",
    summary: "Decentralized rooftop solar paired with commercial battery energy storage provides uninterrupted industrial power during peak grid demand.",
    content: `
      <p>Industrial parks are accelerating private microgrid installations to safeguard continuous manufacturing operations against volatile regional grid fluctuations. Return on investment horizons have narrowed to under four years due to advances in lithium iron phosphate storage density.</p>
    `,
    author: "Samantha Sterling",
    date: "October 18, 2026",
    readTime: "4 min read",
    isFeatured: false,
    isTrending: false,
    views: 4980,
    tags: ["Business", "Energy", "Sustainability", "Industry"],
    imageGradient: "linear-gradient(135deg, #713F12, #CA8A04)",
    imageEmoji: "☀️",
    image: null
  }
];

const categories = ["Technology", "Education", "Business", "Sports", "Entertainment"];

if (typeof window !== 'undefined') {
  window.NEWS_ARTICLES = articles;
  window.NEWS_CATEGORIES = categories;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    articles,
    categories,
    getFeaturedArticle: function() {
      return articles.find(function(a) { return a.isFeatured; }) || articles[0];
    },
    getTrendingArticles: function() {
      return articles.filter(function(a) { return a.isTrending; });
    },
    getArticlesByCategory: function(catName) {
      return articles.filter(function(a) {
        return a.category.toLowerCase() === catName.toLowerCase();
      });
    },
    getArticleById: function(id) {
      return articles.find(function(a) { return a.id === parseInt(id, 10); });
    },
    searchArticles: function(query) {
      if (!query) return [];
      var q = query.toLowerCase();
      return articles.filter(function(a) {
        return (
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.author.toLowerCase().includes(q) ||
          a.tags.some(function(t) { return t.toLowerCase().includes(q); })
        );
      });
    }
  };
}
