import { useState } from "react";
import {
  Cpu,
  TrendingUp,
  Compass,
  FolderGit2,
  Shield,
  Clock,
  ArrowRight,
  ChevronDown,
  Sparkles,
  BookOpen,
  Award,
  Globe,
  DollarSign,
  Undo2
} from "lucide-react";
import { COURSES } from "../coursesData";

interface LandingPageProps {
  onOpenAuth: (courseId?: string) => void;
}

export default function LandingPage({ onOpenAuth }: LandingPageProps) {
  // Frequently Asked Questions State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const FAQS = [
    {
      q: "¿Necesito conocimientos previos de tecnología?",
      a: "Los cursos están diseñados para partir desde cero. El contenido es progresivo y cada concepto se explica de forma clara antes de avanzar al siguiente. No importa si hoy apenas sabes encender un computador."
    },
    {
      q: "¿Puedo tomar los cursos si tengo trabajo o estudio de tiempo completo?",
      a: "Absolutamente. Los cursos están disponibles en formato flexible — puedes acceder a las clases cuándo mejor te funcione. Muchos estudiantes y profesionales avanzan perfectamente dedicando entre 30 minutos y una hora al día."
    },
    {
      q: "¿En cuánto tiempo puedo empezar a ver resultados?",
      a: "Hay personas que consiguen sus primeros proyectos freelance en el primer mes. Otras usan las herramientas de IA para ser más eficientes en su trabajo actual desde las primeras semanas. El sistema está diseñado para que cada módulo tenga aplicación práctica inmediata."
    },
    {
      q: "¿Los cursos se actualizan cuando cambia la tecnología?",
      a: "Sí. El ecosistema tecnológico cambia constantemente — especialmente el mundo de la inteligencia artificial — y los contenidos se actualizan de forma periódica. Tu mensualidad incluye acceso a esas actualizaciones sin costo adicional."
    },
    {
      q: "¿Cómo funciona el pago y cómo recibo mis accesos?",
      a: "El pago se realiza en USDT por seguridad y facilidad en transacciones internacionales de blockchain. Una vez realizado el pago o la simulación de registro, recibirás tus accesos de forma ágil con instrucciones de login sencillas para comenzar de inmediato."
    }
  ];

  return (
    <div className="bg-[#0B0D11] text-gray-100 font-sans selection:bg-emerald-500/30 selection:text-white" id="landing-main-view">
      
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-950 via-[#0B0D11] to-[#0B0D11]">
        
        {/* Glow Spheres */}
        <div className="absolute top-[-10%] right-[-10%] w-[30rem] sm:w-[50rem] h-[30rem] sm:h-[50rem] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[25rem] sm:w-[40rem] h-[25rem] sm:h-[40rem] rounded-full bg-blue-500/5 blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6 sm:space-y-8 px-2" id="hero-title-container">
          
          {/* Eyebrow badge with glowing indicator */}
          <div className="inline-flex items-center gap-2.5 bg-emerald-500/5 border border-emerald-500/25 px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Ing. Edinson Pilozo · Formación Tecnológica
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white select-none">
            ¿Y si la tecnología que hoy te asusta fuera exactamente la herramienta que mañana te <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-350 to-blue-400 underline decoration-emerald-500/50">cambia la vida</span>?
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-gray-400 font-sans leading-relaxed">
            Aprende Computación, Programación e Inteligencia Artificial desde cero — y conviértete en la persona más valiosa de cualquier empresa, aula o negocio.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenAuth("computacion-ia")}
              className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase py-4.5 px-8 rounded-lg shadow-xl shadow-emerald-500/10 cursor-pointer hover:-translate-y-1 hover:shadow-emerald-500/20 active:translate-y-0 transition-all duration-300"
              id="cta-register-hero"
            >
              Quiero inscribirme por $15 USDT →
            </button>
            <a
              href="#cursos"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold text-xs sm:text-sm uppercase tracking-wider py-4.5 px-8 rounded-lg text-center transition duration-300"
            >
              Explorar Cursos ↓
            </a>
          </div>

          {/* Quick Pricing note bar */}
          <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-4 text-xs text-gray-500 pt-2 font-mono">
            <span>Inscripción única <strong className="text-white">$15 USDT</strong></span>
            <span className="opacity-30">•</span>
            <span>Mensualidad <strong className="text-white">$35 USDT</strong></span>
            <span className="opacity-30">•</span>
            <span>Garantía <strong className="text-white">7 Días</strong></span>
          </div>

          {/* Grid de estadisticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 sm:pt-16 max-w-3xl mx-auto text-left" id="hero-stats-panels">
            <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5">
              <p className="text-2xl sm:text-3xl font-black text-white">5<span className="text-emerald-400">+</span></p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1.5">Países Activos</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5">
              <p className="text-2xl sm:text-3xl font-black text-white">4</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1.5">Cursos Incluidos</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5">
              <p className="text-2xl sm:text-3xl font-black text-white">$1<span className="text-emerald-400">.20</span></p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1.5">Inversión diaria</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/40 border border-white/5">
              <p className="text-2xl sm:text-3xl font-black text-white">7</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1.5">Días Garantía</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION: EL PROBLEMA REAL ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-white/5 bg-[#111319]" id="problema">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="max-w-2xl">
            <span className="text-[10px] sm:text-xs text-emerald-400 font-black uppercase tracking-widest block">El problema de fondo</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-1">
              Cada mes que no actúas, la brecha digital se hace más grande.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="problem-cards-grid">
            
            <div className="p-6 rounded-xl bg-slate-950/40 border border-white/5 relative overflow-hidden group">
              <div className="text-3xl mb-4">📨</div>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                Mandas currículums y <strong className="text-white">no recibes respuesta</strong> porque tu perfil no tiene las habilidades digitales que el mercado técnico de hoy exige.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950/40 border border-white/5 relative overflow-hidden group">
              <div className="text-3xl mb-4">📱</div>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                Tienes un negocio que <strong className="text-white">depende 100% de tu tiempo</strong> físico y presencia manual — si tú no asistes, el negocio no ingresa.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950/40 border border-white/5 relative overflow-hidden group">
              <div className="text-3xl mb-4">🎥</div>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                Intentas aprender de YouTube, <strong className="text-white">saltando de video en video</strong> sin un plan de estudio concreto, sin saber si te servirá de algo.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950/40 border border-white/5 relative overflow-hidden group">
              <div className="text-3xl mb-4">💸</div>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
                Invertiste en cursos teóricos que <strong className="text-white">prometían todo y no enseñaron nada</strong> práctico aplicable a tu realidad laboral.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION: LA SOLUCION (LOS CURSOS) ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B0D11]" id="cursos">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] sm:text-xs text-blue-400 font-black uppercase tracking-widest block">La Solución Integral</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Un sistema de formación que te lleva de donde estás hoy al <span className="text-emerald-400 underline decoration-slate-600/50">dominio técnico real</span>.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed pt-2">
              No es teoría aburrida ni relleno. Es aprendizaje progresivo con clases prácticas de cortas dimensiones, proyectos aplicados y retroalimentación constante.
            </p>
          </div>

          {/* Grid de cursos del ecosistema */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="soluciones-cursos-grid">
            
            {COURSES.map((course) => {
              return (
                <div
                  key={course.id}
                  className="bg-[#13161D] rounded-2xl border border-white/5 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between hover:border-emerald-500/20 hover:shadow-2xl transition duration-300"
                >
                  <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: course.bannerPattern }} />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase py-1 px-3 rounded-md font-black tracking-widest">
                        Programa Completo
                      </span>
                      <div className="p-2 rounded-lg bg-slate-950 border border-white/10 text-white">
                        {course.id === "computacion-ia" && <Cpu className="w-5 h-5 text-emerald-400" />}
                        {course.id === "ventas-automatico" && <TrendingUp className="w-5 h-5 text-blue-400" />}
                        {course.id === "autocad-tecnico" && <Compass className="w-5 h-5 text-orange-400" />}
                        {course.id === "proyectos-portafolio" && <FolderGit2 className="w-5 h-5 text-purple-400" />}
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-white">{course.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">{course.description}</p>
                    
                    <div className="space-y-2 pt-2 text-xs">
                      <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Unidades pedagógicas:</span>
                      <div className="flex flex-wrap gap-2 pt-1 font-mono">
                        {course.modules.map((m, mIdx) => (
                          <span key={m.id} className="bg-slate-950/90 text-gray-400 border border-white/5 px-2 py-1 rounded">
                            Módulo {mIdx + 1}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 border-t border-white/5 pt-6 mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <span className="text-[11px] text-gray-500 font-mono">
                      Acceso Premium Inmediato
                    </span>
                    <button
                      onClick={() => onOpenAuth(course.id)}
                      className="w-full sm:w-auto bg-white/5 hover:bg-emerald-500 hover:text-slate-950 hover:border-emerald-500 text-white border border-white/10 font-bold text-xs uppercase tracking-wider py-2.5 px-5 rounded-lg text-center transition duration-300 cursor-pointer"
                    >
                      Inscribirme en este curso
                    </button>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* ── SECTION: BENEFICIOS ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-y border-white/5 bg-[#111319]" id="beneficios">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-[10px] sm:text-xs text-emerald-400 font-black uppercase tracking-widest block">Beneficios de Impacto</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Lo que este sistema hará <em className="text-emerald-400 not-italic">por ti</em>:
            </h2>
          </div>

          <div className="divide-y divide-white/5" id="beneficios-lista-rows">
            
            {[
              {
                num: "01",
                head: "Serás contratado donde otros ni son considerados",
                sub: "Tu perfil destaca drásticamente respecto del promedio operativo. Las empresas te buscarán a ti por tu dominio técnico acelerado, no al revés."
              },
              {
                num: "02",
                head: "Generarás ingresos desde cualquier lugar del mundo",
                sub: "Aprende a ofrecer servicios freelance independientes, crear tus propios flujos digitales o montar embudos automáticos cobrando en USDT."
              },
              {
                num: "03",
                head: "Tomarás decisiones más inteligentes en tu propio negocio",
                sub: "Gestiona de forma óptima tus bases lógicias, automatiza tus chats y analiza rendimientos de conversión publicitaria sin depender de terceros."
              },
              {
                num: "04",
                head: "Ahorrarás múltiples horas de trabajo cada semana con la IA",
                sub: "Horas libres que puedes re-invertir de forma estratégica para crecer, pasar más tiempo con tu familia, o simplemente descansar profundamente."
              },
              {
                num: "05",
                head: "Aumentarás tu confianza y valor profesional",
                sub: "Tener habilidades escasas y cotizadas en el mercado digital actual de forma probada cambia por completo tu actitud en entrevistas corporativas."
              },
              {
                num: "06",
                head: "Fijarás tu futuro profesional antes de que sea tarde",
                sub: "La Inteligencia Artificial no pertenece a un futuro de ciencia ficción. Es el presente absoluto. Quien no aprenda a usarla, se quedará obsoleto."
              }
            ].map((ben) => (
              <div key={ben.num} className="flex gap-4 sm:gap-8 items-start py-6 first:pt-0 last:pb-0">
                <span className="text-xs sm:text-sm text-emerald-400 font-mono font-black mt-1">{ben.num}</span>
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-extrabold text-white">{ben.head}</h4>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">{ben.sub}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── SECTION: PROCESOS EN CONCRETO ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B0D11]" id="procesos">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-[10px] sm:text-xs text-blue-400 font-black uppercase tracking-widest block font-sans">La Ruta Práctica</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">Cómo Funciona</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="procesos-pasos-grid">
            
            {[
              {
                step: "1",
                head: "Inscríbete Hoy",
                text: "Con una inversión inicial de solo $15 USDT, abres las puertas al aula completa de estudiantes de inmediato de forma segura."
              },
              {
                step: "2",
                head: "Accede al Aula Virtual",
                text: "Establece tus contraseñas y visualiza el panel educativo Premium con todos los cursos y materiales lógicos esperados."
              },
              {
                step: "3",
                head: "Sigue la Ruta Guiada",
                text: "Los cursos cuentan con un camino ordenado progresivo, por lo que no perderás tiempo decidiendo qué materia repasar primero."
              },
              {
                step: "4",
                head: "Aprende Haciendo",
                text: "Cada clase incorpora un reto, comando o entregable útil de aplicación inmediata para consolidar tus habilidades."
              },
              {
                step: "5",
                head: "Arma tu Portafolio",
                text: "Reúne planos residenciales, scripts e historiales de automatización para validarte en el mercado internacional."
              },
              {
                step: "6",
                head: "Evoluciona Libremente",
                text: "Para mantener tus accesos actualizados, abonas una membresía de solo $35 USDT mensuales. Cancela online cuando lo consideres."
              }
            ].map((paso) => (
              <div key={paso.step} className="p-6 rounded-xl bg-slate-950/30 border border-white/5 space-y-3 relative group">
                <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xs select-none">
                  {paso.step}
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-white">{paso.head}</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">{paso.text}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── SECTION: TESTIMONIALS ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#111319]" id="testimonios">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-[10px] sm:text-xs text-purple-400 font-black uppercase tracking-widest block font-sans">Casos de Éxito Auténticos</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">Lo que comentan los alumnos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="testimonios-tarjetas-grid">
            
            {[
              {
                quot: "En el primer mes usando las herramientas de Inteligencia Artificial logré hacer mis informes técnicos tres veces más hábilmente. Recibí una felicitación formal del gerente.",
                author: "Martha Lozano",
                role: "Contadora, 42 años · Ecuador"
              },
              {
                quot: "Diseñé mi primer embudo de ventas, puse los bots automáticos y dejé de responder chats uno a uno a medianoche. Es el mejor mes financiero de mi consultora.",
                author: "Carlos Mejía",
                role: "Emprendedor, 28 años · Colombia"
              },
              {
                quot: "Conseguí mis primeros contratos freelance de mantenimiento de AutoCAD dibujando planos de precisión de manera remota para proyectos en el extranjero.",
                author: "Daniela Paredes",
                role: "Arquitecta, 26 años · Perú"
              },
              {
                quot: "Ya capté mis primeras cotizaciones de automatización de chats cobrando en USDT directamente gracias a lo aprendido en el módulo estructural de proyectos.",
                author: "Sebastián Torres",
                role: "Estudiante, 21 años · Venezuela"
              },
              {
                quot: "Tengo 55 años y admito que temía quedarme atrás en la era digital. El Ing. Edinson enseña de forma simplificada paso a paso, haciéndolo sumamente amigable.",
                author: "Rosa Elena Vásquez",
                role: "Comerciante, 55 años · Ecuador"
              }
            ].map((ts, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-slate-950/40 border border-white/5 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="text-emerald-400 text-xs font-mono select-none">★★★★★</div>
                  <blockquote className="text-xs sm:text-sm text-gray-300 italic leading-relaxed pt-2">
                    "{ts.quot}"
                  </blockquote>
                </div>
                <div className="border-t border-white/5 pt-4">
                  <p className="text-xs font-extrabold text-white">{ts.author}</p>
                  <p className="text-[10px] text-gray-500 font-mono mt-0.5">{ts.role}</p>
                </div>
              </div>
            ))}

            {/* eBook Callout card bonus */}
            <div className="p-6 rounded-xl bg-purple-500/5 border border-purple-500/20 flex flex-col justify-between" id="bonus-card-callout">
              <div className="space-y-2">
                <span className="text-xl">🎁</span>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#9B59B6] uppercase tracking-wide">¡Bono Digital Libre de Costo!</h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Obtén gratis el eBook digital <strong className="text-purple-400">"Acelerador Digital — Inteligencia Artificial para el Éxito"</strong> valorado en <strong className="text-white">$25 USDT</strong>.
                </p>
              </div>
              <div className="border-t border-purple-500/10 pt-4 text-xs font-mono text-purple-400/90 font-bold">
                * Incluido en tu registro inicial
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION: PRECIOS EXPLICADO (INVERSION) ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B0D11]" id="inscripcion">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          <div className="space-y-2">
            <span className="text-[10px] sm:text-xs text-emerald-400 font-black uppercase tracking-widest block">Inversión Directa</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Acelera tus Habilidades por menos de $1.20 USDT al día
            </h2>
            <p className="max-w-xl mx-auto text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
              Un único contrato técnico menor en AutoCAD te paga de $100 a $500. Una automatización de consultor, de $200 a $1,000. Compara tu rentabilidad.
            </p>
          </div>

          {/* Pricing Box Block */}
          <div className="relative max-w-lg mx-auto bg-slate-950 rounded-2xl border border-white/5 overflow-hidden shadow-2xl" id="pricing-plan-lander">
            <div className="h-1 bg-gradient-to-r from-emerald-500 to-blue-500" />
            
            <div className="p-6 sm:p-10 space-y-6">
              
              <div className="space-y-1">
                <p className="text-xs text-gray-500 font-bold tracking-widest uppercase">Inscripción General Única</p>
                <div className="flex justify-center items-baseline gap-1 text-white">
                  <span className="text-4xl sm:text-6xl font-black font-mono">$15</span>
                  <span className="text-xl sm:text-2xl font-bold font-mono">USDT</span>
                </div>
                <p className="text-xs text-emerald-400 font-medium pt-2">
                  Cuota inicial de admisión + mensualidad de <strong>$35 USDT / mes</strong> para renovar tus accesos.
                </p>
              </div>

              {/* Elements checklist */}
              <div className="space-y-2 text-left max-w-sm mx-auto border-y border-white/5 py-6">
                {[
                  "Acceso total a los 4 grandes temarios del ecosistema",
                  "Módulos actualizables periódicamente de Inteligencia Artificial",
                  "Lector interactivo para el eBook 'Acelerador de IA' ($25 USDT de regalo)",
                  "Tutor de Inteligencia Artificial para resolver tus dudas",
                  "Preguntas dinámicas calificadas automáticamente en vivo",
                  "Garantía de reintegro por 7 días sin preguntas administrativas"
                ].map((el, i) => (
                  <div key={i} className="flex gap-2.5 items-start text-xs text-gray-300 font-sans">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{el}</span>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-4 pt-2">
                <button
                  onClick={() => onOpenAuth("computacion-ia")}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase py-4 rounded-xl cursor-pointer shadow-lg shadow-emerald-500/15"
                  id="pricing-cta-register"
                >
                  ➤ Registrar Acceso de Alumno
                </button>
                
                <p className="text-[10px] text-gray-500 font-sans block leading-normal">
                  🔓 Transacción transparente · Reembolso del 100% garantizado por 7 días naturales.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION: REEMBOLD GARANTIA ── */}
      <section className="py-16 px-4 bg-[#111319] border-y border-white/5" id="garantia">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl">
            <Shield className="w-10 h-10 text-emerald-400 shrink-0" />
            <div className="text-left font-sans">
              <strong className="block text-white font-extrabold text-sm sm:text-base">Garantía sin Preguntas — 7 Días Completos</strong>
              <span className="text-xs text-gray-400 block mt-0.5">Si consideras que la suite no cumple lo prometido, reinstagramos tu inversión inicial.</span>
            </div>
          </div>

          <h3 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight">El riesgo es nuestro. La oportunidad es tuya.</h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans max-w-xl mx-auto">
            Ingresa de forma libre hoy, visualiza los videos virtuales de las primeras lecciones, lee el eBook interactivo y evalúa su calidad pedagógica técnico. Tienes 7 días enteros para decidir si continúas en las aulas.
          </p>
        </div>
      </section>

      {/* ── SECTION: FAQ ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0B0D11]" id="faq">
        <div className="max-w-3xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-[10px] sm:text-xs text-blue-400 font-black uppercase tracking-widest block">Soporte Técnico</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">Preguntas Frecuentes</h2>
          </div>

          <div className="divide-y divide-white/5 border-t border-b border-white/5" id="landing-accordion-faqs">
            {FAQS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div key={idx} className="py-4 font-sans text-sm">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left py-2 font-bold text-white flex justify-between items-center gap-4 transition focus:outline-none cursor-pointer hover:opacity-95"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`w-4 h-4 text-emerald-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-60 mt-2 opacity-100 pb-2" : "max-h-0 opacity-0"}`}>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION: ACERCA DE EDINSON ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#111319]" id="instructor">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="inline-block bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-4 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest select-none">
              Instructor del Ecosistema
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight font-sans">
              El ingeniero que enseña como nunca te enseñaron en las escuelas tradicionales.
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
              El Ing. Edinson Pilozo no es simplemente un divulgador digital. Es un ingeniero con experiencia real diseñando infraestructuras técnicas, modelando AutoCAD de precisión, programando bots comerciales automatizados, y aplicando Ingeniería de Prompts diaria en flujos corporativos reales.
            </p>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
              Su metodología de enseñanza se basa en la práctica directa y útil. Cree fielmente en democratizar las habilidades de Inteligencia Artificial para mitigar la brecha digital en América Latina.
            </p>
          </div>

          {/* Instructor Card design */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/70 border border-white/5 relative overflow-hidden group" id="instructor-bio-card">
            <div className="absolute top-[-20%] right-[-20%] w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 flex items-center justify-center font-black text-slate-950 text-xl tracking-wider select-none">
                EP
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-white">Ing. Edinson Pilozo</h3>
                <p className="text-xs text-emerald-400 font-semibold tracking-wide font-sans mt-0.5">Ingeniero · Formador · Desarrollador Digital</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
              Creador de las suites de automatización educativa más accesibles, integrando a estudiantes activos de múltiples países hispanohablantes bajo una meta lógica común.
            </p>

            <div className="flex flex-wrap gap-2 pt-6" id="countries-flags-tags">
              <span className="bg-white/5 border border-white/5 text-[10px] text-gray-400 font-bold px-3 py-1 rounded">🇪🇨 Ecuador</span>
              <span className="bg-white/5 border border-white/5 text-[10px] text-gray-400 font-bold px-3 py-1 rounded">🇨🇴 Colombia</span>
              <span className="bg-white/5 border border-white/5 text-[10px] text-gray-400 font-bold px-3 py-1 rounded">🇻🇪 Venezuela</span>
              <span className="bg-white/5 border border-white/5 text-[10px] text-gray-400 font-bold px-3 py-1 rounded">🇵🇪 Perú</span>
              <span className="bg-white/5 border border-white/5 text-[10px] text-gray-400 font-bold px-3 py-1 rounded">🇪🇸 España</span>
            </div>
          </div>

        </div>
      </section>

      {/* ── SECTION: FINAL CALL TO ACTION ── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center bg-[#0B0D11] border-t border-white/5 relative overflow-hidden" id="final-cta">
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[40rem] h-[25rem] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-6 sm:space-y-8" id="final-cta-inner">
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
            El momento de actuar es ahora.<br /><span className="text-emerald-400">La decisión está de tu lado.</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans">
            Por solo $15 USDT de cuota inicial y $35 USDT mensuales, accedes a un ecosistema de capacitación que abre fronteras financieras. Todo protegido con garantía absoluta de 7 días.
          </p>

          <button
            onClick={() => onOpenAuth("computacion-ia")}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase py-4.5 px-10 rounded-xl shadow-lg shadow-emerald-500/20 hover:-translate-y-1 transition duration-300 cursor-pointer"
            id="final-register-cta"
          >
            ➤ Sí, Quiero Inscribirme por $15 USDT
          </button>
        </div>
      </section>

      {/* ── FOOTER DE LA PAGINA ── */}
      <footer className="py-12 bg-[#090B0E] border-t border-white/5 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <p className="text-[10px] sm:text-xs text-gray-500 leading-normal font-sans">
            © {new Date().getFullYear()} Computación + IA — Ing. Edinson Pilozo. Todos los derechos reservados.
          </p>
          <p className="text-[9px] sm:text-[10px] text-gray-600 leading-relaxed font-sans">
            Las experiencias de alumnos presentadas reflejan compromisos y estudios individuales continuos. Los ingresos o resultados finales pueden diferir notablemente conforme al nivel de dedicación de cada estudiante.
          </p>
        </div>
      </footer>

    </div>
  );
}
