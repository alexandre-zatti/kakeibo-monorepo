import { Heading } from '@/components/heading';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { cn } from '@/lib/utils';

interface PageProps {
  title: string;
}

export function PageHeader({ title }: PageProps) {
  return (
    <div className={cn('flex flex-col gap-8 mt-4 mb-4')}>
      <Breadcrumbs />
      <Heading level={1} spacing={'none'}>
        {title}
      </Heading>
    </div>
  );
}
