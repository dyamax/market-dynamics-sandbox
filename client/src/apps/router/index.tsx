import { Routes, Route } from 'react-router-dom';
import App from '../tool-main/App';
import LandingPage from '../landing';

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/vemt" element={<App />} />
    </Routes>
  );
}
