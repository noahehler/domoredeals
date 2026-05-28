const stats = [
  {
    number: "45%",
    detail: "of consumers now use AI assistants to find local services",
    context: "Up from just 6% one year ago — a 7x surge in 12 months",
    source: "ALM Corp, 2026",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    number: "93%",
    detail: "of AI Mode searches end without a click to any website",
    context: "Even standard AI Overviews kill 83% of organic clicks",
    source: "Similarweb / Search Engine Journal, 2026",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
      </svg>
    ),
  },
  {
    number: "357%",
    detail: "year-over-year growth in referral visits from AI search platforms",
    context: "Standalone AI search generated 1.13B referral visits in June 2025 alone",
    source: "Statista / Superlines, 2025–2026",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    number: "50%",
    detail: "of all online searches will involve an AI assistant by 2028",
    context: "Gartner predicts AI will reshape the entire search landscape within 2 years",
    source: "Gartner Research, 2024",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    number: "14×",
    detail: "higher conversion rate from AI search vs. traditional search clicks",
    context: "AI search converts at 14.2% vs. traditional organic's ~2%",
    source: "Superlines, 2026",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
      </svg>
    ),
  },
  {
    number: "55%",
    detail: "of businesses ranking well on traditional search do NOT appear in AI results",
    context: "Only 45% overlap between traditional SEO winners and AI-recommended businesses",
    source: "ALM Corp Local Search Study, 2026",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
];

export default function AIStats() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: "#ffffff" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "#c9a84c", fontFamily: "var(--font-inter, sans-serif)" }}
          >
            The Research Is In
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-3 mb-4"
            style={{
              color: "#0f1f3d",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            AI Search Is Not the Future.
            <br />
            <span style={{ color: "#c9a84c" }}>It&apos;s Right Now.</span>
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto text-base"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            The data is unambiguous. Local businesses that don&apos;t establish AI
            visibility in the next 12 months will find themselves systematically
            excluded from the conversations their customers are already having.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((item) => (
            <div
              key={item.number}
              className="rounded-2xl p-7 border border-gray-100 hover:border-gold-light transition-colors duration-300 group"
              style={{ backgroundColor: "#f9f6f0" }}
            >
              {/* Icon + number row */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="text-4xl font-bold"
                  style={{
                    color: "#0f1f3d",
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  {item.number}
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#0f1f3d", color: "#c9a84c" }}
                >
                  {item.icon}
                </div>
              </div>

              <p
                className="text-sm font-semibold mb-2 leading-snug"
                style={{ color: "#0f1f3d", fontFamily: "var(--font-inter, sans-serif)" }}
              >
                {item.detail}
              </p>
              <p
                className="text-xs text-gray-500 mb-3 leading-relaxed"
                style={{ fontFamily: "var(--font-inter, sans-serif)" }}
              >
                {item.context}
              </p>
              <div
                className="text-xs font-medium pt-3 border-t border-gray-200"
                style={{ color: "#c9a84c", fontFamily: "var(--font-inter, sans-serif)" }}
              >
                Source: {item.source}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA nudge */}
        <div
          className="mt-12 rounded-2xl p-7 text-center"
          style={{ backgroundColor: "#0f1f3d" }}
        >
          <p
            className="text-lg font-semibold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            The window to get ahead of this is narrow.{" "}
            <span style={{ color: "#c9a84c" }}>
              Businesses establishing AI authority now will own their markets.
            </span>
          </p>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline"
            style={{ color: "#c9a84c", fontFamily: "var(--font-inter, sans-serif)" }}
          >
            See how we build that authority →
          </a>
        </div>
      </div>
    </section>
  );
}
