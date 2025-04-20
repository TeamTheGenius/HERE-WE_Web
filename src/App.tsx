import GlobalSvgSprite from './shared/ui/GlobalSvgSprite';
import { Routing } from './app/routes';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastList from './widgets/ToastList';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <GlobalSvgSprite />
      <QueryClientProvider client={queryClient}>
        <Routing />
        <ToastList />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
