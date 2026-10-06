"use client";

import React, { useState, useEffect, useRef } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  badge?: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is Horizon?",
    answer:
      "Horizon is an airy, minimalist workspace designed for seamless AI integration, letting you build full-stack applications in minutes with intuitive prompts and real-time generation.",
  },
  {
    question: "How does Horizon work?",
    answer:
      "Simply describe your application in natural language. Horizon generates high-quality frontend interfaces, backend APIs, edge routing, and database models automatically.",
  },
  {
    question: "Can I export my code?",
    answer:
      "Yes. You retain full ownership of your code. Export complete Next.js, React, and Node.js repositories anytime with zero vendor lock-in.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Horizon provides a generous free tier with up to 3 projects, community support, and standard components so you can prototype without entering a credit card.",
  },
  {
    question: "How secure is my data on Horizon?",
    answer:
      "We apply end-to-end encryption in transit and at rest, isolated edge sandbox environments, SOC2-compliant data practices, and automated vulnerability scanning.",
  },
  {
    question: "Can I collaborate with my team in real-time?",
    answer:
      "Yes. Horizon supports multiplayer real-time collaboration, shared branch previews, live comments, and role-based access management.",
  },
  {
    question: "Do you offer custom enterprise solutions?",
    answer:
      "Enterprise plans include custom SLAs, dedicated solutions architects, custom VPC/on-prem deployments, and SAML SSO integrations.",
  },
  {
    question: "What kind of support is available for the free plan?",
    answer:
      "Free plan members have full access to our active Discord community, interactive documentation, example templates, and starter guides.",
  },
];

const PRICING_TIERS: PricingTier[] = [
  {
    name: "Start with lorem",
    price: "$0",
    period: "/mo",
    features: ["3 Projects", "Community Support", "Basic UI Components"],
    ctaText: "Get Started",
  },
  {
    name: "Paid lorem",
    price: "$20",
    period: "/mo",
    badge: "Popular",
    popular: true,
    features: [
      "Unlimited Projects",
      "Priority Support",
      "Custom Domains",
      "Advanced Integrations",
    ],
    ctaText: "Upgrade to Pro",
  },
];

const PROMPT_SUGGESTIONS = [
  "Analytics Dashboard",
  "Banking Platform",
  "CRM System",
  "Inventory Tracker",
];

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursor.style.display === "none" || !cursor.style.display) {
        cursor.style.display = "block";
        cursorX = mouseX;
        cursorY = mouseY;
      }
    };

    const handleMouseEnter = () => {
      cursor.style.display = "block";
    };

    const handleMouseLeave = () => {
      cursor.style.display = "none";
    };

    const animate = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;

      cursorX += dx * 0.2;
      cursorY += dy * 0.2;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      id="custom-cursor"
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2 hidden md:block"
      style={{ display: "none" }}
    />
  );
};

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [isPlanActive, setIsPlanActive] = useState(true);
  const [activeTab, setActiveTab] = useState<"Chat" | "Idea" | "Narration">("Chat");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleChipClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const handleCtaMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="bg-background text-on-background font-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      <CustomCursor />

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] z-50 flex justify-between items-center py-3 px-6">
        <a
          className="font-display-xl text-headline-md tracking-tighter text-primary flex items-center gap-2"
          href="#"
        >
          <svg
            className="h-8 w-8"
            fill="none"
            height="32"
            viewBox="0 0 32 32"
            width="32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="15" stroke="black" strokeWidth="2" />
            <path
              d="M11 10V22M21 10V22M11 16H21"
              stroke="black"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            />
          </svg>
        </a>

        <div className="hidden md:flex items-center gap-6">
          <a
            className="text-primary font-bold font-body-md text-body-md scale-95 active:scale-90 transition-transform"
            href="#product"
          >
            Product
          </a>
          <a
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-body-md text-body-md scale-95 active:scale-90 transition-transform"
            href="#use-cases"
          >
            Use Cases
          </a>
          <a
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-body-md text-body-md scale-95 active:scale-90 transition-transform"
            href="#resources"
          >
            Resources
          </a>
          <a
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-body-md text-body-md scale-95 active:scale-90 transition-transform"
            href="#pricing"
          >
            Pricing
          </a>
          <a
            className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-300 font-body-md text-body-md scale-95 active:scale-90 transition-transform"
            href="#enterprise"
          >
            Enterprise
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Change language"
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 scale-95 active:scale-90 transition-transform flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined">language</span>
          </button>
          <a
            className="bg-white/40 text-on-surface border border-white/60 shadow-sm backdrop-blur-md font-body-md text-body-md font-medium px-6 py-2 rounded-full hover:bg-white/60 transition-colors duration-300 scale-95 active:scale-90 transition-transform"
            href="#start"
          >
            Start Building
          </a>
        </div>
      </nav>

      <main className="max-w-[1728px] mx-auto w-full">
        {/* Section 1: Hero */}
        <section
          id="product"
          className="relative pt-48 pb-section-gap px-container-padding min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#38BDF8]/20 via-[#C084FC]/10 to-background -z-10" />

          <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-xl border border-white/60 rounded-full px-4 py-2 mb-8 shadow-sm">
            <span className="bg-secondary-container text-on-secondary-container font-label-caps text-label-caps px-2 py-1 rounded-full uppercase">
              NEW
            </span>
            <span className="font-body-md text-body-md text-on-surface">
              Lorem ipsum dolor
            </span>
          </div>

          <h1 className="font-display-xl text-[64px] leading-[1.1] tracking-tighter text-on-surface max-w-4xl mb-6">
            Build with Horizon
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12">
            Horizon lets you build lorem ipsum applications in minutes. An airy,
            minimalist workspace designed for seamless AI integration.
          </p>

          <div className="w-full max-w-[870px] bg-white/40 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-6 mb-8 backdrop-blur-xl">
            <div className="flex flex-col gap-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-transparent border-none resize-none font-body-lg text-body-lg text-on-surface placeholder:text-outline focus:ring-0 min-h-[80px] focus:outline-none"
                placeholder="Describe the application you want to build..."
              />
              <div className="flex items-center justify-between pt-4 border-t border-white/40">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Add attachment"
                    className="p-2 rounded-full hover:bg-white/50 transition-colors text-on-surface-variant cursor-pointer"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPlanActive(!isPlanActive)}
                    className="flex items-center gap-2 bg-white/50 border border-white/60 rounded-full px-4 py-2 cursor-pointer shadow-sm hover:bg-white/70 transition-colors"
                  >
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      Plan
                    </span>
                    <span
                      className={`material-symbols-outlined text-[20px] transition-colors ${
                        isPlanActive ? "text-primary" : "text-on-surface-variant/50"
                      }`}
                    >
                      {isPlanActive ? "toggle_on" : "toggle_off"}
                    </span>
                  </button>
                </div>
                <button
                  type="button"
                  aria-label="Submit prompt"
                  className="bg-white/50 border border-white/60 text-on-surface rounded-full w-12 h-12 flex items-center justify-center shadow-sm hover:bg-white/70 transition-colors scale-95 active:scale-90 cursor-pointer"
                >
                  <span className="material-symbols-outlined">arrow_upward</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {PROMPT_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleChipClick(suggestion)}
                className="bg-white/30 text-on-surface border border-white/50 shadow-sm rounded-full px-5 py-2 font-body-md text-body-md hover:bg-white/50 transition-colors backdrop-blur-md cursor-pointer active:scale-95"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </section>

        {/* Section 2: Minimal Slogan */}
        <section
          id="use-cases"
          className="py-section-gap px-container-padding bg-surface relative min-h-[810px] flex items-center justify-center"
        >
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h2 className="font-display-xl text-[62px] leading-[1.2] font-normal text-on-surface tracking-tight">
              Imagine a Saas landing page....
            </h2>
          </div>
        </section>

        {/* Section 3: Feature 01 */}
        <section id="resources" className="pt-section-gap pb-0 px-container-padding relative">
          <div className="max-w-[1118px] mx-auto bg-white/40 backdrop-blur-2xl rounded-[10px] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row min-h-[596px]">
            <div className="p-card-internal flex-1 flex flex-col justify-center">
              <span className="font-label-caps text-label-caps text-on-surface-variant mb-6 tracking-widest">
                01 / 04
              </span>
              <h3 className="font-headline-lg text-[32px] text-on-surface mb-6 leading-tight">
                Tell Horizon your lorem ipsum idea...
              </h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-md">
                Transform your ideas into functional applications seamlessly. Our
                intuitive builder lets you craft complex interfaces and logics
                without traditional coding constraints.
              </p>
              <a
                className="inline-flex items-center justify-center gap-2 bg-white/40 border border-white/60 shadow-sm backdrop-blur-md text-on-surface font-body-md text-body-md font-medium px-8 py-4 rounded-[8px] w-fit hover:bg-white/60 transition-colors"
                href="#start"
              >
                Start building
              </a>
            </div>

            <div className="flex-1 bg-white/20 relative overflow-hidden flex items-center justify-end border-l border-white/40">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-surface-bright/50 to-tertiary/10" />
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-tertiary/20 rounded-full blur-[100px]" />
              </div>

              <div className="relative z-10 w-[85%] h-[80%] mx-auto bg-white/10 backdrop-blur-[32px] rounded-2xl border border-white/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden">
                {/* Tabs */}
                <div className="flex items-center justify-center p-4 border-b border-white/10">
                  <div className="flex p-1 rounded-full border border-white/20 backdrop-blur-md bg-white/40">
                    {(["Chat", "Idea", "Narration"] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-1.5 rounded-full text-[12px] transition-all cursor-pointer ${
                          activeTab === tab
                            ? "font-bold bg-white text-on-surface shadow-sm"
                            : "font-semibold text-on-surface hover:text-primary"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 space-y-6">
                  <div className="space-y-5">
                    {/* Bot Message */}
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/20 shrink-0 border border-white/40 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-[14px] font-bold">
                          auto_awesome
                        </span>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="h-1.5 w-20 bg-on-surface/40 rounded-full" />
                        <div className="bg-white/40 rounded-2xl rounded-tl-none p-3 border border-white/60">
                          <div className="h-1.5 w-full bg-on-surface/20 rounded-full mb-2" />
                          <div className="h-1.5 w-2/3 bg-on-surface/20 rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* User Message */}
                    <div className="flex gap-3 flex-row-reverse">
                      <div className="w-7 h-7 rounded-full bg-tertiary/20 shrink-0 border border-white/40 flex items-center justify-center">
                        <span className="material-symbols-outlined text-tertiary text-[14px] font-bold">
                          person
                        </span>
                      </div>
                      <div className="flex-1 space-y-2 flex flex-col items-end">
                        <div className="h-1.5 w-16 bg-on-surface/40 rounded-full" />
                        <div className="bg-primary/10 rounded-2xl rounded-tr-none p-3 border border-primary/20 w-3/4">
                          <div className="h-1.5 w-full bg-primary/40 rounded-full mb-2" />
                          <div className="h-1.5 w-1/2 bg-primary/40 rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Components Preview */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="h-20 bg-white/30 rounded-xl border border-white/40 flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-surface-variant/30">
                          dashboard
                        </span>
                      </div>
                      <div className="h-20 bg-white/30 rounded-xl border border-white/40 flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-surface-variant/30">
                          bar_chart
                        </span>
                      </div>
                    </div>

                    {/* Chat Input Area */}
                    <div className="mt-4 p-2 bg-white/40 rounded-full border border-white/60 flex items-center gap-2">
                      <span className="material-symbols-outlined text-on-surface-variant text-[20px] ml-2">
                        add_circle
                      </span>
                      <div className="flex-1 h-1.5 bg-on-surface/10 rounded-full" />
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-white text-[18px]">
                          arrow_upward
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Feature 02 */}
        <section className="pt-10 pb-section-gap px-container-padding relative">
          <div className="max-w-[1118px] mx-auto bg-white/40 backdrop-blur-2xl rounded-[10px] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row min-h-[596px]">
            <div className="p-card-internal flex-1 flex flex-col justify-center">
              <span className="font-label-caps text-label-caps text-on-surface-variant mb-6 tracking-widest">
                02 / 04
              </span>
              <h3 className="font-headline-lg text-[32px] text-on-surface mb-6 leading-tight">
                A backend for lorem ipsum
              </h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-md">
                Robust infrastructure generated instantly. From authentication to
                database schemas, Horizon writes the backend so you can focus on
                the user experience.
              </p>
            </div>

            <div className="flex-1 bg-surface relative overflow-hidden flex items-center justify-center backdrop-blur-md">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/5 to-tertiary/10" />
              <div
                className="absolute inset-0 opacity-30 mix-blend-soft-light"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 50% 50%, #ffffff 0%, transparent 100%)",
                }}
              />
              <div className="relative z-10 w-[80%] bg-white/60 backdrop-blur-[40px] rounded-3xl border border-white/60 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] p-8 overflow-hidden">
                <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm">
                      <span className="material-symbols-outlined text-primary text-xl">
                        cloud_upload
                      </span>
                    </div>
                    <div>
                      <span className="block text-on-surface font-bold text-base leading-none">
                        Deployment
                      </span>
                      <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">
                        v1.2.0-stable
                      </span>
                    </div>
                  </div>

                  {/* Sparkline Graph */}
                  <div className="flex flex-col items-end gap-1">
                    <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                      Health
                    </div>
                    <svg className="w-16 h-6 overflow-visible" viewBox="0 0 60 20">
                      <path
                        d="M0 15 L10 12 L20 18 L30 8 L40 10 L50 4 L60 6"
                        fill="none"
                        stroke="#27C93F"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[12px] font-semibold">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#27C93F] shadow-[0_0_8px_rgba(39,201,63,0.8)]" />
                        <span className="text-on-surface">Edge Runtime</span>
                      </div>
                      <span className="text-on-surface font-mono">99.9%</span>
                    </div>
                    <div className="h-1 w-full bg-black/5 rounded-full overflow-hidden border border-black/5">
                      <div className="h-full w-[88%] bg-gradient-to-r from-primary to-primary/60 rounded-full" />
                    </div>
                  </div>

                  <div className="pt-2 space-y-3">
                    <div className="flex items-center justify-between text-on-surface-variant text-[11px] font-medium">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px] font-bold text-[#27C93F]">
                          verified_user
                        </span>
                        <span>SSL Certification active</span>
                      </div>
                      <span className="font-mono opacity-60">12:45:01</span>
                    </div>

                    <div className="flex items-center justify-between text-on-surface-variant text-[11px] font-medium">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px] font-bold text-[#27C93F]">
                          storage
                        </span>
                        <span>Database migration 100%</span>
                      </div>
                      <span className="font-mono opacity-60">12:45:03</span>
                    </div>

                    <div className="flex items-center justify-between text-on-surface-variant text-[11px] font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full border-2 border-primary/40 border-t-primary animate-spin" />
                        <span>CDN Edge propagation...</span>
                      </div>
                      <span className="font-mono opacity-60">Running</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-white/80 rounded-xl border border-white shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#27C93F] text-[18px] font-bold">
                        check_circle
                      </span>
                      <span className="text-on-surface text-[12px] font-bold">
                        Live in production
                      </span>
                    </div>
                    <span className="text-on-surface-variant text-[10px] font-mono font-bold px-2 py-0.5 bg-black/5 rounded">
                      0.4ms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Showcase */}
        <section className="py-section-gap bg-surface relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(#c084fc 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              opacity: 0.2,
            }}
          />
          <div className="max-w-7xl mx-auto px-container-padding flex flex-col items-center justify-center mb-16 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-headline-lg text-on-surface font-normal">
                Seamless integration from idea to execution
              </h2>
            </div>
          </div>

          <div className="w-full flex gap-6 overflow-x-auto px-8 pb-12 snap-x snap-mandatory hide-scrollbar relative z-10 justify-start md:justify-center">
            {/* Card 1 */}
            <div className="snap-center shrink-0 w-[400px] h-[333px] bg-white/40 backdrop-blur-xl rounded-[10px] border border-white/60 shadow-sm flex flex-col overflow-hidden group">
              <div className="h-full bg-[#38BDF8]/10 relative overflow-hidden p-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                <div className="relative z-10 h-full bg-white/60 backdrop-blur-md rounded-[8px] border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] p-4">
                  <div className="h-4 w-fit rounded mb-6">
                    <span className="font-body-md text-on-surface-variant font-normal px-2">
                      Streaming Dashboard
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="h-32 bg-[#38BDF8]/20 border border-white/50 rounded" />
                    <div className="h-32 bg-[#C084FC]/20 border border-white/50 rounded" />
                  </div>
                  <div className="h-8 bg-white/80 rounded" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="snap-center shrink-0 w-[400px] h-[333px] bg-white/40 backdrop-blur-xl rounded-[10px] border border-white/60 shadow-sm flex flex-col overflow-hidden group">
              <div className="h-full bg-[#C084FC]/10 relative overflow-hidden p-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                <div className="relative z-10 h-full bg-white/60 backdrop-blur-md rounded-[8px] border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] p-4 flex flex-col">
                  <div className="h-6 w-full rounded mb-4">
                    <span className="font-body-md text-on-surface-variant font-normal px-2">
                      Finance Ledger
                    </span>
                  </div>
                  <div className="flex-1 border-t border-b border-white/40 flex flex-col gap-4 py-4">
                    <div className="h-4 bg-white/80 rounded w-full" />
                    <div className="h-4 bg-white/80 rounded w-5/6" />
                    <div className="h-4 bg-white/80 rounded w-full" />
                  </div>
                  <div className="h-8 w-24 bg-[#FF5E3A]/60 backdrop-blur border border-white/50 mt-auto rounded-full self-end" />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="snap-center shrink-0 w-[400px] h-[333px] bg-white/40 backdrop-blur-xl rounded-[10px] border border-white/60 shadow-sm flex flex-col overflow-hidden group">
              <div className="h-full bg-[#FF9A9E]/10 relative overflow-hidden p-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                <div className="relative z-10 h-full bg-white/60 backdrop-blur-md rounded-[8px] border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] p-4">
                  <div className="flex gap-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#FF5E3A]/20 border border-white/50" />
                    <div className="flex-1 h-10 rounded">
                      <span className="font-body-md text-on-surface-variant font-normal px-2 flex items-center h-full">
                        Travel Planner
                      </span>
                    </div>
                  </div>
                  <div className="h-40 bg-white/50 rounded-lg border border-white/60" />
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="snap-center shrink-0 w-[400px] h-[333px] bg-white/40 backdrop-blur-xl rounded-[10px] border border-white/60 shadow-sm flex flex-col overflow-hidden group">
              <div className="h-full bg-[#FFD166]/10 relative overflow-hidden p-6">
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                <div className="relative z-10 h-full bg-white/60 backdrop-blur-md rounded-[8px] border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] p-4 grid grid-cols-2 gap-4">
                  <div className="bg-white/80 rounded aspect-square" />
                  <div className="bg-white/80 rounded aspect-square" />
                  <div className="bg-white/80 rounded aspect-square" />
                  <div className="bg-white/80 rounded aspect-square" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Pricing */}
        <section id="pricing" className="py-section-gap px-container-padding">
          <div className="max-w-[1516px] mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Column 1: Info */}
              <div className="p-8 flex flex-col justify-center bg-white/40 backdrop-blur-xl rounded-[10px] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.02)]">
                <h2 className="font-display-xl text-[38px] leading-tight text-on-surface mb-4">
                  Simple, transparent pricing.
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                  Choose the plan that fits your ambition. No hidden fees.
                </p>
              </div>

              {/* Pricing Cards */}
              {PRICING_TIERS.map((tier) => (
                <div
                  key={tier.name}
                  className="p-8 bg-white/40 backdrop-blur-xl rounded-[10px] border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col relative overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 -z-10 ${
                      tier.popular
                        ? "bg-gradient-to-b from-[#C084FC]/20 to-[#FF9A9E]/20"
                        : "bg-gradient-to-b from-[#38BDF8]/10 to-transparent"
                    }`}
                  />
                  {tier.badge && (
                    <div className="absolute top-4 right-4 bg-white/60 backdrop-blur-md border border-white/80 text-on-surface shadow-sm text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {tier.badge}
                    </div>
                  )}
                  <h3 className="font-headline-md text-[38px] text-on-surface mb-2">
                    {tier.name}
                  </h3>
                  <div className="font-display-xl text-[56px] text-on-surface mb-6">
                    {tier.price}
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      {tier.period}
                    </span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1 font-body-md text-body-md text-on-surface-variant">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <span
                          className={`material-symbols-outlined ${
                            tier.popular ? "text-on-surface" : "text-primary"
                          }`}
                        >
                          check
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="w-full bg-white/50 backdrop-blur-md border border-white/60 shadow-sm text-on-surface rounded-[8px] py-4 font-body-md text-body-md hover:bg-white/70 transition-colors cursor-pointer"
                  >
                    {tier.ctaText}
                  </button>
                </div>
              ))}
            </div>

            {/* Enterprise banner */}
            <div
              id="enterprise"
              className="mt-8 bg-white/40 backdrop-blur-xl rounded-[10px] p-8 flex flex-col md:flex-row items-center justify-between border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.02)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#38BDF8]/5 -z-10" />
              <div>
                <h4 className="font-headline-md text-[28px] text-on-surface mb-2">
                  Enterprise needs?
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Custom SLAs, dedicated account management, and more.
                </p>
              </div>
              <button
                type="button"
                className="mt-4 md:mt-0 bg-white/50 backdrop-blur-md border border-white/60 shadow-sm text-on-surface rounded-[8px] px-8 py-3 font-body-md text-body-md hover:bg-white/70 transition-colors cursor-pointer"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        {/* Section 7: FAQ */}
        <section className="py-section-gap px-container-padding bg-surface">
          <div className="max-w-[1515px] mx-auto flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="font-display-xl text-[60px] leading-[1.1] text-on-surface sticky top-32">
                Frequently asked questions
              </h2>
            </div>
            <div className="lg:w-2/3 flex flex-col">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={item.question}
                    onClick={() => toggleFaq(index)}
                    className="border-b border-outline-variant/30 py-4 group cursor-pointer flex flex-col transition-all"
                  >
                    <div className="flex justify-between items-center w-full">
                      <h3 className="text-headline-md text-on-surface group-hover:text-primary transition-colors text-xl font-light">
                        {item.question}
                      </h3>
                      <span
                        className={`material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        add
                      </span>
                    </div>
                    {isOpen && (
                      <p className="mt-3 text-body-md text-on-surface-variant leading-relaxed pr-8 animate-fadeIn">
                        {item.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 8: Final CTA */}
        <section
          id="start"
          onMouseMove={handleCtaMouseMove}
          className="py-section-gap px-container-padding relative overflow-hidden flex flex-col items-center justify-center min-h-[70vh] group/cta"
        >
          {/* Vibrant moving gradient background */}
          <div className="absolute inset-0 bg-surface -z-10" />

          {/* Sophisticated deep gradient base */}
          <div
            className="absolute inset-0 opacity-20 -z-10"
            style={{
              background:
                "radial-gradient(circle at 10% 20%, #312e81 0%, transparent 50%), radial-gradient(circle at 90% 80%, #581c87 0%, transparent 50%), radial-gradient(circle at 50% 50%, #134e4a 0%, transparent 70%)",
            }}
          />

          {/* Interactive cursor-following glow */}
          <div
            className="absolute inset-0 -z-10 opacity-0 group-hover/cta:opacity-40 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.4), rgba(168, 85, 247, 0.3), transparent 60%)",
            }}
          />

          <h2 className="font-display-xl text-[54px] leading-tight mb-10 text-center relative z-10 max-w-2xl drop-shadow-sm text-on-surface">
            So, what lorem are we building?
          </h2>

          <a
            className="inline-flex items-center gap-3 bg-white/40 backdrop-blur-md border border-white/60 font-body-md text-body-md font-medium px-6 py-2.5 rounded-full hover:bg-white/60 hover:scale-105 transition-all shadow-sm group relative z-10 text-on-surface"
            href="#product"
          >
            Get started
            <div className="w-5 h-5 flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface text-[16px] group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </div>
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-transparent w-full py-8 text-secondary font-body-md text-body-md relative z-20 -mt-[80px]">
        <div className="max-w-[1515px] mx-auto px-container-padding flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-display-xl text-headline-md hover:opacity-100 transition-opacity flex items-center gap-2 text-on-surface">
            <svg
              className="h-6 w-6 text-on-surface"
              fill="none"
              height="24"
              viewBox="0 0 32 32"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" />
              <path
                d="M11 10V22M21 10V22M11 16H21"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              className="hover:text-black transition-colors hover:opacity-100 text-on-surface"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="hover:text-black transition-colors hover:opacity-100 text-on-surface"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="hover:text-black transition-colors hover:opacity-100 text-on-surface"
              href="#"
            >
              Security
            </a>
            <a
              className="hover:text-black transition-colors hover:opacity-100 text-on-surface"
              href="#"
            >
              Status
            </a>
            <a
              className="hover:text-black transition-colors hover:opacity-100 text-on-surface"
              href="#"
            >
              Contact
            </a>
          </div>

          <div className="text-sm text-on-surface">
            © 2024 Horizon AI. Built for the future of SaaS.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

