import React, { useState, useEffect } from 'react';
import { DemoAuthProvider, useDemoAuth } from './contexts/DemoAuthContext';
import { DemoDataProvider, useDemoData } from './contexts/DemoDataContext';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Layout from './components/Layout/Layout';
import DemoNotice from './components/Common/DemoNotice';

function AppContent() {
  const { user, loading } = useDemoAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <DemoDataProvider>
      <DemoNotice />
      <Layout>
        <Dashboard />
      </Layout>
    </DemoDataProvider>
  );
}

function App() {
  return (
    <DemoAuthProvider>
      <AppContent />
    </DemoAuthProvider>
  );
}

export default App;