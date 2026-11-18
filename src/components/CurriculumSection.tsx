import {
  Cpu,
  Globe,
  Layers,
  Megaphone,
  MessageSquare,
  Share2,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { siteConfig } from "../config/siteConfig";

function BenefitIcon({ icon }: { icon: string }) {
  const iconClass = "w-4 h-4 text-[#D4A853] shrink-0";

  switch (icon) {
    case "share":
      return <Share2 className={iconClass} />;
    case "message":
      return <MessageSquare className={iconClass} />;
    case "sparkles":
      return <Sparkles className={iconClass} />;
    case "megaphone":
      return <Megaphone className={iconClass} />;
    case "trending":
      return <TrendingUp className={iconClass} />;
    case "globe":
      return <Globe className={iconClass} />;
    case "layers":
      return <Layers className={iconClass} />;
    case "smartphone":
      return <Smartphone className={iconClass} />;
    case "cpu":
      return <Cpu className={iconClass} />;
    case "shopping":
      return <ShoppingBag className={iconClass} />;
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
            CONTENIDO DEL PROGRAMA
          </p>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white [text-wrap:balance]">
            Dos cursos prácticos en 2 semanas: 100% Virtual en vivo
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {siteConfig.courses.map((course) => (
            <article
              key={course.id}
              id={course.id}
              className="scroll-mt-10 rounded-2xl border border-white/12 bg-[#0C192E]/90 p-6 sm:p-8 transition-colors hover:border-[#D4A853]/35"
            >
              <div className="flex items-baseline justify-between gap-3 pb-4 border-b border-white/10">
                <div>
                  <span className="block font-display text-xs font-bold tracking-[0.16em] text-[#D4A853]">
                    {course.badge}
                  </span>
                  <h3 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                    {course.title}
                  </h3>
                </div>
                <span
                  aria-hidden="true"
                  className="font-display text-2xl font-extrabold text-white/15 tabular-nums"
                >
                  {course.number}
                </span>
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-200">
                {course.lead}
              </p>

              <ul className="mt-4 space-y-3.5">
                {course.benefits.map((benefit) => (
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
