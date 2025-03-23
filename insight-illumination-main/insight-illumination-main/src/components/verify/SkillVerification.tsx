
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: number;
}

const SkillVerification = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  const questions: Question[] = [
    {
      id: 1,
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["String", "Boolean", "Character", "Number"],
      answer: 2
    },
    {
      id: 2,
      question: "In React, what function is used to update state variables?",
      options: ["modifyState()", "this.state()", "useState()", "setState()"],
      answer: 3
    },
    {
      id: 3,
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets", 
        "Creative Style System", 
        "Cascading Style Sheets", 
        "Colorful Style Sheets"
      ],
      answer: 2
    }
  ];
  
  const handleAnswer = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 500);
    }
  };
  
  const getScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        score++;
      }
    });
    return (score / questions.length) * 100;
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="glass-card p-8 rounded-xl">
        {!showResults ? (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <span className="chip">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-6">
                {questions[currentQuestion].question}
              </h3>
              
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 border ${
                      answers[currentQuestion] === index 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white hover:bg-muted/50 border-muted'
                    }`}
                    onClick={() => handleAnswer(index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                        answers[currentQuestion] === index 
                          ? 'bg-white text-primary' 
                          : 'bg-muted/50 text-foreground/70'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Skill Verification Complete!
              </h3>
              <p className="text-muted-foreground">
                You scored {getScore().toFixed(0)}% on the JavaScript & React assessment.
              </p>
            </div>
            
            <div className="pt-4">
              <div className="max-w-md mx-auto p-6 bg-secondary rounded-xl">
                <h4 className="text-lg font-semibold mb-4">Skill Assessment Summary</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>JavaScript</span>
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">Good</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>React</span>
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">Excellent</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>CSS</span>
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: '60%' }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">Average</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center pt-6">
              <Link 
                to="/background"
                className="btn-primary"
              >
                Continue to Background Check
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="ml-2"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillVerification;
