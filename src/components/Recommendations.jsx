import React, { useMemo, useCallback } from 'react';

const priorityColors = {
  high: 'border-red-500 bg-red-50',
  medium: 'border-yellow-500 bg-yellow-50',
  low: 'border-blue-500 bg-blue-50',
};

const priorityLabels = {
  high: { text: 'Alta Prioridad', color: 'text-red-700' },
  medium: { text: 'Prioridad Media', color: 'text-yellow-700' },
  low: { text: 'Prioridad Baja', color: 'text-blue-700' },
};

const Recommendations = React.memo(({ activeTab, answers, questions }) => {
  const handlePrint = useCallback(() => window.print(), []);
  
  const recommendations = useMemo(() => {
    const recs = [];
    
    if (activeTab === 'adoption') {
      const noAnswers = questions.filter(q => answers[q.id] === 'no' || answers[q.id] === 'unknown');
      
      if (noAnswers.some(q => q.category === 'Inform')) {
        recs.push({
          priority: 'high',
          title: 'Implementar Visibilidad de Costos',
          description: 'Establece dashboards y reportes de costos en tiempo real para todos los stakeholders.',
          action: 'Implementar herramientas de Cost Management y configurar alertas.'
        });
      }
      
      if (noAnswers.some(q => q.category === 'Optimize')) {
        recs.push({
          priority: 'high',
          title: 'Iniciar Programa de Optimización',
          description: 'Identifica y elimina recursos no utilizados, implementa rightsizing y considera Reserved Instances.',
          action: 'Realizar auditoría de recursos y crear plan de optimización.'
        });
      }
      
      if (noAnswers.some(q => q.category === 'Operate')) {
        recs.push({
          priority: 'medium',
          title: 'Establecer Práctica FinOps',
          description: 'Define roles, responsabilidades y procesos para gestión continua de costos.',
          action: 'Crear equipo FinOps y establecer reuniones periódicas de revisión.'
        });
      }
      
      if (noAnswers.some(q => q.category === 'Culture')) {
        recs.push({
          priority: 'medium',
          title: 'Desarrollar Cultura FinOps',
          description: 'Capacita a los equipos sobre el impacto de costos y fomenta la responsabilidad compartida.',
          action: 'Organizar workshops y compartir métricas de costos con todos los equipos.'
        });
      }
    }
    
    if (activeTab === 'optimization') {
      const lowScores = questions.filter(q => answers[q.id] === 'no');
      
      if (lowScores.some(q => q.category === 'Compute')) {
        recs.push({
          priority: 'high',
          title: 'Optimizar Recursos de Compute',
          description: 'Implementa auto-scaling, utiliza instancias Spot y revisa el sizing de instancias.',
          action: 'Analizar utilización de CPU/memoria y ajustar tamaños de instancias.'
        });
      }
      
      if (lowScores.some(q => q.category === 'Storage')) {
        recs.push({
          priority: 'high',
          title: 'Optimizar Almacenamiento',
          description: 'Implementa políticas de lifecycle, elimina snapshots antiguos y usa storage tiers apropiados.',
          action: 'Auditar volúmenes, snapshots y configurar lifecycle policies.'
        });
      }
      
      if (lowScores.some(q => q.category === 'Commitment')) {
        recs.push({
          priority: 'medium',
          title: 'Evaluar Compromisos de Ahorro',
          description: 'Analiza patrones de uso para implementar Reserved Instances o Savings Plans.',
          action: 'Revisar utilización histórica y calcular ROI de compromisos.'
        });
      }
      
      recs.push({
        priority: 'low',
        title: 'Monitoreo Continuo',
        description: 'Establece revisiones periódicas de optimización y automatiza recomendaciones.',
        action: 'Configurar alertas y dashboards de optimización.'
      });
    }
    
    if (activeTab === 'service') {
      const yesAnswers = questions.filter(q => answers[q.id] === 'yes' || answers[q.id] === 'Sí');
      const spendingQuestion = questions.find(q => q.id === 1);
      const spendingAnswer = spendingQuestion ? answers[spendingQuestion.id] : null;
      
      if (yesAnswers.length > 5) {
        recs.push({
          priority: 'high',
          title: 'Servicio FinOps Gestionado Recomendado',
          description: 'Tu organización se beneficiaría de un servicio completo de FinOps gestionado.',
          action: 'Agendar consulta para diseñar solución personalizada.'
        });
      }
      
      if (spendingAnswer && (spendingAnswer === '<$10K' || spendingAnswer === '$10K-$50K')) {
        recs.push({
          priority: 'medium',
          title: 'Consultoría FinOps',
          description: 'Para tu nivel de gasto, una consultoría inicial puede establecer las bases.',
          action: 'Iniciar con assessment detallado y roadmap de implementación.'
        });
      }
      
      if (spendingAnswer && (spendingAnswer === '$50K-$200K' || spendingAnswer === '>$200K')) {
        recs.push({
          priority: 'high',
          title: 'Programa FinOps Completo',
          description: 'Tu gasto justifica un programa completo con herramientas y equipo dedicado.',
          action: 'Implementar plataforma FinOps y establecer centro de excelencia.'
        });
      }
      
      recs.push({
        priority: 'medium',
        title: 'Quick Wins',
        description: 'Identifica oportunidades de ahorro inmediato mientras estableces la práctica FinOps.',
        action: 'Realizar análisis de quick wins y ejecutar optimizaciones rápidas.'
      });
    }
    
    return recs.length > 0 ? recs : [{
      priority: 'low',
      title: 'Completa el Assessment',
      description: 'Responde más preguntas para recibir recomendaciones personalizadas.',
      action: 'Continúa respondiendo el cuestionario.'
    }];
  }, [activeTab, answers, questions]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800">Recomendaciones</h3>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-semibold"
        >
          📄 Exportar PDF
        </button>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <div
            key={`${rec.title}-${idx}`}
            className={`border-l-4 p-4 rounded-r-lg ${priorityColors[rec.priority]} animate-slide-in`}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-gray-800">{rec.title}</h4>
              <span className={`text-xs font-semibold ${priorityLabels[rec.priority].color}`}>
                {priorityLabels[rec.priority].text}
              </span>
            </div>
            <p className="text-gray-700 text-sm mb-3">{rec.description}</p>
            <div className="bg-white bg-opacity-60 rounded p-3 border border-gray-200">
              <span className="text-xs font-semibold text-gray-600">Acción recomendada:</span>
              <p className="text-sm text-gray-800 mt-1">{rec.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

Recommendations.displayName = 'Recommendations';

export default Recommendations;
