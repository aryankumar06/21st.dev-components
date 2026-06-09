// habit_tracker_component.tsx
import { useState, useRef, useEffect, useMemo } from "react";
import {
  Filter,
  ArrowUpDown,
  Zap,
  Search,
  Settings,
  ChevronDown,
  Dumbbell,
  Brain,
  Moon,
  PenLine,
  BookOpen,
  Plus,
  MoreHorizontal,
  FileText,
  Activity,
  Heart,
  Check,
  Sun,
  X,
  Trash2,
  SortAsc,
  SortDesc,
  Eye,
  EyeOff,
  RotateCcw,
  Copy,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var cn = (...classes) => classes.filter(Boolean).join(" ");
var ICON_OPTIONS = [
  { label: "Dumbbell", icon: Dumbbell },
  { label: "Brain", icon: Brain },
  { label: "Moon", icon: Moon },
  { label: "Pen", icon: PenLine },
  { label: "Book", icon: BookOpen },
  { label: "Heart", icon: Heart },
  { label: "Activity", icon: Activity },
  { label: "Zap", icon: Zap }
];
var DEFAULT_COLUMNS = [
  { key: "workout", label: "Workout", icon: Dumbbell, visible: true },
  { key: "meditate", label: "Meditate", icon: Brain, visible: true },
  { key: "sleep", label: "Sleep 8h", icon: Moon, visible: true },
  { key: "journal", label: "Journal", icon: PenLine, visible: true },
  { key: "study", label: "Study", icon: BookOpen, visible: true }
];
var DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}
var DropdownMenu = ({ items, onClose, dark, className = "" }) => {
  const base = dark ? "bg-[#1e1e1e] border-[#333] text-gray-200" : "bg-white border-[#e0e0e0] text-gray-700";
  const hov = dark ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-50";
  const divCol = dark ? "border-[#333]" : "border-gray-200";
  const dangerCls = dark ? "text-red-400 hover:bg-red-900/20" : "text-red-500 hover:bg-red-50";
  return /* @__PURE__ */ jsx("div", { className: cn("absolute z-50 min-w-[180px] rounded-lg border shadow-xl py-1 text-sm", base, className), children: items.map(
    (item, i) => item === "divider" ? /* @__PURE__ */ jsx("div", { className: cn("my-1 border-t", divCol) }, i) : /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => {
          item.action();
          onClose();
        },
        className: cn("w-full flex items-center gap-2.5 px-3 py-2 transition-colors text-left", item.danger ? dangerCls : hov),
        children: [
          item.icon && /* @__PURE__ */ jsx(item.icon, { className: "w-3.5 h-3.5 flex-shrink-0" }),
          /* @__PURE__ */ jsx("span", { children: item.label })
        ]
      },
      i
    )
  ) });
};
var NotionCheckbox = ({ checked, onToggle, dark }) => /* @__PURE__ */ jsx(
  "button",
  {
    type: "button",
    onClick: onToggle,
    "aria-label": checked ? "Uncheck" : "Check",
    className: cn(
      "w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center transition-all duration-150 flex-shrink-0",
      dark ? checked ? "bg-[#2f6fed] border-[#2f6fed]" : "bg-transparent border-[#5a5a5a] hover:bg-[#232323]" : checked ? "bg-[#2f6fed] border-[#2f6fed]" : "bg-transparent border-[#c0c0c0] hover:bg-[#f0f0f0]"
    ),
    children: checked && /* @__PURE__ */ jsx(Check, { className: "w-3 h-3 text-white", strokeWidth: 3.5 })
  }
);
var Modal = ({ title, onClose, dark, children }) => {
  const overlay = "bg-black/50";
  const modal = dark ? "bg-[#1a1a1a] border-[#333]" : "bg-white border-gray-200";
  const titleCls = dark ? "text-white" : "text-gray-900";
  const closeCls = dark ? "hover:bg-[#2a2a2a] text-gray-400" : "hover:bg-gray-100 text-gray-500";
  const divCol = dark ? "#333" : "#e5e5e5";
  return /* @__PURE__ */ jsx("div", { className: cn("fixed inset-0 z-50 flex items-center justify-center p-4", overlay), children: /* @__PURE__ */ jsxs("div", { className: cn("w-full max-w-md rounded-xl border shadow-2xl", modal), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b", style: { borderColor: divCol }, children: [
      /* @__PURE__ */ jsx("h2", { className: cn("font-semibold text-base", titleCls), children: title }),
      /* @__PURE__ */ jsx("button", { onClick: onClose, className: cn("p-1.5 rounded-md transition-colors", closeCls), children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-5", children })
  ] }) });
};
var Component = () => {
  const [dark, setDark] = useState(true);
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [habits, setHabits] = useState(
    () => DAYS.map((day) => {
      const row = { day };
      DEFAULT_COLUMNS.forEach((c) => {
        row[c.key] = false;
      });
      return row;
    })
  );
  const [sortConfig, setSortConfig] = useState(null);
  const [filterConfig, setFilterConfig] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [showNewRowModal, setShowNewRowModal] = useState(false);
  const [rowMenu, setRowMenu] = useState(null);
  const [colMenuKey, setColMenuKey] = useState(null);
  const [notification, setNotification] = useState(null);
  const [newColLabel, setNewColLabel] = useState("");
  const [newColIcon, setNewColIcon] = useState(ICON_OPTIONS[0]);
  const [newRowDay, setNewRowDay] = useState("");
  const filterRef = useRef(null);
  const sortRef = useRef(null);
  const rowMenuRef = useRef(null);
  const colMenuRef = useRef(null);
  useClickOutside(filterRef, () => setShowFilterMenu(false));
  useClickOutside(sortRef, () => setShowSortMenu(false));
  useClickOutside(rowMenuRef, () => setRowMenu(null));
  useClickOutside(colMenuRef, () => setColMenuKey(null));
  const notify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2200);
  };
  const toggleHabit = (dayIndex, key) => setHabits((prev) => prev.map((row, i) => i !== dayIndex ? row : { ...row, [key]: !row[key] }));
  const visibleCols = useMemo(() => columns.filter((c) => c.visible), [columns]);
  const getColumnTotal = (key) => habits.filter((r) => r[key]).length;
  const getTotalChecked = () => habits.reduce((t2, r) => t2 + visibleCols.reduce((s, c) => s + (r[c.key] ? 1 : 0), 0), 0);
  const totalPossible = habits.length * visibleCols.length;
  const pct = totalPossible === 0 ? 0 : Math.round(getTotalChecked() / totalPossible * 100);
  const displayedHabits = useMemo(() => {
    let rows = [...habits];
    if (searchQuery.trim()) rows = rows.filter((r) => r.day.toLowerCase().includes(searchQuery.toLowerCase()));
    if (filterConfig) rows = rows.filter((r) => r[filterConfig.key]);
    if (sortConfig) {
      rows.sort((a, b) => {
        const score = (r) => sortConfig.key === "completion" ? visibleCols.reduce((s, c) => s + (r[c.key] ? 1 : 0), 0) : a.day.localeCompare(b.day);
        if (sortConfig.key === "completion") {
          return sortConfig.dir === "asc" ? score(a) - score(b) : score(b) - score(a);
        }
        return sortConfig.dir === "asc" ? a.day.localeCompare(b.day) : b.day.localeCompare(a.day);
      });
    }
    return rows;
  }, [habits, searchQuery, filterConfig, sortConfig, visibleCols]);
  const handleAddColumn = () => {
    if (!newColLabel.trim()) return;
    const key = "col_" + Date.now();
    setColumns((prev) => [...prev, { key, label: newColLabel.trim(), icon: newColIcon.icon, visible: true }]);
    setHabits((prev) => prev.map((r) => ({ ...r, [key]: false })));
    setNewColLabel("");
    setNewColIcon(ICON_OPTIONS[0]);
    setShowAddColumnModal(false);
    notify(`"${newColLabel.trim()}" column added`);
  };
  const handleDeleteColumn = (key) => {
    setColumns((prev) => prev.filter((c) => c.key !== key));
    notify("Column removed");
  };
  const handleToggleColumnVis = (key) => setColumns((prev) => prev.map((c) => c.key === key ? { ...c, visible: !c.visible } : c));
  const handleAddRow = () => {
    if (!newRowDay.trim()) return;
    const newRow = { day: newRowDay.trim() };
    columns.forEach((c) => {
      newRow[c.key] = false;
    });
    setHabits((prev) => [...prev, newRow]);
    setNewRowDay("");
    setShowNewRowModal(false);
    notify(`"${newRowDay.trim()}" added`);
  };
  const handleDeleteRow = (day) => {
    setHabits((prev) => prev.filter((r) => r.day !== day));
    notify(`"${day}" deleted`);
  };
  const handleDuplicateRow = (row) => {
    const newRow = { ...row, day: row.day + " (copy)" };
    setHabits((prev) => [...prev, newRow]);
    notify("Row duplicated");
  };
  const handleClearRow = (day) => {
    setHabits((prev) => prev.map((r) => {
      if (r.day !== day) return r;
      const cleared = { day: r.day };
      columns.forEach((c) => {
        cleared[c.key] = false;
      });
      return cleared;
    }));
    notify("Row cleared");
  };
  const handleMoveRow = (day, dir) => {
    setHabits((prev) => {
      const idx = prev.findIndex((r) => r.day === day);
      if (idx < 0) return prev;
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const arr = [...prev];
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      return arr;
    });
  };
  const handleCheckAllForDay = (day) => {
    setHabits((prev) => prev.map((r) => {
      if (r.day !== day) return r;
      const all = { day: r.day };
      columns.forEach((c) => {
        all[c.key] = true;
      });
      return all;
    }));
    notify("All checked for " + day);
  };
  const handleResetAll = () => {
    setHabits((prev) => prev.map((r) => {
      const cleared = { day: r.day };
      columns.forEach((c) => {
        cleared[c.key] = false;
      });
      return cleared;
    }));
    notify("All habits reset");
  };
  const handleToggleAll = () => {
    const allChecked = getTotalChecked() === totalPossible;
    setHabits((prev) => prev.map((r) => {
      const row = { day: r.day };
      columns.forEach((c) => {
        row[c.key] = !allChecked;
      });
      return row;
    }));
    notify(allChecked ? "All unchecked" : "All habits checked \u{1F389}");
  };
  const applySort = (key, dir = "asc") => {
    setSortConfig({ key, dir });
    setShowSortMenu(false);
  };
  const t = dark ? {
    bg: "bg-[#0f0f0f]",
    card: "bg-[#151515]",
    border: "border-[#2a2a2a]",
    header: "bg-[#171717]",
    rowHover: "hover:bg-[#1a1a1a]",
    text: "text-white",
    subtext: "text-gray-400",
    muted: "text-gray-500",
    tag: "bg-[#1d1d1d]",
    tagText: "text-gray-300",
    iconBtn: "hover:bg-[#1d1d1d]",
    newBtn: "bg-[#2f6fed] hover:bg-[#275fe0]",
    dayText: "text-[#e6e6e6]",
    progressBg: "bg-[#2a2a2a]",
    progressFill: "bg-[#2f6fed]",
    cellBorder: "border-[#2a2a2a]",
    toggleBg: "bg-[#1d1d1d] hover:bg-[#2a2a2a] border-[#3a3a3a]",
    input: "bg-[#111] border-[#333] text-white placeholder-gray-600 focus:border-[#2f6fed]",
    pill: "bg-[#2f6fed]/15 text-[#6fa3ff] border-[#2f6fed]/30",
    notif: "bg-[#1e1e1e] border-[#333] text-white",
    settingRow: "border-[#2a2a2a] bg-[#111]",
    divColor: "#2a2a2a"
  } : {
    bg: "bg-[#f7f7f5]",
    card: "bg-white",
    border: "border-[#e5e5e5]",
    header: "bg-[#fafafa]",
    rowHover: "hover:bg-[#f9f9f9]",
    text: "text-[#1a1a1a]",
    subtext: "text-[#6b6b6b]",
    muted: "text-[#aaaaaa]",
    tag: "bg-[#f0f0ee]",
    tagText: "text-[#555]",
    iconBtn: "hover:bg-[#f0f0f0]",
    newBtn: "bg-[#2f6fed] hover:bg-[#275fe0]",
    dayText: "text-[#2a2a2a]",
    progressBg: "bg-[#e8e8e8]",
    progressFill: "bg-[#2f6fed]",
    cellBorder: "border-[#e8e8e8]",
    toggleBg: "bg-[#f0f0ee] hover:bg-[#e8e8e6] border-[#e0e0e0]",
    input: "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#2f6fed]",
    pill: "bg-blue-50 text-blue-600 border-blue-200",
    notif: "bg-white border-gray-200 text-gray-800",
    settingRow: "border-gray-200 bg-gray-50",
    divColor: "#e5e5e5"
  };
  const inputCls = cn("w-full px-3 py-2 rounded-lg border text-sm outline-none transition-colors", t.input);
  const labelCls = cn("block text-xs font-medium mb-1.5", t.subtext);
  const primaryBtn = cn("px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors", t.newBtn);
  const secondaryBtn = cn(
    "px-4 py-2 rounded-lg text-sm font-medium transition-colors border",
    dark ? "border-[#333] text-gray-300 hover:bg-[#1d1d1d]" : "border-gray-300 text-gray-600 hover:bg-gray-50"
  );
  return /* @__PURE__ */ jsxs("div", { className: cn("w-full min-h-screen p-3 sm:p-6 lg:p-8 transition-colors duration-300", t.bg), children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-5xl mx-auto", children: [
      notification && /* @__PURE__ */ jsx("div", { className: cn("fixed top-4 right-4 z-[60] px-4 py-2.5 rounded-lg border shadow-lg text-sm font-medium", t.notif), children: notification }),
      /* @__PURE__ */ jsxs("div", { className: cn("rounded-xl border shadow-xl overflow-hidden transition-colors duration-300", t.card, t.border), children: [
        /* @__PURE__ */ jsxs("div", { className: cn("px-4 sm:px-6 pt-5 pb-4 border-b", t.border), children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-0 sm:justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-2.5", children: [
                /* @__PURE__ */ jsx(Activity, { className: cn("w-5 h-5", t.subtext) }),
                /* @__PURE__ */ jsx("h1", { className: cn("text-lg sm:text-[22px] font-semibold", t.text), children: "Weekly Habit Tracker" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxs("div", { className: cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-md border", t.tag, t.border), children: [
                  /* @__PURE__ */ jsx(Heart, { className: "w-3.5 h-3.5 text-red-400" }),
                  /* @__PURE__ */ jsx("span", { className: cn("text-sm", t.tagText), children: "Daily Habits" })
                ] }),
                filterConfig && /* @__PURE__ */ jsxs("div", { className: cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium", t.pill), children: [
                  /* @__PURE__ */ jsx(Filter, { className: "w-3 h-3" }),
                  "Filtered",
                  /* @__PURE__ */ jsx("button", { onClick: () => setFilterConfig(null), className: "ml-0.5 opacity-60 hover:opacity-100", children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" }) })
                ] }),
                sortConfig && /* @__PURE__ */ jsxs("div", { className: cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium", t.pill), children: [
                  /* @__PURE__ */ jsx(ArrowUpDown, { className: "w-3 h-3" }),
                  "Sorted",
                  /* @__PURE__ */ jsx("button", { onClick: () => setSortConfig(null), className: "ml-0.5 opacity-60 hover:opacity-100", children: /* @__PURE__ */ jsx(X, { className: "w-3 h-3" }) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 flex-wrap", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative", ref: filterRef, children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      setShowFilterMenu(!showFilterMenu);
                      setShowSortMenu(false);
                    },
                    "aria-label": "Filter habits",
                    title: "Filter habits",
                    className: cn("p-2 rounded-md transition-colors", t.iconBtn, filterConfig ? t.pill : t.subtext),
                    children: /* @__PURE__ */ jsx(Filter, { className: "w-4 h-4" })
                  }
                ),
                showFilterMenu && /* @__PURE__ */ jsx(
                  DropdownMenu,
                  {
                    dark,
                    onClose: () => setShowFilterMenu(false),
                    className: "top-9 right-0",
                    items: [
                      { label: "Show all rows", icon: Eye, action: () => setFilterConfig(null) },
                      "divider",
                      ...visibleCols.map((col) => ({
                        label: `Checked: ${col.label}`,
                        icon: col.icon,
                        action: () => setFilterConfig({ key: col.key })
                      }))
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "relative", ref: sortRef, children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => {
                      setShowSortMenu(!showSortMenu);
                      setShowFilterMenu(false);
                    },
                    "aria-label": "Sort habits",
                    title: "Sort habits",
                    className: cn("p-2 rounded-md transition-colors", t.iconBtn, sortConfig ? t.pill : t.subtext),
                    children: /* @__PURE__ */ jsx(ArrowUpDown, { className: "w-4 h-4" })
                  }
                ),
                showSortMenu && /* @__PURE__ */ jsx(
                  DropdownMenu,
                  {
                    dark,
                    onClose: () => setShowSortMenu(false),
                    className: "top-9 right-0",
                    items: [
                      { label: "Name A \u2192 Z", icon: SortAsc, action: () => applySort("name", "asc") },
                      { label: "Name Z \u2192 A", icon: SortDesc, action: () => applySort("name", "desc") },
                      "divider",
                      { label: "Completion \u2191 (least)", icon: SortAsc, action: () => applySort("completion", "asc") },
                      { label: "Completion \u2193 (most)", icon: SortDesc, action: () => applySort("completion", "desc") },
                      "divider",
                      { label: "Clear sort", icon: X, action: () => setSortConfig(null) }
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleToggleAll,
                  "aria-label": "Toggle all habits",
                  title: "Toggle all habits",
                  className: cn("p-2 rounded-md transition-colors", t.iconBtn, t.subtext),
                  children: /* @__PURE__ */ jsx(Zap, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => {
                    setShowSearch(!showSearch);
                    if (showSearch) setSearchQuery("");
                  },
                  "aria-label": "Search habits",
                  title: "Search habits",
                  className: cn("p-2 rounded-md transition-colors", t.iconBtn, showSearch ? t.pill : t.subtext),
                  children: /* @__PURE__ */ jsx(Search, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setShowSettingsModal(true),
                  "aria-label": "Settings",
                  title: "Settings",
                  className: cn("p-2 rounded-md transition-colors", t.iconBtn, t.subtext),
                  children: /* @__PURE__ */ jsx(Settings, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setDark(!dark),
                  "aria-label": "Toggle theme",
                  title: "Toggle theme",
                  className: cn("p-2 rounded-md border transition-all duration-200", t.toggleBg, t.border),
                  children: dark ? /* @__PURE__ */ jsx(Sun, { className: "w-4 h-4 text-yellow-400" }) : /* @__PURE__ */ jsx(Moon, { className: cn("w-4 h-4", t.subtext) })
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => setShowNewRowModal(true),
                  className: cn("ml-1 text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm font-medium transition-colors", t.newBtn),
                  children: [
                    "New ",
                    /* @__PURE__ */ jsx(ChevronDown, { className: "w-3.5 h-3.5" })
                  ]
                }
              )
            ] })
          ] }),
          showSearch && /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx(
            "input",
            {
              autoFocus: true,
              type: "text",
              placeholder: "Search days...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: cn("w-full px-3 py-2 rounded-lg border text-sm outline-none", t.input)
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
              /* @__PURE__ */ jsx("span", { className: cn("text-xs font-medium", t.subtext), children: "Weekly Progress" }),
              /* @__PURE__ */ jsxs("span", { className: cn("text-xs font-semibold", t.text), children: [
                pct,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: cn("h-1.5 rounded-full overflow-hidden", t.progressBg), children: /* @__PURE__ */ jsx("div", { className: cn("h-full rounded-full transition-all duration-500", t.progressFill), style: { width: `${pct}%` } }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden sm:block overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full border-collapse", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: cn("border-b", t.header, t.border), children: [
            /* @__PURE__ */ jsx("th", { className: cn("text-left px-5 py-3 text-[12px] font-medium border-r w-44", t.subtext, t.cellBorder), children: "Day" }),
            visibleCols.map((col) => /* @__PURE__ */ jsxs("th", { className: cn("text-left px-5 py-3 text-[12px] font-medium border-r group relative", t.subtext, t.cellBorder), children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(col.icon, { className: "w-3.5 h-3.5 flex-shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap", children: col.label }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      setColMenuKey(colMenuKey === col.key ? null : col.key);
                    },
                    "aria-label": `Column options for ${col.label}`,
                    title: `Column options for ${col.label}`,
                    className: cn("ml-1 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none p-0.5 rounded transition-all", t.iconBtn),
                    children: /* @__PURE__ */ jsx(ChevronDown, { className: "w-3 h-3" })
                  }
                )
              ] }),
              colMenuKey === col.key && /* @__PURE__ */ jsx("div", { ref: colMenuRef, children: /* @__PURE__ */ jsx(
                DropdownMenu,
                {
                  dark,
                  onClose: () => setColMenuKey(null),
                  className: "top-8 left-0",
                  items: [
                    { label: "Sort A\u2192Z", icon: SortAsc, action: () => applySort("name", "asc") },
                    { label: "Sort Z\u2192A", icon: SortDesc, action: () => applySort("name", "desc") },
                    "divider",
                    { label: col.visible ? "Hide column" : "Show column", icon: col.visible ? EyeOff : Eye, action: () => handleToggleColumnVis(col.key) },
                    { label: "Delete column", icon: Trash2, danger: true, action: () => handleDeleteColumn(col.key) }
                  ]
                }
              ) })
            ] }, col.key)),
            /* @__PURE__ */ jsx("th", { className: cn("px-4 py-3 text-center border-r w-12", t.subtext, t.cellBorder), children: /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setShowAddColumnModal(true),
                title: "Add column",
                className: cn("p-1 rounded transition-colors mx-auto block", t.iconBtn),
                children: /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" })
              }
            ) }),
            /* @__PURE__ */ jsx("th", { className: cn("px-4 py-3 text-center w-12", t.subtext), children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "w-3.5 h-3.5 mx-auto" }) })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { children: [
            displayedHabits.map((row) => {
              const originalIndex = habits.findIndex((r) => r.day === row.day);
              return /* @__PURE__ */ jsxs("tr", { className: cn("border-b transition-colors duration-150 group", t.border, t.rowHover), children: [
                /* @__PURE__ */ jsx("td", { className: cn("px-5 py-3.5 border-r", t.cellBorder), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
                  /* @__PURE__ */ jsx(FileText, { className: cn("w-3.5 h-3.5 flex-shrink-0", t.muted) }),
                  /* @__PURE__ */ jsx("span", { className: cn("text-sm font-medium", t.dayText), children: row.day })
                ] }) }),
                visibleCols.map((col) => /* @__PURE__ */ jsx("td", { className: cn("px-5 py-3.5 border-r", t.cellBorder), children: /* @__PURE__ */ jsx(NotionCheckbox, { checked: row[col.key], onToggle: () => toggleHabit(originalIndex, col.key), dark }) }, col.key)),
                /* @__PURE__ */ jsx("td", { className: cn("px-4 py-3.5 border-r text-center", t.cellBorder), children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => handleCheckAllForDay(row.day),
                    title: "Check all for this day",
                    "aria-label": `Check all for ${row.day}`,
                    className: cn("opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none p-1 rounded transition-all", t.iconBtn, t.muted),
                    children: /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5" })
                  }
                ) }),
                /* @__PURE__ */ jsx("td", { className: "px-4 py-3.5 text-center relative", children: /* @__PURE__ */ jsxs("div", { className: "relative inline-block", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: (e) => {
                        e.stopPropagation();
                        setRowMenu(rowMenu?.day === row.day ? null : { day: row.day });
                      },
                      "aria-label": `Row options for ${row.day}`,
                      title: `Row options for ${row.day}`,
                      className: cn("opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none p-1 rounded transition-all", t.iconBtn, t.muted),
                      children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  rowMenu?.day === row.day && /* @__PURE__ */ jsx("div", { ref: rowMenuRef, className: "absolute right-0 z-40", children: /* @__PURE__ */ jsx(
                    DropdownMenu,
                    {
                      dark,
                      onClose: () => setRowMenu(null),
                      className: "top-6 right-0",
                      items: [
                        { label: "Check all", icon: Check, action: () => handleCheckAllForDay(row.day) },
                        { label: "Clear row", icon: RotateCcw, action: () => handleClearRow(row.day) },
                        { label: "Duplicate", icon: Copy, action: () => handleDuplicateRow(row) },
                        "divider",
                        { label: "Move up", icon: ArrowUp, action: () => handleMoveRow(row.day, -1) },
                        { label: "Move down", icon: ArrowDown, action: () => handleMoveRow(row.day, 1) },
                        "divider",
                        { label: "Delete row", icon: Trash2, danger: true, action: () => handleDeleteRow(row.day) }
                      ]
                    }
                  ) })
                ] }) })
              ] }, row.day);
            }),
            displayedHabits.length === 0 && /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: visibleCols.length + 3, className: cn("px-5 py-10 text-center text-sm", t.muted), children: "No rows match your search or filter." }) })
          ] }),
          /* @__PURE__ */ jsx("tfoot", { children: /* @__PURE__ */ jsxs("tr", { className: cn("border-t", t.header, t.border), children: [
            /* @__PURE__ */ jsx("td", { className: cn("px-5 py-2.5 border-r", t.cellBorder), children: /* @__PURE__ */ jsxs("span", { className: cn("text-[11px] tracking-wide font-medium", t.muted), children: [
              "TOTAL ",
              getTotalChecked(),
              "/",
              totalPossible
            ] }) }),
            visibleCols.map((col) => /* @__PURE__ */ jsx("td", { className: cn("px-5 py-2.5 border-r", t.cellBorder), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxs("span", { className: cn("text-[11px] font-medium", t.muted), children: [
                getColumnTotal(col.key),
                "/",
                habits.length
              ] }),
              /* @__PURE__ */ jsx("div", { className: cn("h-1 flex-1 rounded-full overflow-hidden ml-1", t.progressBg), children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn("h-full rounded-full", t.progressFill),
                  style: { width: habits.length ? `${getColumnTotal(col.key) / habits.length * 100}%` : "0%" }
                }
              ) })
            ] }) }, col.key)),
            /* @__PURE__ */ jsx("td", { className: cn("border-r", t.cellBorder) }),
            /* @__PURE__ */ jsx("td", {})
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "sm:hidden relative", children: [
          /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-2 px-4 py-2.5 border-b text-[11px] font-medium", t.header, t.border, t.subtext), children: [
            /* @__PURE__ */ jsx("span", { className: "w-28 flex-shrink-0", children: "Day" }),
            visibleCols.map((col) => /* @__PURE__ */ jsx("span", { className: "flex-1 flex justify-center", title: col.label, children: /* @__PURE__ */ jsx(col.icon, { className: "w-3.5 h-3.5" }) }, col.key)),
            /* @__PURE__ */ jsx("span", { className: "w-8" })
          ] }),
          displayedHabits.map((row) => {
            const originalIndex = habits.findIndex((r) => r.day === row.day);
            return /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-2 px-4 py-3 border-b transition-colors relative", t.border, t.rowHover), children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 w-28 flex-shrink-0", children: [
                /* @__PURE__ */ jsx(FileText, { className: cn("w-3 h-3 flex-shrink-0", t.muted) }),
                /* @__PURE__ */ jsx("span", { className: cn("text-sm font-medium", t.dayText), children: row.day.slice(0, 3) })
              ] }),
              visibleCols.map((col) => /* @__PURE__ */ jsx("div", { className: "flex-1 flex justify-center", children: /* @__PURE__ */ jsx(NotionCheckbox, { checked: row[col.key], onToggle: () => toggleHabit(originalIndex, col.key), dark }) }, col.key)),
              /* @__PURE__ */ jsxs("div", { className: "w-8 flex justify-center relative", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      setRowMenu(rowMenu?.day === row.day ? null : { day: row.day });
                    },
                    className: cn("p-1 rounded transition-colors", t.iconBtn, t.muted),
                    children: /* @__PURE__ */ jsx(MoreHorizontal, { className: "w-4 h-4" })
                  }
                ),
                rowMenu?.day === row.day && /* @__PURE__ */ jsx("div", { ref: rowMenuRef, className: "absolute right-0 top-7 z-40", children: /* @__PURE__ */ jsx(
                  DropdownMenu,
                  {
                    dark,
                    onClose: () => setRowMenu(null),
                    className: "",
                    items: [
                      { label: "Check all", icon: Check, action: () => handleCheckAllForDay(row.day) },
                      { label: "Clear row", icon: RotateCcw, action: () => handleClearRow(row.day) },
                      { label: "Duplicate", icon: Copy, action: () => handleDuplicateRow(row) },
                      "divider",
                      { label: "Delete", icon: Trash2, danger: true, action: () => handleDeleteRow(row.day) }
                    ]
                  }
                ) })
              ] })
            ] }, row.day);
          }),
          /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-2 px-4 py-2.5", t.header), children: [
            /* @__PURE__ */ jsxs("span", { className: cn("w-28 flex-shrink-0 text-[11px] tracking-wide font-medium", t.muted), children: [
              getTotalChecked(),
              "/",
              totalPossible
            ] }),
            visibleCols.map((col) => /* @__PURE__ */ jsx("div", { className: "flex-1 flex justify-center", children: /* @__PURE__ */ jsx("span", { className: cn("text-[11px] font-medium", t.muted), children: getColumnTotal(col.key) }) }, col.key)),
            /* @__PURE__ */ jsx("span", { className: "w-8" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: cn("px-4 sm:px-6 py-3 border-t flex items-center justify-between", t.border), children: [
          /* @__PURE__ */ jsxs("span", { className: cn("text-[11px]", t.muted), children: [
            getTotalChecked(),
            " of ",
            totalPossible,
            " habits completed"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxs("button", { onClick: handleResetAll, className: cn("text-[11px] flex items-center gap-1 px-2 py-1 rounded transition-colors", t.subtext, t.iconBtn), children: [
              /* @__PURE__ */ jsx(RotateCcw, { className: "w-3 h-3" }),
              "Reset"
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: () => setShowAddColumnModal(true), className: cn("text-[11px] flex items-center gap-1 px-2 py-1 rounded transition-colors", t.subtext, t.iconBtn), children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" }),
              "Add habit"
            ] })
          ] })
        ] })
      ] })
    ] }),
    showAddColumnModal && /* @__PURE__ */ jsx(Modal, { title: "Add Habit Column", onClose: () => setShowAddColumnModal(false), dark, children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelCls, children: "Column Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            autoFocus: true,
            type: "text",
            placeholder: "e.g. Hydration, Cold Shower...",
            value: newColLabel,
            onChange: (e) => setNewColLabel(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && handleAddColumn(),
            className: inputCls
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelCls, children: "Icon" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2", children: ICON_OPTIONS.map((opt) => /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setNewColIcon(opt),
            className: cn(
              "flex flex-col items-center gap-1.5 p-3 rounded-lg border text-xs transition-colors",
              newColIcon.label === opt.label ? cn("border-[#2f6fed]", dark ? "bg-[#2f6fed]/15 text-[#6fa3ff]" : "bg-blue-50 text-blue-600") : cn("border-transparent", t.iconBtn, t.subtext)
            ),
            children: [
              /* @__PURE__ */ jsx(opt.icon, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: opt.label })
            ]
          },
          opt.label
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 pt-1", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setShowAddColumnModal(false), className: secondaryBtn, children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { onClick: handleAddColumn, disabled: !newColLabel.trim(), className: primaryBtn, children: "Add Column" })
      ] })
    ] }) }),
    showNewRowModal && /* @__PURE__ */ jsx(Modal, { title: "Add New Row", onClose: () => setShowNewRowModal(false), dark, children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: labelCls, children: "Label" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            autoFocus: true,
            type: "text",
            placeholder: "e.g. Monday, Day 8, Week 2...",
            value: newRowDay,
            onChange: (e) => setNewRowDay(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && handleAddRow(),
            className: inputCls
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 pt-1", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setShowNewRowModal(false), className: secondaryBtn, children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { onClick: handleAddRow, disabled: !newRowDay.trim(), className: primaryBtn, children: "Add Row" })
      ] })
    ] }) }),
    showSettingsModal && /* @__PURE__ */ jsx(Modal, { title: "Settings", onClose: () => setShowSettingsModal(false), dark, children: /* @__PURE__ */ jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: cn(labelCls, "mb-2"), children: "Manage Columns" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-1.5", children: columns.map((col) => /* @__PURE__ */ jsxs("div", { className: cn("flex items-center justify-between px-3 py-2.5 rounded-lg border", t.settingRow), children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsx(col.icon, { className: cn("w-4 h-4", col.visible ? t.subtext : t.muted) }),
            /* @__PURE__ */ jsx("span", { className: cn("text-sm", col.visible ? t.text : t.muted), children: col.label })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleToggleColumnVis(col.key),
                title: col.visible ? "Hide" : "Show",
                className: cn("p-1.5 rounded transition-colors", t.iconBtn),
                children: col.visible ? /* @__PURE__ */ jsx(Eye, { className: cn("w-3.5 h-3.5", t.subtext) }) : /* @__PURE__ */ jsx(EyeOff, { className: cn("w-3.5 h-3.5", t.muted) })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDeleteColumn(col.key),
                className: cn("p-1.5 rounded transition-colors", dark ? "hover:bg-red-900/20 text-red-400" : "hover:bg-red-50 text-red-500"),
                children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ] }, col.key)) }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setShowSettingsModal(false);
              setShowAddColumnModal(true);
            },
            className: cn(
              "mt-2 w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-colors",
              dark ? "border-[#333] text-gray-400 hover:bg-[#1d1d1d]" : "border-gray-200 text-gray-500 hover:bg-gray-50"
            ),
            children: [
              /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
              "Add Column"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: cn("pt-4 border-t flex items-center justify-between"), style: { borderColor: t.divColor }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: cn("text-sm font-medium", t.text), children: "Reset All" }),
          /* @__PURE__ */ jsx("p", { className: cn("text-xs mt-0.5", t.muted), children: "Uncheck all habits for the week" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              handleResetAll();
              setShowSettingsModal(false);
            },
            className: cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors",
              dark ? "border-red-800 text-red-400 hover:bg-red-900/20" : "border-red-200 text-red-500 hover:bg-red-50"
            ),
            children: "Reset"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx("button", { onClick: () => setShowSettingsModal(false), className: primaryBtn, children: "Done" }) })
    ] }) })
  ] });
};
export {
  Component
};
