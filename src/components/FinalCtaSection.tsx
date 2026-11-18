import { siteConfig } from "../config/siteConfig";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function FinalCtaSection() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-18 bg-[#081529]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(212,168,83,0.10),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#D4A853]/35 bg-[#0C192E]/95 p-8 sm:p-12 text-center shadow-2xl shadow-black/30">
          <p className="font-display text-xs font-bold tracking-[0.18em] text-[#D4A853] uppercase">
            {siteConfig.promotion.eventLabel} · {siteConfig.institution.name} ·{" "}
            {siteConfig.promotion.price} ÚNICO PAGO
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight [text-wrap:balance]">
            {siteConfig.finalCta.headline}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 leading-relaxed">
            {siteConfig.finalCta.description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={siteConfig.whatsapp.groupInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-[#D4A853] px-7 py-4 font-display text-sm sm:text-[15px] font-extrabold tracking-wide text-[#071222] transition-colors hover:bg-[#E0B764] active:scale-[0.99] min-h-[52px]"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              <span>{siteConfig.registrationCard.primaryButtonLabel}</span>
            </a>

            <a
              href={siteConfig.whatsapp.advisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl border border-white/20 bg-white/[0.02] px-7 py-4 font-display text-sm sm:text-[15px] font-bold tracking-wide text-white transition-colors hover:border-[#D4A853] hover:text-[#D4A853] active:scale-[0.99] min-h-[52px]"
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0 text-[#25D366]" />
              <span>{siteConfig.registrationCard.secondaryButtonLabel}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
