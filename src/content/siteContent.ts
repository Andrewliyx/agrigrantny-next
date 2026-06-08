export const siteContent = {
  brand: {
    name: "AgriGrant NY",
    tagline: "Grant navigation for New York farms",
    logoText: "AG",
  },
  disclosureBar: {
    text: "AgriGrant NY is an independent prototype that helps New York farms navigate public grant opportunities. It is not an official government website.",
    meta: "Prototype status · Public grant guidance · New York focus",
  },
  publicHeader: {
    loginCta: "Start grant match",
    links: [
      { href: "#workflow", label: "How it works" },
      { href: "#sources", label: "Sources" },
      { href: "#about", label: "About" },
      { href: "#login", label: "Start matching" },
    ],
  },
  hero: {
    eyebrow: "Built for New York farms",
    title: "Find New York farm grants that fit your operation.",
    body: "Build a farm profile, review matching programs, and see what to prepare before you go to the official application. Contact us at contact@agrigrantny.com for feedback and inquiries.",
    highlights: ["County-aware matching", "Eligibility checklist", "Official source links"],
    primaryCta: "Start grant match",
    secondaryCta: "View sources",
    secondaryHref: "#sources",
    note: "Current prototype uses sample grant data and a preview dashboard.",
    preview: {
      eyebrow: "Example result",
      title: "Soil health and irrigation improvements",
      summary:
        "A preview of the kind of matched result the platform will show after a farmer answers a few questions about their operation.",
      profile: [
        ["County", "Tompkins"],
        ["Farm type", "Mixed vegetables"],
        ["Priority", "Water and soil management"],
      ],
      match: {
        program: "NYS Soil and Water grant screening",
        fit: "Likely worth reviewing",
        deadline: "Updated June 2026",
        source: "NYS + USDA public program pages",
      },
      requirements: ["Project scope", "Farm acreage", "Basic budget estimate"],
      caption: "Sample data shown for design preview",
    },
  },
  sources: {
    eyebrow: "Sources and limits",
    title: "Public source data, prototype status, and review dates are visible on purpose.",
    items: [
      ["Sources", "USDA, NYSERDA, and New York State Agriculture and Markets public program pages"],
      ["Last reviewed", "June 2026"],
      ["Status", "Independent prototype, not affiliated with a government agency"],
      ["Limits", "This tool helps screen opportunities; it does not submit applications or guarantee eligibility"],
    ],
  },
  workflow: {
    eyebrow: "How it works",
    title: "The service should show farmers what happens next at every step.",
    steps: [
      {
        number: "1",
        title: "Tell us about your farm",
        text: "County, farm type, project goals, business stage, and the kind of funding you are looking for.",
      },
      {
        number: "2",
        title: "We screen programs",
        text: "Relevant grants are organized by source, fit, timing, and required information.",
      },
      {
        number: "3",
        title: "You get an eligibility checklist",
        text: "The platform flags what to gather before you spend time on the official application.",
      },
      {
        number: "4",
        title: "You go to the official source",
        text: "Farmers still apply through the original grant program page, with clearer preparation.",
      },
    ],
  },
  categories: {
    eyebrow: "Grant categories",
    title: "Organized around actual farm decisions rather than generic funding language.",
    items: [
      "Soil and water conservation",
      "Energy upgrades",
      "Market expansion",
      "Beginning farmers",
      "Equipment and infrastructure",
      "Resilience and recovery",
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
        text: "Focused on product direction, platform design, and shaping the workflow into a practical grant-navigation tool. Contact me at yli27@deerfield.edu.",
      },
      {
        initials: "TW",
        name: "Thijs Wittink",
        role: "Co-founder",
        text: "Focused on program strategy, outreach, and keeping the project grounded in accessible support for agricultural communities. Contact me at twittink@deerfield.edu.",
      },
    ],
    funding:
      "Made possible with funding from the Workman Comm Svc Speakers & Awards and the Center for Service and Global Citizenship of Deerfield Academy.",
  },
  support: {
    eyebrow: "Questions and feedback",
    title: "This project should feel maintained by people, not left as a static mockup.",
    body: "As the platform develops, this section can become the route for reporting incorrect grant information, asking for clarification, or requesting help interpreting a program.",
    items: [
      "Report a grant detail that looks outdated",
      "Ask a question about how matching works",
      "Request human follow-up on a confusing requirement",
    ],
  },
  login: {
    eyebrow: "Farmer access",
    title: "Open the dashboard preview.",
    body: "For now, any email and password will open the sample dashboard. Supabase authentication will replace this local behavior in the next build step.",
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
  footer: {
    contact: "Contact us at contact@agrigrantny.com",
    policy: "Grant information should always be confirmed on the official program page before applying.",
    privacy: "Account, saved-grant, and document privacy terms will be added with the production authentication build.",
  },
};
