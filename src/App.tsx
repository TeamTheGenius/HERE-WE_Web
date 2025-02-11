import GlobalSvgSprite from './shared/ui/GlobalSvgSprite';
import { useTheme } from './shared/hooks/useTheme';
import { Routing } from './app/routes';
import { ThemeProvider } from './app/providers/ThemeProvider';

function App() {
  useTheme();
  return (
    <ThemeProvider>
      <GlobalSvgSprite />
      <Routing />
    </ThemeProvider>
  );
}

export default App;
