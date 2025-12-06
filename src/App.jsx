import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Questionnaire from './components/Questionnaire';
import Dashboard from './components/Dashboard';
import Recommendations from './components/Recommendations';
import { questionsData } from './data/questions';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/storage';
import { trackEvent } from './utils/analytics';

function App() {
  const [activeTab, setActiveTab] = useState('adoption');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersByTab, setAnswersByTab] = useState(() => {
    const saved = loadFromLocalStorage();
    return saved?.answersByTab || {
      adoption: {},
      optimization: {},
      service: {}
    };
  });

  useEffect(() => {
    saveToLocalStorage({ answersByTab, activeTab, currentIndex });
  }, [answersByTab, activeTab, currentIndex]);

  const questions = useMemo(() => questionsData[activeTab] || [], [activeTab]);
  const answers = answersByTab[activeTab];

  const handleTabChange = useCallback((newTab) => {
    trackEvent('Navigation', 'tab_change', newTab);
    setActiveTab(newTab);
    setCurrentIndex(0);
  }, []);

  const handleAnswer = useCallback((questionId, answer) => {
    trackEvent('Assessment', 'answer_question', `${activeTab}_${questionId}`);
    setAnswersByTab((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], [questionId]: answer }
    }));
  }, [activeTab]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, Math.max(0, questions.length - 1)));
  }, [questions.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={handleTabChange} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            {questions.length > 0 ? (
              <Questionnaire
                questions={questions}
                currentIndex={currentIndex}
                answers={answers}
                onAnswer={handleAnswer}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                <p className="text-gray-600">No hay preguntas disponibles para este assessment.</p>
              </div>
            )}
          </div>

          <div>
            <Dashboard
              activeTab={activeTab}
              answers={answers}
              questions={questions}
            />
          </div>
        </div>

        <div className="mt-8 print-area">
          <Recommendations
            activeTab={activeTab}
            answers={answers}
            questions={questions}
          />
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">© 2024 FinOps Assessment Platform - Optimiza tu Cloud</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
