import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const alumniTestimonials = [
  { name: "Sarah Mitchell", role: "Software Engineer, Google", quote: "The analytical thinking skills I developed under Amit's guidance have been the foundation of my career." },
  { name: "James Chen", role: "Data Scientist, Microsoft", quote: "His teaching style transforms complex subjects into intuitive understanding. Truly life-changing." },
  { name: "Priya Sharma", role: "Research Fellow, MIT", quote: "Amit's mentorship gave me the confidence to pursue research at the highest level." },
  { name: "David Okonkwo", role: "Entrepreneur & CEO", quote: "The problem-solving frameworks I learned in his class still guide my business decisions today." },
  { name: "Emily Roberts", role: "Ph.D., Stanford", quote: "His passion for teaching is infectious. He made me fall in love with the subject." },
];

const mentorTestimonials = [
  { name: "Dr. Rajesh Gupta", role: "Professor, IIT Bombay", quote: "Amit is one of the most dedicated educators I've had the privilege to mentor. His impact on students is extraordinary." },
  { name: "Prof. Helen Clarke", role: "Dean, Oxford University", quote: "His innovative teaching methods set a benchmark that others aspire to reach." },
  { name: "Dr. Kenji Tanaka", role: "Nobel Laureate, Physics", quote: "Amit combines deep subject expertise with genuine empathy for his students — a rare and powerful combination." },
  { name: "Prof. Maria Santos", role: "UNESCO Education Advisor", quote: "His commitment to making education accessible globally is truly inspiring." },
  { name: "Dr. Alan Foster", role: "Former Department Chair", quote: "Watching Amit grow from a promising lecturer to a transformative educator has been one of my greatest joys." },
];

interface SliderProps {
  items: typeof alumniTestimonials;
  accentColor: string;
}

const FeedbackSlider = ({ items, accentColor }: SliderProps) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const next = useCallback(() => {
    setDirection("right");
    setCurrent((i) => (i + 1) % items.length);
  }, [items.length]);

  const prev = () => {
    setDirection("left");
    setCurrent((i) => (i - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next]);

  const item = items[current];

  return (
    <div className="relative">
      <div className="glass-card p-8 min-h-[220px] flex flex-col justify-between overflow-hidden">
        <div
          key={`${current}-${direction}`}
          className={direction === "right" ? "animate-slide-in-right" : "animate-slide-in-left"}
        >
          <Quote className={`h-8 w-8 ${accentColor} mb-4`} />
          <p className="text-foreground font-body text-base leading-relaxed mb-6 italic">
            "{item.quote}"
          </p>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${accentColor.replace("text-", "bg-")}/20 flex items-center justify-center`}>
              <span className={`font-heading font-bold text-sm ${accentColor}`}>
                {item.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <div>
              <p className="font-heading font-semibold text-foreground text-sm">{item.name}</p>
              <p className="text-muted-foreground font-body text-xs">{item.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? "right" : "left"); setCurrent(i); }}
              className={`rounded-full transition-all duration-300 ${
                i === current ? `${accentColor.replace("text-", "bg-")} w-6 h-2` : "bg-border w-2 h-2 hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={prev} className="bg-card border border-border rounded-lg p-2 hover:bg-secondary transition-colors">
            <ChevronLeft className="h-4 w-4 text-foreground" />
          </button>
          <button onClick={next} className="bg-card border border-border rounded-lg p-2 hover:bg-secondary transition-colors">
            <ChevronRight className="h-4 w-4 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => (
  <section className="page-section bg-secondary reveal">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <span className="section-badge">✦ Testimonials</span>
        <h2 className="section-title mt-2">Voices That Matter</h2>
        <p className="section-subtitle mx-auto">Hear from those who've been part of this journey</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-heading font-bold text-foreground text-lg mb-5 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            Alumni Speak
          </h3>
          <FeedbackSlider items={alumniTestimonials} accentColor="text-accent" />
        </div>

        <div>
          <h3 className="font-heading font-bold text-foreground text-lg mb-5 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            My Mentors
          </h3>
          <FeedbackSlider items={mentorTestimonials} accentColor="text-primary" />
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
