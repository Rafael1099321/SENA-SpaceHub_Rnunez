// =================================================================
// Archivo: src/layouts/MainLayout/MainLayout.tsx
// Layout contenedor (Sesión 4): monta el header de navegación, la barra
// de estado de sesión y la escotilla <Outlet /> donde React Router
// inyecta la vista activa. Provee además el DataContext (equipos vía
// API + préstamos/ticketera) a todas las páginas anidadas.
// =================================================================
import { Outlet, useNavigate } from 'react-router-dom';
import { SenaHeader } from '../../components/SenaHeader/SenaHeader';
import { useAuth } from '../../context/AuthContext';
import { DataProvider, useSpaceHubData } from '../../context/DataContext';

function MainLayoutInner() {
  const { user, logout } = useAuth();
  const { equipos, prestamos, tickets } = useSpaceHubData();
  const navigate = useNavigate();

  if (!user) return null;

  const handleSalir = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const counts = {
    inventario: equipos.length,
    prestamos: prestamos.length,
    ticketera: tickets.filter((t) => !t.resuelto).length,
  };

  const usuarioHeader = {
    id: user.id,
    nombre: user.nombreCompleto,
    ficha: '',
    correo: user.email,
    role: user.role,
  };

  return (
    <div className="main-layout">
      <SenaHeader usuario={usuarioHeader} onSalir={handleSalir} counts={counts} />

      <div className="role-banner">
        {user.role === 'Aprendiz' ? (
          <span>🎓 Modo Aprendiz ADSO activo. Las solicitudes de préstamo autocompletan tus datos personales.</span>
        ) : user.role === 'Administrador' ? (
          <span>🛠 Modo Administrador / Operario de Cómputo activo. Tienes permisos para agregar equipos al inventario, editar/eliminar registros y asignar préstamos a cualquier aprendiz.</span>
        ) : (
          <span>👨‍🏫 Modo Instructor activo. Monitoreo de ambientes y reportes de incidencias.</span>
        )}
      </div>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}

export default function MainLayout() {
  return (
    <DataProvider>
      <MainLayoutInner />
    </DataProvider>
  );
}
