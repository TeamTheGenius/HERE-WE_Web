import GlobalSvgSprite from './shared/ui/GlobalSvgSprite';
import { Routing } from './app/routes';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import ToastList from './widgets/ToastList';
import ErrorFallback from './shared/ui/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      retry: 0,
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
              <ErrorBoundary onReset={reset} FallbackComponent={ErrorFallback}>
                <Routing />
                <ToastList />
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
