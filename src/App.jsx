import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OtpVerification from "./pages/OtpVerification";
import ForgotPassword from "./pages/ForgotPassword";
import ResetOtp from "./pages/ResetOtp";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import CodeGenerator from "./pages/CodeGenerator";
import DebugAssistant from "./pages/DebugAssistant";
import CodeExplainer from "./pages/CodeExplainer";
import CodeOptimizer from "./pages/CodeOptimizer";
import CodeReview from "./pages/CodeReview";
import TestCaseGenerator from "./pages/TestCaseGenerator";
import Projects from "./pages/Projects";
import History from "./pages/History";
import Settings from "./pages/Settings";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<OtpVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-otp" element={<ResetOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/code-generator" element={<CodeGenerator />} />
        <Route path="/debug-assistant" element={<DebugAssistant />} />
        <Route path="/code-explainer" element={<CodeExplainer />} />
        <Route path="/code-optimizer" element={<CodeOptimizer />} />
        <Route path="/code-review" element={<CodeReview />} />
        <Route path="/test-case-generator" element={<TestCaseGenerator />}/>
        <Route path="/projects" element={<Projects />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;