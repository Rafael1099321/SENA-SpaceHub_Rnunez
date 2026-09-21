// =================================================================
// Archivo: src/services/authService.ts
// Capa de servicio de autenticación: separa la lógica HTTP del AuthContext.
// =================================================================
import { API_BASE_URL } from './api';
import { Role } from '../types';

export interface AuthUser {
  id: number;
  nombreCompleto: string;
  email: string;
  role: Role;
}

export interface LoginResponse {
  statusCode: number;
  message: string;
  accessToken: string;
  user: AuthUser;
}

export const authService = {
  // POST /api/v1/auth/login
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al iniciar sesión');
    }

    return data as LoginResponse;
  },

  // POST /api/v1/auth/logout (requiere Bearer token)
  logout: async (token: string | null): Promise<void> => {
    if (!token) return;
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // Si el servidor no responde, igual se limpia la sesión en el cliente.
    }
  },
};

export default authService;
