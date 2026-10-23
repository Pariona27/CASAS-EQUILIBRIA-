export interface House {
  id: 'drakarys' | 'leons' | 'altair' | 'gryphos' | 'serpentis';
  name: string;
  shortName?: string;
  alternateName?: string;
  subtitle: string;
  figure: string;
  crest: string;
  motto: string;
  primaryTalent: string;
  frequentRole: string;
  idealPhrase: string;
  shortDescription: string;
  description: string;
  profile: string[];
  skills: string[];
  aiProjects: {
    title: string;
    description: string;
  }[];
  whyMatch: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    borderGlow: string;
    badgeBg: string;
    badgeText: string;
    gradientFrom: string;
    gradientTo: string;
    textColor: string;
  };
}

export const HOUSES: Record<string, House> = {
  drakarys: {
    id: 'drakarys',
    name: 'Casa Drakarys',
    subtitle: 'El poder de transformar',
    figure: 'Dragón',
    crest: '/assets/aistudio/Drakarys_a9ece348.jpeg',
    motto: 'Convertimos ideas en soluciones extraordinarias.',
    primaryTalent: 'Innovación',
    frequentRole: 'Creador y visionario',
    idealPhrase: '“Tengo una gran idea y quiero convertirla en realidad.”',
    shortDescription: 'Creatividad, ambición y capacidad de convertir ideas complejas en productos reales con IA.',
    description:
      'La Casa Drakarys representa la creatividad, la ambición y la capacidad de convertir una idea compleja en un proyecto real. Sus integrantes no temen experimentar con nuevas herramientas, explorar tecnologías emergentes ni proponer soluciones diferentes. Son visionarios, innovadores, perseverantes y capaces de liderar procesos de transformación radical para el planeta.',
    profile: [
      'Visionarios e innovadores que imaginan lo que aún no existe.',
      'Perseverantes ante desafíos técnicos y ambientales complejos.',
      'Motivados por crear soluciones con impacto visual e histórico.',
      'Pioneros en experimentar con modelos de IA generativa de vanguardia.',
    ],
    skills: [
      'Creatividad e innovación disruptiva',
      'Liderazgo de proyectos tecnológicos',
      'Pensamiento estratégico y visión de futuro',
      'Capacidad para experimentar sin miedo al error',
      'Desarrollo de soluciones y prototipos ambiciosos',
    ],
    aiProjects: [
      {
        title: 'Satélites IA contra la Deforestación',
        description: 'Plataforma web con visión por computadora que detecta tala clandestina en tiempo real vía imágenes satelitales.',
      },
      {
        title: 'Asistente Autónomo de Conservación Marina',
        description: 'Agente inteligente interactivo que monitorea arrecifes de coral y genera alertas tempranas de blanqueamiento.',
      },
      {
        title: 'App de Gemelos Digitales para Parques Nacionales',
        description: 'Simulador 3D potenciado por IA para predecir el impacto del cambio climático en ecosistemas protegidos.',
      },
    ],
    whyMatch:
      'Tu perfil destaca por una mente creadora, audaz y orientada a la acción. No te conformas con analizar: quieres construir cosas que dejen huella. En Drakarys canalizarás tu fuego creador para diseñar las aplicaciones de IA más revolucionarias del curso.',
    theme: {
      primaryColor: '#ef4444',
      secondaryColor: '#f97316',
      accentColor: '#fbbf24',
      borderGlow: 'glow-drakarys',
      badgeBg: 'bg-red-500/20 border-red-500/40',
      badgeText: 'text-red-400',
      gradientFrom: 'from-red-600',
      gradientTo: 'to-amber-600',
      textColor: 'text-red-400',
    },
  },
  leons: {
    id: 'leons',
    name: 'Casa Leons',
    alternateName: 'Leonaris',
    subtitle: 'El valor de liderar',
    figure: 'León',
    crest: '/assets/aistudio/Leons_8ab4e562.jpeg',
    motto: 'Lideramos con propósito, disciplina y determinación.',
    primaryTalent: 'Liderazgo',
    frequentRole: 'Director y coordinador',
    idealPhrase: '“Puedo organizar al equipo y conducirlo hacia la meta.”',
    shortDescription: 'Liderazgo, seguridad, disciplina y constancia para coordinar equipos y defender proyectos con convicción.',
    description:
      'La Casa Leons representa el liderazgo, la seguridad y la constancia. Sus integrantes tienen la capacidad innata de organizar equipos, asumir responsabilidades y mantener el rumbo firme incluso ante contingencias difíciles. Saben transformar un conjunto disperso de talentos en una fuerza unificada orientada al éxito sostenible.',
    profile: [
      'Decididos, responsables y profundamente orientados a resultados de impacto.',
      'Capaces de inspirar, mediar y mantener la cohesión en momentos de alta presión.',
      'Excelentes oradores que defienden el valor ecológico de cada proyecto.',
      'Estratégicos en la asignación de roles para maximizar el talento de cada integrante.',
    ],
    skills: [
      'Liderazgo y comunicación asertiva',
      'Organización de equipos multidisciplinarios',
      'Disciplina, compromiso y gestión del tiempo',
      'Toma de decisiones en entornos de incertidumbre',
      'Presentación y defensa pública de proyectos de IA',
    ],
    aiProjects: [
      {
        title: 'Pitch & Implementación de Redes de Reciclaje Urbano',
        description: 'Coordinación integral de alianzas comunitarias y sistema de IA para optimizar la logística de residuos urbanos.',
      },
      {
        title: 'Comité de Ética y Gobernanza de IA Verde',
        description: 'Marco normativo y tablero directivo para garantizar que los modelos climáticos beneficien equitativamente a comunidades vulnerables.',
      },
      {
        title: 'Hackathon Ambiental Intercolegial',
        description: 'Dirección de proyectos de alto impacto donde múltiples equipos resolvieron retos de huella hídrica con IA.',
      },
    ],
    whyMatch:
      'Demuestras una gran madurez, claridad mental y vocación para guiar a los demás. Tienes la valentía de tomar decisiones y defender tus ideales ecológicos con elocuencia y disciplina. En Leons serás el pilar que conducirá a su equipo hacia la victoria.',
    theme: {
      primaryColor: '#eab308',
      secondaryColor: '#f59e0b',
      accentColor: '#fbbf24',
      borderGlow: 'glow-leons',
      badgeBg: 'bg-amber-500/20 border-amber-500/40',
      badgeText: 'text-amber-300',
      gradientFrom: 'from-amber-500',
      gradientTo: 'to-yellow-500',
      textColor: 'text-amber-400',
    },
  },
  altair: {
    id: 'altair',
    name: 'Casa Altair',
    subtitle: 'La visión que descubre oportunidades',
    figure: 'Águila',
    crest: '/assets/aistudio/Altair_bdf30039.jpeg',
    motto: 'Observamos más lejos para decidir mejor.',
    primaryTalent: 'Análisis',
    frequentRole: 'Investigador y estratega',
    idealPhrase: '“Antes de construir, quiero comprender el problema y encontrar la mejor estrategia.”',
    shortDescription: 'Visión estratégica, análisis profundo de datos e identificación temprana de oportunidades ambientales.',
    description:
      'La Casa Altair representa la visión estratégica, el análisis y la capacidad de identificar patrones y oportunidades antes que los demás. Sus integrantes observan los problemas ambientales con una perspectiva panorámica de 360 grados, investigan a fondo y diseñan diagnósticos rigurosos apoyados en analítica avanzada.',
    profile: [
      'Analíticos, curiosos, rigurosos y con pensamiento científico.',
      'Cómodos explorando grandes volúmenes de datos e informes ambientales.',
      'Maestros en descubrir correlaciones ocultas entre clima y biodiversidad.',
      'Estrategas que prefieren un diagnóstico impecable antes de emitir conclusiones.',
    ],
    skills: [
      'Pensamiento analítico y metodológico',
      'Investigación asistida por IA y minería de conocimiento',
      'Visión estratégica y formulación de hipótesis',
      'Interpretación de datos climáticos y métricas',
      'Detección de patrones y oportunidades críticas',
    ],
    aiProjects: [
      {
        title: 'Modelo Predictivo de Estrés Hídrico en Cuencas',
        description: 'Análisis de series temporales y redes neuronales para anticipar sequías en reservorios con meses de antelación.',
      },
      {
        title: 'Mapeo Genético de Especies en Peligro',
        description: 'Uso de IA para cruzar datos biogeográficos e identificar los corredores biológicos más urgentes de proteger.',
      },
      {
        title: 'Auditoría Algorítmica de Calidad del Aire',
        description: 'Sistema analítico que cruza sensores de smog con patrones de tráfico para diseñar políticas públicas basadas en evidencia.',
      },
    ],
    whyMatch:
      'Posees una mirada aguda, objetiva y una profunda curiosidad intelectual. No te dejas llevar por impulsos sin antes entender la raíz del problema. En Altair serás los ojos y el radar estratégico del curso, guiando la toma de decisiones ecológicas con precisión analítica.',
    theme: {
      primaryColor: '#06b6d4',
      secondaryColor: '#3b82f6',
      accentColor: '#60a5fa',
      borderGlow: 'glow-altair',
      badgeBg: 'bg-cyan-500/20 border-cyan-500/40',
      badgeText: 'text-cyan-300',
      gradientFrom: 'from-cyan-500',
      gradientTo: 'to-blue-600',
      textColor: 'text-cyan-400',
    },
  },
  gryphos: {
    id: 'gryphos',
    name: 'Casa Gryphos',
    subtitle: 'El equilibrio entre inteligencia y acción',
    figure: 'Grifo',
    crest: '/assets/aistudio/Gryphos_bf7ae78f.jpeg',
    motto: 'Pensamos con precisión y actuamos con firmeza.',
    primaryTalent: 'Integración',
    frequentRole: 'Desarrollador multidisciplinario',
    idealPhrase: '“Puedo comprender diferentes áreas y unirlas en una solución completa.”',
    shortDescription: 'Versatilidad y equilibrio: unen la teoría técnica con el impacto real conectando diversas herramientas.',
    description:
      'La Casa Gryphos representa el balance perfecto entre la inteligencia perspicaz del águila y la fuerza ejecutora del león. Sus integrantes son los grandes integradores del curso: conectan la programación, los sensores ambientales, las APIs de IA y las necesidades comunitarias en un producto funcional y tangible.',
    profile: [
      'Versátiles, pragmáticos y con una notable capacidad de adaptación.',
      'Puente humano entre los investigadores de datos y los oradores del equipo.',
      'Apasionados por construir prototipos funcionales de extremo a extremo.',
      'Equilibrados: saben cuándo teorizar y cuándo sentarse a programar y ensamblar.',
    ],
    skills: [
      'Versatilidad y rápida adaptación a nuevas herramientas',
      'Integración de APIs y modelos de IA en plataformas web',
      'Resolución práctica y prototipado ágil',
      'Trabajo multidisciplinario e interdisciplinario',
      'Equilibrio óptimo entre análisis teórico y ejecución real',
    ],
    aiProjects: [
      {
        title: 'Estación Meteorológica IoT con Gemini Vision',
        description: 'Dispositivo físico de bajo costo integrado a una app web para clasificar la salud de la flora local al instante.',
      },
      {
        title: 'Plataforma All-in-One de Voluntariado Ecológico',
        description: 'Web app con geolocalización, match inteligente con IA para reforestaciones y panel de métricas de CO2 absorbido.',
      },
      {
        title: 'Simulador de Energías Renovables para Escuelas',
        description: 'Herramienta interactiva que calcula el ahorro solar y eólico conectando APIs de radiación solar y modelos de lenguaje.',
      },
    ],
    whyMatch:
      'Tu perfil es dinámico, pragmático y sumamente equilibrado. Tienes la habilidad especial de entender tanto el código como el diseño y el contexto ambiental, uniendo todo en soluciones viables. En Gryphos serás el arquitecto que hace que todas las piezas funcionen como una orquesta perfecta.',
    theme: {
      primaryColor: '#14b8a6',
      secondaryColor: '#10b981',
      accentColor: '#34d399',
      borderGlow: 'glow-gryphos',
      badgeBg: 'bg-teal-500/20 border-teal-500/40',
      badgeText: 'text-teal-300',
      gradientFrom: 'from-teal-500',
      gradientTo: 'to-emerald-600',
      textColor: 'text-teal-400',
    },
  },
  serpentis: {
    id: 'serpentis',
    name: 'Casa Serpentis',
    subtitle: 'La inteligencia que evoluciona',
    figure: 'Serpiente',
    crest: '/assets/aistudio/Serpentis_143f069c.jpeg',
    motto: 'Aprendemos, nos adaptamos y evolucionamos.',
    primaryTalent: 'Optimización',
    frequentRole: 'Especialista en prompts y procesos',
    idealPhrase: '“Siempre encuentro una forma más inteligente y eficiente de hacer las cosas.”',
    shortDescription: 'Ingeniería de prompts, automatización, pensamiento lógico, pulido de resultados y adaptabilidad continua.',
    description:
      'La Casa Serpentis representa la inteligencia refinada, la agudeza lógica y la evolución constante. Sus integrantes comprenden que la IA es una herramienta que requiere sutileza, precisión y técnica. Son los maestros en formular prompts avanzados, detectar fallas invisibles y automatizar flujos de trabajo con una eficiencia asombrosa.',
    profile: [
      'Observadores agudos, pacientes, minuciosos y perfeccionistas.',
      'Capaces de transformar una respuesta mediocre de la IA en una obra maestra.',
      'Especialistas en crear cadenas de prompts complejos y workflows automatizados.',
      'Flexibles y ágiles para evolucionar ante las actualizaciones de modelos de IA.',
    ],
    skills: [
      'Ingeniería de prompts avanzada (Few-shot, CoT, Role-play)',
      'Automatización de flujos de trabajo y agentes de IA',
      'Optimización de recursos y reducción de latencia/tokens',
      'Pensamiento lógico y detección microscópica de errores',
      'Adaptabilidad continua y aprendizaje autodidacta veloz',
    ],
    aiProjects: [
      {
        title: 'Generador de Informes de Huella de Carbono por IA',
        description: 'Cadena de prompts estandarizada que audita consumos energéticos de colegios y redacta recomendaciones personalizadas.',
      },
      {
        title: 'Detector y Purificador de Alucinaciones en Datos Climáticos',
        description: 'Pipeline automatizado que valida la veracidad científica de las respuestas generadas por modelos de lenguaje.',
      },
      {
        title: 'Agente Botánico Experto en Restauración de Suelos',
        description: 'Sistema afinado con system instructions de vanguardia para asistir a comunidades campesinas en agroecología regenerativa.',
      },
    ],
    whyMatch:
      'Destacas por tu agudeza mental, tu atención al más mínimo detalle y tu búsqueda incesante de la máxima eficiencia. Sabes que no basta con usar la IA: hay que dominarla con maestría y elegancia. En Serpentis perfeccionarás cada instrucción para llevar las soluciones ambientales al más alto nivel.',
    theme: {
      primaryColor: '#a855f7',
      secondaryColor: '#8b5cf6',
      accentColor: '#c084fc',
      borderGlow: 'glow-serpentis',
      badgeBg: 'bg-purple-500/20 border-purple-500/40',
      badgeText: 'text-purple-300',
      gradientFrom: 'from-purple-600',
      gradientTo: 'to-indigo-600',
      textColor: 'text-purple-400',
    },
  },
};

export const HOUSES_LIST = Object.values(HOUSES);
