import { Separator } from '@resume/ui';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/60 border-t">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Separator className="mb-8" />
        <div className="text-muted-foreground flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Steve Sioli. All rights reserved.</p>
          <p className="font-mono text-xs">
            React 19 &middot; Vite &middot; Module Federation &middot; Tailwind CSS &middot; shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
}
