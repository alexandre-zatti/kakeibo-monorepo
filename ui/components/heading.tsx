import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import React, { JSX } from 'react';

const headingVariants = cva(
  'text-foreground scroll-m-20', // base styles
  {
    variants: {
      level: {
        1: 'text-4xl font-bold tracking-tight lg:text-5xl border-b pb-2',
        2: 'text-3xl font-semibold tracking-tight',
        3: 'text-2xl font-semibold tracking-tight',
        4: 'text-xl font-semibold tracking-tight',
      },
      spacing: {
        default: 'mb-4 mt-8',
        none: '',
        sm: 'mb-2 mt-4',
        lg: 'mb-6 mt-12',
      },
    },
    defaultVariants: {
      level: 1,
      spacing: 'default',
    },
  },
);

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 1, spacing, as, children, ...props }, ref) => {
    const Component =
      as ??
      (`h${level}` as keyof JSX.IntrinsicElements &
        ('h1' | 'h2' | 'h3' | 'h4'));

    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ level, spacing, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Heading.displayName = 'Heading';

export { Heading, headingVariants };
