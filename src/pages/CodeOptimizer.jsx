
import { useState } from "react";
import {
  Zap,
  Sparkles,
  Code2,
  ChevronDown,
  Copy,
  Download,
  Trash2,
  RefreshCw,
  Check,
  Lightbulb,
  FileCode2,
  Gauge,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const languages = ["JavaScript", "Python", "Java", "C", "C++", "TypeScript"];

const levels = ["Basic", "Balanced", "Advanced"];

const exampleCode = `function findDuplicates(numbers) {
    let duplicates = [];

    for (let i = 0; i < numbers.length; i++) {
        for (let j = 0; j < numbers.length; j++) {
            if (i !== j && numbers[i] === numbers[j]) {
                if (!duplicates.includes(numbers[i])) {
                    duplicates.push(numbers[i]);
                }
            }
        }
    }

    return duplicates;
}

console.log(findDuplicates([1, 2, 3, 2, 4, 3]));`;

function getOptimizedCode(language, code, level) {
  if (
    language === "JavaScript" &&
    code.includes("duplicates.includes(numbers[i])")
  ) {
    return code.replace(
      /function findDuplicates\(numbers\) \{[\s\S]*?\n\}/,
      `function findDuplicates(numbers) {
    const seen = new Set();
    const duplicates = new Set();

    for (const number of numbers) {
        if (seen.has(number)) {
            duplicates.add(number);
        } else {
            seen.add(number);
        }
    }

    return [...duplicates];
    }`
    );
  }

  if (language === "Python") {
    return `# ${level} optimization preview\n\n${code}\n\n# Review opportunities:\n# Consider using appropriate built-in functions,\n# reducing repeated calculations, and improving readability.`;
  }

  return `// ${level} optimization preview for ${language}\n\n${code}\n\n// Review opportunities:\n// 1. Reduce repeated operations.\n// 2. Improve variable naming.\n// 3. Simplify complex conditions.\n// 4. Consider efficient data structures.`;
}

function createSuggestions(language, level) {
  return [
    {
      title: "Improve data structure usage",
      description:
        "Choose a data structure that makes lookup and insertion more efficient.",
      impact: "Performance",
    },
    {
      title: "Reduce unnecessary operations",
      description:
        "Avoid repeating calculations or searching the same values multiple times.",
      impact: "Efficiency",
    },
    {
      title: "Improve readability",
      description:
        "Use clear variable names and organize code into smaller logical blocks.",
      impact: "Maintainability",
    },
    {
      title: "Review edge cases",
      description:
        `Test empty inputs, duplicate values, and boundary conditions for your ${language} program (${level} level).`,
      impact: "Reliability",
    },
  ];
}

export default function CodeOptimizer() {
  const [language, setLanguage] = useState("JavaScript");
  const [level, setLevel] = useState("Balanced");
  const [sourceCode, setSourceCode] = useState("");
  const [optimizedCode, setOptimizedCode] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [optimized, setOptimized] = useState(false);

  function handleOptimize() {
    if (!sourceCode.trim()) return;

    setLoading(true);
    setOptimized(false);
    setSuggestions([]);

    // Temporary frontend demo. Real AI optimization comes later.
    setTimeout(() => {
      setOptimizedCode(
        getOptimizedCode(language, sourceCode, level)
      );
      setSuggestions(createSuggestions(language, level));
      setOptimized(true);
      setLoading(false);
    }, 900);
  }

  function handleExample() {
    setLanguage("JavaScript");
    setLevel("Balanced");
    setSourceCode(exampleCode);
    setOptimizedCode("");
    setSuggestions([]);
    setOptimized(false);
  }

  function handleClear() {
    setSourceCode("");
    setOptimizedCode("");
    setSuggestions([]);
    setOptimized(false);
    setCopied(false);
  }

  async function handleCopy() {
    if (!optimizedCode) return;

    try {
      await navigator.clipboard.writeText(optimizedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function handleDownload() {
    if (!optimizedCode) return;

    const extensions = {
      JavaScript: "js",
      Python: "py",
      Java: "java",
      C: "c",
      "C++": "cpp",
      TypeScript: "ts",
    };

    const blob = new Blob([optimizedCode], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `codepilot-optimized.${extensions[language] || "txt"}`;
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F5F5F5]">
      <main className="mx-auto max-w-[1500px] p-5 md:p-8">

        {/* Heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-[#B6FF39]">
              <Sparkles size={16} />
              AI-powered optimization
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Code Optimizer<span className="text-[#245BFF]">.</span>
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Improve performance, readability, and code quality.
            </p>
          </div>

          <button
            onClick={handleExample}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#101216] px-4 py-3 text-sm text-gray-300 hover:border-[#245BFF]/50 hover:text-white"
          >
            <Code2 size={17} />
            Load example
          </button>
        </div>

        {/* Settings */}
        <section className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-[#101216] p-5">
            <label className="mb-3 block text-sm font-semibold">
              Programming language
            </label>

            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full appearance-none rounded-xl border border-white/10 bg-[#08090B] px-4 py-3 text-sm text-white outline-none focus:border-[#245BFF]"
              >
                {languages.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-4 top-3.5 text-gray-500"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#101216] p-5">
            <label className="mb-3 block text-sm font-semibold">
              Optimization level
            </label>

            <div className="grid grid-cols-3 gap-2">
              {levels.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setLevel(item);
                    setOptimized(false);
                  }}
                  className={`rounded-xl border px-2 py-3 text-xs font-medium transition ${
                    level === item
                      ? "border-[#245BFF] bg-[#245BFF]/15 text-white"
                      : "border-white/10 bg-[#08090B] text-gray-400 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Source editor */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101216]">
          <div className="flex items-center gap-3 border-b border-white/[0.07] p-5">
            <div className="rounded-xl bg-[#245BFF]/15 p-2.5">
              <FileCode2 size={20} className="text-[#245BFF]" />
            </div>

            <div>
              <h2 className="font-semibold">Original source code</h2>
              <p className="mt-1 text-xs text-gray-500">
                Paste the code you want to optimize.
              </p>
            </div>
          </div>

          <textarea
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            spellCheck={false}
            placeholder={"// Paste your source code here...\n\n// CodePilot will suggest improvements."}
            className="min-h-[300px] w-full resize-y bg-[#0B0D11] p-5 font-mono text-xs leading-7 text-[#B6FF39] outline-none placeholder:text-gray-700 sm:text-sm"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] p-4">
            <span className="text-[10px] text-gray-500">
              {sourceCode ? `${sourceCode.split("\n").length} lines` : "No code added"}
            </span>

            <div className="flex gap-2">
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 hover:text-white"
              >
                <Trash2 size={14} />
                Clear
              </button>

              <button
                onClick={handleOptimize}
                disabled={!sourceCode.trim() || loading}
                className="flex items-center gap-2 rounded-xl bg-[#245BFF] px-5 py-3 text-sm font-semibold hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Zap size={17} />
                    Optimize Code
                    <Sparkles size={15} className="text-[#B6FF39]" />
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101216]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#B6FF39]/10 p-2.5">
                <Gauge size={21} className="text-[#B6FF39]" />
              </div>

              <div>
                <h2 className="font-semibold">Optimization results</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Review the optimized code and suggestions.
                </p>
              </div>
            </div>

            {optimized && (
              <span className="rounded-full bg-[#B6FF39]/10 px-3 py-1.5 text-[10px] font-semibold text-[#B6FF39]">
                Optimization preview ready
              </span>
            )}
          </div>

          {!optimized ? (
            <div className="flex min-h-[240px] flex-col items-center justify-center px-5 py-12 text-center">
              <div className="mb-4 rounded-2xl bg-white/[0.04] p-4">
                <Zap size={30} className="text-gray-500" />
              </div>

              <h3 className="font-semibold">Ready to optimize</h3>

              <p className="mt-2 max-w-md text-xs leading-6 text-gray-500">
                Add your code and click Optimize Code to see the demo output.
              </p>
            </div>
          ) : (
            <div className="space-y-6 p-5">

              {/* Suggestions */}
              <div>
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
                  <Lightbulb size={18} className="text-[#B6FF39]" />
                  Improvement suggestions
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {suggestions.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-white/[0.07] bg-[#0C0E12] p-4"
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <h3 className="text-sm font-semibold">
                          {item.title}
                        </h3>

                        <span className="rounded-full bg-[#245BFF]/10 px-2 py-1 text-[9px] text-[#245BFF]">
                          {item.impact}
                        </span>
                      </div>

                      <p className="text-xs leading-6 text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optimized code */}
              <div className="overflow-hidden rounded-xl border border-white/[0.08]">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0C0E12] p-4">
                  <div className="flex items-center gap-2">
                    <Check size={17} className="text-[#B6FF39]" />
                    <span className="text-sm font-semibold">
                      Optimized code
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 hover:text-white"
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                      {copied ? "Copied" : "Copy"}
                    </button>

                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 hover:text-white"
                    >
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                </div>

                <textarea
                  value={optimizedCode}
                  onChange={(e) => setOptimizedCode(e.target.value)}
                  spellCheck={false}
                  className="min-h-[300px] w-full resize-y bg-[#0B0D11] p-5 font-mono text-xs leading-7 text-[#B6FF39] outline-none sm:text-sm"
                />
              </div>

              <div className="rounded-xl border border-[#245BFF]/15 bg-[#245BFF]/[0.04] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#245BFF]">
                  <TrendingUp size={16} />
                  Optimization reminder
                </div>

                <p className="mt-2 text-xs leading-6 text-gray-400">
                  Always compare the output and run performance tests before
                  replacing your original code. This preview does not measure
                  actual execution speed.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Footer */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-[#101216] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#245BFF]/10 p-2">
              <ShieldCheck size={17} className="text-[#245BFF]" />
            </div>

            <div>
              <p className="text-xs font-semibold">CodePilot Optimizer</p>
              <p className="mt-1 text-[10px] text-gray-500">
                Improve code quality and maintainability.
              </p>
            </div>
          </div>

          <span className="rounded-full border border-[#B6FF39]/20 bg-[#B6FF39]/5 px-3 py-1.5 text-[10px] text-[#B6FF39]">
            Frontend preview
          </span>
        </div>
      </main>
    </div>
  );
}
