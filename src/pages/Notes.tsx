import Layout from "@/components/Layout";
import { FileText, Download, ExternalLink, Loader2, GraduationCap, BookOpen, Layers, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

interface SheetNote {
  No: string;
  Board: string;
  class: string;
  subject: string;
  link: string;
  title: string;
  description: string;
  date: string;
}

const stepIcons = [GraduationCap, Layers, BookOpen];

const Notes = () => {
  const [data, setData] = useState<SheetNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({ 0: true, 1: true, 2: true });
  const SHEET_ID = "1Rc256_GwlXuG4mh3zPwOalh6nacQZHAOPmCEynnVM20";
  const API_KEY = "AIzaSyC1UAGjqkukOzZz1h2ShohCp62StRLc38s";
  // useEffect(() => {
  //   fetch("https://sheetdb.io/api/v1/ejfnoiaiksv4p")
  //     .then((res) => res.json())
  //     .then((d: SheetNote[]) => { setData(d); setLoading(false); })
  //     .catch(() => setLoading(false));
  // }, []);
  useEffect(() => {
  fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:Z1000?key=${API_KEY}`)
    .then((res) => res.json())
    .then((d) => {
      const [headers, ...rows] = d.values;

      const parsed: SheetNote[] = rows.map((row: string[]) => ({
        No:          row[0] ?? "",
        Board:       row[1] ?? "",
        class:       row[2] ?? "",
        subject:     row[3] ?? "",
        link:        row[4] ?? "",
        title:       row[5] ?? "",
        description: row[6] ?? "",
        date:        row[7] ?? "",
      }));

      setData(parsed);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);

  const boards = useMemo(() => [...new Set(data.map((d) => d.Board))], [data]);
  // const classes = useMemo(
  //   () => selectedBoard ? [...new Set(data.filter((d) => d.Board === selectedBoard).map((d) => d.class))] : [],
  //   [data, selectedBoard]
  // );
  const classes = useMemo(() => {
  if (!selectedBoard) return [];

  return [...new Set(
    data
      .filter((d) => d?.Board === selectedBoard)
      .map((d) => d?.class?.toString().trim())
      .filter(Boolean)
  )].sort((a, b) => {
    // try numeric sort if possible
    const numA = parseInt(a);
    const numB = parseInt(b);

    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }

    // fallback string sort
    return a.localeCompare(b);
  });
}, [data, selectedBoard]);
  const subjects = useMemo(
    () => selectedBoard && selectedClass
      ? [...new Set(data.filter((d) => d.Board === selectedBoard && d.class === selectedClass).map((d) => d.subject))]
      : [],
    [data, selectedBoard, selectedClass]
  );
  const filteredNotes = useMemo(
    () => selectedBoard && selectedClass && selectedSubject
      ? data.filter((d) => d.Board === selectedBoard && d.class === selectedClass && d.subject === selectedSubject)
      : [],
    [data, selectedBoard, selectedClass, selectedSubject]
  );

  const handleBoardChange = (val: string) => {
    setSelectedBoard(val);
    setSelectedClass("");
    setSelectedSubject("");
    setExpandedSteps({ 0: false, 1: true, 2: true });
  };
  const handleClassChange = (val: string) => {
    setSelectedClass(val);
    setSelectedSubject("");
    setExpandedSteps((prev) => ({ ...prev, 1: false, 2: true }));
  };
  const handleSubjectChange = (val: string) => {
    setSelectedSubject(val);
    setExpandedSteps((prev) => ({ ...prev, 2: false }));
  };

  const toggleStep = (step: number) => {
    setExpandedSteps((prev) => ({ ...prev, [step]: !prev[step] }));
  };

  const currentStep = !selectedBoard ? 0 : !selectedClass ? 1 : !selectedSubject ? 2 : 3;

  const getDownloadLink = (url: string) => {
  if (url.includes("drive.google.com")) {
    const fileIdMatch = url.match(/\/d\/(.*?)\//);
    const fileId = fileIdMatch?.[1];
    if (fileId) {
      return `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
  }
  return url;
};

  if (loading) {
    return (
      <Layout>
        <section className="page-section flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </section>
      </Layout>
    );
  }

  const renderStepHeader = (
    step: number,
    label: string,
    subtitle: string,
    selectedValue: string,
    isExpanded: boolean
  ) => {
    const Icon = stepIcons[step];
    const isDone = !!selectedValue;

    return (
      <button
        onClick={() => toggleStep(step)}
        className="w-full flex items-center justify-between gap-3 text-left"
      >
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all shrink-0",
            isDone ? "bg-accent border-accent text-accent-foreground" : "border-accent/40 bg-accent/10 text-accent"
          )}>
            {isDone ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
          </div>
          <div>
            <h3 className="font-heading font-semibold text-base text-foreground">{label}</h3>
            {isDone && !isExpanded ? (
              <p className="text-sm font-body text-accent font-semibold">{selectedValue}</p>
            ) : (
              <p className="text-sm font-body text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>
        {isDone && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-body font-semibold text-accent/70 hidden sm:inline">
              {isExpanded ? "Collapse" : "Change"}
            </span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        )}
      </button>
    );
  };

  const chipClass = (isSelected: boolean) =>
    cn(
      "relative px-6 py-3.5 rounded-xl font-body font-bold text-sm border-2 transition-all duration-200 min-w-[100px] text-center",
      isSelected
        ? "bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/20 ring-2 ring-accent/30 ring-offset-2 ring-offset-background"
        : "bg-secondary/50 text-foreground border-border hover:border-accent/60 hover:bg-secondary hover:shadow-md"
    );

  return (
    <Layout>
      <section className="page-section">
        <div className="container mx-auto">
          <div className="mb-10">
            <span className="text-accent font-body font-semibold text-sm tracking-widest uppercase">Resources</span>
            <h1 className="section-title mt-2">Notes</h1>
            <p className="section-subtitle">Follow the steps below to find your notes.</p>
          </div>

          {/* Step Progress */}
          <div className="flex items-center gap-0 mb-10 max-w-md mx-auto">
            {["Board", "Class", "Subject"].map((label, i) => {
              const Icon = stepIcons[i];
              const done = currentStep > i;
              const active = currentStep === i;
              return (
                <div key={label} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                      done ? "bg-accent border-accent text-accent-foreground" :
                      active ? "border-accent bg-accent/10 text-accent" :
                      "border-border bg-card text-muted-foreground"
                    )}>
                      {done ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <span className={cn("text-xs font-body font-semibold", done || active ? "text-accent" : "text-muted-foreground")}>{label}</span>
                  </div>
                  {i < 2 && <div className={cn("flex-1 h-0.5 mx-2 mt-[-16px] rounded-full transition-colors", currentStep > i ? "bg-accent" : "bg-border")} />}
                </div>
              );
            })}
          </div>

          {/* Step 1: Board */}
          <div className="mb-4 bg-card border border-border rounded-2xl p-5 md:p-6 transition-all">
            {renderStepHeader(0, "Please Select Your Board", "Choose your education board to get started", selectedBoard, expandedSteps[0])}
            {(expandedSteps[0] || !selectedBoard) && (
              <div className="mt-5 pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {boards.map((board) => (
                  <button key={board} onClick={() => handleBoardChange(board)} className={chipClass(selectedBoard === board)}>
                    {selectedBoard === board && <CheckCircle2 className="absolute top-1.5 right-1.5 h-3.5 w-3.5 text-accent-foreground/80" />}
                    {board}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Step 2: Class */}
          {selectedBoard && classes.length > 0 && (
            <div className="mb-4 bg-card border border-border rounded-2xl p-5 md:p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {renderStepHeader(1, "Please Select Your Class", `Classes for ${selectedBoard} board`, selectedClass, expandedSteps[1])}
              {(expandedSteps[1] || !selectedClass) && (
                <div className="mt-5 pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {classes.map((cls) => (
                    <button key={cls} onClick={() => handleClassChange(cls)} className={chipClass(selectedClass === cls)}>
                      {selectedClass === cls && <CheckCircle2 className="absolute top-1.5 right-1.5 h-3.5 w-3.5 text-accent-foreground/80" />}
                      {cls}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Subject */}
          {selectedClass && subjects.length > 0 && (
            <div className="mb-4 bg-card border border-border rounded-2xl p-5 md:p-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {renderStepHeader(2, "Please Select Your Subject", `Subjects for ${selectedClass} — ${selectedBoard}`, selectedSubject, expandedSteps[2])}
              {(expandedSteps[2] || !selectedSubject) && (
                <div className="mt-5 pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {subjects.map((sub) => (
                    <button key={sub} onClick={() => handleSubjectChange(sub)} className={chipClass(selectedSubject === sub)}>
                      {selectedSubject === sub && <CheckCircle2 className="absolute top-1.5 right-1.5 h-3.5 w-3.5 text-accent-foreground/80" />}
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Notes Cards */}
          {filteredNotes.length > 0 && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="h-5 w-5 text-accent" />
                <h3 className="font-heading font-semibold text-lg text-foreground">
                  Note{filteredNotes?.length !== 1 && "s"} 
                  {/* {filteredNotes.length}  Found */}
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {filteredNotes?.map((note) => (
                  // <div key={note.No} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300">
                  //   <div className="flex items-start gap-4">
                  //     <div className="bg-accent/10 p-3 rounded-xl shrink-0">
                  //       <FileText className="h-6 w-6 text-accent" />
                  //     </div>
                  //     <div className="flex-1 min-w-0">
                  //       <span className="text-xs font-body font-semibold text-accent uppercase tracking-wider">{note.subject}</span>
                  //       <h3 className="font-heading font-semibold text-lg text-foreground mt-1 leading-snug">{note.title}</h3>
                  //       <p className="text-muted-foreground font-body text-sm mt-2 leading-relaxed line-clamp-2">{note.description}</p>
                  //       <div className="flex items-center justify-between mt-5 pt-4 border-t border-border">
                  //         <span className="text-xs text-muted-foreground font-body">{note.date}</span>
                  //         <div className="flex items-center gap-2">
                  //           {note.link && (
                  //             <>
                  //               <a href={note.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-body font-semibold bg-accent/10 text-accent hover:bg-accent/20 transition-colors">
                  //                 <ExternalLink className="h-3.5 w-3.5" /> View
                  //               </a>
                  //               <a href={note.link} download className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-body font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  //                 <Download className="h-3.5 w-3.5" /> Download
                  //               </a>
                  //             </>
                  //           )}
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div>
                  <div
  key={note.No}
  className="bg-card border border-border rounded-2xl p-4 sm:p-6 hover:shadow-lg hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-300"
>
  <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
    
    {/* Icon */}
    <div className="bg-accent/10 p-2.5 sm:p-3 rounded-xl shrink-0">
      <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
    </div>

    {/* Content */}
    <div className="flex-1 min-w-0 w-full">
      <span className="text-[10px] sm:text-xs font-semibold text-accent uppercase tracking-wider">
        {note.subject}
      </span>

      <h3 className="font-semibold text-base sm:text-lg text-foreground mt-1 leading-snug">
        {note.title}
      </h3>

      <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2">
        {note.description}
      </p>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 pt-3 border-t border-border gap-3">
        
        <span className="text-xs text-muted-foreground">
          {note.date}
        </span>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {note.link && (
            <>
              <a
                href={note.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto justify-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" /> View
              </a>

              <a
                // href={note.link}
                href={getDownloadLink(note.link)}
                download
                className="w-full sm:w-auto justify-center inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Download className="h-3.5 w-3.5" /> Download
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Notes;
