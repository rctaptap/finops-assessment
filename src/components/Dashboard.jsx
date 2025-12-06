import React, { useMemo } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const getStatusColor = (status) => {
  const colors = {
    green: { badge: 'bg-green-100 text-green-800', bar: 'bg-green-500' },
    yellow: { badge: 'bg-yellow-100 text-yellow-800', bar: 'bg-yellow-500' },
    red: { badge: 'bg-red-100 text-red-800', bar: 'bg-red-500' }
  };
  return colors[status] || colors.red;
};

const Dashboard = React.memo(({ activeTab, answers, questions }) => {
  const scores = useMemo(() => {
    const categoryScores = {};
    questions.forEach((q) => {
      const answer = answers[q.id];
      if (!categoryScores[q.category]) categoryScores[q.category] = { total: 0, count: 0 };
      
      if (answer === 'yes') categoryScores[q.category].total += 3;
      else if (answer === 'partial') categoryScores[q.category].total += 2;
      else if (answer === 'no') categoryScores[q.category].total += 1;
      
      if (answer) categoryScores[q.category].count += 1;
    });
    return categoryScores;
  }, [answers, questions]);

  const renderAdoptionDashboard = () => {
    const categories = Object.keys(scores).map((cat) => {
      const avg = scores[cat].count > 0 ? scores[cat].total / scores[cat].count : 0;
      const percentage = (avg / 3) * 100;
      let status = 'red';
      if (percentage >= 70) status = 'green';
      else if (percentage >= 40) status = 'yellow';
      
      return { category: cat, percentage: Math.round(percentage), status };
    });

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Madurez FinOps por Capacidad</h3>
        {categories.map((cat) => {
          const colors = getStatusColor(cat.status);
          return (
            <div key={cat.category} className="animate-slide-in">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">{cat.category}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${colors.badge}`}>
                  {cat.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${colors.bar}`}
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderOptimizationDashboard = () => {
    const data = Object.keys(scores).map((cat) => ({
      category: cat,
      score: scores[cat].count > 0 ? Math.round((scores[cat].total / scores[cat].count / 3) * 100) : 0,
    }));

    const barData = data.map(d => ({
      ...d,
      risk: d.score < 50 ? 100 - d.score : 0,
      opportunity: 100 - d.score,
    }));

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800">Análisis de Optimización</h3>
        
        <ResponsiveContainer width="100%" height={250}>
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar name="Score" dataKey="score" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>

        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Riesgos y Oportunidades</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="risk" fill="#EF4444" name="Riesgo" />
              <Bar dataKey="opportunity" fill="#10B981" name="Oportunidad" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderServiceDashboard = () => {
    const answeredCount = Object.keys(answers).length;
    const totalQuestions = questions.length;
    const completionRate = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

    const needs = [];
    questions.forEach((q) => {
      if (answers[q.id] === 'yes' || answers[q.id] === 'Sí') {
        needs.push(q.category);
      }
    });

    const uniqueNeeds = [...new Set(needs)];

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-800">Evaluación de Necesidades</h3>
        
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">
              {Math.round(completionRate)}%
            </div>
            <div className="text-gray-600">Evaluación Completada</div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-3">Áreas Identificadas</h4>
          <div className="space-y-2">
            {uniqueNeeds.length > 0 ? (
              uniqueNeeds.map((need, idx) => (
                <div key={`${need}-${idx}`} className="flex items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-600 mr-3">✓</span>
                  <span className="text-gray-800">{need}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">Responde las preguntas para ver las áreas identificadas</p>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6">
          <h4 className="font-bold mb-2">Recomendación</h4>
          <p className="text-sm">
            {completionRate > 70
              ? 'Basado en tu evaluación, un servicio FinOps gestionado puede ayudarte a alcanzar tus objetivos.'
              : 'Completa la evaluación para recibir una recomendación personalizada.'}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
      {activeTab === 'adoption' && renderAdoptionDashboard()}
      {activeTab === 'optimization' && renderOptimizationDashboard()}
      {activeTab === 'service' && renderServiceDashboard()}
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
