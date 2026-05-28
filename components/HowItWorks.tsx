const steps = [
  {
    number: "01",
    title: "Context Audit",
    subtitle: "We find every gap",
    description:
      "We crawl the AI platforms — ChatGPT, Perplexity, Claude, Gemini — and map exactly how your business is (or isn't) being represented. You'll see every gap, every competitor mention, and every missed opportunity.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 0z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Authority Architecture",
    subtitle: "We build your signal foundation",
    description:
      "We create and optimize the authoritative content, citations, and structured data that AI models use to form their understanding of your business. Think of it as training the AI to know you're the expert.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Context Amplification",
    subtitle: "We make your signal loud",
    description:
      "We distribute your authority signals across the web sources AI trusts — industry databases, authoritative directories, press, and third-party reviews. The more signals, the more confident AI is recommending you.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.072m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Visibility Monitoring & Optimization",
    subtitle: "We measure and improve every month",
    description:
      "We run monthly AI visibility reports showing exactly how often you're recommended, in what context, and against which competitors. Then we optimize — adjusting signals until you're the clear authority AI platforms trust.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ backgroundColor: "#f9f6f0" }} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "#c9a84c", fontFamily: "var(--font-inter, sans-serif)" }}
          >
            Our Process
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-3 mb-5"
            style={{
              color: "#0f1f3d",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            How We Make AI
            <br />
            Recommend You
          </h2>
          <p
            className="text-gray-600 max-w-xl mx-auto text-lg"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            A proven 4-step system built specifically for local businesses
            who want to own the AI search conversation in their market.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 gap-8">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className="relative rounded-2xl p-8 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              {/* Step number watermark */}
              <div
                className="absolute top-6 right-8 text-7xl font-bold opacity-5 select-none"
                style={{
                  color: "#0f1f3d",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300"
                style={{ backgroundColor: "#0f1f3d", color: "#c9a84c" }}
              >
                {step.icon}
              </div>

              {/* Content */}
              <div
                className="text-xs font-bold tracking-widest uppercase mb-2"
                style={{
                  color: "#c9a84c",
                  fontFamily: "var(--font-inter, sans-serif)",
                }}
              >
                Step {step.number}
              </div>
              <h3
                className="text-2xl font-bold mb-1"
                style={{
                  color: "#0f1f3d",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm font-medium mb-3"
                style={{
                  color: "#c9a84c",
                  fontFamily: "var(--font-inter, sans-serif)",
                }}
              >
                {step.subtitle}
              </p>
              <p
                className="text-gray-600 leading-relaxed"
                style={{ fontFamily: "var(--font-inter, sans-serif)" }}
              >
                {step.description}
              </p>

              {/* Connector arrow for desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden" />
              )}
            </div>
          ))}
        </div>

        {/* Timeline bar */}
        <div className="mt-12 rounded-2xl p-8" style={{ backgroundColor: "#0f1f3d" }}>
          <div className="text-center mb-6">
            <h3
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Your 90-Day Visibility Timeline
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { period: "Days 1–14", action: "Audit & Strategy delivered" },
              { period: "Days 15–45", action: "Foundation built & content live" },
              { period: "Days 46–90", action: "Signals amplified, AI mentions tracked" },
            ].map((t) => (
              <div key={t.period} className="border border-white/20 rounded-xl p-4">
                <div
                  className="text-sm font-bold mb-1"
                  style={{ color: "#c9a84c", fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {t.period}
                </div>
                <div
                  className="text-xs text-gray-300"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  {t.action}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
