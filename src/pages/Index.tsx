import Layout from "@/components/Layout";
import professorImg from "@/assets/professor-hero.jpg";
import heroImage from "@/assets/heroImage.png";
import { BookOpen, FileText, Video, GraduationCap, Users, Award, Clock, ChevronLeft, ChevronRight, Play, Quote, ArrowRight, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { mockVideos } from "@/lib/mockData";
import { loadVideos } from "@/lib/storage";
import { useState, useEffect } from "react";
import GlowCard from "@/components/GlowCard";
import CountUp from "@/components/CountUp";
import { useReveal } from "@/hooks/useReveal";
import InfoSection from "@/components/home/InfoSection";
import InfoSection2 from "@/components/home/InfoSection2";

import TestimonialsSection from "@/components/home/TestimonialsSection";

const features = [
  { icon: FileText, title: "Notes", desc: "Comprehensive notes for every topic, carefully curated", link: "/notes" },
  { icon: BookOpen, title: "Worksheets", desc: "Practice materials & exercises to sharpen skills", link: "/worksheets" },
  { icon: Video, title: "Video Lectures", desc: "Watch and learn at your own pace, anytime", link: "/videos" },
  { icon: GraduationCap, title: "Blogs", desc: "Curated academic blogs for deeper learning", link: "/blog" },
];

const stats = [
  { icon: Users, value: "3,000+", label: "Students Taught" },
  { icon: Award, value: "17+", label: "Years Experience" },
  { icon: Clock, value: "10000+", label: "Lectures Delivered" },
  { icon: Trophy, value: "4x", label: "Master Educator Recognition" }
];

const accountingTerms = [
  "Assets = Liabilities + Equity",
  "Revenue − Expenses = Profit",
  "Gross Profit = Revenue − COGS",
  "Net Profit = Gross Profit − Expenses",
  "Working Capital = Current Assets − Current Liabilities",
  "Current Ratio = Current Assets / Current Liabilities",
  "Quick Ratio = (CA − Inventory) / CL",
  "ROE = Net Income / Shareholder’s Equity",
  "ROA = Net Income / Total Assets",
  "Debt to Equity = Total Debt / Equity",
  "EPS = Net Income / Shares Outstanding",
  "Break-even = Fixed Cost / (SP − VC)",
  "Cash Flow = Inflow − Outflow",
  "Depreciation = Cost − Salvage Value",
  "COGS = Opening Stock + Purchases − Closing Stock",
  "Inventory Turnover = COGS / Avg Inventory",
  "Accounts Receivable Turnover = Net Credit Sales / Avg AR",
  "Accounts Payable Turnover = Purchases / Avg AP",
  "Operating Margin = Operating Income / Revenue",
  "Net Profit Margin = Net Profit / Revenue"
];

const marqueeItems = [
  "∫ f(x)dx", "E = mc²", "∇ × B = μ₀J", "ΔG = ΔH − TΔS", "F = ma",
  "PV = nRT", "λ = h/p", "∂ψ/∂t = Ĥψ", "σ = F/A", "τ = r × F",
  "∮ E·dA = Q/ε₀", "v = u + at", "S = k ln W", "ΔE = hf", "∇²φ = 0",
  "a² + b² = c²", "eⁱπ + 1 = 0", "∑ F = dp/dt", "Ω = 2πf", "curl E = −∂B/∂t",
];

const testimonials = [
  { name: "Sarah Mitchell", role: "Ph.D. Student, Physics", quote: "The lecture notes are incredibly detailed and well-organized. They've been invaluable throughout my research." },
  { name: "James Chen", role: "Undergraduate, Mathematics", quote: "The worksheets helped me build a strong foundation. Professor's teaching style makes complex topics accessible." },
  { name: "Dr. Amara Osei", role: "Fellow Academic", quote: "A truly dedicated educator whose resources have set a benchmark for academic excellence." },
];

const quotes = [
  "Ideas are cheap. Ideas are easy. Ideas are common. Everybody has ideas. Ideas are highly, highly overvalued. Execution is all that matters.",
  "Be ready to revise any system, scrap any method, abandon any theory, if the success of the job requires it.",
  "When you’re a leader, you work for your team. They don’t work for you.",
  "Motivation is the catalysing ingredient for every successful innovation.",
  "Nobody talks about entrepreneurship as survival, but that’s exactly what it is and what nurtures creative thinking.",
  "The most dangerous poison is the feeling of achievement. The antidote is to every evening think what can be done better tomorrow.",
  "Good leaders create a vision, articulate the vision, passionately own the vision and relentlessly drive it to completion.",
  "Success is the child of drudgery and perseverance. It cannot be coaxed or bribed. Pay the price and it's yours.",
  "Do every job you’re in like you’re going to do it for the rest of your life, and demonstrate that ownership of it.",
  "Be authentic. Be yourself, and work at places that really welcome who you are. You’ll get up every single morning passionately committed to making a difference. Leave your fingerprints. Really think about what’s the impact that I had because of this job!",
  "Don't be afraid to take the tough targets. You'll develop confidence in dealing with tough issues that will serve you for the rest of your career.",
  "Finding leadership requires vigilance, hard work, an abhorrence of complacency and self-satisfaction — and a willingness to make changes when changes are needed, no matter how painful they may be.",
  "The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into smaller manageable tasks, and then starting on the first one.",
  "I’m convinced that about half of what separates the successful entrepreneurs from the non-successful ones is pure perseverance.",
  "In absence of clearly defined goals, we become strangely loyal to performing daily trivia, until we ultimately become enslaved by it.",
  "The only way to do great work is to love what you do. If you haven’t found it yet, keep looking. Don’t settle.",
  "Success is not overnight. It’s when every day you get a little better than the day before. It all adds up."
];

const Index = () => {
  const [allVideos, setAllVideos] = useState(mockVideos);
  // const [videoIdx, setVideoIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
const [randomQuote, setRandomQuote] = useState(() => {
  return quotes[Math.floor(Math.random() * quotes.length)];
});
  useReveal();

  useEffect(() => {
    const uploaded = loadVideos();
    setAllVideos([...uploaded, ...mockVideos]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // const visibleVideos = [
  //   allVideos[videoIdx % allVideos.length],
  //   allVideos[(videoIdx + 1) % allVideos.length],
  // ];

  return (
    <Layout>
      {/* Hero */}
      <section className="page-section pt-0 pb-[4rem] md:pb-0 bg-secondary relative overflow-hidden">
        {/* Decorative orbs */}
        <div className="gradient-orb w-96 h-96 bg-accent top-0 -right-48" />
        <div className="gradient-orb w-72 h-72 bg-primary -bottom-36 -left-36" />

        <div className="container mx-auto relative">
          <div className="grid md:grid-cols-2 gap-4 md:gap-16 items-center">
            <div className="order-1 md:order-1">
              <div className="relative">
                <img
                  src={heroImage}
                  alt="Professor in academic study"
                  width={800}
                  height={960}
                  className="rounded-2xl w-full max-w-md mx-auto relative z-10"
                />
                {/* Decorative frame */}
                {/* <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-accent/30 rounded-2xl z-0 hidden md:block" />
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/10 rounded-2xl z-0 hidden md:block" /> */}
              </div>
            </div>
            <div className="order-2 md:order-2 animate-fade-in">
              {/* <span className="section-badge">✦ Welcome</span> */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mt-3 leading-[1.1] tracking-tight">
                Empowering Minds Through <span className="text-accent relative">Knowledge
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M1 5.5C47 2 153 2 199 5.5" stroke="hsl(38 70% 50%)" strokeWidth="3" strokeLinecap="round"/></svg>
                </span>
              </h1>
              <p className="text-justify text-muted-foreground font-body text-lg mt-6 leading-relaxed max-w-lg">
                He stands at the intersection of intellect and impact—a facilitator defined not by convention, but by calibrated precision and academic authority. With command over Accountancy, Business Studies, Applied Mathematics and Statistics, he engineers clarity out of complexity and transforms learning into a disciplined pursuit of mastery. His philosophy rejects noise, prioritizing depth, structure, and thinking as a craft. Known for transforming complexity into clarity and students into thinkers.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/notes"
                  className="group bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-body font-semibold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center gap-2"
                >
                  Explore Notes
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-border text-foreground px-7 py-3.5 rounded-xl font-body font-semibold text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Scroll Marquee — Equations */}
      <section className="py-5 bg-primary overflow-hidden">
        <div className="marquee-track">
          <div className="marquee-content">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="mx-8 text-primary-foreground/40 font-body text-base whitespace-nowrap select-none">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="page-section reveal">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s) => (
              <div key={s.label} className="text-center glass-card p-8 group">
                <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                  <s.icon className="h-6 w-6 text-accent" />
                </div>
                <div className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                  <CountUp target={s.value} />
                </div>
                <div className="text-muted-foreground font-body text-sm mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Scroll Marquee — Accounts */}
      <section className="py-5 bg-primary overflow-hidden">
        <div className="marquee-track">
          <div className="marquee-content-inverse">
            {accountingTerms?.map((item, i) => (
              <span key={i} className="mx-8 text-primary-foreground/40 font-body text-base whitespace-nowrap select-none">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section — Collage + Points */}
      <InfoSection />

      {/* Features */}
      <section className="page-section bg-secondary relative overflow-hidden reveal">
        <div className="gradient-orb w-80 h-80 bg-accent -top-40 left-1/2" />
        <div className="container mx-auto text-center relative">
          <span className="section-badge">✦ Resources</span>
          <h2 className="section-title">What I Offer</h2>
          <p className="section-subtitle mx-auto">Resources designed to enhance your learning journey</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {features.map((f) => (
              <GlowCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} link={f.link} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Video Slider */}
      {/* {allVideos.length > 0 && (
        <section className="page-section reveal">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <span className="section-badge">✦ Featured</span>
              <h2 className="section-title mt-2">Video Lectures</h2>
              <p className="section-subtitle mx-auto">Watch engaging lectures on various topics</p>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {visibleVideos.map((video, vi) => (
                  <div key={`${videoIdx}-${vi}`} className="glass-card overflow-hidden group">
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                        <div className="bg-accent rounded-full p-4 shadow-xl shadow-accent/30 scale-75 group-hover:scale-100 transition-transform duration-500">
                          <Play className="h-7 w-7 text-accent-foreground" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading font-bold text-lg text-foreground">{video.title}</h3>
                      <p className="text-muted-foreground font-body text-sm mt-2 line-clamp-2 leading-relaxed">{video.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {allVideos.length > 1 && (
                <div className="flex items-center justify-center gap-4 mt-8">
                  <button
                    onClick={() => setVideoIdx((i) => (i - 1 + allVideos.length) % allVideos.length)}
                    className="bg-primary text-primary-foreground rounded-xl p-2.5 hover:bg-accent transition-all duration-300 shadow-md"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <div className="flex gap-2">
                    {allVideos.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setVideoIdx(i)}
                        className={`rounded-full transition-all duration-300 ${
                          i === videoIdx % allVideos.length ? "bg-accent w-6 h-2.5" : "bg-border w-2.5 h-2.5 hover:bg-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setVideoIdx((i) => (i + 1) % allVideos.length)}
                    className="bg-primary text-primary-foreground rounded-xl p-2.5 hover:bg-accent transition-all duration-300 shadow-md"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )} */}

      {/* Testimonials - hidden for now
      <section className="page-section bg-secondary relative overflow-hidden reveal">
        ...
      </section>
      */}

      {/* Quote */}
      <section className="page-section bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/20" />
        <div className="container mx-auto text-center max-w-3xl relative">
          <Quote className="h-12 w-12 text-accent/40 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">
           "{randomQuote}"
          </h2>
          <div className="w-12 h-0.5 bg-accent mx-auto mb-4" />
          {/* <p className="text-primary-foreground/60 font-body italic text-lg">— Amit Roopani</p> */}
        </div>
      </section>
      <InfoSection2 />

      {/* Alumni & Mentors Testimonials */}
      <TestimonialsSection />

      {/* CTA */}
      {/* <section className="page-section reveal">
        <div className="container mx-auto text-center max-w-2xl">
          <span className="section-badge">✦ Get Started</span>
          <h2 className="section-title">Ready to Start Learning?</h2>
          <p className="section-subtitle mx-auto">Access hundreds of notes, worksheets, and video lectures curated for your academic success.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              to="/notes"
              className="group bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-body font-semibold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Browse Notes
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/worksheets"
              className="bg-accent text-accent-foreground px-8 py-3.5 rounded-xl font-body font-semibold text-sm hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
            >
              View Worksheets
            </Link>
            <Link
              to="/blog"
              className="border-2 border-border text-foreground px-8 py-3.5 rounded-xl font-body font-semibold text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            >
              Watch Videos
            </Link>
          </div>
        </div>
      </section> */}
    </Layout>
  );
};

export default Index;
