export type Role = 'Aprendiz' | 'Instructor' | 'Administrador';

export type EstadoEquipo = 'Operativo' | 'En Mantenimiento';

export interface Equipo {
  id: number;
  placaSena: string;
  marcaModelo: string;
  ram: string;
  ambiente: string;
  estado: EstadoEquipo;
}

export interface Prestamo {
  id: number;
  ficha: string;
  nombre: string;
  hora: string;
  equipoPlaca: string;
}

export type Prioridad = 'Alta' | 'Media' | 'Baja';

export interface Ticket {
  id: number;
  placa: string;
  descripcion: string;
  prioridad: Prioridad;
  resuelto: boolean;
}

export interface Usuario {
  id: number;
  nombre: string;
  ficha: string;
  correo: string;
  role: Role;
}
