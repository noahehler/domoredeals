import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0f1f3d" }} className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="grid md:grid-cols-3 gap-10 mb-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.svg" alt="DoMoreDeals" width={36} height={36} />
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Do<span style={{ color: "#c9a84c" }}>More</span>Deals
              </span>
            </div>
            <p
              className="text-sm text-gray-400 leading-relaxed mb-4"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              Context SEO for the AI search era. We help local businesses
              get recommended by ChatGPT, Claude, and Perplexity — by name.
            </p>
            <p
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "#c9a84c", fontFamily: "var(--font-inter, sans-serif)" }}
            >
              Be the answer, not the option.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-sm font-bold text-white mb-4 tracking-widest uppercase"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              Services
            </h4>
            <ul className="space-y-2">
              {[
                "AI Visibility Audit — $1,500",
                "Foundation — $1,497/mo",
                "Dominance — $4,997/mo",
                "Free Strategy Call",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#pricing"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4
              className="text-sm font-bold text-white mb-4 tracking-widest uppercase"
              style={{ fontFamily: "var(--font-inter, sans-serif)" }}
            >
              Company
            </h4>
            <ul className="space-y-2">
              {[
                { label: "How It Works", href: "#how-it-works" },
                { label: "Our Guarantee", href: "#guarantee" },
                { label: "Pricing", href: "#pricing" },
                { label: "Book a Call", href: "#book-call" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-inter, sans-serif)" }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-gray-500"
            style={{ fontFamily: "var(--font-inter, sans-serif)" }}
          >
            © {new Date().getFullYear()} DoMoreDeals. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                style={{ fontFamily: "var(--font-inter, sans-serif)" }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
