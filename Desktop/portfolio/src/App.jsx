import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React from 'react';
import Navigation from './components/Navigation';
import { Home, About, Work } from './pages';
import Language from './pages/work/Language';
import Workstation from './pages/work/Workstation';
import Huguenot from './pages/work/Huguenot';
import Woodworking from './pages/work/Woodworking';
import Gymnastics from './pages/work/Gymnastics';
import Cartography from './pages/work/Cartography';
import Dusk from './pages/work/Dusk';
import P5JS from './pages/work/P5JS';
import HomepageVideo from './pages/work/HomepageVideo';

 
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
          <Route path="/work/huguenot" element={<Huguenot />} />
          <Route path="/work/woodworking" element={<Woodworking />} />
          <Route path="/work/gymnastics" element={<Gymnastics />} /> 
          <Route path="/work/cartography" element={<Cartography />} />
          <Route path="/work/dusk" element={<Dusk />} />
          <Route path="/work/p5js" element={<P5JS />} />
          <Route path="/work/homepagevideo" element={<HomepageVideo />} />
        </Routes>
    </Router>
  </main>
  )
}

export default App
