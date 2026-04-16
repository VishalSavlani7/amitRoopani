import collage1 from "@/assets/collage-1.jpg";
import collage2 from "@/assets/collage-2.jpg";
import collage3 from "@/assets/collage-3.jpg";
import { CheckCircle } from "lucide-react";

const points = [
  {
    title: "Research-Driven Teaching",
    desc: "Every lecture is backed by the latest academic research and real-world applications.",
  },
  {
    title: "Personalized Mentorship",
    desc: "One-on-one guidance tailored to each student's strengths and learning pace.",
  },
  {
    title: "Industry-Aligned Curriculum",
    desc: "Course content designed to bridge the gap between academia and professional practice.",
  },
  {
    title: "Innovative Learning Methods",
    desc: "Leveraging technology and interactive tools for deeper student engagement.",
  },
  {
    title: "Community & Collaboration",
    desc: "Building a network of learners who support and inspire each other.",
  },
];

const InfoSection = () => (
  <section className="page-section reveal">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        {/* Image Collage */}
        <div className="relative grid grid-cols-2 gap-3 max-w-lg mx-auto lg:mx-0">
          <div className="row-span-2">
            <img
              src="/images/img1.jpg"
              alt="Teaching in classroom"
              loading="lazy"
              width={640}
              height={512}
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <img
              src="/images/img2.jpg"
              alt="Mentoring students"
              loading="lazy"
              width={640}
              height={512}
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <img
              src="/images/img3.jpg"
              alt="Speaking at conference"
              loading="lazy"
              width={640}
              height={512}
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
          </div>
          {/* Decorative accent */}
          <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-accent/10 rounded-2xl -z-10" />
          <div className="absolute -top-3 -right-3 w-16 h-16 bg-primary/10 rounded-2xl -z-10" />
        </div>

        {/* Points */}
        <div>
          {/* <span className="section-badge">✦ Why Choose Me</span> */}
          <h2 className="section-title mt-2 text-left">
            A Commitment to <span className="text-accent">Academic Excellence</span>
          </h2>
          <p className="text-justify text-muted-foreground font-body text-base mt-3 mb-8 leading-relaxed max-w-lg">
            A recipient of multiple distinctions for teaching excellence, he has been conferred the “Best Teacher” honor for three consecutive years—an early recognition of consistency, impact, and academic command within a leading group of institutions.Recognized by the Rotary Club of Surat, his work transcends accolades—setting benchmarks in academic impact and intellectual authority. Not driven by recognition, but by an uncompromising standard of excellence.          </p>
          {/* <div className="space-y-4">
            {points.map((p) => (
              <div key={p.title} className="flex items-start gap-3 group">
                <CheckCircle className="h-5 w-5 text-accent mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <h4 className="font-heading font-semibold text-foreground text-sm">{p.title}</h4>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  </section>
);

export default InfoSection;
