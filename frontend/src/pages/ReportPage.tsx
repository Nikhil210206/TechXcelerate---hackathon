
import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/ui/section-heading';
import FinalReport from '@/components/report/FinalReport';

const ReportPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <SectionHeading
          title="Interactive Verification Report"
          subtitle="Your comprehensive verification report with insights and recommendations. Explore it in detail."
          chip="Final Step"
        />
        
        <FinalReport />
      </div>
    </Layout>
  );
};

export default ReportPage;
