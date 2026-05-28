export default function Hero() {
  return (
    <section
      className="relative flex flex-col overflow-hidden pt-20"
      style={{ backgroundColor: "#0f1f3d", minHeight: "100svh" }}
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ backgroundColor: "#c9a84c" }}
      />

      {/* Main content — takes all available vertical space */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-5xl mx-auto text-center w-full">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-8">
            <div className="h-px w-8" style={{ backgroundColor: "#c9a84c" }} />
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "#c9a84c", fontFamily: "var(--font-inter, sans-serif)" }}
            >
              The AI Search Revolution Is Here
            </span>
            <div className="h-px w-8" style={{ backgroundColor: "#c9a84c" }} />
          </div>

          {/* Main headline — no trademark issues */}
          <h1
            className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Old SEO Won&apos;t Save
            <br />
            <span style={{ color: "#c9a84c" }}>Your Business.</span>
            <br />
            AI Will.
          </h1>

          {/* Sub-headline — updated with real stat */}
          <p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            45% of consumers now use AI to find local services — up from just 6%
            last year. They&apos;re asking ChatGPT, Claude, and Perplexity and acting
            on the answers. The question is: are you the answer, or are you invisible?
          </p>

          <p
            className="text-base text-gray-400 max-w-xl mx-auto mb-12"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            DoMoreDeals builds your Context SEO — so AI recommends{" "}
            <em>you</em> by name.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#book-call"
              className="px-8 py-4 rounded text-base font-semibold transition-all duration-200 hover:opacity-90 hover:shadow-xl"
              style={{
                backgroundColor: "#c9a84c",
                color: "#0f1f3d",
                fontFamily: "var(--font-inter, sans-serif)",
              }}
            >
              Book Your Free Strategy Call →
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded text-base font-semibold border-2 text-white transition-all duration-200 hover:bg-white/10"
              style={{
                borderColor: "rgba(255,255,255,0.3)",
                fontFamily: "var(--font-inter, sans-serif)",
              }}
            >
              See How It Works
            </a>
          </div>
        </div>
      </div>

      {/* Stats strip — solid navy, sits BELOW the fade zone, always legible */}
      <div
        className="relative z-10 border-t"
        style={{ backgroundColor: "#0a1830", borderColor: "rgba(201,168,76,0.2)" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
          {[
            { stat: "45%", label: "of consumers use AI for local services", footnote: "up from 6% just one year ago" },
            { stat: "58%+", label: "of searches end with no website clicked", footnote: "zero-click is the new normal" },
            { stat: "50%", label: "of all searches will involve AI by 2028", footnote: "Gartner projection" },
          ].map((item) => (
            <div key={item.stat} className="text-center px-4">
              <div
                className="text-3xl md:text-4xl font-bold mb-1"
                style={{
                  color: "#c9a84c",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {item.stat}
              </div>
              <div
                className="text-sm text-gray-200 mb-0.5"
                style={{ fontFamily: "var(--font-inter, sans-serif)" }}
              >
                {item.label}
              </div>
              <div
                className="text-xs text-gray-500 italic"
                style={{ fontFamily: "var(--font-inter, sans-serif)" }}
              >
                {item.footnote}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
