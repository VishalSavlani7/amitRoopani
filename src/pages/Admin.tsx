import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { FileText, BookOpen, Video, Upload, Pencil, Trash2, X } from "lucide-react";
import { saveContent, updateContent, deleteContent, loadNotes, loadWorksheets, loadVideos } from "@/lib/storage";
import { mockNotes, mockWorksheets, mockVideos, NoteItem, WorksheetItem, VideoItem } from "@/lib/mockData";

type Tab = "notes" | "worksheets" | "videos";
type AnyItem = NoteItem | WorksheetItem | VideoItem;

const tabs: { key: Tab; label: string; icon: typeof FileText }[] = [
  { key: "notes", label: "Notes", icon: FileText },
  { key: "worksheets", label: "Worksheets", icon: BookOpen },
  { key: "videos", label: "Videos", icon: Video },
];

const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("notes");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isMock, setIsMock] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const uploadedNotes = loadNotes();
  const uploadedWorksheets = loadWorksheets();
  const uploadedVideos = loadVideos();

  const allNotes = [...uploadedNotes, ...mockNotes];
  const allWorksheets = [...uploadedWorksheets, ...mockWorksheets];
  const allVideos = [...uploadedVideos, ...mockVideos];

  const currentItems: AnyItem[] =
    activeTab === "notes" ? allNotes : activeTab === "worksheets" ? allWorksheets : allVideos;

  const isMockItem = (id: string) => {
    if (activeTab === "notes") return mockNotes.some((n) => n.id === id);
    if (activeTab === "worksheets") return mockWorksheets.some((w) => w.id === id);
    return mockVideos.some((v) => v.id === id);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setSubject("");
    setFile(null);
    setThumbnail(null);
    setEditingId(null);
    setIsMock(false);
  };

  const startEdit = (item: AnyItem) => {
    setTitle(item.title);
    setDescription(item.description);
    setSubject("subject" in item ? (item as NoteItem).subject : "");
    setEditingId(item.id);
    setIsMock(isMockItem(item.id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    if (isMockItem(id)) {
      toast({ title: "Cannot delete", description: "Default sample items cannot be deleted.", variant: "destructive" });
      return;
    }
    deleteContent(activeTab, id);
    setRefreshKey((k) => k + 1);
    toast({ title: "Deleted", description: "Item has been removed." });
    if (editingId === id) resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      if (isMock) {
        toast({ title: "Cannot edit", description: "Default sample items cannot be edited.", variant: "destructive" });
        return;
      }
      const updated: any = { title, description };
      if (activeTab !== "videos") updated.subject = subject;
      updateContent(activeTab, editingId, updated);
      toast({ title: "Updated!", description: `"${title}" has been updated.` });
    } else {
      const id = Date.now().toString();
      const date = new Date().toISOString().split("T")[0];

      if (activeTab === "notes") {
        const pdfUrl = file ? URL.createObjectURL(file) : undefined;
        saveContent("notes", { id, title, description, subject, date, pdfUrl });
      } else if (activeTab === "worksheets") {
        const pdfUrl = file ? URL.createObjectURL(file) : undefined;
        saveContent("worksheets", { id, title, description, subject, date, pdfUrl });
      } else {
        const thumbUrl = thumbnail
          ? URL.createObjectURL(thumbnail)
          : "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=340&fit=crop";
        saveContent("videos", { id, title, description, thumbnail: thumbUrl, date });
      }
      toast({
        title: "Upload Successful!",
        description: `Your ${activeTab === "notes" ? "note" : activeTab === "worksheets" ? "worksheet" : "video"} "${title}" has been uploaded.`,
      });
    }

    resetForm();
    setRefreshKey((k) => k + 1);
  };

  return (
    <Layout>
      <section className="page-section">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-10">
            <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Dashboard</span>
            <h1 className="section-title mt-2">Admin Panel</h1>
            <p className="section-subtitle">Upload, edit, and manage your educational content.</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); resetForm(); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-sm font-body text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-5 mb-10">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-semibold text-lg text-foreground">
                {editingId ? `Editing: ${title || "..."}` : `Add New ${activeTab === "notes" ? "Note" : activeTab === "worksheets" ? "Worksheet" : "Video"}`}
              </h2>
              {editingId && (
                <button type="button" onClick={resetForm} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <div>
              <label className="text-sm font-body font-semibold text-foreground block mb-1.5">Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Enter ${activeTab === "videos" ? "video" : activeTab === "notes" ? "note" : "worksheet"} title`}
                className="w-full px-4 py-2.5 rounded-sm bg-background border border-input text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="text-sm font-body font-semibold text-foreground block mb-1.5">Description</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide a brief description"
                className="w-full px-4 py-2.5 rounded-sm bg-background border border-input text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            {activeTab !== "videos" && (
              <div>
                <label className="text-sm font-body font-semibold text-foreground block mb-1.5">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Physics, Mathematics"
                  className="w-full px-4 py-2.5 rounded-sm bg-background border border-input text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            )}

            {!editingId && (
              activeTab !== "videos" ? (
                <div>
                  <label className="text-sm font-body font-semibold text-foreground block mb-1.5">Upload PDF</label>
                  <label className="flex items-center justify-center gap-2 w-full px-4 py-8 rounded-sm bg-background border-2 border-dashed border-input text-muted-foreground font-body text-sm cursor-pointer hover:border-accent transition-colors">
                    <Upload className="h-5 w-5" />
                    {file ? file.name : "Click to select PDF file"}
                    <input type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                  </label>
                </div>
              ) : (
                <div>
                  <label className="text-sm font-body font-semibold text-foreground block mb-1.5">Video Thumbnail</label>
                  <label className="flex items-center justify-center gap-2 w-full px-4 py-8 rounded-sm bg-background border-2 border-dashed border-input text-muted-foreground font-body text-sm cursor-pointer hover:border-accent transition-colors">
                    <Upload className="h-5 w-5" />
                    {thumbnail ? thumbnail.name : "Click to select thumbnail image"}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => setThumbnail(e.target.files?.[0] || null)} />
                  </label>
                </div>
              )
            )}

            <button
              type="submit"
              className="w-full bg-accent text-accent-foreground py-3 rounded-sm font-body font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              {editingId ? "Save Changes" : `Upload ${activeTab === "notes" ? "Note" : activeTab === "worksheets" ? "Worksheet" : "Video"}`}
            </button>
          </form>

          {/* Existing Items List */}
          <div>
            <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
              Existing {activeTab === "notes" ? "Notes" : activeTab === "worksheets" ? "Worksheets" : "Videos"} ({currentItems.length})
            </h2>
            <div className="space-y-3" key={refreshKey}>
              {currentItems.map((item) => {
                const mock = isMockItem(item.id);
                return (
                  <div
                    key={item.id}
                    className={`flex items-center gap-4 bg-card border rounded-lg p-4 transition-all ${
                      editingId === item.id ? "border-accent shadow-md" : "border-border hover:border-accent/30"
                    }`}
                  >
                    <div className="bg-secondary p-2.5 rounded-lg">
                      {activeTab === "notes" ? <FileText className="h-5 w-5 text-accent" /> :
                       activeTab === "worksheets" ? <BookOpen className="h-5 w-5 text-accent" /> :
                       <Video className="h-5 w-5 text-accent" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-semibold text-foreground truncate">{item.title}</h3>
                        {mock && (
                          <span className="text-[10px] font-body font-semibold bg-muted text-muted-foreground px-2 py-0.5 rounded-full shrink-0">
                            SAMPLE
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground font-body text-sm truncate">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => startEdit(item)}
                        disabled={mock}
                        className={`p-2 rounded-sm transition-colors ${
                          mock ? "text-muted-foreground/40 cursor-not-allowed" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                        title={mock ? "Cannot edit sample items" : "Edit"}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={mock}
                        className={`p-2 rounded-sm transition-colors ${
                          mock ? "text-muted-foreground/40 cursor-not-allowed" : "text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                        }`}
                        title={mock ? "Cannot delete sample items" : "Delete"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
              {currentItems.length === 0 && (
                <p className="text-muted-foreground font-body text-center py-8">No items yet. Upload one above.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
