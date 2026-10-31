
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Mail,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import AuthBrand from "../components/auth/AuthBrand";

export default function ResetOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  function handleChange(value, index) {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1);
    setOtp(updatedOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

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

  function handlePaste(e) {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    setOtp([...pasted.split(""), ...Array(6 - pasted.length).fill("")]);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  }

  function handleVerify(e) {
    e.preventDefault();

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      setError("Please enter all 6 digits.");
      return;
    }

    if (timeLeft === 0) {
      setError("OTP expired. Please request a new OTP.");
      return;
    }

    // Frontend demo OTP only
    if (enteredOtp !== "123456") {
      setError("Invalid OTP. Please try again.");
      return;
    }

    setSuccess(true);
  }

  function handleResend() {
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(60);
    setError("");
    inputRefs.current[0]?.focus();
  }

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F5F5F5] flex flex-col">
      <AuthBrand />

      <main className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">

          {success ? (
            <div className="rounded-2xl border border-white/10 bg-[#111318] p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#B6FF39]/10">
                <CheckCircle2 size={34} className="text-[#B6FF39]" />
              </div>

              <h1 className="text-3xl font-bold">Email verified!</h1>

              <p className="mt-3 text-sm text-gray-400">
                Your email has been verified. You can now create a new password.
              </p>

              <button
                onClick={() =>
                  navigate("/reset-password", {
                    state: { email },
                  })
                }
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#245BFF] py-3 font-semibold hover:bg-blue-600"
              >
                Continue <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#111318] p-8 shadow-2xl">

              <Link
                to="/forgot-password"
                className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
              >
                <ArrowLeft size={16} /> Back
              </Link>

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#245BFF]/15">
                <ShieldCheck size={28} className="text-[#245BFF]" />
              </div>

              <h1 className="text-3xl font-bold">Verify your email</h1>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Enter the 6-digit verification code to continue resetting your password.
              </p>

              {email && (
                <p className="mt-3 text-sm text-white">
                  <Mail size={15} className="mr-2 inline text-[#B6FF39]" />
                  {email}
                </p>
              )}

              <form onSubmit={handleVerify}>
                <div className="mt-8 flex justify-between gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                      className="h-14 w-12 rounded-xl border border-white/10 bg-[#08090B] text-center text-xl font-bold text-white outline-none focus:border-[#245BFF]"
                    />
                  ))}
                </div>

                {error && (
                  <p className="mt-4 text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#245BFF] py-3 font-semibold hover:bg-blue-600"
                >
                  Verify OTP <ArrowRight size={18} />
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-400">
                {timeLeft > 0 ? (
                  <p>
                    Resend code in{" "}
                    <span className="font-semibold text-[#B6FF39]">
                      {timeLeft}s
                    </span>
                  </p>
                ) : (
                  <button
                    onClick={handleResend}
                    className="inline-flex items-center gap-2 text-[#B6FF39] hover:underline"
                  >
                    <RefreshCw size={15} /> Resend OTP
                  </button>
                )}
              </div>

              <p className="mt-6 text-center text-xs text-gray-500">
                Demo OTP: <span className="text-[#B6FF39]">123456</span>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
