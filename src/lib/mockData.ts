export interface NoteItem {
  id: string;
  title: string;
  description: string;
  subject: string;
  date: string;
  pdfUrl?: string;
}

export interface WorksheetItem {
  id: string;
  title: string;
  description: string;
  subject: string;
  date: string;
  pdfUrl?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export const mockNotes: NoteItem[] = [
  { id: "1", title: "Introduction to Quantum Mechanics", description: "Fundamental concepts of quantum mechanics including wave-particle duality, Schrödinger's equation, and quantum states.", subject: "Physics", date: "2026-03-15" },
  { id: "2", title: "Organic Chemistry Basics", description: "An overview of organic compounds, functional groups, and naming conventions.", subject: "Chemistry", date: "2026-03-10" },
  { id: "3", title: "Linear Algebra Fundamentals", description: "Vectors, matrices, eigenvalues, and their applications in modern science.", subject: "Mathematics", date: "2026-03-05" },
  { id: "4", title: "Thermodynamics - Laws & Applications", description: "The four laws of thermodynamics with real-world applications and problem sets.", subject: "Physics", date: "2026-02-28" },
];

export const mockWorksheets: WorksheetItem[] = [
  { id: "1", title: "Quantum Mechanics Problem Set 1", description: "Practice problems covering wave functions and probability distributions.", subject: "Physics", date: "2026-03-18" },
  { id: "2", title: "Organic Nomenclature Worksheet", description: "Exercises on naming organic compounds using IUPAC conventions.", subject: "Chemistry", date: "2026-03-12" },
  { id: "3", title: "Matrix Operations Practice", description: "Problems on matrix multiplication, determinants, and inverse matrices.", subject: "Mathematics", date: "2026-03-08" },
];

export const mockVideos: VideoItem[] = [
  { id: "1", title: "Understanding Wave-Particle Duality", description: "A comprehensive lecture on one of quantum mechanics' most fascinating concepts.", thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=340&fit=crop", date: "2026-03-20" },
  { id: "2", title: "Chemical Bonding Explained", description: "Deep dive into ionic, covalent, and metallic bonding mechanisms.", thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=340&fit=crop", date: "2026-03-14" },
  { id: "3", title: "Calculus in Real Life", description: "How calculus applies to engineering, economics, and natural phenomena.", thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&h=340&fit=crop", date: "2026-03-07" },
];

export const mockBlogPosts: BlogPost[] = [
  { id: "1", title: "The Future of Online Education", excerpt: "How digital platforms are transforming the way we learn and teach in higher education.", date: "2026-03-22", category: "Education" },
  { id: "2", title: "Research Methodologies for Beginners", excerpt: "A beginner-friendly guide to understanding qualitative and quantitative research methods.", date: "2026-03-18", category: "Research" },
  { id: "3", title: "Why Critical Thinking Matters", excerpt: "Exploring the importance of critical thinking skills in academic and professional settings.", date: "2026-03-10", category: "Opinion" },
];
