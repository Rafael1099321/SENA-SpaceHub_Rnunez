import { Prestamo, Ticket } from '../types';

// Credenciales de prueba (deben existir en server/server.js -> USERS)
// Se usan únicamente para poblar los botones de "Inicio de Sesión Rápido"
// del LoginPage; la autenticación real siempre viaja por la API REST.
export const credencialesDemo = {
  aprendiz: { email: 'ana.fajardo@sena.edu.co', password: 'aprendiz123password', nombre: 'Ana María Fajardo', ficha: '2879451' },
  admin: { email: 'roberto.gomez@sena.edu.co', password: 'admin123password', nombre: 'Ing. Roberto Gómez' },
  instructor: { email: 'instructor.perez@sena.edu.co', password: 'instructor123password', nombre: 'Prof. Juan Carlos Pérez' },
};

// Ficha SENA asociada al aprendiz autenticado (dato que en un sistema
// completo vendría del backend; aquí se resuelve por correo institucional).
export const fichaPorCorreo: Record<string, string> = {
  'ana.fajardo@sena.edu.co': '2879451',
};

export const prestamosIniciales: Prestamo[] = [
  { id: 1, ficha: '2879451', nombre: 'Ana María Fajardo', hora: '08:00 AM', equipoPlaca: 'SENA-1001' },
  { id: 2, ficha: '2879451', nombre: 'Carlos Mendoza', hora: '09:30 AM', equipoPlaca: 'SENA-1003' },
  { id: 3, ficha: '2879432', nombre: 'Jennifer Andrea', hora: '10:15 AM', equipoPlaca: 'SENA-1004' },
];

export const ticketsIniciales: Ticket[] = [
  { id: 1, placa: 'SENA-1002', descripcion: 'Falla en el teclado y puerto HDMI intermitente', prioridad: 'Alta', resuelto: false },
  { id: 2, placa: 'SENA-1005', descripcion: 'Batería no retiene carga más de 30 minutos', prioridad: 'Media', resuelto: false },
];

export const opcionesRam = ['16GB DDR4', '32GB DDR5', '8GB DDR4'];

export const opcionesAmbiente = [
  'Ambiente 301 - ADSO',
  'Ambiente 302 - Redes',
  'Ambiente 303 - Hardware',
  'Taller Prototipado 3D',
];
