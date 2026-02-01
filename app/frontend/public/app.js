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
  { label: "Sitemap", href: "#sitemap" },
];

const courseCarouselRoot = document.querySelector("[data-course-carousels]");
const topRatedRoot = document.querySelector("[data-top-rated]");
const mostEnrolledRoot = document.querySelector("[data-most-enrolled]");
const pricingRoot = document.querySelector("[data-pricing]");
const sitemapRoot = document.querySelector("[data-sitemap]");
const footerRoot = document.querySelector("[data-footer-links]");

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
  links.map((link) => `<a href="${link.href}">${link.label}</a>`).join("");

courseCarouselRoot.innerHTML = courseCarousels.map(renderCarousel).join("");
topRatedRoot.innerHTML = renderRatingCards(topRatedCourses);
mostEnrolledRoot.innerHTML = renderEnrollmentCards(mostEnrolledCourses);
pricingRoot.innerHTML = renderPricingCards(pricingPlans);
sitemapRoot.innerHTML = renderSitemap(sitemapLinks);
footerRoot.innerHTML = renderFooterLinks(footerLinks);
