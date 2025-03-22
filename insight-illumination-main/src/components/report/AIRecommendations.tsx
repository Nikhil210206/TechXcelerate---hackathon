
import React from 'react';

interface Recommendation {
  id: number;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

interface AIRecommendationsProps {
  recommendations: Recommendation[];
}

const AIRecommendations = ({ recommendations }: AIRecommendationsProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">AI-Powered Recommendations</h3>
      <div className="space-y-3">
        {recommendations.map((rec) => (
          <div 
            key={rec.id} 
            className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}
          >
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium">{rec.title}</h4>
              <span 
                className={`text-xs px-2 py-1 rounded-full ${
                  rec.priority === 'high' 
                    ? 'bg-red-200 text-red-800' 
                    : rec.priority === 'medium'
                      ? 'bg-orange-200 text-orange-800'
                      : 'bg-green-200 text-green-800'
                }`}
              >
                {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
              </span>
            </div>
            <p className="text-sm">{rec.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
