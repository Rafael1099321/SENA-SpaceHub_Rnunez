import React from 'react';
import './TarjetaFicha.css';
interface TarjetaProps {
  // Props de Ficha
  ficha: string;
  programa?: string;
  instructor?: string;
  jornada?: string;
  estado?: 'Activa' | 'Finalizada';
  onAbrirModal?: () => void;

  // Props de Préstamo/Equipo
  hora?: string;
  nombre?: string;
  equipo?: string;
  onDevolucion?: () => void;
  soloOperarios?: boolean;
}

export const TarjetaFicha: React.FC<TarjetaProps> = ({
  ficha,
  programa,
  instructor,
  jornada,
  estado,
  onAbrirModal,
  hora,
  nombre,
  equipo,
  onDevolucion,
  soloOperarios
}) => {
  return (
    <div className="card-ficha">
      <div className="card-header">
        <span className="badge-ficha">Ficha #{ficha}</span>
        {hora && <span className="card-time">{hora}</span>}
        {estado && <span className={`badge-estado ${estado.toLowerCase()}`}>{estado}</span>}
      </div>

      <div className="card-body">
        {/* Renderiza según los datos disponibles */}
        {nombre && <h3>{nombre}</h3>}
        {programa && <h3>{programa}</h3>}
        
        {equipo && <p className="equipo-tag">Equipo: <span>{equipo}</span></p>}
        {instructor && <p>Instructor: {instructor}</p>}
        {jornada && <p>Jornada: {jornada}</p>}
      </div>

      {/* Botones según corresponda */}
      {onDevolucion && (
        <button className="btn-devolucion" onClick={onDevolucion}>
          Registrar Devolución
        </button>
      )}

      {!onDevolucion && soloOperarios && (
        <span className="muted-text">Solo Operarios</span>
      )}

      {onAbrirModal && (
        <button className="btn-novedad" onClick={onAbrirModal}>
          Reportar Novedad
        </button>
      )}
    </div>
  );
};