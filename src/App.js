import React, { useState } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Questionnaire from './components/Questionnaire';
import Dashboard from './components/Dashboard';
import Recommendations from './components/Recommendations';
import wellArchitectedCost from './data/wellArchitectedCost';
import finopsAdoption from './data/finopsAdoption';
import finopsRequirement from './data/finopsRequirement';

function App() {
  const [activeTab, setActiveTab] = useState('requirement');
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const getData = () => {
    if (activeTab === 'optimization') return wellArchitectedCost;
    if (activeTab === 'adoption') return finopsAdoption;
    return finopsRequirement;
  };

  const data = getData();

  const handleAnswer = (questionId, selected) => {
    setAnswers(prev => ({ ...prev, [questionId]: selected }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Questionnaire
              data={data}
              activeTab={activeTab}
              currentIndex={currentQuestionIndex}
              answers={answers}
              onAnswer={handleAnswer}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          </div>
          
          <div className="space-y-6">
            <Dashboard
              data={data}
              activeTab={activeTab}
              answers={answers}
            />
            {activeTab !== 'requirement' && (
              <Recommendations
                data={data}
                activeTab={activeTab}
                answers={answers}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
