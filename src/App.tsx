import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import StudentPortal from "./components/StudentPortal";
import AuthModal from "./components/AuthModal";
import { User } from "./types";

interface Toast {
  message: string;
  type: "success" | "error" | "info";
  id: number;
}

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<"landing" | "dashboard">("landing");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [selectedCourseForAuth, setSelectedCourseForAuth] = useState("computacion-ia");
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load user session on boot
  useEffect(() => {
    try {
      const stored = localStorage.getItem("current_student");
      if (stored) {
        const parsed = JSON.parse(stored);
        setCurrentUser(parsed);
        // Default logged-in users directly to their dashboard for instant engagement!
        setActiveView("dashboard");
      }
    } catch (e) {
      console.error("Failed to parse student session", e);
    }
  }, []);

  // Display beautiful alerts
  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { message, type, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const handleLogout = () => {
    localStorage.removeItem("current_student");
    setCurrentUser(null);
    setActiveView("landing");
    showToast("Has cerrado sesión como estudiante. ¡Te esperamos pronto!", "info");
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setActiveView("dashboard");
  };

  const handleOpenAuth = (courseId?: string) => {
    if (courseId) {
      setSelectedCourseForAuth(courseId);
      setAuthTab("register");
    } else {
      setAuthTab("login");
    }
    setIsAuthOpen(true);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem("current_student", JSON.stringify(updatedUser));

    // Also update in all students list
    try {
      const storedUsers: User[] = JSON.parse(localStorage.getItem("student_users") || "[]");
      const idx = storedUsers.findIndex((u) => u.id === updatedUser.id);
      if (idx > -1) {
        storedUsers[idx] = updatedUser;
        localStorage.setItem("student_users", JSON.stringify(storedUsers));
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="bg-[#0B0D11] min-h-screen text-gray-100 selection:bg-emerald-500/30 overflow-x-hidden antialiased font-sans">
      
      {/* Dynamic fixed Navigation */}
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={() => handleOpenAuth()}
        activeView={activeView}
        onSetView={setActiveView}
      />

      {/* Main views rendering depending on Routing state */}
      <main className="min-h-screen" id="app-main-content">
        {activeView === "dashboard" && currentUser ? (
          <StudentPortal
            currentUser={currentUser}
            onUpdateUser={handleUpdateUser}
            showToast={showToast}
          />
        ) : (
          <LandingPage onOpenAuth={handleOpenAuth} />
        )}
      </main>

      {/* Auth Register and Signin modal sheet */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authTab}
        selectedCourseId={selectedCourseForAuth}
        onLoginSuccess={handleLoginSuccess}
        showToast={showToast}
      />

      {/* Floating Toast Notification Containers */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full font-sans text-sm px-4 sm:px-0" id="toasts-portal">
        {toasts.map((toast) => {
          let bgClass = "bg-[#1A1F2B] border-white/10 text-white";
          if (toast.type === "success") bgClass = "bg-[#0F1E19] border-emerald-500/20 text-emerald-400";
          if (toast.type === "error") bgClass = "bg-[#2A1D1D] border-red-500/20 text-red-400";

          return (
            <div
              key={toast.id}
              className={`p-4 rounded-xl border shadow-2xl flex items-start gap-2.5 animate-slide-in cursor-pointer ${bgClass}`}
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            >
              <div className="shrink-0 mt-0.5 select-none">
                {toast.type === "success" && "✓"}
                {toast.type === "error" && "⚠️"}
                {toast.type === "info" && "💡"}
              </div>
              <p className="text-xs sm:text-sm font-semibold leading-snug">{toast.message}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
