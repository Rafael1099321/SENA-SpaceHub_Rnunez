import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, type RolUsuario } from '../../context/AuthContext';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginSimulado } = useAuth();

  const [correo, setCorreo] = useState('');
  const [rol, setRol] = useState<RolUsuario>('Aprendiz');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginSimulado(correo, rol);
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Iniciar Sesión - SENA SpaceHub</h2>
      <input
        type="email"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        placeholder="Correo electrónico"
        required
      />
      <select value={rol} onChange={(e) => setRol(e.target.value as RolUsuario)}>
        <option value="Aprendiz">Aprendiz</option>
        <option value="Instructor">Instructor</option>
        <option value="Administrador">Administrador</option>
      </select>
      <button type="submit">Ingresar</button>
    </form>
  );
}