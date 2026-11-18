import {
  ArrowDown,
  BookOpen,
  Check,
  Clock,
  Gift,
  GraduationCap,
  Laptop,
  PlayCircle,
  Video,
} from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative border-b border-white/10 bg-[#071222]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_18%_12%,rgba(212,168,83,0.12),transparent_65%),radial-gradient(ellipse_60%_50%_at_85%_20%,rgba(23,54,107,0.28),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* COLUMNA IZQUIERDA — OFERTA PRINCIPAL MARKETING & VENTAS */}
          <div className="lg:col-span-7 space-y-6">
            <p className="font-display text-xs sm:text-[13px] font-bold tracking-[0.16em] text-[#D4A853] uppercase">
              {siteConfig.hero.kicker}
            </p>

            <h1 className="font-display text-[clamp(2.15rem,4.1vw,3.55rem)] font-extrabold leading-[1.08] tracking-tight text-white [text-wrap:balance]">
              {siteConfig.hero.headlineStart}
              <span className="text-[#D4A853]">
                {siteConfig.hero.headlineHighlight}
              </span>
              {siteConfig.hero.headlineEnd}
            </h1>

            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300">
              {siteConfig.hero.subtitle}
            </p>

            {/* Puntos clave de gancho y valor */}
            <div className="space-y-4 pt-1">
              {siteConfig.hero.quickHighlights.map((item) => (
                <a
                  key={item.title}
                  href={`#${item.id}`}
                  className="flex items-start gap-3.5 group"
                >
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-[#D4A853]"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-display text-sm sm:text-base font-bold text-white group-hover:text-[#D4A853] transition-colors">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm text-slate-400 leading-snug">
                      {item.summary}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Garantías clave de estudio */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs sm:text-sm text-slate-200">
              <span className="inline-flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#D4A853]" aria-hidden="true" />
                <span>Material digital incluido</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <PlayCircle
                  className="w-4 h-4 text-[#D4A853]"
                  aria-hidden="true"
                />
                <span>Clases grabadas para repasar</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D4A853]" aria-hidden="true" />
                <span className="tabular-nums">2 semanas intensivas</span>
              </span>
            </div>
          </div>

          {/* COLUMNA DERECHA — TARJETA BLACK FRIDAY + CLASE GRATIS */}
          <aside id="inscripcion" className="lg:col-span-5 scroll-mt-10">
            <div className="relative rounded-2xl border border-[#D4A853]/45 bg-gradient-to-b from-[#0E1E38] to-[#091528] p-6 sm:p-8 shadow-2xl shadow-black/50">
              <div className="space-y-2">
                <p className="font-display text-xs font-bold tracking-[0.14em] text-[#D4A853] uppercase">
                  {siteConfig.registrationCard.topTitle}
                </p>
                <h2 className="font-display text-2xl sm:text-[26px] font-extrabold tracking-tight text-white leading-tight [text-wrap:balance]">
                  {siteConfig.registrationCard.highlightTitle}
                </h2>
              </div>

              {/* Bloque de inversión Black Friday ($15 único pago) */}
              <div className="mt-5 rounded-xl border border-[#D4A853]/30 bg-[#071222]/85 px-5 py-4 flex items-center justify-between gap-4">
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#D4A853]">
                    {siteConfig.promotion.eventLabel}
                  </span>
                  <div className="mt-0.5 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-extrabold text-white tabular-nums">
                      {siteConfig.promotion.price}
                    </span>
                    <span className="text-sm font-semibold text-[#D4A853]">
                      único pago
                    </span>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-300 leading-snug">
                  <span className="block font-bold text-[#D4A853]">
                    1.ª Clase GRATIS
                  </span>
                  <span>Curso completo · 2 sem.</span>
                </div>
              </div>

              {/* Detalles de horarios y modalidad */}
              <dl className="mt-5 space-y-2.5 text-sm text-slate-300">
                {siteConfig.registrationCard.details.map((detail) => (
                  <div
                    key={detail.label}
                    className="flex items-start justify-between gap-3 border-b border-white/5 pb-2 last:border-b-0 last:pb-0"
                  >
                    <dt className="font-semibold text-white shrink-0">
                      {detail.label}:
                    </dt>
                    <dd className="text-right text-slate-200 tabular-nums">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Botones de conversión */}
              <div className="mt-6 space-y-3">
                <a
                  href={siteConfig.whatsapp.groupInviteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#D4A853] px-5 py-4 text-center font-display text-sm sm:text-[15px] font-extrabold tracking-wide text-[#071222] shadow-lg shadow-[#D4A853]/20 transition-colors hover:bg-[#E0B764] active:scale-[0.99] min-h-[54px]"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  <span>{siteConfig.registrationCard.primaryButtonLabel}</span>
                </a>

                <a
                  href={siteConfig.whatsapp.advisorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/[0.02] px-5 py-3.5 text-center font-display text-sm sm:text-[15px] font-bold tracking-wide text-white transition-colors hover:border-[#D4A853] hover:text-[#D4A853] active:scale-[0.99] min-h-[52px]"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0 text-[#25D366]" />
                  <span>{siteConfig.registrationCard.secondaryButtonLabel}</span>
                </a>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-[#D4A853]" aria-hidden="true" />
                  <span>100% Virtual</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap
                    className="w-3.5 h-3.5 text-[#D4A853]"
                    aria-hidden="true"
                  />
                  <span>Primera clase gratis</span>
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Franja de horarios y logística clara (4 columnas) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {siteConfig.logisticsStrip.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/10 bg-[#0B172A]/90 px-5 py-4"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D4A853]">
                {item.icon === "gift" && (
                  <Gift className="w-4 h-4 shrink-0" aria-hidden="true" />
                )}
                {item.icon === "laptop" && (
                  <Laptop className="w-4 h-4 shrink-0" aria-hidden="true" />
                )}
                {item.icon === "video" && (
                  <Video className="w-4 h-4 shrink-0" aria-hidden="true" />
                )}
                {item.icon === "play" && (
                  <PlayCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                )}
                <span>{item.label}</span>
              </div>
              <p className="mt-2 font-display text-lg font-bold text-white tabular-nums">
                {item.value}
              </p>
              <p className="mt-0.5 text-xs sm:text-[13px] text-slate-300 tabular-nums">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Botón sutil para ver el detalle del contenido */}
        <div className="mt-8 flex justify-center">
          <a
            href="#programa"
            aria-label="Ver el contenido del programa"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0C192E] text-slate-300 transition-colors hover:border-[#D4A853] hover:text-[#D4A853]"
          >
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
