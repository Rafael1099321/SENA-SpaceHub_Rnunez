import './ModalNovedad.css';
export interface ModalNovedadProps {
  titulo: string;
  mensaje: string;
  onClose: () => void; // Callback obligatoria enviada por el Padre
}

export default function ModalNovedad({ titulo, mensaje, onClose }: ModalNovedadProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
            <div className="modal-title-box">
              <span className="badge-novedad">Novedad</span>
            </div>
            <button className="btn-close" onClick={onClose}>
              ×
            </button>
          </div>
          <div className="modal-body">
            <p>{titulo}</p>
            <p>{mensaje}</p>
          </div>
          <div className="modal-footer">
            <button className="btn-modal-action" onClick={onClose}>
              Cerrar Modal
            </button>
          </div>
        </div>
      </div>
  );
}