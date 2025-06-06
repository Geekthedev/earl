import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';
import Login from './pages/Login';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 transition-colors duration-300">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Gallery />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;