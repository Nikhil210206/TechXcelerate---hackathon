
import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/ui/section-heading';
import Timeline from '@/components/background/Timeline';

const BackgroundPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <SectionHeading
          title="Background Verification"
          subtitle="Explore your professional history and verify the information in your resume."
          chip="Step 3"
        />
        
        <Timeline />
      </div>
    </Layout>
  );
};

export default BackgroundPage;
