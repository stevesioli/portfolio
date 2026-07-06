import { ArrowDownIcon } from 'lucide-react';
import { Button } from '@resume/ui';

export function CtaButtons({ className }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className ?? ''}`}>
      <Button asChild size="lg">
        <a href="#experience">
          View experience
          <ArrowDownIcon className="size-4" />
        </a>
      </Button>
      <Button asChild variant="outline" size="lg">
        <a href="#contact">Get in touch</a>
      </Button>
    </div>
  );
}
