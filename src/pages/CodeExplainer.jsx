
import { useState } from "react";
import {
  BookOpen,
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
  Terminal,
  GraduationCap,
  ListChecks,
  Brain,
} from "lucide-react";

const languages = [
  "Java",
  "Python",
  "JavaScript",
  "C",
  "C++",
  "TypeScript",
];

const levels = ["Beginner", "Intermediate", "Advanced"];

const exampleCode = `public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;

        int sum = a + b;

        System.out.println("Sum = " + sum);
    }
}`;

function explainLine(line, index, level) {
  const trimmed = line.trim();

  if (!trimmed) {
    return {
      line: index + 1,
      code: line,
      explanation: "This is a blank line used to make the code easier to read.",
    };
  }

  if (trimmed.startsWith("//") || trimmed.startsWith("#")) {
    return {
      line: index + 1,
      code: line,
      explanation: "This is a comment. It provides information to the programmer and is not executed as normal code.",
    };
  }

  if (trimmed.includes("class ")) {
    return {
      line: index + 1,
      code: line,
      explanation: "This declares a class. A class is a blueprint used to organize data and methods.",
    };
  }

  if (trimmed.includes("public static void main")) {
    return {
      line: index + 1,
      code: line,
      explanation: "This is the main method. Java starts executing the program from this method.",
    };
  }

  if (trimmed.includes("System.out.println")) {
    return {
      line: index + 1,
      code: line,
      explanation: "This statement displays output in the console.",
    };
  }

  if (trimmed.includes("console.log")) {
    return {
      line: index + 1,
      code: line,
      explanation: "This displays a message or value in the browser console or JavaScript runtime.",
    };
  }

  if (trimmed.includes("print(")) {
    return {
      line: index + 1,
      code: line,
      explanation: "This print statement displays information as output.",
    };
  }

  if (trimmed.includes("for ") || trimmed.includes("while ")) {
    return {
      line: index + 1,
      code: line,
      explanation: "This starts a loop. A loop repeats a block of instructions while its condition is satisfied.",
    };
  }

  if (trimmed.includes("if ") || trimmed.startsWith("if(")) {
    return {
      line: index + 1,
      code: line,
      explanation: "This is a conditional statement. It checks a condition before executing the associated block.",
    };
  }

  if (trimmed.includes("return ")) {
    return {
      line: index + 1,
      code: line,
      explanation: "The return statement sends a value back from a function or method.",
    };
  }

  if (trimmed.includes("int ") || trimmed.includes("String ") || trimmed.includes("double ")) {
    return {
      line: index + 1,
      code: line,
      explanation: "This declares a variable. A variable stores data that can be used by the program.",
    };
  }

  if (trimmed === "}" || trimmed === "};") {
    return {
      line: index + 1,
      code: line,
      explanation: "This closing brace marks the end of a code block, method, or class.",
    };
  }

  if (trimmed.includes("=")) {
    return {
      line: index + 1,
      code: line,
      explanation: "This statement assigns a value or expression to a variable.",
    };
  }

  if (level === "Advanced") {
    return {
      line: index + 1,
      code: line,
      explanation: "This line contributes to the program's execution flow. Its exact role depends on the surrounding statements and language syntax.",
    };
  }

  return {
    line: index + 1,
    code: line,
    explanation: "This statement is part of the program's logic. Its purpose depends on the surrounding code.",
  };
}

function createExplanation(code, language, level) {
  const lines = code.split("\n");

  return {
    summary: `This ${language} code contains ${lines.length} lines. The selected explanation level is ${level}. Review the individual line explanations to understand the code structure and execution.`,
    purpose: "The program is organized into statements and code blocks. Each statement contributes to the overall program logic.",
    concepts: [
      "Program structure",
      "Variables and data",
      "Expressions and statements",
      "Program execution flow",
    ],
    lineExplanations: lines.map((line, index) =>
      explainLine(line, index, level)
    ),
  };
}

export default function CodeExplainer() {
  const [language, setLanguage] = useState("Java");
  const [level, setLevel] = useState("Beginner");
  const [sourceCode, setSourceCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleExplain() {
    if (!sourceCode.trim()) return;

    setLoading(true);
    setResult(null);

    // Temporary frontend demo. Real AI explanation will be connected later.
    setTimeout(() => {
      setResult(createExplanation(sourceCode, language, level));
      setLoading(false);
    }, 800);
  }

  function handleLoadExample() {
    setLanguage("Java");
    setLevel("Beginner");
    setSourceCode(exampleCode);
    setResult(null);
  }

  function handleClear() {
    setSourceCode("");
    setResult(null);
    setCopied(false);
  }

  async function handleCopy() {
    if (!result) return;

    const text = [
      "CODE SUMMARY",
      result.summary,
      "",
      "PURPOSE",
      result.purpose,
      "",
      "LINE-BY-LINE EXPLANATION",
      ...result.lineExplanations.map(
        (item) => `Line ${item.line}: ${item.code}\n${item.explanation}`
      ),
      "",
      "IMPORTANT CONCEPTS",
      ...result.concepts.map((item) => `- ${item}`),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function handleDownload() {
    if (!result) return;

    const content = [
      "CODEPILOT - CODE EXPLANATION",
      "",
      "SUMMARY",
      result.summary,
      "",
      "PURPOSE",
      result.purpose,
      "",
      "LINE-BY-LINE EXPLANATION",
      ...result.lineExplanations.map(
        (item) => `Line ${item.line}: ${item.code}\n${item.explanation}\n`
      ),
      "IMPORTANT CONCEPTS",
      ...result.concepts.map((item) => `- ${item}`),
    ].join("\n");

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "codepilot-explanation.txt";
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
              AI-powered learning assistant
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Code Explainer<span className="text-[#245BFF]">.</span>
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Understand code, concepts, and programming logic step by step.
            </p>
          </div>

          <button
            onClick={handleLoadExample}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#101216] px-4 py-3 text-sm text-gray-300 transition hover:border-[#245BFF]/50 hover:text-white"
          >
            <Code2 size={17} />
            Load example
          </button>
        </div>

        {/* Configuration */}
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
              Explanation level
            </label>

            <div className="grid grid-cols-3 gap-2">
              {levels.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setLevel(item);
                    setResult(null);
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

        {/* Code input */}
        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101216]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#245BFF]/15 p-2.5">
                <FileCode2 size={20} className="text-[#245BFF]" />
              </div>

              <div>
                <h2 className="font-semibold">Your source code</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Paste the code you want to understand.
                </p>
              </div>
            </div>

            <span className="rounded-full bg-white/[0.05] px-3 py-1.5 text-[10px] text-gray-400">
              {language}
            </span>
          </div>

          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0C0E12] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-gray-400">
              source code editor
            </span>
          </div>

          <textarea
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            spellCheck={false}
            placeholder={"// Paste your code here...\n\n// Select an explanation level\n// Click Explain Code"}
            className="min-h-[350px] w-full resize-y bg-[#0B0D11] p-5 font-mono text-xs leading-7 text-[#B6FF39] outline-none placeholder:text-gray-700 sm:text-sm"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] p-4">
            <span className="text-[10px] text-gray-500">
              {sourceCode ? `${sourceCode.split("\n").length} lines` : "No code added"}
            </span>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 hover:text-white"
              >
                <Trash2 size={14} />
                Clear
              </button>

              <button
                onClick={handleExplain}
                disabled={!sourceCode.trim() || loading}
                className="flex items-center gap-2 rounded-xl bg-[#245BFF] px-5 py-3 text-sm font-semibold transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    Explaining...
                  </>
                ) : (
                  <>
                    <BookOpen size={17} />
                    Explain Code
                    <Sparkles size={15} className="text-[#B6FF39]" />
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Explanation results */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101216]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#B6FF39]/10 p-2.5">
                <GraduationCap size={21} className="text-[#B6FF39]" />
              </div>

              <div>
                <h2 className="font-semibold">Code explanation</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Your personalized programming guide
                </p>
              </div>
            </div>

            {result && (
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
            )}
          </div>

          {!result ? (
            <div className="flex min-h-[260px] flex-col items-center justify-center px-5 py-12 text-center">
              <div className="mb-4 rounded-2xl bg-white/[0.04] p-4">
                <BookOpen size={30} className="text-gray-500" />
              </div>

              <h3 className="font-semibold">Ready to explain your code</h3>

              <p className="mt-2 max-w-md text-xs leading-6 text-gray-500">
                Add your source code and choose your preferred explanation
                level. Your explanation will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-6 p-5">

              {/* Summary */}
              <div className="rounded-xl border border-[#245BFF]/15 bg-[#245BFF]/[0.05] p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#245BFF]">
                  <Sparkles size={16} />
                  Overall summary
                </div>

                <p className="mt-3 text-sm leading-7 text-gray-300">
                  {result.summary}
                </p>
              </div>

              {/* Purpose */}
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <Lightbulb size={17} className="text-[#B6FF39]" />
                  What does this code do?
                </div>

                <p className="rounded-xl border border-white/[0.07] bg-[#0C0E12] p-4 text-sm leading-7 text-gray-400">
                  {result.purpose}
                </p>
              </div>

              {/* Line by line */}
              <div>
                <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
                  <ListChecks size={18} className="text-[#B6FF39]" />
                  Line-by-line explanation
                </div>

                <div className="space-y-3">
                  {result.lineExplanations.map((item) => (
                    <div
                      key={item.line}
                      className="rounded-xl border border-white/[0.07] bg-[#0C0E12] p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#245BFF]/15 text-xs font-bold text-[#245BFF]">
                          {item.line}
                        </span>

                        <code className="overflow-x-auto whitespace-pre font-mono text-xs text-[#B6FF39]">
                          {item.code || "(blank line)"}
                        </code>
                      </div>

                      <p className="ml-10 mt-3 text-xs leading-6 text-gray-400">
                        {item.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concepts */}
              <div>
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <Brain size={18} className="text-purple-400" />
                  Important concepts
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {result.concepts.map((concept) => (
                    <div
                      key={concept}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#0C0E12] p-4"
                    >
                      <Check size={16} className="text-[#B6FF39]" />
                      <span className="text-xs text-gray-300">
                        {concept}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-xs leading-5 text-gray-500">
                This is a sample rule-based explanation for frontend testing.
                It may not accurately describe every line. Real AI explanations
                will be added during backend integration.
              </p>
            </div>
          )}
        </section>

        {/* Footer */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-[#101216] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#245BFF]/10 p-2">
              <GraduationCap size={17} className="text-[#245BFF]" />
            </div>

            <div>
              <p className="text-xs font-semibold">CodePilot Learning Assistant</p>
              <p className="mt-1 text-[10px] text-gray-500">
                Learn programming one line at a time.
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
