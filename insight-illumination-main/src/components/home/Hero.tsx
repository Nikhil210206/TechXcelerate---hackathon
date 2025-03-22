
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Hero = () => {
  const blobRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!blobRef.current) return;
      
      const { clientX, clientY } = e;
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;
      
      // Limit the movement range
      const moveX = 30 * (x - 0.5);
      const moveY = 30 * (y - 0.5);
      
      blobRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-24">
      {/* Background blur elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[80px] opacity-70" />
      <div ref={blobRef} className="absolute bottom-[-15%] left-[-5%] w-[35%] h-[35%] bg-blue-300/20 rounded-full blur-[60px] opacity-70 transition-transform duration-300 ease-out" />
      
      <div className="relative max-w-7xl mx-auto px-6 pt-12 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-8 max-w-2xl">
              <div className="space-y-5">
                <span className="chip inline-block animate-fade-in">
                  Smart Resume Verification
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none">
                  <span className="text-gradient">Simplify</span> your resume verification process
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our AI-powered platform streamlines resume verification, skill assessment, and background checks with a beautiful and intuitive experience.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/upload"
                  className="btn-primary flex items-center justify-center group"
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
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
                <Link 
                  to="#how-it-works"
                  className="btn-secondary flex items-center justify-center"
                >
                  Learn More
                </Link>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-3">Trusted by forward-thinking companies</p>
                <div className="flex flex-wrap gap-8 items-center">
                  {['Company 1', 'Company 2', 'Company 3'].map((company) => (
                    <div key={company} className="text-muted-foreground/50 font-medium">
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md animate-float">
              <div className="glass-card overflow-hidden shadow-xl p-6 rounded-2xl backdrop-blur-lg border border-white/20 bg-gradient-to-br from-white/80 to-white/30">
                <div className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="flex-1"></div>
                    <span className="text-xs text-muted-foreground">Resume Analysis</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-8 bg-gray-100 rounded-md w-3/4 animate-pulse"></div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="h-20 bg-gray-100 rounded-md col-span-1 animate-pulse"></div>
                      <div className="h-20 bg-primary/10 rounded-md col-span-3 animate-pulse"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-100 rounded-md w-full animate-pulse"></div>
                      <div className="h-4 bg-gray-100 rounded-md w-5/6 animate-pulse"></div>
                      <div className="h-4 bg-gray-100 rounded-md w-4/6 animate-pulse"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-10 bg-primary rounded-md w-1/3 animate-pulse"></div>
                      <div className="h-8 w-8 bg-gray-100 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary to-blue-400 rounded-full blur-2xl opacity-20"></div>
              <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
