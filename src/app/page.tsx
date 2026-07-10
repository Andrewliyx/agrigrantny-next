"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
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
            <span className="font-semibold text-white/85">{siteContent.disclosureBar.meta}</span>
            <span className="text-white/0" aria-hidden="true">
              {siteContent.disclosureBar.text}
            </span>
            <span className="text-white/75 md:text-right">{siteContent.disclosureBar.review}</span>
          </div>
        </div>

        <header className="border-b border-[var(--border)] bg-[rgba(255,253,246,0.92)] backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-6 max-md:flex-col max-md:items-start max-sm:px-4">
            <div className="flex items-center gap-3">
              <Image
                alt="AgriGrant NY logo"
                className="h-11 w-11 object-contain"
                height={44}
                src="/logo-csgc.png"
                width={44}
              />
              <div>
                <strong className="block text-lg font-semibold text-[var(--evergreen)]">{siteContent.brand.name}</strong>
                <span className="block text-sm text-[var(--muted-ink)]">{siteContent.brand.tagline}</span>
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

        <main className="mx-auto max-w-7xl py-0">
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
            <Image
              alt="AgriGrant NY logo"
              className="h-11 w-11 rounded-full object-contain"
              height={44}
              src="/logo-csgc.png"
              width={44}
            />
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
  const workflowRef = useRef<HTMLElement | null>(null);
  const exampleRef = useRef<HTMLElement | null>(null);
  const [workflowProgress, setWorkflowProgress] = useState(0);
  const [exampleProgress, setExampleProgress] = useState(0);

  useEffect(() => {
    function updateWorkflowProgress() {
      const node = workflowRef.current;

      if (!node) return;

      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.22;
      const end = rect.height - viewportHeight * 0.32;
      const traveled = start - rect.top;
      const progress = end <= 0 ? 0 : Math.max(0, Math.min(1, traveled / end));

      setWorkflowProgress(progress);
    }

    updateWorkflowProgress();
    window.addEventListener("scroll", updateWorkflowProgress, { passive: true });
    window.addEventListener("resize", updateWorkflowProgress);

    return () => {
      window.removeEventListener("scroll", updateWorkflowProgress);
      window.removeEventListener("resize", updateWorkflowProgress);
    };
  }, []);

  useEffect(() => {
    function updateExampleProgress() {
      const node = exampleRef.current;

      if (!node) return;

      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const start = viewportHeight * 0.82;
      const end = viewportHeight * 0.22;
      const traveled = start - rect.top;
      const total = start - end;
      const progress = total <= 0 ? 0 : Math.max(0, Math.min(1, traveled / total));

      setExampleProgress(progress);
    }

    updateExampleProgress();
    window.addEventListener("scroll", updateExampleProgress, { passive: true });
    window.addEventListener("resize", updateExampleProgress);

    return () => {
      window.removeEventListener("scroll", updateExampleProgress);
      window.removeEventListener("resize", updateExampleProgress);
    };
  }, []);

  return (
    <div className="grid gap-0">
      <section className="section-bleed grid min-h-[calc(100vh-9rem)] grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] border-b border-[var(--line)] bg-[var(--paper)] max-[900px]:min-h-0 max-[900px]:grid-cols-1">
        <div className="flex items-center px-8 py-12 lg:px-12 lg:py-14">
          <div className="max-w-[42.5rem]">
            <span className="inline-flex border border-[var(--line)] bg-[var(--paper-soft)] px-3 py-2 text-[0.66rem] font-semibold text-[var(--evergreen)]">
              {siteContent.hero.eyebrow}
            </span>
            <h2 className="mt-5 max-w-[640px] text-[clamp(1.95rem,3.7vw,3.35rem)] leading-[0.95] tracking-[-0.03em] text-[var(--evergreen)]">
              {siteContent.hero.title}
            </h2>
            <p className="mt-5 max-w-[38rem] text-[0.88rem] leading-6 text-[var(--muted-ink)]">{siteContent.hero.body}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="bg-[var(--evergreen)] px-5 py-3 text-sm font-semibold text-[var(--inverse)] transition hover:bg-[var(--clay)]" href="#login">
                {siteContent.hero.primaryCta}
              </a>
              <a
                className="border border-[var(--line)] bg-[var(--paper-soft)] px-5 py-3 text-sm font-semibold text-[var(--evergreen)] transition hover:bg-[var(--linen)]"
                href={siteContent.hero.secondaryHref}
              >
                {siteContent.hero.secondaryCta}
              </a>
            </div>
            <div className="mt-6 border-t border-black pt-4 text-[0.8rem] leading-5 text-[var(--muted-ink)]">
              {siteContent.hero.note}
            </div>
            <p className="mt-4 text-[0.8rem] leading-5 text-[var(--muted-ink)]">
              Contact: <a className="font-semibold text-[var(--evergreen)] underline decoration-black underline-offset-3" href="mailto:contact@agrigrantny.com">contact@agrigrantny.com</a>
            </p>
          </div>
        </div>

        <div className="relative min-h-[540px] overflow-hidden border-l border-[var(--line)] max-[900px]:min-h-[420px] max-[900px]:border-l-0 max-[900px]:border-t">
          <Image
            alt="Greenhouse team carrying trays through a working farm structure"
            className="object-cover"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 52vw"
            src="/stock/greenhouse-team.jpg"
          />
          <div className="absolute inset-0 bg-[rgba(18,61,50,0.18)]" />
          <div className="absolute left-6 top-6 max-w-[16rem] border border-black bg-[rgba(18,61,50,0.72)] p-3 text-[var(--inverse)] md:left-8 md:top-8">
            <span className="text-[0.62rem] font-semibold text-[var(--pale-sage)]">
              {siteContent.hero.image.label}
            </span>
            <p className="mt-1 text-[0.8rem] font-semibold leading-5">{siteContent.hero.image.title}</p>
            <p className="mt-2 text-[0.76rem] leading-5 text-white/84">{siteContent.hero.image.note}</p>
          </div>
        </div>
      </section>

      <section className="section-bleed bg-[var(--pale-sage)] px-6 py-14" id="workflow" ref={workflowRef}>
        <div className="mx-auto max-w-7xl">
          <span className="text-[0.76rem] font-semibold text-[var(--clay)]">{siteContent.workflow.eyebrow}</span>
          <h3 className="mt-3 max-w-4xl font-sans text-[clamp(1.45rem,2vw,1.85rem)] font-semibold leading-tight text-[var(--ink)]">
            {siteContent.workflow.title}
          </h3>
          <div className="mt-8 grid grid-cols-[minmax(240px,0.55fr)_minmax(0,1.45fr)] gap-8 max-lg:grid-cols-1">
            <div className="border-t border-black pt-4">
              <p className="max-w-md text-[0.84rem] leading-5 text-[var(--muted-ink)]">
                AgriGrant NY turns scattered public program pages into a clearer shortlist and next-step checklist.
              </p>
            </div>
            <figure className="relative h-[220px] overflow-hidden border border-black">
              <Image
                alt="Rows of cropland under a dramatic sunrise sky"
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                src="/stock/cornfield-sunrise.jpg"
              />
            </figure>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-8 max-xl:grid-cols-2 max-sm:grid-cols-1">
            {siteContent.workflow.steps.map((step, index) => (
              <article className="relative" key={step.number}>
                {index < siteContent.workflow.steps.length - 1 && (
                  <>
                  <div className="absolute left-11 right-[-2rem] top-[22px] h-[2px] bg-[rgba(212,163,115,0.32)] max-xl:hidden" />
                  <div
                      className="absolute left-11 top-[22px] h-[2px] bg-[var(--clay)] transition-[width] duration-200 ease-out max-xl:hidden"
                      style={{
                        width: `calc((100% + 2rem - 2.75rem) * ${Math.max(0, Math.min(1, workflowProgress * (siteContent.workflow.steps.length - 1) - index))})`,
                      }}
                    />
                  </>
                )}
                <div
                  className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border text-[0.92rem] font-bold transition-all duration-200"
                  style={{
                    backgroundColor:
                      workflowProgress * (siteContent.workflow.steps.length - 1) >= index ? "var(--clay)" : "var(--cream)",
                    borderColor: "#000",
                    color:
                      workflowProgress * (siteContent.workflow.steps.length - 1) >= index ? "var(--inverse)" : "var(--evergreen)",
                    boxShadow:
                      workflowProgress * (siteContent.workflow.steps.length - 1) >= index
                        ? "0 0 0 4px rgba(212, 163, 115, 0.18)"
                        : "none",
                  }}
                >
                  {step.number}
                </div>
                <h4 className="mt-5 font-sans text-[0.96rem] font-semibold leading-tight text-[var(--ink)]">{step.title}</h4>
                <p className="mt-3 text-[0.84rem] leading-5 text-[var(--muted-ink)]">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-bleed border-t border-black bg-[var(--paper)] px-6 py-14" id="example" ref={exampleRef}>
        <div className="mx-auto grid max-w-7xl gap-8">
          <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] gap-10 max-lg:grid-cols-1">
            <div>
            <span className="text-[0.76rem] font-semibold text-[var(--clay)]">{siteContent.example.eyebrow}</span>
            <h3 className="mt-3 max-w-3xl font-sans text-[clamp(1.45rem,2vw,1.85rem)] font-semibold leading-tight text-[var(--ink)]">
              {siteContent.example.title}
            </h3>
            <p className="mt-4 max-w-3xl text-[0.86rem] leading-6 text-[var(--muted-ink)]">{siteContent.example.body}</p>
            <div
              className="mt-6 max-w-[40rem] transition-all duration-500"
              style={{
                opacity: Math.max(0, Math.min(1, exampleProgress * 1.2)),
                transform: `translateY(${24 - Math.min(exampleProgress, 1) * 24}px)`,
              }}
            >
              <ExamplePreview />
            </div>
          </div>
            <aside
              className="self-start border border-black bg-[var(--cream)] p-6 transition-all duration-500"
              style={{
                opacity: Math.max(0, Math.min(1, (exampleProgress - 0.18) * 1.35)),
                transform: `translateY(${24 - Math.max(0, Math.min(1, (exampleProgress - 0.18) * 1.35)) * 24}px)`,
              }}
            >
              <div className="border-l-[3px] border-black pl-4">
                <span className="text-[0.76rem] font-semibold text-[var(--clay)]">What a result should make clear</span>
                <ul className="mt-4 grid gap-4 text-[0.84rem] leading-5 text-[var(--muted-ink)]">
                  <li>Why the program may fit the farm profile</li>
                  <li>What information still needs checking</li>
                  <li>Which documents may be needed next</li>
                  <li>Where to continue on the official source page</li>
                </ul>
              </div>
              <div className="mt-6 border-t border-black pt-5">
                <AgentWorkbenchDemo progress={exampleProgress} />
                <p className="mt-3 text-[0.78rem] leading-5 text-[var(--muted-ink)]">
                  A future assistant could help compare source-backed options, flag eligibility gaps, and organize next documents before a farmer leaves for the official application.
                </p>
              </div>
            </aside>
          </div>
          <div
            className="grid grid-cols-3 gap-4 transition-all duration-500 max-md:grid-cols-1"
            style={{
              opacity: Math.max(0, Math.min(1, (exampleProgress - 0.4) * 1.7)),
              transform: `translateY(${18 - Math.max(0, Math.min(1, (exampleProgress - 0.4) * 1.7)) * 18}px)`,
            }}
          >
            <TrustMini text="Every match points back to a public program page." title="Source link visible" />
            <TrustMini text="Farmers can see when a record was last checked." title="Review timing shown" />
            <TrustMini text="The tool helps organize next steps before applying." title="Preparation first" />
          </div>
        </div>
      </section>

      <section className="section-bleed bg-white px-6 py-14" id="about">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_minmax(320px,420px)] gap-10 max-lg:grid-cols-1">
          <div>
            <span className="text-[0.76rem] font-semibold text-[var(--clay)]">{siteContent.about.eyebrow}</span>
            <h3 className="mt-3 max-w-4xl font-sans text-[clamp(1.5rem,2.1vw,1.95rem)] font-semibold leading-tight text-[var(--ink)]">
              {siteContent.about.title}
            </h3>
            <p className="mt-4 max-w-3xl text-[0.86rem] leading-6 text-[var(--muted-ink)]">
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
            <p className="mt-8 border-t border-[var(--line)] pt-5 text-[0.82rem] font-semibold leading-5 text-[var(--muted-ink)]">
              {siteContent.about.funding}
            </p>
          </div>
          <aside className="overflow-hidden border border-black bg-[var(--sage)]/28 text-[var(--ink)]" id="login">
            <div className="relative h-48">
              <Image
                alt="Farmer holding a basket of fresh produce"
                className="object-cover opacity-82"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                src="/stock/harvest-crate.jpg"
              />
              <div className="absolute inset-0 bg-[rgba(18,61,50,0.18)]" />
              <span className="absolute left-5 top-5 text-sm font-semibold text-[var(--inverse)]">
                {siteContent.support.eyebrow}
              </span>
            </div>
            <div className="p-6">
              <h4 className="font-sans text-[1.2rem] font-semibold leading-tight text-[var(--ink)]">{siteContent.support.title}</h4>
              <p className="mt-4 text-[0.84rem] leading-5 text-[var(--muted-ink)]">{siteContent.support.body}</p>
              <ul className="mt-5 grid gap-3">
                {siteContent.support.items.map((item) => (
                  <li className="flex items-start gap-3" key={item}>
                    <span className="mt-1 flex h-5 w-5 items-center justify-center border border-[var(--line)] bg-[var(--paper-soft)] text-xs font-bold text-[var(--evergreen)]">
                      •
                    </span>
                    <span className="text-[0.82rem] leading-5 text-[var(--muted-ink)]">{item}</span>
                  </li>
                ))}
              </ul>
              <form className="mt-6 border-t border-[var(--line)] pt-5">
                <div>
                  <span className="text-xs font-semibold text-[var(--clay)]">{siteContent.login.panelEyebrow}</span>
                  <h4 className="mt-2 font-sans text-xl font-semibold leading-tight text-[var(--ink)]">{siteContent.login.panelTitle}</h4>
                </div>
                <div className="mt-4 grid gap-4">
                  <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">
                    {siteContent.login.emailLabel}
                    <input
                      className="min-h-12 border border-[var(--line)] bg-[var(--paper-soft)] px-4 text-[var(--foreground)]"
                      onChange={(event) => {
                        setLogin({ ...login, email: event.target.value });
                        setLoginError("");
                      }}
                      placeholder={siteContent.login.emailPlaceholder}
                      type="email"
                      value={login.email}
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-[var(--ink)]">
                    {siteContent.login.passwordLabel}
                    <input
                      className="min-h-12 border border-[var(--line)] bg-[var(--paper-soft)] px-4 text-[var(--foreground)]"
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
                    className="min-h-12 bg-[var(--evergreen)] px-4 font-semibold text-[var(--inverse)] transition hover:bg-[var(--clay)]"
                    onClick={enterDashboard}
                    type="button"
                  >
                    {siteContent.login.signInCta}
                  </button>
                  <button
                    className="min-h-12 border border-[var(--line)] bg-[var(--paper-soft)] px-4 font-semibold text-[var(--evergreen)]"
                    onClick={enterDashboard}
                    type="button"
                  >
                    {siteContent.login.signUpCta}
                  </button>
                </div>
              </form>
              <div className="mt-5 border-t border-[var(--line)] pt-4">
                <strong className="block text-sm font-semibold text-[var(--moss)]">Contact / corrections</strong>
                <p className="mt-2 text-sm leading-7 text-[var(--muted-ink)]">
                  Use contact@agrigrantny.com for corrections, questions, and source issues.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <footer className="section-bleed border-t-4 border-black bg-[var(--deep-forest)] px-6 py-10 text-sm leading-7 text-[rgba(255,253,244,0.78)]">
        <div className="mx-auto grid max-w-7xl gap-3">
          <p>{siteContent.footer.contact}</p>
          <p>{siteContent.footer.policy}</p>
          <p>{siteContent.footer.privacy}</p>
        </div>
      </footer>
    </div>
  );
}

function TrustMini({ title, text }: { title: string; text: string }) {
  return (
    <article className="border-t border-black bg-[rgba(254,250,224,0.72)] px-4 py-4">
      <strong className="block text-sm font-semibold text-[var(--ink)]">{title}</strong>
      <p className="mt-2 text-sm leading-7 text-[var(--muted-ink)]">{text}</p>
    </article>
  );
}

function AgentWorkbenchDemo({ progress }: { progress: number }) {
  const stageOne = Math.max(0, Math.min(1, progress * 1.35));
  const stageTwo = Math.max(0, Math.min(1, (progress - 0.18) * 1.55));
  const stageThree = Math.max(0, Math.min(1, (progress - 0.38) * 1.75));

  return (
    <div className="border border-black bg-[var(--paper-soft)]">
      <div className="flex items-center justify-between border-b border-black bg-[rgba(0,0,0,0.04)] px-3 py-2">
        <div>
          <strong className="block text-[0.78rem] font-semibold text-[var(--ink)]">AI agent workspace</strong>
          <span className="block text-[0.68rem] text-[var(--muted-ink)]">Future workflow preview</span>
        </div>
        <span className="border border-black px-2 py-1 font-mono text-[0.62rem] text-[var(--muted-ink)]">
          TASK THREAD
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,1.1fr)_160px] max-sm:grid-cols-1">
        <div className="border-r border-black p-3 max-sm:border-r-0 max-sm:border-b">
          <div className="grid gap-3">
            <div
              className="max-w-[86%] border border-black bg-[rgba(0,0,0,0.03)] px-3 py-2 text-[0.72rem] leading-5 text-[var(--ink)] transition-all duration-400"
              style={{ opacity: stageOne, transform: `translateY(${18 - stageOne * 18}px)` }}
            >
              Help me compare irrigation grants for a Tompkins County vegetable farm and show what I still need before applying.
            </div>
            <div
              className="max-w-[92%] border border-black bg-white px-3 py-2 text-[0.72rem] leading-5 text-[var(--muted-ink)] transition-all duration-400"
              style={{ opacity: stageTwo, transform: `translateY(${18 - stageTwo * 18}px)` }}
            >
              I can use your farm profile, saved grants, and source records to organize likely matches, open questions, and next documents.
            </div>
            <div
              className="border border-black bg-[rgba(0,0,0,0.035)] p-3 transition-all duration-500"
              style={{ opacity: stageThree, transform: `translateY(${18 - stageThree * 18}px)` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <strong className="block text-[0.74rem] font-semibold text-[var(--ink)]">Current task: irrigation planning grants</strong>
                  <span className="block text-[0.68rem] text-[var(--muted-ink)]">Using profile, shortlist, checklist, and source records</span>
                </div>
                <span className="border border-black px-2 py-1 text-[0.62rem] font-semibold text-[var(--ink)]">ACTIVE</span>
              </div>
              <div className="mt-3 grid gap-2">
                <div className="border border-black bg-white p-2">
                  <strong className="block text-[0.66rem] font-semibold text-[var(--ink)]">Top match</strong>
                  <p className="mt-1 text-[0.66rem] leading-4 text-[var(--muted-ink)]">NYS SWCD Water Quality Improvement Project</p>
                  <p className="mt-1 text-[0.62rem] leading-4 text-[var(--muted-ink)]">Source link visible • Reviewed June 2026</p>
                </div>
                <div className="border border-black bg-white p-2">
                  <strong className="block text-[0.66rem] font-semibold text-[var(--ink)]">Eligibility gap</strong>
                  <p className="mt-1 text-[0.66rem] leading-4 text-[var(--muted-ink)]">Water source details and conservation-plan status still need confirmation.</p>
                </div>
              </div>
            </div>
            <div
              className="flex items-center justify-between border border-black bg-white px-3 py-2 transition-all duration-500"
              style={{ opacity: stageThree, transform: `translateY(${18 - stageThree * 18}px)` }}
            >
              <span className="text-[0.68rem] text-[var(--muted-ink)]">Ask about deadlines, required files, or source links</span>
              <span className="font-mono text-[0.72rem] text-[var(--ink)]">→</span>
            </div>
          </div>
        </div>

        <div className="p-3">
          <div className="grid gap-3">
            <div className="border border-black bg-white p-2">
              <strong className="block text-[0.68rem] font-semibold text-[var(--ink)]">Agent context</strong>
              <ul className="mt-2 grid gap-1 text-[0.64rem] leading-4 text-[var(--muted-ink)]">
                <li>Farm profile</li>
                <li>Saved grants</li>
                <li>Checklist state</li>
                <li>Source records</li>
              </ul>
            </div>
            <div className="border border-black bg-white p-2">
              <strong className="block text-[0.68rem] font-semibold text-[var(--ink)]">Next documents</strong>
              <ul className="mt-2 grid gap-1 text-[0.64rem] leading-4 text-[var(--muted-ink)]">
                <li>Field map</li>
                <li>Irrigation scope</li>
                <li>Budget notes</li>
              </ul>
            </div>
            <div className="border border-black bg-[rgba(0,0,0,0.04)] p-2">
              <strong className="block text-[0.68rem] font-semibold text-[var(--ink)]">Workflow state</strong>
              <p className="mt-2 text-[0.64rem] leading-4 text-[var(--muted-ink)]">Preparing the farmer to continue on the official source page.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExamplePreview() {
  const preview = siteContent.hero.preview;

  return (
    <aside className="bg-ledger-panel border border-[var(--line-strong)] p-4 shadow-[0_14px_30px_rgba(22,49,43,0.12)]">
      <div className="relative border border-[var(--line)] bg-[var(--paper-soft)] p-5">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(20,32,27,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,32,27,0.03)_1px,transparent_1px)] bg-[size:22px_22px] opacity-30" />
        <div className="relative z-10 flex items-center justify-between gap-3 max-sm:items-start max-sm:flex-col">
          <span className="text-xs font-semibold text-[var(--moss)]">{preview.eyebrow}</span>
          <span className="border border-[rgba(168,95,61,0.46)] px-3 py-1 text-[0.72rem] font-semibold text-[var(--clay)]">
            {preview.match.stamp}
          </span>
        </div>
        <h3 className="relative z-10 mt-3 font-sans text-[1.6rem] font-semibold leading-tight text-[var(--ink)]">{preview.title}</h3>
        <p className="relative z-10 mt-3 text-sm leading-7 text-[var(--muted-ink)]">{preview.summary}</p>
        <dl className="relative z-10 mt-5 grid gap-3">
          {preview.profile.map(([label, value]) => (
            <div className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 border-b border-[var(--line)] pb-3 last:border-b-0 last:pb-0 max-sm:grid-cols-1" key={label}>
              <dt className="text-sm font-semibold text-[var(--evergreen)]">{label}</dt>
              <dd className="text-sm leading-6 text-[var(--muted-ink)]">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="relative z-10 mt-5 flex items-start justify-between gap-3 max-sm:items-start max-sm:flex-col">
          <div>
            <span className="text-xs font-semibold text-[var(--moss)]">Matched program</span>
            <h4 className="mt-2 font-sans text-xl font-semibold leading-tight text-[var(--ink)]">{preview.match.program}</h4>
          </div>
          <span className="border border-[#cfad99] bg-[#f0e3d7] px-3 py-1 text-xs font-semibold text-[#8a4b2e]">
            {preview.match.fit}
          </span>
        </div>

        <div className="relative z-10 mt-4 grid gap-2 text-sm leading-6 text-[var(--muted-ink)]">
          <p><strong className="text-[var(--evergreen)]">Review date:</strong> {preview.match.deadline}</p>
          <p><strong className="text-[var(--evergreen)]">Source:</strong> {preview.match.source}</p>
        </div>

        <div className="relative z-10 mt-4">
          <strong className="text-sm text-[var(--evergreen)]">What to prepare</strong>
          <ul className="mt-2 grid gap-2">
            {preview.requirements.map((item) => (
              <li className="flex items-start gap-3 text-sm leading-6 text-[var(--muted-ink)]" key={item}>
                <span className="mt-1 flex h-4 w-4 items-center justify-center border border-[var(--line)] bg-[var(--paper)] text-[10px] font-bold text-[var(--evergreen)]">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 mt-4 text-xs leading-6 text-[var(--muted-ink)]">{preview.caption}</p>
      </div>
    </aside>
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
    <article className="grid grid-cols-[140px_minmax(0,1fr)] gap-5 border-t border-[var(--line)] py-5 max-sm:grid-cols-1">
      <div className="flex h-36 items-center justify-center border border-[var(--line)] bg-[var(--linen)] p-4 text-center">
        <div>
          <span className="block text-[0.72rem] font-semibold text-[var(--moss)]">{role}</span>
          <strong className="mt-2 block font-mono text-base text-[var(--evergreen)]">{name}</strong>
        </div>
      </div>
      <div>
        <span className="text-sm font-semibold text-[var(--moss)]">{role}</span>
        <h4 className="font-sans text-2xl font-semibold leading-tight text-[var(--ink)]">{name}</h4>
        <p className="mt-3 max-w-3xl leading-7 text-[var(--muted-ink)]">{text}</p>
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
