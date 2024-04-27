import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonalDataChart from './components/PersonalDataChartComponent';
import AboutComponent from './components/AboutComponent';

const App = () => {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/dashboard" element={<PersonalDataChart />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/about" element={<AboutComponent />} />
      </Routes>
    </Router>
  );
};

export default App;