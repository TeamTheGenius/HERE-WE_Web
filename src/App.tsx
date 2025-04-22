import GlobalSvgSprite from './shared/ui/GlobalSvgSprite';
import { Routing } from './app/routes';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import ToastList from './widgets/ToastList';
import QueryErrorFallback from './shared/ui/QueryErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { MutationErrorFallback } from './shared/ui/MutationErrorFallback';
import { ErrorBoundaryWithChildren } from './shared/ui/ErrorBoundaryWithChildren';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      retry: 0,
    },
    mutations: {
      throwOnError: true,
    },
  },
});

function App() {
  return (
    <ThemeProvider>
      <GlobalSvgSprite />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundaryWithChildren onReset={reset} FallbackComponent={MutationErrorFallback}>
                <ErrorBoundary onReset={reset} FallbackComponent={QueryErrorFallback}>
                  <Routing />
                  <ToastList />
                </ErrorBoundary>
              </ErrorBoundaryWithChildren>
            )}
          </QueryErrorResetBoundary>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
