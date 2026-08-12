import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const alumniTestimonials = [
  { name: "Grecy Jain", role: "Student", quote: "I had a wonderful learning experience with Amit Sir. The teaching method is truly unique and makes even difficult concepts easy to understand. What I loved the most is how beautifully festivals are celebrated, creating a warm and joyful environment. We have built such a strong bond with him that we feel like our second home, which makes him truly unforgettable and one of my favourite mentors with a very unique personality." },
  { name: "Riyaa Chawla", role: "Student", quote: "Thank you so much sir for being there for us. You have not only provided bookish knowledge but also nurtured us on how to grow in the outside real world. Subjects like accounts and statistics became just like friends because of your practical teaching methods." },
  { name: "Ibrahim Refai", role: "Student", quote: "Studying under your guidance during my 12th standard was truly a memorable experience. Your teaching not only helped me understand the subject better but also built my confidence. The discipline and clarity provided by you encouraged me and still help me today. I’m grateful for the lessons and support you gave us. Wishing you continued success in inspiring many more students." },
  { name: "Manyata Singh", role: "Student", quote: "Well to be very honest, you're genuinely one of the best teachers I have met throughout my entire school life. Nowadays teaching has changed its meaning from passion to profession, but teachers like you still exist who make sure the true essence of teaching should never be compromised. I've always been grateful that I have been your student. It's not just the lessons you teach but your teaching style and your intention of clarifying each concept so precisely that it gets straight fitted into the brain. It has been a privilege being your student and you're our idol, Amir Sir!" },
  { name: "Janki Trivedi", role: "Student", quote: "It has been a great journey with you! Learned a lot of things, explored more than just textbooks and notes! Thank you for being an amazing and supportive teacher!" },
  { name: "Jahan Gagan", role: "Student", quote: "I’m really thankful for everything you taught me. You always made things easy to understand and helped me build a strong base. By the grace of God and your support, today I’m a successful software engineer. Thank you for always guiding and encouraging us." },
  { name: "Shalini Saraf", role: "Student", quote: "I just want to take a moment to thank you for everything you’ve done for us. You’ve been more than just a teacher—you’ve been a guide and a constant support throughout this journey. With you, it was never just about studying. You made learning feel easy and enjoyable, while also giving us fun, light moments that made this journey so special. It always felt like the perfect balance of study and little party moments. Thank you for always pushing us to do better, believing in us, and making even the toughest days feel manageable." },
  { name: "Tanvi Palsanawala", role: "Student", quote: "Being a student of Amit Sir is among the best things that happened in my life. It is a privilege to study from him because his method and way of teaching are the best. Even if I have a simple doubt, he teaches me an easy method. Even if a student doesn't understand one method, he shows another one that is much simpler." },
  { name: "Ronak", role: "Student", quote: "In India there are many teachers who must be teaching well, but what makes Amit Sir different is his focus on overall personality development and making us self-dependent. There are many students who score 100/100, but what have you done beyond that? Have you developed any skills? Before my school teachers, college faculties, or interviewer, he was the one who showed me how real life works. If I wanted, I could easily flex about scoring up to 65%, but under his guidance I scored 85.3% in my 12th CBSE boards. However, this is not what makes him unique." },
  { name: "Rahul Punjabi", role: "Student", quote: "There are many teachers who are experts in their respective subjects, but in addition to that Sir was an expert at understanding the qualities of individual students. I still remember when he pushed me to speak regarding a topic in front of the whole class, which I was highly scared of, but I eventually did it. It may seem like a small thing, but it has had such a lasting impact on me that I still remember it after 15 years. In short, he was the most motivating, understanding, and intelligent teacher in his subjects." },
  { name: "Vivek Jain", role: "Student", quote: "Sir, learning from you was one of the best decisions of my journey. You didn’t just teach subjects, but also discipline and self-belief. I’m really thankful for your constant support and encouragement. Wishing you the best for this wonderful initiative." },
  { name: "Ayushi Batheja", role: "Student", quote: "Amit Sir is not just a teacher; he is a supporter, guidance giver, and mentor. Today what I am is because of him. He guided me very well on what to do and what not to do. The time I spent with him was very memorable—our masti time, study time, vadapav parties, study time at CCD, and many more. These are lifetime memories. I can definitely say that those who are with him will enjoy his company and be successful in their future." },
  { name: "Disha Bhoj", role: "Student", quote: "My journey with Amit Sir was amazing. The techniques related to maths that you taught were amazing. You are great at teaching. It was an amazing journey with you. So glad to have a teacher like you." },
  { name: "Pinank Rana", role: "Student", quote: "I would like to mention my journey, which was filled with learnings in studies as well as in life. It has been a great time with Amit Sir. He is more than a mentor to me—a friend and someone with a brotherly feeling—which helped me well with my studies as well as sharing great moments that are still memorable." },
  { name: "Rushil Patel", role: "Student", quote: "Best teacher I have ever met in my life — I’ve learned almost everything from you. Your board exam practice techniques still help me even today. The vibe I shared with you, I’ve never felt with any other teacher. Thank you for everything, Sir." },
  { name: "Mansi Hasani", role: "Student", quote: "My journey under your guidance has been truly transformative. You not only helped me understand concepts clearly but also encouraged me to believe in myself. Your dedication, patience, and positive approach created a comfortable environment for learning and growth. The values and confidence I gained from you continue to help me even today. I’m sincerely thankful for your constant support and inspiration." },
  { name: "Shivani Sharma", role: "Student", quote: "It’s truly an honor to be a part of the Alumni Speaks section. My journey under your guidance has been incredibly enriching. Your teaching not only helped me build strong academic foundations but also boosted my confidence and discipline. I’m really grateful for your constant support and encouragement. To current students, I would say—make the most of his guidance, as it truly shapes both knowledge and character." },
  { name: "Lavina Chawla", role: "Student", quote: "Being your student was more than just academics—it was about learning discipline, confidence, and self-belief. You always motivated us to push beyond our limits. The impact of your teaching still reflects in my journey today. Thank you for being such an inspiring mentor." },
  { name: "Kasturi Bhatt", role: "Student", quote: "Amit Sir has always been a direction giver in my life. His way of teaching made everything easy for me to understand and learn quickly. Even today, his notes help me a lot in solving my study problems. I am truly grateful to have been his student." },
  { name: "Aditya Sinh Thakor", role: "Student", quote: "Sir, learning from you has been a great experience. You taught me discipline, seriousness, and important life lessons along with studies. One special moment I still remember is when you offered me extra classes to improve my marks and made sure I didn’t struggle in college. I will always remember these lessons in my life. I’m truly grateful to be your student." },
  { name: "Mili", role: "Student", quote: "It’s been 10 years now since I’ve known Amit Sir, and honestly, what a journey it’s been. Over the years, he has easily remained one of the best teachers I’ve ever had and one of my all-time favourites. He had this way of making learning feel genuinely interesting, and his classes were always something to look forward to. Even the tougher concepts somehow felt easier when he explained them. Looking back, I can only think of those years with a lot of gratitude and some really great memories." },
  { name: "Aveeraj Sinh Rathod", role: "Student", quote: "Time with Amit Sir was amazing and very helpful for me, and my journey under his guidance provided a clear path to my career. Current students, I just want you to ask yourself: WHAT YOU WANT TO DO. Don't get confused when choosing your pathway. Future generations: your generation has to encourage skills, because the skills you build here will be your greatest assets in the professional world. Stay persistent, stay inquisitive, and remember that every challenge is an opportunity to refine your craft." },
  { name: "Honey Gandhi", role: "Student", quote: "It's a privilege to learn under your guidance. Your teaching style made concepts easy to understand and built my confidence step by step. I am grateful for your constant support and motivation throughout my journey. I am truly grateful for your dedication and inspiration. Thank you for everything!" },
  { name: "Diya Patel", role: "Student", quote: "To be honest, I have been with Sir for a very short time, but in this short time I have learnt a lot of good things. He is a very good motivator, understands the feelings of students, and knows very well where to be strict and where to be calm. I got to learn a lot of good things from him, and I am very lucky to have a Sir like him." },
  { name: "Ishwar Udasi", role: "Student", quote: "Education is not only about books; we need systematic mental growth to develop a mindset about future goals. Being your student was a turning point in my journey. The clarity, discipline, and mindset I developed during that time still guide me today. Your teaching goes beyond academics—it builds character. I’m thankful for those valuable lessons." },
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

      <div className="grid md:grid-cols-1 gap-8">
        <div>
          <h3 className="font-heading font-bold text-foreground text-lg mb-5 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent" />
            Alumni Speak
          </h3>
          <FeedbackSlider items={alumniTestimonials} accentColor="text-accent" />
        </div>

        {/* <div>
          <h3 className="font-heading font-bold text-foreground text-lg mb-5 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            My Mentors
          </h3>
          <FeedbackSlider items={mentorTestimonials} accentColor="text-primary" />
        </div> */}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
