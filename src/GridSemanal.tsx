import { useState } from 'react';
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
  onAsignar: (dia: DiaSemana, tipoComida: TipoComida, platilloId: string | null, notas?: string) => void;
}

export const GridSemanal = ({ menu, platillos, platilloSeleccionado, onAsignar }: Props) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [celdaEditando, setCeldaEditando] = useState<{ dia: DiaSemana; tipoComida: TipoComida } | null>(null);
  const [notasTemp, setNotasTemp] = useState('');

  const getAsignacion = (dia: DiaSemana, tipoComida: TipoComida) => {
    return menu.asignaciones.find(a => a.dia === dia && a.tipoComida === tipoComida);
  };

  const getPlatillo = (dia: DiaSemana, tipoComida: TipoComida): Platillo | null => {
    const asignacion = getAsignacion(dia, tipoComida);
    if (!asignacion?.platilloId) return null;
    return platillos.find(p => p.id === asignacion.platilloId) || null;
  };

  const handleClick = (dia: DiaSemana, tipoComida: TipoComida) => {
    if (platilloSeleccionado) {
      // Abrir modal para agregar notas
      setCeldaEditando({ dia, tipoComida });
      setNotasTemp('');
      setModalAbierto(true);
    } else {
      // Si no hay platillo seleccionado, limpiar la casilla
      onAsignar(dia, tipoComida, null, '');
    }
  };

  const handleEditarNotas = (dia: DiaSemana, tipoComida: TipoComida) => {
    const asignacion = getAsignacion(dia, tipoComida);
    setCeldaEditando({ dia, tipoComida });
    setNotasTemp(asignacion?.notas || '');
    setModalAbierto(true);
  };

  const handleGuardarNotas = () => {
    if (celdaEditando) {
      const asignacion = getAsignacion(celdaEditando.dia, celdaEditando.tipoComida);
      onAsignar(
        celdaEditando.dia, 
        celdaEditando.tipoComida, 
        platilloSeleccionado || asignacion?.platilloId || null,
        notasTemp
      );
    }
    setModalAbierto(false);
    setCeldaEditando(null);
    setNotasTemp('');
  };

  const handleCancelar = () => {
    setModalAbierto(false);
    setCeldaEditando(null);
    setNotasTemp('');
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
                  const asignacion = getAsignacion(dia, comida);
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
                          {asignacion?.notas && (
                            <div style={{ 
                              fontSize: '12px', 
                              color: '#1976D2',
                              fontStyle: 'italic',
                              marginBottom: '4px',
                              backgroundColor: '#E3F2FD',
                              padding: '4px',
                              borderRadius: '3px'
                            }}>
                              📝 {asignacion.notas}
                            </div>
                          )}
                          <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditarNotas(dia, comida);
                              }}
                              style={{
                                padding: '3px 6px',
                                fontSize: '10px',
                                backgroundColor: '#2196F3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '3px',
                                cursor: 'pointer'
                              }}
                            >
                              {asignacion?.notas ? 'Editar notas' : '+ Notas'}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onAsignar(dia, comida, null, '');
                              }}
                              style={{
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
        Puedes agregar notas (ej: "Ensalada César + Pollo") haciendo click en "+ Notas" o durante la asignación.
        Para quitar un platillo, haz click en "Quitar".
      </div>

      {/* Modal para editar notas */}
      {modalAbierto && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px' }}>
              Detalles adicionales
            </h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
              Agrega detalles como vegetales, proteína, guarnición, etc.
            </p>
            <textarea
              value={notasTemp}
              onChange={(e) => setNotasTemp(e.target.value)}
              placeholder="Ej: Ensalada verde + Pollo a la plancha"
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              autoFocus
            />
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'flex-end' }}>
              <button
                onClick={handleCancelar}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#999',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardarNotas}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
