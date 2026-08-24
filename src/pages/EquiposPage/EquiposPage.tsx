import { Link } from 'react-router-dom';
import './EquiposPage.css';

interface Equipo {
  placaSena: string;
  tipo: string;
  estado: 'Disponible' | 'En uso' | 'Mantenimiento';
}

const equiposMock: Equipo[] = [
  { placaSena: 'SENA-0001', tipo: 'Portátil Dell', estado: 'Disponible' },
  { placaSena: 'SENA-0002', tipo: 'PC de escritorio', estado: 'En uso' },
  { placaSena: 'SENA-0003', tipo: 'Videobeam', estado: 'Mantenimiento' },
];

export default function EquiposPage() {
  return (
    <div className="equipos-container">
      <div className="equipos-header">
        <h2>Inventario de Equipos</h2>
        <Link to="/inventario/nuevo" className="btn-nuevo-equipo">
          + Nuevo Equipo
        </Link>
      </div>

      <table className="tabla-equipos">
        <thead>
          <tr>
            <th>Placa SENA</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {equiposMock.map((equipo) => (
            <tr key={equipo.placaSena}>
              <td>{equipo.placaSena}</td>
              <td>{equipo.tipo}</td>
              <td>{equipo.estado}</td>
              <td>
                <Link to={`/inventario/${equipo.placaSena}`}>Ver detalle</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}