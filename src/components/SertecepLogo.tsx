import { useState } from "react";
import { siteConfig } from "../config/siteConfig";

interface SertecepLogoProps {
  className?: string;
}

export function SertecepLogo({ className = "w-10 h-10" }: SertecepLogoProps) {
  const [imgError, setImgError] = useState(false);
  const logoUrl = siteConfig.institution.logoUrl;

  if (!logoUrl || imgError) {
    return null;
  }

  return (
    <img
      src={logoUrl}
      alt={`Logotipo oficial de ${siteConfig.institution.name}`}
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
      className={`${className} object-contain rounded-lg shrink-0`}
    />
  );
}
