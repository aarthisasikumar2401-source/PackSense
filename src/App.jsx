import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NewRecommendation from './pages/NewRecommendation';
import RecommendationResult from './pages/RecommendationResult';
import Diagnose from './pages/Diagnose';
import Redesign from './pages/Redesign';
import Compare from './pages/Compare';
import History from './pages/History';
import Traceability from './pages/Traceability';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="recommend" element={<NewRecommendation />} />
          <Route path="result" element={<RecommendationResult />} />
          <Route path="diagnose" element={<Diagnose />} />
          <Route path="redesign" element={<Redesign />} />
          <Route path="compare" element={<Compare />} />
          <Route path="history" element={<History />} />
          <Route path="traceability" element={<Traceability />} />
          <Route path="chat" element={<Chat />} />
          <Route path="*" element={<Navigate to="/app" replace />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
