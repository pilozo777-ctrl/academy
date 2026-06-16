import { useState, FormEvent } from "react";
import { Send, User as UserIcon, Mail, Phone, BookOpen, CreditCard, Sparkles, MessageSquare } from "lucide-react";
import { COURSES } from "../coursesData";
import { User } from "../types";

interface WhatsAppRegisterFormProps {
  onRegisterSuccess?: (user: User) => void;
  showToast: (msg: string, type: "success" | "error" | "info") => void;
  defaultCourseId?: string;
}

export default function WhatsAppRegisterForm({
  onRegisterSuccess,
  showToast,
  defaultCourseId = "computacion-ia"
}: WhatsAppRegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(defaultCourseId);
  const [paymentMethod, setPaymentMethod] = useState("usdt-trc20");
  const [customMemo, setCustomMemo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentMethods = [
    { id: "usdt-trc20", name: "USDT Cripto (Red TRC-20)" },
    { id: "binance-pay", name: "Binance Pay ID / Criptomonedas" },
    { id: "transferencia-ec", name: "Transferencia Bancaria (Pichincha/Produbanco - Ecuador)" },
    { id: "internacional-card", name: "Tarjeta de Crédito / PayPal (Internacional)" }
  ];

  const getCourseTitle = (id: string) => {
    const course = COURSES.find((c) => c.id === id);
    return course ? course.title : id;
  };

  const getPaymentMethodLabel = (id: string) => {
    const method = paymentMethods.find((m) => m.id === id);
    return method ? method.name : id;
  };

  // Generate WhatsApp message preview
  const generateMessageText = () => {
    const courseName = getCourseTitle(selectedCourseId);
    const paymentLabel = getPaymentMethodLabel(paymentMethod);
    const memoText = customMemo.trim() ? `"${customMemo.trim()}"` : "Ninguno";

    return `🚀 ¡NUEVA SOLICITUD DE INSCRIPCIÓN! 🚀

Hola Ing. Edinson Pilozo, acabo de registrarme en la plataforma y quiero activar mi acceso estudiantil:

👤 Estudiante: ${name || "[Tu Nombre Completo]"}
📧 Correo: ${email || "[Tu Correo de Registro]"}
📱 Celular/WA: ${phone || "[Tu Número de WhatsApp]"}
📚 Curso Inscrito: ${courseName}
💳 Pago Escogido: ${paymentLabel}
💬 Nota: ${memoText}

-----------
🔑 ¡Por favor valida mi cuenta de estudiante para el Aula de clases interactiva!`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast("Ingresa tu nombre completo.", "error");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      showToast("Ingresa un correo electrónico de estudiante válido.", "error");
      return;
    }
    if (!phone.trim()) {
      showToast("Ingresa tu número de teléfono / WhatsApp para contacto.", "error");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // Create a local user state so they can log in immediately
      const newUser: User = {
        id: "u-wa-" + Date.now(),
        name: name.trim(),
        email: email.trim(),
        selectedCourseId: selectedCourseId,
        enrolledCourseIds: [selectedCourseId],
        completedLessons: [],
        streakDays: 1,
        lastActiveDate: new Date().toISOString().substring(0, 10),
        isPremium: true, // give them premium to explore the portal right away!
        paymentStatus: "pending", // indicate pending confirmation
        usdtTxHash: "whatsapp-reg"
      };

      // Store password as "123456" for simplicity/quick access later
      (newUser as any).password = "123456";

      // Save user to localStorage
      const storedUsers: User[] = JSON.parse(localStorage.getItem("student_users") || "[]");
      const alreadyExists = storedUsers.some((u) => u.email.toLowerCase() === email.trim().toLowerCase());

      if (!alreadyExists) {
        storedUsers.push(newUser);
        localStorage.setItem("student_users", JSON.stringify(storedUsers));
      }

      // Automatically log them in
      localStorage.setItem("current_student", JSON.stringify(newUser));

      if (onRegisterSuccess) {
        onRegisterSuccess(newUser);
      }

      // Encode the custom message template
      const formattedMsg = encodeURIComponent(generateMessageText());
      const waUrl = `https://wa.me/593989012515?text=${formattedMsg}`;

      showToast("¡Registro local creado! Abriendo tu solicitud directa de WhatsApp...", "success");

      // Open in new tab or fallback
      window.open(waUrl, "_blank", "noreferrer");

    }, 850);
  };

  return (
    <div className="w-full bg-[#13161D] rounded-2xl border border-white/5 overflow-hidden shadow-2xl transition duration-300 hover:border-emerald-500/25" id="whatsapp-register-form-box">
      {/* Decorative heading badge */}
      <div className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-blue-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-white/20 text-white">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider">Inscripción Directa WhatsApp</h3>
            <p className="text-[10px] text-emerald-100 font-medium font-sans">Soporte y Registro en Tiempo Real</p>
          </div>
        </div>
        <div className="hidden sm:inline-flex items-center gap-1.5 bg-slate-950/40 text-emerald-300 font-mono text-[9px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Activo +593989012515
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Inputs (Left) */}
        <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-7">
          <p className="text-xs text-gray-400 leading-relaxed font-sans mb-4">
            Rellena tus datos para crear tu cuenta en línea e iniciar la conversación de inscripción por WhatsApp con el <strong>Ing. Edinson Pilozo</strong>.
          </p>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-[11px] text-gray-400 font-bold uppercase tracking-wider">Nombre Completo</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Martha Lozano"
                className="w-full bg-slate-950/80 border border-white/5 hover:border-white/10 focus:border-emerald-500 rounded-md py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white focus:outline-none placeholder-gray-600 transition"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-[11px] text-gray-400 font-bold uppercase tracking-wider">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="martha@ejemplo.com"
                  className="w-full bg-slate-950/80 border border-white/5 hover:border-white/10 focus:border-emerald-500 rounded-md py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white focus:outline-none placeholder-gray-600 transition"
                />
              </div>
            </div>

            {/* Student's WhatsApp Cellphone */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-[11px] text-gray-400 font-bold uppercase tracking-wider">Número de Celular / WA</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej. +593987654321"
                  className="w-full bg-slate-950/80 border border-white/5 hover:border-white/10 focus:border-emerald-500 rounded-md py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white focus:outline-none placeholder-gray-600 transition"
                />
              </div>
            </div>
          </div>

          {/* Course Select */}
          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-[11px] text-gray-400 font-bold uppercase tracking-wider">Curso de Interés Primario</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 hover:border-white/10 focus:border-emerald-500 rounded-md py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white focus:outline-none cursor-pointer transition"
              >
                {COURSES.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Payment Preference */}
          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-[11px] text-gray-400 font-bold uppercase tracking-wider">Preferencia de Pago ($15 USDT/USD)</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 hover:border-white/10 focus:border-emerald-500 rounded-md py-2.5 pl-10 pr-4 text-xs sm:text-sm text-white focus:outline-none cursor-pointer transition"
              >
                {paymentMethods.map((method) => (
                  <option key={method.id} value={method.id}>
                    {method.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Custom Message Nota */}
          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-[11px] text-gray-400 font-bold uppercase tracking-wider">Mensaje Adicional o Comentario (Opcional)</label>
            <textarea
              value={customMemo}
              onChange={(e) => setCustomMemo(e.target.value)}
              placeholder="Ej. Quiero registrarme con un amigo, o pregunto por un medio de pago local..."
              rows={2}
              className="w-full bg-slate-950/80 border border-white/5 hover:border-white/10 focus:border-emerald-500 rounded-md p-3 text-xs sm:text-sm text-white focus:outline-none placeholder-gray-600 transition resize-none"
            />
          </div>

          {/* Action WhatsApp Trigger button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-black text-xs sm:text-sm tracking-wider uppercase py-4 px-6 rounded-lg text-center flex items-center justify-center gap-2 mt-4 cursor-pointer transition-all ${
              isSubmitting
                ? "bg-slate-700 text-gray-400 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-xl shadow-emerald-500/10 hover:-translate-y-0.5 active:translate-y-0"
            }`}
          >
            {isSubmitting ? (
              <span>Preparando chat...</span>
            ) : (
              <>
                <Send className="w-4 h-4 shrink-0 fill-current" />
                <span>Enviar Inscripción por WhatsApp →</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-gray-500 font-sans text-center">
            🔑 Al enviar la solicitud, tu cuenta de alumno se creará automáticamente con la clave por defecto <strong>123456</strong> para que puedas explorar el Portal Educativo en paralelo.
          </p>
        </form>

        {/* WhatsApp Message Live Preview (Right - Col span 5) */}
        <div className="lg:col-span-5 flex flex-col justify-start space-y-4">
          <div className="bg-[#191F2D] border border-white/5 rounded-xl p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between h-full">
            <div className="absolute top-0 right-0 p-3 text-[10px] font-bold font-mono text-emerald-400 uppercase tracking-widest bg-emerald-500/5 border-l border-b border-white/5 rounded-bl-xl flex items-center gap-1.5 select-none">
              <Sparkles className="w-3.5 h-3.5" />
              Vista Previa de Mensaje
            </div>

            <div className="space-y-4 pt-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-sans">Texto a transmitir:</span>
              </div>

              {/* Chat Text area bubble simulate */}
              <div className="bg-slate-950 rounded-lg p-3 sm:p-4 border border-white/5 text-[11px] sm:text-xs font-mono text-gray-300 leading-relaxed max-h-[280px] overflow-y-auto whitespace-pre-wrap select-all">
                {generateMessageText()}
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 mt-4 space-y-2">
              <p className="text-[10px] text-gray-500 leading-normal font-sans">
                🟢 Al presionar el botón verde de la izquierda, se abrirá la aplicación de WhatsApp o WhatsApp Web de forma automática en tu dispositivo con este mensaje de texto cargado, listo para pulsar enviar.
              </p>
              <div className="bg-slate-900 border border-white/10 p-2 text-[10px] rounded text-gray-400 font-sans flex items-center gap-2">
                <span className="text-xs">👋</span>
                <span>Si no tienes WhatsApp instalado, puedes copiar el texto anterior y escribir de forma directa al número <strong>+593 98 901 2515</strong>.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
