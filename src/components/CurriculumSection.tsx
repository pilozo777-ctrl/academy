import {
  Megaphone,
  MessageSquare,
  PlayCircle,
  Share2,
  Sparkles,
  Target,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { siteConfig } from "../config/siteConfig";

function BenefitIcon({ icon }: { icon: string }) {
  const iconClass = "w-4 h-4 text-[#D4A853] shrink-0";

  switch (icon) {
    case "usercheck":
      return <UserCheck className={iconClass} />;
    case "message":
      return <MessageSquare className={iconClass} />;
    case "share":
      return <Share2 className={iconClass} />;
    case "sparkles":
      return <Sparkles className={iconClass} />;
    case "megaphone":
      return <Megaphone className={iconClass} />;
    case "target":
      return <Target className={iconClass} />;
    case "trending":
      return <TrendingUp className={iconClass} />;
    case "play":
      return <PlayCircle className={iconClass} />;
    default:
      return <Sparkles className={iconClass} />;
  }
}

export function CurriculumSection() {
  return (
    <section
      id="programa"
      className="scroll-mt-10 border-b border-white/10 bg-[#081529] py-14 sm:py-18"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-display text-xs font-bold tracking-[0.16em] text-[#D4A853] uppercase">
            CONTENIDO DEL PROGRAMA · 100% VIRTUAL
          </p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white [text-wrap:balance]">
            Domina las Redes Sociales, Publicidad en Facebook y Ventas con IA
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Desde organizar tu perfil digital hasta lanzar anuncios pagados y
            ganchos de venta efectivos. Empieza con tu primera clase GRATIS este
            lunes 23 de noviembre.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {siteConfig.modules.map((module) => (
            <article
              key={module.id}
              id={module.id}
              className="scroll-mt-10 rounded-2xl border border-white/12 bg-[#0C192E]/90 p-6 sm:p-8 transition-colors hover:border-[#D4A853]/35"
            >
              <div className="flex items-baseline justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <span className="block font-display text-xs font-bold tracking-[0.16em] text-[#D4A853]">
                    {module.badge}
                  </span>
                  <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {module.title}
                  </h3>
                </div>
                <span
                  aria-hidden="true"
                  className="font-display text-2xl font-extrabold text-white/15 tabular-nums"
                >
                  {module.number}
                </span>
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-200">
                {module.lead}
              </p>

              <ul className="mt-4 space-y-3.5">
                {module.benefits.map((benefit) => (
                  <li
                    key={benefit.id}
                    className="flex items-start gap-3.5 text-sm sm:text-[15px] text-slate-200 leading-snug"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#D4A853]/25 bg-[#D4A853]/10"
                    >
                      <BenefitIcon icon={benefit.icon} />
                    </span>
                    <span className="pt-1">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
