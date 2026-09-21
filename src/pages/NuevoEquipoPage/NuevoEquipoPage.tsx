// =================================================================
// Archivo: src/pages/NuevoEquipoPage/NuevoEquipoPage.tsx
// Formulario controlado para registrar un nuevo equipo (POST /equipos).
// Ruta protegida exclusiva para el rol Administrador (Sesión 4 RBAC).
// =================================================================
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpaceHubData } from '../../context/DataContext';
import { opcionesAmbiente, opcionesRam } from '../../data/seedData';
import { EstadoEquipo } from '../../types';

export default function NuevoEquipoPage() {
  const { agregarEquipo } = useSpaceHubData();
  const navigate = useNavigate();

  const [placaSena, setPlacaSena] = useState('');
  const [marcaModelo, setMarcaModelo] = useState('');
  const [ram, setRam] = useState(opcionesRam[0]);
  const [ambiente, setAmbiente] = useState(opcionesAmbiente[0]);
  const [estado, setEstado] = useState<EstadoEquipo>('Operativo');
  const [error, setError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!placaSena.trim() || !marcaModelo.trim()) return;
    setError(null);
    setGuardando(true);
    try {
      await agregarEquipo({ placaSena: placaSena.trim().toUpperCase(), marcaModelo: marcaModelo.trim(), ram, ambiente, estado });
      navigate('/inventario');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No fue posible registrar el equipo');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h2>Registrar Nuevo Equipo (POST)</h2>
          <p>Utilizando equiposService.create() → POST /api/v1/equipos</p>
        </div>
      </div>

      {error && <div className="login-error">⚠️ {error}</div>}

      <form className="form-box" onSubmit={handleSubmit}>
        <span className="form-box-title">FORMULARIO: NUEVO EQUIPO</span>
        <div className="form-row">
          <input
            className="form-input"
            placeholder="Placa SENA (ej. SENA-8942)"
            value={placaSena}
            onChange={(e) => setPlacaSena(e.target.value)}
            required
          />
          <input
            className="form-input"
            placeholder="Marca / Modelo (ej. Lenovo ThinkPad L14)"
            value={marcaModelo}
            onChange={(e) => setMarcaModelo(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <select className="form-input" value={ram} onChange={(e) => setRam(e.target.value)}>
            {opcionesRam.map((op) => <option key={op} value={op}>{op}</option>)}
          </select>
          <select className="form-input" value={ambiente} onChange={(e) => setAmbiente(e.target.value)}>
            {opcionesAmbiente.map((op) => <option key={op} value={op}>{op}</option>)}
          </select>
          <select className="form-input" value={estado} onChange={(e) => setEstado(e.target.value as EstadoEquipo)}>
            <option value="Operativo">Operativo</option>
            <option value="En Mantenimiento">En Mantenimiento</option>
          </select>
        </div>
        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={() => navigate('/inventario')}>Cancelar</button>
          <button type="submit" className="btn-primary" disabled={guardando}>
            {guardando ? 'Guardando...' : 'Guardar Equipo (POST)'}
          </button>
        </div>
      </form>
    </div>
  );
}
