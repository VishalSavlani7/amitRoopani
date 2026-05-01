import Layout from "@/components/Layout";
import aboutBanner from "@/assets/about-banner.jpg";
import masonry1 from "@/assets/masonry-1.jpg";
import masonry2 from "@/assets/masonry-2.jpg";
import masonry3 from "@/assets/masonry-3.jpg";
import masonry4 from "@/assets/masonry-4.jpg";
import masonry5 from "@/assets/masonry-5.jpg";
import masonry6 from "@/assets/masonry-6.jpg";
import masonry7 from "@/assets/masonry-7.jpg";
import masonry8 from "@/assets/masonry-8.jpg";
import { BookOpen, Award, Users, GraduationCap, Target, Heart, Lightbulb, Sparkles, ArrowRight, Clock, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";
import CountUp from "@/components/CountUp";
import Masonry from "@/components/ui/Masonry";

const stats = [
  { icon: Users, value: "3,000+", label: "Students Taught" },
  { icon: Award, value: "17+", label: "Years Experience" },
  { icon: Clock, value: "10000+", label: "Lectures Delivered" },
  { icon: Trophy, value: "4x", label: "Master Educator Recognition" }
];

const values = [
  { icon: Target, title: "Mission-Driven", desc: "Every lesson is designed to create lasting impact and real understanding." },
  { icon: Heart, title: "Student-First", desc: "Prioritizing student growth, well-being, and academic confidence." },
  { icon: GraduationCap, title: "Lifelong Learning", desc: "Continuously evolving teaching methods to stay ahead of the curve." },
  { icon: Lightbulb, title: "Innovation", desc: "Embracing new technologies and methodologies to enhance learning." },
];

const masonryItems = [
  { id: "1", img: masonry1, url: "#", height: 800 },
  { id: "2", img: masonry2, url: "#", height: 512 },
  { id: "3", img: masonry3, url: "#", height: 720 },
  { id: "4", img: masonry4, url: "#", height: 640 },
  { id: "5", img: masonry5, url: "#", height: 512 },
  { id: "6", img: masonry6, url: "#", height: 860 },
  { id: "7", img: masonry7, url: "#", height: 560 },
  { id: "8", img: masonry8, url: "#", height: 700 },
];

const About = () => {
  useReveal();

  return (
    <Layout>
      {/* Banner */}
      <section className="relative h-[58vh] md:h-[68vh] overflow-hidden">
        <img
          src={aboutBanner}
          alt="About Amit Roopani"
          width={1920}
          height={640}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="animate-fade-in">
            <span className="section-badge bg-accent/20 text-accent border border-accent/30">✦ About Me</span>
            <h1 className="uppercase text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground mt-4 leading-[1.1] tracking-tight drop-shadow-lg">
              Amit Roopani
            </h1>
            <p className="text-primary-foreground/80 font-body text-lg md:text-xl mt-4 max-w-2xl mx-auto">
              Passionate Educator · Dedicated Mentor · Lifelong Learner
            </p>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-accent/20" />
        <div className="container mx-auto relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center py-4">
                <s.icon className="h-5 w-5 text-accent mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground">
                  <CountUp target={s.value} />
                </div>
                <div className="text-primary-foreground/60 font-body text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Description + Widgets */}
      <section className="page-section reveal">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="section-badge">✦ My Story</span>
              <h2 className="section-title mt-2 text-left">
                A Journey of <span className="text-accent">Purpose & Passion</span>
              </h2>
              <p className="text-muted-foreground font-body text-base mt-4 leading-relaxed">
                With over two decades of experience in academia, I've dedicated my career to making complex subjects
                accessible, engaging, and transformative for students at every level. What started as a fascination
                with the beauty of knowledge evolved into a lifelong mission to make education transformative.
              </p>
              <p className="text-muted-foreground font-body text-base mt-4 leading-relaxed">
                From my first lecture hall to building this digital platform, every step has been driven by
                one belief: <span className="text-foreground font-semibold">every student deserves access to exceptional teaching</span>.
                I've had the privilege of mentoring thousands of students, many of whom have gone on to achieve remarkable success.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-12 h-0.5 bg-accent" />
                <p className="text-accent font-heading font-semibold text-sm italic">"Teaching is the art of making the complex simple."</p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  to="/contact"
                  className="group bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-body font-semibold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 flex items-center gap-2"
                >
                  Get in Touch
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/notes"
                  className="border-2 border-border text-foreground px-7 py-3.5 rounded-xl font-body font-semibold text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                >
                  Explore Resources
                </Link>
              </div>
            </div>

            {/* Value Widgets */}
            <div className="grid sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="glass-card p-6 group hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <v.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-1">{v.title}</h3>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Masonry Gallery */}
      {/* <section className="page-section bg-secondary relative overflow-hidden reveal">
        <div className="gradient-orb w-80 h-80 bg-accent -top-40 left-1/2" />
        <div className="container mx-auto relative">
          <div className="text-center mb-14">
            <span className="section-badge">✦ Gallery</span>
            <h2 className="section-title mt-2">Moments That Matter</h2>
            <p className="section-subtitle mx-auto">A glimpse into the academic journey — teaching, mentoring, and celebrating milestones</p>
          </div>
          <div>
            <Masonry
              items={masonryItems}
              animateFrom="bottom"
              stagger={0.06}
              duration={0.7}
              scaleOnHover={true}
              hoverScale={0.97}
              blurToFocus={true}
            />
          </div>
        </div>
      </section> */}

      {/* CTA */}
      {/* <section className="page-section bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent/20" />
        <div className="container mx-auto text-center max-w-2xl relative">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Let's Connect</h2>
          <p className="text-primary-foreground/60 font-body text-lg mb-8">
            Whether you're a student seeking guidance or a fellow academic exploring collaboration, I'd love to hear from you.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-xl font-body font-semibold text-sm hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 group"
          >
            Get in Touch
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section> */}
    </Layout>
  );
};

export default About;
