
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Code2,
  Plus,
  Search,
  FolderOpen,
  Clock3,
  MoreVertical,
  Trash2,
  ExternalLink,
  Filter,
  FileCode2,
} from "lucide-react";

function Projects() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Student Management System",
      language: "Java",
      description: "A system to manage student records and information.",
      status: "Completed",
      updated: "2 hours ago",
    },
    {
      id: 2,
      name: "Portfolio Website",
      language: "JavaScript",
      description: "Personal portfolio website with responsive design.",
      status: "In Progress",
      updated: "Yesterday",
    },
    {
      id: 3,
      name: "Library Management",
      language: "Python",
      description: "Library book tracking and management application.",
      status: "Completed",
      updated: "3 days ago",
    },
    {
      id: 4,
      name: "E-Commerce Website",
      language: "JavaScript",
      description: "Online shopping website with product listings.",
      status: "In Progress",
      updated: "4 days ago",
    },
    {
      id: 5,
      name: "Employee Database",
      language: "SQL",
      description: "Database design for employee records.",
      status: "Completed",
      updated: "1 week ago",
    },
    {
      id: 6,
      name: "Calculator Application",
      language: "C++",
      description: "A simple calculator using object-oriented programming.",
      status: "In Progress",
      updated: "2 weeks ago",
    },
  ]);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase());

    const matchesLanguage =
      languageFilter === "All" || project.language === languageFilter;

    return matchesSearch && matchesLanguage;
  });

  const deleteProject = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (confirmed) {
      setProjects((previous) =>
        previous.filter((project) => project.id !== id)
      );
    }
  };

  const getLanguageColor = (language) => {
    const colors = {
      Java: "text-orange-400 bg-orange-400/10",
      JavaScript: "text-yellow-300 bg-yellow-300/10",
      Python: "text-blue-400 bg-blue-400/10",
      "C++": "text-purple-400 bg-purple-400/10",
      SQL: "text-lime-400 bg-lime-400/10",
    };

    return colors[language] || "text-gray-400 bg-white/5";
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
        <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-[#B6FF39]">
              <FolderOpen size={16} />
              Your Workspace
            </div>

            <h1 className="text-3xl font-bold md:text-4xl">
              My Projects
            </h1>

            <p className="mt-3 text-sm text-gray-400">
              Manage and organize all your coding projects in one place.
            </p>
          </div>

          <button
            onClick={() => navigate("/code-generator")}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#245BFF] px-5 py-3 text-sm font-semibold hover:bg-blue-600"
          >
            <Plus size={18} />
            New Project
          </button>
        </section>

        <section className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#101216] p-5">
            <p className="text-sm text-gray-400">Total Projects</p>
            <h2 className="mt-3 text-3xl font-bold">{projects.length}</h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#101216] p-5">
            <p className="text-sm text-gray-400">Completed</p>
            <h2 className="mt-3 text-3xl font-bold text-[#B6FF39]">
              {projects.filter((p) => p.status === "Completed").length}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#101216] p-5">
            <p className="text-sm text-gray-400">In Progress</p>
            <h2 className="mt-3 text-3xl font-bold text-blue-400">
              {projects.filter((p) => p.status === "In Progress").length}
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
              placeholder="Search projects..."
              className="w-full rounded-xl border border-white/10 bg-[#101216] py-3 pl-10 pr-4 text-sm outline-none focus:border-[#245BFF]"
            />
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#101216] px-3">
            <Filter size={17} className="text-gray-500" />

            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="bg-transparent py-3 text-sm text-gray-300 outline-none"
            >
              <option value="All">All Languages</option>
              <option value="Java">Java</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="C++">C++</option>
              <option value="SQL">SQL</option>
            </select>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">All Projects</h2>
            <span className="text-xs text-gray-500">
              {filteredProjects.length} projects found
            </span>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#101216] py-16 text-center">
              <FolderOpen
                size={35}
                className="mx-auto mb-4 text-gray-500"
              />
              <h3 className="font-semibold">No projects found</h3>
              <p className="mt-2 text-sm text-gray-500">
                Try changing your search or language filter.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="rounded-2xl border border-white/10 bg-[#101216] p-5 transition hover:border-[#245BFF]/50"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <div className="rounded-xl bg-[#245BFF]/10 p-3">
                      <FileCode2
                        size={22}
                        className="text-[#245BFF]"
                      />
                    </div>

                    <button
                      onClick={() => deleteProject(project.id)}
                      className="rounded-lg p-2 text-gray-500 hover:bg-red-500/10 hover:text-red-400"
                      title="Delete project"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>

                  <h3 className="font-semibold">{project.name}</h3>

                  <p className="mt-2 min-h-10 text-sm leading-5 text-gray-500">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${getLanguageColor(
                        project.language
                      )}`}
                    >
                      {project.language}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        project.status === "Completed"
                          ? "bg-[#B6FF39]/10 text-[#B6FF39]"
                          : "bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock3 size={14} />
                      {project.updated}
                    </span>

                    <button
                      onClick={() => navigate("/code-generator")}
                      className="flex items-center gap-1 text-xs font-medium text-[#245BFF] hover:text-blue-400"
                    >
                      Open <ExternalLink size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="mt-10 border-t border-white/10 pt-5 text-center text-xs text-gray-600">
          © 2026 CodePilot. Built for developers.
        </footer>
      </main>
    </div>
  );
}

export default Projects;

