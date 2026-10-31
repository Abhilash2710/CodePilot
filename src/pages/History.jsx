
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Code2,
  Search,
  Clock3,
  Trash2,
  Download,
  Filter,
  Bug,
  BookOpen,
  Zap,
  ShieldCheck,
  FlaskConical,
  History as HistoryIcon,
  FileCode2,
} from "lucide-react";

function History() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Student Management System",
      type: "Code Generation",
      language: "Java",
      date: "Today, 10:30 AM",
      description: "Generated a student management program.",
    },
    {
      id: 2,
      title: "Python Error Fix",
      type: "Debugging",
      language: "Python",
      date: "Today, 9:15 AM",
      description: "Reviewed and fixed a syntax error.",
    },
    {
      id: 3,
      title: "Inheritance Example",
      type: "Code Explanation",
      language: "Java",
      date: "Yesterday, 4:20 PM",
      description: "Explained inheritance with an example.",
    },
    {
      id: 4,
      title: "Duplicate Number Finder",
      type: "Code Optimization",
      language: "JavaScript",
      date: "Yesterday, 2:10 PM",
      description: "Reviewed possible performance improvements.",
    },
    {
      id: 5,
      title: "Portfolio Website",
      type: "Code Review",
      language: "JavaScript",
      date: "28 October, 11:45 AM",
      description: "Checked code quality and readability.",
    },
    {
      id: 6,
      title: "Addition Function",
      type: "Test Case Generation",
      language: "JavaScript",
      date: "27 October, 3:30 PM",
      description: "Created sample test cases for a function.",
    },
  ]);

  const typeIcons = {
    "Code Generation": Code2,
    Debugging: Bug,
    "Code Explanation": BookOpen,
    "Code Optimization": Zap,
    "Code Review": ShieldCheck,
    "Test Case Generation": FlaskConical,
  };

  const typeColors = {
    "Code Generation": "text-blue-400 bg-blue-400/10",
    Debugging: "text-lime-400 bg-lime-400/10",
    "Code Explanation": "text-purple-400 bg-purple-400/10",
    "Code Optimization": "text-orange-400 bg-orange-400/10",
    "Code Review": "text-cyan-400 bg-cyan-400/10",
    "Test Case Generation": "text-yellow-400 bg-yellow-400/10",
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(search.toLowerCase()) ||
      activity.language.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || activity.type === filter;

    return matchesSearch && matchesFilter;
  });

  const deleteActivity = (id) => {
    setActivities((previous) =>
      previous.filter((activity) => activity.id !== id)
    );
  };

  const clearHistory = () => {
    const confirmed = window.confirm(
      "Are you sure you want to clear your entire history?"
    );

    if (confirmed) {
      setActivities([]);
    }
  };

  const downloadHistory = () => {
    const report = activities
      .map(
        (item, index) =>
          `${index + 1}. ${item.title}\nType: ${item.type}\nLanguage: ${item.language}\nDate: ${item.date}\nDescription: ${item.description}`
      )
      .join("\n\n");

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "codepilot-history.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F5F5F5]">
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="rounded-lg border border-white/10 p-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft size={19} />
          </Link>

          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-[#245BFF] p-2">
              <Code2 size={20} />
            </div>
            <span className="text-xl font-bold">codepilot</span>
          </div>
        </div>

        <Link
          to="/dashboard"
          className="text-sm text-gray-400 hover:text-white"
        >
          Dashboard
        </Link>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <section className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-[#B6FF39]">
            <HistoryIcon size={16} />
            Activity Center
          </div>

          <h1 className="text-3xl font-bold md:text-4xl">
            Activity History
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            View and manage your previous coding activities.
          </p>
        </section>

        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#101216] p-5">
            <p className="text-sm text-gray-400">Total Activities</p>
            <h2 className="mt-3 text-3xl font-bold">
              {activities.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#101216] p-5">
            <p className="text-sm text-gray-400">Tools Used</p>
            <h2 className="mt-3 text-3xl font-bold text-[#245BFF]">
              {new Set(activities.map((item) => item.type)).size}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#101216] p-5">
            <p className="text-sm text-gray-400">Languages Used</p>
            <h2 className="mt-3 text-3xl font-bold text-[#B6FF39]">
              {new Set(activities.map((item) => item.language)).size}
            </h2>
          </div>
        </section>

        <section className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search activity..."
              className="w-full rounded-xl border border-white/10 bg-[#101216] py-3 pl-10 pr-4 text-sm outline-none focus:border-[#245BFF]"
            />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#101216] px-3">
            <Filter size={17} className="text-gray-500" />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="max-w-[230px] bg-transparent py-3 text-sm text-gray-300 outline-none"
            >
              <option value="All">All Activities</option>
              {Object.keys(typeIcons).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#101216]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-5">
            <div>
              <h2 className="font-semibold">Recent Activities</h2>
              <p className="mt-1 text-xs text-gray-500">
                {filteredActivities.length} activities found
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={downloadHistory}
                disabled={activities.length === 0}
                className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-300 hover:bg-white/5 disabled:opacity-40"
              >
                <Download size={15} />
                Export
              </button>

              <button
                onClick={clearHistory}
                disabled={activities.length === 0}
                className="flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 disabled:opacity-40"
              >
                <Trash2 size={15} />
                Clear all
              </button>
            </div>
          </div>

          <div className="divide-y divide-white/[0.07]">
            {filteredActivities.map((activity) => {
              const Icon = typeIcons[activity.type];

              return (
                <div
                  key={activity.id}
                  className="flex flex-col gap-4 p-5 transition hover:bg-white/[0.02] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <div
                      className={`rounded-xl p-3 ${typeColors[activity.type]}`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold">
                        {activity.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {activity.description}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
                          {activity.type}
                        </span>

                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
                          {activity.language}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <span className="flex items-center gap-2 whitespace-nowrap text-xs text-gray-500">
                      <Clock3 size={14} />
                      {activity.date}
                    </span>

                    <button
                      onClick={() => deleteActivity(activity.id)}
                      title="Delete activity"
                      className="rounded-lg p-2 text-gray-500 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredActivities.length === 0 && (
              <div className="py-16 text-center">
                <FileCode2
                  size={35}
                  className="mx-auto mb-4 text-gray-500"
                />

                <h3 className="font-semibold">No activities found</h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try another search or filter.
                </p>
              </div>
            )}
          </div>
        </section>

        <footer className="mt-10 border-t border-white/10 pt-5 text-center text-xs text-gray-600">
          © 2026 CodePilot. Built for developers.
        </footer>
      </main>
    </div>
  );
}

export default History;
