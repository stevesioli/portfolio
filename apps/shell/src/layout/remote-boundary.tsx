import { Component, Suspense, type ReactNode } from 'react';
import { AlertTriangleIcon } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  label: string;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class RemoteErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error) {
    // A federated remote failed to load or render. Surfaced quietly in
    // the UI rather than crashing the whole page — the rest of the
    // resume stays usable.
    console.error(`[${this.props.label}] micro-frontend failed to load:`, error);
  }

  override render() {
    if (this.state.error) {
      return (
        <div className="mx-auto flex max-w-lg flex-col items-center gap-2 rounded-lg border border-dashed border-border px-6 py-10 text-center">
          <AlertTriangleIcon className="text-muted-foreground size-5" />
          <p className="text-muted-foreground text-sm">
            The {this.props.label} section couldn&apos;t load right now.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

function SectionSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-3xl animate-pulse flex-col gap-4 px-6 py-16">
      <div className="bg-muted h-4 w-24 rounded" />
      <div className="bg-muted h-8 w-2/3 rounded" />
      <div className="bg-muted h-4 w-full rounded" />
      <div className="bg-muted h-4 w-5/6 rounded" />
    </div>
  );
}

export function RemoteBoundary({ children, label }: { children: ReactNode; label: string }) {
  return (
    <RemoteErrorBoundary label={label}>
      <Suspense fallback={<SectionSkeleton />}>{children}</Suspense>
    </RemoteErrorBoundary>
  );
}
