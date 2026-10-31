
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Code2,
  FlaskConical,
  Copy,
  Download,
  Trash2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

function TestCaseGenerator() {
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadExample = () => {
    setLanguage("JavaScript");
    setCode(`function addNumbers(a, b) {
  return a + b;
}`);
    setTestCases([]);
  };

  const generateTests = () => {
    if (!code.trim()) {
      alert("Please enter your code first.");
      return;
    }

    setLoading(true);
    setTestCases([]);

    setTimeout(() => {
      const generated = [
        {
          type: "Normal Case",
          input: "addNumbers(5, 10)",
          expected: "15",
          description: "Checks addition with two positive numbers.",
        },
        {
          type: "Normal Case",
          input: "addNumbers(-5, 10)",
          expected: "5",
          description: "Checks addition with a negative number.",
        },
        {
          type: "Edge Case",
          input: "addNumbers(0, 0)",
          expected: "0",
          description: "Checks when both inputs are zero.",
        },
        {
          type: "Edge Case",
          input: "addNumbers(1000000, 2000000)",
          expected: "3000000",
          description: "Checks addition with large numbers.",
        },
        {
          type: "Invalid Case",
          input: "addNumbers('hello', 10)",
          expected: "Input validation or an appropriate error",
          description: "Checks how the function handles unexpected input types.",
        },
      ];

      setTestCases(generated);
      setLoading(false);
    }, 1200);
  };

  const copyTests = async () => {
    const output = testCases
      .map(
        (test, index) =>
          `Test Case ${index + 1}\nType: ${test.type}\nInput: ${test.input}\nExpected Output: ${test.expected}\nDescription: ${test.description}`
      )
      .join("\n\n");

    await navigator.clipboard.writeText(output);
    alert("Test cases copied!");
  };

  const downloadTests = () => {
    const output = testCases
      .map(
        (test, index) =>
          `Test Case ${index + 1}\nType: ${test.type}\nInput: ${test.input}\nExpected Output: ${test.expected}\nDescription: ${test.description}`
      )
      .join("\n\n");

    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "codepilot-test-cases.txt";
    link.click();

    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setCode("");
    setTestCases([]);
  };

  const typeStyle = {
    "Normal Case": "bg-blue-500/10 text-blue-400",
    "Edge Case": "bg-yellow-500/10 text-yellow-400",
    "Invalid Case": "bg-red-500/10 text-red-400",
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
            Software Testing Tool
          </div>

          <h1 className="text-3xl font-bold md:text-4xl">
            Test Case Generator
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
            Generate normal, edge, and invalid test cases to help
            check how your code handles different inputs.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-[#101114] p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-semibold">
                <Code2 size={19} className="text-[#245BFF]" />
                Source Code
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
              Enter your function or code
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
                onClick={generateTests}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#245BFF] px-5 py-3 font-semibold transition hover:bg-blue-600 disabled:opacity-50"
              >
                <FlaskConical size={18} />
                {loading ? "Generating..." : "Generate Test Cases"}
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
                <FlaskConical size={19} className="text-[#B6FF39]" />
                Generated Test Cases
              </h2>

              {testCases.length > 0 && (
                <div className="flex gap-3">
                  <button
                    onClick={copyTests}
                    className="text-sm text-gray-400 hover:text-white"
                    title="Copy test cases"
                  >
                    <Copy size={17} />
                  </button>

                  <button
                    onClick={downloadTests}
                    className="text-sm text-gray-400 hover:text-white"
                    title="Download test cases"
                  >
                    <Download size={17} />
                  </button>
                </div>
              )}
            </div>

            {testCases.length === 0 && !loading && (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <FlaskConical size={35} className="text-[#245BFF]" />
                </div>

                <h3 className="mb-2 text-lg font-semibold">
                  No test cases yet
                </h3>

                <p className="max-w-xs text-sm leading-6 text-gray-500">
                  Enter your code and generate test cases to see the results here.
                </p>
              </div>
            )}

            {loading && (
              <div className="flex min-h-[420px] flex-col items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#245BFF]" />
                <p className="mt-5 text-sm text-gray-400">
                  Generating test cases...
                </p>
              </div>
            )}

            {testCases.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#08090B] p-4">
                  <div>
                    <p className="text-sm text-gray-400">Total test cases</p>
                    <p className="mt-1 text-2xl font-bold">
                      {testCases.length}
                    </p>
                  </div>

                  <CheckCircle2 size={28} className="text-[#B6FF39]" />
                </div>

                {testCases.map((test, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-[#08090B] p-4"
                  >
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold">
                        Test Case {index + 1}
                      </h3>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${typeStyle[test.type]}`}
                      >
                        {test.type}
                      </span>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="mb-1 text-gray-500">Input</p>
                        <code className="block break-all rounded-lg bg-white/5 p-3 text-blue-300">
                          {test.input}
                        </code>
                      </div>

                      <div>
                        <p className="mb-1 text-gray-500">Expected output</p>
                        <code className="block break-all rounded-lg bg-white/5 p-3 text-[#B6FF39]">
                          {test.expected}
                        </code>
                      </div>

                      <p className="leading-6 text-gray-400">
                        {test.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
          <AlertCircle size={19} className="mt-0.5 shrink-0 text-yellow-400" />
          <p className="text-sm leading-6 text-gray-400">
            This is a frontend demonstration. The current test cases use a
            fixed example and do not actually analyze or execute your code.
            We will connect real AI-based test generation later.
          </p>
        </div>
      </main>
    </div>
  );
}

export default TestCaseGenerator;
