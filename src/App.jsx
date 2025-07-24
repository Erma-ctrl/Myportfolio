import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Project Components
import TaskManager from './projects/TaskManager';
import WeatherDashboard from './projects/WeatherDashboard';
import GradeCalculator from './projects/GradeCalculator';
import RecipeFinder from './projects/RecipeFinder';

function HomePage({ darkMode, toggleDarkMode }) {
  return (
    <div>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<HomePage darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} 
        />
        <Route path="/task-manager" element={<TaskManager />} />
        <Route path="/weather-dashboard" element={<WeatherDashboard />} />
        <Route path="/grade-calculator" element={<GradeCalculator />} />
        <Route path="/recipe-finder" element={<RecipeFinder />} />
      </Routes>
    </Router>
  );
}

export default App;