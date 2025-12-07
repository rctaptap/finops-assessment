const finopsService = [
  {
    id: "current_visibility",
    question: "¿Qué nivel de visibilidad tienen actualmente sobre sus costos cloud?",
    tooltip: "Ayuda a entender si necesitan herramientas básicas o avanzadas de visibilidad.",
    options: [
      "No tenemos visibilidad clara",
      "Vemos costos generales pero sin detalle",
      "Tenemos dashboards básicos",
      "Tenemos visibilidad completa y detallada"
    ]
  },
  {
    id: "team_size",
    question: "¿Tienen equipo dedicado a gestionar costos cloud?",
    tooltip: "Determina si necesitan servicio gestionado completo o solo consultoría.",
    options: [
      "No tenemos nadie dedicado",
      "Alguien lo hace part-time",
      "Tenemos 1-2 personas",
      "Tenemos equipo completo"
    ]
  },
  {
    id: "monthly_spend",
    question: "¿Cuál es su gasto mensual aproximado en cloud?",
    tooltip: "El tamaño del gasto ayuda a dimensionar el servicio recomendado.",
    options: [
      "Menos de $10K/mes",
      "$10K - $50K/mes",
      "$50K - $200K/mes",
      "Más de $200K/mes"
    ]
  },
  {
    id: "urgency",
    question: "¿Qué tan urgente es mejorar la gestión de costos?",
    tooltip: "Determina si necesitan implementación rápida o pueden ir paso a paso.",
    options: [
      "Muy urgente (presión de dirección)",
      "Urgente (queremos resultados en 3 meses)",
      "Moderado (podemos ir gradual)",
      "No es urgente"
    ]
  },
  {
    id: "autonomy",
    question: "¿Prefieren gestionar internamente o delegar?",
    tooltip: "Ayuda a decidir entre servicio gestionado, consultoría o híbrido.",
    options: [
      "Queremos delegar completamente",
      "Queremos aprender y gestionar nosotros",
      "Híbrido: soporte + autonomía",
      "Solo necesitamos consultoría puntual"
    ]
  },
  {
    id: "pain_points",
    question: "¿Cuál es su mayor dolor actual?",
    tooltip: "Identifica la prioridad principal del cliente.",
    options: [
      "No entendemos por qué gastamos tanto",
      "Sabemos que desperdiciamos pero no sabemos cómo optimizar",
      "No tenemos tiempo para gestionar costos",
      "Necesitamos reportes para dirección"
    ]
  },
  {
    id: "tools",
    question: "¿Usan herramientas de FinOps actualmente?",
    tooltip: "Determina si necesitan implementación desde cero o mejora de lo existente.",
    options: [
      "No usamos nada",
      "Solo herramientas nativas de AWS",
      "Herramientas de terceros (CloudHealth, Apptio, etc.)",
      "Solución custom interna"
    ]
  }
];

export default finopsService;
