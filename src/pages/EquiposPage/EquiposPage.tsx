// =================================================================
// Archivo: src/pages/EquiposPage/EquiposPage.tsx
// Inventario de equipos: listado vía GET /api/v1/equipos.
// Registrar (POST) y Eliminar (DELETE) exigen rol Administrador.
// =================================================================
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSpaceHubData } from '../../context/DataContext';

export default function EquiposPage() {
  const { isAdmin } = useAuth();
  const { equipos, equiposLoading, equiposError, eliminarEquipo } = useSpaceHubData();
  const navigate = useNavigate();

  const handleEliminar = async (placaSena: string) => {
    try {
      await eliminarEquipo(placaSena);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'No fue posible eliminar el equipo');
    }
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <div>
          <h2>Inventario de Equipos de Cómputo</h2>
          <p>Datos obtenidos a través de la capa de servicio (equiposService.ts → API REST)</p>
        </div>
        {isAdmin && (
          <button className="btn-primary" onClick={() => navigate('/inventario/nuevo')}>
            + Registrar Nuevo Equipo (POST)
          </button>
        )}
      </div>

      {equiposError && <div className="login-error">⚠️ {equiposError}</div>}

      {equiposLoading ? (
        <p className="muted-text">Cargando inventario...</p>
      ) : (
        <div className="table-wrapper">
          <table className="inventory-table">
            <thead>
              <tr>
                <th>Placa SENA</th>
                <th>Marca / Modelo</th>
                <th>RAM</th>
                <th>Ambiente</th>
                <th>Estado</th>
                <th className="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {equipos.map((item) => (
                <tr key={item.placaSena}>
                  <td className="placa-code">
                    <Link to={`/inventario/${item.placaSena}`}>{item.placaSena}</Link>
                  </td>
                  <td className="font-bold">{item.marcaModelo}</td>
                  <td>{item.ram}</td>
                  <td>{item.ambiente}</td>
                  <td>
                    <span className={`status-pill ${item.estado === 'Operativo' ? 'ok' : 'warn'}`}>
                      {item.estado}
                    </span>
                  </td>
                  <td className="text-right">
                    {isAdmin ? (
                      <>
                        <Link className="btn-link" to={`/inventario/${item.placaSena}`}>Editar</Link>{' '}
                        <button className="btn-link-danger" onClick={() => handleEliminar(item.placaSena)}>
                          Eliminar
                        </button>
                      </>
                    ) : (
                      <span className="muted-text">Solo Operarios</span>
                    )}
                  </td>
                </tr>
              ))}
              {equipos.length === 0 && (
                <tr>
                  <td colSpan={6} className="muted-text">No hay equipos registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
