
import React from 'react';
import Layout from '@/components/layout/Layout';
import UserAuth from '@/components/auth/UserAuth';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import SectionHeading from '@/components/ui/section-heading';

const LoginPage = () => {
  const { user, login } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <SectionHeading
          title="Account Access"
          subtitle="Sign in to your account to continue your verification journey."
          chip="Authentication"
        />
        
        <div className="max-w-md mx-auto mt-8">
          <UserAuth onAuthSuccess={login} />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
