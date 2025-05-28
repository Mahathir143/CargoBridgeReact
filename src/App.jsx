import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Cargo from './pages/Cargo';
import About from './pages/About';
import InstallPWAButton from './components/InstallPWAButton';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />

        <main className="min-vh-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cargo" element={<Cargo />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Install PWA Button: shown conditionally based on platform */}
        <InstallPWAButton />

        <Toaster />
      </div>
    </Router>
  );
}

export default App;