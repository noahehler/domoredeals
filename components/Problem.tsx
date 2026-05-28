const GoogleSide = () => (
  <div className="rounded-2xl border-2 p-8" style={{ borderColor: "#e5e7eb", backgroundColor: "#f9fafb" }}>
    <div className="flex items-center gap-3 mb-6">
      {/* Google G logo approximate */}
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg bg-gray-500">
        G
      </div>
      <div>
        <div className="font-semibold text-gray-700" style={{ fontFamily: "var(--font-inter, sans-serif)" }}>
          Traditional Google SEO
        </div>
        <div className="text-xs text-gray-400">What you&apos;ve been doing</div>
      </div>
    </div>

    <ul className="space-y-4">
      {[
        { icon: "📉", text: "Click-through rates falling every year", color: "#ef4444" },
        { icon: "💸", text: "Google Ads eating your margin", color: "#ef4444" },
        { icon: "⏳", text: "6–18 months to see SEO results", color: "#ef4444" },
        { icon: "🏆", text: "Competing with Amazon, Yelp & big brands", color: "#ef4444" },
        { icon: "👻", text: "Zero Clicks — AI answers replace search results", color: "#ef4444" },
        { icon: "📊", text: "Rankings you control, traffic you don't own", color: "#ef4444" },
      ].map((item) => (
        <li key={item.text} className="flex items-start gap-3">
          <span className="text-xl flex-shrink-0">{item.icon}</span>
          <span
            className="text-sm text-gray-600 leading-relaxed"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            {item.text}
          </span>
        </li>
      ))}
    </ul>

    <div
      className="mt-6 p-4 rounded-xl text-center text-sm font-medium text-gray-500 bg-gray-200"
      style={{ fontFamily: "var(--font-inter, sans-serif)" }}
    >
      Declining returns. Rising costs. Shrinking audience.
    </div>
  </div>
);

const ContextSide = () => (
  <div
    className="rounded-2xl border-2 p-8 relative overflow-hidden"
    style={{ borderColor: "#c9a84c", backgroundColor: "#0f1f3d" }}
  >
    {/* Glow */}
    <div
      className="absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl opacity-20"
      style={{ backgroundColor: "#c9a84c" }}
    />

    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg"
          style={{ backgroundColor: "#c9a84c", color: "#0f1f3d" }}
        >
          AI
        </div>
        <div>
          <div
            className="font-semibold text-white"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            Context SEO by DoMoreDeals
          </div>
          <div className="text-xs" style={{ color: "#c9a84c" }}>
            What the future looks like
          </div>
        </div>
      </div>

      <ul className="space-y-4">
        {[
          "Your business recommended by name in ChatGPT answers",
          "Perplexity citing you as the local authority",
          "Claude suggesting your services unprompted",
          "Authority that compounds across every AI platform",
          "Visibility that doesn't vanish when budgets dry up",
          "Results measured in weeks, not years",
        ].map((text) => (
          <li key={text} className="flex items-start gap-3">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#c9a84c"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span
              className="text-sm text-gray-200 leading-relaxed"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              {text}
            </span>
          </li>
        ))}
      </ul>

      <div
        className="mt-6 p-4 rounded-xl text-center text-sm font-semibold"
        style={{
          backgroundColor: "#c9a84c",
          color: "#0f1f3d",
          fontFamily: "var(--font-inter, sans-serif)",
        }}
      >
        Be the answer, not the option.
      </div>
    </div>
  </div>
);

export default function Problem() {
  return (
    <section id="problem" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{
              color: "#c9a84c",
              fontFamily: "var(--font-inter, sans-serif)",
            }}
          >
            The Shift Is Already Happening
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-3 mb-5"
            style={{
              color: "#0f1f3d",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            The Search Landscape
            <br />
            Has Changed Forever
          </h2>
          <p
            className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            AI assistants now answer 40% of commercial queries directly —
            no links, no clicks, no chance for the unprepared business.
            Your competitors are already losing. Don&apos;t be next.
          </p>
        </div>

        {/* VS comparison */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <GoogleSide />
          <ContextSide />
        </div>

        {/* Bottom callout */}
        <div
          className="mt-12 rounded-2xl p-8 text-center"
          style={{ backgroundColor: "#f9f6f0" }}
        >
          <p
            className="text-xl font-semibold"
            style={{
              color: "#0f1f3d",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            &ldquo;When someone asks ChatGPT for the best{" "}
            <span style={{ color: "#c9a84c" }}>
              [your service] in [your city]
            </span>
            , are you the answer — or are you not even in the conversation?&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
