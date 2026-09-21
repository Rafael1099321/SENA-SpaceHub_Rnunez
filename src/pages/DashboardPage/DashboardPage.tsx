// =================================================================
// Archivo: src/pages/DashboardPage/DashboardPage.tsx
// Panel principal con KPIs. Los equipos provienen de la API REST
// (GET /api/v1/equipos) a través del DataContext.
// =================================================================
import { useSpaceHubData } from '../../context/DataContext';

export default function DashboardPage() {
  const { equipos, equiposLoading, equiposError, prestamos, tickets } = useSpaceHubData();

  const operativos = equipos.filter((e) => e.estado === 'Operativo').length;
  const mantenimiento = equipos.length - operativos;

  const pendientes = tickets.filter((t) => !t.resuelto);
  const alta = pendientes.filter((t) => t.prioridad === 'Alta').length;
  const media = pendientes.filter((t) => t.prioridad === 'Media').length;
  const baja = pendientes.filter((t) => t.prioridad === 'Baja').length;

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h2>Panel Principal de Ambientes y Tecnología</h2>
          <p>Indicadores en tiempo real de laboratorios de cómputo (datos vía API REST)</p>
        </div>
        <span className="status-badge-optimo">🟢 Estado del Sistema: Óptimo</span>
      </div>

      {equiposError && <div className="login-error">⚠️ {equiposError}. Verifica que el servidor backend esté corriendo en el puerto 3000.</div>}
      {equiposLoading && <p className="muted-text">Cargando inventario desde la API...</p>}

      <div className="metrics-grid">
        <div className="metric-card">
          <small>TOTAL EQUIPOS CÓMPUTO</small>
          <h1>{equipos.length}</h1>
          <p className="text-green">• {operativos} Operativos / {mantenimiento} Mantenimiento</p>
        </div>
        <div className="metric-card">
          <small>PRÉSTAMOS ACTIVOS</small>
          <h1>{prestamos.length}</h1>
          <p className="text-green">En uso por aprendices ADSO</p>
        </div>
        <div className="metric-card">
          <small>OCUPACIÓN AMBIENTES</small>
          <h1>85%</h1>
          <p className="text-blue">Laboratorios 301 y 302 activos</p>
        </div>
        <div className="metric-card">
          <small>INCIDENCIAS DE HARDWARE</small>
          <h1>{pendientes.length}</h1>
          <p className="text-amber">{alta} Prioridad Alta / {media} Media{baja ? ` / ${baja} Baja` : ''}</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <span>📈 TASA DE OCUPACIÓN POR LABORATORIO</span>
            <small className="text-green">EN TIEMPO REAL</small>
          </div>

          <div className="bar-item">
            <div className="bar-label"><span>Ambiente 301 - Desarrollo Web (ADSO)</span> <span>90%</span></div>
            <div className="bar-track"><div className="bar-fill green" style={{ width: '90%' }}></div></div>
          </div>

          <div className="bar-item">
            <div className="bar-label"><span>Ambiente 302 - Redes y Bases de Datos</span> <span>75%</span></div>
            <div className="bar-track"><div className="bar-fill blue" style={{ width: '75%' }}></div></div>
          </div>

          <div className="bar-item">
            <div className="bar-label"><span>Ambiente 303 - Mantenimiento Hardware</span> <span>40%</span></div>
            <div className="bar-track"><div className="bar-fill yellow" style={{ width: '40%' }}></div></div>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <span>📊 DISTRIBUCIÓN DE ESTADO E HISTORIAL</span>
            <small>SEMANA ACTUAL</small>
          </div>
          <div className="donuts-and-weekly">
            <div className="donut-placeholder">
              <div className="donut-center">
                <strong>{equipos.length}</strong>
                <small>EQUIPOS</small>
              </div>
            </div>
            <div className="donut-legend">
              <span className="text-green">• Operativos ({operativos})</span>
              <span className="text-amber">• Mantenimiento ({mantenimiento})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
