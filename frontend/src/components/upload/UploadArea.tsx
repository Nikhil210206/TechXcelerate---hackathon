import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { ArrowRight, X, CheckCircle, FileText, Upload } from 'lucide-react';

interface UploadAreaProps {
  onComplete?: () => void;
}

const UploadArea = ({ onComplete }: UploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [analysis, setAnalysis] = useState<{ score: number; feedback: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (file: File) => {
    if (file.type !== 'application/pdf' && !file.name.endsWith('.docx')) {
      toast.error('Please upload a PDF or DOCX file');
      return;
    }
    
    setFile(file);
    simulateUpload(file);
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
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const resetUpload = () => {
    setFile(null);
    setProgress(0);
    setAnalysis(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleContinue = () => {
    if (onComplete) {
      onComplete();
    } else {
      window.location.href = '/verify';
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      {!file ? (
        <div 
          className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-muted hover:border-primary/50 hover:bg-muted/30'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileInput}
        >
          <input 
            type="file" 
            className="hidden" 
            onChange={handleFileInput} 
            accept=".pdf,.docx" 
            ref={fileInputRef}
          />
          
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-float">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Upload your resume</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Drag and drop your resume file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports PDF, DOCX (Max 5MB)
              </p>
            </div>
            
            <button className="btn-primary mt-4">
              Select File
            </button>
          </div>
        </div>
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
                    <CheckCircle size={20} />
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
                  <X size={18} />
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
                        <li className="flex items-start gap-2">
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
                          <span>Add more details about your technical skills</span>
                        </li>
                        <li className="flex items-start gap-2">
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
                          <span>Quantify your achievements with metrics</span>
                        </li>
                        <li className="flex items-start gap-2">
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
                          <span>Include keywords relevant to your target role</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-center pt-4">
                <Button 
                  className="btn-primary"
                  onClick={handleContinue}
                >
                  Start Technical Assessment
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadArea;
