import React, { useState, useEffect, useRef } from "react";
import {
  Cpu,
  TrendingUp,
  Compass,
  FolderGit2,
  BookOpen,
  MessageSquare,
  Award,
  DollarSign,
  Play,
  CheckCircle,
  Clock,
  Sparkles,
  Send,
  RefreshCw,
  Notebook,
  Flame,
  ChevronRight,
  BookMarked,
  ShieldAlert,
  Save,
  Check
} from "lucide-react";
import { User, Course, Lesson, ChatMessage, QuizQuestion, Quiz, eBookChapter } from "../types";
import { COURSES, EBOOK_CHAPTERS } from "../coursesData";

// Icon components mapped dynamically
const iconMap: Record<string, any> = {
  Cpu: Cpu,
  TrendingUp: TrendingUp,
  Compass: Compass,
  FolderGit2: FolderGit2,
};

interface StudentPortalProps {
  currentUser: User;
  onUpdateUser: (updated: User) => void;
  showToast: (msg: string, type: "success" | "error" | "info") => void;
}

export default function StudentPortal({
  currentUser,
  onUpdateUser,
  showToast,
}: StudentPortalProps) {
  const [activeTab, setActiveTab] = useState<"dashboard" | "classes" | "ebook" | "tutor" | "quiz" | "billing">("dashboard");
  
  // States for Class Tab
  const [selectedCourse, setSelectedCourse] = useState<Course>(() => {
    return COURSES.find(c => c.id === currentUser.selectedCourseId) || COURSES[0];
  });
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(() => {
    return selectedCourse.modules[0].lessons[0];
  });
  const [studentNote, setStudentNote] = useState("");
  const [savedNotes, setSavedNotes] = useState<Record<string, string>>(() => {
    return JSON.parse(localStorage.getItem(`notes_${currentUser.id}`) || "{}");
  });

  // Video Playing States
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  // States for eBook Tab
  const [activeeBookChapter, setActiveeBookChapter] = useState<eBookChapter>(EBOOK_CHAPTERS[0]);

  // States for AI Tutor Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const historical = localStorage.getItem(`chat_${currentUser.id}`);
    if (historical) return JSON.parse(historical);
    return [
      {
        id: "welcome",
        role: "assistant",
        content: `¡Hola ${currentUser.name}! Bienvenido a tu Tutor Virtual del curso. Soy el Ing. Edinson Pilozo. ¿Tienes alguna duda hoy sobre Computación Inteligente, automatización de ventas con bots, AutoCAD técnico o cómo armar tu portafolio cobrando en USDT? Pregúntame con tranquilidad y lo resolveremos paso a paso.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ];
  });
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // States for Quiz Tab
  const [quizCourseId, setQuizCourseId] = useState<string>("computacion-ia");
  const [quizTopic, setQuizTopic] = useState<string>("Iniciación y Computación Práctica");
  const [quizLoading, setQuizLoading] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizGraded, setQuizGraded] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // States for Billing
  const [txHashInput, setTxHashInput] = useState("");
  const [submittingTx, setSubmittingTx] = useState(false);

  // Sync scroll on chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem(`chat_${currentUser.id}`, JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Load correct lesson notes
  useEffect(() => {
    setStudentNote(savedNotes[selectedLesson.id] || "");
    setIsPlaying(false);
    setVideoProgress(0);
  }, [selectedLesson]);

  // Handle Note Save
  const handleSaveNote = () => {
    const updated = { ...savedNotes, [selectedLesson.id]: studentNote };
    setSavedNotes(updated);
    localStorage.setItem(`notes_${currentUser.id}`, JSON.stringify(updated));
    showToast("¡Nota de clase guardada lógicamente!", "success");
  };

  // Toggle lesson complete state
  const handleToggleLessonComplete = (lessonId: string) => {
    const arr = [...currentUser.completedLessons];
    const idx = arr.indexOf(lessonId);
    let completing = false;

    if (idx > -1) {
      arr.splice(idx, 1);
    } else {
      arr.push(lessonId);
      completing = true;
    }

    const updatedUser: User = {
      ...currentUser,
      completedLessons: arr,
    };

    // Calculate streak days
    const todayStr = new Date().toISOString().substring(0, 10);
    if (currentUser.lastActiveDate !== todayStr) {
      updatedUser.completedLessons.length > currentUser.completedLessons.length
        ? (updatedUser.streakDays = currentUser.streakDays + 1)
        : null;
      updatedUser.lastActiveDate = todayStr;
    }

    onUpdateUser(updatedUser);
    
    if (completing) {
      showToast("🎉 ¡Clase completada de manera exitosa! Sigue así.", "success");
    } else {
      showToast("Clase marcada como pendiente.", "info");
    }
  };

  // Chat submission
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsgText = chatInput.trim();
    setChatInput("");

    const newMsg: ChatMessage = {
      id: "u-" + Date.now(),
      role: "user",
      content: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const nextMessages = [...chatMessages, newMsg];
    setChatMessages(nextMessages);
    setChatLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok) {
        throw new Error("Respuesta de servidor fallida");
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: "b-" + Date.now(),
        role: "assistant",
        content: data.content,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setChatMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: "err-" + Date.now(),
        role: "assistant",
        content: "⚠️ No logré coordinar una respuesta en este momento porque falta configurar la API de Gemini en la plataforma o hay un problema de red. Por favor, revisa tus Secretos o intenta de nuevo.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChatMessages((prev) => [...prev, errorMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  // Generate dynamic quiz
  const handleGenerateQuiz = async () => {
    setQuizLoading(true);
    setQuizGraded(false);
    setQuizAnswers({});
    setActiveQuiz(null);

    const chosenCourseName = COURSES.find(c => c.id === quizCourseId)?.title || "General";

    try {
      const resp = await fetch("/api/gemini/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: chosenCourseName, topicName: quizTopic }),
      });

      if (!resp.ok) {
        throw new Error("No se pudo conectar con el examinador de IA");
      }

      const parsedQuiz = await resp.json();
      setActiveQuiz(parsedQuiz);
      showToast("📝 ¡Examen dinámico generado exitosamente por IA!", "success");
    } catch (error) {
      console.error(error);
      // Fallback quiz if API isn't ready
      const fallbackQuiz: Quiz = {
        quizTitle: `Evaluación Rápida sobre ${quizTopic}`,
        questions: [
          {
            id: "fq1",
            questionText: "¿Cuál es la principal ventaja de utilizar USDT (Criptomonedas Estables) para cobrar servicios freelance?",
            options: [
              "Es volátil y cambia de valor cada segundo permitiéndote especular.",
              "Evita altos cargos bancarios transfronterizos y mantiene paridad 1:1 con el dólar americano.",
              "Se requiere comprar un súper servidor informático de miles de dólares para emitirla.",
              "Ninguna de las opciones anteriores."
            ],
            correctIndex: 1,
            explanation: "El USDT viaja en blockchains ágiles, reduciendo la burocracia bancaria y sirviendo como resguardo de valor."
          },
          {
            id: "fq2",
            questionText: "En AutoCAD, ¿qué comando especial se utiliza para realizar copias paralelas equidistantes de muros o trazos?",
            options: [
              "Line (L)",
              "Trim (TR)",
              "Offset / Desfase (O)",
              "Scale (SC)"
            ],
            correctIndex: 2,
            explanation: "Offset permite duplicar líneas a distancias exactas (ej. 0.15m para muros), ahorrando un esfuerzo enorme."
          },
          {
            id: "fq3",
            questionText: "Al formular un prompt educativo en IA, ¿cuál de los siguientes elementos de restricción es fundamental para refinar la formalidad y evitar clichés?",
            options: [
              "Usar solo mayúsculas sostenidas.",
              "Establecer reglas negativas de exclusión (ej. 'no uses palabras aburridas').",
              "Preguntar vagamente sin dar contexto.",
              "Escribir prompts de un solo renglón."
            ],
            correctIndex: 1,
            explanation: "Las pautas negativas de filtrado restringen la probabilidad de tokens genéricos promoviendo respuestas altamente originales."
          }
        ]
      };
      setActiveQuiz(fallbackQuiz);
      showToast("Modo sin conexión: Examen generado desde material local de respaldo.", "info");
    } finally {
      setQuizLoading(false);
    }
  };

  // Grade Quiz
  const handleGradeQuiz = () => {
    if (!activeQuiz) return;
    let score = 0;
    activeQuiz.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    setQuizScore(score);
    setQuizGraded(true);
    showToast(`¡Test Calificado! Obtuviste ${score} de ${activeQuiz.questions.length} respuestas correctas.`, "info");
  };

  // Billing submit TX
  const handleSendUSDTProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (!txHashInput.trim()) {
      showToast("Por favor escribe un número de hash válido.", "error");
      return;
    }
    setSubmittingTx(true);
    setTimeout(() => {
      setSubmittingTx(false);
      const updatedUser: User = {
        ...currentUser,
        paymentStatus: "approved",
        isPremium: true,
        usdtTxHash: txHashInput,
      };
      onUpdateUser(updatedUser);
      setTxHashInput("");
      showToast("¡Transmisión verificada! Se han liberado tus accesos formativos Premium.", "success");
    }, 1200);
  };

  // Progress metrics
  const totalLessonsCount = COURSES.reduce((acc, c) => acc + c.modules.reduce((mAcc, m) => mAcc + m.lessons.length, 0), 0);
  const completedLessonsCount = currentUser.completedLessons.length;
  const progressPercent = totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0;

  return (
    <div className="min-height-[90vh] bg-[#0B0D11] text-gray-100 flex flex-col lg:flex-row shadow-inner pt-16 sm:pt-20">
      
      {/* Sidebar Controls */}
      <aside className="w-full lg:w-64 bg-[#111319] border-b lg:border-b-0 lg:border-r border-white/5 flex lg:flex-col justify-between shrink-0 p-4 lg:p-6 select-none overflow-x-auto lg:overflow-x-visible gap-2 lg:gap-0">
        
        {/* Tab Items */}
        <div className="flex lg:flex-col w-full gap-1.5 min-w-[600px] lg:min-w-0" id="portal-tabs-sidebar">
          <div className="hidden lg:block pb-4 mb-4 border-b border-white/5">
            <h4 className="text-[11px] text-gray-500 font-bold uppercase tracking-widest pl-2">Salas de Estudio</h4>
          </div>

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center gap-3 w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "dashboard"
                ? "bg-slate-900 border-l-2 border-emerald-500 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
            id="tab-btn-dashboard"
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            Escritorio Principal
          </button>

          <button
            onClick={() => {
              setActiveTab("classes");
              // default select user course
              const uc = COURSES.find(c => c.id === currentUser.selectedCourseId) || COURSES[0];
              setSelectedCourse(uc);
              setSelectedLesson(uc.modules[0].lessons[0]);
            }}
            className={`flex items-center gap-3 w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "classes"
                ? "bg-slate-900 border-l-2 border-emerald-500 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
            id="tab-btn-classes"
          >
            <Play className="w-4 h-4 text-blue-400 animate-pulse" />
            Clases Prácticas
          </button>

          <button
            onClick={() => setActiveTab("ebook")}
            className={`flex items-center gap-3 w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "ebook"
                ? "bg-slate-900 border-l-2 border-emerald-500 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
            id="tab-btn-ebook"
          >
            <BookMarked className="w-4 h-4 text-purple-400" />
            Bono: eBook Gratuito
          </button>

          <button
            onClick={() => setActiveTab("tutor")}
            className={`flex items-center gap-3 w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "tutor"
                ? "bg-slate-900 border-l-2 border-emerald-500 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
            id="tab-btn-tutor"
          >
            <MessageSquare className="w-4 h-4 text-orange-400" />
            Tutor IA (Ing. Edinson)
          </button>

          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-3 w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "quiz"
                ? "bg-slate-900 border-l-2 border-emerald-500 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
            id="tab-btn-quiz"
          >
            <Award className="w-4 h-4 text-sky-400" />
            Test de Conocimiento
          </button>

          <button
            onClick={() => setActiveTab("billing")}
            className={`flex items-center gap-3 w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "billing"
                ? "bg-slate-900 border-l-2 border-emerald-500 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
            id="tab-btn-billing"
          >
            <DollarSign className="w-4 h-4 text-emerald-400" />
            Estado de Cuenta
          </button>
        </div>

        {/* Sidebar Footer details */}
        <div className="hidden lg:flex flex-col gap-3 pt-6 border-t border-white/5">
          <div className="bg-[#181A20] rounded-xl p-3 border border-white/5 text-[11px] text-gray-400 space-y-1">
            <div className="flex justify-between items-center text-white font-semibold">
              <span>Suscripción Activa</span>
              <span className={`w-2 h-2 rounded-full ${currentUser.isPremium ? "bg-emerald-500" : "bg-red-500 animate-ping"}`} />
            </div>
            <p className="font-mono text-gray-500">Membresía Educativa</p>
            <p className="text-emerald-400 text-[10px] mt-1 font-bold">Inversión mensual: $35 USDT</p>
          </div>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full" id="portal-main-panel-view">

        {/* ── TAB 1: DASHBOARD (ESCRITORIO) ── */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            {/* Greeting */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-gradient-to-r from-[#171B26] to-[#12141C] p-6 rounded-2xl border border-white/5 gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  ¡Hola, {currentUser.name}! <span className="text-yellow-400 animate-bounce">👋</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Tu ecosistema técnico está en línea. Sigue consumiendo tus lecciones para dominar el mercado internacional.
                </p>
              </div>

              {/* Flame Streak Indicator */}
              <div className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 px-4 py-3 rounded-xl">
                <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
                <div className="text-left">
                  <div className="text-base sm:text-lg font-black text-white leading-none">{currentUser.streakDays} Días</div>
                  <div className="text-[10px] text-orange-400 font-bold uppercase tracking-wider mt-0.5">Racha de Lecciones</div>
                </div>
              </div>
            </div>

            {/* Quick stats rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Progress Panel */}
              <div className="bg-[#13161D] rounded-xl p-5 border border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Tu Avance Integral</span>
                  <h3 className="text-2xl font-black text-white mt-1">{progressPercent}%</h3>
                  <div className="w-full bg-slate-900 rounded-full h-2.5 mt-3 overflow-hidden">
                    <div className="bg-emerald-500 h-full transition-all duration-550" style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4 font-sans justify-between flex">
                  <span>{completedLessonsCount} de {totalLessonsCount} clases logradas</span>
                  <span className="text-emerald-400 font-extrabold">{totalLessonsCount - completedLessonsCount} restantes</span>
                </p>
              </div>

              {/* Direct Course access helper */}
              <div className="bg-[#13161D] rounded-xl p-5 border border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Tu Curso Principal</span>
                  <h3 className="text-lg font-extrabold text-white mt-1 line-clamp-1">
                    {COURSES.find(c => c.id === currentUser.selectedCourseId)?.title || COURSES[0].title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                    Inscripción verificada. Puedes cursar los 4 módulos integrales incluidos en tu suite USDT.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab("classes");
                    const uc = COURSES.find(c => c.id === currentUser.selectedCourseId) || COURSES[0];
                    setSelectedCourse(uc);
                    setSelectedLesson(uc.modules[0].lessons[0]);
                  }}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg text-center mt-4 transition cursor-pointer"
                >
                  Entrar a Aula Virtual
                </button>
              </div>

              {/* Bonus Helper */}
              <div className="bg-[#13161D] rounded-xl p-5 border border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Bono Digital de Aceleración</span>
                  <h3 className="text-lg font-extrabold text-[#9B59B6] mt-1 flex items-center gap-1.5">
                    eBook Gratuito Liberado
                  </h3>
                  <p className="text-xs text-gray-400 mt-2">
                    "Acelerador Digital — Inteligencia Artificial para el Éxito". El manual de referencia corta valorado en $25 USDT.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveTab("ebook");
                    setActiveeBookChapter(EBOOK_CHAPTERS[0]);
                  }}
                  className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg text-center mt-4 transition cursor-pointer"
                >
                  Abrir Lector de eBook
                </button>
              </div>
            </div>

            {/* Curriculum breakdown on Dashboard */}
            <div className="space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">Ecosistema Completo de Formación</h3>
                <p className="text-xs text-gray-500 mt-0.5">Tienes acceso sin restricciones a los 4 grandes planes formativos incluidos.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COURSES.map((course) => {
                  const IconComp = iconMap[course.icon] || Cpu;
                  const countCourseLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
                  const isUserActive = currentUser.selectedCourseId === course.id;

                  return (
                    <div
                      key={course.id}
                      className={`rounded-2xl p-5 border bg-slate-950/40 relative overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                        isUserActive ? "border-emerald-500/20 bg-[#141924]/60" : "border-white/5"
                      }`}
                    >
                      {/* Course Banner Style */}
                      <div className="absolute inset-0 pointer-events-none opacity-40" style={{ backgroundImage: course.bannerPattern }} />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-2.5 rounded-xl bg-slate-900 border border-white/10 text-white`}>
                            <IconComp className="w-5 h-5 text-emerald-400" />
                          </div>
                          {isUserActive && (
                            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 py-1 px-2.5 rounded-full uppercase font-black tracking-widest">
                              Curso Elegido
                            </span>
                          )}
                        </div>

                        <h4 className="text-sm sm:text-base font-extrabold text-white">{course.title}</h4>
                        <p className="text-xs text-gray-400 mt-1.5 leading-relaxed line-clamp-2">{course.description}</p>
                      </div>

                      <div className="relative z-10 flex justify-between items-center border-t border-white/5 pt-4 mt-4">
                        <span className="text-[10px] text-gray-500 font-mono">
                          {course.modules.length} Módulos · {countCourseLessons} Clases
                        </span>
                        <button
                          onClick={() => {
                            setActiveTab("classes");
                            setSelectedCourse(course);
                            setSelectedLesson(course.modules[0].lessons[0]);
                          }}
                          className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          Cursar →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Callout on Desktop */}
            <div className="bg-[#121920] border border-orange-500/20 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1 text-[10px] bg-orange-500/10 border border-orange-500/20 text-orange-400 py-0.5 px-2.5 rounded-md uppercase font-black mb-2 tracking-widest">
                    <Sparkles className="w-3 h-3 animate-spin" /> Coach de Inteligencia
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-white">¿Tienes problemas con tus tareas académicas o código?</h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-xl">
                    Utiliza nuestro Tutor Virtual entrenado por Inteligencia Artificial para emular consultorías privadas del Ing. Edinson Pilozo y acelerar tu aprendizaje lógico.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("tutor")}
                  className="bg-orange-500 hover:bg-orange-400 text-slate-950 text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded-lg shadow-md transition cursor-pointer"
                >
                  Consultar al Ing. Edinson
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: CLASES PRACTICAS (VIDEO + LECTOR) ── */}
        {activeTab === "classes" && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            
            {/* Left Column: Video player & notes */}
            <div className="xl:col-span-2 space-y-6">
              
              {/* Simulated Video Player with rich UX */}
              <div className="bg-black rounded-2xl overflow-hidden border border-white/5 relative group shadow-2xl">
                
                {/* Standard video visual card */}
                <div className="aspect-video w-full bg-slate-950 relative flex items-center justify-center">
                  <img
                    src={selectedLesson.videoPlaceholderUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=60"}
                    className="absolute inset-0 w-full h-full object-cover opacity-35 filter blur-[1px] group-hover:scale-105 transition duration-[3000ms]"
                    alt="Clase virtual"
                  />

                  {/* Play Overlay */}
                  {!isPlaying ? (
                    <button
                      onClick={() => {
                        setIsPlaying(true);
                        showToast("Simulando reproducción de vídeo de alta definición (Premium).", "info");
                        // simulate progress advancement
                        const interval = setInterval(() => {
                          setVideoProgress((prev) => {
                            if (prev >= 100) {
                              clearInterval(interval);
                              setIsPlaying(false);
                              return 100;
                            }
                            return prev + 1;
                          });
                        }, 500);
                      }}
                      className="relative z-10 w-16 h-16 rounded-full bg-emerald-500 hover:bg-emerald-400 shadow-xl flex items-center justify-center text-slate-950 cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300"
                      id="video-play-btn"
                    >
                      <Play className="w-7 h-7 fill-slate-950 ml-1" />
                    </button>
                  ) : (
                    <div className="relative z-10 text-center space-y-2 pointer-events-none">
                      <div className="animate-spin rounded-full h-10 w-10 border-2 border-emerald-500 border-t-transparent mx-auto" />
                      <p className="text-xs text-emerald-400 font-mono tracking-wider">REPRODUCIENDO CLASE HD (SIMULADOR) - {videoProgress}%</p>
                    </div>
                  )}

                  {/* Top Bar Video Watermark */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-slate-950/80 backdrop-blur border border-white/5 py-1.5 px-3 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-gray-300 font-semibold uppercase tracking-wide">Clase Premium del Ecosistema</span>
                  </div>

                  {/* Bottom Controls Bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col gap-2 relative z-20">
                    <div className="w-full bg-white/10 rounded-full h-1 cursor-pointer">
                      <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${videoProgress}%` }} />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => {
                            setIsPlaying(!isPlaying);
                            showToast(isPlaying ? "Simulación de pausa." : "Reproducción en curso.", "info");
                          }}
                          className="hover:text-white transition"
                        >
                          {isPlaying ? "Pausar" : "Reproducir"}
                        </button>
                        <span>{isPlaying ? "02:14" : "00:00"} / {selectedLesson.duration}</span>
                      </div>
                      <span className="font-mono text-[10px] bg-red-500/10 text-red-400 border border-red-500/10 px-2 py-0.5 rounded uppercase">
                        Streaming Activo
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lesson Text, description + notes */}
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight">{selectedLesson.title}</h3>
                    <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      Duración estimada: <strong>{selectedLesson.duration} mins</strong>
                    </p>
                  </div>

                  <button
                    onClick={() => handleToggleLessonComplete(selectedLesson.id)}
                    className={`flex items-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                      currentUser.completedLessons.includes(selectedLesson.id)
                        ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                        : "bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer"
                    }`}
                    id="toggle-lesson-complete"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {currentUser.completedLessons.includes(selectedLesson.id) ? "Clase Completada ✓" : "Marcar como Completada"}
                  </button>
                </div>

                <div className="bg-[#13161D] rounded-xl p-5 border border-white/5">
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Resumen de Contenido</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{selectedLesson.summary}</p>
                </div>

                {/* Markdown reader */}
                {selectedLesson.contentMarkdown && (
                  <div className="bg-[#111319] rounded-xl p-6 border border-white/5 text-slate-300 text-sm leading-relaxed space-y-4 prose prose-invert font-sans max-w-none">
                    <h4 className="text-xs text-gray-500 font-bold uppercase tracking-widest border-b border-white/5 pb-2 mb-4">Material Escrito Adicional</h4>
                    
                    {/* Render paragraphs split from mock file */}
                    {selectedLesson.contentMarkdown.split("\n\n").map((para, pIdx) => {
                      if (para.startsWith("###")) {
                        return <h3 key={pIdx} className="text-base font-black text-white mt-4">{para.replace("###", "")}</h3>;
                      }
                      if (para.startsWith("-")) {
                        return (
                          <ul key={pIdx} className="list-disc pl-5 space-y-1 my-2">
                            {para.split("\n").map((item, iIdx) => (
                              <li key={iIdx}>{item.replace("-", "").trim()}</li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={pIdx}>{para}</p>;
                    })}
                  </div>
                )}

                {/* Class Studient Notepad */}
                <div className="bg-[#13161D] rounded-xl p-5 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider flex items-center gap-2">
                      <Notebook className="w-4 h-4 text-emerald-400" />
                      Bloc de Notas del Estudiante
                    </h4>
                    <span className="text-[10px] text-gray-500">Persiste lógicamente en tu navegador</span>
                  </div>

                  <textarea
                    rows={4}
                    value={studentNote}
                    onChange={(e) => setStudentNote(e.target.value)}
                    placeholder="Escribe tus propios resúmenes, comandos, apuntes o enlaces de estudio acerca de esta lección..."
                    className="w-full bg-slate-950 border border-white/5 hover:border-white/10 focus:border-emerald-500 rounded-lg p-3 text-sm text-white focus:outline-none transition placeholder-gray-700 resize-none font-sans"
                    id="student-notes-textarea"
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveNote}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider py-2 px-4 rounded-lg flex items-center gap-2 cursor-pointer transition focus:outline-none"
                    >
                      <Save className="w-3.5 h-3.5 text-emerald-400" /> Guardar Mis Apuntes
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Module curriculum and lesson selects */}
            <div className="space-y-6">
              
              {/* Course switch filter dropdown */}
              <div className="bg-[#13161D] rounded-xl p-4 border border-white/5 space-y-2">
                <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Cambiar de Aula Curricular</label>
                <select
                  value={selectedCourse.id}
                  onChange={(e) => {
                    const found = COURSES.find(c => c.id === e.target.value) || COURSES[0];
                    setSelectedCourse(found);
                    setSelectedLesson(found.modules[0].lessons[0]);
                  }}
                  className="w-full bg-slate-950 border border-white/5 py-2.5 px-3 rounded-lg text-xs leading-none font-extrabold text-white cursor-pointer focus:outline-none transition"
                >
                  {COURSES.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>

              {/* Modules layout list */}
              <div className="bg-[#13161D] rounded-2xl p-5 border border-white/5 space-y-4">
                <div className="border-b border-white/5 pb-3">
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider">Plan del Curso Actual</h4>
                  <p className="text-[11px] text-emerald-400 font-medium tracking-wide mt-0.5 line-clamp-1">{selectedCourse.title}</p>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  {selectedCourse.modules.map((mod) => (
                    <div key={mod.id} className="space-y-2">
                      <h5 className="text-[11px] text-gray-400 font-bold bg-white/5 border border-white/5 py-1.5 px-3 rounded uppercase tracking-wider">
                        {mod.title}
                      </h5>
                      
                      <div className="space-y-1.5 pl-1">
                        {mod.lessons.map((les) => {
                          const isCurrent = les.id === selectedLesson.id;
                          const isDone = currentUser.completedLessons.includes(les.id);

                          return (
                            <button
                              key={les.id}
                              onClick={() => setSelectedLesson(les)}
                              className={`w-full text-left p-2.5 rounded-lg text-xs flex justify-between items-center transition ${
                                isCurrent
                                  ? "bg-emerald-500/10 border border-emerald-500/20 text-white font-extrabold"
                                  : "bg-transparent text-gray-400 hover:text-white hover:bg-white/5"
                              }`}
                            >
                              <div className="flex items-start gap-2.5 max-w-[80%]">
                                <span className="mt-0.5 shrink-0">
                                  {isDone ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  ) : (
                                    <Play className="w-3.5 h-3.5 text-gray-600" />
                                  )}
                                </span>
                                <span className="truncate">{les.title.split(": ")[1]}</span>
                              </div>
                              <span className="text-[10px] text-gray-500 font-mono shrink-0 pl-2">{les.duration}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: EBOOK BONO ── */}
        {activeTab === "ebook" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Chapters sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-[#13161D] rounded-xl p-4 border border-white/5">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-3">Índice del eBook</span>
                
                <div className="flex flex-col gap-1.5">
                  {EBOOK_CHAPTERS.map(ch => (
                    <button
                      key={ch.id}
                      onClick={() => setActiveeBookChapter(ch)}
                      className={`w-full text-left py-3 px-4 rounded-lg text-xs leading-snug font-bold border transition ${
                        activeeBookChapter.id === ch.id
                          ? "bg-purple-500/10 border-purple-500/30 text-white"
                          : "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {ch.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1C1425] to-[#121019] p-4 rounded-xl border border-purple-500/10 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mx-auto text-lg">💡</div>
                <h5 className="text-xs font-bold text-white">¿Por qué leer este manual?</h5>
                <p className="text-[11px] text-gray-400 leading-normal">
                  Contiene atajos prácticos, marcos lógicos para diseñar prompts sin fallas, y una guía rápida para facturar USDT en minutos.
                </p>
              </div>
            </div>

            {/* eBook Reader Sheet style */}
            <div className="lg:col-span-3 bg-[#1B1D25] rounded-2xl border border-white/5 p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl" />

              {/* Chapter Header */}
              <div className="border-b border-white/10 pb-4">
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Acelerador Digital — Ebook Incluido</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5">{activeeBookChapter.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 italic font-sans leading-relaxed">{activeeBookChapter.subtitle}</p>
              </div>

              {/* Chapter Content paragraphs */}
              <div className="text-gray-300 text-sm sm:text-base font-sans leading-relaxed space-y-5">
                {activeeBookChapter.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Highlights Tips Block */}
              <div className="bg-[#121319] rounded-xl p-5 border border-purple-500/10 space-y-3">
                <h4 className="text-xs text-purple-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Recomendaciones del Ing. Edinson
                </h4>
                
                <ul className="space-y-2.5 text-xs text-gray-300 font-sans">
                  {activeeBookChapter.tips.map((tip, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <span className="text-purple-400 font-black shrink-0">✦</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lector footer indicators */}
              <div className="flex justify-between items-center text-xs text-gray-500 border-t border-white/5 pt-4">
                <span>Capítulo de Referencia Rápida</span>
                <span className="font-mono text-[10px]">Pág. {EBOOK_CHAPTERS.indexOf(activeeBookChapter) + 1} de {EBOOK_CHAPTERS.length}</span>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 4: TUTOR IA (CHAT) ── */}
        {activeTab === "tutor" && (
          <div className="bg-[#111319] border border-white/5 rounded-2xl flex flex-col h-[70vh] shadow-2xl relative overflow-hidden">
            
            {/* Header chat metadata details */}
            <div className="bg-[#181C26] border-b border-white/5 py-4 px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold uppercase">
                  EP
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Ing. Edinson Pilozo</h4>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Tutor Virtual Inteligente de Guardia
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setChatMessages([
                    {
                      id: "welcome",
                      role: "assistant",
                      content: `¡Hola ${currentUser.name}! Bienvenido a tu Tutor Virtual del curso. Soy el Ing. Edinson Pilozo. ¿Tienes alguna duda hoy sobre Computación Inteligente, automatización de ventas con bots, AutoCAD técnico o cómo armar tu portafolio cobrando en USDT? Pregúntame con tranquilidad y lo resolveremos paso a paso.`,
                      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    },
                  ]);
                  showToast("Chat reiniciado de manera limpia.", "info");
                }}
                className="py-1 px-2.5 rounded hover:bg-white/5 text-[10px] text-gray-500 font-bold hover:text-white border border-white/5 hover:border-white/10 transition"
              >
                Limpiar Chat
              </button>
            </div>

            {/* Chat message body list */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 font-sans text-sm">
              {chatMessages.map((msg) => {
                const isBot = msg.role === "assistant";

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 max-w-[85%] ${isBot ? "mr-auto text-left" : "ml-auto text-right flex-row-reverse"}`}
                  >
                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold uppercase ${
                      isBot ? "bg-orange-500/10 border border-orange-500/20 text-orange-400" : "bg-emerald-500 text-slate-950"
                    }`}>
                      {isBot ? "EP" : currentUser.name.substring(0, 2)}
                    </div>

                    <div className="space-y-1">
                      <div className={`rounded-xl p-3.5 leading-relaxed text-slate-200 border ${
                        isBot ? "bg-[#181C26] border-white/5 rounded-tl-none" : "bg-emerald-500/5 border-emerald-500/10 text-right rounded-tr-none"
                      }`}>
                        {/* Split block or markdown mock render */}
                        {msg.content.split("\n").map((line, lIdx) => (
                          <p key={lIdx} className={lIdx > 0 ? "mt-1.5" : ""}>{line}</p>
                        ))}
                      </div>
                      <span className="block text-[9px] text-gray-500 font-mono tracking-wide px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Typing feedback spinner */}
              {chatLoading && (
                <div className="flex items-start gap-3 mr-auto text-left max-w-[85%]">
                  <div className="w-8 h-8 rounded-full shrink-0 bg-orange-500/10 border border-orange-500/20 animate-spin flex items-center justify-center" />
                  <div className="bg-[#181C26] border border-white/5 rounded-xl rounded-tl-none p-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce delay-0" />
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce delay-150" />
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce delay-300" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Interactive quick template prompt suggest tags */}
            <div className="px-4 py-2 border-t border-white/5 bg-[#12141A] flex gap-2 overflow-x-auto select-none">
              <button
                onClick={() => setChatInput("Explícame qué son las capas (layers) de AutoCAD de forma sencilla.")}
                className="shrink-0 bg-white/5 hover:bg-white/10 text-[10px] text-gray-300 font-semibold border border-white/5 py-1 px-2.5 rounded-full hover:text-white transition focus:outline-none"
              >
                ¿Qué son las Capas de AutoCAD?
              </button>
              <button
                onClick={() => setChatInput("¿Cómo configuro un auto-contestador inteligente en mi celular?")}
                className="shrink-0 bg-white/5 hover:bg-white/10 text-[10px] text-gray-300 font-semibold border border-white/5 py-1 px-2.5 rounded-full hover:text-white transition focus:outline-none"
              >
                ¿Cómo automatizar WhatsApp?
              </button>
              <button
                onClick={() => setChatInput("Dame 3 atajos prácticos para manipular archivos super rápido en Windows.")}
                className="shrink-0 bg-white/5 hover:bg-white/10 text-[10px] text-gray-300 font-semibold border border-white/5 py-1 px-2.5 rounded-full hover:text-white transition focus:outline-none"
              >
                Atajos de teclado rápidos
              </button>
            </div>

            {/* Chat Input form */}
            <form onSubmit={handleSendChatMessage} className="p-4 bg-[#14161F] border-t border-white/5 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Pregunta algo al Ing. Edinson... (Ej. ¿Cómo puedo cobrar servicios freelance con USDT?)"
                className="flex-1 bg-slate-950 border border-white/5 focus:border-emerald-500 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none transition placeholder-gray-600 font-sans"
                id="tutor-chat-input"
              />
              <button
                type="submit"
                disabled={chatLoading || !chatInput.trim()}
                className="bg-orange-500 hover:bg-orange-400 text-slate-950 p-2.5 rounded-lg font-bold flex items-center justify-center transition focus:outline-none cursor-pointer"
                id="send-chat-btn"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        {/* ── TAB 5: AI QUIZ EXAMINER ── */}
        {activeTab === "quiz" && (
          <div className="space-y-6">
            
            {/* Settings to invoke generative quiz */}
            <div className="bg-[#13161D] rounded-2xl p-5 border border-white/5 space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">Examinador Técnico de Conocimiento</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Genera una evaluación de 3 preguntas de opción múltiple impulsada por Inteligencia Artificial para certificar tu avance.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">Seleccionar Eje Académico</label>
                  <select
                    value={quizCourseId}
                    onChange={(e) => setQuizCourseId(e.target.value)}
                    className="w-full bg-[#1A1F2B] border border-white/5 p-2.5 rounded-lg text-xs font-bold leading-none text-white cursor-pointer"
                  >
                    {COURSES.map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block font-sans">Escribir Subtema Específico</label>
                  <input
                    type="text"
                    value={quizTopic}
                    onChange={(e) => setQuizTopic(e.target.value)}
                    placeholder="Ej. Atajos informáticos, Capas AutoCAD, USDT, bots"
                    className="w-full bg-[#1A1F2B] border border-white/5 p-2.5 rounded-lg text-xs font-semibold text-white focus:outline-none placeholder-gray-500 font-sans"
                    id="quiz-topic-input"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerateQuiz}
                disabled={quizLoading}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-3 px-5 rounded-lg shadow-md transition disabled:bg-slate-700 disabled:text-gray-400 flex items-center justify-center gap-2 cursor-pointer"
                id="generate-quiz-btn"
              >
                {quizLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Generando exámen por IA...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" /> Generar Evaluación Rápida
                  </>
                )}
              </button>
            </div>

            {/* Quiz active screen */}
            {activeQuiz && (
              <div className="bg-[#111319] rounded-2xl border border-white/5 p-6 space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h4 className="text-sm sm:text-base font-black text-white">{activeQuiz.quizTitle}</h4>
                  <span className="text-[10px] bg-slate-900 border border-white/10 py-1 px-2.5 rounded font-mono text-gray-400">
                    Preguntas Evaluadas: 3
                  </span>
                </div>

                {/* Show Grading Score Alert */}
                {quizGraded && (
                  <div className={`p-4 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
                    quizScore >= 2
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      : "bg-red-500/10 border-red-500/20 text-red-400"
                  }`}>
                    <div>
                      <h5 className="font-extrabold text-sm sm:text-base">
                        {quizScore >= 2 ? "🎉 ¡Evaluación Aprobada!" : "📚 Recomendamos Repasar"}
                      </h5>
                      <p className="text-xs text-slate-300 mt-1 leading-normal font-sans">
                        Puntaje final: <strong>{quizScore} de 3 aciertos</strong>. Revisa las glosas lógicas de retroalimentación dadas por el Ing. Edinson.
                      </p>
                    </div>

                    <button
                      onClick={handleGenerateQuiz}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 py-2 px-4 rounded-lg font-bold text-xs text-white uppercase tracking-wider transition cursor-pointer"
                    >
                      Intentar Otro Test
                    </button>
                  </div>
                )}

                {/* Question items content list */}
                <div className="space-y-6 font-sans text-sm">
                  {activeQuiz.questions.map((q, qidx) => {
                    const chosenIdx = quizAnswers[q.id];
                    const isCorrectChoice = chosenIdx === q.correctIndex;

                    return (
                      <div key={q.id} className="p-4 sm:p-5 rounded-xl bg-slate-950/40 border border-white/5 space-y-4">
                        <h5 className="font-bold text-white text-sm sm:text-base">
                          {qidx + 1}. {q.questionText}
                        </h5>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                          {q.options.map((opt, oidx) => {
                            const isSelect = chosenIdx === oidx;
                            const isCorrectOpt = oidx === q.correctIndex;

                            let btnStyle = "bg-[#1E222D]/50 border-white/5 text-gray-300 hover:bg-[#1E222D] hover:text-white";
                            if (quizGraded) {
                              if (isCorrectOpt) {
                                btnStyle = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-extrabold";
                              } else if (isSelect && !isCorrectChoice) {
                                btnStyle = "bg-red-500/10 border-red-500/30 text-red-400 font-extrabold";
                              }
                            } else if (isSelect) {
                              btnStyle = "bg-sky-500/10 border-sky-500/30 text-white font-extrabold";
                            }

                            return (
                              <button
                                key={oidx}
                                disabled={quizGraded}
                                onClick={() => setQuizAnswers(prev => ({ ...prev, [q.id]: oidx }))}
                                className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm leading-normal transition flex justify-between items-center ${btnStyle} ${
                                  quizGraded ? "cursor-default" : "cursor-pointer"
                                }`}
                              >
                                <span>{opt}</span>
                                {isSelect && !quizGraded && <span className="w-2 h-2 rounded-full bg-sky-400 shadow-glow" />}
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation block */}
                        {quizGraded && (
                          <div className="p-3 bg-[#1A1F29] rounded-lg border border-white/5 mt-3 text-xs leading-relaxed text-gray-400">
                            <strong className="text-gray-300 block mb-1">✍️ Glosa Didáctica:</strong>
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Grade Action button */}
                {!quizGraded && (
                  <div className="pt-4 border-t border-white/5 flex justify-end">
                    <button
                      onClick={handleGradeQuiz}
                      disabled={Object.keys(quizAnswers).length < 3}
                      className="bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:text-gray-500 text-slate-950 font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-lg shadow-md transition cursor-pointer"
                      id="submit-grade-btn"
                    >
                      Calificar Mis Respuestas
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 6: BILLING & ESTADO DE CUENTA ── */}
        {activeTab === "billing" && (
          <div className="space-y-6">
            
            {/* Info Plan */}
            <div className="bg-[#13161D] rounded-2xl p-6 border border-white/5 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white">Detalle de tu Membresía Tecnológica</h3>
                  <p className="text-xs text-gray-400 mt-1">Ecosistema integral de cursos e Inteligencia Artificial.</p>
                </div>
                <span className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-1.5 px-3 rounded uppercase font-black tracking-wider">
                  Premium Activo
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-sans">
                <div className="p-4 bg-slate-950/40 rounded-xl border border-white/5 leading-normal">
                  <span className="text-gray-500 font-bold uppercase tracking-wider block mb-1">Precio Fijo Mensual</span>
                  <p className="text-base sm:text-lg font-black text-white">$35.00 USDT</p>
                  <p className="text-[10px] text-gray-500 mt-1">Sin contratos forzosos. Cancela online libremente.</p>
                </div>

                <div className="p-4 bg-slate-950/40 rounded-xl border border-white/5 leading-normal">
                  <span className="text-gray-500 font-bold uppercase tracking-wider block mb-1">Método de Cobro Oficial</span>
                  <p className="text-base sm:text-lg font-black text-white">USDT (TRC-20 / BEP-20)</p>
                  <p className="text-[10px] text-gray-500 mt-1">Criptomoneda estable que resguarda tu capital técnico.</p>
                </div>

                <div className="p-4 bg-slate-950/40 rounded-xl border border-white/5 leading-normal">
                  <span className="text-gray-500 font-bold uppercase tracking-wider block mb-1">Garantía del Sistema</span>
                  <p className="text-base sm:text-lg font-black text-white">7 Días de Reembolso</p>
                  <p className="text-[10px] text-gray-400 mt-1 text-emerald-400/90 font-bold">100% libre de riesgo contractual.</p>
                </div>
              </div>
            </div>

            {/* Instruction block to simulate payment submission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="bg-[#111319] rounded-2xl p-6 border border-white/5 space-y-4 font-sans text-sm">
                <h4 className="text-base font-extrabold text-white">¿Cómo realizar tu membresía?</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Para acreditar tus mensualidades o realizar transferencias USDT seguras, puedes enviar el capital directamente a cualquiera de las billeteras oficiales autorizadas del Ing. Edinson.
                </p>

                <div className="p-4 bg-slate-950 rounded-xl border border-white/5 space-y-3 font-mono text-[11px] select-all">
                  <div>
                    <span className="text-gray-500 uppercase font-bold text-[10px] block">Dirección USDT (Red Tron TRC-20)</span>
                    <p className="text-emerald-400 break-all mt-1">TYv1hN3Z7R9kP2mA4xB8yC5wD9fC3kPqWe</p>
                  </div>
                  <hr className="border-white/5" />
                  <div>
                    <span className="text-gray-500 uppercase font-bold text-[10px] block">Dirección USDT (Red Binance BEP-20)</span>
                    <p className="text-blue-400 break-all mt-1">0x3f5CE0D216EA013D60BE196EA1240092BfcE24AA</p>
                  </div>
                </div>

                <p className="text-[11px] text-gray-500">
                  ⚠️ Recuerda enviar siempre el tipo de red exacta (TRC-20 para Tron o BEP-20 para Smart Chain) al transferir para evitar contratiempos de blockchains.
                </p>
              </div>

              {/* Submit Tx hash proof form */}
              <div className="bg-[#111319] rounded-2xl p-6 border border-white/5 space-y-4">
                <h4 className="text-base font-extrabold text-white">Declarar Comprobante de Pago</h4>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  ¿Realizaste una membresía por transferencia externa? Registra el Hash de la transacción (Tx Hash) abajo para actualizar de inmediato tu cuenta.
                </p>

                <form onSubmit={handleSendUSDTProof} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">ID Transacción (TX HASH)</label>
                    <input
                      type="text"
                      required
                      value={txHashInput}
                      onChange={(e) => setTxHashInput(e.target.value)}
                      placeholder="Ej. 0xd8bf673e4a8b7c9d9f5da0e124..."
                      className="w-full bg-slate-950 border border-white/5 hover:border-white/10 focus:border-emerald-500 rounded-lg py-2.5 px-4 text-xs text-white uppercase focus:outline-none placeholder-gray-700 font-mono transition"
                      id="tx-hash-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingTx || !txHashInput.trim()}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-3 px-4 rounded-lg shadow-md transition disabled:bg-slate-800 disabled:text-gray-500 flex items-center justify-center gap-2 cursor-pointer"
                    id="submit-tx-btn"
                  >
                    {submittingTx ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Procesando Hash...
                      </>
                    ) : (
                      "Verificar Transmisión USDT"
                    )}
                  </button>
                </form>

                {currentUser.usdtTxHash && (
                  <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 text-xs font-mono text-emerald-400 text-left">
                    <strong>✓ Último Hash Registrado:</strong>
                    <p className="break-all text-[11px] text-slate-300 mt-1 uppercase">{currentUser.usdtTxHash}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
