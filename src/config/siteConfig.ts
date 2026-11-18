/**
 * Configuración centralizada de la landing page de SERTECEP AMAZÓNICO.
 * Edita este archivo o define variables de entorno (VITE_*) para actualizar
 * enlaces de WhatsApp, logotipo oficial o textos sin modificar los componentes.
 */

const rawAdvisorPhone =
  import.meta.env.VITE_WHATSAPP_ADVISOR_PHONE?.trim() || "+593989012515";

const sanitizedWhatsAppDigits = rawAdvisorPhone.replace(/\D/g, "");

const DEFAULT_WHATSAPP_GROUP_URL =
  "https://chat.whatsapp.com/JsVoIBR0ySM4H6A9z8PN7A?s=cl&p=a&iam=2";

const configuredGroupUrl =
  import.meta.env.VITE_WHATSAPP_GROUP_URL?.trim() || DEFAULT_WHATSAPP_GROUP_URL;

const ADVISOR_PREFILLED_MESSAGE =
  "Hola, vi la promoción Black Friday de SERTECEP AMAZÓNICO (primera clase GRATIS, inicio lunes 23 de noviembre, $15 único pago) y deseo información sobre el curso de Marketing Digital, Facebook con IA y Ventas por Internet.";

export function buildWhatsAppChatUrl(message: string): string {
  return `https://wa.me/${sanitizedWhatsAppDigits}?text=${encodeURIComponent(message)}`;
}

export const siteConfig = {
  institution: {
    namePrefix: "SERTECEP",
    nameHighlight: "AMAZÓNICO",
    name: "SERTECEP AMAZÓNICO",
    tagline: "Formación tecnológica · Shushufindi, Ecuador",
    location: "Shushufindi, Ecuador",
    fullLocation: "Cantón Shushufindi, Ecuador",
    headerProgramLabel: "BLACK FRIDAY · 100% VIRTUAL",
    /**
     * Reemplaza VITE_LOGO_URL o asigna aquí la ruta de tu logotipo oficial
     * (por ejemplo: "/logo-sertecep.png") cuando esté disponible.
     */
    logoUrl: import.meta.env.VITE_LOGO_URL?.trim() || "",
  },
  whatsapp: {
    displayNumber: rawAdvisorPhone,
    digits: sanitizedWhatsAppDigits,
    advisorMessage: ADVISOR_PREFILLED_MESSAGE,
    advisorUrl: buildWhatsAppChatUrl(ADVISOR_PREFILLED_MESSAGE),
    groupInviteUrl: configuredGroupUrl,
  },
  promotion: {
    eventLabel: "EDICIÓN BLACK FRIDAY",
    startDate: "Lunes 23 de noviembre",
    duration: "2 semanas",
    price: "$15",
    priceNote: "Único pago · 1.ª Clase GRATIS",
    onlineSchedule: "Lunes, Miércoles y Viernes · 19:00 (7:00 PM hora Ecuador)",
    includedPerks: [
      "Primera clase 100% gratis en vivo",
      "Material digital incluido",
      "Clases grabadas para volver a verlas cuando quieras",
    ],
  },
  hero: {
    kicker: "EDICIÓN BLACK FRIDAY · PRIMERA CLASE GRATIS · INICIO 23 DE NOVIEMBRE",
    headlineStart: "¡DOMINA EL MARKETING Y ",
    headlineHighlight: "VENDE MÁS CON IA",
    headlineEnd: "!",
    subtitle:
      "Aprende paso a paso cómo organizar tu perfil para negocio digital, publicar gratis y hacer anuncios pagados en Facebook con inteligencia artificial. Entra a la primera clase totalmente GRATIS y accede al programa completo de 2 semanas por solo $15 único pago.",
    quickHighlights: [
      {
        id: "modulo-1",
        title: "Primera clase 100% GRATIS en vivo (sin compromiso)",
        summary:
          "Comprueba nuestra metodología práctica antes de pagar y aprende desde el día 1.",
      },
      {
        id: "modulo-1",
        title: "Organiza tu perfil para negocio digital y redes que venden",
        summary:
          "Estructura profesional de tu perfil, Fanpage de Facebook, Instagram y WhatsApp Business.",
      },
      {
        id: "modulo-2",
        title: "Publicaciones gratis, anuncios pagados en Facebook y ganchos de venta con IA",
        summary:
          "Estrategias orgánicas y pagadas para atraer clientes y cerrar ventas todos los días.",
      },
    ],
  },
  registrationCard: {
    topTitle: "PRIMERA CLASE GRATIS · ¡TU OPORTUNIDAD COMIENZA AQUÍ!",
    highlightTitle: "RESERVA TU CUPO EN LA CLASE GRATUITA",
    details: [
      { label: "Inicio", value: "Lunes 23 de noviembre" },
      { label: "Primera clase", value: "100% GRATIS en vivo" },
      { label: "Duración", value: "2 semanas intensivas" },
      { label: "Modalidad", value: "100% Virtual (Online en vivo)" },
      {
        label: "Horario",
        value: "Lunes, Miércoles y Viernes · 19:00 (Ecuador)",
      },
      {
        label: "Incluye",
        value: "Material digital + Clases grabadas",
      },
    ],
    primaryButtonLabel: "Unirme al grupo de la clase gratuita",
    secondaryButtonLabel: "HABLAR CON UN ASESOR",
  },
  logisticsStrip: [
    {
      label: "Acceso sin riesgo",
      value: "1.ª Clase GRATIS",
      detail: "Lunes 23 de nov. · 19:00 hrs Ecuador",
      icon: "gift",
    },
    {
      label: "Modalidad y duración",
      value: "100% Virtual",
      detail: "2 semanas prácticas desde cualquier lugar",
      icon: "laptop",
    },
    {
      label: "Días y horario",
      value: "Lun · Mié · Vie",
      detail: "19:00 hrs (7:00 PM hora Ecuador)",
      icon: "video",
    },
    {
      label: "Respaldo incluido",
      value: "Material + Grabaciones",
      detail: "Material digital y clases grabadas",
      icon: "play",
    },
  ],
  modules: [
    {
      id: "modulo-1",
      number: "01",
      badge: "MÓDULO 1",
      title: "PERFIL DIGITAL, REDES Y PUBLICACIÓN GRATUITA",
      lead: "Aprenderás a:",
      benefits: [
        {
          id: "profile-setup",
          text: "Organizar tu perfil y fanpage de Facebook para convertirlo en un negocio digital confiable.",
          icon: "usercheck",
        },
        {
          id: "ig-wa-setup",
          text: "Configurar Instagram y WhatsApp Business con respuestas rápidas y catálogo comercial.",
          icon: "message",
        },
        {
          id: "free-posts",
          text: "Crear publicaciones gratuitas (orgánicas) en Facebook y grupos para conseguir clientes sin invertir en pauta.",
          icon: "share",
        },
        {
          id: "ai-content",
          text: "Diseñar textos persuasivos, ofertas y contenido comercial de alto impacto con Inteligencia Artificial.",
          icon: "sparkles",
        },
      ],
    },
    {
      id: "modulo-2",
      number: "02",
      badge: "MÓDULO 2",
      title: "PUBLICIDAD PAGADA EN FACEBOOK Y GANCHOS DE VENTA",
      lead: "Aprenderás a:",
      benefits: [
        {
          id: "paid-ads",
          text: "Crear campañas de publicidad pagada en Facebook (Meta Ads) bien segmentadas sin desperdiciar dinero.",
          icon: "megaphone",
        },
        {
          id: "sales-hooks",
          text: "Construir ganchos de venta irresistibles y llamados a la acción que generan mensajes reales.",
          icon: "target",
        },
        {
          id: "lead-closing",
          text: "Aplicar guiones de atención y cierre de ventas por WhatsApp para transformar consultas en pagos.",
          icon: "trending",
        },
        {
          id: "recorded-practice",
          text: "Repasar cada campaña y configuración con material digital y clases grabadas disponibles después de clase.",
          icon: "play",
        },
      ],
    },
  ],
  audience: {
    title: "¿PARA QUIÉN ES ESTE PROGRAMA?",
    subtitle:
      "Un entrenamiento directo y práctico para quienes desean dejar de improvisar en redes sociales y empezar a vender con estrategia.",
    profiles: [
      {
        number: "01",
        title: "Emprendedores y negocios",
        description:
          "Emprendedores que desean organizar su perfil digital y vender sus productos o servicios por internet.",
        icon: "store",
      },
      {
        number: "02",
        title: "Comerciantes y vendedores",
        description:
          "Personas que quieren dominar publicaciones gratuitas y publicidad pagada en Facebook sin malgastar presupuesto.",
        icon: "megaphone",
      },
      {
        number: "03",
        title: "Estudiantes y futuros creadores",
        description:
          "Estudiantes que buscan aprender marketing digital, ganchos de venta e inteligencia artificial.",
        icon: "graduation",
      },
    ],
  },
  finalCta: {
    headline: "PRIMERA CLASE GRATIS. HABILIDADES REALES. MÁS VENTAS.",
    description:
      "Iniciamos el lunes 23 de noviembre. Entra sin costo a nuestra primera clase en vivo y comprueba cómo organizar tu perfil digital, publicar gratis y hacer publicidad en Facebook con IA. Programa completo de 2 semanas por solo $15 único pago, con material digital y clases grabadas incluidas.",
  },
} as const;
