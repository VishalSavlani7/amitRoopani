// import Layout from "@/components/Layout";
// import { mockBlogPosts, mockVideos } from "@/lib/mockData";
// import { loadVideos } from "@/lib/storage";
// import { Play, ChevronLeft, ChevronRight } from "lucide-react";
// import { useState, useEffect } from "react";

// const Blog = () => {
//   const [allVideos, setAllVideos] = useState(mockVideos);
//   const [videoIndex, setVideoIndex] = useState(0);

//   useEffect(() => {
//     const uploaded = loadVideos();
//     setAllVideos([...uploaded, ...mockVideos]);
//   }, []);

//   const nextVideo = () => setVideoIndex((i) => (i + 1) % allVideos.length);
//   const prevVideo = () => setVideoIndex((i) => (i - 1 + allVideos.length) % allVideos.length);

//   // Show 3 videos at a time on desktop
//   const visibleVideos = allVideos.length <= 3
//     ? allVideos
//     : [
//         allVideos[videoIndex % allVideos.length],
//         allVideos[(videoIndex + 1) % allVideos.length],
//         allVideos[(videoIndex + 2) % allVideos.length],
//       ];

//   return (
//     <Layout>
//       <section className="page-section">
//         <div className="container mx-auto">
//           {/* Videos with slider */}
//           <div className="mb-16">
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
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default Blog;
import Layout from "@/components/Layout";
import { Loader2, Play, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

interface VideoData {
  id: string;
  link: string;
  title: string;
  description: string;
  date: string;
}

// const SHEETDB_URL = "https://sheetdb.io/api/v1/7v0tjedy9o3rf";

const getYoutubeThumbnail = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&]+)/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : "";
};

const getYoutubeEmbedUrl = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^?&]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
};

const Videos = () => {
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const SHEET_ID = "1vYamlOOoncROf3iJ2x_VCOmWapWYe4qSFF_MgbcTeU4";
  const API_KEY = "AIzaSyC1UAGjqkukOzZz1h2ShohCp62StRLc38s";

  // useEffect(() => {
  //   fetch(SHEETDB_URL)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const items: VideoData[] = data.map((item: any) => ({
  //         id: String(item.id),
  //         link: item.link,
  //         title: item.title,
  //         description: item.description || "",
  //         date: item.date || "",
  //       }));
  //       setVideos(items);
  //       setLoading(false);
  //     })
  //     .catch(() => setLoading(false));
  // }, []);
  useEffect(() => {
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:Z1000?key=${API_KEY}`)
    .then((res) => res.json())
    .then((d) => {
      const [headers, ...rows] = d.values;

      const items: VideoData[] = rows.map((row: string[]) => ({
        id:          row[0] ?? "",
        link:        row[1] ?? "",
        title:       row[2] ?? "",
        description: row[3] ?? "",
        date:        row[4] ?? "",
      }));

      setVideos(items);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);

  return (
    <Layout>
      <section className="page-section">
        <div className="container mx-auto">
          <div className="text-start mb-12">
            <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">
              Watch & Learn
            </span>
            <h1 className="section-title mt-2">Video Lectures</h1>
            {/* <p className="text-start section-subtitle max-w-2xl mx-auto">
              Engage with visual content at your own pace. Click any video to start watching.
            </p> */}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-accent" />
            </div>
          ) : videos.length === 0 ? (
            <p className="text-muted-foreground font-body text-center py-20">
              No videos found.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => {
                const isActive = activeVideo === video.id;
                return (
                  <div
                    key={video.id}
                    className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-accent/40 transition-all group"
                  >
                    <div className="relative aspect-video">
                      {isActive ? (
                        <iframe
                          src={`${getYoutubeEmbedUrl(video.link)}?autoplay=1`}
                          title={video.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <button
                          onClick={() => setActiveVideo(video.id)}
                          className="w-full h-full relative cursor-pointer"
                        >
                          <img
                            src={getYoutubeThumbnail(video.link)}
                            alt={video.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center group-hover:bg-foreground/30 transition-colors">
                            <div className="bg-accent rounded-full p-4 shadow-lg group-hover:scale-110 transition-transform">
                              <Play className="h-6 w-6 text-accent-foreground fill-accent-foreground" />
                            </div>
                          </div>
                        </button>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-heading font-semibold text-foreground line-clamp-2">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="text-muted-foreground font-body text-sm mt-2 line-clamp-2 leading-relaxed">
                          {video.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-4">
                        {video.date && (
                          <span className="text-xs text-muted-foreground font-body">
                            {video.date}
                          </span>
                        )}
                        <a
                          href={video.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-body font-semibold text-primary hover:text-accent transition-colors"
                        >
                          YouTube <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Videos;
