import React, { useState } from 'react';
import Body from './components/Body';
import Navigation from './components/Navigation';
import { AuthContext } from './context/AuthContext';

function App() {
  const [user, setUser] = useState({});

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
