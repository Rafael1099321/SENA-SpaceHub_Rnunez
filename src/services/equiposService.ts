// =================================================================
// Archivo: src/services/equiposService.ts
// CAPA DE SERVICIO: separa la lógica HTTP del componente React (SoC).
// Gestiona todas las peticiones del dominio de Equipos/Inventario.
// =================================================================
import { apiFetch } from './api';
import { Equipo } from '../types';

export const equiposService = {
  // GET /api/v1/equipos
  getAll: async (): Promise<Equipo[]> => {
    return apiFetch<Equipo[]>('/equipos');
  },

  // POST /api/v1/equipos (Requiere Administrador)
  create: async (data: Omit<Equipo, 'id'>): Promise<Equipo> => {
    return apiFetch<Equipo>('/equipos', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // PUT /api/v1/equipos/:placaSena (Requiere Administrador)
  update: async (placaSena: string, data: Partial<Equipo>): Promise<Equipo> => {
    return apiFetch<Equipo>(`/equipos/${placaSena}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // DELETE /api/v1/equipos/:placaSena (Requiere Administrador)
  remove: async (placaSena: string): Promise<{ message: string }> => {
    return apiFetch<{ message: string }>(`/equipos/${placaSena}`, {
      method: 'DELETE',
    });
  },
};

export default equiposService;
