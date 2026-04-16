import { BookOpen, ArrowUpRight, LinkedinIcon, Instagram, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  // { label: "Notes", to: "/notes" },
  // { label: "Worksheets", to: "/worksheets" },
  // { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => (
  <footer className="bg-primary text-primary-foreground relative overflow-hidden">
    {/* Decorative accent line */}
    <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

    <div className="container mx-auto px-4 py-14">
      <div className="grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            {/* <div className="bg-accent/20 p-1.5 rounded-lg">
              <BookOpen className="h-5 w-5 text-accent" />
            </div> */}
            <span className="font-dancing text-3xl font-bold tracking-tight">Amit Roopani</span>
          </div>
          <p className="text-sm text-primary-foreground/60 font-body leading-relaxed max-w-xs">
            Dedicated to excellence in education and research. Inspiring the next generation of scholars and thinkers.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-5 text-accent text-sm tracking-wider uppercase">Let's Connect</h4>
          <div className="flex flex-col gap-2.5">
            {footerLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm text-primary-foreground/60 hover:text-accent transition-colors font-body flex items-center gap-1 group"
              >
                {l.label}
                <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-heading font-semibold mb-5 text-accent text-sm tracking-wider uppercase">Contact</h4>
          <div className="space-y-2.5">
            <p className="text-sm text-primary-foreground/60 font-body">amitroopani@gmail.com</p>
            <p className="text-sm text-primary-foreground/60 font-body">amit_roopani@hotmail.com</p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-primary-foreground/40 font-body">© 2026 Amit Roopani. All rights reserved.</p>
        {/* <p className="text-xs text-primary-foreground/40 font-body">Built with passion for education</p> */}
        <div>
                <div className="flex items-center gap-6">
                  <a href="https://www.linkedin.com/in/amit-roopani-440284270?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="rounded-lg transition-colors group">
                    <LinkedinIcon className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="https://www.instagram.com/amit.roopani?igsh=MXdmN2pvb3V3aXY1Mg==" target="_blank" rel="noopener noreferrer" className="rounded-lg transition-colors group">
                    <Instagram className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="rounded-lg transition-colors group">
                    <Youtube className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
      </div>
    </div>
  </footer>
);

export default Footer;
