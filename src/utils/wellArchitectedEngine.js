export function calculateRiskLevel(selected, total) {
  const pct = (selected.length / total) * 100;
  if (pct === 100) return "SIN RIESGO";
  if (pct >= 61) return "BAJO";
  if (pct >= 26) return "MEDIO";
  return "ALTO";
}

export function calculateQuestionRisk(question, selected) {
  const total = question.options ? question.options.length : question.bestPractices?.length || 0;
  return calculateRiskLevel(selected, total);
}

export function calculatePillarSummary(answers, data) {
  let high = 0;
  let medium = 0;
  let low = 0;
  let noRisk = 0;

  data.questions.forEach(q => {
    const selected = answers[q.id] || [];
    const risk = calculateQuestionRisk(q, selected);

    if (risk === "ALTO") high++;
    else if (risk === "MEDIO") medium++;
    else if (risk === "BAJO") low++;
    else noRisk++;
  });

  return { high, medium, low, noRisk };
}

const RECOMMENDATION_MAP = {
  "Monitorear costos de forma proactiva": "Activa AWS Cost Explorer, Budgets y Anomaly Detection.",
  "Proveer recursos dinámicamente": "Evalúa Auto Scaling, Compute Optimizer y Lambda para elasticidad.",
  "Automatizar decommissioning": "Utiliza AWS Instance Scheduler, DLM y Lambda para eliminar recursos no usados.",
  "Optimizar componentes para minimizar transferencias": "Usa CloudFront, PrivateLink y VPC Endpoints.",
  "Configurar herramientas de billing y cost management": "Implementa Cost Explorer, AWS Budgets y Cost Anomaly Detection.",
  "Implementar controles de costo": "Usa Service Control Policies (SCPs) y AWS Organizations.",
  "Realizar cost modeling": "Utiliza AWS Pricing Calculator y Cost Explorer para proyecciones.",
  "Aplicar modelos de precios apropiados": "Evalúa Reserved Instances, Savings Plans y Spot Instances."
};

export function generateRecommendations(question, selected) {
  const practices = question.options || question.bestPractices || [];
  const missing = practices.filter(p => !selected.includes(p) && p !== "Ninguna de las anteriores");
  return missing.map(item => {
    const helper = RECOMMENDATION_MAP[item] || "";
    return helper ? `${item}. ${helper}` : item;
  });
}
