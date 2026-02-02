import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import { MenuSemanal, DiaSemana, TipoComida } from './types';
import { getLunesActual, formatFecha, esDelUltimoMes } from './utils';

const DIAS: DiaSemana[] = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const COMIDAS: TipoComida[] = ['desayuno', 'almuerzo', 'cena'];

const crearMenuVacio = (fechaInicio: string): MenuSemanal => {
  const asignaciones = DIAS.flatMap(dia =>
    COMIDAS.map(tipoComida => ({
      dia,
      tipoComida,
      platilloId: null,
    }))
  );

  return {
    id: fechaInicio,
    fechaInicio,
    asignaciones,
  };
};

export const useMenuSemanal = () => {
  const [menus, setMenus] = useState<MenuSemanal[]>([]);
  const [menuActual, setMenuActual] = useState<MenuSemanal>(() => {
    const lunesActual = formatFecha(getLunesActual());
    return crearMenuVacio(lunesActual);
  });
  const [loading, setLoading] = useState(true);

  // Escuchar cambios en Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'menus'),
      (snapshot) => {
        const menusData = snapshot.docs.map(doc => ({
          ...doc.data()
        } as MenuSemanal));
        
        // Filtrar solo los del último mes
        const menusFiltrados = menusData.filter(m => esDelUltimoMes(m.fechaInicio));
        setMenus(menusFiltrados);
        
        // Buscar el menú de la semana actual
        const lunesActual = formatFecha(getLunesActual());
        const menuExistente = menusData.find(m => m.fechaInicio === lunesActual);
        
        if (menuExistente) {
          setMenuActual(menuExistente);
        } else {
          // Si no existe, crear uno nuevo
          const nuevoMenu = crearMenuVacio(lunesActual);
          setMenuActual(nuevoMenu);
          // Guardarlo en Firestore
          setDoc(doc(db, 'menus', lunesActual), nuevoMenu);
        }
        
        setLoading(false);
      },
      (error) => {
        console.error('Error al cargar menús:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Verificar si cambió la semana
  useEffect(() => {
    const verificarSemana = () => {
      const lunesActual = formatFecha(getLunesActual());
      if (menuActual.fechaInicio !== lunesActual) {
        const menuExistente = menus.find(m => m.fechaInicio === lunesActual);
        if (menuExistente) {
          setMenuActual(menuExistente);
        } else {
          const nuevoMenu = crearMenuVacio(lunesActual);
          setMenuActual(nuevoMenu);
          setDoc(doc(db, 'menus', lunesActual), nuevoMenu);
        }
      }
    };

    const interval = setInterval(verificarSemana, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [menuActual, menus]);

  const asignarPlatillo = async (dia: DiaSemana, tipoComida: TipoComida, platilloId: string | null) => {
    const nuevasAsignaciones = menuActual.asignaciones.map(a =>
      a.dia === dia && a.tipoComida === tipoComida
        ? { ...a, platilloId }
        : a
    );

    const menuActualizado = { ...menuActual, asignaciones: nuevasAsignaciones };
    setMenuActual(menuActualizado);

    try {
      await setDoc(doc(db, 'menus', menuActual.fechaInicio), menuActualizado);
    } catch (error) {
      console.error('Error al guardar menú:', error);
      alert('Error al guardar el menú. Por favor intenta de nuevo.');
    }
  };

  const cargarMenuSemana = (fechaInicio: string) => {
    const menu = menus.find(m => m.fechaInicio === fechaInicio);
    if (menu) {
      setMenuActual(menu);
    }
  };

  return {
    menuActual,
    menusHistorico: menus.filter(m => m.fechaInicio !== menuActual.fechaInicio),
    asignarPlatillo,
    cargarMenuSemana,
    loading,
  };
};
