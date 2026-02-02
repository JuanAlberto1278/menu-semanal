import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import { Platillo } from './types';

export const usePlatillos = () => {
  const [platillos, setPlatillos] = useState<Platillo[]>([]);
  const [loading, setLoading] = useState(true);

  // Escuchar cambios en tiempo real de Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'platillos'),
      (snapshot) => {
        const platillosData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Platillo));
        setPlatillos(platillosData);
        setLoading(false);
      },
      (error) => {
        console.error('Error al cargar platillos:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const agregarPlatillo = async (nombre: string, descripcion?: string) => {
    try {
      await addDoc(collection(db, 'platillos'), {
        nombre,
        descripcion: descripcion || '',
      });
    } catch (error) {
      console.error('Error al agregar platillo:', error);
      alert('Error al agregar platillo. Por favor intenta de nuevo.');
    }
  };

  const editarPlatillo = async (id: string, nombre: string, descripcion?: string) => {
    try {
      const platilloRef = doc(db, 'platillos', id);
      await updateDoc(platilloRef, {
        nombre,
        descripcion: descripcion || '',
      });
    } catch (error) {
      console.error('Error al editar platillo:', error);
      alert('Error al editar platillo. Por favor intenta de nuevo.');
    }
  };

  const eliminarPlatillo = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'platillos', id));
    } catch (error) {
      console.error('Error al eliminar platillo:', error);
      alert('Error al eliminar platillo. Por favor intenta de nuevo.');
    }
  };

  return {
    platillos,
    loading,
    agregarPlatillo,
    editarPlatillo,
    eliminarPlatillo,
  };
};
