export interface Platillo {
  id: string;
  nombre: string;
  descripcion?: string;
}

export type TipoComida = 'desayuno' | 'almuerzo' | 'cena';

export type DiaSemana = 'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes' | 'sábado' | 'domingo';

export interface AsignacionComida {
  dia: DiaSemana;
  tipoComida: TipoComida;
  platilloId: string | null;
}

export interface MenuSemanal {
  id: string;
  fechaInicio: string; // ISO string del lunes de esa semana
  asignaciones: AsignacionComida[];
}
