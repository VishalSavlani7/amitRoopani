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
const SHEET_ID = "1JHA_6JcK302fOUc4hVj2qAxHU3dglmoWVtvtKcqFlp8";
const API_KEY = "AIzaSyC1UAGjqkukOzZz1h2ShohCp62StRLc38s";
// const SHEETDB_URL = "https://sheetdb.io/api/v1/whyc6couc4f6w";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const [post, setPost] = useState<BlogPostData | null>(state || null);
  const [loading, setLoading] = useState(!state);

  // useEffect(() => {
  //   if (!state) {
  //     setLoading(true);
  //     fetch(SHEETDB_URL)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const found = data.find((item: any) => String(item.id) === String(id));
  //         if (found) {
  //           setPost({
  //             id: found.id,
  //             category: found.category,
  //             title: found.title,
  //             content: found.content,
  //             excerpt: found.excerpt || "",
  //             date: found.date,
  //           });
  //         }
  //         setLoading(false);
  //       })
  //       .catch(() => setLoading(false));
  //   }
  // }, [id, state]);

useEffect(() => {
  if (!state) {
    setLoading(true);
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:Z1000?key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const [headers, ...rows] = data.values;

        const found = rows.find((row: string[]) => String(row[0]) === String(id));

        if (found) {
          setPost({
            id:       found[0],
            category: found[1] || "General",
            title:    found[2] || "No Title",
            excerpt:  "",
            content:  found[3] || "",
            date:     found[4] || "No date",
          });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }
}, [id, state]);

  if (loading) {
    return (
      <Layout>
        <section className="page-section">
          <div className="container mx-auto flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        </section>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <section className="page-section">
          <div className="container mx-auto text-center py-20">
            <h1 className="text-2xl font-heading font-bold text-foreground">Post not found</h1>
            <Link to="/blog" className="text-accent hover:underline mt-4 inline-block font-body">
              ← Back to Blog
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="page-section">
        <div className="container mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-body font-medium text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-accent uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-full">
              <Tag className="h-3 w-3" /> {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground font-body">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>

          <div className="mt-8 border-t border-border pt-8">
            {post.excerpt && (
              <p className="text-lg text-muted-foreground font-body italic mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}
            <div className="prose prose-lg max-w-none">
              {post.content.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="text-foreground/90 font-body leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetail;
