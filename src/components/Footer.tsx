import { MapPin } from "lucide-react";
import { siteConfig } from "../config/siteConfig";
import { SertecepLogo } from "./SertecepLogo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#050D1A] py-10 pb-24 sm:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <SertecepLogo className="w-10 h-10" />
            <div>
              <p className="font-display text-sm font-extrabold tracking-tight text-white">
                {siteConfig.institution.namePrefix}{" "}
                <span className="text-[#D4A853]">
                  {siteConfig.institution.nameHighlight}
                </span>
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-[#D4A853]" aria-hidden="true" />
                <span>{siteConfig.institution.fullLocation}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
            <a href="#programa" className="hover:text-white transition-colors">
              Programa
            </a>
            <a href="#para-quien" className="hover:text-white transition-colors">
              Dirigido a
            </a>
            <a
              href={siteConfig.whatsapp.advisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4A853] font-semibold hover:underline tabular-nums"
            >
              WhatsApp: {siteConfig.whatsapp.displayNumber}
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500">
          <p>
            © {currentYear} {siteConfig.institution.name}. Todos los derechos
            reservados.
          </p>
          <p>
            Edición Black Friday · Modalidad 100% Virtual
          </p>
        </div>
      </div>
    </footer>
  );
}
