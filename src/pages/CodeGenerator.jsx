
import { useState } from "react";
import {
  Code2,
  Sparkles,
  Copy,
  Download,
  Trash2,
  RefreshCw,
  Check,
  Terminal,
  ChevronDown,
  WandSparkles,
  FileCode2,
  Clock3,
  Zap,
} from "lucide-react";

const languages = [
  "JavaScript",
  "Python",
  "Java",
  "C",
  "C++",
  "TypeScript",
  "HTML",
  "CSS",
  "SQL",
];

const examples = [
  "Create a calculator using functions",
  "Write a program to check prime numbers",
  "Create a student management system",
];

function getDemoCode(language, prompt) {
  const safePrompt = prompt.trim() || "Generated program";

  const templates = {
    Python: `# ${safePrompt}\n\n\ndef main():\n    print("Hello from CodePilot!")\n    # Add your program logic here\n\n\nif __name__ == "__main__":\n    main()`,
    Java: `// ${safePrompt}\n\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from CodePilot!");\n        // Add your program logic here\n    }\n}`,
    JavaScript: `// ${safePrompt}\n\nfunction main() {\n  console.log("Hello from CodePilot!");\n  // Add your program logic here\n}\n\nmain();`,
    TypeScript: `// ${safePrompt}\n\nfunction main(): void {\n  console.log("Hello from CodePilot!");\n  // Add your program logic here\n}\n\nmain();`,
    C: `// ${safePrompt}\n#include <stdio.h>\n\nint main() {\n    printf("Hello from CodePilot!\\n");\n    // Add your program logic here\n    return 0;\n}`,
    "C++": `// ${safePrompt}\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello from CodePilot!" << endl;\n    // Add your program logic here\n    return 0;\n}`,
    HTML: `<!-- ${safePrompt} -->\n<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>CodePilot Project</title>\n</head>\n<body>\n  <h1>Hello from CodePilot!</h1>\n</body>\n</html>`,
    CSS: `/* ${safePrompt} */\n\nbody {\n  margin: 0;\n  font-family: Arial, sans-serif;\n  background: #08090B;\n  color: #F5F5F5;\n}\n\n/* Add your styles here */`,
    SQL: `-- ${safePrompt}\n\nCREATE TABLE students (\n    id INT PRIMARY KEY,\n    name VARCHAR(100),\n    department VARCHAR(50)\n);\n\nSELECT * FROM students;`,
  };

  return templates[language] || templates.JavaScript;
}

export default function CodeGenerator() {
  const [language, setLanguage] = useState("JavaScript");
  const [prompt, setPrompt] = useState("");
  const [code, setCode] = useState("");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleGenerate() {
    if (!prompt.trim()) return;

    setLoading(true);
    setGenerated(false);

    // Temporary frontend demo. Real AI generation will be connected later.
    setTimeout(() => {
      setCode(getDemoCode(language, prompt));
      setGenerated(true);
      setLoading(false);
    }, 800);
  }

  async function handleCopy() {
    if (!code) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function handleDownload() {
    if (!code) return;

    const extensions = {
      JavaScript: "js",
      Python: "py",
      Java: "java",
      C: "c",
      "C++": "cpp",
      TypeScript: "ts",
      HTML: "html",
      CSS: "css",
      SQL: "sql",
    };

    const blob = new Blob([code], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `codepilot-output.${extensions[language] || "txt"}`;
    link.click();

    URL.revokeObjectURL(url);
  }

  function handleClear() {
    setPrompt("");
    setCode("");
    setGenerated(false);
    setCopied(false);
  }

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F5F5F5]">
      <main className="mx-auto max-w-[1500px] p-5 md:p-8">

        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-[#B6FF39]">
              <Sparkles size={16} />
              AI-powered development
            </div>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              AI Code Generator<span className="text-[#245BFF]">.</span>
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Describe your idea and turn it into code.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#101216] px-4 py-2.5 text-xs text-gray-400">
            <span className="h-2 w-2 rounded-full bg-[#B6FF39]" />
            Generator workspace
          </div>
        </div>

        {/* Main workspace */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[0.9fr_1.1fr]">

          {/* Prompt panel */}
          <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101216]">
            <div className="flex items-center gap-3 border-b border-white/[0.07] p-5">
              <div className="rounded-xl bg-[#245BFF]/15 p-2.5">
                <WandSparkles size={20} className="text-[#245BFF]" />
              </div>
              <div>
                <h2 className="font-semibold">Describe your idea</h2>
                <p className="mt-1 text-xs text-gray-500">
                  Tell CodePilot what you want to build
                </p>
              </div>
            </div>

            <div className="space-y-6 p-5">
              <div>
                <label className="mb-3 block text-sm font-medium">
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

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Your prompt
                  </label>
                  <span className="text-[10px] text-gray-500">
                    {prompt.length}/2000
                  </span>
                </div>

                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value.slice(0, 2000))}
                  placeholder="Example: Create a student management system with add, update, delete and search functionality..."
                  rows={9}
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#08090B] p-4 text-sm leading-7 text-white outline-none placeholder:text-gray-600 focus:border-[#245BFF]"
                />
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold text-gray-400">
                  TRY AN EXAMPLE
                </p>

                <div className="flex flex-wrap gap-2">
                  {examples.map((example) => (
                    <button
                      key={example}
                      onClick={() => setPrompt(example)}
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-[11px] text-gray-400 transition hover:border-[#245BFF]/50 hover:text-white"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#245BFF] py-3.5 text-sm font-semibold transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? (
                  <>
                    <RefreshCw size={17} className="animate-spin" />
                    Preparing code...
                  </>
                ) : (
                  <>
                    <Sparkles size={17} />
                    Generate Code
                    <Zap size={16} className="text-[#B6FF39]" />
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-gray-600">
                Frontend demo · AI model integration coming later
              </p>
            </div>
          </section>

          {/* Code editor panel */}
          <section className="flex min-h-[600px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101216]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#B6FF39]/10 p-2">
                  <FileCode2 size={19} className="text-[#B6FF39]" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold">Generated code</h2>
                  <p className="mt-1 text-[10px] text-gray-500">
                    {language} · Editor
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!code}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition hover:text-white disabled:opacity-30"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </button>

                <button
                  onClick={handleDownload}
                  disabled={!code}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition hover:text-white disabled:opacity-30"
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#0C0E12] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                <span className="ml-3 text-xs text-gray-400">
                  {`main.${language === "Python" ? "py" : language === "Java" ? "java" : language === "C++" ? "cpp" : language === "C" ? "c" : language === "HTML" ? "html" : language === "CSS" ? "css" : language === "SQL" ? "sql" : language === "TypeScript" ? "ts" : "js"}`}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B6FF39]" />
                {generated ? "Generated" : "Ready"}
              </div>
            </div>

            <div className="flex flex-1 bg-[#0B0D11]">
              <div className="hidden select-none flex-col gap-2 border-r border-white/[0.05] px-4 py-5 text-right font-mono text-xs text-gray-700 sm:flex">
                {Array.from(
                  { length: Math.max(code.split("\n").length, 15) },
                  (_, i) => (
                    <span key={i}>{i + 1}</span>
                  )
                )}
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                placeholder={"// Your generated code will appear here...\n\n// 1. Describe your idea\n// 2. Select a programming language\n// 3. Click Generate Code"}
                className="min-h-[480px] w-full resize-none bg-transparent p-5 font-mono text-xs leading-7 text-[#B6FF39] outline-none placeholder:text-gray-700 sm:text-sm"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] bg-[#0C0E12] px-4 py-3">
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <Terminal size={14} />
                {code ? `${code.split("\n").length} lines` : "No code generated"}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white"
                >
                  <Trash2 size={14} />
                  Clear
                </button>

                <button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || loading}
                  className="flex items-center gap-1.5 text-xs text-[#B6FF39] hover:text-white disabled:opacity-30"
                >
                  <RefreshCw size={13} />
                  Regenerate
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom information */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-[#101216] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#245BFF]/10 p-2">
              <Clock3 size={17} className="text-[#245BFF]" />
            </div>
            <div>
              <p className="text-xs font-semibold">Your coding assistant</p>
              <p className="mt-1 text-[10px] text-gray-500">
                Create, edit and export code from one workspace.
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
    