import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './sections/Navbar';
import Home from './pages/Home';
import Movimientos from './pages/Movimientos';
import Datos from './pages/Datos';
import Recordatorios from './pages/Recordatorios';

function App() {
  return (
    <div className="App">
<Router>
        <Navbar />
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="/Movimientos" element={<Movimientos />} />
          <Route path="/Datos" element={<Datos />} />
          <Route path="/Recordatorios" element={<Recordatorios />} />
        </Routes>

      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;

