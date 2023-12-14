import React, { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary p-3" data-bs-theme="dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded={isOpen ? "true" : "false"}
        onClick={toggleMenu}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <h4 className="navbar-text mx-5 text-info">Cuentas Juan y Mily</h4>
      <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">Inicio</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Movimientos">Movimientos</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/Recordatorios">Recordatorios</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;






