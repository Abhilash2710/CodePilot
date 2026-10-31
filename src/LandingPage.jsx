
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2, Menu, X, ArrowRight, Play, Sparkles,
  Bug, Brain, Zap, ShieldCheck, FlaskConical,
  Terminal, CheckCircle2, GitBranch, ChevronRight,
  Cpu, WandSparkles
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "AI Code Generation",
    description: "Turn plain English instructions into clean, structured code in seconds.",
    color: "blue",
  },
  {
    icon: Bug,
    title: "Intelligent Debugging",
    description: "Find bugs, understand errors and get intelligent fixes instantly.",
    color: "lime",
  },
  {
    icon: Brain,
    title: "Code Explanation",
    description: "Understand complex programming logic with simple explanations.",
    color: "blue",
  },
  {
    icon: Zap,
    title: "Code Optimization",
    description: "Improve performance, readability and overall code quality.",
    color: "lime",
  },
  {
    icon: FlaskConical,
    title: "Test Generation",
    description: "Generate meaningful test cases, including edge cases.",
    color: "blue",
  },
  {
    icon: ShieldCheck,
    title: "Code Review",
    description: "Discover potential vulnerabilities and improve coding standards.",
    color: "lime",
  },
];

const steps = [
  {
    number: "01",
    title: "Describe your idea",
    description: "Tell CodePilot what you want to build using natural language.",
  },
  {
    number: "02",
    title: "Generate your code",
    description: "Get structured code inside your intelligent development workspace.",
  },
  {
    number: "03",
    title: "Run and debug",
    description: "Execute your code, identify errors and apply intelligent fixes.",
  },
  {
    number: "04",
    title: "Build with confidence",
    description: "Optimize, test and improve your applications.",
  },
];

const technologies = [
  "React.js", "Python", "JavaScript", "Monaco Editor",
  "Gemini AI", "Docker"
];

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#245BFF]">
        <Terminal size={21} className="text-white" />
      </div>
      <span className="text-xl font-extrabold tracking-tight text-white">
        code<span className="text-[#245BFF]">pilot</span>
      </span>
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    ["Features", "#features"],
    ["How it works", "#how-it-works"],  
    ["Technology", "#technology"],
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/[0.07] bg-[#08090B]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />

        <div className="hidden items-center gap-9 md:flex">
          {links.map(([name, href]) => (
            <a key={name} href={href}
              className="text-sm text-gray-400 transition hover:text-white">
              {name}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <a href="/login" className="text-sm text-gray-300 hover:text-white">
  Sign in
</a>
          <a href="/register"
            className="flex items-center gap-2 rounded-lg bg-[#245BFF] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600">
            Get Started <ArrowRight size={15} />
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#101216] p-6 md:hidden">
          {links.map(([name, href]) => (
            <a key={name} href={href}
              onClick={() => setOpen(false)}
              className="block py-3 text-gray-300 hover:text-white">
              {name}
            </a>
          ))}
          <a
  href="/register"
  onClick={() => setOpen(false)}
  className="mt-3 block rounded-lg bg-[#245BFF] p-3 text-center font-semibold text-white"
>
  Get Started
</a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-36 md:pt-44">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#245BFF]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-60 h-96 w-96 rounded-full bg-[#B6FF39]/[0.06] blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-5xl text-center"
      >
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#245BFF]/30 bg-[#245BFF]/10 px-4 py-2 text-xs font-medium tracking-wide text-blue-300">
          <Sparkles size={14} />
          INTRODUCING YOUR AI CODING COMPANION
        </div>

        <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-7xl lg:text-8xl">
          Think less about bugs.
          <br />
          <span className="text-[#245BFF]">Build more.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
          Generate, debug, understand and optimize code.
          Everything you need to build better software,
          powered by artificial intelligence.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <a href="/register"
            className="flex items-center justify-center gap-2 rounded-lg bg-[#245BFF] px-7 py-4 font-semibold text-white transition hover:bg-blue-600">
            Start building <ArrowRight size={18} />
          </a>

          <a href="#workspace"
            className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-7 py-4 font-semibold text-white transition hover:bg-white/[0.08]">
            <Play size={17} /> Explore workspace
          </a>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
          <span className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-[#B6FF39]" />
            Multi-language coding
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-[#B6FF39]" />
            AI-powered debugging
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle2 size={15} className="text-[#B6FF39]" />
            Intelligent assistance
          </span>
        </div>
      </motion.div>
    </section>
  );
}

function EditorPreview() {
  return (
    <section id="workspace" className="px-4 pb-28 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-white/10 bg-[#101216] shadow-2xl shadow-[#245BFF]/10"
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-[#14171C] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs font-medium text-gray-400">
            CodePilot IDE
          </span>
          <div className="flex items-center gap-2 text-gray-400">
            <Sparkles size={15} />
            <span className="text-xs">AI Workspace</span>
          </div>
        </div>

        <div className="grid min-h-[390px] md:grid-cols-[55px_175px_1fr_260px]">
          <aside className="hidden flex-col items-center gap-7 border-r border-white/10 py-6 text-gray-500 md:flex">
            <Code2 size={19} className="text-[#245BFF]" />
            <Bug size={19} />
            <SearchIcon />
            <SettingsIcon />
          </aside>

          <aside className="hidden border-r border-white/10 p-4 md:block">
            <p className="mb-5 text-[10px] font-bold tracking-widest text-gray-500">
              EXPLORER
            </p>
            <p className="mb-3 text-xs text-gray-300">⌄ MY PROJECT</p>
            <p className="mb-3 rounded bg-[#245BFF]/10 px-2 py-2 text-xs text-blue-300">
              ● main.py
            </p>
            <p className="px-2 py-2 text-xs text-gray-400">○ utils.py</p>
            <p className="px-2 py-2 text-xs text-gray-400">○ README.md</p>
          </aside>

          <div className="min-w-0">
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <span className="text-xs text-blue-300">main.py</span>
              <span className="ml-auto text-[10px] text-gray-500">Python</span>
            </div>

            <div className="overflow-x-auto p-5 font-mono text-xs leading-8">
              <div><span className="mr-6 text-gray-600">01</span><span className="text-[#B6FF39]">def</span> <span className="text-blue-300">greet</span><span className="text-gray-300">(name):</span></div>
              <div><span className="mr-6 text-gray-600">02</span><span className="text-gray-300">    message = </span><span className="text-orange-300">"Hello, "</span> <span className="text-gray-300">+ name</span></div>
              <div><span className="mr-6 text-gray-600">03</span><span className="text-[#B6FF39]">    return</span> <span className="text-gray-300">message</span></div>
              <div><span className="mr-6 text-gray-600">04</span></div>
              <div><span className="mr-6 text-gray-600">05</span><span className="text-blue-300">print</span><span className="text-gray-300">(greet(</span><span className="text-orange-300">"Developer"</span><span className="text-gray-300">))</span></div>
            </div>

            <div className="border-t border-white/10 p-4">
              <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold text-gray-500">
                <Terminal size={14} /> TERMINAL
              </div>
              <p className="font-mono text-xs text-gray-400">$ python main.py</p>
              <p className="mt-2 font-mono text-xs text-[#B6FF39]">Hello, Developer</p>
            </div>
          </div>

          <aside className="border-t border-white/10 bg-[#14171C] p-4 md:border-l md:border-t-0">
            <div className="mb-5 flex items-center gap-2">
              <div className="rounded-md bg-[#245BFF] p-1.5">
                <Sparkles size={14} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-white">CodePilot AI</span>
              <span className="ml-auto rounded-full bg-[#B6FF39]/10 px-2 py-1 text-[9px] text-[#B6FF39]">ONLINE</span>
            </div>

            <div className="rounded-lg border border-white/10 bg-[#08090B] p-3">
              <p className="text-xs leading-6 text-gray-300">
                Your code looks good! The greet function returns the correct message.
              </p>
            </div>

            <div className="mt-4 rounded-lg border border-[#245BFF]/30 bg-[#245BFF]/10 p-3">
              <p className="mb-2 text-[10px] font-semibold text-blue-300">AI SUGGESTION</p>
              <p className="text-xs leading-5 text-gray-300">
                Consider adding type hints to improve code readability.
              </p>
            </div>
          </aside>
        </div>
      </motion.div>

      <p className="mt-5 text-center text-xs text-gray-600">
        A preview of the CodePilot development workspace
      </p>
    </section>
  );
}

function SearchIcon() {
  return <span className="text-lg">⌕</span>;
}

function SettingsIcon() {
  return <span className="text-lg">⚙</span>;
}

function Features() {
  return (
    <section id="features" className="border-y border-white/[0.07] bg-[#0D0F12] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-2xl">
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-[#245BFF]">
            POWERFUL CAPABILITIES
          </p>
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-5xl">
            One workspace.
            <br />
            <span className="text-gray-500">Infinite possibilities.</span>
          </h2>
          <p className="mt-5 leading-7 text-gray-400">
            Everything a developer needs, enhanced with intelligent AI tools.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const accent = feature.color === "lime" ? "#B6FF39" : "#245BFF";

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group rounded-xl border border-white/[0.08] bg-[#14171C] p-7 transition hover:-translate-y-1 hover:border-white/20"
              >
                <div className="mb-7 inline-flex rounded-lg p-3"
                  style={{ backgroundColor: `${accent}15`, color: accent }}>
                  <Icon size={24} />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-7 text-gray-400">
                  {feature.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-gray-500 transition group-hover:text-white">
                  EXPLORE FEATURE <ChevronRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs font-bold tracking-[0.2em] text-[#245BFF]">
            SIMPLE WORKFLOW
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-5xl">
            From idea to execution.
          </h2>
          <p className="mt-5 text-gray-400">
            Your development workflow, made intelligent.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative border-t border-white/15 pt-6">
              <span className={`text-4xl font-extrabold ${index % 2 === 0 ? "text-[#245BFF]" : "text-[#B6FF39]"}`}>
                {step.number}
              </span>
              <h3 className="mt-6 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Technology() {
  return (
    <section id="technology" className="border-y border-white/[0.07] bg-[#0D0F12] px-6 py-20">
      <div className="mx-auto max-w-6xl text-center">
        <div className="mb-4 flex justify-center">
          <Cpu size={25} className="text-[#B6FF39]" />
        </div>
        <p className="text-xs font-bold tracking-[0.2em] text-[#245BFF]">
          BUILT WITH MODERN TECHNOLOGY
        </p>
        <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
          Powerful tools. One environment.
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {technologies.map((tech) => (
            <span key={tech}
              className="rounded-lg border border-white/10 bg-[#14171C] px-5 py-3 text-sm text-gray-300 transition hover:border-[#245BFF]/50 hover:text-white">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section id="get-started" className="px-6 py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[#245BFF]/30 bg-[#101727] px-6 py-16 text-center sm:px-12">
        <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full bg-[#245BFF]/20 blur-[100px]" />
        <div className="relative">
          <WandSparkles size={32} className="mx-auto mb-6 text-[#B6FF39]" />
          <h2 className="text-3xl font-extrabold text-white sm:text-5xl">
            Ready to build smarter?
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-gray-400">
            Your next great idea deserves a smarter development environment.
            Start building with CodePilot.
          </p>
          <a href="/register"
            className="mt-9 inline-flex items-center gap-2 rounded-lg bg-[#245BFF] px-7 py-4 font-semibold text-white transition hover:bg-blue-600">
            Get started <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <Logo />
          <p className="mt-3 text-xs text-gray-500">
            Build smarter. Debug faster.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 text-xs text-gray-400">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#how-it-works" className="hover:text-white">How it works</a>
          <a href="#technology" className="hover:text-white">Technology</a>
        </div>

        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} CodePilot. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#08090B] text-white">
      <Navbar />
      <main>
        <Hero />
        <EditorPreview />
        <Features />
        <HowItWorks />
        <Technology />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
