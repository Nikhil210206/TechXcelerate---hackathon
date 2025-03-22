
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <h1 className="text-5xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center"
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
              className="mr-2"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Return to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
