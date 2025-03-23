import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/ui/section-heading';
import UploadArea from '@/components/upload/UploadArea';

const UploadPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px] -z-10" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
          <SectionHeading
            title="Upload Your Resume"
            subtitle="Upload your resume and let our AI-powered system analyze it for completeness, quality, and format."
            chip="Step 1"
          />
          <UploadArea />
        </div>
      </div>
    </Layout>
  );
};

export default UploadPage;
