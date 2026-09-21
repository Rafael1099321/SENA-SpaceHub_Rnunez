// =================================================================
// Archivo: src/routes/ProtectedRoute.tsx
// Guardia de rutas (Sesión 4): valida sesión activa y, opcionalmente,
// el rol RBAC exigido por la ruta anidada.
// =================================================================
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Role } from '../types';

interface ProtectedRouteProps {
  rolPermitido?: Role;
}

export default function ProtectedRoute({ rolPermitido }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  // 1. Autenticación: ¿existe un token JWT válido en la sesión?
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Autorización RBAC: ¿el rol del usuario coincide con el exigido por la ruta?
  if (rolPermitido && user?.role !== rolPermitido) {
    return (
      <div className="view-container">
        <div className="form-box" style={{ borderColor: '#f8717155' }}>
          <span className="form-box-title" style={{ color: '#f87171' }}>
            ⛔ ACCESO DENEGADO (HTTP 403)
          </span>
          <p className="muted-text">
            Tu rol actual es <strong>{user?.role}</strong>. Se requiere el rol{' '}
            <strong>{rolPermitido}</strong> para acceder a esta sección.
          </p>
        </div>
      </div>
    );
  }

  // 3. Acceso permitido: renderiza la ruta hija a través de <Outlet />
  return <Outlet />;
}
