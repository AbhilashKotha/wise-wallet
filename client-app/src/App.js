import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/DashboardComponent';
import SettingsPage from './components/SettingsPage';
import StatementsComponent from './components/StatementsComponent';

const App = () => {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/statements" element={<StatementsComponent/>} />
      </Routes>
    </Router>
  );
};

export default App;