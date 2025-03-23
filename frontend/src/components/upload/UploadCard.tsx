import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

interface UploadCardProps {
  className?: string;
  onFileUpload?: (file: File) => void;
  maxSize?: number; // in MB
  accept?: string;
  title?: string;
  description?: string;
}

const UploadCard: React.FC<UploadCardProps> = ({
  className,
  onFileUpload,
  maxSize = 5,
  accept = 'application/pdf,.doc,.docx',
  title = 'Upload your resume',
  description = 'Drag and drop your resume here or click to browse'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const validateFile = (file: File): boolean => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return false;
    }
    
    // Check file type
    const fileType = file.type;
    const acceptedTypes = accept.split(',');
    
    if (!acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        // Check file extension
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      // Check mime type
      return fileType === type;
    })) {
      setError('File type not supported');
      return false;
    }
    
    setError(null);
    return true;
  };
  
  const processFile = (file: File) => {
    if (validateFile(file)) {
      setFile(file);
      if (onFileUpload) {
        onFileUpload(file);
      }
    }
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      processFile(droppedFile);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      processFile(selectedFile);
    }
  };
  
  const handleClick = () => {
    const input = document.getElementById('file-upload') as HTMLInputElement;
    if (input) {
      input.click();
    }
  };
  
  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
    if (onFileUpload) {
      onFileUpload(null as unknown as File);
    }
    
    // Reset the input
    const input = document.getElementById('file-upload') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  };
  
  return (
    <div 
      className={cn(
        'rounded-xl border border-dashed p-6 transition-all duration-300',
        isDragging 
          ? 'border-primary bg-primary/5 scale-[1.02]' 
          : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5',
        file ? 'bg-primary/5 border-primary/50' : '',
        error ? 'border-destructive/50 bg-destructive/5' : '',
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={file ? undefined : handleClick}
    >
      <input
        id="file-upload"
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleFileChange}
      />
      
      <div className="flex flex-col items-center justify-center text-center py-4">
        {!file ? (
          <>
            <div className="rounded-full bg-primary/10 p-3 mb-4">
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
                className="text-primary"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            
            <h3 className="text-lg font-medium mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            
            <p className="text-xs text-muted-foreground">
              Supports PDF, DOC, DOCX up to {maxSize}MB
            </p>
          </>
        ) : (
          <>
            <div className="rounded-full bg-primary/10 p-3 mb-4">
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
                className="text-primary"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <line x1="10" y1="9" x2="8" y2="9"></line>
              </svg>
            </div>
            
            <h3 className="text-lg font-medium mb-1">File uploaded</h3>
            <p className="text-sm font-medium text-primary mb-1">
              {file.name}
            </p>
            <p className="text-xs text-muted-foreground mb-4">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
            
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile();
              }}
            >
              Remove file
            </Button>
          </>
        )}
      </div>
      
      {error && (
        <div className="mt-4 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default UploadCard;
