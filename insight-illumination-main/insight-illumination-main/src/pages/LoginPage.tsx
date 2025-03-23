
import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import UserAuth from '@/components/auth/UserAuth';
import { useAuth } from '@/context/AuthContext';
import SectionHeading from '@/components/ui/section-heading';

const LoginPage = () => {
  const { user, isAuthenticated, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the path they were trying to access, defaulting to dashboard
  const from = location.state?.from?.pathname || '/dashboard';

  const handleAuthSuccess = (userData: any) => {
    login(userData);
    // Redirect them to where they were trying to go or dashboard
    navigate(from, { replace: true });
  };

  if (isAuthenticated) {
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
          <UserAuth onAuthSuccess={handleAuthSuccess} />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
