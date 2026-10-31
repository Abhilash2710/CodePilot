
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Code2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import AuthBrand from "../components/auth/AuthBrand";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setError("");

    const cleanEmail = email.trim();

    // Check empty fields
    if (!cleanEmail || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    // Frontend demonstration only
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setError(
        "Login interface is ready. Backend authentication is not connected yet."
      );
    }, 700);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08090B] px-5 py-12">

      {/* Background effects */}

      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#245BFF]/10 blur-[110px]" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#B6FF39]/[0.05] blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">

        {/* Brand */}

        <div className="mb-9">
          <AuthBrand />
        </div>

        {/* Login Card */}

        <div className="rounded-2xl border border-white/10 bg-[#101216] p-7 shadow-2xl sm:p-9">

          {/* Heading */}

          <div className="mb-8">

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#245BFF]/20 bg-[#245BFF]/10">
              <Code2 size={21} className="text-[#245BFF]" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white">
              Welcome back
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Sign in to continue building with CodePilot.
            </p>

          </div>

          {/* Login Form */}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}

            <div>

              <label className="mb-2 block text-sm font-medium text-gray-300">
                Email address
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#08090B] px-4 transition focus-within:border-[#245BFF] focus-within:ring-1 focus-within:ring-[#245BFF]/30">

                <Mail size={17} className="shrink-0 text-gray-500" />

                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-gray-600"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-[#245BFF] transition hover:text-blue-400"
                >
                  Forgot password?
                </Link>

              </div>

              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#08090B] px-4 transition focus-within:border-[#245BFF] focus-within:ring-1 focus-within:ring-[#245BFF]/30">

                <Lock size={17} className="shrink-0 text-gray-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  minLength={8}
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-gray-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="shrink-0 text-gray-500 transition hover:text-white"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {/* Remember Me */}

            <div className="flex items-center justify-between">

              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-400">

                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 cursor-pointer accent-[#245BFF]"
                />

                Remember me

              </label>

              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <ShieldCheck size={14} className="text-[#B6FF39]" />
                Secure access
              </div>

            </div>

            {/* Error Message */}

            {error && (
              <div
                role="alert"
                className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3 text-xs leading-5 text-amber-300"
              >
                {error}
              </div>
            )}

            {/* Submit Button */}

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#245BFF] py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-600 hover:shadow-blue-600/20 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </>
              )}

            </button>

          </form>

          {/* Divider */}

          <div className="my-7 flex items-center gap-4">

            <div className="h-px flex-1 bg-white/10" />

            <span className="text-[10px] font-semibold tracking-widest text-gray-600">
              NEW TO CODEPILOT?
            </span>

            <div className="h-px flex-1 bg-white/10" />

          </div>

          {/* Registration Link */}

          <p className="text-center text-sm text-gray-400">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-[#B6FF39] transition hover:text-white"
            >
              Create account
            </Link>

          </p>

        </div>

        {/* Footer */}

        <div className="mt-7 flex flex-col items-center gap-3">

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle2 size={14} className="text-[#B6FF39]" />
            Secure access to your development workspace.
          </div>

          <Link
            to="/"
            className="text-sm text-gray-500 transition hover:text-white"
          >
            ← Back to home
          </Link>

          <div className="mt-3 flex items-center gap-1.5 text-[10px] text-gray-700">
            <Sparkles size={12} />
            Built for developers, powered by intelligence.
          </div>

        </div>

      </div>

    </main>
  );
}
