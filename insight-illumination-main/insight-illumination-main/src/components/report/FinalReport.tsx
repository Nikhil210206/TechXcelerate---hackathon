
import React, { useState } from 'react';
import { toast } from 'sonner';
import SkillsChart from './SkillsChart';
import AIRecommendations from './AIRecommendations';

const FinalReport = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'recommendations'>('overview');
  
  const handleDownload = () => {
    toast.success("Report downloaded successfully");
  };
  
  const reportSummary = {
    resumeScore: 85,
    skillVerification: 78,
    backgroundCheck: 90,
    overallScore: 84,
    strengths: [
      "Strong technical skills in JavaScript and React",
      "Consistent work history with progressive experience",
      "Well-structured resume with clear accomplishments"
    ],
    improvements: [
      "Add more quantifiable achievements",
      "Expand on specific technical project details",
      "Clarify date discrepancy in earlier work experience"
    ]
  };

  const skillsData = [
    { name: 'JavaScript', value: 85, color: '#4CAF50' },
    { name: 'React', value: 82, color: '#2196F3' },
    { name: 'CSS', value: 68, color: '#9C27B0' },
    { name: 'Node.js', value: 75, color: '#FF9800' },
    { name: 'TypeScript', value: 70, color: '#607D8B' },
  ];

  const recommendations = [
    {
      id: 1,
      title: "Learn Python to expand your tech stack",
      description: "Based on your current skill set and market trends, adding Python to your toolkit would make you more versatile for full-stack roles.",
      priority: 'high' as const
    },
    {
      id: 2,
      title: "Enhance your CSS expertise",
      description: "Your CSS skills are currently rated at 68%. Consider taking a specialized course in advanced CSS and modern layout techniques.",
      priority: 'medium' as const
    },
    {
      id: 3,
      title: "Add more quantifiable achievements to your resume",
      description: "Including metrics and specific outcomes in your work accomplishments will strengthen your resume significantly.",
      priority: 'high' as const
    },
    {
      id: 4,
      title: "Clarify employment dates",
      description: "There's a slight discrepancy in your employment dates at CreativeTech Studio. Updating this will improve your verification score.",
      priority: 'medium' as const
    }
  ];
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-card p-8 rounded-xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-muted pb-6 md:pb-0 md:pr-8">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#EEEEEE"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#2196F3"
                    strokeWidth="3"
                    strokeDasharray={`${reportSummary.overallScore}, 100`}
                    strokeLinecap="round"
                  />
                  <text x="18" y="20.5" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">
                    {reportSummary.overallScore}%
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl font-bold text-primary">
                    {reportSummary.overallScore}%
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">Overall Score</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Based on resume quality, skill verification, and background check
              </p>
              
              <div className="space-y-3">
                <button 
                  className="btn-primary w-full"
                  onClick={handleDownload}
                >
                  Download Report
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </button>
                
                <button 
                  className="btn-secondary w-full"
                  onClick={() => toast.success("AR Report view downloaded. Open in AR viewer app.")}
                >
                  Download AR Version
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
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.29 7 12 12 20.71 7"></polyline>
                    <line x1="12" y1="22" x2="12" y2="12"></line>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="flex border-b border-muted mb-6">
              <button
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'overview' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'skills' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab('skills')}
              >
                Skills Analysis
              </button>
              <button
                className={`px-4 py-2 font-medium text-sm ${activeTab === 'recommendations' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
                onClick={() => setActiveTab('recommendations')}
              >
                AI Recommendations
              </button>
            </div>
            
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Resume Quality</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${reportSummary.resumeScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{reportSummary.resumeScore}%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Skill Verification</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-300"
                          style={{ width: `${reportSummary.skillVerification}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{reportSummary.skillVerification}%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Background Check</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500 transition-all duration-300"
                          style={{ width: `${reportSummary.backgroundCheck}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{reportSummary.backgroundCheck}%</span>
                    </div>
                  </div>
                </div>
                
                <button
                  className="text-primary font-medium text-sm flex items-center"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? 'Hide Details' : 'Show Details'}
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
                    className={`ml-1 transition-transform ${showDetails ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                
                {showDetails && (
                  <div className="space-y-6 pt-2 animate-fade-in">
                    <div>
                      <h4 className="font-semibold mb-3">Key Strengths</h4>
                      <ul className="space-y-2">
                        {reportSummary.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2">
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
                              className="text-green-600 mt-0.5"
                            >
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Areas for Improvement</h4>
                      <ul className="space-y-2">
                        {reportSummary.improvements.map((improvement, index) => (
                          <li key={index} className="flex items-start gap-2">
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
                              className="text-orange-500 mt-0.5"
                            >
                              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                              <line x1="12" y1="9" x2="12" y2="13"></line>
                              <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                <div className="border-t border-muted pt-6 mt-6">
                  <div className="p-4 rounded-lg bg-secondary">
                    <h4 className="font-semibold mb-2">Report Summary</h4>
                    <p className="text-muted-foreground text-sm">
                      Overall, your verification shows strong alignment between your resume, skills, and background. 
                      The minor discrepancy in your work history at CreativeTech Studio should be clarified. 
                      Your technical skills in JavaScript and React are well-verified, with opportunities to strengthen 
                      your CSS expertise. The resume is well-structured but could benefit from more quantifiable achievements.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'skills' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold mb-4">Skills Analysis</h3>
                <p className="text-muted-foreground mb-6">
                  Based on our skill verification process, here's a breakdown of your technical competencies:
                </p>
                
                <SkillsChart skills={skillsData} />
                
                <div className="p-4 rounded-lg bg-secondary mt-4">
                  <h4 className="font-semibold mb-2">Technical Assessment</h4>
                  <p className="text-muted-foreground text-sm">
                    Your JavaScript and React skills are strong, scoring above 80%. Your CSS skills show room for improvement,
                    which aligns with our recommendation to enhance your frontend styling expertise. The Node.js score indicates
                    solid backend knowledge, complementing your frontend skills for full-stack positions.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'recommendations' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold mb-4">AI-Powered Recommendations</h3>
                <p className="text-muted-foreground mb-6">
                  Based on your profile, skills, and current market trends, our AI system has generated
                  these personalized recommendations to help advance your career:
                </p>
                
                <AIRecommendations recommendations={recommendations} />
                
                <div className="p-4 rounded-lg bg-secondary mt-4">
                  <h4 className="font-semibold mb-2">Career Growth Forecast</h4>
                  <p className="text-muted-foreground text-sm">
                    By implementing these recommendations, especially learning Python and enhancing your CSS expertise,
                    you could increase your market value by an estimated 15-20% within 6 months. This would position you
                    well for senior full-stack developer roles.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalReport;
