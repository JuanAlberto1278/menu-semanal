import { MenuSemanal } from './types';

interface Props {
  menus: MenuSemanal[];
  onSeleccionar: (fechaInicio: string) => void;
}

export const Historico = ({ menus, onSeleccionar }: Props) => {
  if (menus.length === 0) {
    return null;
  }

  const formatFecha = (fechaISO: string) => {
    const fecha = new Date(fechaISO + 'T00:00:00');
    return fecha.toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <div style={{ 
      marginTop: '30px', 
      padding: '20px', 
      backgroundColor: '#f5f5f5', 
      borderRadius: '8px' 
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '15px' }}>Histórico del Último Mes</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {menus
          .sort((a, b) => b.fechaInicio.localeCompare(a.fechaInicio))
          .map(menu => (
            <button
              key={menu.id}
              onClick={() => onSeleccionar(menu.fechaInicio)}
              style={{
                padding: '12px',
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '14px',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e3f2fd'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              📅 Semana del {formatFecha(menu.fechaInicio)}
            </button>
          ))}
      </div>
    </div>
  );
};
