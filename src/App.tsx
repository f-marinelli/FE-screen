import React, { useEffect } from 'react';
import Body from './pages/Homepage';
import Navigation from './components/Navigation';
import { Routes, Route } from 'react-router-dom';
import Recover from './pages/Recover';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setUser } from './store/userSlice';
import Diagram from './pages/Diagram';

function App() {
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userStored = JSON.parse(localStorage.getItem('user') || '{}');
    if (localStorage.getItem('user')) {
      dispatch(setUser(userStored));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  return (
    <div className="App h-100">
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
    </div>
  );
}

export default App;
