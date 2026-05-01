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

const InfoSection2 = () => (
  <section className="page-section reveal">
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-2 gap-14 items-center">
        
        {/* LEFT → Text */}
        <div>
          <h2 className="section-title mt-2 text-left">
            A Commitment to <span className="text-accent">Academic Excellence</span>
          </h2>

          <p className="text-justify text-muted-foreground font-body text-base mt-3 mb-8 leading-relaxed max-w-lg">
           Operating across secondary and senior secondary education, he engineers learning systems defined by precision, structure, and results. As Board Examination Co-ordinator and various public exam coordinator he has led high-stakes academic operations with uncompromising standards. With deep command over assessment frameworks and competitive examinations, his work reflects strategic execution at scale. Refined by global exposure through GTTP, his mentorship has translated into international student representation—where vision meets outcome.
          </p>
        </div>

        {/* RIGHT → Single Image */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="/images/InfoSectionFinal.png"
            alt="Teaching in classroom"
            loading="lazy"
            width={600}
            height={472}
            className="w-full max-w-md object-cover rounded-2xl"
          />
        </div>

      </div>
    </div>
  </section>
);

export default InfoSection2;