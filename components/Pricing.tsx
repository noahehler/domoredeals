const plans = [
  {
    name: "AI Visibility Audit",
    price: "$1,500",
    frequency: "one-time",
    tagline: "Know exactly where you stand",
    description:
      "Before you invest in anything, know exactly how AI platforms see your business — and what it will take to own your market.",
    features: [
      "Full AI platform audit (ChatGPT, Perplexity, Claude, Gemini)",
      "Competitor context analysis — who's winning and why",
      "Gap analysis with prioritized recommendations",
      "Custom 90-day visibility roadmap",
      "60-minute strategy session to walk through findings",
      "Delivered in 7 business days",
    ],
    cta: "Get Your Audit",
    href: "#book-call",
    highlight: false,
    badge: null,
  },
  {
    name: "Foundation",
    price: "$1,497",
    frequency: "/month",
    tagline: "Build your AI authority",
    description:
      "Everything you need to establish authority and start appearing in AI recommendations consistently. Ideal for local service businesses ready to grow.",
    features: [
      "Everything in the Audit",
      "Authority content creation (4 pieces/mo)",
      "Citation & directory optimization",
      "Schema markup & structured data",
      "Monthly AI visibility reports",
      "Competitor monitoring",
      "Dedicated account strategist",
      "Cancel anytime after 90 days",
    ],
    cta: "Start Foundation",
    href: "#book-call",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Dominance",
    price: "$4,997",
    frequency: "/month",
    tagline: "Own your entire market",
    description:
      "Full-service AI authority domination. For businesses ready to become the undisputed AI-recommended leader in their category and geography.",
    features: [
      "Everything in Foundation",
      "12 authority content pieces/month",
      "PR & media placement campaign",
      "Multi-location or multi-service coverage",
      "Weekly reporting & strategy calls",
      "Competitive counter-positioning",
      "AI platform relationship mapping",
      "Priority support — same-day response",
    ],
    cta: "Book Dominance Call",
    href: "#book-call",
    highlight: false,
    badge: "Fastest Results",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "#c9a84c", fontFamily: "var(--font-inter, sans-serif)" }}
          >
            Transparent Pricing
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-3 mb-5"
            style={{
              color: "#0f1f3d",
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            Choose Your Path
            <br />
            to AI Visibility
          </h2>
          <p
            className="text-gray-600 max-w-xl mx-auto text-lg"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            No lock-in tricks. No hidden fees. Just clear deliverables and a
            100% money-back guarantee if we don&apos;t hit the target.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="relative rounded-2xl flex flex-col"
              style={{
                border: plan.highlight
                  ? "2px solid #c9a84c"
                  : "2px solid #e5e7eb",
                backgroundColor: plan.highlight ? "#0f1f3d" : "#ffffff",
                boxShadow: plan.highlight
                  ? "0 20px 60px rgba(201,168,76,0.15)"
                  : "0 4px 20px rgba(0,0,0,0.06)",
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span
                    className="px-4 py-1.5 rounded-full text-xs font-bold tracking-wide"
                    style={{
                      backgroundColor: "#c9a84c",
                      color: "#0f1f3d",
                      fontFamily: "var(--font-inter, sans-serif)",
                    }}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Plan name */}
                <div
                  className="text-sm font-bold tracking-widest uppercase mb-2"
                  style={{
                    color: plan.highlight ? "#c9a84c" : "#c9a84c",
                    fontFamily: "var(--font-inter, sans-serif)",
                  }}
                >
                  {plan.name}
                </div>

                {/* Price */}
                <div className="flex items-end gap-1 mb-2">
                  <span
                    className="text-5xl font-bold"
                    style={{
                      color: plan.highlight ? "#ffffff" : "#0f1f3d",
                      fontFamily: "'Playfair Display', Georgia, serif",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-sm pb-2"
                    style={{
                      color: plan.highlight ? "rgba(255,255,255,0.6)" : "#6b7280",
                      fontFamily: "var(--font-inter, sans-serif)",
                    }}
                  >
                    {plan.frequency}
                  </span>
                </div>

                <p
                  className="text-sm font-semibold mb-3"
                  style={{
                    color: plan.highlight ? "#e8c97a" : "#c9a84c",
                    fontFamily: "var(--font-inter, sans-serif)",
                  }}
                >
                  {plan.tagline}
                </p>

                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{
                    color: plan.highlight ? "rgba(255,255,255,0.7)" : "#6b7280",
                    fontFamily: "var(--font-inter, sans-serif)",
                  }}
                >
                  {plan.description}
                </p>

                {/* Divider */}
                <div
                  className="h-px mb-6"
                  style={{
                    backgroundColor: plan.highlight
                      ? "rgba(255,255,255,0.15)"
                      : "#e5e7eb",
                  }}
                />

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke={plan.highlight ? "#c9a84c" : "#c9a84c"}
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span
                        className="text-sm leading-snug"
                        style={{
                          color: plan.highlight ? "rgba(255,255,255,0.85)" : "#374151",
                          fontFamily: "var(--font-inter, sans-serif)",
                        }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={plan.href}
                  className="block w-full text-center px-6 py-4 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
                  style={{
                    backgroundColor: plan.highlight ? "#c9a84c" : "#0f1f3d",
                    color: plan.highlight ? "#0f1f3d" : "#ffffff",
                    fontFamily: "var(--font-inter, sans-serif)",
                  }}
                >
                  {plan.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p
          className="text-center text-sm text-gray-500 mt-8"
          style={{ fontFamily: "var(--font-inter, sans-serif)" }}
        >
          All plans include our 90-day money-back guarantee. No contracts on monthly plans after the first 90 days.
        </p>
      </div>
    </section>
  );
}
