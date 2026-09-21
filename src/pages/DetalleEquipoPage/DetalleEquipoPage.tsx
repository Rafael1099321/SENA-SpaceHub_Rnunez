// =================================================================
// Archivo: src/pages/DetalleEquipoPage/DetalleEquipoPage.tsx
// Ruta dinámica /inventario/:placaSena (Sesión 4: useParams()).
// Permite editar el equipo mediante PUT /api/v1/equipos/:placaSena.
// =================================================================
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSpaceHubData } from '../../context/DataContext';
import { opcionesAmbiente, opcionesRam } from '../../data/seedData';
import { EstadoEquipo } from '../../types';

export default function DetalleEquipoPage() {
  const { placaSena } = useParams<{ placaSena: string }>();
  const { equipos, actualizarEquipo } = useSpaceHubData();
  const navigate = useNavigate();

  const equipo = equipos.find((e) => e.placaSena === placaSena);

  const [ram, setRam] = useState(equipo?.ram ?? opcionesRam[0]);
  const [ambiente, setAmbiente] = useState(equipo?.ambiente ?? opcionesAmbiente[0]);
  const [estado, setEstado] = useState<EstadoEquipo>(equipo?.estado ?? 'Operativo');
  const [error, setError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (equipo) {
      setRam(equipo.ram);
      setAmbiente(equipo.ambiente);
      setEstado(equipo.estado);
    }
  }, [equipo]);

  if (!placaSena) return null;

  if (!equipo) {
    return (
      <div className="view-container">
        <p className="muted-text">Cargando recurso o equipo no encontrado: <strong>{placaSena}</strong></p>
        <button className="btn-secondary" onClick={() => navigate('/inventario')}>Volver</button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setGuardando(true);
    try {
      await actualizarEquipo(placaSena, { ram, ambiente, estado });
      navigate('/inventario');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No fue posible actualizar el equipo');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h2>Editar Equipo (PUT)</h2>
          <p>Placa SENA leída con useParams(): <strong className="placa-code">{placaSena}</strong></p>
        </div>
      </div>

      {error && <div className="login-error">⚠️ {error}</div>}

      <form className="form-box" onSubmit={handleSubmit}>
        <span className="form-box-title">FICHA TÉCNICA — {equipo.marcaModelo}</span>
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
          <button type="button" className="btn-secondary" onClick={() => navigate('/inventario')}>Volver</button>
          <button type="submit" className="btn-primary" disabled={guardando}>
            {guardando ? 'Actualizando...' : 'Actualizar Recurso (PUT)'}
          </button>
        </div>
      </form>
    </div>
  );
}
