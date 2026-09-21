// =================================================================
// Archivo: src/pages/PrestamosPage/PrestamosPage.tsx
// Gestión de préstamos de equipos (estado de cliente; no forma parte
// del contrato de la API REST de la Sesión 5). El equipo a prestar se
// obtiene del inventario real cargado desde el backend.
// =================================================================
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSpaceHubData } from '../../context/DataContext';
import { TarjetaFicha } from '../../components/TarjetaFicha/TarjetaFicha';
import { fichaPorCorreo } from '../../data/seedData';

export default function PrestamosPage() {
  const { user, isAdmin } = useAuth();
  const { equipos, prestamos, crearPrestamo, devolverPrestamo } = useSpaceHubData();
  const [mostrarForm, setMostrarForm] = useState(false);

  const equiposDisponibles = equipos.filter(
    (e) => e.estado === 'Operativo' && !prestamos.some((p) => p.equipoPlaca === e.placaSena)
  );

  const nombreUsuario = user?.nombreCompleto ?? '';
  const fichaUsuario = user ? (fichaPorCorreo[user.email] ?? '') : '';

  const [nombre, setNombre] = useState(isAdmin ? '' : nombreUsuario);
  const [ficha, setFicha] = useState(isAdmin ? '' : fichaUsuario);
  const [equipoPlaca, setEquipoPlaca] = useState(equiposDisponibles[0]?.placaSena ?? '');

  const abrirForm = () => {
    setNombre(isAdmin ? '' : nombreUsuario);
    setFicha(isAdmin ? '' : fichaUsuario);
    setEquipoPlaca(equiposDisponibles[0]?.placaSena ?? '');
    setMostrarForm(true);
  };

  const handleSubmit = () => {
    if (!nombre.trim() || !ficha.trim() || !equipoPlaca) return;
    crearPrestamo({ nombre: nombre.trim(), ficha: ficha.trim(), equipoPlaca });
    setMostrarForm(false);
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h2>Gestión de Solicitudes de Préstamo</h2>
          <p>Control de entregas y devoluciones para aprendices e instructores</p>
        </div>
        <button className="btn-primary" onClick={abrirForm}>
          📄 Solicitar Préstamo de Equipo
        </button>
      </div>

      {mostrarForm && (
        <div className="form-box">
          <div className="form-box-header">
            <span className="form-box-title">FORMULARIO: NUEVA SOLICITUD</span>
            {isAdmin && <span className="pill-info">Modo Gestión Operario</span>}
          </div>

          {isAdmin ? (
            <div className="form-note">
              🛠 Modo Operario / Administrador: Puedes registrar la entrega física de un equipo ingresando los datos del aprendiz solicitante.
            </div>
          ) : (
            <div className="form-note">
              🎓 Modo Aprendiz: tus datos se autocompletan desde tu sesión autenticada.
            </div>
          )}

          <div className="form-grid-3">
            <div>
              <label className="form-label">Aprendiz Solicitante:</label>
              <input
                className="form-input"
                value={nombre}
                disabled={!isAdmin}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Número de Ficha SENA:</label>
              <input
                className="form-input"
                value={ficha}
                disabled={!isAdmin}
                onChange={(e) => setFicha(e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Equipo Requerido (Placa SENA):</label>
              <select className="form-input" value={equipoPlaca} onChange={(e) => setEquipoPlaca(e.target.value)}>
                {equiposDisponibles.length === 0 && <option value="">Sin equipos disponibles</option>}
                {equiposDisponibles.map((eq) => (
                  <option key={eq.placaSena} value={eq.placaSena}>
                    {eq.placaSena} - {eq.marcaModelo} ({eq.ram})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-secondary" onClick={() => setMostrarForm(false)}>Cancelar</button>
            <button className="btn-primary" onClick={handleSubmit} disabled={!equipoPlaca}>
              Confirmar Solicitud de Préstamo
            </button>
          </div>
        </div>
      )}

      <div className="cards-grid">
        {prestamos.map((p) => (
          <TarjetaFicha
            key={p.id}
            ficha={p.ficha}
            hora={p.hora}
            nombre={p.nombre}
            equipo={p.equipoPlaca}
            onDevolucion={isAdmin ? () => devolverPrestamo(p.id) : undefined}
            soloOperarios={!isAdmin}
          />
        ))}
        {prestamos.length === 0 && <p className="muted-text">No hay préstamos activos.</p>}
      </div>
    </div>
  );
}
