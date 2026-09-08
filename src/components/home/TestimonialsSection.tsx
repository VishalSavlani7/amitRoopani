import { Quote, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface Testimonial {
  no: string;
  name: string;
  role: string;
  quote: string;
}

interface SliderProps {
  items: Testimonial[];
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
    if (items.length === 0) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next, items.length]);

  if (items.length === 0) return null;

  const item = items[current];

  return (
    <div className="relative w-full">
      <div className="glass-card p-5 sm:p-6 md:p-8 min-h-[260px] sm:min-h-[240px] md:min-h-[220px] flex flex-col justify-between overflow-hidden w-full">
        <div
          key={`${current}-${direction}`}
          className={direction === "right" ? "animate-slide-in-right" : "animate-slide-in-left"}
        >
          <Quote className={`h-6 w-6 sm:h-8 sm:w-8 ${accentColor} mb-3 sm:mb-4 shrink-0`} />
          <p className="text-foreground font-body text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 italic max-h-[38vh] sm:max-h-none overflow-y-auto pr-1">
            "{item.quote}"
          </p>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${accentColor.replace("text-", "bg-")}/20 flex items-center justify-center shrink-0`}>
              <span className={`font-heading font-bold text-xs sm:text-sm ${accentColor}`}>
                {item.name.split(" ").map((n) => n[0]).join("")}
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-heading font-semibold text-foreground text-sm truncate">{item.name}</p>
              <p className="text-muted-foreground font-body text-xs truncate">{item.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4 gap-3">
        <div className="hidden sm:flex gap-1.5 flex-wrap max-w-[70%]">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => { setDirection(i > current ? "right" : "left"); setCurrent(i); }}
              className={`rounded-full transition-all duration-300 ${
                i === current ? `${accentColor.replace("text-", "bg-")} w-6 h-2` : "bg-border w-2 h-2 hover:bg-muted-foreground"
              }`}
            />
          ))}
        </div>

        <span className="sm:hidden font-body text-xs text-muted-foreground">
          {current + 1} / {items.length}
        </span>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="bg-card border border-border rounded-lg p-2 hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-foreground" />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="bg-card border border-border rounded-lg p-2 hover:bg-secondary transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // TODO: replace with your Testimonials sheet ID (and adjust the range/tab name if needed)
  const SHEET_ID = "1GcGdNkQt2sqb4XVXm4321GkL4W__MhT78ZsTj1zowrA";
  const API_KEY = "AIzaSyC1UAGjqkukOzZz1h2ShohCp62StRLc38s";

  useEffect(() => {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:Z1000?key=${API_KEY}`)
      .then((res) => res.json())
      .then((d) => {
        if (!d.values || d.values.length < 2) {
          setTestimonials([]);
          setLoading(false);
          return;
        }
        const [, ...rows] = d.values; // skip header row

        // Expected columns: No | Name | Role | Quote
        const parsed: Testimonial[] = rows
          .map((row: string[]) => ({
            no: row[0] ?? "",
            name: row[1] ?? "",
            role: row[2] ?? "",
            quote: row[3] ?? "",
          }))
          .filter((t) => t.name && t.quote);

        setTestimonials(parsed);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  console.log("testimonials", testimonials);

  return (
    <section className="page-section bg-secondary reveal">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12">
          <span className="section-badge">✦ Testimonials</span>
          <h2 className="section-title mt-2">Voices That Matter</h2>
          <p className="section-subtitle mx-auto">Hear from those who've been part of this journey</p>
        </div>

        <div className="grid md:grid-cols-1 gap-8">
          <div>
            <h3 className="font-heading font-bold text-foreground text-base sm:text-lg mb-4 sm:mb-5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
              Alumni Speak
            </h3>

            {loading ? (
              <div className="glass-card flex items-center justify-center min-h-[220px]">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            ) : (
              <FeedbackSlider items={testimonials} accentColor="text-accent" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;