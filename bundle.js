// entry.tsx
import { createRoot } from "react-dom/client";

// mock_utils.ts
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// temp.tsx
import { useState, useRef, useEffect } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var INITIAL_APPS = [
  { id: 1, company: "Stripe", role: "Product Designer", link: "lever.co/stripe", stage: "to-apply", icon: "\u2261", iconBg: "#635bff", iconColor: "#fff", notes: "Referral from John", priority: "high" },
  { id: 2, company: "Slack", role: "Product Designer", link: "lever.co/slack", stage: "to-apply", icon: "\u{1F4AC}", iconBg: "#4a154b", iconColor: "#fff", notes: "", priority: "medium" },
  { id: 3, company: "Figma", role: "UX Designer", link: "lever.co/figma", stage: "applied", icon: "\u270F", iconBg: "#1e1e1e", iconColor: "#a259ff", notes: "Applied via website", priority: "high" },
  { id: 4, company: "Notion Labs", role: "Creative Designer", link: "lever.co/notion", stage: "offer", icon: "N", iconBg: "#fff", iconColor: "#1a1a1a", notes: "Offer deadline: Feb 28", priority: "high" },
  { id: 5, company: "Company Name", role: "Designer", link: "", stage: "offer", icon: "\u{1F3E0}", iconBg: "#e5e5e5", iconColor: "#555", notes: "", priority: "low" }
];
var INITIAL_ACTIONS = [
  { id: 1, text: "Update LinkedIn profile", done: true },
  { id: 2, text: "Refine portfolio to be more UX oriented", done: true },
  { id: 3, text: "Prepare for upcoming interviews", done: false },
  { id: 4, text: "Send follow-up emails to recruiters", done: false }
];
var STAGES = [
  { key: "to-apply", label: "To apply", dot: "#888", badgeBg: "rgba(255,255,255,0.06)", badgeColor: "#aaa", darkColBg: "rgba(255,255,255,0.03)", lightColBg: "#f0f0f0" },
  { key: "applied", label: "Applied", dot: "#f5a623", badgeBg: "rgba(245,166,35,0.12)", badgeColor: "#f5a623", darkColBg: "rgba(245,166,35,0.05)", lightColBg: "#fff8e6" },
  { key: "offer", label: "Offer", dot: "#4caf7d", badgeBg: "rgba(76,175,125,0.12)", badgeColor: "#4caf7d", darkColBg: "rgba(76,175,125,0.05)", lightColBg: "#eaf7f0" }
];
var PRIORITY_COLOR = { high: "#ef4444", medium: "#f5a623", low: "#4caf7d" };
var COMPANY_ICONS = ["\u{1F3E2}", "\u{1F680}", "\u{1F4A1}", "\u{1F3AF}", "\u26A1", "\u{1F31F}", "\u{1F525}", "\u{1F48E}"];
var CheckIcon = ({ color = "white" }) => /* @__PURE__ */ jsx("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: "3.5", strokeLinecap: "round", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) });
var XIcon = ({ size = 14 }) => /* @__PURE__ */ jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [
  /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
  /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
] });
function useClickOutside(ref, cb) {
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) cb();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, cb]);
}
var Modal = ({ children, onClose, t }) => /* @__PURE__ */ jsx(
  "div",
  {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1e3,
      padding: 16
    },
    children: /* @__PURE__ */ jsx(
      "div",
      {
        onClick: (e) => e.stopPropagation(),
        style: {
          background: t.surface,
          borderRadius: 12,
          width: "100%",
          maxWidth: 480,
          border: `1px solid ${t.border}`,
          boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
          maxHeight: "90vh",
          overflowY: "auto"
        },
        children
      }
    )
  }
);
var Component = () => {
  const [apps, setApps] = useState(INITIAL_APPS);
  const [actions, setActions] = useState(INITIAL_ACTIONS);
  const [activeTab, setActiveTab] = useState("grouped");
  const [theme, setTheme] = useState("dark");
  const [addingToStage, setAddingToStage] = useState(null);
  const [newAppName, setNewAppName] = useState("");
  const [newAppRole, setNewAppRole] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [editApp, setEditApp] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [sortField, setSortField] = useState("none");
  const [sortDir, setSortDir] = useState("asc");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [filterStage, setFilterStage] = useState("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showNewDropdown, setShowNewDropdown] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [newActionText, setNewActionText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [dragId, setDragId] = useState(null);
  const [dragOverStage, setDragOverStage] = useState(null);
  const [autoSort, setAutoSort] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const sortMenuRef = useRef(null);
  const filterMenuRef = useRef(null);
  const newDropdownRef = useRef(null);
  const searchRef = useRef(null);
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
    input: isDark ? "#1e1e1e" : "#fff"
  };
  const filteredApps = apps.filter((a) => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || a.company.toLowerCase().includes(q) || a.role.toLowerCase().includes(q);
    const matchStage = filterStage === "all" || a.stage === filterStage;
    return matchSearch && matchStage;
  }).sort((a, b) => {
    if (sortField === "none") return 0;
    const va = a[sortField];
    const vb = b[sortField];
    return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
  });
  const stageApps = (stage) => filteredApps.filter((a) => a.stage === stage);
  const toggleTheme = () => setTheme((p) => p === "dark" ? "light" : "dark");
  const toggleAction = (id) => setActions((prev) => prev.map((a) => a.id === id ? { ...a, done: !a.done } : a));
  const deleteAction = (id) => setActions((prev) => prev.filter((a) => a.id !== id));
  const addAction = () => {
    if (!newActionText.trim()) return;
    setActions((prev) => [...prev, { id: Date.now(), text: newActionText.trim(), done: false }]);
    setNewActionText("");
  };
  const addApp = (stage) => {
    if (!newAppName.trim()) return;
    const icons = COMPANY_ICONS;
    setApps((prev) => [
      ...prev,
      {
        id: Date.now(),
        company: newAppName.trim(),
        role: newAppRole.trim(),
        link: "",
        stage,
        icon: icons[Math.floor(Math.random() * icons.length)],
        iconBg: isDark ? "#333" : "#e5e5e5",
        iconColor: isDark ? "#ccc" : "#555",
        notes: "",
        priority: "medium"
      }
    ]);
    setNewAppName("");
    setNewAppRole("");
    setAddingToStage(null);
  };
  const deleteApp = (id) => {
    setApps((prev) => prev.filter((a) => a.id !== id));
    setSelectedApp(null);
  };
  const moveApp = (id, stage) => {
    setApps((prev) => prev.map((a) => a.id === id ? { ...a, stage } : a));
  };
  const saveEdit = () => {
    if (!editApp) return;
    setApps((prev) => prev.map((a) => a.id === editApp.id ? editApp : a));
    setSelectedApp(editApp);
    setEditApp(null);
  };
  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDir("asc");
    }
    setShowSortMenu(false);
  };
  const clearSort = () => {
    setSortField("none");
    setShowSortMenu(false);
  };
  const onDragStart = (id) => setDragId(id);
  const onDragOver = (e, stage) => {
    e.preventDefault();
    setDragOverStage(stage);
  };
  const onDrop = (stage) => {
    if (dragId !== null) moveApp(dragId, stage);
    setDragId(null);
    setDragOverStage(null);
  };
  const iconBtn = (active = false) => ({
    width: 30,
    height: 30,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    background: active ? isDark ? "#2e2e2e" : "#e0e0e0" : "transparent",
    color: active ? t.text : t.muted,
    transition: "background 0.15s, color 0.15s",
    position: "relative"
  });
  const inputStyle = {
    background: t.input,
    border: `1px solid ${t.border}`,
    borderRadius: 6,
    padding: "7px 10px",
    fontSize: 13,
    color: t.text,
    fontFamily: "inherit",
    outline: "none",
    width: "100%"
  };
  const labelStyle = {
    fontSize: 12,
    color: t.muted,
    marginBottom: 4,
    display: "block"
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn("transition-colors duration-300"),
      style: {
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        background: t.bg,
        color: t.text,
        minHeight: isExpanded ? "100vh" : void 0,
        padding: isExpanded ? "48px 24px 80px" : "48px 24px 80px"
      },
      children: [
        /* @__PURE__ */ jsxs("div", { style: { maxWidth: isExpanded ? "100%" : 1060, margin: "0 auto", position: "relative" }, children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: toggleTheme,
              style: {
                position: "absolute",
                top: 0,
                right: 0,
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: 999,
                padding: "6px 14px",
                fontSize: 12,
                color: t.muted,
                cursor: "pointer",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 6
              },
              children: isDark ? "\u2600 Light" : "\u263E Dark"
            }
          ),
          /* @__PURE__ */ jsx("h1", { style: { fontSize: "clamp(26px,5vw,42px)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 44 }, children: "Job Application Tracker" }),
          /* @__PURE__ */ jsxs("section", { style: { marginBottom: 52 }, children: [
            /* @__PURE__ */ jsx("h2", { style: { fontSize: 17, fontWeight: 600, marginBottom: 6 }, children: "Resume" }),
            /* @__PURE__ */ jsx("p", { style: { fontSize: 13, color: t.muted, marginBottom: 14, display: "flex", alignItems: "center", gap: 5 }, children: "\u2193 Upload your resume by clicking the block below and choosing a file from your computer" }),
            /* @__PURE__ */ jsxs(
              "label",
              {
                tabIndex: 0,
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    if (e.target === e.currentTarget) {
                      const input = e.currentTarget.querySelector('input[type="file"]');
                      if (input) input.click();
                    }
                  }
                },
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: t.surfaceAlt,
                  border: `1px solid ${t.border}`,
                  borderRadius: 8,
                  padding: "16px 20px",
                  fontSize: 14,
                  color: t.muted,
                  cursor: "pointer",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                  outline: "none"
                },
                onMouseEnter: (e) => e.currentTarget.style.borderColor = "#3b82f6",
                onMouseLeave: (e) => {
                  if (document.activeElement !== e.currentTarget) {
                    e.currentTarget.style.borderColor = t.border;
                  }
                },
                onFocus: (e) => {
                  e.currentTarget.style.borderColor = "#3b82f6";
                  e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.3)";
                },
                onBlur: (e) => {
                  e.currentTarget.style.borderColor = t.border;
                  e.currentTarget.style.boxShadow = "none";
                },
                children: [
                  /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", children: [
                    /* @__PURE__ */ jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
                    /* @__PURE__ */ jsx("polyline", { points: "14 2 14 8 20 8" }),
                    /* @__PURE__ */ jsx("line", { x1: "12", y1: "18", x2: "12", y2: "12" }),
                    /* @__PURE__ */ jsx("polyline", { points: "9 15 12 12 15 15" })
                  ] }),
                  resumeFile ? /* @__PURE__ */ jsxs("span", { style: { color: t.text, display: "flex", alignItems: "center", gap: 8 }, children: [
                    /* @__PURE__ */ jsx("span", { children: "\u{1F4C4}" }),
                    " ",
                    resumeFile,
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        "aria-label": "Remove resume",
                        title: "Remove resume",
                        onClick: (e) => {
                          e.preventDefault();
                          setResumeFile(null);
                        },
                        style: { background: "none", border: "none", cursor: "pointer", color: t.muted, padding: 2, borderRadius: 4 },
                        onFocus: (e) => e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.5)",
                        onBlur: (e) => e.currentTarget.style.boxShadow = "none",
                        children: /* @__PURE__ */ jsx(XIcon, { size: 12 })
                      }
                    )
                  ] }) : "Upload or embed a file",
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "file",
                      style: { display: "none" },
                      accept: ".pdf,.doc,.docx",
                      onChange: (e) => {
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
                      }
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("section", { style: { marginBottom: 52 }, children: [
            /* @__PURE__ */ jsx("h2", { style: { fontSize: 17, fontWeight: 600, marginBottom: 6 }, children: "Positions to apply to" }),
            /* @__PURE__ */ jsx("p", { style: { fontSize: 13, color: t.muted, marginBottom: 16, display: "flex", alignItems: "center", gap: 5 }, children: "\u2193 Move your applications along the status pipeline" }),
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 16 }, children: [
              /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 6 }, children: ["grouped", "all"].map((tab) => /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setActiveTab(tab),
                  style: {
                    padding: "6px 14px",
                    borderRadius: 7,
                    fontSize: 13,
                    fontFamily: "inherit",
                    fontWeight: activeTab === tab ? 600 : 400,
                    background: activeTab === tab ? t.surface : "transparent",
                    color: activeTab === tab ? t.text : t.muted,
                    border: `1px solid ${activeTab === tab ? t.border : "transparent"}`,
                    cursor: "pointer",
                    transition: "all 0.2s"
                  },
                  children: tab === "grouped" ? "\u229E Grouped by stage" : "\u2630 All applications"
                },
                tab
              )) }),
              /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
                /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, ref: filterMenuRef, children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      title: "Filter by stage",
                      onClick: () => setShowFilterMenu((v) => !v),
                      style: iconBtn(filterStage !== "all" || showFilterMenu),
                      children: [
                        /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx("polygon", { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" }) }),
                        filterStage !== "all" && /* @__PURE__ */ jsx("span", { style: { position: "absolute", top: 4, right: 4, width: 6, height: 6, borderRadius: "50%", background: "#3b82f6" } })
                      ]
                    }
                  ),
                  showFilterMenu && /* @__PURE__ */ jsxs("div", { style: {
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    right: 0,
                    background: t.surface,
                    border: `1px solid ${t.border}`,
                    borderRadius: 8,
                    padding: 6,
                    zIndex: 100,
                    minWidth: 140,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
                  }, children: [
                    /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: t.muted, padding: "4px 8px 6px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }, children: "Filter by stage" }),
                    ["all", "to-apply", "applied", "offer"].map((s) => /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => {
                          setFilterStage(s);
                          setShowFilterMenu(false);
                        },
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          width: "100%",
                          padding: "7px 8px",
                          borderRadius: 6,
                          fontSize: 13,
                          background: filterStage === s ? isDark ? "#2e2e2e" : "#ececec" : "transparent",
                          color: filterStage === s ? t.text : t.muted,
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "inherit"
                        },
                        children: [
                          filterStage === s && /* @__PURE__ */ jsx(CheckIcon, { color: isDark ? "#e8e8e8" : "#1a1a1a" }),
                          s === "all" ? "All stages" : STAGES.find((x) => x.key === s)?.label
                        ]
                      },
                      s
                    ))
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, ref: sortMenuRef, children: [
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      title: "Sort",
                      onClick: () => setShowSortMenu((v) => !v),
                      style: iconBtn(sortField !== "none" || showSortMenu),
                      children: [
                        /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
                          /* @__PURE__ */ jsx("line", { x1: "8", y1: "6", x2: "21", y2: "6" }),
                          /* @__PURE__ */ jsx("line", { x1: "8", y1: "12", x2: "21", y2: "12" }),
                          /* @__PURE__ */ jsx("line", { x1: "8", y1: "18", x2: "21", y2: "18" }),
                          /* @__PURE__ */ jsx("polyline", { points: "3 6 4 6" }),
                          /* @__PURE__ */ jsx("polyline", { points: "3 12 4 12" }),
                          /* @__PURE__ */ jsx("polyline", { points: "3 18 4 18" })
                        ] }),
                        sortField !== "none" && /* @__PURE__ */ jsx("span", { style: { position: "absolute", top: 4, right: 4, width: 6, height: 6, borderRadius: "50%", background: "#3b82f6" } })
                      ]
                    }
                  ),
                  showSortMenu && /* @__PURE__ */ jsxs("div", { style: {
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    right: 0,
                    background: t.surface,
                    border: `1px solid ${t.border}`,
                    borderRadius: 8,
                    padding: 6,
                    zIndex: 100,
                    minWidth: 150,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
                  }, children: [
                    /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: t.muted, padding: "4px 8px 6px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }, children: "Sort by" }),
                    [["company", "Company A\u2013Z"], ["role", "Role"], ["stage", "Stage"]].map(([field, label]) => /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => handleSort(field),
                        style: {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "7px 8px",
                          borderRadius: 6,
                          fontSize: 13,
                          background: sortField === field ? isDark ? "#2e2e2e" : "#ececec" : "transparent",
                          color: sortField === field ? t.text : t.muted,
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "inherit"
                        },
                        children: [
                          label,
                          sortField === field && /* @__PURE__ */ jsx("span", { style: { fontSize: 10 }, children: sortDir === "asc" ? "\u2191" : "\u2193" })
                        ]
                      },
                      field
                    )),
                    sortField !== "none" && /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: clearSort,
                        style: {
                          display: "flex",
                          width: "100%",
                          padding: "7px 8px",
                          borderRadius: 6,
                          fontSize: 13,
                          color: "#ef4444",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "inherit",
                          borderTop: `1px solid ${t.border}`,
                          marginTop: 4
                        },
                        children: "Clear sort"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    title: "Search",
                    onClick: () => {
                      setShowSearch((v) => !v);
                      setTimeout(() => searchRef.current?.focus(), 50);
                    },
                    style: iconBtn(showSearch),
                    children: /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
                      /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
                      /* @__PURE__ */ jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    title: isExpanded ? "Collapse" : "Expand",
                    onClick: () => setIsExpanded((v) => !v),
                    style: iconBtn(isExpanded),
                    children: /* @__PURE__ */ jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: isExpanded ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx("polyline", { points: "4 14 10 14 10 20" }),
                      /* @__PURE__ */ jsx("polyline", { points: "20 10 14 10 14 4" }),
                      /* @__PURE__ */ jsx("line", { x1: "10", y1: "14", x2: "3", y2: "21" }),
                      /* @__PURE__ */ jsx("line", { x1: "21", y1: "3", x2: "14", y2: "10" })
                    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx("polyline", { points: "15 3 21 3 21 9" }),
                      /* @__PURE__ */ jsx("polyline", { points: "9 21 3 21 3 15" }),
                      /* @__PURE__ */ jsx("line", { x1: "21", y1: "3", x2: "14", y2: "10" }),
                      /* @__PURE__ */ jsx("line", { x1: "3", y1: "21", x2: "10", y2: "14" })
                    ] }) })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    title: "Settings",
                    onClick: () => setShowSettings(true),
                    style: iconBtn(showSettings),
                    children: /* @__PURE__ */ jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
                      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" }),
                      /* @__PURE__ */ jsx("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" })
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxs("div", { style: { position: "relative", marginLeft: 4 }, ref: newDropdownRef, children: [
                  /* @__PURE__ */ jsxs("div", { style: { display: "flex" }, children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setAddingToStage("to-apply"),
                        style: {
                          background: "#3b82f6",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px 0 0 8px",
                          padding: "7px 14px",
                          fontSize: 13,
                          fontFamily: "inherit",
                          fontWeight: 600,
                          cursor: "pointer"
                        },
                        children: "+ New"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setShowNewDropdown((v) => !v),
                        style: {
                          background: "#3b82f6",
                          color: "#fff",
                          border: "none",
                          borderLeft: "1px solid rgba(255,255,255,0.25)",
                          borderRadius: "0 8px 8px 0",
                          padding: "7px 8px",
                          cursor: "pointer"
                        },
                        children: /* @__PURE__ */ jsx("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) })
                      }
                    )
                  ] }),
                  showNewDropdown && /* @__PURE__ */ jsxs("div", { style: {
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    right: 0,
                    background: t.surface,
                    border: `1px solid ${t.border}`,
                    borderRadius: 8,
                    padding: 6,
                    zIndex: 100,
                    minWidth: 160,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)"
                  }, children: [
                    /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: t.muted, padding: "4px 8px 6px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }, children: "Add to stage" }),
                    STAGES.map((s) => /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => {
                          setAddingToStage(s.key);
                          setShowNewDropdown(false);
                        },
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          width: "100%",
                          padding: "7px 8px",
                          borderRadius: 6,
                          fontSize: 13,
                          background: "transparent",
                          color: t.muted,
                          border: "none",
                          cursor: "pointer",
                          fontFamily: "inherit"
                        },
                        onMouseEnter: (e) => e.currentTarget.style.background = isDark ? "#2e2e2e" : "#ececec",
                        onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
                        children: [
                          /* @__PURE__ */ jsx("span", { style: { width: 7, height: 7, borderRadius: "50%", background: s.dot, display: "inline-block" } }),
                          s.label
                        ]
                      },
                      s.key
                    ))
                  ] })
                ] })
              ] })
            ] }),
            showSearch && /* @__PURE__ */ jsxs("div", { style: { marginBottom: 12, position: "relative" }, children: [
              /* @__PURE__ */ jsxs(
                "svg",
                {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: t.muted,
                  strokeWidth: "2",
                  style: { position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" },
                  children: [
                    /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
                    /* @__PURE__ */ jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: searchRef,
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  placeholder: "Search companies or roles\u2026",
                  style: { ...inputStyle, paddingLeft: 32 }
                }
              ),
              searchQuery && /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setSearchQuery(""),
                  style: { position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: t.muted },
                  children: /* @__PURE__ */ jsx(XIcon, { size: 13 })
                }
              )
            ] }),
            (filterStage !== "all" || sortField !== "none") && /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }, children: [
              filterStage !== "all" && /* @__PURE__ */ jsxs("span", { style: {
                background: isDark ? "#1e3a5f" : "#dbeafe",
                color: isDark ? "#93c5fd" : "#1d4ed8",
                borderRadius: 999,
                padding: "3px 10px",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                gap: 6
              }, children: [
                "Stage: ",
                STAGES.find((s) => s.key === filterStage)?.label,
                /* @__PURE__ */ jsx("button", { onClick: () => setFilterStage("all"), style: { background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0, lineHeight: 1 }, children: "\xD7" })
              ] }),
              sortField !== "none" && /* @__PURE__ */ jsxs("span", { style: {
                background: isDark ? "#1e3a5f" : "#dbeafe",
                color: isDark ? "#93c5fd" : "#1d4ed8",
                borderRadius: 999,
                padding: "3px 10px",
                fontSize: 12,
                display: "flex",
                alignItems: "center",
                gap: 6
              }, children: [
                "Sort: ",
                sortField,
                " ",
                sortDir === "asc" ? "\u2191" : "\u2193",
                /* @__PURE__ */ jsx("button", { onClick: clearSort, style: { background: "none", border: "none", cursor: "pointer", color: "inherit", padding: 0, lineHeight: 1 }, children: "\xD7" })
              ] })
            ] }),
            activeTab === "grouped" && /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }, children: STAGES.map((stage) => /* @__PURE__ */ jsxs(
              "div",
              {
                onDragOver: (e) => onDragOver(e, stage.key),
                onDrop: () => onDrop(stage.key),
                style: {
                  background: isDark ? stage.darkColBg : stage.lightColBg,
                  borderRadius: 10,
                  padding: "14px 12px",
                  minHeight: 200,
                  border: dragOverStage === stage.key ? `2px dashed ${stage.dot}` : "2px solid transparent",
                  transition: "border-color 0.15s"
                },
                children: [
                  /* @__PURE__ */ jsxs("div", { style: { marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
                    /* @__PURE__ */ jsxs("span", { style: {
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: isDark ? stage.badgeBg : "rgba(0,0,0,0.07)",
                      color: isDark ? stage.badgeColor : stage.key === "to-apply" ? "#555" : stage.badgeColor,
                      padding: "4px 12px",
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 600
                    }, children: [
                      /* @__PURE__ */ jsx("span", { style: { width: 7, height: 7, borderRadius: "50%", background: stage.dot, display: "inline-block" } }),
                      stage.label
                    ] }),
                    /* @__PURE__ */ jsx("span", { style: { fontSize: 12, color: t.muted }, children: stageApps(stage.key).length })
                  ] }),
                  stageApps(stage.key).map((app) => /* @__PURE__ */ jsxs(
                    "div",
                    {
                      draggable: true,
                      onDragStart: () => onDragStart(app.id),
                      onClick: () => setSelectedApp(app),
                      style: {
                        background: t.surface,
                        borderRadius: 8,
                        padding: compactView ? "8px 12px" : "13px 14px 11px",
                        marginBottom: 8,
                        border: `1px solid transparent`,
                        cursor: "grab",
                        transition: "border-color 0.2s, transform 0.1s",
                        opacity: dragId === app.id ? 0.4 : 1
                      },
                      onMouseEnter: (e) => e.currentTarget.style.borderColor = t.border,
                      onMouseLeave: (e) => e.currentTarget.style.borderColor = "transparent",
                      children: [
                        /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
                          /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 14 }, children: [
                            /* @__PURE__ */ jsx("span", { style: {
                              width: 22,
                              height: 22,
                              borderRadius: 4,
                              background: app.iconBg,
                              color: app.iconColor,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 12,
                              flexShrink: 0,
                              border: app.company === "Notion Labs" ? "1px solid #ccc" : "none"
                            }, children: app.icon }),
                            app.company
                          ] }),
                          /* @__PURE__ */ jsx("span", { style: { width: 7, height: 7, borderRadius: "50%", background: PRIORITY_COLOR[app.priority], flexShrink: 0 }, title: `Priority: ${app.priority}` })
                        ] }),
                        !compactView && app.role && /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: t.muted, marginTop: 5, marginBottom: 2 }, children: app.role }),
                        !compactView && app.link && /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: t.subtle }, children: app.link })
                      ]
                    },
                    app.id
                  )),
                  addingToStage === stage.key ? /* @__PURE__ */ jsxs("div", { style: { background: t.surface, borderRadius: 8, padding: 10, border: `1px solid ${t.border}` }, children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        autoFocus: true,
                        value: newAppName,
                        onChange: (e) => setNewAppName(e.target.value),
                        onKeyDown: (e) => {
                          if (e.key === "Enter") addApp(stage.key);
                          if (e.key === "Escape") setAddingToStage(null);
                        },
                        placeholder: "Company name\u2026",
                        style: { ...inputStyle, marginBottom: 6 }
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        value: newAppRole,
                        onChange: (e) => setNewAppRole(e.target.value),
                        placeholder: "Role (optional)\u2026",
                        style: { ...inputStyle, marginBottom: 8 }
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6 }, children: [
                      /* @__PURE__ */ jsx("button", { onClick: () => addApp(stage.key), style: { flex: 1, background: "#3b82f6", color: "#fff", border: "none", borderRadius: 6, padding: "6px 0", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }, children: "Add" }),
                      /* @__PURE__ */ jsx("button", { onClick: () => {
                        setAddingToStage(null);
                        setNewAppName("");
                        setNewAppRole("");
                      }, style: { flex: 1, background: t.surfaceAlt, color: t.muted, border: "none", borderRadius: 6, padding: "6px 0", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }, children: "Cancel" })
                    ] })
                  ] }) : /* @__PURE__ */ jsxs(
                    "button",
                    {
                      onClick: () => setAddingToStage(stage.key),
                      style: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: t.subtle, background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", padding: "8px 4px", borderRadius: 6, width: "100%" },
                      onMouseEnter: (e) => e.currentTarget.style.color = t.muted,
                      onMouseLeave: (e) => e.currentTarget.style.color = t.subtle,
                      children: [
                        /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
                          /* @__PURE__ */ jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
                          /* @__PURE__ */ jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
                        ] }),
                        "New page"
                      ]
                    }
                  )
                ]
              },
              stage.key
            )) }),
            activeTab === "all" && /* @__PURE__ */ jsxs("div", { style: { background: t.surface, borderRadius: 10, border: `1px solid ${t.border}`, overflow: "hidden" }, children: [
              /* @__PURE__ */ jsxs("div", { style: {
                display: "grid",
                gridTemplateColumns: "2fr 2fr 1fr 1fr 80px",
                padding: "10px 16px",
                borderBottom: `1px solid ${t.border}`,
                fontSize: 12,
                color: t.muted,
                fontWeight: 600,
                gap: 12
              }, children: [
                [["company", "Company"], ["role", "Role"], ["stage", "Stage"], ["priority", "Priority"]].map(([f, label]) => /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => f !== "priority" && handleSort(f),
                    style: {
                      background: "none",
                      border: "none",
                      cursor: f !== "priority" ? "pointer" : "default",
                      color: sortField === f ? t.text : t.muted,
                      fontFamily: "inherit",
                      fontSize: 12,
                      fontWeight: 600,
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: 4
                    },
                    children: [
                      label,
                      sortField === f && /* @__PURE__ */ jsx("span", { children: sortDir === "asc" ? "\u2191" : "\u2193" })
                    ]
                  },
                  f
                )),
                /* @__PURE__ */ jsx("span", { children: "Actions" })
              ] }),
              filteredApps.length === 0 && /* @__PURE__ */ jsx("div", { style: { padding: "24px 16px", textAlign: "center", color: t.muted, fontSize: 14 }, children: "No applications match your search" }),
              filteredApps.map((app, i) => {
                const stageInfo = STAGES.find((s) => s.key === app.stage);
                return /* @__PURE__ */ jsxs(
                  "div",
                  {
                    onClick: () => setSelectedApp(app),
                    style: {
                      display: "grid",
                      gridTemplateColumns: "2fr 2fr 1fr 1fr 80px",
                      padding: "12px 16px",
                      gap: 12,
                      alignItems: "center",
                      borderBottom: i < filteredApps.length - 1 ? `1px solid ${t.border}` : "none",
                      cursor: "pointer",
                      transition: "background 0.15s"
                    },
                    onMouseEnter: (e) => e.currentTarget.style.background = t.surfaceHover,
                    onMouseLeave: (e) => e.currentTarget.style.background = "transparent",
                    children: [
                      /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 13 }, children: [
                        /* @__PURE__ */ jsx("span", { style: { width: 20, height: 20, borderRadius: 4, background: app.iconBg, color: app.iconColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0 }, children: app.icon }),
                        app.company
                      ] }),
                      /* @__PURE__ */ jsx("div", { style: { fontSize: 13, color: t.muted }, children: app.role || "\u2014" }),
                      /* @__PURE__ */ jsxs("span", { style: {
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        background: isDark ? stageInfo.badgeBg : "rgba(0,0,0,0.07)",
                        color: isDark ? stageInfo.badgeColor : stageInfo.key === "to-apply" ? "#555" : stageInfo.badgeColor,
                        padding: "3px 9px",
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: 600,
                        width: "fit-content"
                      }, children: [
                        /* @__PURE__ */ jsx("span", { style: { width: 5, height: 5, borderRadius: "50%", background: stageInfo.dot, display: "inline-block" } }),
                        stageInfo.label
                      ] }),
                      /* @__PURE__ */ jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: PRIORITY_COLOR[app.priority] }, children: [
                        "\u25CF ",
                        app.priority
                      ] }),
                      /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 4 }, onClick: (e) => e.stopPropagation(), children: [
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: () => setEditApp({ ...app }),
                            style: { background: t.surfaceAlt, border: "none", borderRadius: 5, width: 28, height: 28, cursor: "pointer", color: t.muted, display: "flex", alignItems: "center", justifyContent: "center" },
                            title: "Edit",
                            children: /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
                              /* @__PURE__ */ jsx("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
                              /* @__PURE__ */ jsx("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
                            ] })
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: () => deleteApp(app.id),
                            style: { background: t.surfaceAlt, border: "none", borderRadius: 5, width: 28, height: 28, cursor: "pointer", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" },
                            title: "Delete",
                            children: /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
                              /* @__PURE__ */ jsx("polyline", { points: "3 6 5 6 21 6" }),
                              /* @__PURE__ */ jsx("path", { d: "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" }),
                              /* @__PURE__ */ jsx("path", { d: "M10 11v6M14 11v6" }),
                              /* @__PURE__ */ jsx("path", { d: "M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" })
                            ] })
                          }
                        )
                      ] })
                    ]
                  },
                  app.id
                );
              })
            ] })
          ] }),
          /* @__PURE__ */ jsx("hr", { style: { border: "none", borderTop: `1px solid ${t.border}`, margin: "0 0 48px" } }),
          /* @__PURE__ */ jsxs("section", { children: [
            /* @__PURE__ */ jsx("h2", { style: { fontSize: 17, fontWeight: 600, marginBottom: 6 }, children: "Action items" }),
            /* @__PURE__ */ jsx("p", { style: { fontSize: 13, color: t.muted, marginBottom: 20 }, children: "Outline and prioritize tasks for your job search journey." }),
            /* @__PURE__ */ jsx("ul", { style: { listStyle: "none", padding: 0, margin: 0 }, children: actions.map((item) => /* @__PURE__ */ jsxs(
              "li",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 0",
                  borderBottom: `1px solid ${t.border}`,
                  fontSize: 14,
                  color: item.done ? t.subtle : t.text,
                  transition: "color 0.2s"
                },
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      onClick: () => toggleAction(item.id),
                      style: {
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        flexShrink: 0,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: item.done ? "#3b82f6" : "transparent",
                        border: `1.5px solid ${item.done ? "#3b82f6" : t.border}`,
                        transition: "all 0.15s"
                      },
                      children: item.done && /* @__PURE__ */ jsx(CheckIcon, {})
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { style: { flex: 1, textDecoration: item.done ? "line-through" : "none" }, children: item.text }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => deleteAction(item.id),
                      style: { background: "none", border: "none", cursor: "pointer", color: t.subtle, padding: 4, display: "flex", alignItems: "center", borderRadius: 4, transition: "color 0.15s" },
                      onMouseEnter: (e) => e.currentTarget.style.color = "#ef4444",
                      onMouseLeave: (e) => e.currentTarget.style.color = t.subtle,
                      title: "Delete",
                      children: /* @__PURE__ */ jsx(XIcon, { size: 13 })
                    }
                  )
                ]
              },
              item.id
            )) }),
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, marginTop: 12 }, children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  value: newActionText,
                  onChange: (e) => setNewActionText(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter") addAction();
                  },
                  placeholder: "Add a new action item\u2026",
                  style: { ...inputStyle, flex: 1 }
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: addAction,
                  style: {
                    background: "#3b82f6",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "7px 16px",
                    fontSize: 13,
                    fontFamily: "inherit",
                    fontWeight: 600,
                    cursor: "pointer"
                  },
                  children: "Add"
                }
              )
            ] })
          ] })
        ] }),
        selectedApp && !editApp && /* @__PURE__ */ jsx(Modal, { onClose: () => setSelectedApp(null), t, children: /* @__PURE__ */ jsxs("div", { style: { padding: "20px 24px" }, children: [
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }, children: [
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
              /* @__PURE__ */ jsx("span", { style: {
                width: 36,
                height: 36,
                borderRadius: 8,
                background: selectedApp.iconBg,
                color: selectedApp.iconColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                border: selectedApp.company === "Notion Labs" ? "1px solid #ccc" : "none"
              }, children: selectedApp.icon }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("div", { style: { fontWeight: 700, fontSize: 18 }, children: selectedApp.company }),
                /* @__PURE__ */ jsx("div", { style: { fontSize: 13, color: t.muted }, children: selectedApp.role })
              ] })
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => setSelectedApp(null), style: { background: "none", border: "none", cursor: "pointer", color: t.muted }, children: /* @__PURE__ */ jsx(XIcon, {}) })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { marginBottom: 16 }, children: [
            /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: t.muted, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }, children: "Stage" }),
            /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 6 }, children: STAGES.map((s) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  moveApp(selectedApp.id, s.key);
                  setSelectedApp({ ...selectedApp, stage: s.key });
                },
                style: {
                  flex: 1,
                  padding: "7px 0",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  border: `1px solid ${selectedApp.stage === s.key ? s.dot : t.border}`,
                  background: selectedApp.stage === s.key ? isDark ? s.badgeBg : "rgba(0,0,0,0.06)" : "transparent",
                  color: selectedApp.stage === s.key ? s.badgeColor : t.muted,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.15s"
                },
                children: s.label
              },
              s.key
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { marginBottom: 16 }, children: [
            /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: t.muted, marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }, children: "Priority" }),
            /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 6 }, children: ["low", "medium", "high"].map((p) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => {
                  const updated = { ...selectedApp, priority: p };
                  setApps((prev) => prev.map((a) => a.id === selectedApp.id ? updated : a));
                  setSelectedApp(updated);
                },
                style: {
                  flex: 1,
                  padding: "7px 0",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  border: `1px solid ${selectedApp.priority === p ? PRIORITY_COLOR[p] : t.border}`,
                  background: selectedApp.priority === p ? `${PRIORITY_COLOR[p]}20` : "transparent",
                  color: selectedApp.priority === p ? PRIORITY_COLOR[p] : t.muted,
                  cursor: "pointer",
                  fontFamily: "inherit"
                },
                children: p
              },
              p
            )) })
          ] }),
          selectedApp.link && /* @__PURE__ */ jsxs("div", { style: { marginBottom: 16 }, children: [
            /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: t.muted, marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }, children: "Link" }),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: `https://${selectedApp.link}`,
                target: "_blank",
                rel: "noopener noreferrer",
                style: { fontSize: 13, color: "#3b82f6", textDecoration: "none" },
                onClick: (e) => e.stopPropagation(),
                children: [
                  selectedApp.link,
                  " \u2197"
                ]
              }
            )
          ] }),
          selectedApp.notes && /* @__PURE__ */ jsxs("div", { style: { marginBottom: 20 }, children: [
            /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: t.muted, marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }, children: "Notes" }),
            /* @__PURE__ */ jsx("div", { style: { fontSize: 13, color: t.text, background: t.surfaceAlt, padding: "10px 12px", borderRadius: 6 }, children: selectedApp.notes })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, paddingTop: 12, borderTop: `1px solid ${t.border}` }, children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setEditApp({ ...selectedApp }),
                style: { flex: 1, background: "#3b82f6", color: "#fff", border: "none", borderRadius: 7, padding: "9px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
                children: "Edit"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => deleteApp(selectedApp.id),
                style: { padding: "9px 16px", background: isDark ? "#2a1515" : "#fee2e2", color: "#ef4444", border: "none", borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
                children: "Delete"
              }
            )
          ] })
        ] }) }),
        editApp && /* @__PURE__ */ jsx(Modal, { onClose: () => setEditApp(null), t, children: /* @__PURE__ */ jsxs("div", { style: { padding: "20px 24px" }, children: [
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }, children: [
            /* @__PURE__ */ jsx("div", { style: { fontWeight: 700, fontSize: 17 }, children: "Edit Application" }),
            /* @__PURE__ */ jsx("button", { onClick: () => setEditApp(null), style: { background: "none", border: "none", cursor: "pointer", color: t.muted }, children: /* @__PURE__ */ jsx(XIcon, {}) })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { marginBottom: 14 }, children: [
            /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Company *" }),
            /* @__PURE__ */ jsx("input", { value: editApp.company, onChange: (e) => setEditApp({ ...editApp, company: e.target.value }), style: inputStyle })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { marginBottom: 14 }, children: [
            /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Role" }),
            /* @__PURE__ */ jsx("input", { value: editApp.role, onChange: (e) => setEditApp({ ...editApp, role: e.target.value }), style: inputStyle })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { marginBottom: 14 }, children: [
            /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Link" }),
            /* @__PURE__ */ jsx("input", { value: editApp.link, onChange: (e) => setEditApp({ ...editApp, link: e.target.value }), style: inputStyle, placeholder: "lever.co/\u2026" })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { marginBottom: 14 }, children: [
            /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Stage" }),
            /* @__PURE__ */ jsx(
              "select",
              {
                value: editApp.stage,
                onChange: (e) => setEditApp({ ...editApp, stage: e.target.value }),
                style: { ...inputStyle, appearance: "none" },
                children: STAGES.map((s) => /* @__PURE__ */ jsx("option", { value: s.key, children: s.label }, s.key))
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { marginBottom: 14 }, children: [
            /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Priority" }),
            /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 6 }, children: ["low", "medium", "high"].map((p) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setEditApp({ ...editApp, priority: p }),
                style: {
                  flex: 1,
                  padding: "7px 0",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  border: `1px solid ${editApp.priority === p ? PRIORITY_COLOR[p] : t.border}`,
                  background: editApp.priority === p ? `${PRIORITY_COLOR[p]}20` : "transparent",
                  color: editApp.priority === p ? PRIORITY_COLOR[p] : t.muted,
                  cursor: "pointer",
                  fontFamily: "inherit"
                },
                children: p
              },
              p
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { marginBottom: 20 }, children: [
            /* @__PURE__ */ jsx("label", { style: labelStyle, children: "Notes" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                value: editApp.notes,
                onChange: (e) => setEditApp({ ...editApp, notes: e.target.value }),
                placeholder: "Any notes about this application\u2026",
                rows: 3,
                style: { ...inputStyle, resize: "vertical", lineHeight: 1.5 }
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8 }, children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: saveEdit,
                style: { flex: 1, background: "#3b82f6", color: "#fff", border: "none", borderRadius: 7, padding: "9px 0", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
                children: "Save changes"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setEditApp(null),
                style: { padding: "9px 16px", background: t.surfaceAlt, color: t.muted, border: "none", borderRadius: 7, fontSize: 13, cursor: "pointer", fontFamily: "inherit" },
                children: "Cancel"
              }
            )
          ] })
        ] }) }),
        showSettings && /* @__PURE__ */ jsx(Modal, { onClose: () => setShowSettings(false), t, children: /* @__PURE__ */ jsxs("div", { style: { padding: "20px 24px" }, children: [
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }, children: [
            /* @__PURE__ */ jsx("div", { style: { fontWeight: 700, fontSize: 17 }, children: "Settings" }),
            /* @__PURE__ */ jsx("button", { onClick: () => setShowSettings(false), style: { background: "none", border: "none", cursor: "pointer", color: t.muted }, children: /* @__PURE__ */ jsx(XIcon, {}) })
          ] }),
          [
            { label: "Compact card view", desc: "Show smaller cards in kanban", value: compactView, set: setCompactView },
            { label: "Auto-sort alphabetically", desc: "Keep cards sorted A\u2013Z automatically", value: autoSort, set: (v) => {
              setAutoSort(v);
              if (v) handleSort("company");
              else clearSort();
            } }
          ].map(({ label, desc, value, set }) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: `1px solid ${t.border}` }, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { style: { fontSize: 14, fontWeight: 500 }, children: label }),
              /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: t.muted, marginTop: 2 }, children: desc })
            ] }),
            /* @__PURE__ */ jsx(
              "div",
              {
                onClick: () => set(!value),
                style: {
                  width: 42,
                  height: 24,
                  borderRadius: 12,
                  cursor: "pointer",
                  background: value ? "#3b82f6" : t.border,
                  position: "relative",
                  transition: "background 0.2s",
                  flexShrink: 0
                },
                children: /* @__PURE__ */ jsx("div", { style: {
                  position: "absolute",
                  top: 3,
                  left: value ? 21 : 3,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "#fff",
                  transition: "left 0.2s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
                } })
              }
            )
          ] }, label)),
          /* @__PURE__ */ jsxs("div", { style: { marginTop: 20 }, children: [
            /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: t.muted, marginBottom: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }, children: "Stats" }),
            /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }, children: STAGES.map((s) => /* @__PURE__ */ jsxs("div", { style: { background: t.surfaceAlt, borderRadius: 8, padding: "12px 14px", textAlign: "center" }, children: [
              /* @__PURE__ */ jsx("div", { style: { fontSize: 22, fontWeight: 700, color: s.dot }, children: apps.filter((a) => a.stage === s.key).length }),
              /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: t.muted, marginTop: 2 }, children: s.label })
            ] }, s.key)) })
          ] })
        ] }) })
      ]
    }
  );
};

// entry.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var root = createRoot(document.getElementById("root"));
root.render(/* @__PURE__ */ jsx2(Component, {}));
