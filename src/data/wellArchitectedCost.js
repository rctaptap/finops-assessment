const wellArchitectedCost = [
  {
    id: "financial_management",
    question: "¿Qué tan desarrollada está la gestión financiera de la nube?",
    tooltip:
      "Evalúa si el cliente tiene estructura para gestionar costos cloud: responsables, colaboración entre áreas, presupuestos y revisiones periódicas.",
    options: [
      "Existe una persona responsable de los costos cloud",
      "Finanzas y tecnología coordinan decisiones relacionadas al gasto",
      "Existen presupuestos y pronósticos cloud definidos",
      "Se consideran los costos al tomar decisiones",
      "El gasto cloud se revisa periódicamente",
      "Se mide el impacto económico de las optimizaciones",
      "Se promueve la responsabilidad sobre el gasto cloud"
    ]
  },

  {
    id: "governance",
    question: "¿Cómo gobiernan el uso de la nube?",
    tooltip:
      "Determina si el cliente cuenta con reglas claras, controles y una estructura ordenada para administrar el uso de la nube.",
    options: [
      "Existen lineamientos de uso de cloud",
      "Hay metas y objetivos definidos para el uso de cloud",
      "La estructura de cuentas está organizada",
      "Se aplican controles para evitar gastos innecesarios"
    ]
  },

  {
    id: "monitoring",
    question: "¿Qué nivel de visibilidad tienen sobre costos y uso?",
    tooltip:
      "Evalúa si entienden en detalle quién gasta, por qué gasta y cómo evoluciona el uso de los servicios.",
    options: [
      "Se puede identificar qué área o proyecto genera cada costo",
      "Se utilizan herramientas de monitoreo y facturación cloud",
      "Se utilizan etiquetas (tags) para mejorar la visibilidad",
      "Los costos se asignan correctamente a quienes los generan"
    ]
  },

  {
    id: "decommissioning",
    question: "¿Cómo gestionan el apagado de recursos que ya no se usan?",
    tooltip:
      "Evalúa si existen prácticas claras para evitar recursos sin uso que generen costos innecesarios.",
    options: [
      "Se conoce qué recursos están activos y en uso",
      "Existe un proceso claro para apagar recursos",
      "Existen políticas de retención de datos"
    ]
  },

  {
    id: "service_selection",
    question: "¿Cómo consideran los costos al seleccionar servicios o arquitecturas?",
    tooltip:
      "Evalúa si el cliente toma decisiones de arquitectura basadas también en costos y no solo en lo técnico.",
    options: [
      "Se consideran criterios de costos al seleccionar servicios",
      "Se eligen licencias eficientes en costos"
    ]
  },

  {
    id: "right_sizing",
    question:
      "¿Qué tan adecuadamente seleccionan el tipo y tamaño de los recursos?",
    tooltip:
      "Analiza si el cliente evalúa datos reales de uso y ajusta tamaños (right-sizing) con frecuencia.",
    options: [
      "El tipo y tamaño de recursos se elige con base en datos reales",
      "Los ajustes pueden automatizarse según la demanda"
    ]
  },

  {
    id: "pricing_models",
    question: "¿Cómo aprovechan los modelos de precios para reducir costos?",
    tooltip:
      "Determina si el cliente utiliza modelos de precios como reservas, savings plans o acuerdos comerciales.",
    options: [
      "Se evalúan acuerdos o contratos para obtener mejores precios",
      "Se aplican modelos de precios adecuados según el recurso"
    ]
  },

  {
    id: "data_transfer",
    question: "¿Cómo planifican y optimizan los costos de transferencia de datos?",
    tooltip:
      "Evalúa si el cliente controla y optimiza costos de transferencias entre servicios, zonas o regiones.",
    options: [
      "Se analizan los costos de transferencia de datos"
    ]
  },

  {
    id: "demand_supply",
    question: "¿Cómo manejan la demanda y el ajuste automático de recursos?",
    tooltip:
      "Evalúa si el cliente sabe cómo escala su carga y ajusta los recursos sin desperdicio.",
    options: [
      "Los recursos se ajustan automáticamente según necesidad"
    ]
  },

  {
    id: "cost10",
    question: "Se revisan periódicamente los servicios cloud utilizados para buscar alternativas más eficientes",
    tooltip:
      "¿El cliente revisa regularmente si existen servicios nuevos o mejoras que puedan reducir costos o simplificar la arquitectura actual?",
    options: [
      "Existe un proceso para revisar los servicios utilizados",
      "Se analizan periódicamente los componentes de la carga"
    ]
  },

  {
    id: "cost11",
    question: "Se evalúa el esfuerzo operativo necesario al implementar o mejorar servicios",
    tooltip:
      "¿El cliente evalúa cuánto esfuerzo operativo costará implementar nuevos servicios o automatizar tareas, para evitar aumentos innecesarios de carga de trabajo?",
    options: [
      "Se automatizan tareas para reducir esfuerzo operativo"
    ]
  }
];

export default wellArchitectedCost;
