
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface WorkExperience {
  id: number;
  company: string;
  role: string;
  period: string;
  description: string;
  verified: boolean;
  mismatch?: string;
}

const Timeline = () => {
  const [experiences, setExperiences] = useState<WorkExperience[]>([
    {
      id: 1,
      company: "Tech Innovations Inc.",
      role: "Senior Frontend Developer",
      period: "Jan 2020 - Present",
      description: "Led the development of responsive web applications using React, TypeScript, and modern CSS frameworks.",
      verified: true
    },
    {
      id: 2,
      company: "Digital Solutions Ltd.",
      role: "Web Developer",
      period: "Mar 2018 - Dec 2019",
      description: "Developed and maintained client websites and e-commerce platforms using JavaScript, HTML, and CSS.",
      verified: true
    },
    {
      id: 3,
      company: "CreativeTech Studio",
      role: "Junior Developer",
      period: "Jul 2016 - Feb 2018",
      description: "Assisted in building interactive web experiences and implementing UI designs for various clients.",
      verified: false,
      mismatch: "Duration discrepancy: Resume states Jul 2015 - Feb 2018"
    }
  ]);
  
  const [verificationComplete, setVerificationComplete] = useState(false);
  
  const handleVerifyAll = () => {
    setTimeout(() => {
      setVerificationComplete(true);
    }, 1500);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="glass-card p-8 rounded-xl mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Background Timeline</h3>
          {!verificationComplete && (
            <button 
              className="btn-primary"
              onClick={handleVerifyAll}
            >
              Verify All
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="ml-2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </button>
          )}
        </div>
        
        <div className="relative border-l-2 border-muted pl-8 pb-8 space-y-8">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              <div 
                className={`absolute -left-11 w-5 h-5 rounded-full border-4 ${
                  exp.verified 
                    ? 'border-green-500 bg-green-100' 
                    : 'border-orange-500 bg-orange-100'
                }`}
              ></div>
              
              <div className={`glass-card p-6 transition-all duration-300 ${
                exp.verified ? '' : 'border-orange-200 bg-orange-50/50'
              }`}>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{exp.company}</h4>
                    <p className="text-muted-foreground">{exp.role}</p>
                  </div>
                  <span className="chip">
                    {exp.period}
                  </span>
                </div>
                
                <p className="mb-4">{exp.description}</p>
                
                {exp.verified ? (
                  <div className="flex items-center text-green-600 text-sm">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="mr-1"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Verified
                  </div>
                ) : (
                  <div className="p-3 bg-orange-100/50 border border-orange-200 rounded-lg">
                    <div className="flex items-center text-orange-600 text-sm mb-1">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="mr-1"
                      >
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                      Mismatch Detected
                    </div>
                    <p className="text-sm">{exp.mismatch}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {verificationComplete && (
        <div className="glass-card p-8 rounded-xl text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="28" 
              height="28" 
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
          
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2">
              Background Verification Complete
            </h3>
            <p className="text-muted-foreground">
              Your employment history has been verified with 2 of 3 positions matching perfectly.
            </p>
          </div>
          
          <Link 
            to="/report"
            className="btn-primary"
          >
            View Final Report
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
      )}
    </div>
  );
};

export default Timeline;
