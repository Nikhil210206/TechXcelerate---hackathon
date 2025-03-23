import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import UploadCard from './UploadCard';
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import * as pdfjsLib from 'pdfjs-dist';

// Set worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const UploadArea = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<{ score: number; feedback: string } | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);
  const [extractingText, setExtractingText] = useState(false);
  
  const handleFileUpload = async (uploadedFile: File | null) => {
    if (uploadedFile) {
      try {
        setFile(uploadedFile);
        setAnalyzed(false);
        setScore(0);
        setFeedback([]);
        setSummary("");
        
        if (uploadedFile.type === 'application/pdf') {
          await extractTextFromFile(uploadedFile);
        } else {
          simulateUpload(uploadedFile);
        }
      } catch (error) {
        console.error('Error handling file upload:', error);
        toast.error('Failed to process the file. Please try again.');
        resetUpload();
      }
    } else {
      resetUpload();
    }
  };
  
  const simulateUpload = (file: File) => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setAnalysis({
              score: 85,
              feedback: 'Your resume is 85% complete. Adding more details about your technical skills could improve it further.'
            });
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };
  
  const resetUpload = () => {
    setFile(null);
    setProgress(0);
    setAnalysis(null);
    setAnalyzed(false);
    setScore(0);
    setFeedback([]);
    setSummary("");
    setShowSummaryDialog(false);
    setExtractingText(false);
    setAnalyzing(false);
  };

  const extractTextFromFile = async (file: File) => {
    setExtractingText(true);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      
      // Load the PDF document with error handling
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      if (!pdf || pdf.numPages === 0) {
        throw new Error('Invalid PDF file');
      }
      
      let extractedText = '';
      
      // Show progress toast
      const loadingToast = toast.loading('Extracting text from PDF...', {
        duration: Infinity,
      });
      
      // Extract text from each page with progress tracking
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const textItems = textContent.items.map((item: any) => item.str);
        extractedText += textItems.join(' ') + '\n\n';
        
        // Update progress
        const progress = Math.round((i / pdf.numPages) * 100);
        toast.loading(`Extracting text from PDF... ${progress}%`, {
          id: loadingToast,
          duration: Infinity,
        });
      }
      
      // Update state and show success
      setSummary(extractedText);
      setShowSummaryDialog(true);
      toast.dismiss(loadingToast);
      toast.success('Text extracted successfully', {
        description: "We've extracted the text from your resume.",
      });
      
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      toast.dismiss();
      toast.error('Failed to extract text', {
        description: "There was an error processing your PDF. Please try again with another file.",
      });
      resetUpload();
    } finally {
      setExtractingText(false);
    }
  };

  const analyzeResume = () => {
    if (!file || !summary) {
      toast.error('No content to analyze');
      return;
    }
    
    setAnalyzing(true);
    toast.loading('Analyzing your resume...', {
      duration: Infinity,
    });
    
    // Simulate analysis
    setTimeout(() => {
      try {
        const summaryLength = summary.length;
        let mockScore = 65;
        
        // Basic content analysis
        if (summaryLength > 1000) mockScore += 10;
        if (summary.toLowerCase().includes('experience')) mockScore += 5;
        if (summary.toLowerCase().includes('education')) mockScore += 5;
        if (summary.toLowerCase().includes('skills')) mockScore += 5;
        if (summary.toLowerCase().includes('project')) mockScore += 5;
        if (summary.toLowerCase().includes('achievement')) mockScore += 5;

        // Generate feedback based on content
        const mockFeedback = [
          'Add more details about your technical skills and proficiency levels',
          'Quantify your achievements with specific metrics and numbers',
          'Include relevant keywords from the job descriptions you\'re targeting',
        ];

        // Add conditional feedback
        if (!summary.toLowerCase().includes('education')) {
          mockFeedback.push('Add your educational background and qualifications');
        }
        if (!summary.toLowerCase().includes('experience')) {
          mockFeedback.push('Include your work experience with detailed responsibilities');
        }
        if (summaryLength < 1000) {
          mockFeedback.push('Expand your resume content to provide more detailed information');
        }

        setScore(mockScore);
        setFeedback(mockFeedback);
        setAnalysis({
          score: mockScore,
          feedback: `Your resume is ${mockScore}% complete. ${mockFeedback[0]}`
        });
        setAnalyzing(false);
        setAnalyzed(true);
        
        toast.dismiss();
        toast.success('Analysis complete', {
          description: `Your resume scored ${mockScore}/100. Check out our recommendations.`,
        });
      } catch (error) {
        console.error('Error analyzing resume:', error);
        toast.dismiss();
        toast.error('Failed to analyze resume', {
          description: 'An error occurred during analysis. Please try again.',
        });
        setAnalyzing(false);
      }
    }, 2000);
  };

  const handleContinue = () => {
    navigate('/verify');
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      {!file ? (
        <UploadCard
          onFileUpload={handleFileUpload}
          maxSize={5}
          accept="application/pdf,.doc,.docx"
          title="Upload your resume"
          description="Drag and drop your resume file here, or click to browse"
        />
      ) : (
        <div className="glass-card p-8 rounded-xl">
          {progress < 100 ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
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
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={resetUpload}
                  className="text-muted-foreground hover:text-primary transition-colors p-2"
                >
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
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
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
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">
                      Upload complete
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Your resume has been analyzed
                    </p>
                  </div>
                </div>
                
                <button 
                  onClick={resetUpload}
                  className="text-muted-foreground hover:text-primary transition-colors p-2"
                >
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
                  >
                    <path d="M3 2v6h6"></path>
                    <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
                    <path d="M21 22v-6h-6"></path>
                    <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
                  </svg>
                </button>
              </div>
              
              {analysis && (
                <div className="mt-6 p-6 bg-secondary rounded-xl">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-semibold">Resume Analysis</h4>
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                        <svg className="w-8 h-8" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#EEEEEE"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={analysis.score > 90 ? "#4CAF50" : analysis.score > 70 ? "#2196F3" : "#FF9800"}
                            strokeWidth="3"
                            strokeDasharray={`${analysis.score}, 100`}
                            strokeLinecap="round"
                          />
                          <text x="18" y="20.5" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">
                            {analysis.score}%
                          </text>
                        </svg>
                      </div>
                    </div>
                    
                    <p>{analysis.feedback}</p>
                    
                    <div className="pt-4">
                      <h5 className="text-sm font-medium mb-3">Recommended Improvements:</h5>
                      <ul className="space-y-2">
                        {feedback.map((item, index) => (
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
                              className="text-primary mt-0.5"
                            >
                              <polyline points="9 11 12 14 22 4"></polyline>
                              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-center pt-4">
                <Button 
                  className="flex items-center gap-2"
                  onClick={handleContinue}
                >
                  Continue to Skill Verification
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
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      {extractingText && (
        <div className="space-y-4 p-6 bg-card rounded-xl border border-border">
          <h3 className="text-lg font-medium">Extracting resume content...</h3>
          <p className="text-sm text-muted-foreground">
            We're reading your resume to provide personalized analysis.
          </p>
          <Progress value={40} className="mt-4" />
        </div>
      )}

      <Dialog open={showSummaryDialog} onOpenChange={setShowSummaryDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Resume Summary</DialogTitle>
            <DialogDescription>
              We've extracted the following content from your resume:
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <Textarea 
              value={summary} 
              onChange={(e) => setSummary(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowSummaryDialog(false)}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setShowSummaryDialog(false);
                analyzeResume();
                toast.success("Summary saved", {
                  description: "Your resume summary has been updated.",
                });
              }}
            >
              Analyze Resume
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadArea;
