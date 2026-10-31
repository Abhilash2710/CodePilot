
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import AuthBrand from "../components/auth/AuthBrand";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Include at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Include at least one lowercase letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError("Include at least one number.");
      return;
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      setError("Include at least one special character.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Frontend demo only. Backend password update comes later.
    setSuccess(true);
  }

  return (
    <div className="min-h-screen bg-[#08090B] text-[#F5F5F5]">
      <AuthBrand />

      <main className="flex min-h-[85vh] items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">

          {success ? (
            <div className="rounded-2xl border border-white/10 bg-[#111318] p-8 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#B6FF39]/10">
                <CheckCircle2 size={36} className="text-[#B6FF39]" />
              </div>

              <h1 className="text-3xl font-bold">
                Password reset successful!
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Your new password has been accepted in this demo.
                You can now return to the login page.
              </p>

              <button
                onClick={() => navigate("/login")}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#245BFF] py-3 font-semibold hover:bg-blue-600"
              >
                Go to Login <ArrowRight size={18} />
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-[#111318] p-8 shadow-2xl">

              <Link
                to="/login"
                className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white"
              >
                <ArrowLeft size={16} /> Back to Login
              </Link>

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#245BFF]/15">
                <LockKeyhole size={28} className="text-[#245BFF]" />
              </div>

              <h1 className="text-3xl font-bold">
                Create new password
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Choose a strong password that you haven't used before.
              </p>

              {email && (
                <p className="mt-3 text-sm text-gray-400">
                  Account: <span className="text-white">{email}</span>
                </p>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    New password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full rounded-xl border border-white/10 bg-[#08090B] px-4 py-3 pr-12 text-white outline-none focus:border-[#245BFF]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Confirm new password
                  </label>

                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full rounded-xl border border-white/10 bg-[#08090B] px-4 py-3 pr-12 text-white outline-none focus:border-[#245BFF]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-3.5 text-gray-400"
                    >
                      {showConfirm ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>
                </div>

                <div className="rounded-xl bg-white/[0.03] p-4 text-xs text-gray-400">
                  Your password must contain:
                  <ul className="mt-2 space-y-1">
                    <li>• At least 8 characters</li>
                    <li>• One uppercase and one lowercase letter</li>
                    <li>• One number</li>
                    <li>• One special character</li>
                  </ul>
                </div>

                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#245BFF] py-3 font-semibold hover:bg-blue-600"
                >
                  Reset Password <ArrowRight size={18} />
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
