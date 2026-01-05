import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React from 'react';
import Navigation from './components/Navigation';
import { Home, About, Work } from './pages';
import Language from './pages/work/Language';
import Workstation from './pages/work/Workstation';
 
const App = () => {
  return (
  <main>
    <Router>
      <Navigation />
        <Routes>
          {/* Navigation */}          
          <Route path="/portfolio" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/work" element={<Work/>} />

          {/* Project detail pages */}
          <Route path="/work/language" element={<Language />} />
          <Route path="/work/workstation" element={<Workstation />} />
        </Routes>
    </Router>
  </main>
  )
}

export default App
