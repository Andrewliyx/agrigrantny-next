"use client";

import { useMemo, useState } from "react";

type View = "welcome" | "login" | "dashboard" | "profile" | "grants" | "applications" | "assistant";

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
  { id: "welcome", label: "Welcome" },
  { id: "login", label: "Log In" },
  { id: "dashboard", label: "Dashboard" },
  { id: "profile", label: "Farm Profile" },
  { id: "grants", label: "Grant Finder" },
  { id: "applications", label: "Applications" },
  { id: "assistant", label: "Assistant" },
];

export default function Home() {
  const [activeView, setActiveView] = useState<View>("welcome");
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
      setLoginError("Enter your email and password to open the dashboard preview.");
      return;
    }

    setLoginError("");
    setActiveView("dashboard");
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_8%_8%,rgba(229,240,117,0.32),transparent_28%),radial-gradient(circle_at_92%_18%,rgba(180,82,50,0.15),transparent_26%),linear-gradient(135deg,#f8f3e8_0%,#eef3df_42%,#f7eadc_100%)] text-[#17201a]">
      <div className="grid min-h-screen grid-cols-[280px_minmax(0,1fr)] max-lg:grid-cols-1">
        <aside className="sticky top-0 flex h-screen flex-col gap-7 overflow-hidden bg-[linear-gradient(180deg,rgba(24,61,49,0.96),rgba(13,39,31,0.98))] p-6 text-[#f9f4e8] max-lg:static max-lg:h-auto">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#e5f075,#f2c35b)] text-xl font-black text-[#173328]">
              AG
            </span>
            <div>
              <strong className="block text-lg">AgriGrant NY</strong>
              <span className="block text-sm text-[#cce3d0]">Grant navigation for farms</span>
            </div>
          </div>

          <nav className="grid gap-2" aria-label="Primary navigation">
            {navItems.map((item) => (
              <button
                className={`min-h-11 rounded-lg px-3 text-left transition ${
                  activeView === item.id
                    ? "bg-[linear-gradient(135deg,#fff9e8,#e9f3d0)] font-semibold text-[#183d31] shadow-lg"
                    : "text-[#eaf2df] hover:bg-white/10"
                }`}
                key={item.id}
                onClick={() => setActiveView(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-lg border border-[#477462] bg-white/10 p-4">
            <span className="block text-xs font-extrabold uppercase text-[#e5f075]">Next integration</span>
            <p className="mt-2 text-sm leading-6 text-[#e0edde]">
              Connect Supabase Auth, a grant data source, and an AI assistant once the core workflow is
              in Next.js.
            </p>
          </div>
        </aside>

        <main className="min-w-0 p-7 max-sm:p-4">
          <header className="mb-7 flex items-center justify-between gap-5 rounded-lg border border-[#ded9cb]/80 bg-[#fffdf8]/75 p-4 shadow-[0_16px_36px_rgba(49,68,51,0.08)] backdrop-blur">
            <div>
              <span className="block text-xs font-extrabold uppercase text-[#6e7e30]">New York farmer portal</span>
              <h1 className="mt-1 text-4xl font-bold tracking-tight max-sm:text-3xl">{currentTitle}</h1>
            </div>
            <button
              className="rounded-lg bg-[linear-gradient(135deg,#173328,#315f4e)] px-5 py-3 font-semibold text-white shadow-[0_12px_24px_rgba(23,51,40,0.18)]"
              onClick={() => setActiveView("login")}
              type="button"
            >
              Log in
            </button>
          </header>

          {activeView === "welcome" && (
            <Welcome
              enterDashboard={enterDashboard}
              login={login}
              loginError={loginError}
              setLogin={setLogin}
              setLoginError={setLoginError}
            />
          )}
          {activeView === "login" && (
            <LoginView
              enterDashboard={enterDashboard}
              login={login}
              loginError={loginError}
              setActiveView={setActiveView}
              setLogin={setLogin}
              setLoginError={setLoginError}
            />
          )}
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

function LoginView({
  enterDashboard,
  login,
  loginError,
  setActiveView,
  setLogin,
  setLoginError,
}: {
  enterDashboard: () => void;
  login: { email: string; password: string };
  loginError: string;
  setActiveView: (view: View) => void;
  setLogin: (login: { email: string; password: string }) => void;
  setLoginError: (message: string) => void;
}) {
  return (
    <section className="grid min-h-[680px] grid-cols-[minmax(0,1fr)_minmax(360px,460px)] overflow-hidden rounded-lg border border-[#ded9cb] bg-[#fffdf8] shadow-[0_30px_70px_rgba(49,68,51,0.18)] max-lg:grid-cols-1">
      <div className="flex items-center bg-[linear-gradient(115deg,rgba(23,51,40,0.94),rgba(49,95,78,0.72)),url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center p-12 text-white max-sm:p-6">
        <div className="max-w-2xl">
          <span className="rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-extrabold">
            Farmer account access
          </span>
          <h2 className="mt-5 text-6xl font-bold leading-none tracking-tight max-sm:text-4xl">
            Sign in to continue your grant work.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#eef4e8]">
            This separate login page is a deployment test and the future location for Supabase Auth.
            When this appears on the live domain, GitHub to Vercel auto-deploy is working.
          </p>
          <button
            className="mt-8 rounded-lg border border-white/25 bg-white/15 px-5 py-3 font-bold"
            onClick={() => setActiveView("welcome")}
            type="button"
          >
            Back to program overview
          </button>
        </div>
      </div>

      <form className="flex flex-col justify-center gap-4 p-8 max-sm:p-6">
        <div>
          <span className="block text-xs font-extrabold uppercase text-[#6e7e30]">Separate login page</span>
          <h3 className="mt-2 text-3xl font-bold">Log in to AgriGrant NY</h3>
          <p className="mt-2 leading-7 text-[#526257]">
            Enter any email and password for this prototype. Real account validation comes next with Supabase.
          </p>
        </div>

        <label className="grid gap-2 text-sm font-bold text-[#4c5d51]">
          Email address
          <input
            className="min-h-12 rounded-lg border border-[#cdc9bd] bg-white px-3 text-[#17201a]"
            onChange={(event) => {
              setLogin({ ...login, email: event.target.value });
              setLoginError("");
            }}
            placeholder="farmer@example.com"
            type="email"
            value={login.email}
          />
        </label>

        <label className="grid gap-2 text-sm font-bold text-[#4c5d51]">
          Password
          <input
            className="min-h-12 rounded-lg border border-[#cdc9bd] bg-white px-3 text-[#17201a]"
            onChange={(event) => {
              setLogin({ ...login, password: event.target.value });
              setLoginError("");
            }}
            placeholder="Enter password"
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
          className="min-h-12 rounded-lg bg-[linear-gradient(135deg,#173328,#315f4e)] px-4 font-bold text-white shadow-[0_12px_24px_rgba(23,51,40,0.22)]"
          onClick={enterDashboard}
          type="button"
        >
          Log in and open dashboard
        </button>
        <button className="min-h-12 rounded-lg border border-[#d5d4c8] bg-white px-4 font-bold" type="button">
          Create farmer account
        </button>
      </form>
    </section>
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
      <section className="flex min-h-[620px] items-center overflow-hidden rounded-lg bg-[linear-gradient(105deg,rgba(15,44,35,0.94),rgba(42,89,72,0.7)_45%,rgba(247,234,220,0.12)),url('https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center p-14 text-white shadow-[0_30px_70px_rgba(49,68,51,0.24)] max-sm:min-h-0 max-sm:p-6">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-extrabold">
            Built for New York farms
          </span>
          <h2 className="mt-5 max-w-4xl text-7xl font-bold leading-[0.98] tracking-tight max-xl:text-6xl max-sm:text-4xl">
            Grant support for farmers who would rather be in the field than buried in forms.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#edf4e9]">
            AgriGrant NY helps farmers understand funding opportunities, organize application materials,
            and prepare stronger submissions for sustainability and business-growth grants.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {["Grant matching", "Application tracking", "AI-ready guidance"].map((item) => (
              <span className="rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-bold" key={item}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-[#ded9cb] bg-[#fffdf8]/90 p-9 shadow-[0_18px_38px_rgba(49,68,51,0.08)]">
        <span className="block text-xs font-extrabold uppercase text-[#6e7e30]">Program overview</span>
        <h3 className="mt-2 max-w-4xl text-4xl font-bold leading-tight">
          A guided workspace for finding, preparing, and tracking agricultural grants.
        </h3>
        <p className="mt-3 max-w-3xl leading-7 text-[#526257]">
          The platform is designed around the way farmers actually work: profile first, eligibility next,
          then a clear checklist for moving an application forward.
        </p>
        <div className="mt-6 grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1">
          <ProgramCard
            number="1"
            text="Capture county, farm type, business stage, sustainability goals, and project needs."
            title="Build your farm profile"
          />
          <ProgramCard
            number="2"
            text="Compare state, federal, and regional funding opportunities by project type."
            title="Find relevant grants"
          />
          <ProgramCard
            number="3"
            text="Track documents, budgets, deadlines, narratives, and missing requirements."
            title="Prepare application materials"
          />
          <ProgramCard
            number="4"
            text="Use verified grant context to explain eligibility and guide next steps."
            title="Use future AI guidance"
          />
        </div>
      </section>

      <section className="grid grid-cols-[minmax(0,1fr)_minmax(340px,440px)] items-center gap-10 rounded-lg border border-[#ded9cb] bg-[linear-gradient(135deg,rgba(229,240,117,0.22),rgba(255,253,248,0.9)),linear-gradient(90deg,#fffdf8,#f2ebda)] p-9 shadow-[0_22px_48px_rgba(49,68,51,0.12)] max-lg:grid-cols-1">
        <div>
          <span className="block text-xs font-extrabold uppercase text-[#6e7e30]">Farmer access</span>
          <h3 className="mt-2 text-4xl font-bold leading-tight">Sign in to view your dashboard.</h3>
          <p className="mt-3 max-w-2xl leading-7 text-[#526257]">
            This is a prototype login gate. Enter any email and password to continue. Supabase Auth will
            replace this local behavior in the next build step.
          </p>
        </div>

        <form className="grid gap-4 rounded-lg border border-[#ded9cb] bg-[#fffdf8]/95 p-6 shadow-[0_22px_46px_rgba(49,68,51,0.14)]">
          <div>
            <span className="block text-xs font-extrabold uppercase text-[#6e7e30]">Farmer portal</span>
            <h3 className="mt-1 text-2xl font-bold">Sign in to AgriGrant NY</h3>
          </div>
          <label className="grid gap-2 text-sm font-bold text-[#4c5d51]">
            Email address
            <input
              className="min-h-12 rounded-lg border border-[#cdc9bd] bg-white px-3 text-[#17201a]"
              onChange={(event) => {
                setLogin({ ...login, email: event.target.value });
                setLoginError("");
              }}
              placeholder="farmer@example.com"
              type="email"
              value={login.email}
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-[#4c5d51]">
            Password
            <input
              className="min-h-12 rounded-lg border border-[#cdc9bd] bg-white px-3 text-[#17201a]"
              onChange={(event) => {
                setLogin({ ...login, password: event.target.value });
                setLoginError("");
              }}
              placeholder="Enter password"
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
            className="min-h-12 rounded-lg bg-[linear-gradient(135deg,#173328,#315f4e)] px-4 font-bold text-white shadow-[0_12px_24px_rgba(23,51,40,0.22)]"
            onClick={enterDashboard}
            type="button"
          >
            Sign in and open dashboard
          </button>
          <button className="min-h-12 rounded-lg border border-[#d5d4c8] bg-white px-4 font-bold" type="button">
            Create farmer account
          </button>
        </form>
      </section>
    </div>
  );
}

function ProgramCard({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <article className="min-h-52 rounded-lg border border-[#e2d8c4] bg-[linear-gradient(180deg,#fffdf8,#fff7e7)] p-5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[linear-gradient(135deg,#173328,#315f4e)] font-black text-white">
        {number}
      </span>
      <h4 className="mt-4 text-lg font-bold">{title}</h4>
      <p className="mt-2 leading-7 text-[#526257]">{text}</p>
    </article>
  );
}

function Dashboard({ openGrants }: { openGrants: () => void }) {
  return (
    <div className="grid gap-6">
      <section className="rounded-lg bg-[linear-gradient(115deg,rgba(23,51,40,0.92),rgba(49,95,78,0.66)_48%,rgba(180,82,50,0.2)),url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center p-14 text-white shadow-[0_28px_60px_rgba(49,68,51,0.22)] max-sm:p-6">
        <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-extrabold">
          NY farms first
        </span>
        <h2 className="mt-5 max-w-4xl text-6xl font-bold leading-none tracking-tight max-sm:text-4xl">
          Find grants that match your farm, your county, and your next investment.
        </h2>
        <p className="mt-5 max-w-2xl leading-8 text-[#eef4e8]">
          Profile-based recommendations, saved opportunities, application checklists, and an assistant
          workspace ready for AI integration.
        </p>
        <button
          className="mt-7 rounded-lg bg-white px-5 py-3 font-bold text-[#173328]"
          onClick={openGrants}
          type="button"
        >
          Explore grants
        </button>
      </section>

      <section className="grid grid-cols-4 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1">
        <Stat label="County" value="Tompkins" />
        <Stat label="Farm type" value="Mixed produce" />
        <Stat label="Goal" value="Soil health" />
        <Stat label="Readiness" value="68%" />
      </section>

      <section className="rounded-lg border border-[#ded9cb] bg-[linear-gradient(135deg,rgba(229,240,117,0.34),rgba(255,253,248,0.86))] p-6">
        <span className="block text-xs font-extrabold uppercase text-[#6e7e30]">Profile insight</span>
        <h3 className="mt-1 text-2xl font-bold">Energy and soil-health grants are your strongest starting lane.</h3>
        <p className="mt-2 leading-7 text-[#405246]">
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
    <article className="rounded-lg border border-[#ded9cb] bg-[#fffdf8]/95 p-5 shadow-[0_18px_38px_rgba(49,68,51,0.08)]">
      <span className="text-sm text-[#697467]">{label}</span>
      <strong className="mt-2 block text-2xl">{value}</strong>
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
    <section className="rounded-lg border border-[#ded9cb] bg-[#fffdf8]/95 p-6 shadow-[0_18px_38px_rgba(49,68,51,0.08)]">
      <span className="block text-xs font-extrabold uppercase text-[#6e7e30]">{eyebrow}</span>
      <h3 className="mt-1 text-2xl font-bold">{title}</h3>
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
