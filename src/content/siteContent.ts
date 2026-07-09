export const siteContent = {
  brand: {
    name: "AgriGrant NY",
    tagline: "Grant navigation for New York farms",
    logoText: "AG",
  },
  disclosureBar: {
    text: "Independent public-interest prototype",
    meta: "New York farm grant navigation",
    review: "Sources reviewed: June 2026",
  },
  publicHeader: {
    loginCta: "Start grant match",
    links: [
      { href: "#workflow", label: "How it works" },
      { href: "#example", label: "Example" },
      { href: "#about", label: "About" },
      { href: "#login", label: "Start matching" },
    ],
  },
  hero: {
    eyebrow: "Built for New York farms",
    title: "Find farm grants that fit your operation.",
    body: "Screen public grant programs, understand eligibility gaps, and prepare before you open the official application.",
    highlights: ["County-aware screening", "Eligibility gaps", "Official source links"],
    primaryCta: "Start grant match",
    secondaryCta: "See how it works",
    secondaryHref: "#workflow",
    note: "Built for New York farms. Source links and review dates stay visible.",
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
    image: {
      label: "Farm grant navigation",
      title: "Working farm conditions across New York",
      note: "One example result stays visible inside the photo block so the homepage shows what the service actually returns.",
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
        stamp: "Source required",
      },
      requirements: ["Project scope", "Farm acreage", "Basic budget estimate"],
      caption: "Sample record for design preview only",
    },
  },
  mission: {
    eyebrow: "Why this exists",
    title: "Grant programs are useful, but they take time most farms do not have.",
    statement: "The goal is not to automate trust. The goal is to make public grant information easier to act on.",
    items: [
      [
        "The problem",
        "Grant programs are scattered across agency pages, deadlines shift, and requirements are hard to compare when you are already running a farm.",
      ],
      [
        "What AgriGrant does",
        "AgriGrant screens opportunities, organizes source-backed details, and helps farmers see what to prepare before opening the official application page.",
      ],
      [
        "What it does not do",
        "It does not replace official applications, guarantee eligibility, or hide the source material behind a black-box recommendation.",
      ],
    ],
  },
  services: {
    eyebrow: "How AgriGrant helps",
    title: "A public-service tool first, with a practical grant workbench underneath.",
    items: [
      [
        "Match grants to your farm profile",
        "Screen programs against county, operation type, project goals, and business stage so the shortlist starts closer to your reality.",
        "County profile",
      ],
      [
        "Explain eligibility gaps before you apply",
        "Show what still needs confirmation, which requirements are unclear, and where a farmer may need more documentation before spending time on the application.",
        "Application prep",
      ],
      [
        "Keep official source links visible",
        "Every recommendation is meant to end at an agency or program page with dates, instructions, and official documents still in view.",
        "Source checked",
      ],
      [
        "Track preparation, not just possibilities",
        "Turn a promising match into a working checklist so application prep is less abstract and more manageable.",
        "Field note",
      ],
    ],
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
    title: "From farm profile to application prep.",
    steps: [
      {
        number: "1",
        title: "Tell us about your farm",
        text: "County, operation type, project goals, and the kind of support you are looking for.",
      },
      {
        number: "2",
        title: "Review matched programs",
        text: "See grants organized by fit, timing, source, and required information.",
      },
      {
        number: "3",
        title: "Check eligibility gaps",
        text: "See what may need confirmation before spending time on the application.",
      },
      {
        number: "4",
        title: "Go to the official source",
        text: "Continue through the agency or program page with clearer preparation.",
      },
    ],
  },
  categories: {
    eyebrow: "Focus areas",
    title: "Organized around the kinds of farm decisions people are actually trying to make.",
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
    title: "Maintained by students, checked against public sources.",
    body: "AgriGrant NY is a public-interest project built to make grant discovery and application preparation more manageable for farmers across New York. It is not a government portal and does not replace official program guidance.",
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
    eyebrow: "Farmer access",
    title: "Start with your farm profile.",
    body: "Create an account or sign in to save your profile, review matched grants, and keep application prep in one place.",
    items: [
      "Save profile details",
      "Review matched programs",
      "Track documents and next steps",
    ],
  },
  example: {
    eyebrow: "Example result",
    title: "See what a match includes.",
    body: "Each result should help a farmer understand why a program may fit, what still needs checking, and where to apply officially.",
    fieldNote:
      "Field note: a strong match is still not a guaranteed fit. Water source details, acreage, and project timing often need one more source check.",
  },
  login: {
    eyebrow: "Farmer access",
    title: "Start with your farm profile.",
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
