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
      <div className="min-h-screen p-6 text-[var(--foreground)] max-sm:p-4">
        <header className="mx-auto mb-6 flex max-w-7xl items-center justify-between gap-5 rounded-[1.5rem] border border-[var(--border)]/80 bg-[var(--surface)]/90 px-5 py-4 shadow-[0_20px_45px_rgba(40,44,34,0.06)] backdrop-blur">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] font-mono text-sm font-bold text-[var(--forest)]">
              {siteContent.brand.logoText}
            </span>
            <div>
              <strong className="block text-lg font-semibold">{siteContent.brand.name}</strong>
              <span className="block text-sm text-[color:rgba(31,36,29,0.64)]">{siteContent.brand.tagline}</span>
            </div>
          </div>
          <a
            className="rounded-full border border-[var(--forest)] bg-[var(--forest)] px-5 py-3 text-sm font-semibold text-[var(--surface)] transition hover:bg-[var(--moss)]"
            href="#login"
          >
            {siteContent.publicHeader.loginCta}
          </a>
        </header>

        <main className="mx-auto max-w-7xl">
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
        <aside className="sticky top-0 flex h-screen flex-col gap-7 overflow-hidden bg-[var(--forest)] p-6 text-[var(--surface)] max-lg:static max-lg:h-auto">
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
          <header className="mb-7 flex items-center justify-between gap-5 rounded-[1.5rem] border border-[var(--border)]/80 bg-[var(--surface)]/88 p-4 shadow-[0_16px_36px_rgba(49,68,51,0.08)] backdrop-blur">
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
      <section className="grid min-h-[720px] grid-cols-[minmax(0,1.15fr)_320px] gap-6 overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_30px_70px_rgba(49,68,51,0.12)] max-xl:grid-cols-1 max-sm:p-4">
        <div className="relative overflow-hidden rounded-[1.6rem] bg-[linear-gradient(180deg,#ede3d2_0%,#f6f0e5_52%,#d8e1c8_100%)] p-10 max-sm:p-6">
          <div className="absolute inset-x-0 bottom-0 top-[52%] bg-[repeating-linear-gradient(0deg,rgba(85,106,71,0.06),rgba(85,106,71,0.06)_1px,transparent_1px,transparent_26px)]" />
          <div className="absolute -left-12 top-12 h-52 w-52 rounded-full bg-[rgba(168,96,58,0.16)] blur-3xl" />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[rgba(139,160,117,0.2)] blur-3xl" />
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex rounded-full border border-[var(--border)] bg-[rgba(251,247,239,0.88)] px-4 py-2 text-sm font-extrabold text-[var(--forest)]">
            {siteContent.hero.eyebrow}
          </span>
          <h2 className="mt-6 max-w-4xl text-[clamp(3rem,7vw,6.3rem)] leading-[0.92] text-[var(--forest)]">
            {siteContent.hero.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[rgba(31,36,29,0.78)]">
            {siteContent.hero.body}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {siteContent.hero.highlights.map((item) => (
              <span className="rounded-full border border-[rgba(35,57,45,0.14)] bg-[rgba(251,247,239,0.84)] px-4 py-2 text-sm font-semibold text-[var(--forest)]" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
        </div>
        <div className="grid gap-4">
          <MetricCard label="Current scope" value="NY farmers" body="Focused on sustainable practice and business support grants relevant to New York." />
          <MetricCard label="Prototype stage" value="Public pilot" body="The product direction is established. Auth, data, and grant operations are next." accent="clay" />
          <MetricCard label="Design direction" value="Human, not glossy" body="Structured, grounded, and editorial rather than stock-photo nonprofit aesthetic." />
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-9 shadow-[0_18px_38px_rgba(49,68,51,0.08)] max-sm:p-6">
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

      <section className="rounded-[1.75rem] border border-[var(--border)] bg-[linear-gradient(180deg,var(--surface)_0%,#f2e8da_100%)] p-9 shadow-[0_18px_38px_rgba(49,68,51,0.08)] max-sm:p-6">
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
        className="grid grid-cols-[minmax(0,1fr)_minmax(340px,440px)] items-center gap-10 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-9 shadow-[0_22px_48px_rgba(49,68,51,0.12)] max-lg:grid-cols-1 max-sm:p-6"
        id="login"
      >
        <div>
          <span className="block text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--moss)]">{siteContent.login.eyebrow}</span>
          <h3 className="mt-3 text-5xl leading-tight text-[var(--forest)] max-sm:text-4xl">{siteContent.login.title}</h3>
          <p className="mt-4 max-w-2xl leading-8 text-[rgba(31,36,29,0.72)]">
            {siteContent.login.body}
          </p>
        </div>

        <form className="grid gap-4 rounded-[1.5rem] border border-[var(--border)] bg-[linear-gradient(180deg,#f8f2e8_0%,#efe5d6_100%)] p-6 shadow-[0_22px_46px_rgba(49,68,51,0.10)]">
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
    <article className="min-h-56 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_10px_24px_rgba(40,44,34,0.04)]">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] font-mono text-sm font-bold text-[var(--forest)]">
        {number}
      </span>
      <h4 className="mt-5 text-2xl leading-tight text-[var(--forest)]">{title}</h4>
      <p className="mt-3 leading-7 text-[rgba(31,36,29,0.72)]">{text}</p>
    </article>
  );
}

function FounderCard({ initials, name, text }: { initials: string; name: string; text: string }) {
  return (
    <article className="grid grid-cols-[96px_minmax(0,1fr)] gap-5 rounded-[1.5rem] border border-[var(--border)] bg-[rgba(251,247,239,0.74)] p-5 max-sm:grid-cols-1">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] font-mono text-2xl font-bold text-[var(--forest)]">
        {initials}
      </div>
      <div>
        <h4 className="text-2xl leading-tight text-[var(--forest)]">{name}</h4>
        <p className="mt-3 leading-7 text-[rgba(31,36,29,0.72)]">{text}</p>
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
    <article className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[0_12px_30px_rgba(40,44,34,0.05)]">
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
          <label className="grid gap-2 text-sm font-bold text-[#4c5d51]" key={label}>
            {label}
            <input className="min-h-12 rounded-lg border border-[#cdc9bd] bg-white px-3" defaultValue={value} />
          </label>
        ))}
        <label className="col-span-2 grid gap-2 text-sm font-bold text-[#4c5d51] max-lg:col-span-1">
          Notes for future AI assistant
          <textarea
            className="min-h-28 rounded-lg border border-[#cdc9bd] bg-white p-3"
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
      <section className="rounded-lg border border-[#ded9cb] bg-[#fffdf8]/95 p-4 shadow-[0_18px_38px_rgba(49,68,51,0.08)]">
        <input
          className="min-h-12 w-full rounded-lg border border-[#cdc9bd] bg-white px-4"
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
    <article className="grid gap-3 rounded-lg border border-[#ded9cb] bg-[#fffdf8]/95 p-5 shadow-[0_18px_38px_rgba(49,68,51,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-[linear-gradient(135deg,#e7efd1,#fff0b8)] px-3 py-1 text-xs font-extrabold text-[#315f4e]">
          {grant.level}
        </span>
        <strong className="text-[#b45232]">{grant.fitScore}% fit</strong>
      </div>
      <h4 className="text-xl font-bold">{grant.name}</h4>
      <p className="leading-7 text-[#526257]">{grant.summary}</p>
      <div className="flex flex-wrap gap-3 text-sm text-[#697467]">
        <span>{grant.agency}</span>
        <span>{grant.deadline}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {grant.tags.map((tag) => (
          <span className="rounded-full border border-[#e3d1b5] bg-[#f2ebda] px-3 py-1 text-xs font-bold text-[#5e4b2b]" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      {!compact && (
        <div>
          <strong className="text-sm">Next steps</strong>
          <ul className="mt-2 list-disc pl-5 leading-7 text-[#526257]">
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
      <div className="min-h-[520px] rounded-lg border border-[#ded9cb] bg-[#fffdf8]/95 p-6 shadow-[0_18px_38px_rgba(49,68,51,0.08)]">
        <div className="rounded-lg bg-[linear-gradient(135deg,#e7efd1,#fff4c7)] p-4">
          <strong>Grant assistant workspace</strong>
          <p className="mt-2 leading-7 text-[#526257]">
            The future AI agent will use the farm profile, selected grants, application stage, and
            verified source data to guide each farmer.
          </p>
        </div>
        <div className="ml-auto mt-4 max-w-xl rounded-lg bg-[linear-gradient(135deg,#173328,#315f4e)] p-4 text-white">
          Which grants fit my soil health and cold storage goals?
        </div>
        <div className="mt-4 max-w-2xl rounded-lg bg-[linear-gradient(135deg,#f2ebda,#fff9e8)] p-4 leading-7">
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
    <section className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_18px_38px_rgba(49,68,51,0.08)]">
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
              done ? "border-[#ceda5e] bg-[linear-gradient(135deg,#e5f075,#f2c35b)]" : "border-[#b9b8ac]"
            }`}
          >
            {done ? "✓" : ""}
          </span>
          <p className="text-[#526257]">{label}</p>
        </li>
      ))}
    </ul>
  );
}
