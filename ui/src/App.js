import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import RequireAuth from './components/RequireAuth';
import NotAuth from './components/NotAuth';

import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';

const Crud = React.lazy(() => import('./components/Crud'));
const Login = React.lazy(() => import('./components/Login'));
const Role = React.lazy(() => import('./components/Role'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route element={<NotAuth />}>
              <Route path="/login" element={<Login />} />
              {/* <Route path="/register" element={<Register />} /> */}
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="/products" element={<Crud />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/roles" element={<Role />} />
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;

