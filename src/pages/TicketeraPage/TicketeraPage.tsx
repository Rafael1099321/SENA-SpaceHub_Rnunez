// =================================================================
// Archivo: src/pages/TicketeraPage/TicketeraPage.tsx
// Mesa de ayuda / incidencias de hardware (estado de cliente).
// =================================================================
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSpaceHubData } from '../../context/DataContext';
import { Prioridad } from '../../types';

const prioridades: Prioridad[] = ['Alta', 'Media', 'Baja'];

export default function TicketeraPage() {
  const { isAdmin } = useAuth();
  const { equipos, tickets, crearTicket, resolverTicket } = useSpaceHubData();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [placa, setPlaca] = useState(equipos[0]?.placaSena ?? '');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState<Prioridad>('Alta');

  const abrirForm = () => {
    setPlaca(equipos[0]?.placaSena ?? '');
    setDescripcion('');
    setPrioridad('Alta');
    setMostrarForm(true);
  };

  const handleSubmit = () => {
    if (!placa || !descripcion.trim()) return;
    crearTicket({ placa, descripcion: descripcion.trim(), prioridad });
    setMostrarForm(false);
  };

  const pendientes = tickets.filter((t) => !t.resuelto);

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h2>Mesa de Ayuda y Ticketera de Fallas</h2>
          <p>Reportes de fallas técnicas e incidencias de hardware</p>
        </div>
        <button className="btn-warning" onClick={abrirForm}>
          🛠 Reportar Incidencia
        </button>
      </div>

      {mostrarForm && (
        <div className="form-box">
          <span className="form-box-title">FORMULARIO: TICKET DE SOPORTE</span>
          <div className="form-grid-3">
            <div>
              <label className="form-label">Equipo:</label>
              <select className="form-input" value={placa} onChange={(e) => setPlaca(e.target.value)}>
                {equipos.map((eq) => (
                  <option key={eq.placaSena} value={eq.placaSena}>{eq.placaSena} - {eq.marcaModelo}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Descripción breve de la falla:</label>
              <input
                className="form-input"
                placeholder="Descripción breve de la falla"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Prioridad:</label>
              <select className="form-input" value={prioridad} onChange={(e) => setPrioridad(e.target.value as Prioridad)}>
                {prioridades.map((p) => (
                  <option key={p} value={p}>Prioridad: {p}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button className="btn-secondary" onClick={() => setMostrarForm(false)}>Cancelar</button>
            <button className="btn-warning" onClick={handleSubmit}>Crear Ticket</button>
          </div>
        </div>
      )}

      <div className="tickets-list">
        {pendientes.map((t) => (
          <div className="ticket-card" key={t.id}>
            <div className="ticket-card-info">
              <div className="ticket-card-top">
                <span className="placa-code">{t.placa}</span>
                <span className={`prioridad-badge ${t.prioridad.toLowerCase()}`}>Prioridad {t.prioridad}</span>
              </div>
              <p className="ticket-desc">{t.descripcion}</p>
            </div>
            {isAdmin ? (
              <button className="btn-primary" onClick={() => resolverTicket(t.id)}>Resolver Ticket</button>
            ) : (
              <span className="muted-text">Solo Operarios</span>
            )}
          </div>
        ))}
        {pendientes.length === 0 && <p className="muted-text">No hay incidencias pendientes.</p>}
      </div>
    </div>
  );
}
