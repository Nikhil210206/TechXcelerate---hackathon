import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/ui/section-heading';
import ProctorControls from '@/components/assessment/ProctorControls';
import ChatAssessment from '@/components/assessment/ChatAssessment';
import CodeEditor from '@/components/assessment/CodeEditor';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CheckCircle, ArrowRight } from 'lucide-react';
import '../styles/assessment.css';

const AssessmentPage = () => {
  const [proctorReady, setProctorReady] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const navigate = useNavigate();
  
  const handleComplete = () => {
    toast.success("Assessment completed successfully!");
    setAssessmentCompleted(true);
  };
  
  const handleContinue = () => {
    navigate('/verify');
  };
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <SectionHeading
          title="Technical Assessment"
          subtitle="Answer questions and complete coding challenges to verify your skills."
          chip="Step 2"
        />
        
        {!proctorReady ? (
          <div className="max-w-3xl mx-auto mt-8">
            <div className="glass-card p-8 rounded-xl text-center">
              <h3 className="text-xl font-semibold mb-4">Proctoring Setup Required</h3>
              <p className="text-muted-foreground mb-8">
                To ensure test integrity, this assessment requires camera and microphone access.
                Your session will be monitored for audio, lip movement, and head position.
              </p>
              
              <ProctorControls onReady={() => setProctorReady(true)} />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto mt-8">
            {!assessmentCompleted ? (
              <>
                <div className="flex items-start">
                  <div className="w-full">
                    <Tabs 
                      defaultValue="chat" 
                      className="w-full"
                      onValueChange={setActiveTab}
                      value={activeTab}
                    >
                      <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="chat">Technical Questions</TabsTrigger>
                        <TabsTrigger value="code">Coding Challenges</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="chat" className="mt-0">
                        <ChatAssessment onComplete={() => setActiveTab("code")} />
                      </TabsContent>
                      
                      <TabsContent value="code" className="mt-0">
                        <CodeEditor onComplete={handleComplete} />
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
                
                <div className="fixed bottom-4 right-4">
                  <div className="bg-black/10 backdrop-blur-lg p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium">Proctoring Active</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="glass-card p-8 rounded-xl text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                
                <h3 className="text-2xl font-bold mt-6 mb-2">
                  Assessment Completed!
                </h3>
                <p className="text-muted-foreground mb-8">
                  Thank you for completing the technical assessment. Your results have been saved.
                </p>
                
                <Button onClick={handleContinue}>
                  Continue to Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AssessmentPage;
