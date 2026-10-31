
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import AuthBrand from "../components/auth/AuthBrand";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  // Update form fields
  function updateField(e) {
    const { name, value, type, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  }

  // Calculate password strength
  function getPasswordStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  }

  const strength = getPasswordStrength(form.password);

  const strengthLabels = [
    "",
    "Very weak",
    "Weak",
    "Fair",
    "Strong",
    "Very strong",
  ];

  // Handle registration
  function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    setError("");

    const cleanName = form.name.trim();
    const cleanEmail = form.email.trim();

    // Validate empty fields
    if (
      !cleanName ||
      !cleanEmail ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Validate name
    if (cleanName.length < 2) {
      setError("Please enter a valid full name.");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password length
    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    // Validate uppercase letter
    if (!/[A-Z]/.test(form.password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    // Validate number
    if (!/[0-9]/.test(form.password)) {
      setError("Password must contain at least one number.");
      return;
    }

    // Validate password match
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Validate terms
    if (!form.terms) {
      setError("Please accept the Terms and Conditions.");
      return;
    }

    // Show loading state
    setLoading(true);

    // Navigate to OTP verification
    navigate("/verify-email", {
      state: {
        name: cleanName,
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

        {/* Registration Card */}
        <div className="rounded-2xl border border-white/10 bg-[#101216] p-7 shadow-2xl sm:p-9">

          {/* Heading */}
          <div className="mb-7">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#245BFF]/20 bg-[#245BFF]/10">
              <User size={21} className="text-[#245BFF]" />
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white">
              Create your account
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Start building smarter with CodePilot.
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Full name
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#08090B] px-4 transition focus-within:border-[#245BFF] focus-within:ring-1 focus-within:ring-[#245BFF]/30">
                <User size={17} className="shrink-0 text-gray-500" />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-gray-600"
                />
              </div>
            </div>

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
                  value={form.email}
                  onChange={updateField}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Password
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#08090B] px-4 transition focus-within:border-[#245BFF] focus-within:ring-1 focus-within:ring-[#245BFF]/30">
                <Lock size={17} className="shrink-0 text-gray-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={updateField}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-gray-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="shrink-0 text-gray-500 transition hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* Password Strength */}
              {form.password && (
                <div className="mt-3">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-gray-500">
                      Password strength
                    </span>

                    <span
                      className={
                        strength >= 4
                          ? "text-[#B6FF39]"
                          : "text-gray-400"
                      }
                    >
                      {strengthLabels[strength]}
                    </span>
                  </div>

                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div
                        key={item}
                        className={`h-1.5 flex-1 rounded-full transition ${
                          strength >= item
                            ? strength >= 4
                              ? "bg-[#B6FF39]"
                              : "bg-[#245BFF]"
                            : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Confirm password
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#08090B] px-4 transition focus-within:border-[#245BFF] focus-within:ring-1 focus-within:ring-[#245BFF]/30">
                <Lock size={17} className="shrink-0 text-gray-500" />

                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={updateField}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                  required
                  className="w-full bg-transparent py-3.5 text-sm text-white outline-none placeholder:text-gray-600"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                  className="shrink-0 text-gray-500 transition hover:text-white"
                >
                  {showConfirm ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {form.confirmPassword && (
                <p
                  className={`mt-2 text-xs ${
                    form.password === form.confirmPassword
                      ? "text-[#B6FF39]"
                      : "text-red-400"
                  }`}
                >
                  {form.password === form.confirmPassword
                    ? "Passwords match"
                    : "Passwords do not match"}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <label className="flex cursor-pointer items-start gap-2 pt-2 text-xs leading-5 text-gray-400">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={updateField}
                className="mt-1 h-4 w-4 shrink-0 accent-[#245BFF]"
              />

              <span>
                I agree to the Terms of Service and Privacy Policy.
              </span>
            </label>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-400/20 bg-red-400/5 p-3 text-xs leading-5 text-red-300"
              >
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#245BFF] py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Redirecting...
                </>
              ) : (
                <>
                  Create account
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
              ALREADY A MEMBER?
            </span>

            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-[#B6FF39] transition hover:text-white"
            >
              Sign in
            </Link>
          </p>

        </div>

        {/* Footer */}
        <div className="mt-7 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <ShieldCheck size={14} className="text-[#B6FF39]" />
            Your coding workspace starts here.
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
