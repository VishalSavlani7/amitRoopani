import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface GlowCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  link: string;
}

const GlowCard = ({ icon: Icon, title, desc, link }: GlowCardProps) => {
  return (
    <Link to={link} className="glow-card group block">
      <div className="glow-card-inner bg-card border border-border/60 rounded-xl p-8 h-full transition-all duration-500">
        <div className="bg-accent/10 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-500">
          <Icon className="h-7 w-7 text-accent" />
        </div>
        <h3 className="font-heading font-semibold text-lg text-foreground">{title}</h3>
        <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed">{desc}</p>
      </div>
    </Link>
  );
};

export default GlowCard;
