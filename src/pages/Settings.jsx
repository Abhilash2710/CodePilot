
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Code2,
  User,
  Palette,
  ShieldCheck,
  Bell,
  Save,
  Camera,
  Eye,
  EyeOff,
  CheckCircle2,
  Monitor,
} from "lucide-react";

function Settings() {
  const [activeTab, setActiveTab] = useState("Profile");
  const [name, setName] = useState("Developer");
  const [email, setEmail] = useState("developer@example.com");
  const [bio, setBio] = useState("Passionate software developer.");
  const [theme, setTheme] = useState("Dark");
  const [notifications, setNotifications] = useState({
    email: true,
    product: false,
    security: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState(false);

  const tabs = [
    { name: "Profile", icon: User },
    { name: "Appearance", icon: Palette },
    { name: "Notifications", icon: Bell },
    { name: "Security", icon: ShieldCheck },
  ];

  const saveSettings = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleNotification = (key) => {
    setNotifications((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
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

      <main className="mx-auto max-w-6xl px-5 py-8 md:px-8">
        <div className="mb-8">
          <p className="mb-3 text-sm text-[#B6FF39]">
            Workspace Preferences
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">Settings</h1>
          <p className="mt-3 text-sm text-gray-400">
            Manage your profile and customize your CodePilot experience.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit rounded-2xl border border-white/10 bg-[#101216] p-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                    activeTab === tab.name
                      ? "bg-[#245BFF]/15 font-semibold text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {tab.name}
                </button>
              );
            })}
          </aside>

          <section className="rounded-2xl border border-white/10 bg-[#101216] p-5 md:p-7">
            {activeTab === "Profile" && (
              <div>
                <h2 className="text-xl font-bold">Profile Information</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Update your personal account information.
                </p>

                <div className="my-7 flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#245BFF]/20 text-2xl font-bold text-[#B6FF39]">
                    {name.charAt(0).toUpperCase() || "D"}
                  </div>

                  <div>
                    <p className="font-semibold">{name || "Developer"}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      CodePilot member
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm text-gray-400">
                      Full name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#08090B] p-3 text-sm outline-none focus:border-[#245BFF]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-400">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#08090B] p-3 text-sm outline-none focus:border-[#245BFF]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-400">
                      About me
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full resize-none rounded-xl border border-white/10 bg-[#08090B] p-3 text-sm outline-none focus:border-[#245BFF]"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Appearance" && (
              <div>
                <h2 className="text-xl font-bold">Appearance</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Choose how CodePilot looks on your device.
                </p>

                <div className="mt-7">
                  <label className="mb-3 block text-sm font-medium">
                    Theme preference
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {["Dark", "Light"].map((item) => (
                      <button
                        key={item}
                        onClick={() => setTheme(item)}
                        className={`rounded-xl border p-4 text-left transition ${
                          theme === item
                            ? "border-[#245BFF] bg-[#245BFF]/10"
                            : "border-white/10 bg-[#08090B]"
                        }`}
                      >
                        <Monitor size={22} className="mb-4 text-[#245BFF]" />
                        <p className="font-semibold">{item} Mode</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {item === "Dark"
                            ? "Comfortable dark interface"
                            : "Bright interface for daytime"}
                        </p>
                      </button>
                    ))}
                  </div>

                  <p className="mt-4 text-xs text-gray-500">
                    Theme selection is currently a preview preference. The
                    application theme will be connected later.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "Notifications" && (
              <div>
                <h2 className="text-xl font-bold">Notifications</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Control which notifications you want to receive.
                </p>

                <div className="mt-7 space-y-5">
                  {[
                    {
                      key: "email",
                      title: "Email Notifications",
                      description: "Receive important account updates.",
                    },
                    {
                      key: "product",
                      title: "Product Updates",
                      description: "Learn about new CodePilot features.",
                    },
                    {
                      key: "security",
                      title: "Security Alerts",
                      description: "Receive important security notifications.",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between gap-4 border-b border-white/10 pb-5"
                    >
                      <div>
                        <h3 className="text-sm font-semibold">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleNotification(item.key)}
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                          notifications[item.key]
                            ? "bg-[#245BFF]"
                            : "bg-gray-700"
                        }`}
                        aria-label={`Toggle ${item.title}`}
                      >
                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                            notifications[item.key]
                              ? "left-6"
                              : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Security" && (
              <div>
                <h2 className="text-xl font-bold">Security Settings</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Manage your account password.
                </p>

                <div className="mt-7">
                  <label className="mb-2 block text-sm text-gray-400">
                    New password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter a new password"
                      className="w-full rounded-xl border border-white/10 bg-[#08090B] p-3 pr-12 text-sm outline-none focus:border-[#245BFF]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    Use at least 8 characters with uppercase, lowercase,
                    number, and special character.
                  </p>

                  <div className="mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
                    <p className="text-xs leading-5 text-yellow-400">
                      Password changes are not connected to a real account
                      yet. Backend authentication is required.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              {saved && (
                <span className="flex items-center gap-2 text-sm text-[#B6FF39]">
                  <CheckCircle2 size={17} />
                  Settings saved locally
                </span>
              )}

              <button
                onClick={saveSettings}
                className="ml-auto flex items-center gap-2 rounded-xl bg-[#245BFF] px-5 py-3 text-sm font-semibold hover:bg-blue-600"
              >
                <Save size={17} />
                Save Changes
              </button>
            </div>
          </section>
        </div>

        <footer className="mt-10 border-t border-white/10 pt-5 text-center text-xs text-gray-600">
          © 2026 CodePilot. Built for developers.
        </footer>
      </main>
    </div>
  );
}

export default Settings;
