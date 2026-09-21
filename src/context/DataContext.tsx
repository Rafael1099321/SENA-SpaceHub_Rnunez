// =================================================================
// Archivo: src/context/DataContext.tsx
// Contexto de datos del dominio SpaceHub: el inventario de Equipos se
// sincroniza con la API REST (Sesión 5); Préstamos y Ticketera se
// mantienen como estado de cliente (no forman parte del contrato de API).
// =================================================================
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Equipo, Prestamo, Ticket } from '../types';
import { equiposService } from '../services/equiposService';
import { prestamosIniciales, ticketsIniciales } from '../data/seedData';

interface DataContextType {
  equipos: Equipo[];
  equiposLoading: boolean;
  equiposError: string | null;
  recargarEquipos: () => Promise<void>;
  agregarEquipo: (equipo: Omit<Equipo, 'id'>) => Promise<void>;
  actualizarEquipo: (placaSena: string, cambios: Partial<Equipo>) => Promise<void>;
  eliminarEquipo: (placaSena: string) => Promise<void>;

  prestamos: Prestamo[];
  crearPrestamo: (p: Omit<Prestamo, 'id' | 'hora'>) => void;
  devolverPrestamo: (id: number) => void;

  tickets: Ticket[];
  crearTicket: (t: Omit<Ticket, 'id' | 'resuelto'>) => void;
  resolverTicket: (id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [equiposLoading, setEquiposLoading] = useState(true);
  const [equiposError, setEquiposError] = useState<string | null>(null);

  const [prestamos, setPrestamos] = useState<Prestamo[]>(prestamosIniciales);
  const [tickets, setTickets] = useState<Ticket[]>(ticketsIniciales);

  const recargarEquipos = useCallback(async () => {
    setEquiposLoading(true);
    setEquiposError(null);
    try {
      const data = await equiposService.getAll();
      setEquipos(data);
    } catch (err) {
      setEquiposError(err instanceof Error ? err.message : 'No fue posible cargar el inventario');
    } finally {
      setEquiposLoading(false);
    }
  }, []);

  useEffect(() => {
    recargarEquipos();
  }, [recargarEquipos]);

  const agregarEquipo = async (equipo: Omit<Equipo, 'id'>) => {
    const nuevo = await equiposService.create(equipo);
    setEquipos((prev) => [nuevo, ...prev]);
  };

  const actualizarEquipo = async (placaSena: string, cambios: Partial<Equipo>) => {
    const actualizado = await equiposService.update(placaSena, cambios);
    setEquipos((prev) => prev.map((e) => (e.placaSena === placaSena ? actualizado : e)));
  };

  const eliminarEquipo = async (placaSena: string) => {
    await equiposService.remove(placaSena);
    setEquipos((prev) => prev.filter((e) => e.placaSena !== placaSena));
  };

  const crearPrestamo = (p: Omit<Prestamo, 'id' | 'hora'>) => {
    const hora = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
    setPrestamos((prev) => [...prev, { ...p, id: Date.now(), hora: `${hora} (ahora)` }]);
  };

  const devolverPrestamo = (id: number) => {
    setPrestamos((prev) => prev.filter((p) => p.id !== id));
  };

  const crearTicket = (t: Omit<Ticket, 'id' | 'resuelto'>) => {
    setTickets((prev) => [...prev, { ...t, id: Date.now(), resuelto: false }]);
  };

  const resolverTicket = (id: number) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, resuelto: true } : t)));
  };

  return (
    <DataContext.Provider
      value={{
        equipos,
        equiposLoading,
        equiposError,
        recargarEquipos,
        agregarEquipo,
        actualizarEquipo,
        eliminarEquipo,
        prestamos,
        crearPrestamo,
        devolverPrestamo,
        tickets,
        crearTicket,
        resolverTicket,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useSpaceHubData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useSpaceHubData debe usarse dentro de un <DataProvider>');
  return context;
};
