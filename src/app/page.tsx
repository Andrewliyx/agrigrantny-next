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
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <div className="border-b border-[var(--border)] bg-[var(--forest)] px-6 py-2 text-sm text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 max-sm:block">
            <span>AgriGrant NY is a prototype public-service initiative for farm grant access.</span>
            <span className="text-white/80">New York agriculture · sustainability · business support</span>
          </div>
        </div>

        <header className="border-b border-[var(--border)] bg-[var(--surface)]">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-5 max-sm:px-4">
            <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] font-mono text-sm font-bold text-[var(--forest)]">
              {siteContent.brand.logoText}
            </span>
            <div>
              <strong className="block text-lg font-semibold text-[var(--forest)]">{siteContent.brand.name}</strong>
              <span className="block text-sm text-[var(--ink-soft)]">{siteContent.brand.tagline}</span>
            </div>
          </div>
          <a
            className="rounded-full border border-[var(--forest)] bg-[var(--forest)] px-5 py-3 text-sm font-semibold text-[var(--surface)] transition hover:bg-[var(--moss)]"
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
              <h1 className="mt-1 text-4xl font-bold tracking-tight max-sm:text-3xl">{currentTitle}</h1>
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
    <div className="grid gap-6">
      <section className="grid grid-cols-[minmax(0,1.2fr)_360px] gap-6 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_20px_48px_rgba(49,68,51,0.06)] max-xl:grid-cols-1 max-sm:p-4">
        <div className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-10 max-sm:p-6">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2 text-sm font-extrabold text-[var(--forest)]">
              {siteContent.hero.eyebrow}
            </span>
            <h2 className="mt-6 max-w-4xl text-[clamp(3rem,6.5vw,5.8rem)] leading-[0.95] text-[var(--forest)]">
              {siteContent.hero.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--ink-soft)]">
              {siteContent.hero.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {siteContent.hero.highlights.map((item) => (
                <span className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2 text-sm font-semibold text-[var(--forest)]" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <PhotoCard
            alt="Farm rows and greenhouse structures"
            body="Grant planning has to fit the actual operating rhythm of farms, not just funding language."
            caption="Production context"
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80"
          />
          <MetricCard
            label="Current scope"
            value="NY farmers"
            body="Focused on sustainable practice and business support grants relevant to New York."
          />
          <PhotoCard
            alt="Pasture and barn landscape"
            body="The site should read as a credible initiative first, with visuals supporting the message rather than leading it."
            caption="Working landscape"
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80"
          />
        </div>
      </section>

      <section className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-9 shadow-[0_18px_38px_rgba(49,68,51,0.05)] max-sm:p-6">
        <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">
          {siteContent.platformOverview.eyebrow}
        </span>
        <h3 className="mt-3 max-w-4xl text-5xl leading-tight text-[var(--forest)] max-sm:text-4xl">
          {siteContent.platformOverview.title}
        </h3>
        {siteContent.platformOverview.paragraphs.map((paragraph) => (
          <p className="mt-4 max-w-3xl leading-8 text-[rgba(31,36,29,0.72)]" key={paragraph}>
            {paragraph}
          </p>
        ))}
        <div className="mt-8 grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1">
          {siteContent.platformOverview.cards.map((card) => (
            <ProgramCard key={card.number} number={card.number} text={card.text} title={card.title} />
          ))}
        </div>
      </section>

      <section className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-9 shadow-[0_18px_38px_rgba(49,68,51,0.05)] max-sm:p-6">
        <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">{siteContent.about.eyebrow}</span>
        <h3 className="mt-3 max-w-4xl text-5xl leading-tight text-[var(--forest)] max-sm:text-4xl">
          {siteContent.about.title}
        </h3>
        <p className="mt-4 max-w-3xl leading-8 text-[rgba(31,36,29,0.72)]">
          {siteContent.about.body}
        </p>

        <div className="mt-7 grid grid-cols-2 gap-5 max-lg:grid-cols-1">
          {siteContent.about.founders.map((founder) => (
            <FounderCard
              initials={founder.initials}
              key={founder.name}
              name={founder.name}
              text={founder.text}
            />
          ))}
        </div>

        <p className="mt-7 border-t border-[var(--border)] pt-5 text-sm font-semibold leading-6 text-[rgba(31,36,29,0.72)]">
          {siteContent.about.funding}
        </p>
      </section>

      <section
        className="grid grid-cols-[minmax(0,1fr)_minmax(340px,440px)] items-center gap-10 rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface)] p-9 shadow-[0_22px_48px_rgba(49,68,51,0.07)] max-lg:grid-cols-1 max-sm:p-6"
        id="login"
      >
        <div>
          <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">{siteContent.login.eyebrow}</span>
          <h3 className="mt-3 text-5xl leading-tight text-[var(--forest)] max-sm:text-4xl">{siteContent.login.title}</h3>
          <p className="mt-4 max-w-2xl leading-8 text-[rgba(31,36,29,0.72)]">
            {siteContent.login.body}
          </p>
        </div>

        <form className="grid gap-4 rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-muted)] p-6 shadow-[0_22px_46px_rgba(49,68,51,0.06)]">
          <div>
            <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">
              {siteContent.login.panelEyebrow}
            </span>
            <h3 className="mt-2 text-3xl leading-tight text-[var(--forest)]">{siteContent.login.panelTitle}</h3>
          </div>
          <label className="grid gap-2 text-sm font-semibold text-[var(--forest)]">
            {siteContent.login.emailLabel}
            <input
              className="min-h-12 rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.7)] px-4 text-[var(--foreground)]"
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
              className="min-h-12 rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.7)] px-4 text-[var(--foreground)]"
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
            <p className="rounded-lg border border-[#e2a080] bg-[#fff1e8] px-3 py-2 text-sm text-[#8a2f18]" role="alert">
              {loginError}
            </p>
          )}
          <button
            className="min-h-12 rounded-full bg-[var(--forest)] px-4 font-semibold text-[var(--surface)] transition hover:bg-[var(--moss)]"
            onClick={enterDashboard}
            type="button"
          >
            {siteContent.login.signInCta}
          </button>
          <button
            className="min-h-12 rounded-full border border-[var(--border)] bg-[rgba(255,255,255,0.68)] px-4 font-semibold text-[var(--forest)]"
            onClick={enterDashboard}
            type="button"
          >
            {siteContent.login.signUpCta}
          </button>
        </form>
      </section>
    </div>
  );
}

function ProgramCard({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <article className="min-h-56 rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface)] p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-muted)] font-mono text-sm font-bold text-[var(--forest)]">
        {number}
      </span>
      <h4 className="mt-5 text-2xl leading-tight text-[var(--forest)]">{title}</h4>
      <p className="mt-3 leading-7 text-[rgba(31,36,29,0.72)]">{text}</p>
    </article>
  );
}

function FounderCard({ initials, name, text }: { initials: string; name: string; text: string }) {
  return (
    <article className="grid grid-cols-[96px_minmax(0,1fr)] gap-5 rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface-muted)] p-5 max-sm:grid-cols-1">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] font-mono text-2xl font-bold text-[var(--forest)]">
        {initials}
      </div>
      <div>
        <h4 className="text-2xl leading-tight text-[var(--forest)]">{name}</h4>
        <p className="mt-3 leading-7 text-[rgba(31,36,29,0.72)]">{text}</p>
      </div>
    </article>
  );
}

function PhotoCard({
  alt,
  body,
  caption,
  src,
}: {
  alt: string;
  body: string;
  caption: string;
  src: string;
}) {
  return (
    <article className="overflow-hidden rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface)]">
      <div
        aria-label={alt}
        className="h-44 w-full border-b border-[var(--border)] bg-cover bg-center"
        role="img"
        style={{ backgroundImage: `url(${src})` }}
      />
      <div className="p-4">
        <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">{caption}</span>
        <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">{body}</p>
      </div>
    </article>
  );
}

function MetricCard({
  label,
  value,
  body,
  accent = "moss",
}: {
  label: string;
  value: string;
  body: string;
  accent?: "moss" | "clay";
}) {
  const accentClass =
    accent === "clay"
      ? "bg-[rgba(168,96,58,0.14)] text-[var(--clay)]"
      : "bg-[rgba(139,160,117,0.16)] text-[var(--moss)]";

  return (
    <article className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface-muted)] p-5">
      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] ${accentClass}`}>
        {label}
      </span>
      <h3 className="mt-4 text-4xl leading-none text-[var(--forest)]">{value}</h3>
      <p className="mt-4 text-sm leading-7 text-[rgba(31,36,29,0.7)]">{body}</p>
    </article>
  );
}

function Dashboard({ openGrants }: { openGrants: () => void }) {
  return (
    <div className="grid gap-6">
      <section className="relative overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[linear-gradient(180deg,#efe5d6_0%,#f8f2e8_55%,#dbe5cc_100%)] p-14 shadow-[0_28px_60px_rgba(49,68,51,0.12)] max-sm:p-6">
        <div className="absolute inset-x-0 bottom-0 top-[56%] bg-[repeating-linear-gradient(0deg,rgba(85,106,71,0.05),rgba(85,106,71,0.05)_1px,transparent_1px,transparent_24px)]" />
        <div className="absolute right-[-6rem] top-[-5rem] h-64 w-64 rounded-full bg-[rgba(168,96,58,0.14)] blur-3xl" />
        <div className="absolute left-[-3rem] top-12 h-44 w-44 rounded-full bg-[rgba(139,160,117,0.18)] blur-3xl" />
        <div className="relative z-10">
        <span className="inline-flex rounded-full border border-[var(--border)] bg-[rgba(251,247,239,0.84)] px-4 py-2 text-sm font-extrabold text-[var(--forest)]">
          NY farms first
        </span>
        <h2 className="mt-5 max-w-4xl text-6xl leading-none text-[var(--forest)] max-sm:text-4xl">
          Find grants that match your farm, your county, and your next investment.
        </h2>
        <p className="mt-5 max-w-2xl leading-8 text-[rgba(31,36,29,0.74)]">
          Profile-based recommendations, saved opportunities, application checklists, and an assistant
          workspace ready for AI integration.
        </p>
        <button
          className="mt-7 rounded-full bg-[var(--forest)] px-5 py-3 font-semibold text-[var(--surface)] transition hover:bg-[var(--moss)]"
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

      <section className="rounded-[1.5rem] border border-[var(--border)] bg-[linear-gradient(135deg,rgba(139,160,117,0.14),rgba(251,247,239,0.98))] p-6">
        <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">Profile insight</span>
        <h3 className="mt-2 text-3xl leading-tight text-[var(--forest)]">Energy and soil-health grants are your strongest starting lane.</h3>
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
            <input className="min-h-12 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4" defaultValue={value} />
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
          className="min-h-12 w-full rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-4"
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
        <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-extrabold text-[var(--moss)]">
          {grant.level}
        </span>
        <strong className="text-[var(--clay)]">{grant.fitScore}% fit</strong>
      </div>
      <h4 className="text-3xl leading-tight text-[var(--forest)]">{grant.name}</h4>
      <p className="leading-7 text-[var(--ink-soft)]">{grant.summary}</p>
      <div className="flex flex-wrap gap-3 text-sm text-[rgba(31,36,29,0.58)]">
        <span>{grant.agency}</span>
        <span>{grant.deadline}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {grant.tags.map((tag) => (
          <span className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1 text-xs font-bold text-[var(--forest)]" key={tag}>
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
      <h3 className="mt-2 text-3xl leading-tight text-[var(--forest)]">{title}</h3>
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
