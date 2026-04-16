import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/notes", label: "Notes" },
  { to: "/worksheets", label: "Worksheets" },
  { to: "/blog", label: "Blog" },
  { to: "/videos", label: "Videos" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-primary backdrop-blur-md shadow-lg shadow-primary/10" : "bg-primary/95 backdrop-blur-sm"} border-b border-border/10`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2.5 text-primary-foreground group">
          {/* <div className="bg-accent/20 p-1.5 rounded-lg group-hover:bg-accent/30 transition-colors">
            <BookOpen className="h-5 w-5 text-accent" />
          </div>
          */}
          <span className="font-dancing text-3xl font-bold tracking-tight">Amit Roopani</span> 
          {/* <img
           src="/images/logo.jpg"   // put your image inside public folder
           alt="Amit Rupani"
           className="h-12 w-auto object-contain"
          /> */}
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-body font-medium px-4 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === l.to
                  ? "text-accent bg-accent/10"
                  : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
          {/* <Link
            to="/admin"
            className="ml-3 text-xs font-body bg-accent text-accent-foreground px-5 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-all duration-200 shadow-md shadow-accent/20"
          >
            Admin
          </Link> */}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-primary-foreground p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-primary/98 backdrop-blur-md border-t border-border/10 animate-fade-in">
          <div className="flex flex-col py-3 px-4 gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`text-sm font-body font-medium py-2.5 px-3 rounded-lg transition-all ${
                  location.pathname === l.to
                    ? "text-accent bg-accent/10"
                    : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5"
                }`}
              >
                {l.label}
              </Link>
            ))}
            {/* <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="text-xs font-body bg-accent text-accent-foreground px-4 py-2.5 rounded-lg font-semibold text-center mt-2 shadow-md shadow-accent/20"
            >
              Admin
            </Link> */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
