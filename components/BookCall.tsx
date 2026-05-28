export default function BookCall() {
  return (
    <section id="book-call" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          style={{ backgroundColor: "#0f1f3d" }}
        >
          {/* Decorative elements */}
          <div
            className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: "#c9a84c" }}
          />
          <div
            className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: "#c9a84c" }}
          />

          <div className="relative z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#c9a84c" }} />
              <span
                className="text-sm font-semibold tracking-widest uppercase"
                style={{ color: "#c9a84c", fontFamily: "var(--font-inter, sans-serif)" }}
              >
                Free 30-Minute Strategy Call
              </span>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#c9a84c" }} />
            </div>

            {/* Headline */}
            <h2
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Be the Answer.
              <br />
              <span style={{ color: "#c9a84c" }}>Not the Option.</span>
            </h2>

            <p
              className="text-gray-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              Book a free 30-minute strategy call. We&apos;ll show you exactly
              how your business currently appears in AI results, who&apos;s beating
              you, and what it would take to flip the script — no obligation,
              no pressure.
            </p>

            {/* What you'll get */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10 text-left">
              {[
                { icon: "🔍", text: "Live AI audit of your business" },
                { icon: "📋", text: "Competitor snapshot — who's winning" },
                { icon: "🗺️", text: "Custom 90-day roadmap outline" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 rounded-xl p-4"
                  style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span
                    className="text-sm text-gray-300"
                    style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Primary CTA */}
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-xl text-lg font-bold transition-all duration-200 hover:opacity-90 hover:shadow-2xl"
              style={{
                backgroundColor: "#c9a84c",
                color: "#0f1f3d",
                fontFamily: "var(--font-inter, sans-serif)",
                boxShadow: "0 8px 32px rgba(201,168,76,0.35)",
              }}
            >
              Book My Free Strategy Call
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </a>

            <p
              className="text-xs text-gray-500 mt-4"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              30 minutes · No obligation · Immediate value guaranteed
            </p>
          </div>
        </div>

        {/* Urgency note */}
        <div
          className="mt-8 rounded-2xl p-6 text-center border border-amber-200"
          style={{ backgroundColor: "#fffbf0" }}
        >
          <p
            className="text-sm"
            style={{ color: "#0f1f3d", fontFamily: "var(--font-inter, sans-serif)" }}
          >
            <strong>Limited availability:</strong> We take on a maximum of 8 new clients per month to ensure
            quality and attention. If you&apos;re seeing this page,{" "}
            <span style={{ color: "#c9a84c", fontWeight: 600 }}>spots are still open.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
