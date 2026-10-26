import { type ReactNode } from 'react';
import {
  getHealthCheckQueryKey,
  useHealthCheck,
} from '@workspace/api-client-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Activity, RotateCw } from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const health = useHealthCheck({
    query: {
      queryKey: getHealthCheckQueryKey(),
      refetchInterval: 30000,
    },
  });
  const isLoading = health.isLoading || (health.isFetching && !health.data && !health.isError);
  const isOffline = health.isError || (!health.isLoading && !health.isFetching && !health.data);
  const connectionStatus = isLoading ? 'loading' : isOffline ? 'offline' : 'connected';
  const statusText = isLoading
    ? 'Checking connection'
    : isOffline
      ? 'Backend offline'
      : `Backend connected${health.data?.status ? ` · ${health.data.status}` : ''}`;
  const portalPath = `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}portal.html`;

  return (
    <main className="portal-shell">
      <header className="portal-topbar">
        <div className="portal-brand">
          <div className="portal-mark" aria-hidden="true">
            <Activity size={19} strokeWidth={2} />
          </div>
          <div className="portal-brand-copy">
            <p className="portal-brand-title">STUDY PORTAL</p>
            <span className="portal-brand-subtitle">Learning arcade / 01</span>
          </div>
        </div>

        <section
          className={`connection connection--${connectionStatus}`}
          aria-label="Backend connection status"
          aria-live="polite"
          data-testid="status-backend-connection"
        >
          <div className="connection-copy">
            <span className="connection-label">Service status</span>
            <span className="connection-state">
              <span className="connection-dot" aria-hidden="true" />
              {statusText}
            </span>
          </div>
          <button
            type="button"
            className="connection-retry"
            aria-label="Retry backend connection"
            title="Retry connection"
            data-testid="button-retry-connection"
            onClick={() => void health.refetch()}
            disabled={health.isFetching}
          >
            <RotateCw size={14} className={health.isFetching ? 'animate-spin' : ''} />
          </button>
        </section>
      </header>
      <div className="portal-frame-wrap">
        <iframe
          className="portal-frame"
          src={portalPath}
          title="Study.com learning game portal"
          data-testid="frame-study-portal"
        />
      </div>
    </main>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
