import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Filter,
  ArrowUpDown,
  Zap,
  Search,
  Maximize2,
  Settings,
  ChevronDown,
  Circle,
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
} from "lucide-react";

type HabitKey = "workout" | "meditate" | "sleep" | "journal" | "study";

interface DayRow {
  day: string;
  workout: boolean;
  meditate: boolean;
  sleep: boolean;
  journal: boolean;
  study: boolean;
}

const NotionCheckbox = ({
  checked,
  onToggle,
}: {
  checked: boolean;
  onToggle: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center transition-all duration-150",
        "hover:bg-[#232323]",
        checked
          ? "bg-[#2f6fed] border-[#2f6fed]"
          : "bg-transparent border-[#5a5a5a]"
      )}
    >
      {checked ? <Check className="w-4 h-4 text-white" strokeWidth={3} /> : null}
    </button>
  );
};

export const Component = () => {
  const [habits, setHabits] = useState<DayRow[]>([
    { day: "Monday", workout: false, meditate: false, sleep: false, journal: false, study: false },
    { day: "Tuesday", workout: false, meditate: false, sleep: false, journal: false, study: false },
    { day: "Wednesday", workout: false, meditate: false, sleep: false, journal: false, study: false },
    { day: "Thursday", workout: false, meditate: false, sleep: false, journal: false, study: false },
    { day: "Friday", workout: false, meditate: false, sleep: false, journal: false, study: false },
    { day: "Saturday", workout: false, meditate: false, sleep: false, journal: false, study: false },
    { day: "Sunday", workout: false, meditate: false, sleep: false, journal: false, study: false },
  ]);

  const toggleHabit = (dayIndex: number, key: HabitKey) => {
    setHabits((prev) =>
      prev.map((row, i) => {
        if (i !== dayIndex) return row;
        return {
          ...row,
          [key]: !row[key],
        };
      })
    );
  };

  const getColumnTotal = (key: HabitKey) =>
    habits.filter((row) => row[key]).length;

  const getTotalChecked = () =>
    habits.reduce((total, row) => {
      return (
        total +
        (row.workout ? 1 : 0) +
        (row.meditate ? 1 : 0) +
        (row.sleep ? 1 : 0) +
        (row.journal ? 1 : 0) +
        (row.study ? 1 : 0)
      );
    }, 0);

  const columns: { key: HabitKey; label: string; icon: any }[] = [
    { key: "workout", label: "Workout", icon: Dumbbell },
    { key: "meditate", label: "Meditate", icon: Brain },
    { key: "sleep", label: "Sleep (8hrs)", icon: Moon },
    { key: "journal", label: "Journal", icon: PenLine },
    { key: "study", label: "Study", icon: BookOpen },
  ];

  return (
    <div className="w-full min-h-screen bg-[#0f0f0f] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#151515] rounded-xl border border-[#2a2a2a] shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-[#2a2a2a]">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-5 h-5 text-gray-400" />
                  <h1 className="text-[22px] font-semibold text-white">
                    Weekly Habit Tracker
                  </h1>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1d1d1d] rounded-md border border-[#2a2a2a]">
                  <Heart className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-sm text-gray-300">Daily Habits</span>
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex items-center gap-1">
                {[Filter, ArrowUpDown, Zap, Search, Maximize2, Settings].map(
                  (Icon, idx) => (
                    <button
                      key={idx}
                      className="p-2 hover:bg-[#1d1d1d] rounded-md transition-colors"
                    >
                      <Icon className="w-4 h-4 text-gray-400" />
                    </button>
                  )
                )}

                <button className="ml-2 bg-[#2f6fed] hover:bg-[#275fe0] text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium">
                  <span>New</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#171717] border-b border-[#2a2a2a]">
                  <th className="text-left px-6 py-3 text-[13px] font-medium text-gray-400 border-r border-[#2a2a2a] w-52">
                    <div className="flex items-center gap-2">
                      <Circle className="w-3.5 h-3.5" />
                      <span>Day</span>
                    </div>
                  </th>

                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="text-left px-6 py-3 text-[13px] font-medium text-gray-400 border-r border-[#2a2a2a]"
                    >
                      <div className="flex items-center gap-2">
                        <col.icon className="w-3.5 h-3.5" />
                        <span>{col.label}</span>
                      </div>
                    </th>
                  ))}

                  <th className="text-center px-4 py-3 text-sm font-medium text-gray-400 border-r border-[#2a2a2a] w-16">
                    <Plus className="w-4 h-4 mx-auto" />
                  </th>

                  <th className="text-center px-4 py-3 text-sm font-medium text-gray-400 w-16">
                    <MoreHorizontal className="w-4 h-4 mx-auto" />
                  </th>
                </tr>
              </thead>

              <tbody>
                {habits.map((row, dayIndex) => (
                  <tr
                    key={row.day}
                    className="border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition-colors"
                  >
                    <td className="px-6 py-4 border-r border-[#2a2a2a]">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-gray-500" />
                        {/* ✅ Off-white Day text */}
                        <span className="font-medium text-[#e6e6e6]">
                          {row.day}
                        </span>
                      </div>
                    </td>

                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-6 py-4 border-r border-[#2a2a2a]"
                      >
                        <NotionCheckbox
                          checked={row[col.key]}
                          onToggle={() => toggleHabit(dayIndex, col.key)}
                        />
                      </td>
                    ))}

                    <td className="px-4 py-4 border-r border-[#2a2a2a]"></td>
                    <td className="px-4 py-4"></td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr className="bg-[#171717]">
                  <td className="px-6 py-3 border-r border-[#2a2a2a]">
                    <span className="text-[11px] tracking-wide text-gray-500 font-medium">
                      CHECKED {getTotalChecked()}
                    </span>
                  </td>

                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-6 py-3 border-r border-[#2a2a2a]"
                    >
                      <span className="text-[11px] text-gray-500">
                        {getColumnTotal(col.key)}
                      </span>
                    </td>
                  ))}

                  <td className="px-4 py-3 border-r border-[#2a2a2a]"></td>
                  <td className="px-4 py-3"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
