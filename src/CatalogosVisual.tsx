import { useState } from 'react';
import { Catalogos } from './types';

interface Props {
  catalogos: Catalogos;
  onAgregarProteina: (nombre: string) => void;
  onEliminarProteina: (id: string) => void;
  onAgregarVegetal: (nombre: string) => void;
  onEliminarVegetal: (id: string) => void;
}

export const CatalogosVisual = ({
  catalogos,
  onAgregarProteina,
  onEliminarProteina,
  onAgregarVegetal,
  onEliminarVegetal,
}: Props) => {
  const [mostrarFormProteina, setMostrarFormProteina] = useState(false);
  const [mostrarFormVegetal, setMostrarFormVegetal] = useState(false);
  const [nombreProteina, setNombreProteina] = useState('');
  const [nombreVegetal, setNombreVegetal] = useState('');

  const handleAgregarProteina = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombreProteina.trim()) {
      onAgregarProteina(nombreProteina.trim());
      setNombreProteina('');
      setMostrarFormProteina(false);
    }
  };

  const handleAgregarVegetal = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombreVegetal.trim()) {
      onAgregarVegetal(nombreVegetal.trim());
      setNombreVegetal('');
      setMostrarFormVegetal(false);
    }
  };

  return (
    <div style={{ 
      marginBottom: '30px', 
      padding: '20px', 
      backgroundColor: '#f9f9f9', 
      borderRadius: '8px',
      border: '2px dashed #ddd'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#1976D2' }}>
        📋 Catálogos de Referencia
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Catálogo de Proteínas */}
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <h4 style={{ margin: 0, color: '#d32f2f' }}>🍗 Proteínas</h4>
            <button
              onClick={() => setMostrarFormProteina(!mostrarFormProteina)}
              style={{
                padding: '6px 12px',
                backgroundColor: '#d32f2f',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              {mostrarFormProteina ? 'Cancelar' : '+ Agregar'}
            </button>
          </div>

          {mostrarFormProteina && (
            <form onSubmit={handleAgregarProteina} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Ej: Atún"
                  value={nombreProteina}
                  onChange={(e) => setNombreProteina(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    fontSize: '13px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                  autoFocus
                />
                <button
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  ✓
                </button>
              </div>
            </form>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {catalogos.proteinas.map(proteina => (
              <div
                key={proteina.id}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#ffebee',
                  border: '1px solid #ef5350',
                  borderRadius: '20px',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{proteina.nombre}</span>
                <button
                  onClick={() => {
                    if (confirm(`¿Eliminar "${proteina.nombre}"?`)) {
                      onEliminarProteina(proteina.id);
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#d32f2f',
                    cursor: 'pointer',
                    fontSize: '16px',
                    padding: 0,
                    lineHeight: 1
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Catálogo de Vegetales */}
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <h4 style={{ margin: 0, color: '#388e3c' }}>🥗 Vegetales/Ensaladas</h4>
            <button
              onClick={() => setMostrarFormVegetal(!mostrarFormVegetal)}
              style={{
                padding: '6px 12px',
                backgroundColor: '#388e3c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              {mostrarFormVegetal ? 'Cancelar' : '+ Agregar'}
            </button>
          </div>

          {mostrarFormVegetal && (
            <form onSubmit={handleAgregarVegetal} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Ej: Zanahoria rallada"
                  value={nombreVegetal}
                  onChange={(e) => setNombreVegetal(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    fontSize: '13px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                  autoFocus
                />
                <button
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  ✓
                </button>
              </div>
            </form>
          )}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {catalogos.vegetales.map(vegetal => (
              <div
                key={vegetal.id}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#e8f5e9',
                  border: '1px solid #66bb6a',
                  borderRadius: '20px',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{vegetal.nombre}</span>
                <button
                  onClick={() => {
                    if (confirm(`¿Eliminar "${vegetal.nombre}"?`)) {
                      onEliminarVegetal(vegetal.id);
                    }
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#388e3c',
                    cursor: 'pointer',
                    fontSize: '16px',
                    padding: 0,
                    lineHeight: 1
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '15px', 
        padding: '12px', 
        backgroundColor: '#fff3cd',
        borderRadius: '4px',
        fontSize: '13px',
        color: '#856404'
      }}>
        💡 <strong>Tip:</strong> Usa este catálogo como referencia visual al planificar tus menús. 
        Por ejemplo: "Picadillo de Vainica + Brócoli al vapor + Pollo"
      </div>
    </div>
  );
};
