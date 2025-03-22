
import React from 'react';
import SectionHeading from '../ui/section-heading';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The resume verification platform made our hiring process so much easier. The AI-powered insights are incredibly accurate and save us hours per candidate.",
      author: "Sarah Johnson",
      role: "HR Director",
      company: "TechCorp",
      avatar: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXIiPjxwYXRoIGQ9Ik0xOSAyMXYtMmE0IDQgMCAwIDAtNC00SDlhNCA0IDAgMCAwLTQgNHYyIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48L3N2Zz4="
    },
    {
      quote: "I was skeptical at first, but the skill verification system is impressive. It caught details in candidates' resumes that we would have missed otherwise.",
      author: "Michael Chen",
      role: "Talent Acquisition",
      company: "InnovateCo",
      avatar: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXIiPjxwYXRoIGQ9Ik0xOSAyMXYtMmE0IDQgMCAwIDAtNC00SDlhNCA0IDAgMCAwLTQgNHYyIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48L3N2Zz4="
    },
    {
      quote: "The 3D timeline for background verification is not just visually stunning, but also incredibly practical. It's revolutionized how we review candidate histories.",
      author: "Alex Rodriguez",
      role: "Recruiting Manager",
      company: "FutureTech",
      avatar: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXIiPjxwYXRoIGQ9Ik0xOSAyMXYtMmE0IDQgMCAwIDAtNC00SDlhNCA0IDAgMCAwLTQgNHYyIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48L3N2Zz4="
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-secondary/30">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="What Our Clients Say"
          subtitle="Don't just take our word for it. Here's what hiring professionals have to say about our resume verification platform."
          chip="Testimonials"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="glass-card p-8 group hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <svg className="text-primary h-8 w-8 mb-4" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10.7 25.4c-1.2 0-2.3-0.3-3.4-0.8s-1.9-1.3-2.7-2.2c-0.8-0.9-1.3-2-1.7-3.2s-0.6-2.5-0.6-3.8c0-2.1 0.3-4 1-5.7s1.6-3.2 2.7-4.5c1.2-1.3 2.5-2.3 4-3.1s3.1-1.2 4.7-1.3l0.4 1.8c-1.9 0.5-3.5 1.3-5 2.4s-2.6 2.4-3.5 4c-0.9 1.5-1.4 3.2-1.5 5.1 0.4-0.5 1-0.9 1.7-1.2s1.4-0.4 2.2-0.4c1 0 2 0.2 2.9 0.6s1.6 1 2.2 1.8c0.6 0.8 0.9 1.7 0.9 2.8 0 1.1-0.3 2.1-0.9 2.9s-1.3 1.5-2.3 2c-0.9 0.5-1.9 0.7-3 0.7v0zM24.1 25.4c-1.2 0-2.3-0.3-3.4-0.8s-1.9-1.3-2.7-2.2c-0.8-0.9-1.3-2-1.7-3.2s-0.6-2.5-0.6-3.8c0-2.1 0.3-4 1-5.7s1.6-3.2 2.7-4.5c1.2-1.3 2.5-2.3 4-3.1s3.1-1.2 4.7-1.3l0.4 1.8c-1.9 0.5-3.5 1.3-5 2.4s-2.6 2.4-3.5 4c-0.9 1.5-1.4 3.2-1.5 5.1 0.4-0.5 1-0.9 1.7-1.2s1.4-0.4 2.2-0.4c1 0 2 0.2 2.9 0.6s1.6 1 2.2 1.8c0.6 0.8 0.9 1.7 0.9 2.8 0 1.1-0.3 2.1-0.9 2.9s-1.3 1.5-2.3 2c-0.9 0.5-1.9 0.7-3 0.7v0z"></path>
                  </svg>
                  <p className="italic text-foreground/90">{testimonial.quote}</p>
                </div>
                
                <div className="mt-auto pt-6 border-t border-muted flex items-center">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-4">
                    <img src={testimonial.avatar} alt={testimonial.author} className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
