import { Code2, GraduationCap, Store } from "lucide-react";
import { siteConfig } from "../config/siteConfig";

function ProfileIcon({ icon }: { icon: string }) {
  const iconClass = "w-5 h-5 text-[#D4A853]";

  switch (icon) {
    case "store":
      return <Store className={iconClass} />;
    case "graduation":
      return <GraduationCap className={iconClass} />;
    case "code":
      return <Code2 className={iconClass} />;
    default:
      return <Store className={iconClass} />;
  }
}

export function AudienceSection() {
  return (
    <section
      id="para-quien"
      className="scroll-mt-10 border-b border-white/10 bg-[#071222] py-14 sm:py-18"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white [text-wrap:balance]">
            {siteConfig.audience.title}
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            {siteConfig.audience.subtitle}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteConfig.audience.profiles.map((profile) => (
            <article
              key={profile.number}
              className="flex flex-col justify-between rounded-2xl border border-white/12 bg-[#0C192E]/90 p-6 sm:p-7 transition-colors hover:border-[#D4A853]/35"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4A853]/25 bg-[#D4A853]/10"
                  >
                    <ProfileIcon icon={profile.icon} />
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-display text-lg font-bold text-[#D4A853]/60 tabular-nums"
                  >
                    {profile.number}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-bold text-white">
                  {profile.title}
                </h3>

                <p className="mt-2.5 text-sm sm:text-[15px] leading-relaxed text-slate-300">
                  {profile.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
