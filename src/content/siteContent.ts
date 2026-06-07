export const siteContent = {
  brand: {
    name: "AgriGrant NY",
    tagline: "Grant navigation for New York farms",
    logoText: "AG",
  },
  publicHeader: {
    loginCta: "Log in",
    links: [
      { href: "#overview", label: "How it works" },
      { href: "#about", label: "About" },
      { href: "#login", label: "Farmer access" },
    ],
  },
  hero: {
    eyebrow: "Built for New York farms",
    title: "A simpler path to agricultural grants for farms across New York.",
    body: "AgriGrant NY is being built to help farmers sort through state and federal grant programs, understand what applies to their operation, and stay organized through the application process.",
    highlights: ["State and federal programs", "Application checklists", "Farmer-specific dashboard"],
  },
  platformOverview: {
    eyebrow: "Platform overview",
    title: "Designed to reduce search time and make applications easier to manage.",
    paragraphs: [
      "The platform is intended to bring relevant opportunities into one place, explain requirements in clearer language, and help farmers move from initial interest to a real application plan.",
      "AgriGrant NY is focused on sustainable agriculture, energy improvements, conservation, equipment needs, market access, and other forms of farm business support. The current version is a prototype; future versions will use real accounts and verified grant records.",
    ],
    cards: [
      {
        number: "1",
        title: "Set up your farm profile",
        text: "Record county, operation type, business stage, project goals, and practical needs.",
      },
      {
        number: "2",
        title: "Review matching grants",
        text: "Compare programs by purpose, funding source, timing, and fit with your project.",
      },
      {
        number: "3",
        title: "Track application work",
        text: "Keep deadlines, supporting documents, budgets, and required narratives in one place.",
      },
      {
        number: "4",
        title: "Use guided assistance",
        text: "Future AI support will work from verified grant records and user-specific context.",
      },
    ],
  },
  about: {
    eyebrow: "About us",
    title: "A student-led effort focused on access, clarity, and practical service.",
    body: "AgriGrant NY is being developed as a public-interest project to make grant discovery and application preparation more manageable for farmers across New York.",
    founders: [
      {
        initials: "AL",
        name: "Andrew Li",
        role: "Co-founder",
        text: "Focused on product direction, platform design, and shaping the workflow into a practical grant-navigation tool.",
      },
      {
        initials: "TW",
        name: "Thijs Wittink",
        role: "Co-founder",
        text: "Focused on program strategy, outreach, and keeping the project grounded in accessible support for agricultural communities.",
      },
    ],
    funding:
      "Made possible with funding from the Workman Comm Svc Speakers & Awards and the Center for Service and Global Citizenship of Deerfield Academy.",
  },
  login: {
    eyebrow: "Farmer access",
    title: "Sign in to view your dashboard.",
    body: "This prototype opens into a sample dashboard for farmers. For now, any email and password will work. Supabase authentication will replace this local behavior in the next build step.",
    panelEyebrow: "Farmer portal",
    panelTitle: "Sign in to AgriGrant NY",
    previewTitle: "Inside the dashboard",
    previewItems: [
      "Sample grant matches tied to farm goals and project types",
      "An application tracker for documents, deadlines, and next steps",
      "A future assistant workspace for grant questions and guidance",
    ],
    emailLabel: "Email address",
    emailPlaceholder: "farmer@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter password",
    signInCta: "Sign in and open dashboard",
    signUpCta: "Create farmer account",
    missingFieldsError: "Enter your email and password to open the dashboard preview.",
  },
};
