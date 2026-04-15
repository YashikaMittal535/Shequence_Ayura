"use client";

import Link from "next/link";

/* ✅ REQUIRED: Surface styles */

const DOSHA_SURFACE = {
  vata: {
    gradient: "from-[#f8e8ec] via-[#faf4f2] to-[#fff9f5]",
    gradient2: "from-rose-200/25 via-transparent to-violet-200/15",
    accent: "text-rose-950/90",
    accentSoft: "text-rose-900/75",
    ring: "ring-rose-200/40",
    badge: "bg-rose-100/90 text-rose-950 ring-rose-200/50",
    chipActive: "ring-rose-300/70 bg-white/90",
    blob: "bg-rose-200/12",
  },

  pitta: {
    gradient: "from-[#fff4d6] via-[#fffaf0] to-[#fff5eb]",
    gradient2: "from-amber-200/30 via-transparent to-orange-200/20",
    accent: "text-amber-950/90",
    accentSoft: "text-amber-900/80",
    ring: "ring-amber-200/45",
    badge: "bg-amber-100/90 text-amber-950 ring-amber-200/55",
    chipActive: "ring-amber-400/60 bg-white/90",
    blob: "bg-amber-200/14",
  },

  kapha: {
    gradient: "from-[#e4f2ea] via-[#f4faf6] to-[#eef6f9]",
    gradient2: "from-emerald-200/25 via-transparent to-sky-200/15",
    accent: "text-emerald-950/90",
    accentSoft: "text-emerald-900/80",
    ring: "ring-emerald-200/40",
    badge: "bg-emerald-100/90 text-emerald-950 ring-emerald-200/50",
    chipActive: "ring-emerald-400/55 bg-white/90",
    blob: "bg-emerald-200/12",
  },
};

export default function DoshaHeroCard({
  userName,
  doshaResult,
  doshaMeta,
  todayMetrics
}) {

  /* Get dominant dosha */

  const key = doshaResult?.dominant || "vata";

  const surface =
    DOSHA_SURFACE[key] ||
    DOSHA_SURFACE.vata;

  /* Dosha colors */

  const DOSHA_COLOR = {
    vata: "#be123c",
    pitta: "#b45309",
    kapha: "#047857",
  };

  const info = {
    color:
      DOSHA_COLOR[key] ||
      "#374151",
  };

  /* Percentage */

  const pct =
    doshaResult?.percentages &&
    doshaResult?.dominant
      ? doshaResult.percentages[
          doshaResult.dominant
        ]
      : null;

  /* ✅ Wellness Score = dominant % */

  const wellnessScore =
    doshaResult?.percentages?.[
      doshaResult?.dominant
    ] ?? 0;

  return (

    <section
      className={`group relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br ${surface.gradient} p-4 shadow-[0_16px_40px_-20px_rgba(80,60,50,0.35)] ring-1 ${surface.ring} sm:p-5 lg:p-6`}
    >

      {/* Atmosphere */}

      <div
        className={`pointer-events-none absolute -right-1/4 -top-1/4 h-[60%] w-[60%] rounded-full bg-gradient-to-br ${surface.gradient2} blur-3xl`}
      />

      <div
        className={`pointer-events-none absolute right-1/4 top-1/2 h-36 w-36 -translate-y-1/2 rounded-full blur-3xl ${surface.blob}`}
      />

      {/* Grid */}

      <div className="relative grid gap-5 lg:grid-cols-[1fr_minmax(220px,34%)] lg:gap-6 lg:items-stretch">

        {/* LEFT */}

        <div className="flex min-w-0 flex-col justify-center space-y-4">

          {/* Badge */}

          <div className="flex flex-wrap items-center gap-2">

            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ring-1 ${surface.badge}`}
            >
              Prakriti
            </span>

            {pct != null && (

              <span className="rounded-full bg-white/75 px-2.5 py-1 text-[11px] font-medium text-stone-600 ring-1 ring-stone-200/60">

                {pct}% of your pattern

              </span>

            )}

          </div>

          {/* Title */}

          <div className="space-y-1">

            <p className="text-xs font-medium tracking-wide text-stone-500">

              {userName ? (
                <>
                  <span className="text-stone-400">
                    Welcome back,
                  </span>{" "}
                  <span className="text-stone-800">
                    {userName}
                  </span>
                </>
              ) : (
                "Your constitution"
              )}

            </p>

            <div className="flex flex-wrap items-baseline gap-2">

              <h2
                className={`text-3xl font-semibold tracking-tight sm:text-4xl ${surface.accent}`}
              >
                {doshaMeta?.name}
              </h2>

              <span className="text-3xl sm:text-4xl">
                {doshaMeta?.emoji}
              </span>

            </div>

            <p
              className={`text-base font-medium sm:text-lg ${surface.accentSoft}`}
            >
              {doshaMeta?.tagline}
            </p>

          </div>

          {/* Description */}

          <p className="max-w-xl border-l-2 border-stone-300/40 pl-3 text-sm leading-relaxed text-stone-600">

            {doshaMeta?.description}

          </p>

        </div>

        {/* RIGHT */}

        <div className="relative flex min-h-[180px] flex-col justify-between gap-4 rounded-xl border border-white/50 bg-white/25 p-4 shadow-inner backdrop-blur-md sm:min-h-[200px]">

          <div className="flex flex-1 items-center justify-center">

            <div className="text-center">

              {/* Score Circle */}

              <div
                className="w-32 h-32 rounded-full border-8 flex items-center justify-center mx-auto mb-2"
                style={{
                  borderColor: info.color
                }}
              >

                <div>

                  <div
                    className="text-3xl font-bold"
                    style={{
                      color: info.color
                    }}
                  >
                    {wellnessScore}%
                  </div>

                  <div className="text-xs text-gray-500">
                    Score
                  </div>

                </div>

              </div>

              {/* Metrics */}

              <div className="text-xs text-gray-500">

                Sleep {todayMetrics?.sleep ?? 8}/10 |
                Stress {todayMetrics?.stress ?? 7}/10

                <br />

                Digestion {todayMetrics?.digestion ?? 9}/10 |
                Energy {todayMetrics?.energy ?? 7}/10

              </div>

            </div>

          </div>

          {/* Button */}

          <div className="relative space-y-2 border-t border-stone-200/40 pt-3">

            <Link
              href="/app/quiz"
              className="flex w-full items-center justify-center rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-[#faf6f0] shadow-md ring-1 ring-stone-800/20 hover:bg-stone-800"
            >
              Retake prakriti test
            </Link>

            <p className="text-center text-[10px] text-stone-500 sm:text-left">
              Refresh when seasons or digestion shift.
            </p>

          </div>

        </div>

      </div>

    </section>

  );

}
