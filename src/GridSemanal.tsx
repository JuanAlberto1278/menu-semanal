import { MenuSemanal, Platillo, DiaSemana, TipoComida } from './types';

const DIAS: DiaSemana[] = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];
const COMIDAS: TipoComida[] = ['desayuno', 'almuerzo', 'cena'];

const LABELS_COMIDAS = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  cena: 'Cena'
};

const LABELS_DIAS = {
  lunes: 'Lunes',
  martes: 'Martes',
  miércoles: 'Miércoles',
  jueves: 'Jueves',
  viernes: 'Viernes',
  sábado: 'Sábado',
  domingo: 'Domingo'
};

interface Props {
  menu: MenuSemanal;
  platillos: Platillo[];
  platilloSeleccionado: string | null;
  onAsignar: (dia: DiaSemana, tipoComida: TipoComida, platilloId: string | null) => void;
}

export const GridSemanal = ({ menu, platillos, platilloSeleccionado, onAsignar }: Props) => {
  const getPlatillo = (dia: DiaSemana, tipoComida: TipoComida): Platillo | null => {
    const asignacion = menu.asignaciones.find(a => a.dia === dia && a.tipoComida === tipoComida);
    if (!asignacion?.platilloId) return null;
    return platillos.find(p => p.id === asignacion.platilloId) || null;
  };

  const handleClick = (dia: DiaSemana, tipoComida: TipoComida) => {
    if (platilloSeleccionado) {
      onAsignar(dia, tipoComida, platilloSeleccionado);
    } else {
      // Si no hay platillo seleccionado, limpiar la casilla
      onAsignar(dia, tipoComida, null);
    }
  };

  const formatFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO + 'T00:00:00');
    return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <div>
      <h2 style={{ marginBottom: '10px' }}>
        Menú Semanal - Semana del {formatFecha(menu.fechaInicio)}
      </h2>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          minWidth: '800px'
        }}>
          <thead>
            <tr>
              <th style={{
                padding: '12px',
                backgroundColor: '#1976D2',
                color: 'white',
                border: '1px solid #ddd',
                fontWeight: 'bold',
                textAlign: 'left',
                minWidth: '120px'
              }}>
                Comida
              </th>
              {DIAS.map(dia => (
                <th key={dia} style={{
                  padding: '12px',
                  backgroundColor: '#1976D2',
                  color: 'white',
                  border: '1px solid #ddd',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  {LABELS_DIAS[dia]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMIDAS.map(comida => (
              <tr key={comida}>
                <td style={{
                  padding: '12px',
                  backgroundColor: '#E3F2FD',
                  border: '1px solid #ddd',
                  fontWeight: 'bold'
                }}>
                  {LABELS_COMIDAS[comida]}
                </td>
                {DIAS.map(dia => {
                  const platillo = getPlatillo(dia, comida);
                  return (
                    <td
                      key={`${dia}-${comida}`}
                      onClick={() => handleClick(dia, comida)}
                      style={{
                        padding: '8px',
                        border: '1px solid #ddd',
                        cursor: 'pointer',
                        backgroundColor: platillo ? '#C8E6C9' : 'white',
                        transition: 'background-color 0.2s',
                        minHeight: '60px',
                        verticalAlign: 'top'
                      }}
                      onMouseEnter={(e) => {
                        if (!platillo) {
                          e.currentTarget.style.backgroundColor = '#f0f0f0';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = platillo ? '#C8E6C9' : 'white';
                      }}
                    >
                      {platillo ? (
                        <div>
                          <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
                            {platillo.nombre}
                          </div>
                          {platillo.descripcion && (
                            <div style={{ fontSize: '11px', color: '#666' }}>
                              {platillo.descripcion}
                            </div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAsignar(dia, comida, null);
                            }}
                            style={{
                              marginTop: '6px',
                              padding: '3px 6px',
                              fontSize: '10px',
                              backgroundColor: '#f44336',
                              color: 'white',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer'
                            }}
                          >
                            Quitar
                          </button>
                        </div>
                      ) : (
                        <div style={{ 
                          color: '#999', 
                          fontSize: '12px',
                          textAlign: 'center',
                          padding: '20px 5px'
                        }}>
                          {platilloSeleccionado ? 'Click para asignar' : 'Vacío'}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#FFF3CD', 
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <strong>Instrucciones:</strong> Selecciona un platillo arriba y luego haz click en una casilla para asignarlo. 
        Para quitar un platillo, haz click en el botón "Quitar" o click en la casilla sin tener platillo seleccionado.
      </div>
    </div>
  );
};
