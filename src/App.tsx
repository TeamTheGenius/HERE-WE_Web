import { Route, Routes, BrowserRouter } from 'react-router-dom';
import MyComponent from './pages/MyComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
