// Obtiene el lunes de la semana actual (00:00:00)
export const getLunesActual = (): Date => {
  const hoy = new Date();
  const dia = hoy.getDay();
  const diff = dia === 0 ? -6 : 1 - dia; // Si es domingo (0), retrocede 6 días
  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() + diff);
  lunes.setHours(0, 0, 0, 0);
  return lunes;
};

// Formatea fecha a ISO string (YYYY-MM-DD)
export const formatFecha = (fecha: Date): string => {
  return fecha.toISOString().split('T')[0];
};

// Obtiene el lunes de hace N semanas
export const getLunesAnterior = (semanasAtras: number): Date => {
  const lunes = getLunesActual();
  lunes.setDate(lunes.getDate() - (semanasAtras * 7));
  return lunes;
};

// Verifica si una fecha es del último mes
export const esDelUltimoMes = (fechaInicio: string): boolean => {
  const fecha = new Date(fechaInicio);
  const hace4Semanas = getLunesAnterior(4);
  return fecha >= hace4Semanas;
};
