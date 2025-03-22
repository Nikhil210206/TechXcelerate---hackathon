
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/ui/section-heading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, UploadCloud, FileCheck, UserCheck, FileText } from 'lucide-react';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  
  // For demo purposes, we'll simulate that the user has completed the first step
  const steps = [
    { id: 'upload', name: 'Resume Upload', path: '/upload', completed: true, icon: UploadCloud },
    { id: 'verify', name: 'Skill Verification', path: '/verify', completed: false, icon: FileCheck },
    { id: 'background', name: 'Background Check', path: '/background', completed: false, icon: UserCheck },
    { id: 'report', name: 'Final Report', path: '/report', completed: false, icon: FileText }
  ];

  // Find the current step (first incomplete step)
  const currentStepIndex = steps.findIndex(step => !step.completed);
  const currentStep = currentStepIndex !== -1 ? steps[currentStepIndex] : steps[steps.length - 1];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <SectionHeading
            title={`Welcome, ${user?.name || 'User'}`}
            subtitle="Track your verification progress and complete the remaining steps."
            chip="Dashboard"
          />
          
          <Button variant="outline" onClick={logout}>
            Sign Out
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Verification Progress</CardTitle>
                <CardDescription>Complete all steps to receive your final verification report</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="relative">
                    <div className="absolute left-5 top-0 h-full w-px bg-muted"></div>
                    
                    {steps.map((step, index) => (
                      <div key={step.id} className="relative mb-8 last:mb-0">
                        <div className="flex items-start">
                          <div className="absolute left-0 rounded-full flex items-center justify-center w-10 h-10 bg-background border">
                            {step.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-primary" />
                            ) : index === currentStepIndex ? (
                              <div className="w-3 h-3 bg-primary rounded-full" />
                            ) : (
                              <Circle className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                          
                          <div className="ml-16">
                            <h3 className="text-lg font-medium">{step.name}</h3>
                            <p className="text-muted-foreground mt-1">
                              {step.completed 
                                ? 'Completed' 
                                : index === currentStepIndex 
                                  ? 'Current step' 
                                  : 'Not started'}
                            </p>
                            
                            {(step.completed || index === currentStepIndex) && (
                              <Button asChild variant={index === currentStepIndex ? "default" : "outline"} className="mt-3">
                                <Link to={step.path}>
                                  {index === currentStepIndex ? 'Continue' : 'Review'}
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Current Step</CardTitle>
                <CardDescription>
                  {currentStepIndex === steps.length - 1 && steps[steps.length - 1].completed 
                    ? "All steps completed!" 
                    : `Step ${currentStepIndex + 1} of ${steps.length}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-4">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                    <currentStep.icon className="h-10 w-10 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold">{currentStep.name}</h3>
                  
                  <p className="text-muted-foreground mt-2 mb-6">
                    {currentStep.id === 'upload' && "Upload your resume for AI analysis"}
                    {currentStep.id === 'verify' && "Verify your skills through interactive questions"}
                    {currentStep.id === 'background' && "Complete your background information"}
                    {currentStep.id === 'report' && "View your final verification report"}
                  </p>
                  
                  <Button asChild className="w-full">
                    <Link to={currentStep.path}>
                      {currentStep.completed ? 'Review' : 'Continue'}
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
