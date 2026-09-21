import React from 'react';
import { NavLink } from 'react-router-dom';
import { Usuario } from '../../types';

interface HeaderProps {
  usuario: Usuario;
  onSalir: () => void;
  counts: {
    inventario: number;
    prestamos: number;
    ticketera: number;
  };
}

const navClass = ({ isActive }: { isActive: boolean }) =>
  `nav-btn ${isActive ? 'active-green' : ''}`;

export const SenaHeader: React.FC<HeaderProps> = ({ usuario, onSalir, counts }) => {
  return (
    <header className="sena-header">
      <div className="header-left">
        <span className="badge-sena">SENA SpaceHub</span>
        <span className="sub-text">Centro de Gestión de Mercados, Logística y TI</span>
      </div>

      <nav className="header-nav">
        <NavLink to="/dashboard" className={navClass}>
          📊 Dashboard
        </NavLink>
        <NavLink to="/inventario" className={navClass}>
          📦 Inventario ({counts.inventario})
        </NavLink>
        <NavLink to="/prestamos" className={navClass}>
          💾 Préstamos ({counts.prestamos})
        </NavLink>
        <NavLink to="/ticketera" className={navClass}>
          🛠 Ticketera ({counts.ticketera})
        </NavLink>
      </nav>

      <div className="header-user">
        <span className="dot-online">🟢</span>
        <span className="user-name">{usuario.nombre}</span>
        <span className={`badge-role ${usuario.role.toLowerCase()}`}>
          {usuario.role}
        </span>
        <button className="btn-logout" onClick={onSalir}>Salir</button>
      </div>
    </header>
  );
};

export default SenaHeader;
