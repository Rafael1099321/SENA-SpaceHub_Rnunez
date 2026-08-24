import './TarjetaFicha.css';
import { useState } from 'react';

// Contrato de Props con callback opcional para el modal
export interface TarjetaFichaProps {
  numeroFicha: string;
  programa: string;
  jornada: string;
  onAbrirModal?: () => void; // Callback tipada (sin retorno)
}

export default function TarjetaFicha({ numeroFicha, programa, jornada, onAbrirModal }: TarjetaFichaProps) {
  const [asistio, setAsistio] = useState<boolean>(false);

  return (
    <div className="tarjeta-ficha">
      <div className="tarjeta-header">
        <span className="badge-ficha">Ficha #{numeroFicha}</span>
        <button
          className={`btn-asistencia ${asistio ? 'asistio' : 'ausente'}`}
          onClick={() => setAsistio(!asistio)}
        >
          {asistio ? '✅ Presente' : '❌ Ausente'}
        </button>
      </div>

      <h3>{programa}</h3>
      <p>Jornada: {jornada}</p>

      {/* Renderizado condicional mediante cortocircuito && */}
      {onAbrirModal && (
        <button onClick={onAbrirModal}>💬 Ver Novedades (Modal)</button>
      )}
    </div>
  );
}