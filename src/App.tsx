// =================================================================
// Archivo: src/App.tsx
// Árbol de rutas de la SPA SENA SpaceHub (Sesión 4) con guardias RBAC
// (Sesión 4) y autenticación real vía API REST (Sesión 5).
// =================================================================
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import MainLayout from './layouts/MainLayout/MainLayout';
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import EquiposPage from './pages/EquiposPage/EquiposPage';
import NuevoEquipoPage from './pages/NuevoEquipoPage/NuevoEquipoPage';
import DetalleEquipoPage from './pages/DetalleEquipoPage/DetalleEquipoPage';
import PrestamosPage from './pages/PrestamosPage/PrestamosPage';
import TicketeraPage from './pages/TicketeraPage/TicketeraPage';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* Nivel 1 de protección: cualquier usuario autenticado */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="inventario" element={<EquiposPage />} />
          <Route path="prestamos" element={<PrestamosPage />} />
          <Route path="ticketera" element={<TicketeraPage />} />

          {/* Nivel 2 de protección RBAC: exclusivo para Administrador */}
          <Route element={<ProtectedRoute rolPermitido="Administrador" />}>
            <Route path="inventario/nuevo" element={<NuevoEquipoPage />} />
            <Route path="inventario/:placaSena" element={<DetalleEquipoPage />} />
          </Route>
        </Route>
      </Route>

      {/* Ruta comodín */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
