import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/ThemeContext';
import Landing from './pages/Landing';
import LiquidChrome from './components/Plasma';
import dashboard from './pages/Dashboard';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import LessonsPage from './pages/Learninglessons';
import TransactionFraud from './pages/TransactionFraud';
import MessageFraud from './pages/MessageFraud';
import FeedbackDashboard from './pages/feedback';

function AppContent() {
  const { isDark } = useTheme();

  return (

      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/feedback" element={ <ProtectedRoute><FeedbackDashboard /> </ProtectedRoute>} />

          <Route path="/dashboard" element={ <ProtectedRoute><Dashboard /> </ProtectedRoute>} />
          <Route path="/lessons" element={ <ProtectedRoute><LessonsPage /> </ProtectedRoute>} />
          <Route path="/fraud-predict-transaction" element={ <ProtectedRoute><TransactionFraud /> </ProtectedRoute>} />
          <Route path="/fraud-predict-message" element={ <ProtectedRoute><MessageFraud /> </ProtectedRoute>} />
          
        </Routes>
      </Router>

  );
}

const App = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
