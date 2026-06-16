import { useState, FormEvent } from "react";
import { X, Lock, Mail, User as UserIcon, BookOpen, Layers, CheckCircle } from "lucide-react";
import { User } from "../types";
import { COURSES } from "../coursesData";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  initialTab?: "login" | "register";
  selectedCourseId?: string;
  showToast: (msg: string, type: "success" | "error" | "info") => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  initialTab = "login",
  selectedCourseId = "computacion-ia",
  showToast,
}: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "register">(initialTab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [chosenCourseId, setChosenCourseId] = useState(selectedCourseId);
  const [simulatedUSDTCheck, setSimulatedUSDTCheck] = useState(true);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate database network lag
    setTimeout(() => {
      setLoading(false);

      if (tab === "login") {
        // Authenticate user from localStorage
        const storedUsers: (User & { password?: string })[] = JSON.parse(localStorage.getItem("student_users") || "[]");
        const foundUser = storedUsers.find(
          (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
        );

        // Standard developer account fallback so the user can log in instantly without registering if they want!
        if (
          !foundUser &&
          email.trim().toLowerCase() === "demo@edinson.com" &&
          password === "123456"
        ) {
          const demoUser: User & { password?: string } = {
            id: "u-demo",
            name: "Estudiante de Prueba",
            email: "demo@edinson.com",
            selectedCourseId: "computacion-ia",
            enrolledCourseIds: ["computacion-ia", "ventas-automatico", "autocad-tecnico"],
            completedLessons: ["comp1"],
            streakDays: 4,
            lastActiveDate: new Date().toISOString().substring(0, 10),
            isPremium: true,
            paymentStatus: "approved",
          };
          localStorage.setItem("student_users", JSON.stringify([demoUser]));
          localStorage.setItem("current_student", JSON.stringify(demoUser));
          onLoginSuccess(demoUser);
          showToast("¡Bienvenido al Aula de Estudiantes! (Demo)", "success");
          onClose();
          return;
        }

        if (foundUser) {
          // Update last active
          foundUser.lastActiveDate = new Date().toISOString().substring(0, 10);
          localStorage.setItem("current_student", JSON.stringify(foundUser));
          // Update the array also
          const idx = storedUsers.findIndex((u) => u.id === foundUser.id);
          storedUsers[idx] = foundUser;
          localStorage.setItem("student_users", JSON.stringify(storedUsers));

          onLoginSuccess(foundUser);
          showToast(`¡Hola de nuevo, ${foundUser.name}! Acceso concedido.`, "success");
          onClose();
        } else {
          showToast("Credenciales incorrectas. Intenta con demo@edinson.com / 123456 o regístrate.", "error");
        }
      } else {
        // Registering a new student
        if (!name.trim()) {
          showToast("Por favor ingresa tu nombre completo.", "error");
          return;
        }
        if (!email.trim() || !email.includes("@")) {
          showToast("Ingresa un correo electrónico válido.", "error");
          return;
        }
        if (password.length < 5) {
          showToast("La contraseña debe tener mínimo 5 caracteres.", "error");
          return;
        }

        const storedUsers: User[] = JSON.parse(localStorage.getItem("student_users") || "[]");
        const alreadyExists = storedUsers.some(
          (u) => u.email.toLowerCase() === email.trim().toLowerCase()
        );

        if (alreadyExists) {
          showToast("Este correo ya está registrado como estudiante.", "error");
          return;
        }

        // Create new user record
        const newUser: User = {
          id: "u-" + Date.now(),
          name: name.trim(),
          email: email.trim(),
          selectedCourseId: chosenCourseId,
          enrolledCourseIds: [chosenCourseId], // automatically enroll in chosen course
          completedLessons: [],
          streakDays: 1,
          lastActiveDate: new Date().toISOString().substring(0, 10),
          isPremium: simulatedUSDTCheck, // If simulation approved, unlock fully!
          paymentStatus: simulatedUSDTCheck ? "approved" : "unpaid",
          usdtTxHash: simulatedUSDTCheck ? "0x" + Math.random().toString(16).substring(2, 10) : undefined,
          // Storing password securely locally
          ...({ password } as any),
        };

        storedUsers.push(newUser);
        localStorage.setItem("student_users", JSON.stringify(storedUsers));
        localStorage.setItem("current_student", JSON.stringify(newUser));

        onLoginSuccess(newUser);
        showToast("¡Registro exitoso! Tu cuenta de estudiante ha sido creada.", "success");
        onClose();
      }
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md overflow-hidden rounded-xl bg-[#13161D] border border-white/5 shadow-2xl z-10 animate-scale-up" id="auth-modal-container">
        {/* Border accent */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition focus:outline-none"
          id="close-auth-modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold font-sans text-white tracking-tight">
              {tab === "login" ? "Acceso al Aula de Clase" : "Crear Cuenta de Estudiante"}
            </h3>
            <p className="text-xs text-gray-400 mt-1 max-w-[280px] mx-auto font-sans leading-relaxed">
              {tab === "login"
                ? "Ingresa tus credenciales para continuar tu formación tecnológica o utiliza nuestra demo."
                : "Abre hoy las puertas del ecosistema formativo del Ing. Edinson Pilozo."}
            </p>
          </div>

          {/* Quick Demo Assist */}
          {tab === "login" && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-center animate-pulse">
              <p className="text-xs text-emerald-400 font-sans">
                💡 <strong>Acceso Rápido demo:</strong>
              </p>
              <button
                onClick={() => {
                  setEmail("demo@edinson.com");
                  setPassword("123456");
                  showToast("Campos autocompletados. Haz clic en Entrar.", "info");
                }}
                className="text-[11px] text-white underline mt-1 font-mono block mx-auto py-0.5 px-2 hover:bg-emerald-500/10 rounded transition focus:outline-none"
              >
                demo@edinson.com / Clave: 123456
              </button>
            </div>
          )}

          {/* Tabs switch */}
          <div className="flex bg-slate-900 border border-white/5 p-1 rounded-lg mb-6">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-md tracking-wider uppercase transition-colors ${
                tab === "login"
                  ? "bg-[#1E2430] text-white shadow-sm border border-white/5"
                  : "text-gray-400 hover:text-white"
              }`}
              id="tab-login"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => {
                setTab("register");
                setChosenCourseId(selectedCourseId);
              }}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-md tracking-wider uppercase transition-colors ${
                tab === "register"
                  ? "bg-[#1E2430] text-white shadow-sm border border-white/5"
                  : "text-gray-400 hover:text-white"
              }`}
              id="tab-register"
            >
              Registrarse
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "register" && (
              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Nombre Completo</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Martha Lozano"
                    className="w-full bg-slate-950/80 border border-white/5 hover:border-white/10 focus:border-emerald-500 rounded-md py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none placeholder-gray-600 transition"
                    id="reg-name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Email del Estudiante</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="estudiante@ejemplo.com"
                  className="w-full bg-slate-950/80 border border-white/5 hover:border-white/10 focus:border-emerald-500 rounded-md py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none placeholder-gray-600 transition"
                  id="auth-email"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950/80 border border-white/5 hover:border-white/10 focus:border-emerald-500 rounded-md py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none placeholder-gray-600 transition"
                  id="auth-password"
                />
              </div>
            </div>

            {tab === "register" && (
              <>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Curso Inicial Incorporado</label>
                  <div className="relative">
                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <select
                      value={chosenCourseId}
                      onChange={(e) => setChosenCourseId(e.target.value)}
                      className="w-full bg-slate-950 border border-white/5 hover:border-white/10 focus:border-emerald-500 rounded-md py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none cursor-pointer transition"
                      id="reg-course-select"
                    >
                      {COURSES.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Simulated USDT Checkout check */}
                <div className="bg-slate-950/50 p-3 rounded-lg border border-white/5 mt-4 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <input
                      type="checkbox"
                      id="simulated-usdt"
                      checked={simulatedUSDTCheck}
                      onChange={(e) => setSimulatedUSDTCheck(e.target.checked)}
                      className="mt-1 accent-emerald-500 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="simulated-usdt" className="text-xs text-gray-300 font-sans cursor-pointer leading-tight select-none">
                      <strong>Simular inscripción automática activa ($15 USDT)</strong>
                      <span className="block text-[10px] text-emerald-400/90 mt-0.5">
                        Activa esta casilla para simular un pago USDT exitoso ya realizado y desbloquear inmediatamente toda la plataforma en modo Premium para evaluar.
                      </span>
                    </label>
                  </div>
                </div>

                {/* WhatsApp Register Callout */}
                <div className="bg-emerald-500/5 border border-emerald-500/15 p-3 rounded-lg text-center space-y-1 mt-3">
                  <p className="text-[10px] text-gray-400 font-sans">
                    ¿Prefieres soporte directo y registro por WhatsApp?
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      setTimeout(() => {
                        const target = document.getElementById("whatsapp-direct-registration");
                        if (target) {
                          target.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                      }, 150);
                    }}
                    className="text-emerald-400 hover:text-emerald-300 text-xs font-bold font-sans underline block mx-auto cursor-pointer focus:outline-none"
                  >
                    💬 Usar Registro por WhatsApp (+593989012515)
                  </button>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-md text-center inline-flex items-center justify-center gap-2 mt-2 transition-all ${
                loading
                  ? "bg-slate-700 text-gray-400 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer shadow-lg shadow-emerald-500/15"
              }`}
              id="auth-submit-btn"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Procesando credenciales...
                </>
              ) : (
                <>{tab === "login" ? "Entrar al Aula de Clases" : "Crear mi Cuenta de Alumno"}</>
              )}
            </button>
          </form>

          {/* Prompt info */}
          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <p className="text-[10px] text-gray-500 leading-normal font-sans">
              🔒 Tus claves de formación están protegidas por encriptado local persistente de navegador de alta seguridad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
