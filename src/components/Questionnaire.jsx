import React, { memo } from 'react';
import { defaultAnswerOptions } from '../data/questions';

const Questionnaire = memo(({ questions, currentIndex, answers, onAnswer, onNext, onPrev }) => {
  const question = questions[currentIndex];
  
  if (!question) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-600">Pregunta no disponible</p>
      </div>
    );
  }
  
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 animate-fade-in">
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Pregunta {currentIndex + 1} de {questions.length}</span>
          <span>{Math.round(progress)}% completado</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mb-8 animate-slide-in">
        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-3">
          {question.category}
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.type === 'select' && question.options ? (
            question.options.map((option) => (
              <button
                key={option}
                onClick={() => onAnswer(question.id, option)}
                className={`
                  w-full p-4 text-left rounded-lg border-2 transition-all duration-200
                  ${answers[question.id] === option
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }
                `}
              >
                {option}
              </button>
            ))
          ) : (
            defaultAnswerOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onAnswer(question.id, option.value)}
                className={`
                  w-full p-4 text-left rounded-lg border-2 transition-all duration-200 flex items-center justify-between
                  ${answers[question.id] === option.value
                    ? 'border-blue-600 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }
                `}
              >
                <span className="font-medium">{option.label}</span>
                {answers[question.id] === option.value && (
                  <span className="text-blue-600">✓</span>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`
            px-6 py-3 rounded-lg font-semibold transition-all duration-200
            ${currentIndex === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          ← Anterior
        </button>
        
        <button
          onClick={onNext}
          disabled={currentIndex === questions.length - 1}
          className={`
            px-6 py-3 rounded-lg font-semibold transition-all duration-200
            ${currentIndex === questions.length - 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }
          `}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
});

Questionnaire.displayName = 'Questionnaire';

export default Questionnaire;
