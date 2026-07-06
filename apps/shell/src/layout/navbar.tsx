import { useState } from 'react';
import { DownloadIcon, MenuIcon } from 'lucide-react';
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  ThemeToggle,
  cn,
} from '@resume/ui';

import { SITE_SECTIONS } from './sections';
import { useScrollSpy } from './use-scroll-spy';

const SECTION_IDS = SITE_SECTIONS.map((section) => section.id);

function NavLinks({ activeId, onNavigate }: { activeId: string; onNavigate?: () => void }) {
  return (
    <>
      {SITE_SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={onNavigate}
          className={cn(
            'text-sm font-medium transition-colors',
            activeId === section.id
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {section.label}
        </a>
      ))}
    </>
  );
}

export function Navbar() {
  const activeId = useScrollSpy(SECTION_IDS);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-border/60 bg-background/80 fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#summary" className="flex flex-col leading-none">
          <span className="font-serif text-base font-semibold tracking-tight">Steve Sioli</span>
          <span className="text-muted-foreground text-[11px] tracking-wide uppercase">
            Staff Frontend Engineer
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          <NavLinks activeId={activeId} />
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button asChild size="sm">
            <a href="/resume/steve-sioli-resume.pdf" download>
              <DownloadIcon className="size-4" />
              Résumé
            </a>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                <MenuIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Navigate</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-5 px-4">
                <NavLinks activeId={activeId} onNavigate={() => setMobileOpen(false)} />
              </nav>
              <div className="mt-auto px-4 pb-4">
                <Button asChild className="w-full">
                  <a href="/resume/steve-sioli-resume.pdf" download>
                    <DownloadIcon className="size-4" />
                    Download résumé
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
