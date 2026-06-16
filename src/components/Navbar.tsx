import { useState } from "react";
import { User, LogOut, Menu, X, Cpu, Sparkles } from "lucide-react";
import { User as UserType } from "../types";

interface NavbarProps {
  currentUser: UserType | null;
  onLogout: () => void;
  onOpenAuth: () => void;
  activeView: "landing" | "dashboard";
  onSetView: (view: "landing" | "dashboard") => void;
}

export default function Navbar({
  currentUser,
  onLogout,
  onOpenAuth,
  activeView,
  onSetView,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (selector: string) => {
    setIsOpen(false);
    onSetView("landing");
    setTimeout(() => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B0D11]/90 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20" id="main-navbar">
          {/* Logo */}
          <button
            onClick={() => {
              onSetView("landing");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 font-bold text-base sm:text-lg tracking-wider text-white hover:opacity-90 transition-opacity focus:outline-none cursor-pointer"
            id="nav-logo-btn"
          >
            <div className="p-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            </div>
            COMPUTACIÓN<span className="text-emerald-400 font-black">+</span>IA
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 text-xs sm:text-sm">
            {activeView === "landing" ? (
              <>
                <button
                  onClick={() => handleNavClick("#cursos")}
                  className="text-gray-400 hover:text-white hover:underline focus:outline-none transition"
                >
                  Cursos
                </button>
                <button
                  onClick={() => handleNavClick("#beneficios")}
                  className="text-gray-400 hover:text-white hover:underline  focus:outline-none transition"
                >
                  Beneficios
                </button>
                <button
                  onClick={() => handleNavClick("#testimonios")}
                  className="text-gray-400 hover:text-white hover:underline focus:outline-none transition"
                >
                  Resultados
                </button>
                <button
                  onClick={() => handleNavClick("#inscripcion")}
                  className="text-gray-400 hover:text-white hover:underline focus:outline-none transition"
                >
                  Precios
                </button>
                <button
                  onClick={() => handleNavClick("#whatsapp-direct-registration")}
                  className="text-emerald-400 hover:text-emerald-350 font-bold hover:underline focus:outline-none transition flex items-center gap-1 bg-emerald-500/5 px-2.5 py-1 rounded"
                >
                  Registro WhatsApp 💬
                </button>
                <button
                  onClick={() => handleNavClick("#faq")}
                  className="text-gray-400 hover:text-white hover:underline focus:outline-none transition"
                >
                  Preguntas
                </button>
              </>
            ) : (
              <button
                onClick={() => onSetView("landing")}
                className="text-emerald-400 hover:text-emerald-300 font-medium py-1.5 px-3 rounded-md bg-emerald-500/5 border border-emerald-500/10 transition"
              >
                ← Volver a Inicio de Ventas
              </button>
            )}

            <div className="h-4 w-[1px] bg-white/10" />

            {currentUser ? (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onSetView("dashboard")}
                  className={`flex items-center gap-2 py-2 px-4 rounded-md font-semibold text-xs tracking-wide uppercase transition-all duration-200 ${
                    activeView === "dashboard"
                      ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25"
                      : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                  }`}
                  id="dashboard-btn"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Portal Estudiante
                </button>
                
                <div className="flex items-center gap-2 pl-2">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold uppercase">
                    {currentUser.name.substring(0, 2)}
                  </div>
                  <div className="text-left py-0">
                    <p className="text-xs text-white max-w-[110px] truncate font-semibold leading-tight">{currentUser.name}</p>
                    <p className="text-[10px] text-gray-500 max-w-[110px] truncate font-mono">Estudiante</p>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="p-2 rounded-md hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-transparent hover:border-red-500/20 transition focus:outline-none"
                  title="Cerrar Sesión"
                  id="logout-btn"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenAuth}
                  className="text-gray-300 hover:text-white font-medium hover:underline px-3 py-2 cursor-pointer focus:outline-none"
                  id="login-trigger-desktop"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={onOpenAuth}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs tracking-wider uppercase px-4 py-2.5 rounded-md hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/20 active:translate-y-0 transition-all duration-200 cursor-pointer"
                  id="register-trigger-desktop"
                >
                  Acceso Alumnos
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            {currentUser && activeView !== "dashboard" && (
              <button
                onClick={() => onSetView("dashboard")}
                className="mr-2 flex items-center gap-1.5 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-md shadow-md focus:outline-none"
                id="portal-mobile-btn"
              >
                <Sparkles className="w-3 h-3" />
                Aulas
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-850 border border-white/5 focus:outline-none"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0F1116] border-b border-white/5 px-4 pt-2 pb-6 space-y-3 shadow-2xl">
          {activeView === "landing" ? (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleNavClick("#cursos")}
                className="text-left w-full py-2.5 text-gray-400 hover:text-white hover:bg-white/5 px-3 rounded-md text-sm transition"
              >
                Cursos Incluidos
              </button>
              <button
                onClick={() => handleNavClick("#beneficios")}
                className="text-left w-full py-2.5 text-gray-400 hover:text-white hover:bg-white/5 px-3 rounded-md text-sm transition"
              >
                Beneficios Ecosistema
              </button>
              <button
                onClick={() => handleNavClick("#testimonios")}
                className="text-left w-full py-2.5 text-gray-400 hover:text-white hover:bg-white/5 px-3 rounded-md text-sm transition"
              >
                Resultados Alumnos
              </button>
              <button
                onClick={() => handleNavClick("#inscripcion")}
                className="text-left w-full py-2.5 text-gray-400 hover:text-white hover:bg-white/5 px-3 rounded-md text-sm transition"
              >
                Precios e Inscripción
              </button>
              <button
                onClick={() => handleNavClick("#whatsapp-direct-registration")}
                className="text-left w-full py-2.5 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/5 px-3 rounded-md text-sm font-bold transition"
              >
                Inscripción WhatsApp 💬
              </button>
              <button
                onClick={() => handleNavClick("#faq")}
                className="text-left w-full py-2.5 text-gray-400 hover:text-white hover:bg-white/5 px-3 rounded-md text-sm transition"
              >
                Dudas Frecuentes
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsOpen(false);
                onSetView("landing");
              }}
              className="text-emerald-400 font-medium py-2 px-3 rounded-md bg-emerald-500/5 border border-emerald-500/10 text-sm w-full text-left inline-block"
            >
              ← Volver a Landing Comercial
            </button>
          )}

          <hr className="border-white/5" />

          {currentUser ? (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 px-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold uppercase text-sm">
                  {currentUser.name.substring(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{currentUser.name}</p>
                  <p className="text-xs text-slate-500 font-mono">{currentUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onSetView("dashboard");
                  }}
                  className="w-full bg-emerald-500 text-slate-950 py-2.5 rounded-md font-bold text-xs uppercase tracking-wider text-center"
                >
                  Ir al Portal
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onLogout();
                  }}
                  className="w-full bg-red-500/10 text-red-400 border border-red-500/20 py-2.5 rounded-md font-bold text-xs uppercase tracking-wider text-center"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2 pt-2 px-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAuth();
                }}
                className="w-full text-center bg-slate-800 text-white border border-white/10 py-3 rounded-md text-sm font-semibold"
                id="login-mobile-btn"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAuth();
                }}
                className="w-full text-center bg-emerald-500 text-slate-950 py-3 rounded-md text-sm font-extrabold shadow-md uppercase tracking-wider"
                id="register-mobile-btn"
              >
                Acceso Alumnos
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
