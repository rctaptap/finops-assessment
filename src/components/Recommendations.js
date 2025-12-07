import React from 'react';

// Mapeo de recomendaciones por dominio
const recommendationMap = {
  financial_management: "Establece un responsable de costos cloud y crea reuniones mensuales entre Finanzas y Tecnología para revisar gastos.",
  governance: "Define políticas básicas de uso cloud: quién puede crear recursos, límites de gasto y proceso de aprobación.",
  monitoring: "Implementa tagging obligatorio y configura Cost Explorer para tener visibilidad detallada por equipo/proyecto.",
  decommissioning: "Crea un proceso formal para identificar y apagar recursos no utilizados. Automatiza con AWS Instance Scheduler.",
  service_selection: "Antes de elegir servicios, evalúa 2-3 opciones considerando costo total de propiedad, no solo precio inicial.",
  right_sizing: "Usa AWS Compute Optimizer para identificar instancias sobredimensionadas y ajusta tamaños basándote en datos reales.",
  pricing_models: "Analiza tu uso estable y compra Reserved Instances o Savings Plans para cargas predecibles (mínimo 30% de ahorro).",
  data_transfer: "Revisa costos de transferencia entre regiones/zonas. Usa VPC Endpoints y CloudFront para reducir tráfico.",
  demand_supply: "Implementa Auto Scaling para ajustar recursos automáticamente según demanda real.",
  new_services: "Agenda revisiones trimestrales para evaluar nuevos servicios AWS que puedan reducir costos.",
  effort_cost: "Automatiza tareas repetitivas con Lambda, Systems Manager y EventBridge para reducir esfuerzo operativo.",
  
  // FinOps Adoption
  understanding: "Implementa dashboards de costos actualizados diariamente y capacita a los equipos en lectura de métricas.",
  quantifying_value: "Relaciona costos cloud con KPIs de negocio (ingresos, usuarios, transacciones) para justificar inversiones.",
  optimization: "Crea un proceso mensual de identificación y ejecución de oportunidades de ahorro.",
  planning_forecasting: "Establece presupuestos trimestrales por equipo y haz pronósticos basados en tendencias históricas.",
  performance_tracking: "Define 3-5 KPIs clave de FinOps y mídelos mensualmente (ej: costo por usuario, % de ahorro ejecutado).",
  rate_optimization: "Negocia descuentos con AWS si gastas >$100K/mes. Maximiza uso de Reserved Instances y Savings Plans.",
  workload_management: "Automatiza apagado de entornos no productivos fuera de horario (ahorro típico: 40-60%).",
  anomaly_management: "Configura AWS Cost Anomaly Detection con alertas automáticas a Slack/email.",
  commitment_management: "Revisa mensualmente utilización de RIs/SPs y ajusta compromisos según uso real.",
  resource_utilization: "Monitorea utilización de CPU/memoria y elimina recursos con <10% de uso.",
  onboarding_workloads: "Crea checklist de cost-awareness para nuevos proyectos: tagging, sizing, modelo de precios.",
  cloud_policy: "Documenta políticas de uso cloud y comunícalas a todos los equipos técnicos.",
  chargeback: "Implementa showback (visibilidad de costos por equipo) antes de chargeback (cobro real)."
};

export default function Recommendations({ data, activeTab, answers }) {
  const recommendations = [];

  // Generar recomendaciones basadas en respuestas
  data.forEach(q => {
    const selected = answers[q.id] || [];
    
    // Si no respondió o eligió "Ninguna de las anteriores", agregar recomendación
    if (selected.length === 0 || selected.includes("Ninguna de las anteriores")) {
      const rec = recommendationMap[q.id];
      if (rec) {
        recommendations.push({
          domain: q.question,
          recommendation: rec,
          priority: selected.includes("Ninguna de las anteriores") ? 'high' : 'medium'
        });
      }
    }
  });

  // Si no hay recomendaciones
  if (recommendations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Recomendaciones</h2>
        <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-center">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-green-800 font-semibold">¡Excelente!</p>
          <p className="text-green-700 text-sm mt-2">
            Todas las áreas están cubiertas. Mantén las prácticas actuales y busca mejoras continuas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Recomendaciones</h2>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
          {recommendations.length} acciones
        </span>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, idx) => (
          <div 
            key={idx}
            className={`
              border-l-4 p-4 rounded-r-lg
              ${rec.priority === 'high' ? 'border-red-500 bg-red-50' : 'border-yellow-500 bg-yellow-50'}
            `}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-gray-800 text-sm flex-1">{rec.domain}</h3>
              <span className={`
                px-2 py-1 rounded text-xs font-bold
                ${rec.priority === 'high' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}
              `}>
                {rec.priority === 'high' ? 'Alta' : 'Media'}
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{rec.recommendation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
