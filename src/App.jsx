import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './app/app-provider/AppProvider';
import Dashboard from './pages/dashboard/Dashboard.jsx';
import LandingPage from './pages/landing-page/LandingPage.jsx';

function App() {
  return (
<BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;