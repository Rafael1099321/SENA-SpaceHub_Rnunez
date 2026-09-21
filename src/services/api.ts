// =================================================================
// Archivo: src/services/api.ts
// Helper central de peticiones HTTP hacia el backend Express (Sesión 5)
// Adjunta automáticamente el token JWT guardado en sessionStorage.
// =================================================================

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // BUENA PRÁCTICA: sessionStorage aísla el token a la pestaña actual,
  // evitando que la sesión persista indefinidamente en PCs compartidos de los laboratorios SENA.
  const token = sessionStorage.getItem('token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Algunos endpoints (204, etc.) podrían no traer body; se maneja con seguridad.
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = (data && (data.message || data.error)) || 'Error en la comunicación con la API REST';
    throw new Error(message);
  }

  return data as T;
}

export { API_BASE_URL };
