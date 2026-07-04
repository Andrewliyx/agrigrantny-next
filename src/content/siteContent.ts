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
    body: "AgriGrant NY helps farmers screen public grant programs, see why a match fits, and prepare before leaving for the official application page.",
    highlights: ["County-aware matching", "Eligibility checklist", "Official source links"],
    primaryCta: "Start grant match",
    secondaryCta: "View sources",
    secondaryHref: "#sources",
    note: "Prototype public-service tool. Grant details should be confirmed at the official source before applying.",
    promises: [
      ["Match by farm profile", "County, operation type, and project goals are screened together."],
      ["Explain eligibility gaps", "The tool shows what still needs confirmation before you apply."],
      ["Link back to official sources", "Every match is meant to end at the original program page."],
    ],
    regional: {
      label: "New York scope",
      title: "Built around county, farm type, project goals, and readiness.",
      counties: ["Hudson Valley", "Finger Lakes", "Central NY", "North Country"],
    },
    preview: {
      eyebrow: "Sample review",
      title: "Soil health and irrigation improvements",
      summary: "Field note preview for a mixed-vegetable operation looking at water and soil management support.",
      profile: [
        ["County", "Tompkins"],
        ["Farm type", "Mixed vegetables"],
        ["Priority", "Water and soil management"],
      ],
      match: {
        program: "NYS Soil and Water grant screening",
        fit: "Likely worth reviewing",
        deadline: "Reviewed June 2026",
        source: "NYS + USDA public program pages",
        stamp: "Official source required",
      },
      requirements: ["Project scope", "Farm acreage", "Basic budget estimate"],
      caption: "Sample record for design preview only",
    },
  },
  sources: {
    eyebrow: "Sources and limits",
    title: "Public source data, review timing, and limits stay visible on purpose.",
    items: [
      ["Source agencies", "USDA, NYSERDA, and New York State Agriculture and Markets public program pages", "Public record set"],
      ["Last reviewed", "June 2026", "Rolling checks"],
      ["Status", "Independent prototype, not affiliated with a government agency", "Transparent"],
      ["Limits", "This tool screens opportunities; it does not submit applications or guarantee eligibility", "Needs source confirmation"],
    ],
  },
  workflow: {
    eyebrow: "How it works",
    title: "The front page should read like a field path, not a stack of floating feature cards.",
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
      ["Field 01", "Soil and water conservation", "Conservation planning, irrigation, soil health, and land stewardship."],
      ["Field 02", "Energy upgrades", "Efficiency retrofits, clean energy, and utility-cost reduction projects."],
      ["Field 03", "Market expansion", "Processing, distribution, branding, and market access support."],
      ["Field 04", "Beginning farmers", "Early-stage operators building business readiness and farm capacity."],
      ["Field 05", "Equipment and infrastructure", "Tools, storage, facilities, and core operating improvements."],
      ["Field 06", "Resilience and recovery", "Weather, disaster, and recovery-oriented public support programs."],
    ],
  },
  about: {
    eyebrow: "About us",
    title: "Maintained by students, reviewed against public sources.",
    body: "AgriGrant NY is a public-interest project aimed at making grant discovery and application preparation more manageable for farmers across New York without pretending to be a government portal.",
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
    title: "Corrections, questions, and source issues should have a clear route.",
    body: "As the platform develops, this panel should stay focused on reporting incorrect grant details, asking for clarification, or requesting help interpreting a program summary.",
    items: [
      "Report a grant detail that looks outdated",
      "Ask a question about how matching works",
      "Request human follow-up on a confusing requirement",
    ],
  },
  login: {
    eyebrow: "Farmer access",
    title: "Open your AgriGrant NY workbench.",
    body: "Create an account or sign in to save your farm profile, review matched grants, and keep application prep in one place.",
    panelEyebrow: "Farmer portal",
    panelTitle: "Sign in to the grant workbench",
    previewTitle: "Inside the workbench",
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
    missingFieldsError: "Enter your email and password to open the grant workbench.",
  },
  footer: {
    contact: "Contact us at contact@agrigrantny.com",
    policy: "Grant information should always be confirmed on the official program page before applying.",
    privacy: "Account, saved-grant, and document privacy terms will be added with the production authentication build.",
  },
};
