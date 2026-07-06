import { useActionState } from 'react';
import { LinkedinIcon, MailIcon, SendIcon } from 'lucide-react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  Input,
  Label,
  Reveal,
  Textarea,
  cn,
} from '@resume/ui';

import '@resume/ui/styles/theme.css';

interface FormState {
  status: 'idle' | 'success' | 'error';
  message?: string;
}

const initialState: FormState = { status: 'idle' };

async function submitContactForm(_prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get('name')?.toString().trim();
  const email = formData.get('email')?.toString().trim();
  const message = formData.get('message')?.toString().trim();

  if (!name || !email || !message) {
    return { status: 'error', message: 'Please fill out every field before sending.' };
  }

  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

  // No form backend configured for this static deploy — open the
  // visitor's email client with a prefilled message instead. This
  // keeps the whole site deployable to any static host with zero
  // server-side requirements.
  if (!endpoint) {
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:steve.m@sioli.com?subject=${subject}&body=${body}`;
    return { status: 'success', message: 'Opening your email client…' };
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    });
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    return { status: 'success', message: "Thanks — I'll get back to you soon." };
  } catch {
    return {
      status: 'error',
      message: 'Something went wrong sending that. Feel free to email me directly instead.',
    };
  }
}

export default function ContactSection() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
      <Reveal>
        <Badge variant="blue" className="mb-4">
          Open to new opportunities
        </Badge>
        <p className="text-muted-foreground max-w-md leading-relaxed">
          I&apos;m actively exploring staff and principal frontend/platform architecture roles.
          The fastest way to reach me is email or LinkedIn, or send a note using the form.
        </p>
        <div className="mt-6 flex flex-col gap-3 text-sm">
          <a
            href="mailto:steve.m@sioli.com"
            className="hover:text-primary flex items-center gap-2.5 transition-colors"
          >
            <MailIcon className="size-4" />
            steve.m@sioli.com
          </a>
          <a
            href="https://www.linkedin.com/in/steve-sioli"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary flex items-center gap-2.5 transition-colors"
          >
            <LinkedinIcon className="size-4" />
            linkedin.com/in/steve-sioli
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <Card>
          <CardContent className="pt-2">
            <form action={formAction} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input id="contact-name" name="name" autoComplete="name" required />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea id="contact-message" name="message" rows={5} required />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Sending…' : 'Send message'}
                  <SendIcon className="size-4" />
                </Button>
                {state.status !== 'idle' && (
                  <p
                    role="status"
                    className={cn(
                      'text-sm',
                      state.status === 'success' ? 'text-primary' : 'text-destructive',
                    )}
                  >
                    {state.message}
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
