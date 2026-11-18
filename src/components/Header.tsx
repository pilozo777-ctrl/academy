import { siteConfig } from "../config/siteConfig";
import { SertecepLogo } from "./SertecepLogo";

export function Header() {
  return (
    <header className="border-b border-white/10 bg-[#071222]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        {/* Identidad Institucional */}
        <a
          href="#inicio"
          className="flex items-center gap-3 min-w-0 group focus-visible:rounded-lg"
        >
          <SertecepLogo className="w-10 h-10 sm:w-11 sm:h-11" />
          <div className="min-w-0">
            <span className="block font-display text-base sm:text-lg font-extrabold tracking-tight text-white truncate">
              {siteConfig.institution.namePrefix}{" "}
              <span className="text-[#D4A853]">
                {siteConfig.institution.nameHighlight}
              </span>
            </span>
            <span className="block text-xs sm:text-[13px] text-slate-400 truncate">
              {siteConfig.institution.tagline}
            </span>
          </div>
        </a>

        {/* Indicador derecho de programa */}
        <a
          href="#inscripcion"
          className="font-display text-[11px] sm:text-xs font-semibold tracking-[0.14em] text-[#D4A853] hover:text-[#E5BE6E] transition-colors whitespace-nowrap shrink-0"
        >
          {siteConfig.institution.headerProgramLabel}
        </a>
      </div>
    </header>
  );
}
