import { useState } from 'react';
import { Platillo } from './types';

interface Props {
  platillos: Platillo[];
  onAgregar: (nombre: string, descripcion?: string) => void;
  onEditar: (id: string, nombre: string, descripcion?: string) => void;
  onEliminar: (id: string) => void;
  platilloSeleccionado: string | null;
  onSeleccionar: (id: string | null) => void;
}

export const GestorPlatillos = ({ 
  platillos, 
  onAgregar, 
  onEditar, 
  onEliminar,
  platilloSeleccionado,
  onSeleccionar
}: Props) => {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState<Platillo | null>(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    if (editando) {
      onEditar(editando.id, nombre, descripcion);
      setEditando(null);
    } else {
      onAgregar(nombre, descripcion);
    }

    setNombre('');
    setDescripcion('');
    setMostrarForm(false);
  };

  const handleEditar = (platillo: Platillo) => {
    setEditando(platillo);
    setNombre(platillo.nombre);
    setDescripcion(platillo.descripcion || '');
    setMostrarForm(true);
  };

  const handleCancelar = () => {
    setMostrarForm(false);
    setEditando(null);
    setNombre('');
    setDescripcion('');
  };

  return (
    <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2 style={{ margin: 0 }}>Mis Platillos</h2>
        <button 
          onClick={() => setMostrarForm(!mostrarForm)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {mostrarForm ? 'Cancelar' : '+ Nuevo Platillo'}
        </button>
      </div>

      {mostrarForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'white', borderRadius: '4px' }}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Nombre del platillo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
              autoFocus
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Descripción (opcional)"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="submit"
              style={{
                padding: '8px 16px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              {editando ? 'Guardar Cambios' : 'Agregar'}
            </button>
            <button 
              type="button"
              onClick={handleCancelar}
              style={{
                padding: '8px 16px',
                backgroundColor: '#999',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
        {platillos.map(platillo => (
          <div
            key={platillo.id}
            onClick={() => onSeleccionar(platilloSeleccionado === platillo.id ? null : platillo.id)}
            style={{
              padding: '12px',
              backgroundColor: platilloSeleccionado === platillo.id ? '#2196F3' : 'white',
              color: platilloSeleccionado === platillo.id ? 'white' : 'black',
              border: '2px solid',
              borderColor: platilloSeleccionado === platillo.id ? '#2196F3' : '#ddd',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              position: 'relative'
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{platillo.nombre}</div>
            {platillo.descripcion && (
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{platillo.descripcion}</div>
            )}
            <div style={{ marginTop: '8px', display: 'flex', gap: '5px' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditar(platillo);
                }}
                style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  backgroundColor: platilloSeleccionado === platillo.id ? 'white' : '#FFC107',
                  color: platilloSeleccionado === platillo.id ? '#FFC107' : 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                Editar
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`¿Eliminar "${platillo.nombre}"?`)) {
                    onEliminar(platillo.id);
                  }
                }}
                style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  backgroundColor: platilloSeleccionado === platillo.id ? 'white' : '#f44336',
                  color: platilloSeleccionado === platillo.id ? '#f44336' : 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {platilloSeleccionado && (
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: '#E3F2FD', 
          borderRadius: '4px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          ✓ Platillo seleccionado - Haz click en una casilla del menú para asignarlo
        </div>
      )}
    </div>
  );
};
