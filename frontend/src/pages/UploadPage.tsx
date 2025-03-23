
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
      <div className="max-w-7xl mx-auto px-6 py-16">
        <SectionHeading
          title="Upload Your Resume"
          subtitle="Upload your resume and let our AI-powered system analyze it for completeness, quality, and format."
          chip="Step 1"
        />
        
        <UploadArea onComplete={handleStartAssessment} />
      </div>
    </Layout>
  );
};

export default UploadPage;
