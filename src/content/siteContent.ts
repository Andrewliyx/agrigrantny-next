export const siteContent = {
  brand: {
    name: "AgriGrant NY",
    tagline: "Grant navigation for New York farms",
    logoText: "AG",
  },
  publicHeader: {
    loginCta: "Log in",
  },
  hero: {
    eyebrow: "Built for New York farms",
    title: "Grant support for farmers who would rather be in the field than buried in forms.",
    body: "AgriGrant NY helps farmers understand federal and state funding opportunities, organize application materials, and prepare stronger submissions for sustainability and business-growth grants.",
    highlights: ["Grant matching", "Application tracking", "AI-ready guidance"],
  },
  platformOverview: {
    eyebrow: "Platform overview",
    title: "A practical grant workspace for New York farmers.",
    paragraphs: [
      "AgriGrant NY is being built to reduce the time farmers spend searching through complex government pages and grant requirements. The goal is to organize relevant opportunities, explain eligibility in plain language, and help farmers move from interest to application.",
      "The platform will focus on sustainable agriculture, energy improvements, conservation, equipment needs, market expansion, and business support. The current version is a prototype; the next version will connect real accounts and database-backed grant records.",
    ],
    cards: [
      {
        number: "1",
        title: "Build your farm profile",
        text: "Capture county, farm type, business stage, sustainability goals, and project needs.",
      },
      {
        number: "2",
        title: "Find relevant grants",
        text: "Compare state, federal, and regional funding opportunities by project type.",
      },
      {
        number: "3",
        title: "Prepare application materials",
        text: "Track documents, budgets, deadlines, narratives, and missing requirements.",
      },
      {
        number: "4",
        title: "Use future AI guidance",
        text: "Use verified grant context to explain eligibility and guide next steps.",
      },
    ],
  },
  about: {
    eyebrow: "About us",
    title: "Built by students focused on practical service and agricultural access.",
    body: "AgriGrant NY is a student-led project designed to make agricultural grant discovery and application preparation easier for farmers across New York.",
    founders: [
      {
        initials: "AL",
        name: "Andrew Li",
        text: "Co-founder focused on product development, design of the workflow, and building the platform into a practical grant-navigation tool.",
      },
      {
        initials: "TW",
        name: "Thijs Wittink",
        text: "Co-founder focused on program strategy, outreach, and shaping AgriGrant NY around accessible support for farmers and agricultural communities.",
      },
    ],
    funding:
      "Made possible with funding from the Workman Comm Svc Speakers & Awards and the Center for Service and Global Citizenship of Deerfield Academy.",
  },
  login: {
    eyebrow: "Farmer access",
    title: "Sign in to view your dashboard.",
    body: "This is a prototype login gate. Enter any email and password to continue. Supabase Auth will replace this local behavior in the next build step.",
    panelEyebrow: "Farmer portal",
    panelTitle: "Sign in to AgriGrant NY",
    emailLabel: "Email address",
    emailPlaceholder: "farmer@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter password",
    signInCta: "Sign in and open dashboard",
    signUpCta: "Create farmer account",
    missingFieldsError: "Enter your email and password to open the dashboard preview.",
  },
};
