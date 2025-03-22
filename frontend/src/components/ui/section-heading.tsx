
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  chip?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const SectionHeading = ({ 
  title, 
  subtitle, 
  chip, 
  className,
  align = 'center' 
}: SectionHeadingProps) => {
  return (
    <div 
      className={cn(
        "max-w-3xl mb-12 mx-auto",
        {
          'text-center': align === 'center',
          'text-left': align === 'left',
          'text-right': align === 'right',
          'mx-0': align !== 'center'
        },
        className
      )}
    >
      {chip && (
        <span className="chip inline-block mb-3 animate-fade-in">
          {chip}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
