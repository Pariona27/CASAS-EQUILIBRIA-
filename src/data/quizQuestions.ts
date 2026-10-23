export interface QuizOption {
  id: string;
  houseId: 'drakarys' | 'leons' | 'altair' | 'gryphos' | 'serpentis';
  text: string;
  subtext: string;
}

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  context: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'El Despertar del Proyecto',
    question: 'En el primer día de un proyecto de IA para restaurar un ecosistema degradado, ¿cuál es tu impulso inicial?',
    context: 'El reto es diseñar una solución tecnológica para salvar un bosque o cuenca hídrica en peligro.',
    options: [
      {
        id: '1a',
        houseId: 'drakarys',
        text: 'Idear una aplicación o plataforma visual disruptiva que nadie haya creado antes.',
        subtext: 'Pensar en grande, innovar y romper esquemas desde el minuto uno.',
      },
      {
        id: '1b',
        houseId: 'leons',
        text: 'Reunir al equipo, definir metas claras, asignar roles estratégicos y marcar el cronograma.',
        subtext: 'Liderar con orden, propósito y determinación hacia el objetivo.',
      },
      {
        id: '1c',
        houseId: 'altair',
        text: 'Sumergirme en las bases de datos climáticas y estudios satelitales para entender la raíz del problema.',
        subtext: 'Observar el panorama completo antes de proponer cualquier solución.',
      },
      {
        id: '1d',
        houseId: 'gryphos',
        text: 'Diseñar la arquitectura técnica uniendo APIs de IA, sensores de campo y la interfaz de usuario.',
        subtext: 'Conectar lo teórico con lo tangible en un prototipo funcional.',
      },
      {
        id: '1e',
        houseId: 'serpentis',
        text: 'Diseñar la ingeniería de prompts y afinar los parámetros del modelo para extraer respuestas óptimas.',
        subtext: 'Asegurar que cada instrucción a la IA sea impecable, precisa y sin desperdicios.',
      },
    ],
  },
  {
    id: 2,
    category: 'Gestión de Crisis y Obstáculos',
    question: 'Surge un problema crítico: el modelo de IA arroja errores o alucinaciones y la entrega es mañana. ¿Cómo actúas?',
    context: 'La presión aumenta y el equipo necesita una respuesta inmediata para no perder puntos.',
    options: [
      {
        id: '2a',
        houseId: 'altair',
        text: 'Audito las variables y la matriz de confusión para aislar el sesgo estadístico que causa el error.',
        subtext: 'El análisis riguroso y la evidencia empírica siempre revelan la verdad.',
      },
      {
        id: '2b',
        houseId: 'leons',
        text: 'Mantengo la calma colectiva, tomo el mando, priorizo entregables y decido la alternativa más sólida.',
        subtext: 'Un líder jamás entra en pánico; inspira seguridad y guía al equipo.',
      },
      {
        id: '2c',
        houseId: 'serpentis',
        text: 'Refactorizo el prompt utilizando técnicas de Chain-of-Thought y few-shot para guiar a la IA al resultado exacto.',
        subtext: 'Optimizando la instrucción y eliminando ruido el modelo responde con maestría.',
      },
      {
        id: '2d',
        houseId: 'drakarys',
        text: 'Giro la idea con audacia: aprovecho el imprevisto para proponer una funcionalidad interactiva aún más impactante.',
        subtext: 'La verdadera innovación surge de transformar una dificultad en genialidad.',
      },
      {
        id: '2e',
        houseId: 'gryphos',
        text: 'Creo un puente de validación híbrido conectando una segunda API o una regla de código que parchee la falla.',
        subtext: 'Integración práctica e ingenio versátil para que todo funcione sin fricción.',
      },
    ],
  },
  {
    id: 3,
    category: 'Dominio de Herramientas de IA',
    question: 'Al explorar herramientas avanzadas de Inteligencia Artificial (Gemini, visión artificial, agentes), ¿qué te motiva más?',
    context: 'El curso pone a tu alcance las tecnologías más potentes de la industria.',
    options: [
      {
        id: '3a',
        houseId: 'serpentis',
        text: 'Aprender la anatomía del prompt perfecto, los system instructions y la automatización de workflows.',
        subtext: 'Extraer el 100% del potencial de la IA con la menor cantidad de tokens y máxima precisión.',
      },
      {
        id: '3b',
        houseId: 'drakarys',
        text: 'Crear productos tangibles completos: apps web interactivas, bots con personalidad y soluciones visuales.',
        subtext: 'Construir el futuro ecológico con creaciones vivas y memorables.',
      },
      {
        id: '3c',
        houseId: 'gryphos',
        text: 'Conectar múltiples servicios entre sí: base de datos, APIs de satélites, mapas interactivos y modelos de lenguaje.',
        subtext: 'Ser el artífice que ensambla un ecosistema digital coherente y práctico.',
      },
      {
        id: '3d',
        houseId: 'altair',
        text: 'Descubrir correlaciones ocultas en los datos, validar hipótesis científicas y predecir tendencias ecológicas.',
        subtext: 'Ver más allá de lo visible para fundamentar decisiones que cambien el mundo.',
      },
      {
        id: '3e',
        houseId: 'leons',
        text: 'Comprender el impacto global de la herramienta para coordinar su adopción ética y defender su propuesta de valor.',
        subtext: 'Canalizar el poder tecnológico hacia una visión compartida y ganadora.',
      },
    ],
  },
  {
    id: 4,
    category: 'Defensa y Pitch Ambiental',
    question: 'Llega el momento de presentar la solución ecológica frente al jurado y los jueces del Club Equilibria 360. ¿Cuál es tu papel ideal?',
    context: 'Se evalúa la utilidad, el impacto ambiental y la solidez de la propuesta.',
    options: [
      {
        id: '4a',
        houseId: 'leons',
        text: 'Tomar la palabra principal: exponer con convicción, comunicar la visión e inspirar al jurado a apoyar el proyecto.',
        subtext: 'La seguridad, la elocuencia y el compromiso cierran las victorias.',
      },
      {
        id: '4b',
        houseId: 'altair',
        text: 'Presentar los gráficos, los datos duros de reducción de CO2 y la solidez metodológica de nuestro modelo.',
        subtext: 'Los argumentos respaldados por métricas indiscutibles son irrefutables.',
      },
      {
        id: '4c',
        houseId: 'drakarys',
        text: 'Hacer una demostración en vivo deslumbrante que deje al jurado con la boca abierta ante la originalidad de la solución.',
        subtext: 'Un impacto visual y una experiencia extraordinaria hablan por sí mismos.',
      },
      {
        id: '4d',
        houseId: 'gryphos',
        text: 'Demostrar cómo interactúan todas las piezas en vivo: desde la captura de datos hasta el panel de usuario final.',
        subtext: 'Comprobar que la solución es sólida, funcional y lista para implementarse hoy.',
      },
      {
        id: '4e',
        houseId: 'serpentis',
        text: 'Explicar con precisión milimétrica la arquitectura de prompts y cómo optimizamos cada proceso para que sea ultraeficiente.',
        subtext: 'Demostrar que nuestra solución es la más inteligente y refinada técnica y conceptualmente.',
      },
    ],
  },
  {
    id: 5,
    category: 'Filosofía de Solución Verde',
    question: 'Si tuvieras que definir el sello distintivo de una solución de IA para el medio ambiente, ¿cuál sería?',
    context: 'El impacto ecológico positivo es el corazón del Club Equilibria 360.',
    options: [
      {
        id: '5a',
        houseId: 'drakarys',
        text: 'La audacia: romper las reglas tradicionales de conservación creando algo nunca antes visto.',
        subtext: 'Solo ideas extraordinarias resolverán crisis extraordinarias.',
      },
      {
        id: '5b',
        houseId: 'gryphos',
        text: 'La integración equilibrada: que sea una herramienta usable tanto por biólogos como por ciudadanos comunes.',
        subtext: 'La tecnología ecológica solo triunfa cuando se conecta con la vida real.',
      },
      {
        id: '5c',
        houseId: 'serpentis',
        text: 'La mejora continua: una IA que aprenda y se adapte a los cambios estacionales con mínimo gasto computacional.',
        subtext: 'La verdadera inteligencia ecológica no consume recursos excesivos; optimiza.',
      },
      {
        id: '5d',
        houseId: 'altair',
        text: 'La profundidad analítica: una solución que entienda las causas sistémicas y no solo los síntomas superficiales.',
        subtext: 'Comprender a fondo el ecosistema es el único camino para salvarlo.',
      },
      {
        id: '5e',
        houseId: 'leons',
        text: 'La viabilidad y el liderazgo: un proyecto ejecutable, con metas claras que movilice a cientos de personas.',
        subtext: 'Una gran idea sin disciplina y liderazgo no genera ningún cambio en el planeta.',
      },
    ],
  },
  {
    id: 6,
    category: 'La Voz de tu Convicción',
    question: '¿Con cuál de estas frases resuena de manera más profunda tu forma de ser y trabajar?',
    context: 'Es el lema personal que guía tu aprendizaje diario en inteligencia artificial.',
    options: [
      {
        id: '6a',
        houseId: 'drakarys',
        text: '“Tengo una gran idea y quiero convertirla en realidad.”',
        subtext: 'Fuego creativo, pasión emprendedora y ambición de construir.',
      },
      {
        id: '6b',
        houseId: 'leons',
        text: '“Puedo organizar al equipo y conducirlo hacia la meta.”',
        subtext: 'Determinación, compromiso inquebrantable y capacidad de gestión.',
      },
      {
        id: '6c',
        houseId: 'altair',
        text: '“Antes de construir, quiero comprender el problema y encontrar la mejor estrategia.”',
        subtext: 'Mirada de águila, lucidez investigativa y pensamiento crítico.',
      },
      {
        id: '6d',
        houseId: 'gryphos',
        text: '“Puedo comprender diferentes áreas y unirlas en una solución completa.”',
        subtext: 'El equilibrio perfecto entre mente ágil, técnica y ejecución firme.',
      },
      {
        id: '6e',
        houseId: 'serpentis',
        text: '“Siempre encuentro una forma más inteligente y eficiente de hacer las cosas.”',
        subtext: 'Evolución continua, meticulosidad y maestría en procesos.',
      },
    ],
  },
  {
    id: 7,
    category: 'El Camino a la Casa Maestra',
    question: 'En la gran competencia final del Club Equilibria 360, ¿cuál será el mayor aporte que ofrecerás a tu Casa?',
    context: 'El objetivo supremo es consagrarse como la Casa Maestra de la Inteligencia Artificial.',
    options: [
      {
        id: '7a',
        houseId: 'gryphos',
        text: 'Construir el prototipo funcional integrado y asegurar que la interfaz y el backend respondan sin fallos.',
        subtext: 'El desarrollo multidisciplinario que hace tangible la victoria.',
      },
      {
        id: '7b',
        houseId: 'serpentis',
        text: 'Auditar cada prompt y automatizar tareas repetitivas para que el equipo trabaje con máxima velocidad y calidad.',
        subtext: 'La ventaja táctica de la eficiencia y el control de calidad absoluto.',
      },
      {
        id: '7c',
        houseId: 'leons',
        text: 'Garantizar que todos cumplan su rol, defender el proyecto con orgullo y liderar la estrategia de puntos.',
        subtext: 'La capitanía que une voluntades y no permite que nadie se rinda.',
      },
      {
        id: '7d',
        houseId: 'altair',
        text: 'Proveer los análisis más sólidos, fundamentar el impacto ecológico y prever las preguntas difíciles del jurado.',
        subtext: 'La inteligencia estratégica que anticipa cada movimiento de la competencia.',
      },
      {
        id: '7e',
        houseId: 'drakarys',
        text: 'Aportar la chispa visionaria que haga único nuestro proyecto frente a todas las demás casas.',
        subtext: 'La innovación deslumbrante que marca la diferencia entre un buen proyecto y uno legendario.',
      },
    ],
  },
];
