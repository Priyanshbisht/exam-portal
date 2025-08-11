import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import DomainTest from './Components/DomainTest/DomainTest';
import Profile from './Components/Profile/Profile';
import Notification from './Components/Notification/Notification';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/domain/:domainId" element={<DomainTest />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notification />} />
      </Routes>
    </Router>
  );
}

export default App;
