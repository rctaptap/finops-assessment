const finopsAdoption = [
  {
    id: "understanding",
    capability: "Understanding Cloud Usage and Cost",
    question: "¿Qué tan bien entienden el uso y costos de la nube?",
    tooltip: "Evalúa si el cliente tiene visibilidad clara de qué servicios usa, cuánto cuestan y por qué.",
    options: [
      "Conocemos todos los servicios que usamos",
      "Entendemos por qué gastamos lo que gastamos",
      "Podemos explicar variaciones en el gasto mensual",
      "Tenemos dashboards de costos actualizados",
      "Ninguna de las anteriores"
    ]
  },
  {
    id: "quantifying_value",
    capability: "Quantifying Business Value",
    question: "¿Miden el valor de negocio de sus inversiones cloud?",
    tooltip: "Determina si relacionan el gasto cloud con resultados de negocio (ingresos, eficiencia, etc.).",
    options: [
      "Medimos ROI de proyectos cloud",
      "Relacionamos costos con métricas de negocio",
      "Justificamos inversiones con datos",
      "Ninguna de las anteriores"
    ]
  },
  {
    id: "optimization",
    capability: "Cost Optimization",
    question: "¿Qué tan activos son optimizando costos?",
    tooltip: "Evalúa si buscan y ejecutan oportunidades de ahorro de forma continua.",
    options: [
      "Identificamos oportunidades de ahorro regularmente",
      "Eliminamos recursos no utilizados",
      "Ajustamos tamaños de recursos (rightsizing)",
      "Usamos Reserved Instances o Savings Plans",
      "Ninguna de las anteriores"
    ]
  },
  {
    id: "planning_forecasting",
    capability: "Planning and Forecasting",
    question: "¿Planifican y proyectan gastos cloud?",
    tooltip: "Determina si tienen presupuestos, pronósticos y pueden anticipar costos futuros.",
    options: [
      "Tenemos presupuestos cloud definidos",
      "Hacemos pronósticos de gasto",
      "Planificamos inversiones cloud",
      "Ninguna de las anteriores"
    ]
  },
  {
    id: "performance_tracking",
    capability: "Performance Tracking and Benchmarking",
    question: "¿Miden y comparan su desempeño FinOps?",
    tooltip: "Evalúa si tienen KPIs de FinOps y se comparan con estándares o competidores.",
    options: [
      "Tenemos KPIs de eficiencia cloud",
      "Medimos mejoras en el tiempo",
      "Nos comparamos con benchmarks",
      "Ninguna de las anteriores"
    ]
  },
  {
    id: "rate_optimization",
    capability: "Rate Optimization",
    question: "¿Optimizan las tarifas que pagan por servicios cloud?",
    tooltip: "Determina si negocian descuentos, usan compromisos o aprovechan programas de ahorro.",
    options: [
      "Negociamos descuentos con AWS",
      "Usamos Reserved Instances o Savings Plans",
      "Evaluamos opciones de precios regularmente",
      "Ninguna de las anteriores"
    ]
  },
  {
    id: "workload_management",
    capability: "Workload Management and Automation",
    question: "¿Automatizan la gestión de cargas de trabajo?",
    tooltip: "Evalúa si usan automatización para escalar, apagar o mover cargas según necesidad.",
    options: [
      "Automatizamos escalado de recursos",
      "Apagamos recursos fuera de horario",
      "Movemos cargas a opciones más económicas",
      "Ninguna de las anteriores"
    ]
  },
  {
    id: "anomaly_management",
    capability: "Anomaly Management",
    question: "¿Detectan y actúan sobre anomalías de costos?",
    tooltip: "Determina si tienen alertas y procesos para identificar gastos inesperados.",
    options: [
      "Tenemos alertas de gastos anormales",
      "Investigamos picos de costo",
      "Actuamos rápido ante anomalías",
      "Ninguna de las anteriores"
    ]
  },
  {
    id: "commitment_management",
    capability: "Managing Commitment Based Discounts",
    question: "¿Gestionan activamente sus compromisos de descuento?",
    tooltip: "Evalúa si monitorean y optimizan Reserved Instances, Savings Plans, etc.",
    options: [
      "Monitoreamos utilización de RIs/SPs",
      "Ajustamos compromisos según uso real",
      "Maximizamos cobertura de descuentos",
      "Ninguna de las anteriores"
    ]
  },
  {
    id: "resource_utilization",
    capability: "Resource Utilization and Efficiency",
    question: "¿Qué tan eficientemente usan los recursos?",
    tooltip: "Determina si evitan subutilización y desperdicio de capacidad.",
    options: [
      "Monitoreamos utilización de recursos",
      "Eliminamos recursos idle",
      "Optimizamos uso de capacidad",
      "Ninguna de las anteriores"
    ]
  },
  {
    id: "onboarding_workloads",
    capability: "Onboarding Workloads",
    question: "¿Tienen proceso para incorporar nuevas cargas a la nube?",
    tooltip: "Evalúa si hay un proceso estructurado para migrar o crear cargas considerando costos.",
    options: [
      "Evaluamos costos antes de migrar",
      "Tenemos proceso de onboarding definido",
      "Capacitamos equipos en cost-awareness",
      "Ninguna de las anteriores"
    ]
  },
  {
    id: "cloud_policy",
    capability: "Cloud Policy and Governance",
    question: "¿Tienen políticas y gobernanza cloud establecidas?",
    tooltip: "Determina si existen reglas, controles y procesos de aprobación para uso cloud.",
    options: [
      "Tenemos políticas de uso cloud",
      "Hay controles de gasto implementados",
      "Existe proceso de aprobación de recursos",
      "Ninguna de las anteriores"
    ]
  },
  {
    id: "chargeback",
    capability: "FinOps and Intersecting Frameworks",
    question: "¿Asignan costos a equipos o proyectos (chargeback/showback)?",
    tooltip: "Evalúa si distribuyen costos para crear responsabilidad financiera en los equipos.",
    options: [
      "Asignamos costos a equipos/proyectos",
      "Los equipos conocen su gasto",
      "Hay consecuencias por sobregasto",
      "Ninguna de las anteriores"
    ]
  }
];

export default finopsAdoption;
