
import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import SkillsPieChart3D from './SkillsPieChart3D';

interface SkillsChartProps {
  skills: {
    name: string;
    value: number;
    color: string;
  }[];
}

const SkillsChart = ({ skills }: SkillsChartProps) => {
  const [view, setView] = useState<'2d' | '3d'>('2d');

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="bg-secondary rounded-lg p-0.5 inline-flex">
          <button 
            className={`text-xs px-4 py-1.5 rounded-md ${view === '2d' ? 'bg-white shadow-sm' : 'text-muted-foreground'}`}
            onClick={() => setView('2d')}
          >
            2D Chart
          </button>
          <button 
            className={`text-xs px-4 py-1.5 rounded-md ${view === '3d' ? 'bg-white shadow-sm' : 'text-muted-foreground'}`}
            onClick={() => setView('3d')}
          >
            3D Chart
          </button>
        </div>
      </div>

      {view === '2d' ? (
        <div className="w-full h-64 md:h-80">
          <ChartContainer 
            className="h-full"
            config={{
              skill: { color: "#2196F3" }
            }}
          >
            <BarChart data={skills} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} domain={[0, 100]} />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" name="Skill Level" radius={[4, 4, 0, 0]}>
                {skills.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden shadow-sm">
          <SkillsPieChart3D skills={skills} />
        </div>
      )}
    </div>
  );
};

export default SkillsChart;
