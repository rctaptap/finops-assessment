export const questionsData = {
  adoption: [
    { id: 1, category: 'Inform', question: '¿Tiene visibilidad completa de todos los costos de cloud?', phase: 'Inform' },
    { id: 2, category: 'Inform', question: '¿Cuenta con dashboards de costos actualizados en tiempo real?', phase: 'Inform' },
    { id: 3, category: 'Inform', question: '¿Puede asignar costos a equipos, proyectos o centros de costo?', phase: 'Inform' },
    { id: 4, category: 'Inform', question: '¿Tiene alertas configuradas para anomalías de costos?', phase: 'Inform' },
    { id: 5, category: 'Optimize', question: '¿Identifica y elimina recursos no utilizados regularmente?', phase: 'Optimize' },
    { id: 6, category: 'Optimize', question: '¿Utiliza Reserved Instances o Savings Plans?', phase: 'Optimize' },
    { id: 7, category: 'Optimize', question: '¿Optimiza el tamaño de instancias (rightsizing)?', phase: 'Optimize' },
    { id: 8, category: 'Optimize', question: '¿Tiene políticas de apagado automático para entornos no productivos?', phase: 'Optimize' },
    { id: 9, category: 'Operate', question: '¿Existe un equipo o rol dedicado a FinOps?', phase: 'Operate' },
    { id: 10, category: 'Operate', question: '¿Realiza revisiones periódicas de costos con stakeholders?', phase: 'Operate' },
    { id: 11, category: 'Operate', question: '¿Tiene procesos definidos para aprobación de nuevos recursos?', phase: 'Operate' },
    { id: 12, category: 'Operate', question: '¿Mide y reporta el ROI de iniciativas de optimización?', phase: 'Operate' },
    { id: 13, category: 'Culture', question: '¿Los equipos de desarrollo conocen el impacto de costos de sus decisiones?', phase: 'Operate' },
    { id: 14, category: 'Culture', question: '¿Existe una cultura de responsabilidad compartida sobre costos?', phase: 'Operate' },
    { id: 15, category: 'Governance', question: '¿Tiene políticas de tagging implementadas y monitoreadas?', phase: 'Inform' },
    { id: 16, category: 'Governance', question: '¿Cuenta con presupuestos definidos por proyecto/equipo?', phase: 'Operate' },
  ],
  
  optimization: [
    { id: 1, category: 'Compute', question: '¿Utiliza instancias del tamaño correcto según la carga de trabajo?', phase: 'Assess' },
    { id: 2, category: 'Compute', question: '¿Utiliza instancias Spot o preemptibles para cargas tolerantes a interrupciones?', phase: 'Assess' },
    { id: 3, category: 'Storage', question: '¿Tiene políticas de lifecycle para mover datos a storage más económico?', phase: 'Assess' },
    { id: 4, category: 'Storage', question: '¿Monitorea y elimina snapshots y backups no utilizados?', phase: 'Assess' },
    { id: 5, category: 'Network', question: '¿Optimiza la transferencia de datos entre regiones y servicios?', phase: 'Assess' },
    { id: 6, category: 'Database', question: '¿Utiliza instancias de base de datos reservadas para cargas predecibles?', phase: 'Assess' },
    { id: 7, category: 'Monitoring', question: '¿Tiene visibilidad de recursos idle o con baja utilización?', phase: 'Assess' },
    { id: 8, category: 'Architecture', question: '¿Sus aplicaciones están diseñadas para ser cost-efficient?', phase: 'Assess' },
    { id: 9, category: 'Automation', question: '¿Automatiza el escalado de recursos según demanda?', phase: 'Assess' },
    { id: 10, category: 'Commitment', question: '¿Revisa y ajusta sus compromisos (RI/SP) regularmente?', phase: 'Assess' },
  ],
  
  service: [
    { id: 1, category: 'Readiness', question: '¿Cuál es su gasto mensual aproximado en cloud?', type: 'select', options: ['<$10K', '$10K-$50K', '$50K-$200K', '>$200K'], phase: 'Evaluate' },
    { id: 2, category: 'Readiness', question: '¿Tiene personal dedicado a gestión de costos cloud?', phase: 'Evaluate' },
    { id: 3, category: 'Needs', question: '¿Necesita ayuda con visibilidad y reportes de costos?', phase: 'Evaluate' },
    { id: 4, category: 'Needs', question: '¿Requiere soporte para optimización continua?', phase: 'Evaluate' },
    { id: 5, category: 'Needs', question: '¿Busca establecer una práctica FinOps en su organización?', phase: 'Evaluate' },
    { id: 6, category: 'Maturity', question: '¿Tiene herramientas de FinOps implementadas actualmente?', phase: 'Evaluate' },
    { id: 7, category: 'Maturity', question: '¿Realiza forecasting de costos cloud?', phase: 'Evaluate' },
    { id: 8, category: 'Goals', question: '¿Cuál es su objetivo principal?', type: 'select', options: ['Reducir costos', 'Visibilidad', 'Gobernanza', 'Todo lo anterior'], phase: 'Evaluate' },
    { id: 9, category: 'Timeline', question: '¿En qué plazo busca resultados?', type: 'select', options: ['Inmediato', '1-3 meses', '3-6 meses', '6+ meses'], phase: 'Evaluate' },
    { id: 10, category: 'Support', question: '¿Prefiere un servicio gestionado o consultoría?', type: 'select', options: ['Servicio gestionado', 'Consultoría', 'Ambos'], phase: 'Evaluate' },
  ],
};

export const defaultAnswerOptions = [
  { value: 'yes', label: 'Sí', score: 3 },
  { value: 'partial', label: 'Parcialmente', score: 2 },
  { value: 'no', label: 'No', score: 1 },
  { value: 'unknown', label: 'No sé', score: 0 },
];
