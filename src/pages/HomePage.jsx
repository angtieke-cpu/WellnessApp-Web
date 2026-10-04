import "./HomePage.css";

import {
  Activity,
  Apple,
  Brain,
  Dumbbell,
  Moon,
  QrCode,
  Sparkles,
  Zap,
} from "lucide-react";
import logoUrl from "./hersolace-logo.jpeg";


const PHASES = [
  {
    name: "Menstrual",
    color: "var(--phase-menstrual)",
    days: "Days 1–5",
    energy: "Lower, more inward",
    mood: "Reflective",
    sleep: "More rest needed",
    position: "hs-phase-menstrual-position",
  },
  {
    name: "Follicular",
    color: "var(--phase-follicular)",
    days: "Days 6–13",
    energy: "Rising and vital",
    mood: "Optimistic, focused",
    sleep: "Generally restful",
    position: "hs-phase-follicular-position",
  },
  {
    name: "Ovulatory",
    color: "var(--phase-ovulatory)",
    days: "Days 14–16",
    energy: "Peak and high",
    mood: "Confident, social",
    sleep: "Stable or lighter",
    position: "hs-phase-ovulatory-position",
  },
  {
    name: "Luteal",
    color: "var(--phase-luteal)",
    days: "Days 17–28",
    energy: "Gradually tapers",
    mood: "More sensitive",
    sleep: "May be disrupted",
    position: "hs-phase-luteal-position",
  },
];

const GUIDANCE = [
  { label: "Nutrition & seed cycling", note: "eat with the phase", icon: Apple },
  { label: "Movement & training", note: "train with your energy", icon: Dumbbell },
  { label: "Sleep & recovery", note: "protect the hard week", icon: Moon },
  { label: "Stress & nervous system", note: "lower the load", icon: Brain },
  { label: "Energy & mood", note: "plan around the curve", icon: Zap },
  { label: "Symptom forecast", note: "see it before it lands", icon: Activity },
  { label: "Skin & hair care", note: "the cycle you can see", icon: Sparkles },
];

export default function HomePage() {
  return (
    <div className="hersolace-homepage hs-min-h-screen hs-bg-cream hs-text-ink hs-antialiased hs-selection:bg-rose/30">
      <header className="hs-mx-auto hs-flex hs-max-w-6xl hs-items-center hs-justify-between hs-px-6 hs-pt-7">
        <div className="hs-flex hs-items-center hs-gap-2.5">
          <img src={logoUrl} alt="hersolace logo" className="hs-size-10 hs-rounded-full hs-object-cover" />
          <span className="hs-font-display hs-text-xl hs-tracking-tight">hersolace</span>
        </div>
        <nav className="hs-hidden hs-items-center hs-gap-8 hs-text-sm hs-text-ink/70 hs-md:flex">
          <a href="#formula" className="hs-hover:text-ink">
            4 · 7 · 1
          </a>
          <a href="#about" className="hs-hover:text-ink">
            About Us
          </a>
          <a href="#tutorial" className="hs-hover:text-ink">
            How It Works
          </a>
          <a href="#beta" className="hs-hover:text-ink">
            Beta
          </a>
        </nav>
        <a
          href="#beta"
          className="hs-rounded-full hs-border hs-border-ink/15 hs-px-4 hs-py-2 hs-text-sm hs-font-semibold hs-transition hs-hover:bg-ink hs-hover:text-cream"
        >
          Join the Beta
        </a>
      </header>

      {/* HERO */}
      <section className="hs-relative hs-mx-auto hs-max-w-6xl hs-overflow-hidden hs-px-6 hs-pt-16 hs-pb-24">
        <div className="hs-glow hs-absolute hs-inset-0 hs--z-10" />
        <div
          className="hs-absolute hs-top-[-18%] hs-right-[-10%] hs--z-10 hs-size-96 hs-rounded-full hs-opacity-60 hs-blur-3xl"
          style={{ background: "var(--amber)" }}
        />
        <div className="hs-grid hs-items-center hs-gap-12 hs-lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="hs-text-xs hs-font-semibold hs-uppercase hs-tracking-[0.22em] hs-text-coral">
              AI-powered women’s hormonal wellness and longevity platform
            </p>
            <h1 className="hs-mt-5 hs-font-display hs-text-[3.4rem] hs-leading-[1.02] hs-tracking-tight">
              Decode Hormones.
              <br />
              <span className="hs-italic hs-text-coral">Discover You.</span>
            </h1>
            <p className="hs-mt-6 hs-max-w-md hs-text-lg hs-leading-relaxed hs-text-ink/70">
              Personalized nutrition, movement, sleep and longevity guidance shaped by your hormones
              — from menarche to menopause.
            </p>
            <div className="hs-mt-8 hs-flex hs-flex-wrap hs-gap-3">
              <a
                href="#beta"
                className="hs-rounded-full hs-gradient-warm hs-px-6 hs-py-3 hs-text-sm hs-font-semibold hs-text-cream hs-shadow-soft"
              >
                Join the Beta
              </a>
              <a
                href="#tutorial"
                className="hs-rounded-full hs-border hs-border-ink/15 hs-px-6 hs-py-3 hs-text-sm hs-font-semibold hs-hover:bg-ink/5"
              >
                See How It Works
              </a>
            </div>
            <a
              href="#formula"
              className="hs-group hs-mt-9 hs-inline-flex hs-flex-wrap hs-items-center hs-gap-x-3 hs-gap-y-2 hs-rounded-full hs-border hs-border-ink/12 hs-bg-cream/70 hs-px-4 hs-py-2.5 hs-text-xs hs-backdrop-blur hs-transition hs-hover:border-coral/40 hs-hover:bg-cream"
            >
              <span className="hs-flex hs-items-center hs-gap-1.5">
                <span className="hs-font-display hs-text-base">4</span>
                <span className="hs-text-ink/55">life phases</span>
              </span>
              <span className="hs-h-3.5 hs-w-px hs-bg-ink/15" aria-hidden="true" />
              <span className="hs-flex hs-items-center hs-gap-1.5">
                <span className="hs-font-display hs-text-base">7</span>
                <span className="hs-text-ink/55">deep-guidance tracks</span>
              </span>
              <span className="hs-h-3.5 hs-w-px hs-bg-ink/15" aria-hidden="true" />
              <span className="hs-flex hs-items-center hs-gap-1.5">
                <span className="hs-font-display hs-text-base">1</span>
                <span className="hs-text-ink/55">AI model · SOL</span>
              </span>
              <span className="hs-font-semibold hs-text-coral hs-transition hs-group-hover:translate-x-0.5">
                See the idea →
              </span>
            </a>
          </div>

          <div className="hs-relative">
            <div
              className="hs-absolute hs--inset-4 hs--z-10 hs-rounded-[2rem] hs-opacity-70 hs-blur-2xl"
              style={{
                background:
                  "radial-gradient(circle at 40% 30%, color-mix(in oklab, var(--rose) 50%, transparent), color-mix(in oklab, var(--amber) 20%, transparent))",
              }}
            />
            <div className="hs-rounded-[1.75rem] hs-border hs-border-cream/60 hs-bg-cream/90 hs-p-5 hs-shadow-soft hs-sm:p-6">
              <p className="hs-text-xs hs-font-semibold hs-uppercase hs-tracking-[0.22em] hs-text-coral">
                Your cycle rhythm
              </p>
              <h2 className="hs-mt-2 hs-font-display hs-text-2xl hs-leading-tight">
                How energy, mood &amp; sleep shift
              </h2>
              <div className="hs-relative hs-mx-auto hs-mt-5 hs-h-[27rem] hs-w-full hs-max-w-[29rem] hs-sm:h-[30rem]">
                {PHASES.map((phase) => (
                  <article key={phase.name} className={`hs-absolute hs-w-[42%] ${phase.position}`}>
                    <h3 className="hs-font-display hs-text-base hs-sm:text-lg" style={{ color: phase.color }}>
                      {phase.name}
                    </h3>
                    <div className="hs-mt-1 hs-space-y-0.5 hs-text-[10px] hs-leading-relaxed hs-text-ink/55 hs-sm:text-xs">
                      <p><span className="hs-font-semibold hs-text-ink/75">Energy:</span> {phase.energy}</p>
                      <p><span className="hs-font-semibold hs-text-ink/75">Mood:</span> {phase.mood}</p>
                      <p><span className="hs-font-semibold hs-text-ink/75">Sleep:</span> {phase.sleep}</p>
                    </div>
                  </article>
                ))}

                <div className="hs-absolute hs-inset-0 hs-m-auto hs-grid hs-size-52 hs-place-items-center hs-rounded-full hs-border hs-border-ink/5 hs-bg-cream hs-shadow-soft hs-sm:size-60">
                  <svg viewBox="0 0 100 100" className="hs-absolute hs-inset-0 hs-size-full hs--rotate-90" aria-label="Four phases of the menstrual cycle">
                    {PHASES.map((phase, index) => (
                      <circle
                        key={phase.name}
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke={phase.color}
                        strokeWidth="7"
                        strokeDasharray="24 76"
                        strokeDashoffset={String(index * -25)}
                        strokeLinecap="round"
                        pathLength="100"
                      />
                    ))}
                  </svg>
                  <div className="hs-relative hs-text-center">
                    <p className="hs-text-[10px] hs-font-semibold hs-uppercase hs-tracking-[0.18em] hs-text-ink/40">Your cycle</p>
                    <p className="hs-mt-1 hs-font-display hs-text-2xl">Four phases</p>
                    <p className="hs-mt-1 hs-text-[11px] hs-text-ink/45">One connected rhythm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE FORMULA — 4 · 7 · 1 */}
      <section id="formula" className="hs-relative hs-overflow-hidden hs-bg-surface-deep hs-text-cream">
        <div className="hs-sol-glow hs-pointer-events-none hs-absolute hs-inset-0" aria-hidden="true" />
        <div
          className="hs-pointer-events-none hs-absolute hs--top-32 hs-left-1/2 hs-size-[34rem] hs--translate-x-1/2 hs-rounded-full hs-opacity-25 hs-blur-3xl"
          style={{ background: "radial-gradient(circle, var(--plum), transparent 65%)" }}
          aria-hidden="true"
        />

        <div className="hs-relative hs-mx-auto hs-max-w-6xl hs-px-6 hs-py-24">
          <div className="hs-formula-headline hs-max-w-2xl">
            <p className="hs-text-xs hs-font-semibold hs-uppercase hs-tracking-[0.28em] hs-text-amber">
              the idea in three numbers
            </p>
            <h2 className="hs-mt-4 hs-font-display hs-text-4xl hs-leading-[1.08] hs-tracking-tight hs-md:text-5xl">
              Four phases. Seven guidance tracks.{" "}
              <span className="hs-gradient-text-sol hs-italic">One model that learns you.</span>
            </h2>
            <p className="hs-mt-5 hs-max-w-xl hs-leading-relaxed hs-text-cream/65">
              Everything in hersolace hangs on this: your cycle moves through four phases, guidance
              arrives across seven tracks, and all of it comes from one AI model that keeps learning
              your body.
            </p>
          </div>

          <div className="hs-mt-14 hs-grid hs-gap-6 hs-lg:grid-cols-3">
            {/* 4 — life phases */}
            <div className="hs-formula-panel">
              <article className="hs-group hs-h-full hs-rounded-[1.75rem] hs-border hs-border-cream/12 hs-bg-cream/[0.05] hs-p-7 hs-transition hs-duration-300 hs-hover:-translate-y-1 hs-hover:border-cream/25 hs-hover:bg-cream/[0.08]">
                <div className="hs-flex hs-items-end hs-justify-between hs-gap-3">
                  <span className="hs-gradient-text-sol hs-font-display hs-text-8xl hs-leading-[0.75]">4</span>
                  <span className="hs-mb-1 hs-text-right hs-text-[11px] hs-font-semibold hs-uppercase hs-leading-relaxed hs-tracking-[0.2em] hs-text-cream/45">
                    life phases
                    <br />
                    mapped
                  </span>
                </div>
                <ul className="hs-mt-8 hs-space-y-4">
                  {PHASES.map((phase) => (
                    <li key={phase.name} className="hs-flex hs-items-center hs-gap-3">
                      <span
                        className="hs-size-2.5 hs-shrink-0 hs-rounded-full"
                        style={{ background: phase.color }}
                        aria-hidden="true"
                      />
                      <span className="hs-font-display hs-text-lg hs-leading-none">{phase.name}</span>
                      <span className="hs-mx-1 hs-h-px hs-flex-1 hs-bg-cream/12 hs-transition-all hs-duration-300 hs-group-hover:bg-cream/25" />
                      <span className="hs-shrink-0 hs-text-[11px] hs-text-cream/45">{phase.days}</span>
                    </li>
                  ))}
                </ul>
                <p className="hs-mt-7 hs-text-xs hs-leading-relaxed hs-text-cream/45">
                  Every read, plan and answer in the app starts from where you are in this cycle.
                </p>
              </article>
            </div>

            {/* 7 — deep guidance */}
            <div className="hs-formula-panel">
              <article className="hs-group hs-h-full hs-rounded-[1.75rem] hs-border hs-border-cream/12 hs-bg-cream/[0.05] hs-p-7 hs-transition hs-duration-300 hs-hover:-translate-y-1 hs-hover:border-cream/25 hs-hover:bg-cream/[0.08]">
                <div className="hs-flex hs-items-end hs-justify-between hs-gap-3">
                  <span className="hs-gradient-text-sol hs-font-display hs-text-8xl hs-leading-[0.75]">7</span>
                  <span className="hs-mb-1 hs-text-right hs-text-[11px] hs-font-semibold hs-uppercase hs-leading-relaxed hs-tracking-[0.2em] hs-text-cream/45">
                    deep-guidance
                    <br />
                    tracks
                  </span>
                </div>
                <ul className="hs-mt-7 hs-divide-y hs-divide-cream/10">
                  {GUIDANCE.map(({ label, note, icon: Icon }) => (
                    <li key={label} className="hs-flex hs-items-center hs-gap-3 hs-py-2.5">
                      <span className="hs-grid hs-size-8 hs-shrink-0 hs-place-items-center hs-rounded-xl hs-border hs-border-cream/12 hs-bg-cream/[0.06] hs-text-amber hs-transition hs-duration-300 hs-hover:border-amber/45 hs-hover:bg-amber/15">
                        <Icon className="hs-size-4" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="hs-text-[13px] hs-font-semibold hs-leading-tight">{label}</span>
                      <span className="hs-ml-auto hs-shrink-0 hs-text-right hs-text-[10px] hs-leading-tight hs-text-cream/35">
                        {note}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="hs-mt-5 hs-text-xs hs-leading-relaxed hs-text-cream/45">
                  Not a content library — seven living recommendations, rewritten as your data changes.
                </p>
              </article>
            </div>

            {/* 1 — SOL */}
            <div className="hs-formula-panel">
              <article className="hs-group hs-h-full hs-rounded-[1.75rem] hs-border hs-border-cream/12 hs-bg-cream/[0.05] hs-p-7 hs-transition hs-duration-300 hs-hover:-translate-y-1 hs-hover:border-cream/25 hs-hover:bg-cream/[0.08]">
                <div className="hs-flex hs-items-end hs-justify-between hs-gap-3">
                  <span className="hs-gradient-text-sol hs-font-display hs-text-8xl hs-leading-[0.75]">1</span>
                  <span className="hs-mb-1 hs-text-right hs-text-[11px] hs-font-semibold hs-uppercase hs-leading-relaxed hs-tracking-[0.2em] hs-text-cream/45">
                    AI model
                    <br />
                    named SOL
                  </span>
                </div>

                <div className="hs-relative hs-mx-auto hs-mt-8 hs-grid hs-size-44 hs-place-items-center">
                  <span
                    className="hs-absolute hs-inset-0 hs-animate-sol-spin hs-rounded-full hs-border hs-border-dashed hs-border-cream/20"
                    aria-hidden="true"
                  />
                  <span className="hs-absolute hs-inset-0 hs-animate-sol-spin" aria-hidden="true">
                    <span className="hs-absolute hs-left-1/2 hs-top-0 hs-size-2.5 hs--translate-x-1/2 hs-rounded-full hs-bg-amber" />
                  </span>
                  <span className="hs-absolute hs-inset-5 hs-rounded-full hs-border hs-border-cream/10" aria-hidden="true" />
                  <span
                    className="hs-absolute hs-inset-7 hs-animate-sol-breathe hs-rounded-full hs-gradient-sol hs-opacity-80 hs-blur-xl"
                    aria-hidden="true"
                  />
                  <span className="hs-relative hs-grid hs-size-24 hs-place-items-center hs-rounded-full hs-gradient-warm hs-shadow-soft">
                    <span className="hs-font-display hs-text-3xl hs-tracking-tight hs-text-cream">SOL</span>
                  </span>
                </div>

                <p className="hs-mt-7 hs-text-sm hs-leading-relaxed hs-text-cream/65">
                  SOL is the single model underneath the whole app. It reads your phase, your
                  check-ins and your history, then writes all seven tracks for today — and answers
                  when you ask it directly.
                </p>
                <div className="hs-mt-5 hs-flex hs-flex-wrap hs-gap-2">
                  {["Your data, not a generic chart", "Plain-language answers", "Sharper every cycle"].map(
                    (chip) => (
                      <span
                        key={chip}
                        className="hs-rounded-full hs-border hs-border-cream/12 hs-bg-cream/[0.06] hs-px-3 hs-py-1 hs-text-[11px] hs-text-cream/55"
                      >
                        {chip}
                      </span>
                    ),
                  )}
                </div>
              </article>
            </div>
          </div>

          <div className="hs-formula-panel hs-mt-8 hs-rounded-2xl hs-border hs-border-cream/12 hs-bg-cream/[0.04] hs-px-6 hs-py-5">
            <p className="hs-flex hs-flex-wrap hs-items-center hs-justify-center hs-gap-x-3 hs-gap-y-2 hs-text-center hs-text-sm hs-text-cream/60">
              <span className="hs-font-display hs-text-2xl hs-text-cream">4</span> phases read
              <span className="hs-text-cream/25" aria-hidden="true">
                ×
              </span>
              <span className="hs-font-display hs-text-2xl hs-text-cream">7</span> guidance tracks
              <span className="hs-text-cream/25" aria-hidden="true">
                →
              </span>
              <span className="hs-gradient-text-sol hs-font-display hs-text-2xl">1</span> answer that is yours
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section id="about" className="hs-border-y hs-border-ink/10 hs-bg-sand/30">
        <div className="hs-mx-auto hs-max-w-6xl hs-px-6 hs-py-24">
          <div className="hs-max-w-xl">
            <p className="hs-text-xs hs-font-semibold hs-uppercase hs-tracking-[0.22em] hs-text-coral">
              About us
            </p>
            <h2 className="hs-mt-3 hs-font-display hs-text-4xl hs-leading-tight hs-tracking-tight">
               Why hersolace exists
            </h2>
            <p className="hs-mt-5 hs-leading-relaxed hs-text-ink/65">
               Hormones shift across the month, changing how your body responds to food, movement,
               stress and sleep. hersolace turns that biology into personal guidance, so you can
               understand your patterns instead of guessing.
            </p>
          </div>

          <div className="hs-mt-12 hs-grid hs-gap-5 hs-md:grid-cols-2">
            <div className="hs-rounded-2xl hs-bg-cream hs-p-7">
              <h3 className="hs-font-display hs-text-2xl hs-tracking-tight">
                Phase-Aware AI Recommendations
              </h3>
              <p className="hs-mt-3 hs-leading-relaxed hs-text-ink/65">
                 Unlike trackers that log data and stop there, hersolace routes every symptom, mood
                and check-in entry into a central AI model. That model generates your daily
                nutrition, movement and recovery guidance — not a generic content library, and not a
                static one-size-fits-all cycle chart.
              </p>
            </div>
            <div className="hs-rounded-2xl hs-bg-cream hs-p-7">
              <h3 className="hs-font-display hs-text-2xl hs-tracking-tight">Built for Every Life Stage</h3>
              <p className="hs-mt-3 hs-leading-relaxed hs-text-ink/65">
                 Most cycle apps are built around a single use case — usually conception. hersolace
                serves women from menarche to menopause, including future support for PCOS,
                hormonal contraceptive use, postpartum and perimenopause.
              </p>
            </div>
            <div className="hs-rounded-2xl hs-bg-cream hs-p-7">
              <h3 className="hs-font-display hs-text-2xl hs-tracking-tight">
                Optimized for decades, not a month
              </h3>
              <p className="hs-mt-3 hs-leading-relaxed hs-text-ink/65">
                Hormonal patterns tracked consistently over years are early signals for long-term
                health. Pattern memory across years, compounding phase-aligned habits, and a
                doctor-ready export you can bring to your gynecologist — longevity is the reason our
                AI model exists.
              </p>
            </div>
            <div className="hs-rounded-2xl hs-bg-cream hs-p-7">
              <h3 className="hs-font-display hs-text-2xl hs-tracking-tight">Privacy by Design</h3>
              <p className="hs-mt-3 hs-leading-relaxed hs-text-ink/65">
                Built on a DPDP Act 2023–compliant framework, with Anonymous Mode and App Lock
                giving you control over who sees what, and when.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* VIDEO TUTORIAL */}
      <section id="tutorial" className="hs-mx-auto hs-max-w-6xl hs-px-6 hs-py-24">
        <div className="hs-grid hs-items-center hs-gap-12 hs-lg:grid-cols-2">
          <div>
            <p className="hs-text-xs hs-font-semibold hs-uppercase hs-tracking-[0.22em] hs-text-coral">
               App video overview
            </p>
            <h2 className="hs-mt-3 hs-font-display hs-text-4xl hs-leading-tight hs-tracking-tight">
               See hersolace in action
            </h2>
            <p className="hs-mt-5 hs-max-w-md hs-leading-relaxed hs-text-ink/65">
              A walkthrough of the five tabs — Home, Calendar, AI Digital Twin, Journal and
              Profile — plus the 30-second Daily Check-In that feeds your central AI model and
              makes every insight personal.
            </p>
            <ul className="hs-mt-7 hs-space-y-3 hs-text-sm">
              {[
                [
                  "Home — Cycle Ring & Today's Decode",
                  "your cycle ring, today's hormone decode, and customisable energy & mood insights mapped to your cycle phase — plus shareable profile.",
                  "var(--amber)",
                ],
                [
                  "Calendar — Period Tracker",
                  "log your period, track the cycle, and see your full period history.",
                  "var(--coral)",
                ],
                [
                  "AI — Ask Anything",
                  "cycle-related questions and personal guidance, on demand.",
                  "var(--rose)",
                ],
                [
                  "Journal — Symptoms & Plans",
                  "log symptoms and plan your day around your cycle.",
                  "var(--plum)",
                ],
                [
                  "Profile — You, Your Way",
                  "your cycle details, privacy controls and settings.",
                  "var(--coral)",
                ],
              ].map(([title, body, color], i) => (
                <li key={title} className="hs-flex hs-gap-3">
                  <span
                    className="hs-mt-0.5 hs-grid hs-size-5 hs-shrink-0 hs-place-items-center hs-rounded-full hs-text-[10px] hs-text-cream"
                    style={{ background: color }}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className="hs-font-semibold">{title}</span> — {body}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hs-relative hs-overflow-hidden hs-rounded-[1.75rem] hs-gradient-dusk hs-shadow-soft">
            <div className="hs-glow hs-absolute hs-inset-0 hs-opacity-40" />
            <div className="hs-relative hs-flex hs-aspect-video hs-flex-col hs-items-center hs-justify-center hs-p-10 hs-text-center hs-text-cream">
              <button
                type="button"
                 aria-label="Play hersolace app walkthrough"
                className="hs-group hs-grid hs-size-20 hs-place-items-center hs-rounded-full hs-bg-cream/15 hs-backdrop-blur hs-transition hs-hover:bg-cream/25"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="hs-ml-1 hs-size-8 hs-text-cream hs-transition hs-group-hover:scale-110"
                  aria-hidden="true"
                >
                  <path d="M8 5.5v13l11-6.5-11-6.5z" />
                </svg>
              </button>
              <p className="hs-mt-6 hs-font-display hs-text-2xl hs-leading-tight">
                 “Inside hersolace” — the app walkthrough
              </p>
              <p className="hs-mt-2 hs-text-sm hs-text-cream/70">
                Full tutorial video coming soon — beta members see it first.
              </p>
              <div className="hs-mt-6 hs-flex hs-flex-wrap hs-justify-center hs-gap-2">
                {["3 min watch", "All 5 tabs", "Daily Check-In demo"].map((c) => (
                  <span key={c} className="hs-rounded-full hs-bg-cream/15 hs-px-3 hs-py-1 hs-text-[11px]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BETA */}
      <section id="beta" className="hs-mx-auto hs-max-w-4xl hs-px-6 hs-pb-24">
        <div className="hs-relative hs-overflow-hidden hs-rounded-[2rem] hs-gradient-sunrise hs-p-8 hs-text-center hs-md:p-12">
          <div className="hs-glow hs-absolute hs-inset-0" />
          <p className="hs-relative hs-text-xs hs-font-semibold hs-uppercase hs-tracking-[0.22em] hs-text-ink/60">
            Beta launch
          </p>
          <h2 className="hs-relative hs-mt-3 hs-font-display hs-text-4xl hs-tracking-tight hs-md:text-5xl">
             Be among the first to try hersolace
          </h2>
           <div className="hs-relative hs-mx-auto hs-mt-8 hs-grid hs-max-w-md hs-grid-cols-2 hs-gap-4">
             {["App Store", "Play Store"].map((store) => (
               <div key={store} className="hs-rounded-xl hs-border hs-border-ink/10 hs-bg-cream/85 hs-p-4">
                 <div className="hs-mx-auto hs-grid hs-aspect-square hs-max-w-28 hs-place-items-center hs-border hs-border-dashed hs-border-ink/25 hs-bg-sand/40">
                   <QrCode className="hs-size-14 hs-text-ink/35" aria-hidden="true" />
                 </div>
                 <p className="hs-mt-3 hs-text-sm hs-font-semibold">{store}</p>
                 <p className="hs-mt-1 hs-text-[11px] hs-text-ink/50">QR code coming soon</p>
               </div>
             ))}
           </div>
           <p className="hs-relative hs-mt-7 hs-text-sm hs-text-ink/65">
             Reach us at{" "}
             <a className="hs-font-semibold hs-text-ink hs-underline hs-decoration-coral hs-underline-offset-4" href="mailto:support@hersolace.care">
               support@hersolace.care
             </a>
           </p>
        </div>
      </section>

      <footer className="hs-mx-auto hs-flex hs-max-w-6xl hs-flex-col hs-items-center hs-justify-between hs-gap-4 hs-border-t hs-border-ink/10 hs-px-6 hs-pt-8 hs-pb-12 hs-text-xs hs-text-ink/45 hs-sm:flex-row">
         <span className="hs-font-display hs-text-base hs-text-ink/70">hersolace</span>
        <span>Decode hormones. Discover you. · Menarche to menopause.</span>
        <span className="hs-flex hs-gap-5">
          <a href="#formula" className="hs-hover:text-ink">
            4 · 7 · 1
          </a>
          <a href="#about" className="hs-hover:text-ink">
            About
          </a>
          <a href="#tutorial" className="hs-hover:text-ink">
            Tutorial
          </a>
          <a href="#beta" className="hs-hover:text-ink">
            Beta
          </a>
        </span>
      </footer>
    </div>
  );
}
