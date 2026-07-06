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
          <section id="summary" className="scroll-mt-24">
            <RemoteBoundary label="Summary">
              <HeroSection />
            </RemoteBoundary>
          </section>

          <Section id="experience" kicker="Career History" title="Experience">
            <RemoteBoundary label="Experience">
              <ExperienceSection />
            </RemoteBoundary>
          </Section>

          <Section id="expertise" kicker="Core Expertise" title="Skills & Leadership" className="bg-secondary/30">
            <RemoteBoundary label="Skills">
              <SkillsSection />
            </RemoteBoundary>
          </Section>

          <Section id="education" kicker="Background" title="Education & Early Career">
            <RemoteBoundary label="Education">
              <EducationSection />
            </RemoteBoundary>
          </Section>

          <Section id="contact" kicker="Get In Touch" title="Let's Work Together" className="bg-secondary/30">
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
