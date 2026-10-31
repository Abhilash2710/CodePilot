
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Code2,
  Bug,
  BookOpen,
  Zap,
  FolderOpen,
  History,
  Settings,
  Bell,
  Search,
  FlaskConical,
  Plus,
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  Clock3,
  Activity,
  ChevronRight,
  LogOut,
  Command,
} from "lucide-react";

const menuItems = [
  { label: "Overview", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Code Generator", icon: Code2, path: "/code-generator" },
  { label: "Debug Assistant", icon: Bug, path: "/debug-assistant" },
  { label: "Code Explainer", icon: BookOpen, path: "/code-explainer" },
  { label: "Code Optimizer", icon: Zap, path: "/code-optimizer" },
  { label: "Code Review", icon: Search, path: "/code-review" },
  { label: "My Projects", icon: FolderOpen, path: "/projects" },
  { label: "History", icon: History, path: "/history" },
  { label: "Test Case Generator", icon: FlaskConical, path: "/test-case-generator" },
];

const quickActions = [
  {
    title: "Generate Code",
    description: "Turn your ideas into working code.",
    icon: Code2,
    color: "text-[#245BFF]",
    bg: "bg-[#245BFF]/10",
    path: "/code-generator",
  },
  {
    title: "Debug Code",
    description: "Find and fix errors in your code.",
    icon: Bug,
    color: "text-[#B6FF39]",
    bg: "bg-[#B6FF39]/10",
    path: "/debug-assistant",
  },
  {
    title: "Explain Code",
    description: "Understand complex code easily.",
    icon: BookOpen,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    path: "/code-explainer",
  },
  {
    title: "Optimize Code",
    description: "Improve performance and quality.",
    icon: Zap,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    path: "/code-optimizer",
  },
];

const projects = [
  {
    name: "Student Management System",
    language: "Java",
    updated: "2 hours ago",
    status: "Completed",
    color: "bg-orange-400",
  },
  {
    name: "Portfolio Website",
    language: "JavaScript",
    updated: "Yesterday",
    status: "In progress",
    color: "bg-yellow-300",
  },
  {
    name: "Library Management",
    language: "Python",
    updated: "3 days ago",
    status: "Completed",
    color: "bg-blue-400",
  },
];

const activities = [
  {
    title: "Code generated",
    detail: "Student Management System",
    time: "2 hours ago",
    icon: Code2,
  },
  {
    title: "Code debugging",
    detail: "Fixed 3 errors in Python code",
    time: "Yesterday",
    icon: Bug,
  },
  {
    title: "Code explained",
    detail: "Java inheritance example",
    time: "2 days ago",
    icon: BookOpen,
  },
];

function Sidebar({ activeMenu, open, setOpen }) {
  const navigate = useNavigate();

  return (
    <>
      {open && (
        <button
          aria-label="Close sidebar"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/[0.07] bg-[#0D0F13] transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand */}
        <div className="flex h-20 items-center justify-between border-b border-white/[0.07] px-6">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#245BFF]">
              <Command size={21} className="text-white" />
            </div>

            <span className="text-xl font-bold tracking-tight">
              code<span className="text-[#245BFF]">pilot</span>
            </span>
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <X size={21} />
          </button>
        </div>

        {/* Navigation */}
        <div className="px-4 pt-7">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
            Workspace
          </p>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = activeMenu === item.label;

              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setOpen(false);
                    navigate(item.path);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                    active
                      ? "bg-[#245BFF]/15 font-semibold text-white"
                      : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <Icon
                    size={18}
                    className={active ? "text-[#245BFF]" : ""}
                  />

                  {item.label}

                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#B6FF39]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom sidebar */}
        <div className="mt-auto p-4">
          <div className="mb-4 rounded-2xl border border-[#245BFF]/20 bg-[#245BFF]/[0.07] p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-[#245BFF]/20">
              <Sparkles size={18} className="text-[#B6FF39]" />
            </div>

            <p className="text-sm font-semibold">Your AI workspace</p>

            <p className="mt-1 text-xs leading-5 text-gray-400">
              Your coding assistant is ready to help.
            </p>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-full rounded-full bg-[#245BFF]" />
            </div>

            <p className="mt-2 text-[10px] text-gray-500">
              Workspace preview
            </p>
          </div>

          <button
            onClick={() => navigate("/settings")}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-400 hover:bg-white/[0.04] hover:text-white"
          >
            <Settings size={18} />
            Settings
          </button>

          <Link
            to="/login"
            className="mt-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-400 hover:bg-white/[0.04] hover:text-white"
          >
            <LogOut size={18} />
            Sign out
          </Link>
        </div>
      </aside>
    </>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const currentPath = window.location.pathname;

  const activeMenu =
    menuItems.find((item) => item.path === currentPath)?.label || "Overview";

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F5F5F5]">
      <Sidebar
        activeMenu={activeMenu}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      <div className="min-h-screen lg:pl-64">
        {/* Top navigation */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/[0.07] bg-[#08090B]/90 px-5 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-400 hover:text-white lg:hidden"
            >
              <Menu size={23} />
            </button>

            <div>
              <p className="text-xs text-gray-500">Workspace /</p>
              <h2 className="text-sm font-semibold">{activeMenu}</h2>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="relative hidden md:block">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="w-56 rounded-xl border border-white/10 bg-[#111318] py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#245BFF]"
              />
            </div>

            <button
              aria-label="Notifications"
              className="relative rounded-xl border border-white/10 p-2.5 text-gray-400 hover:text-white"
            >
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#B6FF39]" />
            </button>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#245BFF]/40 bg-[#245BFF]/15 text-sm font-bold text-white">
              D
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="mx-auto max-w-[1500px] p-5 md:p-8">
          {/* Welcome section */}
          <section className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm text-[#B6FF39]">
                <Sparkles size={15} />
                Your AI-powered coding workspace
              </p>

              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                Welcome back, Developer
                <span className="text-[#245BFF]">.</span>
              </h1>

              <p className="mt-2 text-sm text-gray-400">
                What would you like to build today?
              </p>
            </div>

            <button
              onClick={() => navigate("/code-generator")}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#245BFF] px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-950/30 transition hover:bg-blue-600"
            >
              <Plus size={18} />
              New Project
            </button>
          </section>

          {/* Statistics */}
          <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Total Projects",
                value: "12",
                note: "Your saved projects",
                icon: FolderOpen,
                color: "text-[#245BFF]",
                bg: "bg-[#245BFF]/10",
              },
              {
                title: "Code Generated",
                value: "48",
                note: "Generated code snippets",
                icon: Code2,
                color: "text-[#B6FF39]",
                bg: "bg-[#B6FF39]/10",
              },
              {
                title: "Bugs Fixed",
                value: "26",
                note: "Debugging sessions",
                icon: Bug,
                color: "text-purple-400",
                bg: "bg-purple-400/10",
              },
              {
                title: "Time Saved",
                value: "8.5 hrs",
                note: "Estimated time saved",
                icon: Clock3,
                color: "text-orange-400",
                bg: "bg-orange-400/10",
              },
            ].map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-white/[0.07] bg-[#101216] p-5 transition hover:border-white/15"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">{stat.title}</p>

                    <div className={`rounded-xl p-2.5 ${stat.bg}`}>
                      <Icon size={19} className={stat.color} />
                    </div>
                  </div>

                  <h3 className="mt-5 text-3xl font-bold">{stat.value}</h3>

                  <p className="mt-1 text-xs text-gray-500">{stat.note}</p>
                </div>
              );
            })}
          </section>

          {/* Quick actions */}
          <section className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Quick actions</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Choose an AI tool to get started
                </p>
              </div>

              <span className="hidden text-xs text-gray-500 sm:block">
                4 tools available
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.title}
                    onClick={() => navigate(action.path)}
                    className="group rounded-2xl border border-white/[0.07] bg-[#101216] p-5 text-left transition hover:-translate-y-1 hover:border-[#245BFF]/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className={`rounded-xl p-3 ${action.bg}`}>
                        <Icon size={21} className={action.color} />
                      </div>

                      <ArrowUpRight
                        size={18}
                        className="text-gray-600 transition group-hover:text-white"
                      />
                    </div>

                    <h3 className="mt-5 font-semibold">{action.title}</h3>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      {action.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Projects and activity */}
          <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_1fr]">
            {/* Recent projects */}
            <div className="rounded-2xl border border-white/[0.07] bg-[#101216]">
              <div className="flex items-center justify-between border-b border-white/[0.07] p-5">
                <div>
                  <h2 className="font-bold">Recent projects</h2>
                  <p className="mt-1 text-xs text-gray-500">
                    Continue where you left off
                  </p>
                </div>

                <button
                  onClick={() => navigate("/projects")}
                  className="flex items-center gap-1 text-xs text-[#245BFF] hover:text-blue-400"
                >
                  View all <ChevronRight size={15} />
                </button>
              </div>

              <div className="divide-y divide-white/[0.06]">
                {filteredProjects.map((project) => (
                  <div
                    key={project.name}
                    className="flex flex-col justify-between gap-3 p-5 transition hover:bg-white/[0.02] sm:flex-row sm:items-center"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05]">
                        <Code2 size={20} className="text-gray-300" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold">
                          {project.name}
                        </h3>

                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                          <span
                            className={`h-2 w-2 rounded-full ${project.color}`}
                          />
                          {project.language}
                          <span>·</span>
                          {project.updated}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-[10px] font-semibold ${
                        project.status === "Completed"
                          ? "bg-[#B6FF39]/10 text-[#B6FF39]"
                          : "bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                ))}

                {filteredProjects.length === 0 && (
                  <p className="p-6 text-sm text-gray-500">
                    No matching projects found.
                  </p>
                )}
              </div>
            </div>

            {/* Recent activity */}
            <div className="rounded-2xl border border-white/[0.07] bg-[#101216]">
              <div className="border-b border-white/[0.07] p-5">
                <h2 className="font-bold">Recent activity</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Your latest workspace actions
                </p>
              </div>

              <div className="space-y-6 p-5">
                {activities.map((activity, index) => {
                  const Icon = activity.icon;

                  return (
                    <div key={index} className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#245BFF]/10">
                        <Icon size={18} className="text-[#245BFF]" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold">
                          {activity.title}
                        </h3>

                        <p className="mt-1 truncate text-xs text-gray-400">
                          {activity.detail}
                        </p>

                        <p className="mt-2 text-[10px] text-gray-600">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mx-5 mb-5 rounded-xl border border-[#B6FF39]/10 bg-[#B6FF39]/[0.04] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#B6FF39]">
                  <Activity size={15} />
                  CodePilot workspace
                </div>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  Your workspace is ready. Start a new coding task whenever you like.
                </p>
              </div>
            </div>
          </section>

          <footer className="mt-8 flex flex-col justify-between gap-2 border-t border-white/[0.07] pt-5 text-[11px] text-gray-600 sm:flex-row">
            <p>© 2026 CodePilot. Built for developers.</p>
            <p>AI-powered coding workspace</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
