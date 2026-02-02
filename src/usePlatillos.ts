import { useState, useEffect } from 'react';
import { Platillo } from './types';

const STORAGE_KEY = 'menu-platillos';

export const usePlatillos = () => {
  const [platillos, setPlatillos] = useState<Platillo[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Platillos de ejemplo iniciales
    return [
      { id: '1', nombre: 'Gallo Pinto', descripcion: 'Arroz y frijoles' },
      { id: '2', nombre: 'Casado', descripcion: 'Arroz, frijoles, carne, ensalada' },
      { id: '3', nombre: 'Olla de Carne', descripcion: 'Sopa con verduras' },
      { id: '4', nombre: 'Arroz con Pollo', descripcion: 'Arroz amarillo con pollo' },
      { id: '5', nombre: 'Pasta Alfredo', descripcion: 'Pasta con salsa cremosa' },
    ];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(platillos));
  }, [platillos]);

  const agregarPlatillo = (nombre: string, descripcion?: string) => {
    const nuevo: Platillo = {
      id: Date.now().toString(),
      nombre,
      descripcion,
    };
    setPlatillos([...platillos, nuevo]);
  };

  const editarPlatillo = (id: string, nombre: string, descripcion?: string) => {
    setPlatillos(platillos.map(p => 
      p.id === id ? { ...p, nombre, descripcion } : p
    ));
  };

  const eliminarPlatillo = (id: string) => {
    setPlatillos(platillos.filter(p => p.id !== id));
  };

  return {
    platillos,
    agregarPlatillo,
    editarPlatillo,
    eliminarPlatillo,
  };
};
