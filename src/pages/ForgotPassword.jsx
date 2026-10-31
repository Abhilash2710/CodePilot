
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Mail,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  LockKeyhole,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import AuthBrand from "../components/auth/AuthBrand";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const cleanEmail = email.trim();

    // Validate empty email
    if (!cleanEmail) {
      setError("Please enter your email address.");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Frontend demonstration
    navigate("/reset-otp", {
      state: {
        email: cleanEmail,
      },
    });
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08090B] px-5 py-12">

      {/* Background effects */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#245BFF]/10 blur-[110px]" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#B6FF39]/[0.05] blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">

        {/* Brand */}
        <div className="mb-8">
          <AuthBrand />
        </div>

        {/* Forgot Password Card */}
        <div className="rounded-2xl border border-white/10 bg-[#101216] p-7 shadow-2xl sm:p-9">

          {/* Icon */}
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[#245BFF]/20 bg-[#245BFF]/10">
            <LockKeyhole size={22} className="text-[#245BFF]" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Forgot your password?
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-400">
            Don't worry! Enter your registered email address.
            We'll guide you through resetting your password.
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

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

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-400/20 bg-red-400/5 p-3 text-xs leading-5 text-red-300"
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#245BFF] py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Processing...
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </>
              )}
            </button>

          </form>

          {/* Security information */}
          <div className="mt-7 rounded-lg border border-white/10 bg-white/[0.03] p-4">

            <div className="flex items-start gap-3">

              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-[#B6FF39]"
              />

              <div>
                <p className="text-sm font-medium text-gray-300">
                  Secure account recovery
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Your account security is important.
                  Follow the verification steps to reset your password.
                </p>
              </div>

            </div>

          </div>

          {/* Back to Login */}
          <div className="mt-7 text-center">

            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#B6FF39] transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to login
            </Link>

          </div>

        </div>

        {/* Footer */}
        <div className="mt-7 flex flex-col items-center gap-3">

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <CheckCircle2 size={14} className="text-[#B6FF39]" />
            Secure password recovery
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-gray-700">
            <Sparkles size={12} />
            Built for developers, powered by intelligence.
          </div>

        </div>

      </div>
    </main>
  );
}
