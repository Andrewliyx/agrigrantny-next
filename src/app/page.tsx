"use client";

import { useMemo, useState } from "react";
import { siteContent } from "@/content/siteContent";

type View = "dashboard" | "profile" | "grants" | "applications" | "assistant";

type Grant = {
  id: string;
  name: string;
  agency: string;
  level: string;
  fitScore: number;
  deadline: string;
  tags: string[];
  summary: string;
  nextSteps: string[];
};

const grants: Grant[] = [
  {
    id: "nyserda-ag-energy",
    name: "Agriculture Energy Audit Support",
    agency: "NYSERDA",
    level: "State",
    fitScore: 92,
    deadline: "Rolling",
    tags: ["Energy", "Sustainability", "Cost savings"],
    summary:
      "Helps farms identify energy efficiency improvements and possible incentives for equipment or operations.",
    nextSteps: ["Confirm utility account details", "Collect recent energy bills", "Request audit eligibility review"],
  },
  {
    id: "usda-reap",
    name: "Rural Energy for America Program",
    agency: "USDA Rural Development",
    level: "Federal",
    fitScore: 86,
    deadline: "Seasonal application windows",
    tags: ["Renewable energy", "Efficiency", "Business"],
    summary:
      "Supports renewable energy systems and energy efficiency improvements for agricultural producers and rural small businesses.",
    nextSteps: ["Define project scope", "Estimate total project cost", "Review matching fund requirements"],
  },
  {
    id: "sare-producer",
    name: "Farmer Grant Program",
    agency: "Northeast SARE",
    level: "Regional/Federal",
    fitScore: 78,
    deadline: "Annual cycle",
    tags: ["Research", "Soil health", "Sustainable practices"],
    summary:
      "Funds farmer-led projects that test sustainable agriculture practices and share findings with other producers.",
    nextSteps: ["Frame a testable project idea", "Identify outreach plan", "Draft project budget"],
  },
  {
    id: "specialty-crop",
    name: "Specialty Crop Block Grant Program",
    agency: "NY Agriculture and Markets",
    level: "State/Federal",
    fitScore: 74,
    deadline: "Annual request for proposals",
    tags: ["Specialty crops", "Marketing", "Business growth"],
    summary:
      "Supports projects that enhance the competitiveness of fruits, vegetables, maple, honey, horticulture, and other specialty crops.",
    nextSteps: ["Confirm crop eligibility", "Draft project partners", "Prepare measurable outcomes"],
  },
];

const navItems: Array<{ id: View; label: string }> = [
  { id: "dashboard", label: "Dashboard" },
  { id: "profile", label: "Farm Profile" },
  { id: "grants", label: "Grant Finder" },
  { id: "applications", label: "Applications" },
  { id: "assistant", label: "Assistant" },
];

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [query, setQuery] = useState("");
  const [login, setLogin] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const filteredGrants = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return grants;

    return grants.filter((grant) =>
      [grant.name, grant.agency, grant.summary, grant.tags.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query]);

  const currentTitle = navItems.find((item) => item.id === activeView)?.label ?? "Dashboard";

  function enterDashboard() {
    if (!login.email.trim() || !login.password.trim()) {
      setLoginError(siteContent.login.missingFieldsError);
      return;
    }

    setLoginError("");
    setIsAuthenticated(true);
    setActiveView("dashboard");
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-civic-field text-[var(--foreground)]">
        <div className="border-b border-[rgba(255,255,255,0.12)] bg-[var(--forest)] px-6 py-3 text-sm text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-3 gap-4 max-md:grid-cols-1">
            <span className="font-semibold uppercase tracking-[0.12em]">{siteContent.disclosureBar.text}</span>
            <span className="text-white/85">{siteContent.disclosureBar.meta}</span>
            <span className="text-white/75 md:text-right">{siteContent.disclosureBar.review}</span>
          </div>
        </div>

        <header className="border-b border-[var(--border)] bg-[rgba(255,253,246,0.92)] backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-6 max-md:flex-col max-md:items-start max-sm:px-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center border border-[var(--border)] bg-[var(--surface-muted)] font-mono text-sm font-bold text-[var(--forest)]">
                {siteContent.brand.logoText}
              </span>
              <div>
                <strong className="block text-lg font-semibold text-[var(--forest)]">{siteContent.brand.name}</strong>
                <span className="block text-sm text-[var(--ink-soft)]">{siteContent.brand.tagline}</span>
              </div>
            </div>

            <nav aria-label="Public navigation" className="flex items-center gap-6 max-md:flex-wrap">
              {siteContent.publicHeader.links.map((link) => (
                <a className="text-sm font-medium text-[var(--ink-soft)] transition hover:text-[var(--forest)]" href={link.href} key={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              className="border border-[var(--forest)] bg-[var(--forest)] px-5 py-3 text-sm font-semibold text-[var(--surface)] transition hover:bg-[var(--moss)]"
              href="#login"
            >
              {siteContent.publicHeader.loginCta}
            </a>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-8 max-sm:px-4">
          <Welcome
            enterDashboard={enterDashboard}
            login={login}
            loginError={loginError}
            setLogin={setLogin}
            setLoginError={setLoginError}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-[var(--foreground)]">
      <div className="grid min-h-screen grid-cols-[280px_minmax(0,1fr)] max-lg:grid-cols-1">
        <aside className="sticky top-0 flex h-screen flex-col gap-7 overflow-hidden border-r border-[#183126] bg-[var(--forest)] p-6 text-[var(--surface)] max-lg:static max-lg:h-auto max-lg:border-r-0 max-lg:border-b">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[rgba(255,255,255,0.08)] font-mono text-sm font-bold text-[var(--surface)]">
              {siteContent.brand.logoText}
            </span>
            <div>
              <strong className="block text-lg font-semibold">{siteContent.brand.name}</strong>
              <span className="block text-sm text-[rgba(251,247,239,0.68)]">Grant navigation for farms</span>
            </div>
          </div>

          <nav className="grid gap-2" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                className={`min-h-11 rounded-lg px-3 text-left transition ${
                  activeView === item.id
                    ? "bg-[var(--surface)] font-semibold text-[var(--forest)] shadow-lg"
                    : "text-[rgba(251,247,239,0.82)] hover:bg-white/8"
                }`}
                key={item.id}
                onClick={() => setActiveView(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-[1.25rem] border border-white/10 bg-[rgba(255,255,255,0.06)] p-4">
            <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--surface-strong)]">Next integration</span>
            <p className="mt-2 text-sm leading-6 text-[rgba(251,247,239,0.74)]">
              Supabase auth, saved farmer profiles, verified grant records, and assistant context.
            </p>
          </div>
        </aside>

        <main className="min-w-0 p-7 max-sm:p-4">
          <header className="mb-7 flex items-center justify-between gap-5 rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_16px_36px_rgba(49,68,51,0.06)]">
            <div>
              <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">New York farmer portal</span>
              <h1 className="mt-1 text-3xl font-bold tracking-tight max-sm:text-2xl">{currentTitle}</h1>
            </div>
            <button
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold"
              onClick={() => {
                setIsAuthenticated(false);
                setActiveView("dashboard");
                setLogin({ email: "", password: "" });
              }}
              type="button"
            >
              Log out
            </button>
          </header>

          {activeView === "dashboard" && <Dashboard openGrants={() => setActiveView("grants")} />}
          {activeView === "profile" && <Profile />}
          {activeView === "grants" && (
            <GrantFinder filteredGrants={filteredGrants} query={query} setQuery={setQuery} />
          )}
          {activeView === "applications" && <Applications />}
          {activeView === "assistant" && <Assistant />}
        </main>
      </div>
    </div>
  );
}

function Welcome({
  enterDashboard,
  login,
  loginError,
  setLogin,
  setLoginError,
}: {
  enterDashboard: () => void;
  login: { email: string; password: string };
  loginError: string;
  setLogin: (login: { email: string; password: string }) => void;
  setLoginError: (message: string) => void;
}) {
  return (
    <div className="grid gap-0">
      <section className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] gap-0 border-b border-[rgba(18,63,50,0.12)] max-xl:grid-cols-1">
        <div className="bg-paper-panel px-10 py-12 max-sm:px-6 max-sm:py-8">
          <div className="max-w-[40rem]">
            <span className="inline-flex rounded-[0.3rem] border border-[#d2c39c] bg-[#f1ead3] px-3 py-2 text-[0.79rem] font-extrabold uppercase tracking-[0.08em] text-[var(--forest)]">
              {siteContent.hero.eyebrow}
            </span>
            <h2 className="mt-5 max-w-[12ch] text-[clamp(2.8rem,5vw,5.35rem)] leading-[0.93] text-[var(--forest)]">
              {siteContent.hero.title}
            </h2>
            <p className="mt-5 max-w-[38rem] text-[1.09rem] leading-8 text-[var(--ink-soft)]">{siteContent.hero.body}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="bg-[var(--forest)] px-5 py-3 text-sm font-semibold text-[var(--surface)] transition hover:bg-[var(--moss)]" href="#login">
                {siteContent.hero.primaryCta}
              </a>
              <a
                className="border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--forest)] transition hover:bg-[var(--surface-muted)]"
                href={siteContent.hero.secondaryHref}
              >
                {siteContent.hero.secondaryCta}
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {siteContent.hero.highlights.map((item) => (
                <span className="rounded-full border border-[#ded6b5] bg-[#f4efd9] px-4 py-2 text-sm font-semibold text-[var(--forest)]" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--ink-soft)]">{siteContent.hero.note}</p>
          </div>
        </div>

        <div className="bg-photo-placeholder relative min-h-[620px] overflow-hidden max-xl:min-h-[440px]">
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:100%_38px] opacity-25" />
          <div className="absolute inset-x-0 bottom-0 top-[58%] bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.12),rgba(255,255,255,0.12)_1px,transparent_1px,transparent_22px)] opacity-35" />
          <div className="absolute left-[11%] top-[11%] max-w-[18rem] border border-white/18 bg-[rgba(255,253,246,0.12)] p-5 text-white backdrop-blur-sm">
            <span className="block text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-[#f6df86]">
              {siteContent.hero.image.label}
            </span>
            <p className="mt-3 text-[1.05rem] font-semibold leading-7">[{siteContent.hero.image.title}]</p>
            <p className="mt-3 text-sm leading-6 text-white/78">{siteContent.hero.image.note}</p>
          </div>
          <div className="absolute bottom-0 right-0 w-[min(380px,calc(100%-2rem))] translate-x-[-1.5rem] translate-y-[-1.5rem]">
            <ExamplePreview />
          </div>
        </div>
      </section>

      <section className="bg-[var(--forest)] px-6 py-14 text-[var(--surface)]">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] gap-10 max-lg:grid-cols-1">
          <div>
            <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[#f1d676]">
              {siteContent.mission.eyebrow}
            </span>
            <h3 className="mt-3 max-w-4xl text-[clamp(2.2rem,4vw,3.8rem)] leading-tight text-white">
              {siteContent.mission.title}
            </h3>
            <div className="mt-8 grid gap-6">
              {siteContent.mission.items.map(([label, text]) => (
                <article className="grid grid-cols-[140px_minmax(0,1fr)] gap-4 border-t border-white/12 pt-4 max-sm:grid-cols-1" key={label}>
                  <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[#d7e5cf]">{label}</span>
                  <p className="max-w-3xl text-[1.02rem] leading-8 text-white/82">{text}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="self-start border border-white/12 bg-[rgba(255,255,255,0.06)] p-6">
            <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[#f1d676]">Public-service position</span>
            <p className="mt-4 text-[1.2rem] leading-8 text-white">{siteContent.mission.statement}</p>
            <div className="mt-6 border-t border-white/12 pt-4 text-sm leading-7 text-white/76">
              The point is not to replace agency pages. The point is to help farmers get to those pages with clearer expectations and better preparation.
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[var(--surface)] px-6 py-14">
        <div className="mx-auto grid max-w-7xl gap-8">
          <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">
            {siteContent.services.eyebrow}
          </span>
          <h3 className="max-w-4xl text-[clamp(2rem,3.4vw,3rem)] leading-tight text-[var(--forest)]">
            {siteContent.services.title}
          </h3>

          <div className="border-t border-[rgba(23,56,45,0.12)]">
            {siteContent.services.items.map(([title, text, tag], index) => (
              <article
                className={`grid grid-cols-[170px_minmax(0,1fr)_220px] gap-6 border-b border-[rgba(23,56,45,0.12)] py-8 max-lg:grid-cols-1 ${index % 2 === 1 ? "bg-[rgba(244,239,226,0.38)]" : ""}`}
                key={title}
              >
                <div className="px-2">
                  <span className="inline-flex border border-[#d2c39c] bg-[#f5eccf] px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.12em] text-[var(--forest)]">
                    {tag}
                  </span>
                </div>
                <div className="px-2">
                  <h4 className="max-w-[18ch] text-[1.75rem] leading-tight text-[var(--forest)]">{title}</h4>
                  <p className="mt-3 max-w-3xl text-[1rem] leading-8 text-[var(--ink-soft)]">{text}</p>
                </div>
                <div className="mx-2 flex min-h-[132px] items-end border border-[rgba(23,56,45,0.12)] bg-[linear-gradient(135deg,rgba(18,63,50,0.18),rgba(213,186,88,0.08))] p-4 text-sm font-semibold text-[var(--forest)]">
                  PROGRAM VISUAL {String(index + 1).padStart(2, "0")}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[rgba(233,239,232,0.78)] px-6 py-14" id="sources">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid grid-cols-[40px_minmax(0,1fr)] gap-5 max-sm:grid-cols-1">
            <div className="hidden bg-[var(--forest)] px-2 py-3 text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-white [writing-mode:vertical-rl] rotate-180 sm:block">
              Public record check
            </div>
            <div>
              <span className="inline-flex bg-[var(--forest)] px-3 py-2 text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-white sm:hidden">
                Public record check
              </span>
              <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">
                {siteContent.sources.eyebrow}
              </span>
              <h3 className="mt-3 max-w-4xl text-[clamp(2rem,3.4vw,3rem)] leading-tight text-[var(--forest)]">
                Built around public sources, not black-box recommendations.
              </h3>
              <p className="mt-4 max-w-3xl text-[1rem] leading-8 text-[var(--ink-soft)]">{siteContent.sources.title}</p>
            </div>
          </div>

          <div className="border-t border-b border-[rgba(23,56,45,0.16)] bg-[rgba(255,253,246,0.92)]">
            <div className="grid grid-cols-[minmax(140px,0.8fr)_minmax(0,2fr)_minmax(140px,0.9fr)] gap-4 px-6 py-4 text-[0.78rem] font-bold uppercase tracking-[0.08em] text-[var(--ink-soft)] max-md:hidden">
              <span>Item</span>
              <span>Details</span>
              <span>Status</span>
            </div>
            {siteContent.sources.items.map(([label, text, status]) => (
              <article className="grid grid-cols-[minmax(140px,0.8fr)_minmax(0,2fr)_minmax(140px,0.9fr)] gap-4 border-t border-[rgba(23,56,45,0.1)] px-6 py-5 max-md:grid-cols-1" key={label}>
                <span className="font-semibold text-[var(--forest)]">{label}</span>
                <span className="leading-7 text-[var(--ink-soft)]">{text}</span>
                <span className="font-semibold text-[var(--forest)]">{status}</span>
              </article>
            ))}
          </div>
          <div className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
            This section is meant to read like an accountability ledger: source agencies, review timing, prototype status, and limits stay in the open.
          </div>
        </div>
      </section>

      <section className="bg-[var(--forest)] px-6 py-14 text-[var(--surface)]" id="workflow">
        <div className="mx-auto max-w-7xl">
          <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[#f1d676]">{siteContent.workflow.eyebrow}</span>
          <h3 className="mt-3 max-w-4xl text-[clamp(2rem,3.4vw,3rem)] leading-tight text-white">
            {siteContent.workflow.title}
          </h3>
          <div className="relative mt-10 grid grid-cols-4 gap-8 max-xl:grid-cols-2 max-sm:grid-cols-1">
            <div className="absolute left-[10%] right-[10%] top-6 h-[3px] bg-[linear-gradient(90deg,rgba(241,214,118,0.8)_0_100%)] max-xl:hidden" />
            {siteContent.workflow.steps.map((step) => (
              <article className="relative" key={step.number}>
                <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#f1d676] bg-[var(--forest)] text-lg font-bold text-[#f1d676]">
                  {step.number}
                </div>
                <h4 className="mt-5 text-[1.55rem] leading-tight text-white">{step.title}</h4>
                <p className="mt-3 leading-8 text-white/78">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(90deg,#17382d_0%,#17382d_54%,#f7f0dd_54%,#f7f0dd_100%)] px-6 py-14 max-lg:bg-[var(--forest)]">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] gap-10 max-lg:grid-cols-1">
          <div>
            <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[#f1d676]">
              {siteContent.example.eyebrow}
            </span>
            <h3 className="mt-3 max-w-3xl text-[clamp(2rem,3.2vw,2.8rem)] leading-tight text-white">
              {siteContent.example.title}
            </h3>
            <p className="mt-4 max-w-3xl text-[1rem] leading-8 text-white/78">{siteContent.example.body}</p>
            <div className="mt-8 max-w-[42rem] rotate-[-2deg]">
              <ExamplePreview />
            </div>
          </div>
          <aside className="bg-[var(--surface)] p-6 max-lg:bg-[var(--surface)]">
            <div className="grid gap-4">
              {[
                "Source required",
                "Review date visible",
                "Preparation checklist",
                "Not a guarantee",
              ].map((note) => (
                <div className="border-l-[3px] border-[var(--clay)] pl-4" key={note}>
                  <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">{note}</span>
                  <p className="mt-2 text-sm leading-7 text-[var(--ink-soft)]">
                    This output is meant to help a farmer prepare before leaving for the official program page.
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[rgba(241,236,220,0.96)] px-6 py-14" id="overview">
        <div className="mx-auto max-w-7xl">
          <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">{siteContent.categories.eyebrow}</span>
          <h3 className="mt-3 max-w-4xl text-[clamp(2rem,3.4vw,3rem)] leading-tight text-[var(--forest)]">
            {siteContent.categories.title}
          </h3>
          <div className="mt-8 grid grid-cols-3 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {siteContent.categories.items.map(([code, title, text], index) => (
              <CategoryCard code={code} description={text} emphasis={index === 0 || index === 4} featured={index === 0} key={code} title={title} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)] px-6 py-14" id="about">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_340px] gap-10 max-lg:grid-cols-1">
          <div>
            <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">{siteContent.about.eyebrow}</span>
            <h3 className="mt-3 max-w-4xl text-[clamp(2rem,3.4vw,3rem)] leading-tight text-[var(--forest)]">
              {siteContent.about.title}
            </h3>
            <p className="mt-4 max-w-3xl leading-8 text-[rgba(31,36,29,0.72)]">
              {siteContent.about.body}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6 max-lg:grid-cols-1">
              {siteContent.about.founders.map((founder) => (
                <FounderCard
                  key={founder.name}
                  name={founder.name}
                  role={founder.role}
                  text={founder.text}
                />
              ))}
            </div>
            <p className="mt-8 border-t border-[var(--border)] pt-5 text-sm font-semibold leading-6 text-[rgba(31,36,29,0.72)]">
              {siteContent.about.funding}
            </p>
          </div>
          <aside className="bg-[var(--forest)] p-6 text-[var(--surface)]">
            <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[#f1d676]">{siteContent.support.eyebrow}</span>
            <h4 className="mt-3 text-2xl leading-tight text-white">{siteContent.support.title}</h4>
            <p className="mt-4 leading-7 text-white/78">{siteContent.support.body}</p>
            <ul className="mt-5 grid gap-3">
              {siteContent.support.items.map((item) => (
                <li className="flex items-start gap-3" key={item}>
                  <span className="mt-1 flex h-5 w-5 items-center justify-center border border-white/20 bg-white/8 text-xs font-bold text-white">
                    +
                  </span>
                  <span className="text-sm leading-7 text-white/82">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-white/12 pt-4">
              <strong className="block font-mono text-[0.78rem] uppercase tracking-[0.08em] text-[#f1d676]">
                Contact / corrections
              </strong>
              <p className="mt-2 text-sm leading-7 text-white/78">
                Use contact@agrigrantny.com for corrections, questions, and source issues.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[var(--forest)] px-6 py-14" id="login">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_minmax(340px,440px)] items-center gap-10 max-lg:grid-cols-1">
          <div className="text-[var(--surface)]">
            <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[#f1d676]">{siteContent.login.eyebrow}</span>
            <h3 className="mt-3 text-[clamp(2rem,3.6vw,3.35rem)] leading-tight text-white">{siteContent.login.title}</h3>
            <p className="mt-4 max-w-2xl leading-8 text-white/78">
              {siteContent.login.body}
            </p>
            <div className="mt-6 flex flex-wrap gap-6 text-sm font-medium text-white/84">
              {siteContent.login.previewItems.map((item) => (
                <span className="inline-flex items-center gap-2" key={item}>
                  <span className="text-[#f1d676]">✓</span>
                  <span>{item}</span>
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-white/72">
              Start with a farm profile, then keep your shortlist, source links, and next-step notes in one place.
            </p>
          </div>

          <form className="border border-[rgba(18,63,50,0.18)] bg-[rgba(255,253,246,0.96)] p-6 shadow-[0_22px_46px_rgba(49,68,51,0.06)]">
            <div>
              <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">
                {siteContent.login.panelEyebrow}
              </span>
              <h3 className="mt-2 text-2xl leading-tight text-[var(--forest)]">{siteContent.login.panelTitle}</h3>
            </div>
            <div className="mt-4 grid gap-4">
              <label className="grid gap-2 text-sm font-semibold text-[var(--forest)]">
                {siteContent.login.emailLabel}
                <input
                  className="min-h-12 border border-[var(--border)] bg-[rgba(255,255,255,0.7)] px-4 text-[var(--foreground)]"
                  onChange={(event) => {
                    setLogin({ ...login, email: event.target.value });
                    setLoginError("");
                  }}
                  placeholder={siteContent.login.emailPlaceholder}
                  type="email"
                  value={login.email}
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-[var(--forest)]">
                {siteContent.login.passwordLabel}
                <input
                  className="min-h-12 border border-[var(--border)] bg-[rgba(255,255,255,0.7)] px-4 text-[var(--foreground)]"
                  onChange={(event) => {
                    setLogin({ ...login, password: event.target.value });
                    setLoginError("");
                  }}
                  placeholder={siteContent.login.passwordPlaceholder}
                  type="password"
                  value={login.password}
                />
              </label>
              {loginError && (
                <p className="border border-[#e2a080] bg-[#fff1e8] px-3 py-2 text-sm text-[#8a2f18]" role="alert">
                  {loginError}
                </p>
              )}
              <button
                className="min-h-12 bg-[var(--forest)] px-4 font-semibold text-[var(--surface)] transition hover:bg-[var(--moss)]"
                onClick={enterDashboard}
                type="button"
              >
                {siteContent.login.signInCta}
              </button>
              <button
                className="min-h-12 border border-[var(--border)] bg-[rgba(255,255,255,0.68)] px-4 font-semibold text-[var(--forest)]"
                onClick={enterDashboard}
                type="button"
              >
                {siteContent.login.signUpCta}
              </button>
            </div>
          </form>
        </div>
      </section>

      <footer className="bg-[#22342d] px-6 py-10 text-sm leading-7 text-white/74">
        <div className="mx-auto grid max-w-7xl gap-3">
          <p>{siteContent.footer.contact}</p>
          <p>{siteContent.footer.policy}</p>
          <p>{siteContent.footer.privacy}</p>
        </div>
      </footer>
    </div>
  );
}

function ExamplePreview() {
  const preview = siteContent.hero.preview;

  return (
    <aside className="bg-ledger-panel rounded-[1rem] border border-[rgba(23,56,45,0.18)] p-[18px]">
      <div className="relative rounded-[0.95rem] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,252,243,0.98),rgba(244,236,214,0.98))] p-5 shadow-[0_12px_28px_rgba(55,59,42,0.08)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(20,32,27,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,32,27,0.03)_1px,transparent_1px)] bg-[size:22px_22px] opacity-30" />
        <div className="relative z-10 flex items-center justify-between gap-3 max-sm:items-start max-sm:flex-col">
          <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">{preview.eyebrow}</span>
          <span className="rounded-full border border-[rgba(155,95,66,0.46)] px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-[var(--clay)]">
            {preview.match.stamp}
          </span>
        </div>
        <h3 className="relative z-10 mt-3 text-2xl leading-tight text-[var(--forest)]">{preview.title}</h3>
        <p className="relative z-10 mt-3 text-sm leading-7 text-[var(--ink-soft)]">{preview.summary}</p>
        <dl className="relative z-10 mt-5 grid gap-3">
          {preview.profile.map(([label, value]) => (
            <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 border-b border-[var(--border)] pb-3 last:border-b-0 last:pb-0 max-sm:grid-cols-1" key={label}>
              <dt className="text-sm font-semibold text-[var(--forest)]">{label}</dt>
              <dd className="text-sm leading-6 text-[var(--ink-soft)]">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="relative z-10 mt-5 flex items-start justify-between gap-3 max-sm:items-start max-sm:flex-col">
          <div>
            <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">Matched program</span>
            <h4 className="mt-2 text-xl leading-tight text-[var(--forest)]">{preview.match.program}</h4>
          </div>
          <span className="rounded-full border border-[#cfad99] bg-[#f0e3d7] px-3 py-1 text-xs font-bold text-[#8a4b2e]">
            {preview.match.fit}
          </span>
        </div>

        <div className="relative z-10 mt-4 grid gap-2 text-sm leading-6 text-[var(--ink-soft)]">
          <p><strong className="text-[var(--forest)]">Review date:</strong> {preview.match.deadline}</p>
          <p><strong className="text-[var(--forest)]">Source:</strong> {preview.match.source}</p>
        </div>

        <div className="relative z-10 mt-4">
          <strong className="text-sm text-[var(--forest)]">What to prepare</strong>
          <ul className="mt-2 grid gap-2">
            {preview.requirements.map((item) => (
              <li className="flex items-start gap-3 text-sm leading-6 text-[var(--ink-soft)]" key={item}>
                <span className="mt-1 flex h-4 w-4 items-center justify-center rounded-sm border border-[var(--border)] bg-[var(--surface)] text-[10px] font-bold text-[var(--forest)]">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 mt-4 text-xs leading-6 text-[var(--ink-soft)]">{preview.caption}</p>
      </div>
    </aside>
  );
}

function CategoryCard({
  code,
  title,
  description,
  emphasis = false,
  featured = false,
}: {
  code: string;
  title: string;
  description: string;
  emphasis?: boolean;
  featured?: boolean;
}) {
  return (
    <article
      className={`relative rounded-[0.85rem] border p-5 ${
        featured
          ? "col-span-2 min-h-[260px] border-[rgba(18,63,50,0.18)] bg-[linear-gradient(135deg,rgba(18,63,50,0.92),rgba(49,88,72,0.9))] text-white max-lg:col-span-1"
          : emphasis
          ? "border-[rgba(18,63,50,0.18)] bg-[linear-gradient(180deg,rgba(231,234,215,0.82),rgba(255,252,243,0.98))]"
          : "border-[var(--border)] bg-[linear-gradient(180deg,rgba(245,237,211,0.92),rgba(255,252,243,0.98))]"
      }`}
    >
      <div className={`absolute left-[18px] top-0 h-2 w-[104px] ${featured ? "bg-[#f1d676]" : "bg-[rgba(213,186,88,0.55)]"}`} />
      <span className={`inline-block font-mono text-[0.76rem] font-bold uppercase tracking-[0.08em] ${featured ? "text-white/70" : "text-[var(--ink-soft)]"}`}>{code}</span>
      <h4 className={`mt-3 text-2xl leading-tight ${featured ? "max-w-[14ch] text-white" : "text-[var(--forest)]"}`}>{title}</h4>
      <p className={`mt-3 text-sm leading-7 ${featured ? "max-w-[40ch] text-white/82" : "text-[var(--ink-soft)]"}`}>{description}</p>
    </article>
  );
}

function FounderCard({
  name,
  role,
  text,
}: {
  name: string;
  role: string;
  text: string;
}) {
  return (
    <article className="grid grid-cols-[140px_minmax(0,1fr)] gap-5 border-t border-[rgba(23,56,45,0.12)] py-5 max-sm:grid-cols-1">
      <div className="flex h-36 items-center justify-center border border-[var(--border)] bg-[rgba(244,239,226,0.96)] p-4 text-center">
        <div>
          <span className="block text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-[var(--moss)]">Portrait placeholder</span>
          <strong className="mt-2 block font-mono text-base text-[var(--forest)]">{name}</strong>
        </div>
      </div>
      <div>
        <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">{role}</span>
        <h4 className="text-2xl leading-tight text-[var(--forest)]">{name}</h4>
        <p className="mt-3 max-w-3xl leading-7 text-[rgba(31,36,29,0.72)]">{text}</p>
      </div>
    </article>
  );
}

function Dashboard({ openGrants }: { openGrants: () => void }) {
  return (
    <div className="grid gap-6">
      <section className="relative overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[#f2ede3] p-14 shadow-[0_28px_60px_rgba(49,68,51,0.08)] max-sm:p-6">
        <div className="absolute inset-x-0 bottom-0 top-[58%] bg-[repeating-linear-gradient(0deg,rgba(85,106,71,0.05),rgba(85,106,71,0.05)_1px,transparent_1px,transparent_20px)]" />
        <div className="relative z-10">
          <span className="inline-flex rounded-md border border-[var(--border)] bg-[rgba(251,247,239,0.88)] px-4 py-2 text-sm font-extrabold text-[var(--forest)]">
            NY farms first
          </span>
          <h2 className="mt-5 max-w-4xl text-5xl leading-none text-[var(--forest)] max-sm:text-3xl">
            Find grants that match your farm, your county, and your next investment.
          </h2>
          <p className="mt-5 max-w-2xl leading-8 text-[rgba(31,36,29,0.74)]">
            Profile-based recommendations, saved opportunities, application checklists, and an assistant
            workspace ready for AI integration.
          </p>
          <button
            className="mt-7 rounded-lg bg-[var(--forest)] px-5 py-3 font-semibold text-[var(--surface)] transition hover:bg-[var(--moss)]"
            onClick={openGrants}
            type="button"
          >
            Explore grants
          </button>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1">
        <Stat label="County" value="Tompkins" />
        <Stat label="Farm type" value="Mixed produce" />
        <Stat label="Goal" value="Soil health" />
        <Stat label="Readiness" value="68%" />
      </section>

      <section className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface-muted)] p-6">
        <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">Profile insight</span>
        <h3 className="mt-2 text-2xl leading-tight text-[var(--forest)]">Energy and soil-health grants are your strongest starting lane.</h3>
        <p className="mt-3 leading-7 text-[rgba(31,36,29,0.72)]">
          Future matching logic will turn profile answers into eligibility signals, missing-document
          prompts, and application priorities.
        </p>
      </section>

      <section className="grid grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] gap-5 max-lg:grid-cols-1">
        <Panel eyebrow="Recommended" title="Top grant matches">
          <div className="grid gap-4">
            {grants.slice(0, 3).map((grant) => (
              <GrantCard compact grant={grant} key={grant.id} />
            ))}
          </div>
        </Panel>
        <Panel eyebrow="Application health" title="Readiness checklist">
          <Checklist
            items={[
              ["Farm business profile", true],
              ["Recent tax or revenue documents", true],
              ["Project budget draft", false],
              ["Energy bills or conservation plan", false],
              ["Application narrative", false],
            ]}
          />
        </Panel>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-[1.4rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_38px_rgba(49,68,51,0.08)]">
      <span className="text-sm text-[rgba(31,36,29,0.58)]">{label}</span>
      <strong className="mt-2 block text-2xl font-semibold text-[var(--forest)]">{value}</strong>
    </article>
  );
}

function Profile() {
  return (
    <Panel eyebrow="Personalization engine" title="Farm profile">
      <form className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
        {[
          ["Farm name", "Green Valley Farm"],
          ["County", "Tompkins"],
          ["Farm category", "Mixed produce"],
          ["Years operating", "6"],
          ["Annual revenue range", "$50k-$250k"],
          ["Primary goal", "Improve soil health"],
        ].map(([label, value]) => (
          <label className="grid gap-2 text-sm font-semibold text-[var(--forest)]" key={label}>
            {label}
            <input className="min-h-12 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4" defaultValue={value} />
          </label>
        ))}
        <label className="col-span-2 grid gap-2 text-sm font-semibold text-[var(--forest)] max-lg:col-span-1">
          Notes for future AI assistant
          <textarea
            className="min-h-28 rounded-[1rem] border border-[var(--border)] bg-[var(--surface)] p-4"
            defaultValue="Interested in cover cropping, irrigation improvements, and cold storage funding."
          />
        </label>
      </form>
    </Panel>
  );
}

function GrantFinder({
  filteredGrants,
  query,
  setQuery,
}: {
  filteredGrants: Grant[];
  query: string;
  setQuery: (query: string) => void;
}) {
  return (
    <div className="grid gap-5">
      <section className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_18px_38px_rgba(49,68,51,0.05)]">
        <input
          className="min-h-12 w-full rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] px-4"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by agency, project type, or keyword"
          type="search"
          value={query}
        />
      </section>
      <section className="grid gap-4">
        {filteredGrants.map((grant) => (
          <GrantCard grant={grant} key={grant.id} />
        ))}
      </section>
    </div>
  );
}

function GrantCard({ grant, compact = false }: { grant: Grant; compact?: boolean }) {
  return (
    <article className="grid gap-3 rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_18px_38px_rgba(49,68,51,0.05)]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-md bg-[var(--surface-muted)] px-3 py-1 text-xs font-extrabold text-[var(--moss)]">
          {grant.level}
        </span>
        <strong className="text-[var(--clay)]">{grant.fitScore}% fit</strong>
      </div>
      <h4 className="text-2xl leading-tight text-[var(--forest)]">{grant.name}</h4>
      <p className="leading-7 text-[var(--ink-soft)]">{grant.summary}</p>
      <div className="flex flex-wrap gap-3 text-sm text-[rgba(31,36,29,0.58)]">
        <span>{grant.agency}</span>
        <span>{grant.deadline}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {grant.tags.map((tag) => (
          <span className="rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1 text-xs font-bold text-[var(--forest)]" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      {!compact && (
        <div>
          <strong className="text-sm">Next steps</strong>
          <ul className="mt-2 list-disc pl-5 leading-7 text-[var(--ink-soft)]">
            {grant.nextSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

function Applications() {
  return (
    <section className="grid grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] gap-5 max-lg:grid-cols-1">
      <Panel eyebrow="Saved opportunity" title="Rural Energy for America Program">
        <Checklist
          items={[
            ["Confirm eligibility", true],
            ["Build project budget", true],
            ["Collect contractor quote", false],
            ["Draft narrative", false],
            ["Submit application", false],
          ]}
        />
      </Panel>
      <Panel eyebrow="Calendar" title="Upcoming actions">
        <div className="grid gap-3 leading-7 text-[#526257]">
          <p>Budget draft due June 18</p>
          <p>Document review June 25</p>
          <p>Application window check July 2</p>
        </div>
      </Panel>
    </section>
  );
}

function Assistant() {
  return (
    <section className="grid grid-cols-[minmax(0,1fr)_360px] gap-5 max-lg:grid-cols-1">
      <div className="min-h-[520px] rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_18px_38px_rgba(49,68,51,0.05)]">
        <div className="rounded-[1rem] bg-[var(--surface-muted)] p-4">
          <strong>Grant assistant workspace</strong>
          <p className="mt-2 leading-7 text-[var(--ink-soft)]">
            The future AI agent will use the farm profile, selected grants, application stage, and
            verified source data to guide each farmer.
          </p>
        </div>
        <div className="ml-auto mt-4 max-w-xl rounded-[1rem] bg-[var(--forest)] p-4 text-white">
          Which grants fit my soil health and cold storage goals?
        </div>
        <div className="mt-4 max-w-2xl rounded-[1rem] bg-[var(--surface-muted)] p-4 leading-7 text-[var(--foreground)]">
          Based on the sample profile, I would compare SARE, specialty crop funding, and energy
          efficiency programs, then ask for project cost, crop type, and timeline before ranking options.
        </div>
      </div>
      <Panel eyebrow="Agent context" title="What the AI will receive">
        <Checklist
          items={[
            ["Farmer profile", true],
            ["Saved grants", true],
            ["Application checklist", true],
            ["Official source records", false],
            ["Uploaded documents", false],
          ]}
        />
      </Panel>
    </section>
  );
}

function Panel({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_18px_38px_rgba(49,68,51,0.05)]">
      <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">{eyebrow}</span>
      <h3 className="mt-2 text-2xl leading-tight text-[var(--forest)]">{title}</h3>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Checklist({ items }: { items: Array<[string, boolean]> }) {
  return (
    <ul className="grid gap-3">
      {items.map(([label, done]) => (
        <li className="flex items-center gap-3" key={label}>
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-md border text-sm font-black ${
              done ? "border-[var(--border)] bg-[var(--surface-strong)] text-[var(--forest)]" : "border-[var(--border)]"
            }`}
          >
            {done ? "✓" : ""}
          </span>
          <p className="text-[var(--ink-soft)]">{label}</p>
        </li>
      ))}
    </ul>
  );
}
