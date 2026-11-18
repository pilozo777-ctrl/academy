import { siteConfig } from "../config/siteConfig";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={siteConfig.whatsapp.advisorUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chatear por WhatsApp con SERTECEP Amazónico al ${siteConfig.whatsapp.displayNumber}`}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group flex items-center gap-2.5 rounded-2xl border border-[#25D366]/45 bg-[#0C192E]/95 px-3 py-2 sm:px-3.5 sm:py-2.5 text-white shadow-2xl shadow-black/60 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[#25D366] hover:bg-[#102240] active:scale-[0.98]"
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-md shadow-[#25D366]/30 transition-transform group-hover:scale-105"
      >
        <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </span>

      <span className="flex flex-col text-left leading-tight pr-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#25D366]">
          WhatsApp
        </span>
        <span className="font-display text-xs sm:text-sm font-bold text-white tabular-nums whitespace-nowrap">
          {siteConfig.whatsapp.displayNumber}
        </span>
      </span>
    </a>
  );
}
