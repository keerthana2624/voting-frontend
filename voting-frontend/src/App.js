import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Elections from './pages/Elections';
import VotePage from './pages/VotePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/elections" element={<Elections />} />
        <Route
    path="/vote/:id"
    element={
      <ProtectedRoute>
        <VotePage />
      </ProtectedRoute>
    }
  />
        
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
