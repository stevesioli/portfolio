import { LinkedinIcon, MailIcon, MapPinIcon } from 'lucide-react';

export function ContactBar({ className }: { className?: string }) {
  return (
    <div
      className={`text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-3 text-sm ${className ?? ''}`}
    >
      <a
        href="mailto:steve.m@sioli.com"
        className="hover:text-foreground flex items-center gap-2 transition-colors"
      >
        <MailIcon className="size-4" />
        steve.m@sioli.com
      </a>
      <a
        href="https://www.linkedin.com/in/steve-sioli"
        target="_blank"
        rel="noreferrer"
        className="hover:text-foreground flex items-center gap-2 transition-colors"
      >
        <LinkedinIcon className="size-4" />
        linkedin.com/in/steve-sioli
      </a>
      <span className="flex items-center gap-2">
        <MapPinIcon className="size-4" />
        Dade City, FL &middot; Remote
      </span>
    </div>
  );
}
