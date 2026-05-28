export default function Guarantee() {
  return (
    <section
      id="guarantee"
      className="py-24 px-6"
      style={{ backgroundColor: "#f9f6f0" }}
    >
      <div className="max-w-5xl mx-auto">
        <div
          className="rounded-3xl overflow-hidden grid md:grid-cols-2"
          style={{ backgroundColor: "#0f1f3d" }}
        >
          {/* Left: Guarantee badge side */}
          <div
            className="flex flex-col items-center justify-center p-12 text-center border-b md:border-b-0 md:border-r"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          >
            {/* Shield icon */}
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center mb-6 relative"
              style={{
                border: "3px solid #c9a84c",
                backgroundColor: "rgba(201,168,76,0.1)",
              }}
            >
              <svg
                className="w-14 h-14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#c9a84c"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
              <div
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: "#c9a84c", color: "#0f1f3d" }}
              >
                ✓
              </div>
            </div>

            <div
              className="text-6xl font-bold text-white mb-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              90
            </div>
            <div
              className="text-lg font-semibold mb-1"
              style={{ color: "#c9a84c", fontFamily: "var(--font-inter, sans-serif)" }}
            >
              Day Guarantee
            </div>
            <div
              className="text-sm text-gray-400"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              Full Refund. No Questions Asked.
            </div>
          </div>

          {/* Right: Guarantee copy */}
          <div className="p-12">
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "#c9a84c", fontFamily: "var(--font-inter, sans-serif)" }}
            >
              Our Promise
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mt-3 mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              If We Don&apos;t Move the
              <br />
              Needle, You Don&apos;t Pay.
            </h2>

            <p
              className="text-gray-300 mb-6 leading-relaxed"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              We&apos;re confident enough in our system that we offer an
              unconditional 90-day guarantee. If you don&apos;t see measurable
              improvement in your AI visibility within 90 days of us doing the
              work — documented with before/after reports — we&apos;ll refund
              every dollar. No excuses. No fine print.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "Measurable before/after AI mention tracking",
                "Documented visibility improvements in writing",
                "If we miss the mark — full refund, no questions",
                "Applies to Foundation & Dominance plans",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-gray-300"
                  style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                >
                  <svg
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#c9a84c"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="#book-call"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: "#c9a84c",
                color: "#0f1f3d",
                fontFamily: "var(--font-inter, sans-serif)",
              }}
            >
              Start Risk-Free Today →
            </a>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-3 gap-6 mt-12 text-center">
          {[
            {
              icon: "🤝",
              title: "No Long-Term Lock-In",
              desc: "Monthly plans, cancel after 90 days",
            },
            {
              icon: "📊",
              title: "Full Transparency",
              desc: "Before/after reports on every metric",
            },
            {
              icon: "🎯",
              title: "Real Results Only",
              desc: "We measure AI mentions — not vanity metrics",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl p-6 bg-white border border-gray-100 shadow-sm">
              <div className="text-3xl mb-3">{item.icon}</div>
              <div
                className="font-semibold text-sm mb-1"
                style={{
                  color: "#0f1f3d",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {item.title}
              </div>
              <div
                className="text-xs text-gray-500"
                style={{ fontFamily: "var(--font-inter, sans-serif)" }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
