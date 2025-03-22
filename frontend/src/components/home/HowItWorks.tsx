
import React from 'react';
import SectionHeading from '../ui/section-heading';
import { cn } from '@/lib/utils';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Upload Your Resume',
      description: 'Simply upload your resume and let our AI-powered system analyze the document for quality, completeness, and format.',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yMiAyNGgtMjB2LTI0aDIwdjI0em0tMTgtMjJ2MjBoMTZ2LTIwaC0xNnptMTQgM2gtMTJ2LTJoMTJ2MnptMCA0aC0xMnYtMmgxMnYyem0wIDRoLTEydi0yaDEydjJ6bS02IDVoLTZsOC04IDYgNi00IDR6Ii8+PC9zdmc+',
      delay: '0',
      imageBg: 'bg-blue-100'
    },
    {
      number: '02',
      title: 'Verify Your Skills',
      description: 'Complete personalized skill assessments tailored to your experience level with our interactive verification system.',
      image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNvZGUiPjxwb2x5bGluZSBwb2ludHM9IjE2IDEwIDEyIDYgOCAxMCI+PC9wb2x5bGluZT48cG9seWxpbmUgcG9pbnRzPSI4IDE0IDEyIDE4IDE2IDE0Ij48L3BvbHlsaW5lPjwvc3ZnPg==',
      delay: '150',
      imageBg: 'bg-green-100'
    },
    {
      number: '03',
      title: 'Background Check',
      description: 'Explore your professional history in our immersive 3D timeline, with AI-powered insights highlighting key achievements.',
      image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZWNrLWNpcmNsZSI+PHBhdGggZD0iTTIyIDExLjA4VjEyYTEwIDEwIDAgMSAxLTUuOTMtOS4xNCI+PC9wYXRoPjxwb2x5bGluZSBwb2ludHM9IjIyIDQgMTIgMTQuMDEgOSAxMS4wMSI+PC9wb2x5bGluZT48L3N2Zz4=',
      delay: '300',
      imageBg: 'bg-purple-100'
    },
    {
      number: '04',
      title: 'Get Your Report',
      description: 'Receive a comprehensive verification report with actionable recommendations and visual presentations of findings.',
      image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbGUtdGV4dCI+PHBhdGggZD0iTTE0IDJINmEyIDIgMCAwIDAtMiAydjE2YTIgMiAwIDAgMCAyIDJoMTJhMiAyIDAgMCAwIDItMlY4eiI+PC9wYXRoPjxwb2x5bGluZSBwb2ludHM9IjE0IDIgMTQgOCAyMCA4Ij48L3BvbHlsaW5lPjxsaW5lIHgxPSIxNiIgeTE9IjEzIiB4Mj0iOCIgeTI9IjEzIj48L2xpbmU+PGxpbmUgeDE9IjE2IiB5MT0iMTciIHgyPSI4IiB5Mj0iMTciPjwvbGluZT48cG9seWxpbmUgcG9pbnRzPSIxMCA5IDkgOSA4IDkiPjwvcG9seWxpbmU+PC9zdmc+',
      delay: '450',
      imageBg: 'bg-orange-100'
    }
  ];

  return (
    <section className="py-16 md:py-24" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="How It Works"
          subtitle="Our platform simplifies the resume verification process into four easy steps, providing a seamless experience from upload to final report."
          chip="Simple Process"
        />
        
        <div className="mt-16 space-y-16 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative group"
              style={{ animationDelay: `${step.delay}ms` }}
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center",
                  step.imageBg,
                  "transition-all duration-300 group-hover:shadow-md"
                )}>
                  <img src={step.image} alt={step.title} className="w-8 h-8" />
                </div>
                
                <div>
                  <span className="text-sm font-medium text-primary block mb-2">
                    {step.number}
                  </span>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-muted transform -translate-x-1/2">
                  <div className="absolute right-0 w-2 h-2 rounded-full bg-primary -translate-y-0.5"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
