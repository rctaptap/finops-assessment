const finopsRequirement = [
  {
    id: "urgency",
    question: "¿Qué tan urgente es reducir los costos cloud?",
    tooltip: "Determina el nivel de urgencia y presión del cliente",
    type: "single",
    options: [
      { text: "Necesitamos un impacto inmediato", quickWin: 5, continuous: 1, adoption: 0 },
      { text: "Queremos ahorrar pronto", quickWin: 3, continuous: 2, adoption: 1 },
      { text: "No es urgente", quickWin: 0, continuous: 2, adoption: 3 }
    ]
  },
  {
    id: "result_type",
    question: "¿Qué tipo de resultado busca el cliente?",
    tooltip: "Define el objetivo principal del cliente",
    type: "single",
    options: [
      { text: "Ahorros rápidos", quickWin: 5, continuous: 0, adoption: 0 },
      { text: "Gobierno y control continuo", quickWin: 0, continuous: 5, adoption: 1 },
      { text: "Transformación organizacional", quickWin: 0, continuous: 1, adoption: 5 }
    ]
  },
  {
    id: "internal_dedication",
    question: "¿Qué nivel de dedicación interna tiene el cliente?",
    tooltip: "Evalúa la capacidad interna del cliente",
    type: "single",
    options: [
      { text: "No tienen equipo", quickWin: 3, continuous: 4, adoption: 1 },
      { text: "Tienen equipo limitado", quickWin: 2, continuous: 3, adoption: 3 },
      { text: "Cuentan con equipo especializado", quickWin: 1, continuous: 2, adoption: 5 }
    ]
  },
  {
    id: "support_expectation",
    question: "¿Qué tipo de acompañamiento espera?",
    tooltip: "Define el modelo de relación esperado",
    type: "single",
    options: [
      { text: "Acciones rápidas", quickWin: 5, continuous: 0, adoption: 1 },
      { text: "Soporte continuo", quickWin: 1, continuous: 5, adoption: 1 },
      { text: "Consultoría especializada", quickWin: 0, continuous: 2, adoption: 5 }
    ]
  },
  {
    id: "maturity_declared",
    question: "¿Qué nivel de madurez declara el cliente?",
    tooltip: "Autoevaluación del cliente sobre su madurez FinOps",
    type: "single",
    options: [
      { text: "Bajo", quickWin: 4, continuous: 3, adoption: 1 },
      { text: "Medio", quickWin: 2, continuous: 4, adoption: 3 },
      { text: "Alto", quickWin: 1, continuous: 2, adoption: 5 }
    ]
  },
  {
    id: "service_duration",
    question: "¿El cliente busca un servicio puntual o continuo?",
    tooltip: "Define el horizonte temporal de la relación",
    type: "single",
    options: [
      { text: "Puntual", quickWin: 5, continuous: 0, adoption: 1 },
      { text: "Intermedio", quickWin: 2, continuous: 3, adoption: 3 },
      { text: "Continuo", quickWin: 0, continuous: 5, adoption: 2 }
    ]
  },
  {
    id: "monthly_spend",
    question: "¿Cuál es el gasto cloud mensual aproximado?",
    tooltip: "Dimensiona el tamaño de la oportunidad",
    type: "single",
    options: [
      { text: "Menos de $10,000 USD/mes", quickWin: 3, continuous: 2, adoption: 1 },
      { text: "Entre $10,000 - $50,000 USD/mes", quickWin: 3, continuous: 3, adoption: 3 },
      { text: "Más de $50,000 USD/mes", quickWin: 2, continuous: 4, adoption: 4 }
    ]
  },
  {
    id: "expected_timeline",
    question: "¿En qué plazo espera ver resultados concretos?",
    tooltip: "Define expectativas de tiempo del cliente",
    type: "single",
    options: [
      { text: "1-3 meses", quickWin: 5, continuous: 1, adoption: 0 },
      { text: "3-6 meses", quickWin: 2, continuous: 4, adoption: 2 },
      { text: "6-12 meses o más", quickWin: 0, continuous: 3, adoption: 5 }
    ]
  }
];

// Función para calcular recomendación con insight comercial extenso
export const calculateFinopsRequirementRecommendation = (answers, data) => {
  let scoreQuickWin = 0;
  let scoreContinuous = 0;
  let scoreAdoption = 0;

  data.forEach(q => {
    const answer = answers[q.id];
    if (answer && answer.length > 0) {
      const selectedOption = answer[0];
      if (typeof selectedOption === 'object') {
        scoreQuickWin += selectedOption.quickWin || 0;
        scoreContinuous += selectedOption.continuous || 0;
        scoreAdoption += selectedOption.adoption || 0;
      }
    }
  });

  const maxScore = Math.max(scoreQuickWin, scoreContinuous, scoreAdoption);
  let recommendation = null;

  if (maxScore === scoreQuickWin && scoreQuickWin > 0) {
    recommendation = {
      service: "Optimización de Costos (Quick Wins)",
      summary: "Servicio puntual enfocado en resultados inmediatos mediante acciones técnicas rápidas. Identificamos oportunidades de ahorro en instancias, storage, redes y servicios, priorizamos quick wins y ejecutamos implementaciones que generan retorno visible en días o semanas.",
      insight: "El cliente muestra una necesidad clara de generar resultados financieros en el corto plazo. Las respuestas indican urgencia, poca madurez en gestión de costos y un interés explícito en obtener mejoras visibles rápidamente. Esto sugiere que el foco debe estar en capturar ahorros inmediatos mediante un diagnóstico técnico enfocado en quick wins. Con este enfoque, se pueden identificar oportunidades de ahorro en cuestión de días, priorizarlas y transformarlas en acciones concretas que permitan demostrar valor inmediato. Este tipo de cliente valora el ROI tangible y medible, por lo que es fundamental presentar casos de éxito con ahorros del 20-40% y un proceso ágil sin compromisos de largo plazo. La estrategia comercial debe enfatizar la rapidez de implementación, el retorno financiero inmediato y la posibilidad de escalar hacia servicios más estructurados una vez demostrado el valor inicial.",
      bgColor: "bg-blue-600",
      borderColor: "border-blue-600",
      scores: { quickWin: scoreQuickWin, continuous: scoreContinuous, adoption: scoreAdoption }
    };
  } else if (maxScore === scoreContinuous && scoreContinuous > 0) {
    recommendation = {
      service: "Servicio FinOps Continuo",
      summary: "Gestión continua de costos cloud con gobierno, visibilidad y optimización permanente. Incluye monitoreo mensual, budgeting, forecasting, soporte a finanzas y tecnología, revisión periódica de oportunidades, automatización de alertas e informes ejecutivos.",
      insight: "El cliente requiere acompañamiento permanente y necesita un sistema estable de control y visibilidad financiera. Las respuestas reflejan interés en gobernabilidad, monitoreo constante y soporte especializado. Este comportamiento es típico de organizaciones que desean una operación confiable, con reportes periódicos y gestión activa del gasto. El servicio continuo permite mantener un equilibrio entre optimización técnica y disciplina financiera, generando predictibilidad para las áreas de finanzas y tecnología. Este cliente valora la estabilidad, la relación de largo plazo y la tranquilidad de contar con un equipo dedicado que gestione proactivamente los costos mes a mes. La propuesta comercial debe destacar la fábrica FinOps como servicio, la reducción de carga operativa interna, la evidencia continua de valor mediante reportes ejecutivos y la capacidad de anticipar desviaciones presupuestarias antes de que se conviertan en problemas.",
      bgColor: "bg-purple-600",
      borderColor: "border-purple-600",
      scores: { quickWin: scoreQuickWin, continuous: scoreContinuous, adoption: scoreAdoption }
    };
  } else if (maxScore === scoreAdoption && scoreAdoption > 0) {
    recommendation = {
      service: "Adopción FinOps (Consultoría)",
      summary: "Implementación formal de FinOps como modelo operativo completo. Incluye workshops con finanzas e ingeniería, evaluación de madurez, diseño del modelo operativo, definición de roles, implementación de procesos, roadmap de adopción, alineamiento cultural y establecimiento de KPIs y políticas FinOps.",
      insight: "El cliente busca un cambio organizacional profundo y un modelo formal de actuación en torno a costos cloud. Las respuestas indican interés en procesos, roles, cultura y gobernanza. Esto exige un enfoque estructurado basado en el framework de la FinOps Foundation. Con este servicio, el cliente puede avanzar hacia un modelo alineado entre finanzas, operaciones e ingeniería, donde las decisiones de gasto se tomen con responsabilidad compartida y métricas de madurez. Este tipo de cliente valora la transformación sostenible, la autonomía futura y la instalación de capacidades internas. La estrategia comercial debe enfatizar la consultoría especializada, el acompañamiento en la adopción del framework FinOps, la capacitación de equipos internos y la construcción de un modelo operativo que perdure en el tiempo. Es fundamental presentar casos de éxito de organizaciones que lograron madurez FinOps y destacar el valor de contar con procesos formales, roles definidos y una cultura de eficiencia que trasciende proyectos puntuales.",
      bgColor: "bg-green-600",
      borderColor: "border-green-600",
      scores: { quickWin: scoreQuickWin, continuous: scoreContinuous, adoption: scoreAdoption }
    };
  }

  return recommendation;
};

export default finopsRequirement;
