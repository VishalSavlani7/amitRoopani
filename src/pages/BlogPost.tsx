import Layout from "@/components/Layout";
import { useParams, Link, useLocation } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
}

// const SHEETDB_URL = "https://sheetdb.io/api/v1/whyc6couc4f6w";
const SHEET_ID = "1JHA_6JcK302fOUc4hVj2qAxHU3dglmoWVtvtKcqFlp8";
const API_KEY = "AIzaSyC1UAGjqkukOzZz1h2ShohCp62StRLc38s";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();

  const [post, setPost] = useState<BlogPostData | null>(null); // ✅ always null initially
  const [loading, setLoading] = useState(true); // ✅ always true initially

  // useEffect(() => {
  //   // ✅ Only trust state if it actually has content
  //   const locationState = state as BlogPostData | null;
  //   if (locationState?.content) {
  //     setPost(locationState);
  //     setLoading(false);
  //     return;
  //   }

  //   // ✅ Always fetch if state is missing or incomplete
  //   fetch(SHEETDB_URL)
  //     .then((res) => {
  //       if (!res.ok) throw new Error("Failed to fetch");
  //       return res.json();
  //     })
  //     .then((data: any[]) => {
  //       const found = data.find((item) => String(item.id) === String(id));
  //       if (found) {
  //         setPost({
  //           id: found.id,
  //           category: found.category ?? "",
  //           title: found.title ?? "Untitled",
  //           content: found.content ?? "",   // ✅ never undefined
  //           excerpt: found.excerpt ?? "",   // ✅ never undefined
  //           date: found.date ?? "",
  //         });
  //       }
  //     })
  //     .catch((err) => console.error("Failed to load post:", err))
  //     .finally(() => setLoading(false));   // ✅ always clears loading
  // }, [id]); // ✅ removed state from deps to avoid re-fetch loops
  useEffect(() => {
  const locationState = state as BlogPostData | null;
  if (locationState?.content) {
    setPost(locationState);
    setLoading(false);
    return;
  }

  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:Z1000?key=${API_KEY}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    })
    .then((data) => {
      const [headers, ...rows] = data.values;

      const found = rows.find((row: string[]) => String(row[0]) === String(id));

      if (found) {
        setPost({
          id:       found[0],
          category: found[1] ?? "",
          title:    found[2] ?? "Untitled",
          content:  found[3] ?? "",
          excerpt:  "",
          date:     found[4] ?? "",
        });
      }
    })
    .catch((err) => console.error("Failed to load post:", err))
    .finally(() => setLoading(false));
}, [id]);

  if (loading) {
    return (
      <>
        <section className="page-section pt-12">
          <div className="container mx-auto flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        </section>
      </>
    );
  }

  if (!post) {
    return (
      <>
        <section className="page-section pt-12">
          <div className="container mx-auto text-center py-20">
            <h1 className="text-2xl font-heading font-bold text-foreground">
              Post not found
            </h1>
            <Link
              to="/blog"
              className="text-accent hover:underline mt-4 inline-block font-body"
            >
              ← Back to Blog
            </Link>
          </div>
        </section>
      </>
    );
  }

  // ✅ Safe — content is guaranteed a string from ?? "" above
  const paragraphs = post.content
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <section className="page-section pt-12">
        <div className="container mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-body font-medium text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          {post.category && (
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-accent uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-full">
                <Tag className="h-3 w-3" /> {post.category}
              </span>
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground leading-tight">
            {post.title}
          </h1>

          {post.date && (
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground font-body">
              <Calendar className="h-4 w-4" />
              <span>{post.date}</span>
            </div>
          )}

          <div className="mt-8 border-t border-border pt-8">
            {post.excerpt && (
              <p className="text-lg text-muted-foreground font-body italic mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}
            <div className="prose prose-lg max-w-none text-md">
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="text-foreground/90 font-body leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-muted-foreground font-body italic">
                  No content available.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPost;