
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [scrolled]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="font-semibold text-xl tracking-tight transition-opacity hover:opacity-80"
        >
          resumeVerify<span className="text-primary">.</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" currentPath={currentPath}>Home</NavLink>
          <NavLink to="/upload" currentPath={currentPath}>Upload</NavLink>
          <NavLink to="/verify" currentPath={currentPath}>Verify</NavLink>
          <NavLink to="/background" currentPath={currentPath}>Background</NavLink>
          <NavLink to="/report" currentPath={currentPath}>Report</NavLink>
        </div>
        
        <div className="md:hidden">
          <button className="p-2 transition-colors hover:text-primary">
            <MenuIcon />
          </button>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  currentPath: string;
}

const NavLink = ({ to, children, currentPath }: NavLinkProps) => {
  const isActive = currentPath === to;
  
  return (
    <Link 
      to={to} 
      className={cn(
        "navbar-link font-medium text-sm transition-colors",
        isActive ? "text-primary after:w-full" : "text-foreground/80"
      )}
    >
      {children}
    </Link>
  );
};

const MenuIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="4" x2="20" y1="12" y2="12"></line>
    <line x1="4" x2="20" y1="6" y2="6"></line>
    <line x1="4" x2="20" y1="18" y2="18"></line>
  </svg>
);

export default Navbar;
