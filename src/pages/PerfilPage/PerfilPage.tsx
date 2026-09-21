import { useAuth } from '../../context/AuthContext';
import './PerfilPage.css';

export default function PerfilPage() {
  const { user, logout } = useAuth();

  if (!user) {
    return <p>No hay información de usuario disponible.</p>;
  }

  return (
    <div className="perfil-container">
      <h2>Mi Perfil</h2>
      <p><strong>Nombre:</strong> {user.nombre}</p>
      <p><strong>Correo:</strong> {user.correo}</p>
      <p><strong>Rol:</strong> {user.rol}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}