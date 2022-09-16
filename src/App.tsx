import React, { useState, useEffect } from 'react';
import Body from './pages/Homepage';
import Navigation from './components/Navigation';
import { AuthContext } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import Recover from './pages/Recover';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Diagram from './pages/Diagram';

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const userStored = JSON.parse(localStorage.getItem('user') || '{}');
    if (localStorage.getItem('user')) {
      setUser(userStored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <div className="App h-100">
      <AuthContext.Provider value={{ user, setUser }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Body />} />

          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/diagram" element={<Diagram />} />
          </Route>

          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/profile" element={<Profile user={user} />} />
          </Route>

          <Route path="/:token" element={<Recover />}></Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
