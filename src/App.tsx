import React, { useState, useEffect } from 'react';
import Body from './components/Body';
import Navigation from './components/Navigation';
import { AuthContext } from './context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import Recover from './components/Recover';

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
    <div className="App">
      <AuthContext.Provider value={{ user, setUser }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/:token" element={<Recover />}></Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
