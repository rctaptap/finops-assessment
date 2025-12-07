import React from 'react';

export default function Questionnaire({ data, currentIndex, answers, onAnswer, onNext, onPrev, activeTab }) {
  const question = data[currentIndex];
  const selected = answers[question.id] || [];
  const progress = ((currentIndex + 1) / data.length) * 100;
  const isSingleChoice = question.type === 'single';

  const handleCheckboxChange = (option) => {
    if (isSingleChoice) {
      onAnswer(question.id, [option]);
    } else {
      const isNone = option === "Ninguna de las anteriores";
      
      if (isNone) {
        onAnswer(question.id, selected.includes(option) ? [] : [option]);
      } else {
        const newSelected = selected.includes(option)
          ? selected.filter(s => s !== option)
          : [...selected.filter(s => s !== "Ninguna de las anteriores"), option];
        onAnswer(question.id, newSelected);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Pregunta {currentIndex + 1} de {data.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <div className="flex items-start gap-3 mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex-1">
            {question.question}
          </h3>
          {question.tooltip && (
            <div className="group relative">
              <button className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold hover:bg-blue-200 transition-colors">
                ?
              </button>
              <div className="absolute right-0 top-8 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-xl">
                {question.tooltip}
                <div className="absolute -top-2 right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-900"></div>
              </div>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="space-y-2">
          {question.options.map((option, idx) => {
            const optionText = isSingleChoice ? option.text : option;
            const isSelected = isSingleChoice 
              ? selected.some(s => (typeof s === 'object' ? s.text : s) === optionText)
              : selected.includes(option);
            
            return (
              <label 
                key={idx}
                className={`
                  flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                  ${isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }
                `}
              >
                <input
                  type={isSingleChoice ? "radio" : "checkbox"}
                  checked={isSelected}
                  onChange={() => handleCheckboxChange(option)}
                  className="mt-1 mr-3 w-4 h-4 text-blue-600 flex-shrink-0"
                />
                <span className="text-sm text-gray-800">{optionText}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-gray-200">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          ← Anterior
        </button>
        <button
          onClick={onNext}
          disabled={currentIndex === data.length - 1}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
