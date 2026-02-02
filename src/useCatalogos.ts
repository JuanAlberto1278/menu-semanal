import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Catalogos, OpcionCatalogo } from './types';

const CATALOGOS_DOC_ID = 'catalogos-compartidos';

const catalogosIniciales: Catalogos = {
  proteinas: [
    { id: '1', nombre: 'Pollo' },
    { id: '2', nombre: 'Res' },
    { id: '3', nombre: 'Pescado' },
    { id: '4', nombre: 'Cerdo' },
    { id: '5', nombre: 'Huevo' },
  ],
  vegetales: [
    { id: '1', nombre: 'Ensalada verde' },
    { id: '2', nombre: 'Ensalada César' },
    { id: '3', nombre: 'Brócoli al vapor' },
    { id: '4', nombre: 'Vegetales salteados' },
    { id: '5', nombre: 'Puré de papa' },
  ]
};

export const useCatalogos = () => {
  const [catalogos, setCatalogos] = useState<Catalogos>(catalogosIniciales);
  const [loading, setLoading] = useState(true);

  // Escuchar cambios en Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'catalogos', CATALOGOS_DOC_ID),
      (docSnap) => {
        if (docSnap.exists()) {
          setCatalogos(docSnap.data() as Catalogos);
        } else {
          // Si no existe, crear con datos iniciales
          setDoc(doc(db, 'catalogos', CATALOGOS_DOC_ID), catalogosIniciales);
          setCatalogos(catalogosIniciales);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error al cargar catálogos:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const agregarProteina = async (nombre: string) => {
    const nueva: OpcionCatalogo = {
      id: Date.now().toString(),
      nombre,
    };
    const catalogosActualizados = {
      ...catalogos,
      proteinas: [...catalogos.proteinas, nueva]
    };
    try {
      await setDoc(doc(db, 'catalogos', CATALOGOS_DOC_ID), catalogosActualizados);
    } catch (error) {
      console.error('Error al agregar proteína:', error);
      alert('Error al agregar proteína. Por favor intenta de nuevo.');
    }
  };

  const eliminarProteina = async (id: string) => {
    const catalogosActualizados = {
      ...catalogos,
      proteinas: catalogos.proteinas.filter(p => p.id !== id)
    };
    try {
      await setDoc(doc(db, 'catalogos', CATALOGOS_DOC_ID), catalogosActualizados);
    } catch (error) {
      console.error('Error al eliminar proteína:', error);
      alert('Error al eliminar proteína. Por favor intenta de nuevo.');
    }
  };

  const agregarVegetal = async (nombre: string) => {
    const nuevo: OpcionCatalogo = {
      id: Date.now().toString(),
      nombre,
    };
    const catalogosActualizados = {
      ...catalogos,
      vegetales: [...catalogos.vegetales, nuevo]
    };
    try {
      await setDoc(doc(db, 'catalogos', CATALOGOS_DOC_ID), catalogosActualizados);
    } catch (error) {
      console.error('Error al agregar vegetal:', error);
      alert('Error al agregar vegetal. Por favor intenta de nuevo.');
    }
  };

  const eliminarVegetal = async (id: string) => {
    const catalogosActualizados = {
      ...catalogos,
      vegetales: catalogos.vegetales.filter(v => v.id !== id)
    };
    try {
      await setDoc(doc(db, 'catalogos', CATALOGOS_DOC_ID), catalogosActualizados);
    } catch (error) {
      console.error('Error al eliminar vegetal:', error);
      alert('Error al eliminar vegetal. Por favor intenta de nuevo.');
    }
  };

  return {
    catalogos,
    loading,
    agregarProteina,
    eliminarProteina,
    agregarVegetal,
    eliminarVegetal,
  };
};
