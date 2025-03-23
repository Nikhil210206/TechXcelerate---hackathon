
import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionHeading from '@/components/ui/section-heading';
import SkillVerification from '@/components/verify/SkillVerification';

const VerifyPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <SectionHeading
          title="Verify Your Skills"
          subtitle="Complete this personalized skill assessment tailored to your experience level."
          chip="Step 2"
        />
        
        <SkillVerification />
      </div>
    </Layout>
  );
};

export default VerifyPage;
