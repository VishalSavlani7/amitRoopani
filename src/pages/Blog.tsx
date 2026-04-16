// import React from "react";
// import Layout from "@/components/Layout";
// import { mockBlogPosts, mockVideos } from "@/lib/mockData";
// // import { loadVideos } from "@/lib/storage";
// // import { Play, ChevronLeft, ChevronRight } from "lucide-react";
// // import { useState, useEffect } from "react";

// const Blog = () => {
//   // const [allVideos, setAllVideos] = useState(mockVideos);
//   // const [videoIndex, setVideoIndex] = useState(0);

//   // useEffect(() => {
//   //   const uploaded = loadVideos();
//   //   setAllVideos([...uploaded, ...mockVideos]);
//   // }, []);

//   // const nextVideo = () => setVideoIndex((i) => (i + 1) % allVideos.length);
//   // const prevVideo = () => setVideoIndex((i) => (i - 1 + allVideos.length) % allVideos.length);

//   // // Show 3 videos at a time on desktop
//   // const visibleVideos = allVideos.length <= 3
//   //   ? allVideos
//   //   : [
//   //       allVideos[videoIndex % allVideos.length],
//   //       allVideos[(videoIndex + 1) % allVideos.length],
//   //       allVideos[(videoIndex + 2) % allVideos.length],
//   //     ];

//   return (
//     <Layout>
//       <section className="page-section">
//         <div className="container mx-auto">
//           {/* Videos with slider */}
//           {/* <div className="mb-16">
//             <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Watch & Learn</span>
//             <h1 className="section-title mt-2">Video Lectures</h1>
//             <p className="section-subtitle">Engage with visual content at your own pace.</p>

//             <div className="relative mt-10">
//               {allVideos.length > 3 && (
//                 <>
//                   <button
//                     onClick={prevVideo}
//                     className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:bg-accent transition-colors"
//                   >
//                     <ChevronLeft className="h-5 w-5" />
//                   </button>
//                   <button
//                     onClick={nextVideo}
//                     className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-primary text-primary-foreground rounded-full p-2 shadow-lg hover:bg-accent transition-colors"
//                   >
//                     <ChevronRight className="h-5 w-5" />
//                   </button>
//                 </>
//               )}
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {visibleVideos.map((v) => (
//                   <div key={v.id + v.title} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-accent/40 transition-all group">
//                     <div className="relative">
//                       <img src={v.thumbnail} alt={v.title} className="w-full h-48 object-cover" loading="lazy" />
//                       <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                         <div className="bg-accent rounded-full p-3">
//                           <Play className="h-6 w-6 text-accent-foreground" />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="p-5">
//                       <h3 className="font-heading font-semibold text-foreground">{v.title}</h3>
//                       <p className="text-muted-foreground font-body text-sm mt-2">{v.description}</p>
//                       <span className="text-xs text-muted-foreground font-body mt-3 block">{v.date}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div> */}

//           {/* Blog Posts */}
//           <div>
//             <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Insights</span>
//             <h2 className="section-title mt-2">Blog</h2>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
//               {mockBlogPosts.map((post) => (
//                 <div key={post.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-accent/40 transition-all">
//                   <span className="text-xs font-body font-semibold text-accent uppercase tracking-wider">{post.category}</span>
//                   <h3 className="font-heading font-semibold text-lg text-foreground mt-2">{post.title}</h3>
//                   <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed">{post.excerpt}</p>
//                   <span className="text-xs text-muted-foreground font-body mt-4 block">{post.date}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Blog;
import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const SHEET_ID = "1JHA_6JcK302fOUc4hVj2qAxHU3dglmoWVtvtKcqFlp8";
  const API_KEY = "AIzaSyC1UAGjqkukOzZz1h2ShohCp62StRLc38s";

  // useEffect(() => {
  //   // fetch("https://sheetdb.io/api/v1/whyc6couc4f6w")
  //   fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:Z1000?key=${API_KEY}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // Convert sheet data into UI format
  //       const formatted = data.map((item, index) => ({
  //         id: item.id || index,
  //         category: item.category || "General",
  //         title: item.title || "No Title",
  //         excerpt: item.content || "",
  //         date: item.date || "No date",
  //       }));

  //       setPosts(formatted);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching data:", err);
  //       setLoading(false);
  //     });
  // }, []);
  useEffect(() => {
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:Z1000?key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      const [headers, ...rows] = data.values; // ← extract headers and rows

      const formatted = rows.map((row: string[]) => ({
        id:       row[0] || "",
        category: row[1] || "General",
        title:    row[2] || "No Title",
        excerpt:  row[3] || "",
        date:     row[4] || "No date",
      }));

      setPosts(formatted);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      setLoading(false);
    });
}, []);

  return (
    <Layout>
      <section className="page-section">
        <div className="container mx-auto">
          <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">
            Insights
          </span>

          <h2 className="section-title mt-2">Blog</h2>

          {/* Loading State */}
          {loading ? (
              <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {posts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => navigate(`/blog/${post.id}`, { state: post })}
                  className="cursor-pointer bg-card border border-border rounded-lg p-6 hover:shadow-md hover:border-accent/40 transition-all"
                >
                  {/* Category */}
                  <span className="text-xs font-body font-semibold text-accent uppercase tracking-wider">
                    {post.category}
                  </span>

                  {/* Title (clickable if it's a link) */}
                  <h3 className="font-heading font-semibold text-lg text-foreground mt-2 break-words">
                    {/* <a
                      href={post.title}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    > */}
                      {post.title}
                    {/* </a> */}
                  </h3>

                  {/* Content */}
                  <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Date */}
                  {/* <span className="text-xs text-muted-foreground font-body mt-4 block">
                    {post.date}
                  </span> */}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground font-body">{post.date}</span>
                    <span className="inline-flex items-center gap-1 text-sm font-body font-semibold text-primary group-hover:text-accent transition-colors">
                      Read More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;

