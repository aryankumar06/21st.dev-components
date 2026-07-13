npx shadcn@latest add https://21st.dev/r/aryankumar06/job-application-tracker-notion-style
import { Component } from "@/components/ui/job-application-tracker-notion-style";

export default function DemoOne() {
  return <Component />;
}

import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Stage = "to-apply" | "applied" | "offer";
type SortField = "company" | "role" | "stage" | "none";
type SortDir = "asc" | "desc";

interface Application {
  id: number;
  company: string;
  role: string;
  link: string;
  stage: Stage;
  icon: string;
  iconBg: string;
  iconColor: string;
  notes: string;
  priority: "low" | "medium" | "high";
}

interface ActionItem {
  id: number;
  text: string;
  done: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const INITIAL_APPS: Application[] = [
  { id: 1, company: "Stripe", role: "Product Designer", link: "lever.co/stripe", stage: "to-apply", icon: "≡", iconBg: "#635bff", iconColor: "#fff", notes: "Referral from John", priority: "high" },
  { id: 2, company: "Slack", role: "Product Designer", link: "lever.co/slack", stage: "to-apply", icon: "💬", iconBg: "#4a154b", iconColor: "#fff", notes: "", priority: "medium" },
  { id: 3, company: "Figma", role: "UX Designer", link: "lever.co/figma", stage: "applied", icon: "✏", iconBg: "#1e1e1e", iconColor: "#a259ff", notes: "Applied via website", priority: "high" },
  { id: 4, company: "Notion Labs", role: "Creative Designer", link: "lever.co/notion", stage: "offer", icon: "N", iconBg: "#fff", iconColor: "#1a1a1a", notes: "Offer deadline: Feb 28", priority: "high" },
  { id: 5, company: "Company Name", role: "Designer", link: "", stage: "offer", icon: "🏠", iconBg: "#e5e5e5", iconColor: "#555", notes: "", priority: "low" },
];

const INITIAL_ACTIONS: ActionItem[] = [
  { id: 1, text: "Update LinkedIn profile", done: true },
  { id: 2, text: "Refine portfolio to be more UX oriented", done: true },
  { id: 3, text: "Prepare for upcoming interviews", done: false },
  { id: 4, text: "Send follow-up emails to recruiters", done: false },
];

const STAGES: {
  key: Stage; label: string; dot: string;
  badgeBg: string; badgeColor: string;
  darkColBg: string; lightColBg: string;
}[] = [
  { key: "to-apply", label: "To apply", dot: "#888", badgeBg: "rgba(255,255,255,0.06)", badgeColor: "#aaa", darkColBg: "rgba(255,255,255,0.03)", lightColBg: "#f0f0f0" },
  { key: "applied", label: "Applied", dot: "#f5a623", badgeBg: "rgba(245,166,35,0.12)", badgeColor: "#f5a623", darkColBg: "rgba(245,166,35,0.05)", lightColBg: "#fff8e6" },
  { key: "offer", label: "Offer", dot: "#4caf7d", badgeBg: "rgba(76,175,125,0.12)", badgeColor: "#4caf7d", darkColBg: "rgba(76,175,125,0.05)", lightColBg: "#eaf7f0" },
];

const PRIORITY_COLOR: Record<string, string> = { high: "#ef4444", medium: "#f5a623", low: "#4caf7d" };
const COMPANY_ICONS = ["🏢", "🚀", "💡", "🎯", "⚡", "🌟", "🔥", "💎"];

// ─── Icons ────────────────────────────────────────────────────────────────────

const Icon = ({ d, size = 14 }: { d: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const CheckIcon = ({ color = "white" }: { color?: string }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useClickOutside(ref: React.RefObject<HTMLElement>, cb: () => void) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, cb]);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const Modal = ({ children, onClose, t }: { children: React.ReactNode; onClose: () => void; t: any }) => (
  <div
    onClick={onClose}
    style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000, padding: 16,
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: t.surface, borderRadius: 12, width: "100%", maxWidth: 480,
        border: `1px solid ${t.border}`, boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
        maxHeight: "90vh", overflowY: "auto",
      }}
    >
      {children}
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export const Component = () => {
  const [apps, setApps] = useState<Application[]>(INITIAL_APPS);
  const [actions, setActions] = useState<ActionItem[]>(INITIAL_ACTIONS);
  const [activeTab, setActiveTab] = useState<"grouped" | "all">("grouped");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [addingToStage, setAddingToStage] = useState<Stage | null>(null);
  const [newAppName, setNewAppName] = useState("");
  const [newAppRole, setNewAppRole] = useState("");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [editApp, setEditApp] = useState<Application | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [sortField, setSortField] = useState<SortField>("none");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [filterStage, setFilterStage] = useState<Stage | "all">("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showNewDropdown, setShowNewDropdown] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [newActionText, setNewActionText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [resumeFile, setResumeFile] = useState<string | null>(null);
  const [dragId, setDragId] = useState<number | null>(null);
  const [dragOverStage, setDragOverStage] = useState<Stage | null>(null);
  const [autoSort, setAutoSort] = useState(false);
  const [compactView, setCompactView] = useState(false);

  const sortMenuRef = useRef<HTMLDivElement>(null!);
  const filterMenuRef = useRef<HTMLDivElement>(null!);
  const newDropdownRef = useRef<HTMLDivElement>(null!);
  const searchRef = useRef<HTMLInputElement>(null!);

  useClickOutside(sortMenuRef, () => setShowSortMenu(false));
  useClickOutside(filterMenuRef, () => setShowFilterMenu(false));
  useClickOutside(newDropdownRef, () => setShowNewDropdown(false));

  const isDark = theme === "dark";

  const t = {
    bg: isDark ? "#1a1a1a" : "#f4f4f4",
    surface: isDark ? "#232323" : "#ffffff",
    surfaceAlt: isDark ? "#2a2a2a" : "#ececec",
    surfaceHover: isDark ? "#2e2e2e" : "#f0f0f0",
    border: isDark ? "#333" : "#ddd",
    text: isDark ? "#e8e8e8" : "#1a1a1a",
    muted: isDark ? "#777" : "#888",
    subtle: isDark ? "#444" : "#bbb",
    input: isDark ? "#1e1e1e" : "#fff",
  };

  // ── Computed ─────────────────────────────────────────────────────────────

  const filteredApps = apps
    .filter((a) => {
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q);
      const matchStage = filterStage === "all" || a.stage === filterStage;
      return matchSearch && matchStage;
    })
    .sort((a, b) => {
      if (sortField === "none") return 0;
      const va = a[sortField] as string;
      const vb = b[sortField] as string;
      return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    });

  const stageApps = (stage: Stage) => filteredApps.filter((a) => a.stage === stage);

  // ── Handlers ─────────────────────────────────────────────────────────────

  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));

  const toggleAction = (id: number) =>
    setActions((prev) => prev.map((a) => (a.id === id ? { ...a, done: !a.done } : a)));

  const deleteAction = (id: number) =>
    setActions((prev) => prev.filter((a) => a.id !== id));

  const addAction = () => {
    if (!newActionText.trim()) return;
    setActions((prev) => [...prev, { id: Date.now(), text: newActionText.trim(), done: false }]);
    setNewActionText("");
  };

  const addApp = (stage: Stage) => {
    if (!newAppName.trim()) return;
    const icons = COMPANY_ICONS;
    setApps((prev) => [
      ...prev,
      {
        id: Date.now(), company: newAppName.trim(),
        role: newAppRole.trim(), link: "", stage,
        icon: icons[Math.floor(Math.random() * icons.length)],
        iconBg: isDark ? "#333" : "#e5e5e5",
        iconColor: isDark ? "#ccc" : "#555",
        notes: "", priority: "medium",
      },
    ]);
    setNewAppName("");
    setNewAppRole("");
    setAddingToStage(null);
  };

  const deleteApp = (id: number) => {
    setApps((prev) => prev.filter((a) => a.id !== id));
    setSelectedApp(null);
  };

  const moveApp = (id: number, stage: Stage) => {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, stage } : a)));
  };

  const saveEdit = () => {
    if (!editApp) return;
    setApps((prev) => prev.map((a) => (a.id === editApp.id ? editApp : a)));
    setSelectedApp(editApp);
    setEditApp(null);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortField(field); setSortDir("asc"); }
    setShowSortMenu(false);
  };

  const clearSort = () => { setSortField("none"); setShowSortMenu(false); };

  // Drag-and-drop
  const onDragStart = (id: number) => setDragId(id);
  const onDragOver = (e: React.DragEvent, stage: Stage) => { e.preventDefault(); setDragOverStage(stage); };
  const onDrop = (stage: Stage) => {
    if (dragId !== null) moveApp(dragId, stage);
    setDragId(null);
    setDragOverStage(null);
  };

  // ── Styles helpers ────────────────────────────────────────────────────────

  const iconBtn = (active = false): React.CSSProperties => ({
    width: 30, height: 30, borderRadius: 6,
    display: "flex", alignItems: "center", justifyContent: "center",
    border: "none", cursor: "pointer", fontFamily: "inherit",
    background: active ? (isDark ? "#2e2e2e" : "#e0e0e0") : "transparent",
    color: active ? t.text : t.muted,
    transition: "background 0.15s, color 0.15s",
    position: "relative",
  });

  const inputStyle: React.CSSProperties = {
    background: t.input, border: `1px solid ${t.border}`,
    borderRadius: 6, padding: "7px 10px", fontSize: 13,
    color: t.text, fontFamily: "inherit", outline: "none", width: "100%",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 12, color: t.muted, marginBottom: 4, display: "block",
  };

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div
      className={cn("transition-colors duration-300")}
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: t.bg, color: t.text,
        minHeight: isExpanded ? "100vh" : undefined,
        padding: isExpanded ? "48px 24px 80px" : "48px 24px 80px",
      }}
    >
      <div style={{ maxWidth: isExpanded ? "100%" : 1060, margin: "0 auto", position: "relative" }}>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          style={{
            position: "absolute", top: 0, right: 0,
            background: t.surface, border: `1px solid ${t.border}`,
            borderRadius: 999, padding: "6px 14px",
            fontSize: 12, color: t.muted, cursor: "pointer",
            fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6,
          }}
        >
          {isDark ? "☀ Light" : "☾ Dark"}
        </button>

        {/* Title */}
        <h1 style={{ fontSize: "clamp(26px,5vw,42px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 44 }}>
          Job Application Tracker
        </h1>

        {/* ── Resume ──────────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>Resume</h2>
          <p style={{ fontSize: 13, color: t.muted, marginBottom: 14, display: "flex", alignItems: "center", gap: 5 }}>
            ↓ Upload your resume by clicking the block below and choosing a file from your computer
          </p>
          <label
            tabIndex={0}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              background: t.surfaceAlt, border: `1px solid ${t.border}`,
              borderRadius: 8, padding: "16px 20px",
              fontSize: 14, color: t.muted, cursor: "pointer",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = t.border)}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
            onBlur={(e) => (e.currentTarget.style.borderColor = t.border)}
            onKeyDown={(e) => {
              if (e.target !== e.currentTarget) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.currentTarget.querySelector("input")?.click();
              }
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <polyline points="9 15 12 12 15 15" />
            </svg>
            {resumeFile
              ? <span style={{ color: t.text, display: "flex", alignItems: "center", gap: 8 }}>
                  <span>📄</span> {resumeFile}
                  <button
                    onClick={(e) => { e.preventDefault(); setResumeFile(null); }}
                    style={{ background: "none", border: "none", cursor: "pointer", color: t.muted, padding: 2 }}
                    aria-label="Remove resume"
                    title="Remove resume"
                  >
                    <XIcon size={12} />
                  </button>
                </span>
              : "Upload or embed a file"
            }
            <input
              type="file"
              style={{ display: "none" }}
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  const allowedExtensions = [".pdf", ".doc", ".docx"];
                  const fileName = f.name;
                  const lastDotIndex = fileName.lastIndexOf(".");
                  const fileExtension = lastDotIndex !== -1 ? fileName.substring(lastDotIndex).toLowerCase() : "";

                  if (allowedExtensions.includes(fileExtension)) {
                    setResumeFile(fileName);
                  } else {
                    alert("Invalid file type. Please upload a .pdf, .doc, or .docx file.");
                    e.target.value = "";
                  }
                }
              }}
            />
          </label>
        </section>

        {/* ── Positions ───────────────────────────────────────────────────── */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>Positions to apply to</h2>
          <p style={{ fontSize: 13, color: t.muted, marginBottom: 16, display: "flex", alignItems: "center", gap: 5 }}>
            ↓ Move your applications along the status pipeline
          </p>

          {/* Toolbar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 6 }}>
              {(["grouped", "all"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "6px 14px", borderRadius: 7, fontSize: 13, fontFamily: "inherit",
                    fontWeight: activeTab === tab ? 600 : 400,
                    background: activeTab === tab ? t.surface : "transparent",
                    color: activeTab === tab ? t.text : t.muted,
                    border: `1px solid ${activeTab === tab ? t.border : "transparent"}`,
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  {tab === "grouped" ? "⊞ Grouped by stage" : "☰ All applications"}
                </button>
              ))}
            </div>

            {/* Toolbar icons */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>

              {/* Filter */}
              <div style={{ position: "relative" }} ref={filterMenuRef}>
                <button
                  title="Filter by stage"
                  onClick={() => setShowFilterMenu((v) => !v)}
                  style={iconBtn(filterStage !== "all" || showFilterMenu)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  {filterStage !== "all" && (
                    <span style={{ position: "absolute", top: 4, right: 4, width: 6, height: 6, borderRadius: "50%", background: "#3b82f6" }} />
                  )}
                </button>
                {showFilterMenu && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 6px)", right: 0,
                    background: t.surface, border: `1px solid ${t.border}`,
                    borderRadius: 8, padding: 6, zIndex: 100, minWidth: 140,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  }}>
                    <div style={{ fontSize: 11, color: t.muted, padding: "4px 8px 6px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Filter by stage
                    </div>
                    {(["all", "to-apply", "applied", "offer"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => { setFilterStage(s); setShowFilterMenu(false); }}
                        style={{
                          display: "flex", alignItems: "center", gap: 8, width: "100%",
                          padding: "7px 8px", borderRadius: 6, fontSize: 13,
                          background: filterStage === s ? (isDark ? "#2e2e2e" : "#ececec") : "transparent",
                          color: filterStage === s ? t.text : t.muted,
                          border: "none", cursor: "pointer", fontFamily: "inherit",
                        }}
                      >
                        {filterStage === s && <CheckIcon color={isDark ? "#e8e8e8" : "#1a1a1a"} />}
                        {s === "all" ? "All stages" : STAGES.find((x) => x.key === s)?.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort */}
              <div style={{ position: "relative" }} ref={sortMenuRef}>
                <button
                  title="Sort"
                  onClick={() => setShowSortMenu((v) => !v)}
                  style={iconBtn(sortField !== "none" || showSortMenu)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <polyline points="3 6 4 6" /><polyline points="3 12 4 12" /><polyline points="3 18 4 18" />
                  </svg>
                  {sortField !== "none" && (
                    <span style={{ position: "absolute", top: 4, right: 4, width: 6, height: 6, borderRadius: "50%", background: "#3b82f6" }} />
                  )}
                </button>
                {showSortMenu && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 6px)", right: 0,
                    background: t.surface, border: `1px solid ${t.border}`,
                    borderRadius: 8, padding: 6, zIndex: 100, minWidth: 150,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  }}>
                    <div style={{ fontSize: 11, color: t.muted, padding: "4px 8px 6px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Sort by
                    </div>
                    {([["company", "Company A–Z"], ["role", "Role"], ["stage", "Stage"]] as [SortField, string][]).map(([field, label]) => (
                      <button
                        key={field}
                        onClick={() => handleSort(field)}
                        style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
                          padding: "7px 8px", borderRadius: 6, fontSize: 13,
                          background: sortField === field ? (isDark ? "#2e2e2e" : "#ececec") : "transparent",
                          color: sortField === field ? t.text : t.muted,
                          border: "none", cursor: "pointer", fontFamily: "inherit",
                        }}
                      >
                        {label}
                        {sortField === field && <span style={{ fontSize: 10 }}>{sortDir === "asc" ? "↑" : "↓"}</span>}
                      </button>
                    ))}
                    {sortField !== "none" && (
                      <button
                        onClick={clearSort}
                        style={{
                          display: "flex", width: "100%", padding: "7px 8px", borderRadius: 6, fontSize: 13,
                          color: "#ef4444", background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit",
                          borderTop: `1px solid ${t.border}`, marginTop: 4,
                        }}
                      >
                        Clear sort
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Search */}
              <button
                title="Search"
                onClick={() => { setShowSearch((v) => !v); setTimeout(() => searchRef.current?.focus(), 50); }}
                style={iconBtn(showSearch)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              {/* Expand */}
              <button
                title={isExpanded ? "Collapse" : "Expand"}
                onClick={() => setIsExpanded((v) => !v)}
                style={iconBtn(isExpanded)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {isExpanded
                    ? <><polyline points="4 14 10 14 10 20" /><polyline points="20 10 14 10 14 4" /><line x1="10" y1="14" x2="3" y2="21" /><line x1="21" y1="3" x2="14" y2="10" /></>
                    : <><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></>
                  }
                </svg>
              </button>

              {/* Settings */}
              <button
                title="Settings"
                onClick={() => setShowSettings(true)}
                style={iconBtn(showSettings)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </button>

              {/* New button */}
              <div style={{ position: "relative", marginLeft: 4 }} ref={newDropdownRef}>
                <div style={{ display: "flex" }}>
                  <button
                    onClick={() => setAddingToStage("to-apply")}
                    style={{
                      background: "#3b82f6", color: "#fff", border: "none",
                      borderRadius: "8px 0 0 8px", padding: "7px 14px",
                      fontSize: 13, fontFamily: "inherit", fontWeight: 600, cursor: "pointer",
                    }}
                  >
                    + New
                  </button>
                  <button
                    onClick={() => setShowNewDropdown((v) => !v)}
                    style={{
                      background: "#3b82f6", color: "#fff", border: "none",
                      borderLeft: "1px solid rgba(255,255,255,0.25)",
                      borderRadius: "0 8px 8px 0", padding: "7px 8px",
                      cursor: "pointer",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>
                {showNewDropdown && (
                  <div style={{
                    position: "absolute", top: "calc(100% + 6px)", right: 0,
                    background: t.surface, border: `1px solid ${t.border}`,
                    borderRadius: 8, padding: 6, zIndex: 100, minWidth: 160,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                  }}>
                    <div style={{ fontSize: 11, color: t.muted, padding: "4px 8px 6px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Add to stage
                    </div>
                    {STAGES.map((s) => (
                      <button
                        key={s.key}
                        onClick={() => { setAddingToStage(s.key); setShowNewDropdown(false); }}
                        style={{
                          display: "flex", alignItems: "center", gap: 8, width: "100%",
                          padding: "7px 8px", borderRadius: 6, fontSize: 13,
                          background: "transparent", color: t.muted,
                          border: "none", cursor: "pointer", fontFamily: "inherit",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? "#2e2e2e" : "#ececec")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Search bar */}
          {showSearch && (
            <div style={{ marginBottom: 12, position: "relative" }}>
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={t.muted} strokeWidth="2"
                style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              >
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={searchRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search companies or roles…"
                style={{ ...inputStyle, paddingLeft: 32 }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: t.muted }}
                >
                  <XIcon size={13} />
                </button>
              )}
            </div>
          )}

          {/* Active filters badge */}
          {(filterStage !== "all" || sortField !== "none") && (
            <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
              {filterStage !== "all" && (
                <span style={{
                  background: isDark ? "#1e3a5f" : "#dbeafe", color: isDark ? "#93c5fd" : "#1d4ed8",
                  borderRadius: 999, padding: "3px 10px", fontSize: 12,
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  Stage: {STAGES.find((s) => s.key === filterStage)?.label}
                  <button onClick={() => setFilterStage("all")} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0, lineHeight: 1 }}>×</button>
                </span>
              )}
              {sortField !== "none" && (
                <span style={{
                  background: isDark ? "#1e3a5f" : "#dbeafe", color: isDark ? "#93c5fd" : "#1d4ed8",
                  borderRadius: 999, padding: "3px 10px", fontSize: 12,
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  Sort: {sortField} {sortDir === "asc" ? "↑" : "↓"}
                  <button onClick={clearSort} style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0, lineHeight: 1 }}>×</button>
                </span>
              )}
            </div>
          )}

          {/* ── Grouped view ── */}
          {activeTab === "grouped" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
              {STAGES.map((stage) => (
                <div
                  key={stage.key}
                  onDragOver={(e) => onDragOver(e, stage.key)}
                  onDrop={() => onDrop(stage.key)}
                  style={{
                    background: isDark ? stage.darkColBg : stage.lightColBg,
                    borderRadius: 10, padding: "14px 12px", minHeight: 200,
                    border: dragOverStage === stage.key ? `2px dashed ${stage.dot}` : "2px solid transparent",
                    transition: "border-color 0.15s",
                  }}
                >
                  <div style={{ marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      background: isDark ? stage.badgeBg : "rgba(0,0,0,0.07)",
                      color: isDark ? stage.badgeColor : stage.key === "to-apply" ? "#555" : stage.badgeColor,
                      padding: "4px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600,
                    }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: stage.dot, display: "inline-block" }} />
                      {stage.label}
                    </span>
                    <span style={{ fontSize: 12, color: t.muted }}>
                      {stageApps(stage.key).length}
                    </span>
                  </div>

                  {stageApps(stage.key).map((app) => (
                    <div
                      key={app.id}
                      draggable
                      onDragStart={() => onDragStart(app.id)}
                      onClick={() => setSelectedApp(app)}
                      style={{
                        background: t.surface, borderRadius: 8,
                        padding: compactView ? "8px 12px" : "13px 14px 11px",
                        marginBottom: 8, border: `1px solid transparent`,
                        cursor: "grab", transition: "border-color 0.2s, transform 0.1s",
                        opacity: dragId === app.id ? 0.4 : 1,
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = t.border)}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 14 }}>
                          <span style={{
                            width: 22, height: 22, borderRadius: 4,
                            background: app.iconBg, color: app.iconColor,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 12, flexShrink: 0,
                            border: app.company === "Notion Labs" ? "1px solid #ccc" : "none",
                          }}>
                            {app.icon}
                          </span>
                          {app.company}
                        </div>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: PRIORITY_COLOR[app.priority], flexShrink: 0 }} title={`Priority: ${app.priority}`} />
                      </div>
                      {!compactView && app.role && <div style={{ fontSize: 12, color: t.muted, marginTop: 5, marginBottom: 2 }}>{app.role}</div>}
                      {!compactView && app.link && <div style={{ fontSize: 11, color: t.subtle }}>{app.link}</div>}
                    </div>
                  ))}

                  {/* Inline add form */}
                  {addingToStage === stage.key ? (
                    <div style={{ background: t.surface, borderRadius: 8, padding: 10, border: `1px solid ${t.border}` }}>
                      <input
                        autoFocus
                        value={newAppName}
                        onChange={(e) => setNewAppName(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") addApp(stage.key); if (e.key === "Escape") setAddingToStage(null); }}
                        placeholder="Company name…"
                        style={{ ...inputStyle, marginBottom: 6 }}
                      />
                      <input
                        value={newAppRole}
                        onChange={(e) => setNewAppRole(e.target.value)}
                        placeholder="Role (optional)…"
                        style={{ ...inputStyle, marginBottom: 8 }}
                      />
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => addApp(stage.key)} style={{ flex: 1, background: "#3b82f6", color: "#fff", border: "none", borderRadius: 6, padding: "6px 0", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Add</button>
                        <button onClick={() => { setAddingToStage(null); setNewAppName(""); setNewAppRole(""); }} style={{ flex: 1, background: t.surfaceAlt, color: t.muted, border: "none", borderRadius: 6, padding: "6px 0", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setAddingToStage(stage.key)}
                      style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: t.subtle, background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", padding: "8px 4px", borderRadius: 6, width: "100%" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = t.muted)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = t.subtle)}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                      New page
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── All applications flat list ── */}
          {activeTab === "all" && (
            <div style={{ background: t.surface, borderRadius: 10, border: `1px solid ${t.border}`, overflow: "hidden" }}>
              {/* Header */}
              <div style={{
                display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 80px",
                padding: "10px 16px", borderBottom: `1px solid ${t.border}`,
                fontSize: 12, color: t.muted, fontWeight: 600, gap: 12,
              }}>
                {[["company", "Company"], ["role", "Role"], ["stage", "Stage"], ["priority", "Priority"]].map(([f, label]) => (
                  <button
                    key={f}
                    onClick={() => f !== "priority" && handleSort(f as SortField)}
                    style={{
                      background: "none", border: "none", cursor: f !== "priority" ? "pointer" : "default",
                      color: sortField === f ? t.text : t.muted, fontFamily: "inherit",
                      fontSize: 12, fontWeight: 600, textAlign: "left",
                      display: "flex", alignItems: "center", gap: 4,
                    }}
                  >
                    {label}
                    {sortField === f && <span>{sortDir === "asc" ? "↑" : "↓"}</span>}
                  </button>
                ))}
                <span>Actions</span>
              </div>
              {filteredApps.length === 0 && (
                <div style={{ padding: "24px 16px", textAlign: "center", color: t.muted, fontSize: 14 }}>
                  No applications match your search
                </div>
              )}
              {filteredApps.map((app, i) => {
                const stageInfo = STAGES.find((s) => s.key === app.stage)!;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    style={{
                      display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr 80px",
                      padding: "12px 16px", gap: 12, alignItems: "center",
                      borderBottom: i < filteredApps.length - 1 ? `1px solid ${t.border}` : "none",
                      cursor: "pointer", transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = t.surfaceHover)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 13 }}>
                      <span style={{ width: 20, height: 20, borderRadius: 4, background: app.iconBg, color: app.iconColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }}>
                        {app.icon}
                      </span>
                      {app.company}
                    </div>
                    <div style={{ fontSize: 13, color: t.muted }}>{app.role || "—"}</div>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      background: isDark ? stageInfo.badgeBg : "rgba(0,0,0,0.07)",
                      color: isDark ? stageInfo.badgeColor : stageInfo.key === "to-apply" ? "#555" : stageInfo.badgeColor,
                      padding: "3px 9px", borderRadius: 999, fontSize: 11, fontWeight: 600, width: "fit-content",
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: stageInfo.dot, display: "inline-block" }} />
                      {stageInfo.label}
                    </span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: PRIORITY_COLOR[app.priority] }}>
                      ● {app.priority}
                    </span>
                    <div style={{ display: "flex", gap: 4 }} onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setEditApp({ ...app })}
                        style={{ background: t.surfaceAlt, border: "none", borderRadius: 5, width: 28, height: 28, cursor: "pointer", color: t.muted, display: "flex", alignItems: "center", justifyContent: "center" }}
                        title="Edit"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                      </button>
                      <button
                        onClick={() => deleteApp(app.id)}
                        style={{ background: t.surfaceAlt, border: "none", borderRadius: 5, width: 28, height: 28, cursor: "pointer", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}
                        title="Delete"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Divider */}
        <hr style={{ border: "none", borderTop: `1px solid ${t.border}`, margin: "0 0 48px" }} />

        {/* ── Action Items ─────────────────────────────────────────────────── */}
        <section>
          <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>Action items</h2>
          <p style={{ fontSize: 13, color: t.muted, marginBottom: 20 }}>
            Outline and prioritize tasks for your job search journey.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {actions.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "10px 0", borderBottom: `1px solid ${t.border}`,
                  fontSize: 14, color: item.done ? t.subtle : t.text,
                  transition: "color 0.2s",
                }}
              >
                <div
                  onClick={() => toggleAction(item.id)}
                  style={{
                    width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    background: item.done ? "#3b82f6" : "transparent",
                    border: `1.5px solid ${item.done ? "#3b82f6" : t.border}`,
                    transition: "all 0.15s",
                  }}
                >
                  {item.done && <CheckIcon />}
                </div>
                <span style={{ flex: 1, textDecoration: item.done ? "line-through" : "none" }}>{item.text}</span>
                <button
                  onClick={() => deleteAction(item.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: t.subtle, padding: 4, display: "flex", alignItems: "center", borderRadius: 4, transition: "color 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = t.subtle)}
                  title="Delete"
                >
                  <XIcon size={13} />
                </button>
              </li>
            ))}
          </ul>
          {/* Add action item */}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <input
              value={newActionText}
              onChange={(e) => setNewActionText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addAction(); }}
              placeholder="Add a new action item…"
              style={{ ...inputStyle, flex: 1 }}
            />
            <button
              onClick={addAction}
              style={{
                background: "#3b82f6", color: "#fff", border: "none",
                borderRadius: 6, padding: "7px 16px", fontSize: 13,
                fontFamily: "inherit", fontWeight: 600, cursor: "pointer",
              }}
            >
              Add
            </button>
          </div>
        </section>
      </div>

      {/* ── Card Detail Modal ───────────────────────────────────────────────── */}
      {selectedApp && !editApp && (
        <Modal onClose={() => setSelectedApp(null)} t={t}>
          <div style={{ padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: selectedApp.iconBg, color: selectedApp.iconColor,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                  border: selectedApp.company === "Notion Labs" ? "1px solid #ccc" : "none",
                }}>
                  {selectedApp.icon}
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{selectedApp.company}</div>
                  <div style={{ fontSize: 13, color: t.muted }}>{selectedApp.role}</div>
                </div>
              </div>
              <button onClick={() => setSelectedApp(null)} style={{ background: "none", border: "none", cursor: "pointer", color: t.muted }}>
                <XIcon />
              </button>
            </div>

            {/* Stage selector */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: t.muted, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Stage</div>
              <div style={{ display: "flex", gap: 6 }}>
                {STAGES.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => { moveApp(selectedApp.id, s.key); setSelectedApp({ ...selectedApp, stage: s.key }); }}
                    style={{
                      flex: 1, padding: "7px 0", borderRadius: 6, fontSize: 12, fontWeight: 600,
                      border: `1px solid ${selectedApp.stage === s.key ? s.dot : t.border}`,
                      background: selectedApp.stage === s.key ? (isDark ? s.badgeBg : "rgba(0,0,0,0.06)") : "transparent",
                      color: selectedApp.stage === s.key ? s.badgeColor : t.muted,
                      cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: t.muted, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Priority</div>
              <div style={{ display: "flex", gap: 6 }}>
                {(["low", "medium", "high"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => { const updated = { ...selectedApp, priority: p }; setApps((prev) => prev.map((a) => a.id === selectedApp.id ? updated : a)); setSelectedApp(updated); }}
                    style={{
                      flex: 1, padding: "7px 0", borderRadius: 6, fontSize: 12, fontWeight: 600,
                      border: `1px solid ${selectedApp.priority === p ? PRIORITY_COLOR[p] : t.border}`,
                      background: selectedApp.priority === p ? `${PRIORITY_COLOR[p]}20` : "transparent",
                      color: selectedApp.priority === p ? PRIORITY_COLOR[p] : t.muted,
                      cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Link */}
            {selectedApp.link && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: t.muted, marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Link</div>
                <a href={`https://${selectedApp.link}`} target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: 13, color: "#3b82f6", textDecoration: "none" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {selectedApp.link} ↗
                </a>
              </div>
            )}

            {/* Notes */}
            {selectedApp.notes && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, color: t.muted, marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Notes</div>
                <div style={{ fontSize: 13, color: t.text, background: t.surfaceAlt, padding: "10px 12px", borderRadius: 6 }}>
                  {selectedApp.notes}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 8, paddingTop: 12, borderTop: `1px solid ${t.border}` }}>
              <button
                onClick={() => setEditApp({ ...selectedApp })}
                style={{ flex: 1, background: "#3b82f6", color: "#fff", border: "none", borderRadius: 7, padding: "9px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >
                Edit
              </button>
              <button
                onClick={() => deleteApp(selectedApp.id)}
                style={{ padding: "9px 16px", background: isDark ? "#2a1515" : "#fee2e2", color: "#ef4444", border: "none", borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Edit Modal ──────────────────────────────────────────────────────── */}
      {editApp && (
        <Modal onClose={() => setEditApp(null)} t={t}>
          <div style={{ padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 17 }}>Edit Application</div>
              <button onClick={() => setEditApp(null)} style={{ background: "none", border: "none", cursor: "pointer", color: t.muted }}><XIcon /></button>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Company *</label>
              <input value={editApp.company} onChange={(e) => setEditApp({ ...editApp, company: e.target.value })} style={inputStyle} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Role</label>
              <input value={editApp.role} onChange={(e) => setEditApp({ ...editApp, role: e.target.value })} style={inputStyle} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Link</label>
              <input value={editApp.link} onChange={(e) => setEditApp({ ...editApp, link: e.target.value })} style={inputStyle} placeholder="lever.co/…" />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Stage</label>
              <select
                value={editApp.stage}
                onChange={(e) => setEditApp({ ...editApp, stage: e.target.value as Stage })}
                style={{ ...inputStyle, appearance: "none" }}
              >
                {STAGES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Priority</label>
              <div style={{ display: "flex", gap: 6 }}>
                {(["low", "medium", "high"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setEditApp({ ...editApp, priority: p })}
                    style={{
                      flex: 1, padding: "7px 0", borderRadius: 6, fontSize: 12, fontWeight: 600,
                      border: `1px solid ${editApp.priority === p ? PRIORITY_COLOR[p] : t.border}`,
                      background: editApp.priority === p ? `${PRIORITY_COLOR[p]}20` : "transparent",
                      color: editApp.priority === p ? PRIORITY_COLOR[p] : t.muted,
                      cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={labelStyle}>Notes</label>
              <textarea
                value={editApp.notes}
                onChange={(e) => setEditApp({ ...editApp, notes: e.target.value })}
                placeholder="Any notes about this application…"
                rows={3}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
              />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button
                onClick={saveEdit}
                style={{ flex: 1, background: "#3b82f6", color: "#fff", border: "none", borderRadius: 7, padding: "9px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              >
                Save changes
              </button>
              <button
                onClick={() => setEditApp(null)}
                style={{ padding: "9px 16px", background: t.surfaceAlt, color: t.muted, border: "none", borderRadius: 7, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Settings Modal ──────────────────────────────────────────────────── */}
      {showSettings && (
        <Modal onClose={() => setShowSettings(false)} t={t}>
          <div style={{ padding: "20px 24px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 17 }}>Settings</div>
              <button onClick={() => setShowSettings(false)} style={{ background: "none", border: "none", cursor: "pointer", color: t.muted }}><XIcon /></button>
            </div>

            {[
              { label: "Compact card view", desc: "Show smaller cards in kanban", value: compactView, set: setCompactView },
              { label: "Auto-sort alphabetically", desc: "Keep cards sorted A–Z automatically", value: autoSort, set: (v: boolean) => { setAutoSort(v); if (v) handleSort("company"); else clearSort(); } },
            ].map(({ label, desc, value, set }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${t.border}` }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{label}</div>
                  <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>{desc}</div>
                </div>
                <div
                  onClick={() => set(!value)}
                  style={{
                    width: 42, height: 24, borderRadius: 12, cursor: "pointer",
                    background: value ? "#3b82f6" : t.border,
                    position: "relative", transition: "background 0.2s", flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: "absolute", top: 3, left: value ? 21 : 3,
                    width: 18, height: 18, borderRadius: "50%",
                    background: "#fff", transition: "left 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  }} />
                </div>
              </div>
            ))}

            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 12, color: t.muted, marginBottom: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Stats</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                {STAGES.map((s) => (
                  <div key={s.key} style={{ background: t.surfaceAlt, borderRadius: 8, padding: "12px 14px", textAlign: "center" }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: s.dot }}>{apps.filter((a) => a.stage === s.key).length}</div>
                    <div style={{ fontSize: 12, color: t.muted, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
