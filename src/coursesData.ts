import { Course, eBookChapter } from "./types";

export const COURSES: Course[] = [
  {
    id: "computacion-ia",
    title: "Computación + Inteligencia Artificial",
    description: "Desde los fundamentos de Windows/Office hasta el uso táctico de prompts para automatizar flujos corporativos.",
    icon: "Cpu",
    longDescription: "La revolución tecnológica está aquí. Este curso te enseña de forma simplificada a dominar la computadora y usar Inteligencia Artificial para ahorrar hasta un 70% de tus horas semanales de trabajo. Olvídate de tareas rutinarias y pásale el trabajo duro a las mejores IA de la actualidad.",
    accentColor: "emerald-500",
    gradientFrom: "from-emerald-600",
    gradientTo: "to-emerald-400",
    borderColor: "border-emerald-500/20",
    bannerPattern: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)",
    modules: [
      {
        id: "comp-mod1",
        title: "Módulo 1: Fundamentos Informáticos y Sistema Operativo",
        description: "Pierde el miedo y toma el control de tu computador con herramientas profesionales en la nube.",
        lessons: [
          {
            id: "comp1",
            title: "1.1: Anatomía de una Computadora, Archivos y Atajos de Teclado Vitales",
            duration: "18:24",
            summary: "En esta clase aprenderás los conceptos básicos para organizar tus carpetas lógicamente, acelerar la navegación con comandos de teclado mágicos (Ctrl+Shift+T, Alt+Tab, etc.) y personalizar tu área de trabajo.",
            videoPlaceholderUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&auto=format&fit=crop&q=60",
            contentMarkdown: "### Conceptos Clave de la Clase\n- **Estructura jerárquica**: Los archivos guardados al azar en el escritorio reducen tu productividad y ralentizan el acceso. Aprenderás a definir una carpeta maestra de proyectos.\n- **Teclas Rápidas Clave**:\n  - `Ctrl + Shift + Esc`: Administrador de tareas instantáneo para cerrar programas que bloquean la PC.\n  - `Win + D`: Ocultar todo y mostrar el Escritorio.\n  - `Win + Flechas`: Dividir la pantalla en dos mitades perfectas para redactar mientras lees.\n- **Uso Inteligente de Portapapeles**: `Win + V` para acceder al historial de copiado."
          },
          {
            id: "comp2",
            title: "1.2: Dominando Google Workspace y Trabajo Corporativo en la Nube",
            duration: "25:40",
            summary: "Cómo trabajar colaborativamente, evitar las pérdidas de documentos finales y dominar Google Docs, Hojas de cálculo y Drive como un profesional multitarea.",
            videoPlaceholderUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=60",
            contentMarkdown: "### Trabajo Integrado en la Nube\n- **No más 'archivo_final_v2_firme.docx'**: Habilitaremos el control de versiones en Google Cloud. Podrás revocar cambios a cualquier minuto histórico.\n- **Formatos de Conversión**: Cómo firmar digitalmente un PDF sin necesidad de imprimirlo, escanearlo o descargarlo.\n- **Búsqueda Avanzada en Drive**: Utilizar etiquetas como `type:pdf owner:me` para encontrar un recibo traspapelado en segundos."
          }
        ]
      },
      {
        id: "comp-mod2",
        title: "Módulo 2: Maestría de Ingeniería de Prompts e IA Diaria",
        description: "Aprende las 4 macroestructuras de prompts para redactar, programar y resumir reportes densos.",
        lessons: [
          {
            id: "comp3",
            title: "2.1: El Método de los Roles y Prompts de Retroalimentación",
            duration: "32:15",
            summary: "Cómo instruir a modelos como Gemini para que adopten el papel de un consultor experto o desarrollador de software y perfeccionen textos complejos de negocios.",
            videoPlaceholderUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600&auto=format&fit=crop&q=60",
            contentMarkdown: "### Ingeniería de Prompts Eficaz\n- **Fórmula de 4 Pasos**:\n  1. **Rol**: 'Actúa como un redactor publicitario senior con 10 años de experiencia.'\n  2. **Contexto**: 'Tengo un consultorio odontológico en Quito que ofrece blanqueamientos sin dolor.'\n  3. **Instrucción**: 'Escribe 3 propuestas de anuncios persuasivos para Facebook.'\n  4. **Formato**: 'Usa viñetas cortas, incluye emojis y añade llamadas a la acción en USDT.'\n- **Estilo de Salida**: Solicitar respuestas en tablas, resúmenes interactivos, o listas ordenadas."
          },
          {
            id: "comp4",
            title: "2.2: Generación Automática de Reportes con Fuentes y Análisis Técnico",
            duration: "29:10",
            summary: "Inyecta documentos de texto masivos para extraer indicadores clave de rendimiento (KPIs) y redactas minutas con un solo comando.",
            videoPlaceholderUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60",
            contentMarkdown: "### Automatizando la Redacción Técnica\n- **Subida Segura**: Cómo auditar documentos financieros extensos identificando riesgos contractuales críticos.\n- **Preguntas de Seguimiento**: Descubrir la brecha informativa en un informe pidiéndole a la IA: '¿Qué falta en este informe para convencer a inversionistas extranjeros?'."
          }
        ]
      }
    ]
  },
  {
    id: "ventas-automatico",
    title: "Sistema de Venta en Automático",
    description: "Construye embudos (funnels) de captación acelerada, y configura bots de WhatsApp y cobros en USDT.",
    icon: "TrendingUp",
    longDescription: "Basta de ser un auto-empleado cansado que responde chats uno por uno a las 3 de la mañana. En este curso aprenderás a estructurar un sistema automatizado que capta la atención del cliente, califica su interés, muestra los beneficios y recibe cobros seguros.",
    accentColor: "blue-500",
    gradientFrom: "from-blue-600",
    gradientTo: "to-blue-400",
    borderColor: "border-blue-500/20",
    bannerPattern: "radial-gradient(circle, rgba(0,102,255,0.1) 0%, transparent 70%)",
    modules: [
      {
        id: "sales-mod1",
        title: "Módulo 1: Diseño de la Propuesta y Anatomía del Embudo con USDT",
        description: "Esquematiza el paso a paso del cliente desde que ve tu anuncio hasta que realiza la transferencia digital.",
        lessons: [
          {
            id: "sales1",
            title: "1.1: Psicología del Comprador, Gancho Persuasivo y Copy Emocional",
            duration: "22:15",
            summary: "Aprende a redactar títulos magnéticos y ganchos lógicos que impiden que el prospecto haga scroll de largo en Instagram o TikTok.",
            videoPlaceholderUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60",
            contentMarkdown: "### copywriting del Éxito\n- **El dolor lo vende todo**: En lugar de decir 'Tengo un curso de AutoCAD', di '¿Frustrada porque pasas noches dibujando sin poder descansar?'. Ofrece la solución al dolor.\n- **Estructura AIDA**: Atención, Interés, Deseo, Acción.\n- **Pruebas de Autoridad**: Cómo añadir testimonios auténticos en tu página de destino para disipar miedos."
          },
          {
            id: "sales2",
            title: "1.2: El Pasillo de Ventas Digitales y Pasarelas de Pago Criptográficas",
            duration: "28:50",
            summary: "Introducción detallada sobre cómo aperturar tu cuenta en criptomonedas, operar USDT de manera estable sin perder por inflación, y mandar enlaces directos de cobro.",
            videoPlaceholderUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=600&auto=format&fit=crop&q=60",
            contentMarkdown: "### Entendiendo USDT y Cripto Estable\n- **¿Qué es USDT?**: Es un dólar digital. Vale exactamente $1 USD y se transfiere por centavos a cualquier país en menos de 3 minutos.\n- **Billeteras Clave**: Uso de Binance o TrustWallet para operaciones internacionales seguras.\n- **Prevención de Estafas**: Verificar la red emisora de la transacción (TRC20, BEP20) antes de autorizar el despacho educativo."
          }
        ]
      },
      {
        id: "sales-mod2",
        title: "Módulo 2: Mensajería Inteligente y Bots que Venden de Noche",
        description: "Automatiza flujos lógicos con disparadores automáticos que contestan dudas y despachan links.",
        lessons: [
          {
            id: "sales3",
            title: "2.1: Implementación de Automatizadores Móviles y Reglas lógicas",
            duration: "30:45",
            summary: "Cómo conectar tu WhatsApp Business con asistentes automáticos que responden precios, resuelven dudas iniciales y reducen tu involucramiento al mínimo habitual.",
            videoPlaceholderUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=60",
            contentMarkdown: "### Configurando tu Primer Auto-Contestador\n- **Palabras Gatillo**: Si el cliente escribe 'precio', el bot se activa. Si escribe 'quiero inscribirme', el bot envía la billetera USDT.\n- **Mensajes de Bienvenida Persuasivos**: Mensajes dinámicos que no asustan al cliente, sino que lo guían con un tono humano sutil.\n- **Pruebas de Envío**: Validar flujos de chat en vivo con un teléfono secundario para comprobar la perfecta entrega del eBook de regalo."
          }
        ]
      }
    ]
  },
  {
    id: "autocad-tecnico",
    title: "AutoCAD Profesional",
    description: "Domina el dibujo bidimensional en AutoCAD: planos técnicos, acotados profesionales y layouts de impresión.",
    icon: "Compass",
    longDescription: "El software estándar en ingeniería civil, arquitectura y diseño de interiores. No necesitas talento artístico para dominar AutoCAD; solo requieres estructura lógica, precisión de coordenadas y el conocimiento de los 15 comandos esenciales que construyen el 95% de los proyectos inmobiliarios.",
    accentColor: "orange-500",
    gradientFrom: "from-orange-600",
    gradientTo: "to-orange-400",
    borderColor: "border-orange-500/20",
    bannerPattern: "radial-gradient(circle, rgba(239,68,68,0.1) 0%, transparent 70%)",
    modules: [
      {
        id: "acad-mod1",
        title: "Módulo 1: Entorno de AutoCAD y Dibujo de Precisión",
        description: "Familiarízate con las unidades de dibujo, referencias espaciales y geometría básica.",
        lessons: [
          {
            id: "acad1",
            title: "1.1: Interfaz Profesional, Teclas Especiales y Configuración de Unidades",
            duration: "35:10",
            summary: "Comenzamos abriendo el espacio de trabajo de diseño 2D. Explicaremos cómo configurar tus unidades en metros, activar el cursor Ortho (F8) para trazos rectos perfectos y el comando Limits.",
            videoPlaceholderUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=60",
            contentMarkdown: "### Configurando AutoCAD de la Manera Correcta\n- **Comandos de Inicio Clave**:\n  - \`UNITS\`: Ajustar decimales y precisión física en metros.\n  - \`OSNAP (F3)\`: Capturar vértices finales, puntos medios, y tangentes con precisión computarizada.\n- **Configuración del Área de Trabajo**: Guardar tu 'Workspace' de dibujo 2D clásico con fondo oscuro para no forzar la vista durante jornadas de dibujo técnico."
          },
          {
            id: "acad2",
            title: "1.2: El Poder de Modificadores: Escalar, Desplazar, Recortar (Trim) y Alargar",
            duration: "28:15",
            summary: "Aprende a modificar líneas existentes utilizando comandos que aceleran el modelado geométrico de paredes, perímetros y escaleras residenciales.",
            videoPlaceholderUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=60",
            contentMarkdown: "### Los Comandos Asesinos de AutoCAD\n- \`TRIM (TR)\`: Recortar líneas sobrantes cruzadas instantáneamente limpiando uniones de muros.\n- \`OFFSET (O)\`: Duplicar líneas a una distancia precisa para simular grosores de muros en planos habitacionales (por ejemplo, 0.15 metros estándar).\n- \`EXTEND (EX)\`: Alargar líneas hasta la intersección de un objeto guía."
          }
        ]
      },
      {
        id: "acad-mod2",
        title: "Módulo 2: Capas, Acotados y Preparación de Planos Finales",
        description: "Establece espesores de pluma por color, ingresa textos e imprime a PDF a escala perfecta.",
        lessons: [
          {
            id: "acad3",
            title: "2.1: Gestión de Capas (Layers), Colores de Planificación y Dimensionamiento",
            duration: "34:20",
            summary: "Organiza tu plano separando cimientos, muros de carga, mobiliario, instalaciones eléctricas y cotas en capas independientes con espesores variables de plumilla.",
            videoPlaceholderUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60",
            contentMarkdown: "### Estructura de Plano Limpio\n- **¿Por qué usar Capas?**: Permite apagar elementos y enviar cotas a imprimir sin saturar la entrega gráfica visual.\n- **Estilos de Dimensión (\`DIMSTYLE\` o \`DDIM\`)**: Crear flechas de acotado estéticas que no luzcan ni sobredimensionadas ni diminutas.\n- **Manejo de Textos**: Incorporar notas técnicas tipográficas consistentes usando fuentes simplificadas legibles para cualquier operario de obra."
          }
        ]
      }
    ]
  },
  {
    id: "proyectos-portafolio",
    title: "Proyectos y Portafolio Comercial",
    description: "Crea proyectos prácticos demostrables y aprende a captar tus primeros clientes internacionales pagados.",
    icon: "FolderGit2",
    longDescription: "El conocimiento sin acción es inútil. Aquí consolidarás todo lo aprendido en un catálogo visual espectacular de servicios. Te enseñaremos de forma súper transparente a salir al mercado freelance y captar contratos recurrentes cobrando mediante cripto o transferencias seguras.",
    accentColor: "purple-500",
    gradientFrom: "from-purple-600",
    gradientTo: "to-purple-400",
    borderColor: "border-purple-500/20",
    bannerPattern: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
    modules: [
      {
        id: "proj-mod1",
        title: "Módulo 1: Creación de Portafolios y Búsqueda Activa",
        description: "Muestra tu capacidad de resolución técnica en plataformas sin costo y genera confianza.",
        lessons: [
          {
            id: "proj1",
            title: "1.1: Cómo Lanzar un Portafolio Interactivo sin Programar",
            duration: "26:30",
            summary: "Usarás plantillas avanzadas de Notion y repositorios simples para exponer tus planos en PDF, capturas de tus embudos de WhatsApp operativos y tus mejores prompts de IA.",
            videoPlaceholderUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=60",
            contentMarkdown: "### Mostrando Valor al Cliente\n- **El portafolio defensivo**: No hables de lo que 'sabes'; deja que las capturas de pantalla de tus automatizaciones reales hablen por ti.\n- **Enlaces de contacto directo**: Ubicar botones interactivos hacia tu chat automatizado de consultas.\n- **Sección de Testimonios del Instructor**: Incorporar cartas de desempeño respaldadas para validarte pronto en el mercado corporativo actual."
          },
          {
            id: "proj2",
            title: "1.2: Negociación, Tarificación e Ingresos Continuos en USDT",
            duration: "33:45",
            summary: "Cómo cotizar servicios digitales de forma justa (por hora vs por paquete cerrado), redactar cotizaciones persuasivas y gestionar entregables con soporte continuo.",
            videoPlaceholderUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60",
            contentMarkdown: "### Estrategias de Negociación Efectiva\n- **Venta por Valor**: Nunca digas 'Te cobro por dibujar una línea', di 'Te voy a entregar un plano listo para radicar permisos que te ahorrará 3 meses de observaciones municipales'.\n- **Esquema de Cobro Seguro**: El sistema de anticipo 50/50 estándar para proteger tu trabajo técnico.\n- **Contratos de Soporte Mensual**: Cómo cobrar un 'fee' mensual de $100 USDT a negocios por auditar sus flujos de IA o actualizar sus portafolios comerciales."
          }
        ]
      }
    ]
  }
];

export const EBOOK_CHAPTERS: eBookChapter[] = [
  {
    id: "eb1",
    title: "Capítulo 1: La Era de la Superproductividad",
    subtitle: "Cómo el profesional promedio pierde el 40% de su día en procesos obsoletos",
    content: [
      "El mayor limitante en la carrera de cualquier persona hoy en día no es la falta de talento, sino la lentitud técnica. Enviar correos repetitivos de forma manual, estructurar presupuestos desde una hoja en blanco, buscar carpetas perdidas o redactar reportes mecánicos de datos... Todas estas actividades destruyen tu atención.",
      "La Inteligencia Artificial ha venido a democratizar la velocidad operativa. Quien sepa guiarla con un criterio claro multiplicará su capacidad productiva, permitiéndose tomar múltiples clientes paralelos o destacarse drásticamente ante supervisores corporativos.",
      "Para lograrlo, el primer secreto es salir del modo consumo y entrar en el modo automatización. Cada vez que realices una tarea dos veces, pregúntate inmediatamente: ¿Cómo le transfiero la lógica base de esto a un modelo inteligente para que lo resuelva por mí el día de mañana?"
    ],
    tips: [
      "Dedica los primeros 10 minutos de tu mañana a documentar qué tareas de ayer fueron mecánicas y repetitivas.",
      "Crea un archivo maestro de 'Atajos Rápidos' en tu escritorio para tenerlos siempre visibles.",
      "No guardes archivos en carpetas con nombres como 'documento1.pdf', dales una fecha y temática explícita: '2026-06-Presupuesto-EdificioNorte.pdf'."
    ]
  },
  {
    id: "eb2",
    title: "Capítulo 2: El Arte Oculto del Prompting de Precisión",
    subtitle: "Por qué tus prompts actuales fallan y la fórmula matemática para arreglarlos",
    content: [
      "Cuando la mayoría de usuarios interactúa con la Inteligencia Artificial por primera vez, cometen el error de hacer preguntas vagas como 'Dame ideas de marketing'. La respuesta que reciben es un compendio de clichés lógicos que no sirven en el mundo comercial real.",
      "Los modelos de lenguaje funcionan por probabilidad estadística de tokens. Para obtener oro puro, debes restringir el espacio de probabilidad mediante un prompt sumamente específico. Nosotros enseñamos la fórmula técnica del PROMPT DE PRECISIÓN: [ROL] + [CONTEXTO DE NEGOCIO] + [REGLAS NEGATIVAS] + [FORMATO DE SALIDA].",
      "Las 'reglas negativas' son los límites más potentes de tu prompt. Al indicarle a la IA lo que NO debe hacer (por ejemplo: 'No uses lenguaje corporativo aburrido, no utilices palabras cliché como innovador o revolucionario'), obligas al modelo a generar textos muchísimo más auténticos, frescos y persuasivos."
    ],
    tips: [
      "Usa siempre el delimitador triple comilla (''' ) para separar las instrucciones del texto que quieres analizar.",
      "Pídele siempre al modelo que justifique sus respuestas antes de entregarlas: 'Explica tu razonamiento paso a paso antes de escribir la respuesta final'.",
      "Usa prompts de autocrítica: 'Identifica 3 debilidades o sesgos en el reporte que acabas de escribir y corrígelos en una versión refinada'."
    ]
  },
  {
    id: "eb3",
    title: "Capítulo 3: Embajadas de Ventas: Cobrar con Estabilidad",
    subtitle: "Utilizar el dólar digital USDT de manera profesional sin fronteras tradicionales",
    content: [
      "Si ofreces servicios a clientes en Colombia, Venezuela, Ecuador o España, te toparás inevitablemente con la barrera de las comisiones bancarias tradicionales, cambios de divisas opacos y demoras injustificadas que tardan hasta una semana entera en acreditarse.",
      "La respuesta del ecosistema es el USDT. El USDT es una criptomoneda estable anclada 1a1 al valor del dólar estadounidense. Al viajar a través de redes descentralizadas ultrarápidas, recibir tus honorarios toma escasos 2 minutos y cuesta fracción de centavos a nivel global.",
      "Aprender a manejar billeteras digitales no solo flexibiliza tu facturación internacional, sino que protege tu dinero contra la devaluación local sistemática. Conviértete en un nodo autónomo que recibe cobros universales y liquida a moneda local únicamente cuando sea estrictamente requerido para tus gastos del día a día."
    ],
    tips: [
      "Garantiza el uso de redes seguras como TRC-20 (Tron) o BEP-20 (BSC) para mantener comisiones menores a $1 USDT.",
      "Descarga siempre billeteras sin custodia como Trust Wallet o MetaMask para guardar tus copias de seguridad personales lógicas de 12 palabras.",
      "Establece una política clara con tus clientes: envía un enlace explicativo sencillo sobre cómo pagar en USDT usando pasarelas amigables como Binance Pay."
    ]
  }
];
