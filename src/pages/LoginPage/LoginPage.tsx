// =================================================================
// Archivo: src/pages/LoginPage/LoginPage.tsx
// Vista de Login conectada al POST /api/v1/auth/login del backend (Sesión 5).
// Conserva la experiencia de "Inicio de Sesión Rápido" de la Sesión 3,
// ahora autenticando siempre contra la API REST real.
// =================================================================
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { credencialesDemo } from '../../data/seedData';
import './LoginPage.css';

export default function LoginPage() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const autenticar = async (email: string, pass: string) => {
    setError(null);
    setLoading(true);
    try {
      await login(email, pass);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    autenticar(correo, password);
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-page-card">
        <div className="login-page-header">
          <span className="badge-sena">SENA SpaceHub</span>
          <h3>🔐 Iniciar Sesión API SENA</h3>
          <p className="login-page-subtitle">Autenticación real vía JWT contra el backend Express (/api/v1/auth/login)</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <span className="login-modal-label">Probar como:</span>

        <button
          type="button"
          className="login-role-card"
          disabled={loading}
          onClick={() => autenticar(credencialesDemo.aprendiz.email, credencialesDemo.aprendiz.password)}
        >
          <div className="login-role-info">
            <span className="login-role-icon">🎓</span>
            <div>
              <div className="login-role-name aprendiz">{credencialesDemo.aprendiz.nombre}</div>
              <div className="login-role-desc">Rol: Aprendiz ADSO • Ficha {credencialesDemo.aprendiz.ficha}</div>
            </div>
          </div>
          <span className="login-role-badge aprendiz">Aprendiz</span>
        </button>

        <button
          type="button"
          className="login-role-card"
          disabled={loading}
          onClick={() => autenticar(credencialesDemo.admin.email, credencialesDemo.admin.password)}
        >
          <div className="login-role-info">
            <span className="login-role-icon">👤</span>
            <div>
              <div className="login-role-name admin">{credencialesDemo.admin.nombre} (Operario/Admin)</div>
              <div className="login-role-desc">Rol: Administrador • Gestión Total</div>
            </div>
          </div>
          <span className="login-role-badge admin">Admin</span>
        </button>

        <button
          type="button"
          className="login-role-card"
          disabled={loading}
          onClick={() => autenticar(credencialesDemo.instructor.email, credencialesDemo.instructor.password)}
        >
          <div className="login-role-info">
            <span className="login-role-icon">👨‍🏫</span>
            <div>
              <div className="login-role-name instructor">{credencialesDemo.instructor.nombre}</div>
              <div className="login-role-desc">Rol: Instructor • Monitoreo</div>
            </div>
          </div>
          <span className="login-role-badge instructor">Instructor</span>
        </button>

        <div className="login-modal-or">
          <span>O ingresa manualmente</span>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="login-field-label">Correo Institucional (@sena.edu.co):</label>
          <input
            className="login-field-input"
            type="email"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="roberto.gomez@sena.edu.co"
          />

          <label className="login-field-label">Contraseña:</label>
          <input
            className="login-field-input"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <div className="login-modal-actions">
            <button type="submit" className="btn-login-confirm" disabled={loading}>
              {loading ? 'Autenticando...' : 'Autenticar (JWT)'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
