
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Code2,
  Search,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Download,
  Trash2,
  Sparkles,
  FileCode2,
  Menu,
} from "lucide-react";

function CodeReview() {
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState("");
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadExample = () => {
    setLanguage("JavaScript");
    setCode(`function calculateTotal(items) {
  var total = 0;

  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }

  console.log("Total:", total);
  return total;
}`);
    setReview(null);
  };

  const reviewCode = () => {
    if (!code.trim()) {
      alert("Please enter your code first.");
      return;
    }

    setLoading(true);
    setReview(null);

    setTimeout(() => {
      const findings = [];

      if (/\bvar\b/.test(code)) {
        findings.push({
          type: "warning",
          title: "Avoid using var",
          description:
            "Use let or const instead of var to get safer and more predictable variable scope.",
        });
      }

      if (/console\.log/.test(code) || /print\(/.test(code)) {
        findings.push({
          type: "info",
          title: "Review debug statements",
          description:
            "Remove unnecessary debugging output before using your code in production.",
        });
      }

      if (/password|secret|api[_-]?key/i.test(code)) {
        findings.push({
          type: "danger",
          title: "Check sensitive information",
          description:
            "Make sure passwords, API keys, and other secrets are not hardcoded in your source code.",
        });
      }

      if (code.split("\n").some((line) => line.length > 100)) {
        findings.push({
          type: "warning",
          title: "Long lines detected",
          description:
            "Consider splitting long lines into smaller statements to improve readability.",
        });
      }

      if (findings.length === 0) {
        findings.push({
          type: "success",
          title: "No basic issues detected",
          description:
            "The basic checks did not find any obvious issues. A deeper review is still recommended.",
        });
      }

      setReview({
        score: Math.max(65, 100 - findings.length * 10),
        findings,
        summary:
          "Your code has been checked using basic code-review rules. Review the findings below to identify possible improvements.",
        suggestions: [
          "Use meaningful variable and function names.",
          "Handle unexpected inputs and edge cases.",
          "Keep functions small and focused on one responsibility.",
          "Add comments where the logic is difficult to understand.",
        ],
      });

      setLoading(false);
    }, 1200);
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    alert("Code copied!");
  };

  const downloadReview = () => {
    if (!review) return;

    const report = [
      "CODEPILOT - CODE REVIEW REPORT",
      "",
      `Language: ${language}`,
      `Review Score: ${review.score}/100`,
      "",
      "SUMMARY",
      review.summary,
      "",
      "FINDINGS",
      ...review.findings.map(
        (item, index) =>
          `${index + 1}. ${item.title}\n${item.description}`
      ),
      "",
      "SUGGESTIONS",
      ...review.suggestions.map((item, index) => `${index + 1}. ${item}`),
    ].join("\n");

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "code-review-report.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setCode("");
    setReview(null);
  };

  const findingStyle = {
    warning: {
      icon: AlertTriangle,
      color: "text-yellow-400",
      background: "bg-yellow-400/10",
    },
    danger: {
      icon: ShieldCheck,
      color: "text-red-400",
      background: "bg-red-400/10",
    },
    info: {
      icon: Search,
      color: "text-blue-400",
      background: "bg-blue-400/10",
    },
    success: {
      icon: CheckCircle2,
      color: "text-lime-400",
      background: "bg-lime-400/10",
    },
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
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-sm text-[#B6FF39]">
            <Sparkles size={16} />
            Code Quality Tool
          </div>

          <h1 className="text-3xl font-bold md:text-4xl">
            Code Review
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
            Analyze your code for readability, quality, potential bugs,
            and security concerns.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-[#101114] p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-semibold">
                <FileCode2 size={19} className="text-[#245BFF]" />
                Your Code
              </h2>

              <button
                onClick={loadExample}
                className="text-sm text-[#B6FF39] hover:underline"
              >
                Load example
              </button>
            </div>

            <label className="mb-2 block text-sm text-gray-400">
              Programming language
            </label>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mb-5 w-full rounded-lg border border-white/10 bg-[#08090B] p-3 text-sm outline-none focus:border-[#245BFF]"
            >
              {[
                "JavaScript",
                "Python",
                "Java",
                "C",
                "C++",
                "TypeScript",
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <label className="mb-2 block text-sm text-gray-400">
              Source code
            </label>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your source code here..."
              spellCheck="false"
              className="min-h-[350px] w-full resize-y rounded-xl border border-white/10 bg-[#08090B] p-4 font-mono text-sm leading-6 text-gray-200 outline-none focus:border-[#245BFF]"
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={reviewCode}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#245BFF] px-5 py-3 font-semibold transition hover:bg-blue-600 disabled:opacity-50"
              >
                <Search size={18} />
                {loading ? "Reviewing..." : "Review Code"}
              </button>

              <button
                onClick={copyCode}
                disabled={!code}
                className="rounded-lg border border-white/10 p-3 text-gray-300 hover:bg-white/5 disabled:opacity-40"
                title="Copy code"
              >
                <Copy size={18} />
              </button>

              <button
                onClick={clearAll}
                className="rounded-lg border border-white/10 p-3 text-gray-300 hover:bg-white/5"
                title="Clear"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-[#101114] p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-semibold">
                <ShieldCheck size={19} className="text-[#B6FF39]" />
                Review Results
              </h2>

              {review && (
                <button
                  onClick={downloadReview}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
                >
                  <Download size={16} />
                  Download
                </button>
              )}
            </div>

            {!review && !loading && (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <Search size={35} className="text-[#245BFF]" />
                </div>

                <h3 className="mb-2 text-lg font-semibold">
                  Ready to review your code?
                </h3>

                <p className="max-w-xs text-sm leading-6 text-gray-500">
                  Enter your code and click Review Code to see the analysis.
                </p>
              </div>
            )}

            {loading && (
              <div className="flex min-h-[420px] flex-col items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#245BFF]" />
                <p className="mt-5 text-sm text-gray-400">
                  Analyzing your code...
                </p>
              </div>
            )}

            {review && (
              <div className="space-y-6">
                <div className="rounded-xl border border-white/10 bg-[#08090B] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">
                        Code quality score
                      </p>
                      <p className="mt-2 text-4xl font-bold">
                        {review.score}
                        <span className="text-lg text-gray-500">/100</span>
                      </p>
                    </div>

                    <div className="rounded-full bg-lime-400/10 p-4">
                      <CheckCircle2 size={28} className="text-[#B6FF39]" />
                    </div>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#B6FF39]"
                      style={{ width: `${review.score}%` }}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">Summary</h3>
                  <p className="text-sm leading-6 text-gray-400">
                    {review.summary}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold">
                    Findings ({review.findings.length})
                  </h3>

                  <div className="space-y-3">
                    {review.findings.map((item, index) => {
                      const style = findingStyle[item.type];
                      const Icon = style.icon;

                      return (
                        <div
                          key={index}
                          className="rounded-xl border border-white/10 bg-[#08090B] p-4"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`rounded-lg p-2 ${style.background}`}>
                              <Icon size={18} className={style.color} />
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold">
                                {item.title}
                              </h4>
                              <p className="mt-1 text-sm leading-6 text-gray-400">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 font-semibold">
                    Improvement Suggestions
                  </h3>

                  <ul className="space-y-3">
                    {review.suggestions.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm leading-6 text-gray-400"
                      >
                        <CheckCircle2
                          size={16}
                          className="mt-1 shrink-0 text-[#B6FF39]"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default CodeReview;
