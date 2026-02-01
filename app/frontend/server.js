const http = require("http");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const HOST = process.env.HOST || "0.0.0.0";
const BACKEND_URL = process.env.BACKEND_URL || "http://127.0.0.1:3000";

const courseCarousels = [
  {
    title: "Mathematics Foundations",
    courses: [
      {
        title: "Calculus Basics",
        description: "Limits, derivatives, and intuitive change models.",
        level: "Foundation",
      },
      {
        title: "Differential Calculus",
        description: "Rules, applications, and optimization techniques.",
        level: "Intermediate",
      },
      {
        title: "Integral Calculus",
        description: "Area, accumulation, and real-world integration.",
        level: "Intermediate",
      },
    ],
  },
  {
    title: "Cloud Computing — Concepts & Trade-offs",
    courses: [
      {
        title: "Why Cloud Exists",
        description: "Economic and operational drivers of cloud adoption.",
        level: "Foundation",
      },
      {
        title: "Cloud Advantages and Limitations",
        description: "Benefit analysis without ignoring constraints.",
        level: "Foundation",
      },
      {
        title: "When NOT to Use Cloud",
        description: "Decision signals for regulated or latency-bound systems.",
        level: "Intermediate",
      },
      {
        title: "Shared Responsibility Model Explained",
        description: "Clear boundaries between provider and customer control.",
        level: "Foundation",
      },
      {
        title: "Cloud vs On-Prem vs Hybrid",
        description: "Trade-off matrix for architecture selection.",
        level: "Intermediate",
      },
    ],
  },
];

const topRatedCourses = [
  {
    title: "Shared Responsibility Model Explained",
    rating: 4.9,
    reviews: 1263,
  },
  {
    title: "Differential Calculus",
    rating: 4.8,
    reviews: 982,
  },
  {
    title: "Cloud vs On-Prem vs Hybrid",
    rating: 4.8,
    reviews: 874,
  },
];

const mostEnrolledCourses = [
  {
    title: "Why Cloud Exists",
    enrolled: "18,420",
    category: "Cloud Fundamentals",
  },
  {
    title: "Calculus Basics",
    enrolled: "14,905",
    category: "Mathematics Foundations",
  },
  {
    title: "Cloud Advantages and Limitations",
    enrolled: "13,270",
    category: "Cloud Fundamentals",
  },
];

const pricingPlans = [
  {
    name: "Free",
    price: "Rp0",
    description: "Limited access for orientation and sampling.",
    features: ["Introductory materials", "Community access", "Email support"],
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: "Rp249K / month",
    description: "Full access to selected career tracks.",
    features: ["Selected course access", "Monthly or yearly billing", "Progress tracking"],
    cta: "Choose Professional",
  },
  {
    name: "Full Access",
    price: "Rp499K / month",
    description: "All courses with priority updates.",
    features: ["All course access", "Priority updates", "Certificate tracking"],
    cta: "Choose Full Access",
  },
];

const sitemapLinks = [
  { label: "/", href: "/" },
  { label: "/courses", href: "/courses" },
  { label: "/courses/mathematics", href: "/courses/mathematics" },
  { label: "/courses/cloud", href: "/courses/cloud" },
  { label: "/pricing", href: "/pricing" },
  { label: "/about", href: "/about" },
  { label: "/contact", href: "/contact" },
  { label: "/terms", href: "/terms" },
];

const footerLinks = [
  { label: "About Cloud Diktat", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Pricing", href: "/pricing" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
  { label: "Sitemap", href: "/#sitemap" },
];

const renderCourseCards = (courses) =>
  courses
    .map(
      (course) => `
        <article class="card course-card">
          <div class="card-header">
            <h3>${course.title}</h3>
            <span class="badge">${course.level}</span>
          </div>
          <p>${course.description}</p>
          <button class="ghost-button">View Course</button>
        </article>
      `
    )
    .join("");

const renderCarousel = (carousel) => `
  <section class="section">
    <div class="section-header">
      <h2>${carousel.title}</h2>
      <span class="section-meta">Curated sequence</span>
    </div>
    <div class="carousel">
      ${renderCourseCards(carousel.courses)}
    </div>
  </section>
`;

const renderRatingCards = (courses) =>
  courses
    .map(
      (course) => `
        <article class="card stat-card">
          <h3>${course.title}</h3>
          <div class="stat-row">
            <span class="stat-value">${course.rating}</span>
            <span class="stat-label">rating</span>
          </div>
          <p>${course.reviews.toLocaleString("en-US")} reviews</p>
        </article>
      `
    )
    .join("");

const renderEnrollmentCards = (courses) =>
  courses
    .map(
      (course) => `
        <article class="card stat-card">
          <h3>${course.title}</h3>
          <div class="stat-row">
            <span class="stat-value">${course.enrolled}</span>
            <span class="stat-label">learners</span>
          </div>
          <p>${course.category}</p>
        </article>
      `
    )
    .join("");

const renderPricingCards = (plans) =>
  plans
    .map(
      (plan) => `
        <article class="card pricing-card">
          <div>
            <h3>${plan.name}</h3>
            <p class="price">${plan.price}</p>
            <p class="muted">${plan.description}</p>
          </div>
          <ul>
            ${plan.features.map((feature) => `<li>${feature}</li>`).join("")}
          </ul>
          <button class="primary-button">${plan.cta}</button>
        </article>
      `
    )
    .join("");

const renderSitemap = (links) =>
  links
    .map(
      (link) => `
        <li>
          <a href="${link.href}">${link.label}</a>
        </li>
      `
    )
    .join("");

const renderFooterLinks = (links) =>
  links
    .map((link) => `<a href="${link.href}">${link.label}</a>`)
    .join("");

const renderPage = () => `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Cloud Diktat — Professional Learning</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">
      <style>
        :root {
          color-scheme: light;
          --blue-900: #0A2540;
          --red-600: #C1121F;
          --bg: #F8FAFC;
          --text: #0F172A;
          --muted: #64748B;
          --card: #FFFFFF;
          --border: #E2E8F0;
          --shadow: 0 18px 48px rgba(15, 23, 42, 0.08);
          --radius: 18px;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: "Source Serif 4", "Georgia", serif;
          background: radial-gradient(circle at top, #FFFFFF 0%, #F1F5F9 38%, var(--bg) 100%);
          color: var(--text);
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        header {
          background: var(--blue-900);
          color: #F8FAFC;
          padding: 28px 8vw;
        }

        nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        nav .logo {
          font-family: "Space Grotesk", sans-serif;
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 0.6px;
        }

        nav .nav-links {
          display: flex;
          gap: 18px;
          font-family: "Space Grotesk", sans-serif;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.8;
        }

        .hero {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 40px;
          align-items: center;
          padding: 60px 8vw 80px;
        }

        .hero h1 {
          font-size: clamp(2.6rem, 3.5vw, 3.6rem);
          margin-bottom: 16px;
          font-family: "Space Grotesk", sans-serif;
        }

        .hero p {
          font-size: 1.05rem;
          color: rgba(248, 250, 252, 0.88);
          margin-bottom: 28px;
          line-height: 1.6;
        }

        .hero-card {
          background: rgba(248, 250, 252, 0.08);
          border: 1px solid rgba(248, 250, 252, 0.15);
          border-radius: var(--radius);
          padding: 24px;
          display: grid;
          gap: 16px;
          color: #F8FAFC;
        }

        .primary-button {
          background: var(--red-600);
          color: #FFFFFF;
          border: none;
          border-radius: 999px;
          padding: 12px 26px;
          font-weight: 600;
          font-family: "Space Grotesk", sans-serif;
          cursor: pointer;
        }

        .ghost-button {
          background: transparent;
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 8px 16px;
          font-family: "Space Grotesk", sans-serif;
          cursor: pointer;
        }

        .banner {
          margin: -30px auto 40px;
          width: min(1080px, 84vw);
          background: #FFFFFF;
          border-radius: 999px;
          box-shadow: var(--shadow);
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .banner span {
          font-family: "Space Grotesk", sans-serif;
          font-size: 14px;
          color: var(--blue-900);
        }

        main {
          padding: 0 8vw 120px;
          display: grid;
          gap: 56px;
        }

        .section-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
        }

        .section-header h2 {
          font-size: clamp(1.6rem, 2.2vw, 2.1rem);
          margin: 0;
          font-family: "Space Grotesk", sans-serif;
        }

        .section-meta {
          font-size: 0.9rem;
          color: var(--muted);
        }

        .carousel {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: minmax(220px, 1fr);
          gap: 18px;
          overflow-x: auto;
          padding-bottom: 6px;
        }

        .card {
          background: var(--card);
          border-radius: var(--radius);
          padding: 20px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow);
          display: grid;
          gap: 12px;
          min-height: 180px;
        }

        .card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .badge {
          background: rgba(193, 18, 31, 0.1);
          color: var(--red-600);
          font-size: 0.75rem;
          padding: 4px 10px;
          border-radius: 999px;
          font-family: "Space Grotesk", sans-serif;
          letter-spacing: 0.4px;
        }

        .stat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
        }

        .stat-value {
          font-size: 1.6rem;
          font-family: "Space Grotesk", sans-serif;
          color: var(--blue-900);
        }

        .stat-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .stat-label {
          color: var(--muted);
          font-size: 0.9rem;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 18px;
        }

        .pricing-card ul {
          margin: 0;
          padding-left: 18px;
          color: var(--muted);
        }

        .pricing-card li {
          margin-bottom: 6px;
        }

        .price {
          font-size: 1.8rem;
          color: var(--blue-900);
          margin: 8px 0;
          font-family: "Space Grotesk", sans-serif;
        }

        .muted {
          color: var(--muted);
        }

        .sitemap {
          background: #FFFFFF;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          padding: 24px;
          display: grid;
          gap: 18px;
        }

        .sitemap ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          font-family: "Space Grotesk", sans-serif;
          color: var(--muted);
        }

        footer {
          background: var(--blue-900);
          color: #F8FAFC;
          padding: 30px 8vw;
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          justify-content: space-between;
          align-items: center;
        }

        footer .footer-links {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          font-family: "Space Grotesk", sans-serif;
          font-size: 14px;
          opacity: 0.85;
        }

        .fade-in {
          animation: fadeIn 0.6s ease both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 820px) {
          nav .nav-links {
            display: none;
          }

          .banner {
            flex-direction: column;
            border-radius: 18px;
            text-align: center;
          }

          .hero {
            padding-top: 40px;
          }
        }
      </style>
    </head>
    <body>
      <header>
        <nav>
          <div class="logo">Cloud Diktat</div>
          <div class="nav-links">
            <a href="/courses">Courses</a>
            <a href="/pricing">Pricing</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
        </nav>
        <section class="hero fade-in">
          <div>
            <h1>Structured learning for serious professionals.</h1>
            <p>
              Cloud Diktat delivers academically grounded courses for engineers and
              working professionals who want clarity, rigor, and credible skill
              progression.
            </p>
            <button class="primary-button">Explore Courses</button>
          </div>
          <div class="hero-card">
            <strong>Professional Tracks</strong>
            <span class="muted">Mathematics fundamentals, cloud architecture, and decision frameworks.</span>
            <div class="stat-row">
              <span class="stat-value">92%</span>
              <span class="stat-label">completion rate</span>
            </div>
            <div class="stat-row">
              <span class="stat-value">45h</span>
              <span class="stat-label">guided learning</span>
            </div>
          </div>
        </section>
      </header>
      <section class="banner fade-in">
        <span>Launch Discount — Limited Time Access</span>
        <button class="ghost-button">View Pricing</button>
      </section>
      <main>
        ${courseCarousels.map(renderCarousel).join("")}
        <section class="section">
          <div class="section-header">
            <h2>Top Rated Courses</h2>
            <span class="section-meta">Verified learner feedback</span>
          </div>
          <div class="stat-grid">
            ${renderRatingCards(topRatedCourses)}
          </div>
        </section>
        <section class="section">
          <div class="section-header">
            <h2>Most Enrolled Courses</h2>
            <span class="section-meta">Trusted by professionals</span>
          </div>
          <div class="stat-grid">
            ${renderEnrollmentCards(mostEnrolledCourses)}
          </div>
        </section>
        <section class="section">
          <div class="section-header">
            <h2>Pricing</h2>
            <span class="section-meta">Clarity before commitment</span>
          </div>
          <div class="pricing-grid">
            ${renderPricingCards(pricingPlans)}
          </div>
        </section>
        <section class="section" id="sitemap">
          <div class="section-header">
            <h2>Sitemap</h2>
            <span class="section-meta">Navigation overview</span>
          </div>
          <div class="sitemap">
            <ul>
              ${renderSitemap(sitemapLinks)}
            </ul>
          </div>
        </section>
      </main>
      <footer>
        <div>Cloud Diktat — Professional learning built for clarity.</div>
        <div class="footer-links">
          ${renderFooterLinks(footerLinks)}
        </div>
      </footer>
    </body>
  </html>
`;

const server = http.createServer((req, res) => {
  if (req.url === "/api/hello") {
    http
      .get(`${BACKEND_URL}/`, (backendRes) => {
        let body = "";
        backendRes.setEncoding("utf8");
        backendRes.on("data", (chunk) => {
          body += chunk;
        });
        backendRes.on("end", () => {
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          res.end(body);
        });
      })
      .on("error", () => {
        res.writeHead(502, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("backend unavailable\n");
      });
    return;
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(renderPage());
});

server.listen(PORT, HOST, () => {
  console.log(`Frontend listening on http://${HOST}:${PORT}`);
});
        .hero-card .stat-value {
          color: #F8FAFC;
        }

        .hero-card .stat-label {
          color: rgba(248, 250, 252, 0.75);
        }
