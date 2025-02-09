import { Route, Routes, BrowserRouter } from 'react-router-dom';
import SignIn from './pages/SignIn';
import GlobalSvgSprite from './components/GlobalSvgSprite';

function App() {
  return (
    <BrowserRouter>
      <GlobalSvgSprite />
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
