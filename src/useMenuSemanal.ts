import { useState, useEffect } from 'react';
import { MenuSemanal, DiaSemana, TipoComida } from './types';
import { getLunesActual, formatFecha, esDelUltimoMes } from './utils';

const STORAGE_KEY = 'menu-semanales';

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
  const [menus, setMenus] = useState<MenuSemanal[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const menusGuardados = JSON.parse(stored);
      // Filtrar solo los del último mes
      return menusGuardados.filter((m: MenuSemanal) => esDelUltimoMes(m.fechaInicio));
    }
    return [];
  });

  const [menuActual, setMenuActual] = useState<MenuSemanal>(() => {
    const lunesActual = formatFecha(getLunesActual());
    const menuExistente = menus.find(m => m.fechaInicio === lunesActual);
    return menuExistente || crearMenuVacio(lunesActual);
  });

  // Guardar menús en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menus));
  }, [menus]);

  // Verificar si cambió la semana y actualizar
  useEffect(() => {
    const verificarSemana = () => {
      const lunesActual = formatFecha(getLunesActual());
      if (menuActual.fechaInicio !== lunesActual) {
        // Guardar el menú anterior si no está guardado
        if (!menus.find(m => m.fechaInicio === menuActual.fechaInicio)) {
          setMenus([...menus, menuActual]);
        }
        
        // Crear o cargar el nuevo menú
        const nuevoMenu = menus.find(m => m.fechaInicio === lunesActual) || crearMenuVacio(lunesActual);
        setMenuActual(nuevoMenu);
      }
    };

    // Verificar al montar y cada hora
    verificarSemana();
    const interval = setInterval(verificarSemana, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [menuActual, menus]);

  const asignarPlatillo = (dia: DiaSemana, tipoComida: TipoComida, platilloId: string | null) => {
    const nuevasAsignaciones = menuActual.asignaciones.map(a =>
      a.dia === dia && a.tipoComida === tipoComida
        ? { ...a, platilloId }
        : a
    );

    setMenuActual({ ...menuActual, asignaciones: nuevasAsignaciones });
  };

  const guardarMenuActual = () => {
    const menusActualizados = menus.filter(m => m.fechaInicio !== menuActual.fechaInicio);
    setMenus([...menusActualizados, menuActual]);
  };

  const cargarMenuSemana = (fechaInicio: string) => {
    const menu = menus.find(m => m.fechaInicio === fechaInicio);
    if (menu) {
      setMenuActual(menu);
    }
  };

  // Guardar automáticamente al cambiar asignaciones
  useEffect(() => {
    guardarMenuActual();
  }, [menuActual.asignaciones]);

  return {
    menuActual,
    menusHistorico: menus.filter(m => m.fechaInicio !== menuActual.fechaInicio),
    asignarPlatillo,
    cargarMenuSemana,
  };
};
