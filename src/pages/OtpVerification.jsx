
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Mail,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Lock,
} from "lucide-react";

import AuthBrand from "../components/auth/AuthBrand";

export default function OtpVerification() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";
  const name = location.state?.name || "";

  const inputRefs = useRef([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  // Demo OTP for frontend testing
  const DEMO_OTP = "123456";

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0 || success) return;

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, success]);

  // Format timer
  const formattedTime = `00:${String(timeLeft).padStart(2, "0")}`;

  // Handle OTP input
  function handleOtpChange(value, index) {
    if (!/^\d*$/.test(value)) return;

    setError("");
    setResendMessage("");

    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);

    setOtp(updatedOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  // Handle keyboard navigation
  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  // Handle pasted OTP
  function handlePaste(e) {
    e.preventDefault();

    const pastedValue = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedValue) return;

    const updatedOtp = Array(6).fill("");

    pastedValue.split("").forEach((digit, index) => {
      updatedOtp[index] = digit;
    });

    setOtp(updatedOtp);
    setError("");

    const nextIndex = Math.min(pastedValue.length, 5);
    inputRefs.current[nextIndex]?.focus();
  }

  // Verify OTP
  function handleVerify(e) {
    e.preventDefault();

    setError("");
    setResendMessage("");

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    if (timeLeft <= 0) {
      setError("OTP has expired. Please request a new OTP.");
      return;
    }

    setLoading(true);

    // Frontend demo verification
    if (enteredOtp === DEMO_OTP) {
      setSuccess(true);
      setLoading(false);
    } else {
      setError("Invalid OTP. Please try again.");
      setLoading(false);
    }
  }

  // Resend OTP
  function handleResend() {
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(60);
    setError("");
    setResendMessage("Demo OTP has been reset. Use 123456 to verify.");

    inputRefs.current[0]?.focus();
  }

  // Success screen
  if (success) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08090B] px-5 py-12">

        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#245BFF]/10 blur-[110px]" />

        <div className="relative z-10 w-full max-w-md">

          <div className="mb-8">
            <AuthBrand />
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#101216] p-8 text-center shadow-2xl sm:p-10">

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#B6FF39]/20 bg-[#B6FF39]/10">
              <CheckCircle2 size={34} className="text-[#B6FF39]" />
            </div>

            <h2 className="text-2xl font-bold text-white">
              Email verified!
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              Great job{name ? `, ${name}` : ""}! Your demo OTP verification was successful.
            </p>

            <div className="mt-6 rounded-lg border border-[#B6FF39]/20 bg-[#B6FF39]/5 p-4">
              <p className="text-sm text-[#B6FF39]">
                <ShieldCheck size={16} className="mr-2 inline" />
                Verification successful
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/login", { replace: true })}
              className="group mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-[#245BFF] py-3.5 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Continue to login
              <ArrowRight size={17} className="transition group-hover:translate-x-1" />
            </button>

            <p className="mt-5 text-xs text-gray-600">
              CodePilot · Your intelligent coding companion
            </p>

          </div>
        </div>
      </main>
    );
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

        {/* OTP Card */}
        <div className="rounded-2xl border border-white/10 bg-[#101216] p-7 shadow-2xl sm:p-9">

          {/* Icon */}
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-[#245BFF]/20 bg-[#245BFF]/10">
            <Mail size={22} className="text-[#245BFF]" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Verify your email
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-400">
            We've sent a six-digit verification code to:
          </p>

          <p className="mt-2 break-all text-sm font-semibold text-white">
            {email || "No email address received"}
          </p>

          {/* OTP Form */}
          <form onSubmit={handleVerify} className="mt-8">

            <label className="mb-3 block text-sm font-medium text-gray-300">
              Enter verification code
            </label>

            {/* Six OTP Inputs */}
            <div className="flex justify-between gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleOtpChange(e.target.value, index)
                  }
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  aria-label={`OTP digit ${index + 1}`}
                  className="h-12 min-w-0 flex-1 rounded-lg border border-white/10 bg-[#08090B] text-center text-xl font-bold text-white outline-none transition focus:border-[#245BFF] focus:ring-2 focus:ring-[#245BFF]/20 sm:h-14"
                />
              ))}
            </div>

            {/* Timer */}
            <div className="mt-5 flex items-center justify-between">

              <span className="text-xs text-gray-500">
                {timeLeft > 0 ? "Code expires in" : "Code expired"}
              </span>

              <span
                className={`text-sm font-semibold ${
                  timeLeft > 0 ? "text-[#B6FF39]" : "text-red-400"
                }`}
              >
                {formattedTime}
              </span>

            </div>

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="mt-5 rounded-lg border border-red-400/20 bg-red-400/5 p-3 text-xs leading-5 text-red-300"
              >
                {error}
              </div>
            )}

            {/* Resend Message */}
            {resendMessage && (
              <div className="mt-5 rounded-lg border border-[#B6FF39]/20 bg-[#B6FF39]/5 p-3 text-xs text-[#B6FF39]">
                {resendMessage}
              </div>
            )}

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading}
              className="group mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-[#245BFF] py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/10 transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                "Verifying..."
              ) : (
                <>
                  Verify email
                  <ArrowRight
                    size={17}
                    className="transition group-hover:translate-x-1"
                  />
                </>
              )}
            </button>

          </form>

          {/* Resend OTP */}
          <div className="mt-7 text-center">

            <p className="text-sm text-gray-500">
              Didn't receive the code?
            </p>

            <button
              type="button"
              onClick={handleResend}
              disabled={timeLeft > 0}
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#B6FF39] transition hover:text-white disabled:cursor-not-allowed disabled:text-gray-600"
            >
              <RefreshCw size={15} />
              Resend OTP
            </button>

          </div>

          {/* Demo Notice */}
          <div className="mt-7 rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="flex items-start gap-2">
              <Lock size={15} className="mt-0.5 shrink-0 text-gray-500" />

              <p className="text-xs leading-5 text-gray-500">
                Frontend demo only. Use{" "}
                <span className="font-bold text-[#B6FF39]">
                  123456
                </span>{" "}
                to test verification. No email is sent yet.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-7 flex flex-col items-center gap-4">

          <Link
            to="/register"
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-white"
          >
            <ArrowLeft size={15} />
            Back to registration
          </Link>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <ShieldCheck size={14} className="text-[#B6FF39]" />
            Your account security matters.
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
