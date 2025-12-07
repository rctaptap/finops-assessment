import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { calculateFinopsRequirementRecommendation } from '../data/finopsRequirement';

// Función para calcular score
const calculateScore = (data, answers) => {
  let totalPoints = 0;
  let maxPoints = 0;

  data.forEach(q => {
    const selected = answers[q.id] || [];
    const maxForQuestion = q.options.length;
    
    maxPoints += maxForQuestion;
    totalPoints += selected.length;
  });

  const percentage = maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;
  return Math.round(percentage);
};

// Función para determinar nivel de riesgo
const getRiskLevel = (score) => {
  if (score >= 70) return { level: 'Bajo', color: 'green', emoji: '✅' };
  if (score >= 40) return { level: 'Medio', color: 'yellow', emoji: '⚠️' };
  return { level: 'Alto', color: 'red', emoji: '🚨' };
};

// Mensajes ejecutivos por tab
const getExecutiveSummary = (activeTab, score, risk) => {
  if (activeTab === 'optimization') {
    if (risk.level === 'Alto') {
      return "Tu empresa tiene riesgo alto. Faltan procesos básicos de gestión de costos cloud. Prioridad: establecer visibilidad y controles.";
    }
    if (risk.level === 'Medio') {
      return "Tienes bases pero hay oportunidades claras. Enfócate en automatización y optimización continua.";
    }
    return "Excelente gestión de costos. Mantén las prácticas actuales y busca mejoras incrementales.";
  }

  if (activeTab === 'adoption') {
    if (risk.level === 'Alto') {
      return "Madurez FinOps inicial. Necesitas establecer capacidades fundamentales: visibilidad, asignación de costos y optimización básica.";
    }
    if (risk.level === 'Medio') {
      return "Madurez FinOps en desarrollo. Fortalece capacidades avanzadas como forecasting y automatización.";
    }
    return "Madurez FinOps avanzada. Tu organización tiene prácticas sólidas en todas las capacidades clave.";
  }

  return "Completa la evaluación para recibir recomendaciones personalizadas.";
};

export default function Dashboard({ data, activeTab, answers }) {
  const score = calculateScore(data, answers);
  const risk = getRiskLevel(score);
  const summary = getExecutiveSummary(activeTab, score, risk);

  // Dashboard para Requerimiento FinOps
  if (activeTab === 'requirement') {
    const answeredCount = Object.keys(answers).length;
    const completionRate = (answeredCount / data.length) * 100;

    // Calcular recomendación con insight extenso
    const recommendation = completionRate >= 75 ? calculateFinopsRequirementRecommendation(answers, data) : null;

    // Determinar nivel de riesgo basado en madurez
    let riskLevel = { level: 'Medio', color: 'yellow', emoji: '⚠️' };
    
    if (recommendation) {
      const { scores } = recommendation;
      // Si busca quick wins urgentes = Riesgo Alto (madurez baja)
      if (scores.quickWin >= scores.adoption && scores.quickWin >= scores.continuous) {
        riskLevel = { level: 'Alto', color: 'red', emoji: '🚨' };
      }
      // Si busca adopción = Riesgo Bajo (madurez alta, pero necesita consultoría)
      else if (scores.adoption > scores.quickWin && scores.adoption > scores.continuous) {
        riskLevel = { level: 'Bajo', color: 'green', emoji: '✅' };
      }
      // Si busca servicio continuo = Riesgo Medio
      else if (scores.continuous >= scores.quickWin && scores.continuous >= scores.adoption) {
        riskLevel = { level: 'Medio', color: 'yellow', emoji: '⚠️' };
      }
    }

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <h2 className="text-xl font-bold text-gray-800">1. Requerimiento FinOps</h2>
        
        {/* Completado */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 text-center border-2 border-blue-200">
          <div className="text-5xl font-bold text-blue-600 mb-2">
            {Math.round(completionRate)}%
          </div>
          <div className="text-gray-700 text-sm font-semibold">Completado</div>
        </div>

        {/* Nivel de Riesgo */}
        {completionRate >= 50 && recommendation && (
          <div className={`
            p-5 rounded-lg text-center border-2
            ${riskLevel.color === 'red' ? 'bg-red-50 border-red-500' : ''}
            ${riskLevel.color === 'yellow' ? 'bg-yellow-50 border-yellow-500' : ''}
            ${riskLevel.color === 'green' ? 'bg-green-50 border-green-500' : ''}
          `}>
            <div className="text-4xl mb-2">{riskLevel.emoji}</div>
            <div className={`
              text-xl font-bold mb-1
              ${riskLevel.color === 'red' ? 'text-red-700' : ''}
              ${riskLevel.color === 'yellow' ? 'text-yellow-700' : ''}
              ${riskLevel.color === 'green' ? 'text-green-700' : ''}
            `}>
              Riesgo {riskLevel.level}
            </div>
            <p className="text-xs text-gray-700 mt-2">
              {riskLevel.level === 'Alto' && 'Madurez inicial. El cliente necesita resultados rápidos y no tiene estructura FinOps. Oportunidad de Quick-Win.'}
              {riskLevel.level === 'Medio' && 'Madurez intermedia. El cliente necesita acompañamiento continuo para sostener optimizaciones.'}
              {riskLevel.level === 'Bajo' && 'Madurez avanzada. El cliente busca formalizar FinOps con consultoría y capacitación interna.'}
            </p>
          </div>
        )}

        {/* Recomendación */}
        {recommendation ? (
          <div className="space-y-4">
            <div className={`p-5 ${recommendation.bgColor} text-white rounded-lg shadow-lg border-2 ${recommendation.borderColor}`}>
              <div className="text-xs font-bold mb-2 opacity-90">RECOMENDACIÓN SUGERIDA</div>
              <h3 className="text-lg font-bold mb-3">{recommendation.service}</h3>
              <p className="text-sm leading-relaxed mb-3">{recommendation.summary}</p>
              <div className="text-xs opacity-90 pt-3 border-t border-white border-opacity-30">
                Scores: Quick-Win: {recommendation.scores.quickWin} | Continuo: {recommendation.scores.continuous} | Adopción: {recommendation.scores.adoption}
              </div>
            </div>
            
            {/* Insight Comercial Extenso */}
            <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-2 border-amber-400 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💡</span>
                <div className="text-sm font-bold text-amber-900">INSIGHT COMERCIAL</div>
              </div>
              <p className="text-sm text-gray-800 leading-relaxed">{recommendation.insight}</p>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
            <p className="text-sm text-gray-700 text-center">Completa al menos el 75% del formulario para recibir una recomendación personalizada con insight comercial extenso.</p>
          </div>
        )}
      </div>
    );
  }

  // Calcular datos por categoría para visualización
  const categoryData = data.map(q => {
    const selected = answers[q.id] || [];
    const maxForQuestion = q.options.length;
    const points = selected.length;
    const percentage = maxForQuestion > 0 ? (points / maxForQuestion) * 100 : 0;
    
    return {
      category: q.question.substring(0, 30) + '...',
      fullCategory: q.question,
      score: Math.round(percentage),
      maxScore: 100
    };
  });

  // Generar recomendaciones dinámicas
  const generateRecommendations = () => {
    const recs = [];
    
    data.forEach(q => {
      const selected = answers[q.id] || [];
      const maxForQuestion = q.options.length;
      const points = selected.length;
      const percentage = maxForQuestion > 0 ? (points / maxForQuestion) * 100 : 0;
      
      if (percentage < 40) {
        if (q.id === 'financial_management') {
          recs.push({ priority: 'Alta', text: 'Establecer un responsable de costos cloud y crear presupuestos mensuales' });
        } else if (q.id === 'governance') {
          recs.push({ priority: 'Alta', text: 'Implementar políticas de gobernanza y organizar estructura de cuentas' });
        } else if (q.id === 'monitoring') {
          recs.push({ priority: 'Alta', text: 'Activar herramientas de monitoreo de costos y establecer sistema de etiquetado (tagging)' });
        } else if (q.id === 'decommissioning') {
          recs.push({ priority: 'Media', text: 'Crear proceso para identificar y apagar recursos no utilizados' });
        } else if (q.id === 'service_selection') {
          recs.push({ priority: 'Media', text: 'Incluir análisis de costos en decisiones de arquitectura' });
        } else if (q.id === 'right_sizing') {
          recs.push({ priority: 'Alta', text: 'Implementar right-sizing basado en métricas reales de uso' });
        } else if (q.id === 'pricing_models') {
          recs.push({ priority: 'Alta', text: 'Evaluar Savings Plans o Reserved Instances para cargas estables' });
        } else if (q.id === 'data_transfer') {
          recs.push({ priority: 'Media', text: 'Analizar y optimizar costos de transferencia de datos entre regiones' });
        } else if (q.id === 'demand_supply') {
          recs.push({ priority: 'Media', text: 'Implementar auto-scaling para ajustar recursos según demanda' });
        } else if (q.id === 'cost10') {
          recs.push({ priority: 'Media', text: 'Establecer revisión trimestral de servicios cloud para identificar alternativas más eficientes' });
        } else if (q.id === 'cost11') {
          recs.push({ priority: 'Media', text: 'Evaluar automatización de tareas operativas para reducir esfuerzo manual' });
        }
      }
    });
    
    return recs.slice(0, 5);
  };

  const recommendations = generateRecommendations();

  // Contar categorías por nivel de riesgo
  const riskCounts = { bajo: 0, medio: 0, alto: 0 };
  categoryData.forEach(cat => {
    if (cat.score >= 70) riskCounts.bajo++;
    else if (cat.score >= 40) riskCounts.medio++;
    else riskCounts.alto++;
  });

  const radarRiskData = [
    { nivel: 'Bajo', cantidad: riskCounts.bajo, fullMark: data.length },
    { nivel: 'Medio', cantidad: riskCounts.medio, fullMark: data.length },
    { nivel: 'Alto', cantidad: riskCounts.alto, fullMark: data.length }
  ];

  // Dashboard para Optimization y Adoption
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">
        {activeTab === 'optimization' ? '2. Optimización Cloud' : 'Madurez FinOps'}
      </h2>

      {/* Resumen de Riesgo y Avance */}
      <div className={`
        p-6 rounded-lg text-center
        ${risk.color === 'green' ? 'bg-green-50 border-2 border-green-500' : ''}
        ${risk.color === 'yellow' ? 'bg-yellow-50 border-2 border-yellow-500' : ''}
        ${risk.color === 'red' ? 'bg-red-50 border-2 border-red-500' : ''}
      `}>
        <div className="text-5xl mb-2">{risk.emoji}</div>
        <div className={`
          text-2xl font-bold mb-1
          ${risk.color === 'green' ? 'text-green-700' : ''}
          ${risk.color === 'yellow' ? 'text-yellow-700' : ''}
          ${risk.color === 'red' ? 'text-red-700' : ''}
        `}>
          Riesgo {risk.level}
        </div>
        <div className="text-4xl font-bold text-gray-800 mb-1">{score}%</div>
        <div className="text-xs text-gray-600 mb-3">Avance de Implementación</div>
        <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
      </div>

      {/* Radar de Riesgos por Nivel */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-bold text-gray-800 mb-3 text-sm">Distribución de Riesgos</h3>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarRiskData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="nivel" />
            <PolarRadiusAxis angle={90} domain={[0, data.length]} />
            <Radar name="Categorías" dataKey="cantidad" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
        <div className="flex justify-around mt-3 text-xs">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{riskCounts.alto}</div>
            <div className="text-gray-600">Alto</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{riskCounts.medio}</div>
            <div className="text-gray-600">Medio</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{riskCounts.bajo}</div>
            <div className="text-gray-600">Bajo</div>
          </div>
        </div>
      </div>

      {/* Recomendaciones Automáticas */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
        <h3 className="font-bold text-gray-800 mb-3 text-sm">Recomendaciones Automáticas</h3>
        {recommendations.length > 0 ? (
          <div className="space-y-2">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-white p-3 rounded border border-gray-200">
                <span className={`
                  px-2 py-1 rounded text-xs font-bold flex-shrink-0
                  ${rec.priority === 'Alta' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}
                `}>
                  {rec.priority}
                </span>
                <p className="text-xs text-gray-700">{rec.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-600 italic">¡Excelente! No hay recomendaciones críticas. Continúa con las mejores prácticas actuales.</p>
        )}
      </div>
    </div>
  );
}
