
import { useState } from "react";
import {
  Bug,
  Sparkles,
  Code2,
  ChevronDown,
  Copy,
  Download,
  Trash2,
  RefreshCw,
  Check,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  FileCode2,
  Terminal,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const languages = [
  "Python",
  "Java",
  "JavaScript",
  "C",
  "C++",
  "TypeScript",
];

function getDemoDebugResult(language, code, errorMessage) {
  const lowerCode = code.toLowerCase();

  if (
    lowerCode.includes("pritn(") ||
    lowerCode.includes("console.lgo")
  ) {
    return {
      title: "Possible spelling mistake",
      type: "Syntax / spelling issue",
      explanation:
        "The function name appears to be misspelled. Programming languages require exact function names.",
      fix: "Check the spelling of the function and replace it with the correct name.",
      correctedCode: code
        .replaceAll("pritn(", "print(")
        .replaceAll("console.lgo", "console.log"),
    };
  }

  if (
    lowerCode.includes("print(") &&
    language === "Python" &&
    lowerCode.includes("if __name__")
  ) {
    return {
      title: "No obvious issue detected in this demo",
      type: "Basic code check",
      explanation:
        "Your code contains a recognizable Python program structure. This frontend demo cannot perform a complete syntax or runtime analysis.",
      fix: "Run the program in a Python environment and check the terminal output.",
      correctedCode: code,
    };
  }

  if (errorMessage.trim()) {
    return {
      title: "Error requires further analysis",
      type: "Error message provided",
      explanation:
        `You provided this error: "${errorMessage}". The demo can display the error, but it cannot reliably identify the root cause without a real debugging engine.`,
      fix:
        "Check the line number, variable names, data types, and function calls mentioned in the error message.",
      correctedCode: code,
    };
  }

  return {
    title: "Initial code review completed",
    type: "Basic code check",
    explanation:
      "The sample debugger did not find one of its built-in example mistakes. This does not mean the code is error-free.",
    fix:
      "Run your code and provide the exact terminal error for a more focused analysis.",
    correctedCode: code,
  };
}

const exampleCode = `def calculate_average(numbers):
    total = 0

    for number in numbers:
        total += number

    average = total / len(numbers)
    pritn("Average:", average)

calculate_average([10, 20, 30])`;

export default function DebugAssistant() {
  const [language, setLanguage] = useState("Python");
  const [sourceCode, setSourceCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [correctedCode, setCorrectedCode] = useState("");
  const [debugResult, setDebugResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleDebug() {
    if (!sourceCode.trim()) return;

    setLoading(true);
    setDebugResult(null);
    setCorrectedCode("");
    setCopied(false);

    // Temporary frontend demo. Real AI debugging will be connected later.
    setTimeout(() => {
      const result = getDemoDebugResult(
        language,
        sourceCode,
        errorMessage
      );

      setDebugResult(result);
      setCorrectedCode(result.correctedCode);
      setLoading(false);
    }, 900);
  }

  async function handleCopy() {
    if (!correctedCode) return;

    try {
      await navigator.clipboard.writeText(correctedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function handleDownload() {
    if (!correctedCode) return;

    const extensions = {
      Python: "py",
      Java: "java",
      JavaScript: "js",
      C: "c",
      "C++": "cpp",
      TypeScript: "ts",
    };

    const blob = new Blob([correctedCode], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `codepilot-debugged.${extensions[language] || "txt"}`;
    link.click();

    URL.revokeObjectURL(url);
  }

  function handleClear() {
    setSourceCode("");
    setErrorMessage("");
    setCorrectedCode("");
    setDebugResult(null);
    setCopied(false);
  }

  function handleExample() {
    setLanguage("Python");
    setSourceCode(exampleCode);
    setErrorMessage("NameError: name 'pritn' is not defined");
    setCorrectedCode("");
    setDebugResult(null);
  }

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F5F5F5]">
      <main className="mx-auto max-w-[1500px] p-5 md:p-8">

        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-[#B6FF39]">
              <Sparkles size={16} />
              AI-powered debugging
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Debug Assistant<span className="text-[#245BFF]">.</span>
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Find errors, understand problems, and improve your code.
            </p>
          </div>

          <button
            onClick={handleExample}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#101216] px-4 py-3 text-sm text-gray-300 transition hover:border-[#245BFF]/50 hover:text-white"
          >
            <Code2 size={17} />
            Load example
          </button>
        </div>

        {/* Language selector */}
        <section className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/[0.08] bg-[#101216] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold">Programming language</h2>
            <p className="mt-1 text-xs text-gray-500">
              Select the language of your source code.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
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
        </section>

        {/* Source code and error input */}
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">

          {/* Source code editor */}
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101216]">
            <div className="flex items-center justify-between border-b border-white/[0.07] p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#245BFF]/10 p-2">
                  <FileCode2 size={19} className="text-[#245BFF]" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold">Source code</h2>
                  <p className="mt-1 text-[10px] text-gray-500">
                    Paste your problematic code
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-white/[0.05] px-3 py-1 text-[10px] text-gray-400">
                {language}
              </span>
            </div>

            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#0C0E12] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-gray-400">
                source.{language === "Python" ? "py" : language === "Java" ? "java" : language === "C" ? "c" : language === "C++" ? "cpp" : language === "TypeScript" ? "ts" : "js"}
              </span>
            </div>

            <textarea
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              spellCheck={false}
              placeholder={"// Paste your code here...\n\n// CodePilot will help you analyze it."}
              className="min-h-[380px] w-full resize-y bg-[#0B0D11] p-5 font-mono text-xs leading-7 text-[#B6FF39] outline-none placeholder:text-gray-700 sm:text-sm"
            />

            <div className="border-t border-white/[0.07] px-4 py-3 text-[10px] text-gray-500">
              {sourceCode ? `${sourceCode.split("\n").length} lines of code` : "No source code added"}
            </div>
          </div>

          {/* Error message panel */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101216]">
            <div className="flex items-center gap-3 border-b border-white/[0.07] p-4">
              <div className="rounded-lg bg-red-400/10 p-2">
                <AlertTriangle size={19} className="text-red-400" />
              </div>

              <div>
                <h2 className="text-sm font-semibold">Error details</h2>
                <p className="mt-1 text-[10px] text-gray-500">
                  Optional: paste the error from your terminal
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <label className="mb-3 text-sm font-medium">
                Error message
              </label>

              <textarea
                value={errorMessage}
                onChange={(e) => setErrorMessage(e.target.value)}
                placeholder={"Example:\nNameError: name 'pritn' is not defined\n\nLine 6"}
                className="min-h-[190px] w-full resize-y rounded-xl border border-white/10 bg-[#08090B] p-4 font-mono text-xs leading-6 text-red-300 outline-none placeholder:text-gray-600 focus:border-red-400/50"
              />

              <div className="mt-5 rounded-xl border border-[#245BFF]/15 bg-[#245BFF]/[0.05] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#245BFF]">
                  <Lightbulb size={15} />
                  Helpful tip
                </div>

                <p className="mt-2 text-xs leading-5 text-gray-400">
                  Copy the complete error message from your terminal,
                  including the line number, for better debugging results.
                </p>
              </div>

              <button
                onClick={handleDebug}
                disabled={!sourceCode.trim() || loading}
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-[#245BFF] py-3.5 text-sm font-semibold transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? (
                  <>
                    <RefreshCw size={17} className="animate-spin" />
                    Analyzing code...
                  </>
                ) : (
                  <>
                    <Bug size={17} />
                    Debug Code
                    <Sparkles size={16} className="text-[#B6FF39]" />
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-[10px] text-gray-600">
                Frontend demo · AI debugging integration coming later
              </p>
            </div>
          </div>
        </section>

        {/* Debug results */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101216]">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-[#B6FF39]/10 p-2.5">
                <ShieldCheck size={20} className="text-[#B6FF39]" />
              </div>

              <div>
                <h2 className="font-semibold">Debugging results</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Error analysis and suggested correction
                </p>
              </div>
            </div>

            {debugResult && (
              <span className="rounded-full bg-[#B6FF39]/10 px-3 py-1.5 text-[10px] font-semibold text-[#B6FF39]">
                Analysis complete
              </span>
            )}
          </div>

          {!debugResult ? (
            <div className="flex min-h-[240px] flex-col items-center justify-center px-5 py-12 text-center">
              <div className="mb-4 rounded-2xl bg-white/[0.04] p-4">
                <Bug size={30} className="text-gray-500" />
              </div>

              <h3 className="font-semibold">No analysis yet</h3>

              <p className="mt-2 max-w-md text-xs leading-6 text-gray-500">
                Add your source code and click Debug Code.
                Your debugging analysis will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-5 p-5">

              {/* Analysis */}
              <div className="rounded-xl border border-red-400/15 bg-red-400/[0.04] p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-red-400">
                  <AlertTriangle size={16} />
                  {debugResult.type}
                </div>

                <h3 className="mt-3 text-lg font-bold">
                  {debugResult.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {debugResult.explanation}
                </p>
              </div>

              {/* Suggested fix */}
              <div className="rounded-xl border border-[#245BFF]/15 bg-[#245BFF]/[0.04] p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#245BFF]">
                  <Lightbulb size={16} />
                  Suggested fix
                </div>

                <p className="mt-3 text-sm leading-6 text-gray-300">
                  {debugResult.fix}
                </p>
              </div>

              {/* Corrected code */}
              <div className="overflow-hidden rounded-xl border border-white/[0.08]">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0C0E12] p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={17} className="text-[#B6FF39]" />
                    <span className="text-sm font-semibold">
                      Suggested code
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
                  value={correctedCode}
                  onChange={(e) => setCorrectedCode(e.target.value)}
                  spellCheck={false}
                  className="min-h-[260px] w-full resize-y bg-[#0B0D11] p-5 font-mono text-xs leading-7 text-[#B6FF39] outline-none sm:text-sm"
                />
              </div>

              <p className="text-xs leading-5 text-gray-500">
                This is a sample frontend analysis, not a guarantee that
                the corrected code is error-free. Run and test your code.
              </p>
            </div>
          )}
        </section>

        {/* Footer actions */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-[#101216] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#245BFF]/10 p-2">
              <Terminal size={17} className="text-[#245BFF]" />
            </div>

            <div>
              <p className="text-xs font-semibold">CodePilot Debug Assistant</p>
              <p className="mt-1 text-[10px] text-gray-500">
                Analyze and improve your source code.
              </p>
            </div>
          </div>

          <button
            onClick={handleClear}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-xs text-gray-400 transition hover:border-red-400/40 hover:text-red-400"
          >
            <Trash2 size={14} />
            Clear workspace
          </button>
        </div>
      </main>
    </div>
  );
}
