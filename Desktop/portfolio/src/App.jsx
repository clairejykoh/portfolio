import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React from 'react';
import Navigation from './components/Navigation';
import { Home, About, Work } from './pages';
 
const App = () => {
  return (
  <main>
    <Router>
      <Navigation />
        <Routes>
          <Route path="/portfolio" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/work" element={<Work/>} />
        </Routes>
    </Router>
  </main>
  )
}

export default App
