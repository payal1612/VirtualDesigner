import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDesignStore } from './stores/designStore';
import { useAuthStore } from './stores/authStore';

// Components
import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import CreateDesignPage from './pages/CreateDesignPage';
import MyDesignsPage from './pages/MyDesignsPage';
import TemplatesPage from './pages/TemplatesPage';
import ARViewPage from './pages/ARViewPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const { fetchTemplates } = useDesignStore();
  const { initialize } = useAuthStore();

  useEffect(() => {
    fetchTemplates();
    initialize();
  }, [fetchTemplates, initialize]);

  return (
    <Router>
      <div className="min-h-screen bg-lightest-50">
        <Navbar />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/create" element={<CreateDesignPage />} />
            <Route path="/designs" element={<MyDesignsPage />} />
            <Route path="/templates" element={<TemplatesPage />} />
            <Route path="/ar-view" element={<ARViewPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;