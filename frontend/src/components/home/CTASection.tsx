
import React from 'react';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-blue-500 text-white">
          {/* Background blob */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to streamline your verification process?
              </h2>
              <p className="text-white/80 text-lg mb-6">
                Join thousands of forward-thinking companies that trust our platform for accurate, efficient resume verification.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/upload" 
                  className="bg-white text-primary hover:bg-white/90 transition-colors px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center"
                >
                  Get Started
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="ml-2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
                <a 
                  href="#" 
                  className="border border-white/30 text-white hover:bg-white/10 transition-colors px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center"
                >
                  Contact Sales
                </a>
              </div>
            </div>
            
            <div className="hidden md:block w-64 h-64 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="40" 
                        height="40" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
