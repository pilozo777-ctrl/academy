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
  "Hola, vi la promoción Black Friday de SERTECEP AMAZÓNICO ($25 único pago, modalidad 100% virtual, inicio lunes 23 de noviembre) y deseo recibir información para inscribirme al Curso 2 en 1: Redes Sociales con IA y Desarrollo Web + Apps.";

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
    price: "$25",
    priceNote: "Único pago · Incluye los 2 cursos",
    onlineSchedule: "Lunes, Miércoles y Viernes · 19:00 (7:00 PM hora Ecuador)",
    includedPerks: [
      "Modalidad 100% virtual en vivo",
      "Material digital incluido",
      "Clases grabadas para volver a verlas cuando quieras",
    ],
  },
  hero: {
    kicker: "EDICIÓN BLACK FRIDAY · 100% VIRTUAL · INICIO 23 DE NOVIEMBRE",
    headlineStart: "¡CONVIÉRTETE EN UN ",
    headlineHighlight: "CREADOR DIGITAL",
    headlineEnd: "!",
    subtitle:
      "No dejes pasar esta edición Black Friday. Dos cursos prácticos en un solo programa 100% virtual de 2 semanas para dominar la inteligencia artificial, vender más en redes sociales y crear la web y aplicación de tu negocio por un único pago de $25.",
    quickHighlights: [
      {
        id: "curso-1",
        title: "CURSO 1 · Domina las redes y vende con IA",
        summary:
          "Facebook, Instagram, WhatsApp Business, contenido comercial con IA y publicidad digital.",
      },
      {
        id: "curso-2",
        title: "CURSO 2 · Crea la web y la app de tu negocio",
        summary:
          "Página web comercial, catálogo digital, aplicaciones con IA y Flutter orientadas a ventas.",
      },
    ],
  },
  registrationCard: {
    topTitle: "OFERTA BLACK FRIDAY · ¡TU OPORTUNIDAD COMIENZA AQUÍ!",
    highlightTitle: "INSCRÍBETE AL CURSO 2 EN 1",
    details: [
      { label: "Inicio", value: "Lunes 23 de noviembre" },
      { label: "Duración", value: "2 semanas" },
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
    primaryButtonLabel: "UNIRME AL GRUPO DE WHATSAPP",
    secondaryButtonLabel: "HABLAR CON UN ASESOR",
  },
  logisticsStrip: [
    {
      label: "Fecha de inicio",
      value: "Lunes 23 de nov.",
      detail: "Duración total: 2 semanas intensivas",
      icon: "calendar",
    },
    {
      label: "Modalidad",
      value: "100% Virtual",
      detail: "Clases en vivo desde cualquier lugar",
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
  courses: [
    {
      id: "curso-1",
      number: "01",
      badge: "CURSO 1",
      title: "DOMINA LAS REDES Y VENDE CON IA",
      lead: "Aprenderás a:",
      benefits: [
        {
          id: "fb-fanpage",
          text: "Configurar tu fanpage de Facebook para tu negocio.",
          icon: "share",
        },
        {
          id: "ig-wa",
          text: "Configurar Instagram y WhatsApp Business.",
          icon: "message",
        },
        {
          id: "ai-content",
          text: "Crear publicaciones y contenido comercial con IA.",
          icon: "sparkles",
        },
        {
          id: "digital-ads",
          text: "Realizar publicidad digital gratuita y pagada.",
          icon: "megaphone",
        },
        {
          id: "sales-growth",
          text: "Captar clientes y fortalecer las ventas por internet.",
          icon: "trending",
        },
      ],
    },
    {
      id: "curso-2",
      number: "02",
      badge: "CURSO 2",
      title: "CREA LA WEB Y LA APP DE TU NEGOCIO",
      lead: "Aprenderás a:",
      benefits: [
        {
          id: "commercial-web",
          text: "Desarrollar una página web comercial.",
          icon: "globe",
        },
        {
          id: "digital-catalog",
          text: "Crear un catálogo digital de productos o servicios.",
          icon: "layers",
        },
        {
          id: "business-app",
          text: "Diseñar una aplicación para tu emprendimiento.",
          icon: "smartphone",
        },
        {
          id: "ai-flutter",
          text: "Utilizar IA y Flutter para desarrollar soluciones digitales.",
          icon: "cpu",
        },
        {
          id: "orders-bookings",
          text: "Crear aplicaciones orientadas a pedidos, ventas o reservas.",
          icon: "shopping",
        },
      ],
    },
  ],
  audience: {
    title: "¿PARA QUIÉN ES ESTE PROGRAMA?",
    subtitle:
      "Un programa serio, práctico y accesible pensado para quienes buscan resultados reales desde la primera semana.",
    profiles: [
      {
        number: "01",
        title: "Emprendedores y comerciantes",
        description:
          "Emprendedores que desean vender sus productos o servicios por internet.",
        icon: "store",
      },
      {
        number: "02",
        title: "Estudiantes y jóvenes",
        description:
          "Estudiantes que quieren aprender habilidades digitales modernas.",
        icon: "graduation",
      },
      {
        number: "03",
        title: "Creadores y desarrolladores",
        description:
          "Personas que buscan desarrollar páginas web y aplicaciones para negocios.",
        icon: "code",
      },
    ],
  },
  finalCta: {
    headline: "DOS CURSOS. NUEVAS HABILIDADES. MÁS OPORTUNIDADES.",
    description:
      "Iniciamos el lunes 23 de noviembre. Asegura tu participación en esta edición Black Friday 100% virtual por un único pago de $25 con clases en vivo (Lunes, Miércoles y Viernes 19:00 Ecuador), material digital y grabaciones incluidas.",
  },
} as const;
