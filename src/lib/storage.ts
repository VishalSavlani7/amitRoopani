import { NoteItem, WorksheetItem, VideoItem } from "./mockData";

const STORAGE_KEY = "professor_content";

interface StoredContent {
  notes: NoteItem[];
  worksheets: WorksheetItem[];
  videos: VideoItem[];
}

const getAll = (): StoredContent => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { notes: [], worksheets: [], videos: [] };
};

const persist = (db: StoredContent) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

export const saveContent = (type: keyof StoredContent, item: NoteItem | WorksheetItem | VideoItem) => {
  const db = getAll();
  (db[type] as any[]) = [item, ...db[type]];
  persist(db);
};

export const updateContent = (type: keyof StoredContent, id: string, updated: Partial<NoteItem & WorksheetItem & VideoItem>) => {
  const db = getAll();
  (db[type] as any[]) = (db[type] as any[]).map((item: any) =>
    item.id === id ? { ...item, ...updated } : item
  );
  persist(db);
};

export const deleteContent = (type: keyof StoredContent, id: string) => {
  const db = getAll();
  (db[type] as any[]) = (db[type] as any[]).filter((item: any) => item.id !== id);
  persist(db);
};

export const loadNotes = (): NoteItem[] => getAll().notes;
export const loadWorksheets = (): WorksheetItem[] => getAll().worksheets;
export const loadVideos = (): VideoItem[] => getAll().videos;
