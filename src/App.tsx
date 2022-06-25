import React, { useState, useEffect } from 'react';
import Body from './components/Body';
import Navigation from './components/Navigation';
import { AuthContext } from './context/AuthContext';

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
        <Body />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
