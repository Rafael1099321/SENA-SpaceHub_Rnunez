import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import EquiposPage from './pages/EquiposPage/EquiposPage';
import NuevoEquipoPage from './pages/NuevoEquipoPage/NuevoEquipoPage';
import DetalleEquipoPage from './pages/DetalleEquipoPage/DetalleEquipoPage';
import LoginPage from './pages/LoginPage/LoginPage';
import PerfilPage from './pages/PerfilPage/PerfilPage';
// 🛡️ Importamos la guardia de seguridad
import { ProtectedRoute } from './routes/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route path="dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />

        <Route path="inventario" element={
          <ProtectedRoute>
            <EquiposPage />
          </ProtectedRoute>
        } />

        <Route path="inventario/:placaSena" element={
          <ProtectedRoute>
            <DetalleEquipoPage />
          </ProtectedRoute>
        } />

        {/* ⛔ Exclusivo Administrador */}
        <Route path="inventario/nuevo" element={
          <ProtectedRoute rolPermitido="Administrador">
            <NuevoEquipoPage />
          </ProtectedRoute>
        } />

        <Route path="perfil" element={
          <ProtectedRoute>
            <PerfilPage />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}