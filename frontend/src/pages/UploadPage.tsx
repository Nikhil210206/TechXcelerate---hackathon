import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/ui/section-heading';
import UploadArea from '@/components/upload/UploadArea';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const navigate = useNavigate();
  
  const handleStartAssessment = () => {
    navigate('/assessment');
  };
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px] -z-10" />
        
<<<<<<< HEAD
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <SectionHeading
            title="Upload Your Resume"
            subtitle="Upload your resume and let our AI-powered system analyze it for completeness, quality, and format."
            chip="Step 1"
          />
          <UploadArea />
        </div>
=======
        <UploadArea onComplete={handleStartAssessment} />
>>>>>>> 1ed424cdefdab67eb97c36e86ac7e3092a196c4c
      </div>
    </Layout>
  );
};

export default UploadPage;
