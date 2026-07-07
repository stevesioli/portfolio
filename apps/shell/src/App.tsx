import { ThemeProvider } from '@resume/ui';

import {
  ContactSection,
  EducationSection,
  ExperienceSection,
  HeroSection,
  SkillsSection,
} from './federation/remotes';
import { Footer } from './layout/footer';
import { Navbar } from './layout/navbar';
import { RemoteBoundary } from './layout/remote-boundary';
import { Section } from './layout/section';

export function App() {
  return (
    <ThemeProvider>
      <div className="bg-background text-foreground relative min-h-dvh">
        <div
          aria-hidden
          className="from-primary/10 pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-gradient-to-b to-transparent"
        />

        <Navbar />

        <main className="pt-16">
          {/*
            Each top-level section is sticky (pinned just below the fixed
            navbar) with an explicit, opaque background and an increasing
            z-index (see Section.tsx), so as you scroll, each one pins in
            place and the next scrolls up over the top of it rather than
            the usual flush hand-off between sections.
          */}
          <section
            id="summary"
            style={{ zIndex: 0 }}
            className="bg-background [scrollbar-width:none] sticky top-16 h-[calc(100dvh-4rem)] overflow-y-auto scroll-mt-24 [&::-webkit-scrollbar]:hidden"
          >
            <RemoteBoundary label="Summary">
              <HeroSection />
            </RemoteBoundary>
          </section>

          <Section
            id="experience"
            kicker="Career History"
            title="Experience"
            className="bg-background"
            stackIndex={8}
          >
            <RemoteBoundary label="Experience">
              <ExperienceSection />
            </RemoteBoundary>
          </Section>

          <Section
            id="expertise"
            kicker="Core Expertise"
            title="Skills & Leadership"
            className="bg-secondary"
            stackIndex={16}
          >
            <RemoteBoundary label="Skills">
              <SkillsSection />
            </RemoteBoundary>
          </Section>

          <Section
            id="education"
            kicker="Background"
            title="Early Career & Education"
            className="bg-background"
            stackIndex={24}
          >
            <RemoteBoundary label="Education">
              <EducationSection />
            </RemoteBoundary>
          </Section>

          <Section
            id="contact"
            kicker="Get In Touch"
            title="Let's Work Together"
            className="bg-secondary"
            stackIndex={32}
          >
            <RemoteBoundary label="Contact">
              <ContactSection />
            </RemoteBoundary>
          </Section>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}
