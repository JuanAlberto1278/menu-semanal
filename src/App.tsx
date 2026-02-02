import { useState } from 'react';
import { usePlatillos } from './usePlatillos';
import { useMenuSemanal } from './useMenuSemanal';
import { GestorPlatillos } from './GestorPlatillos';
import { GridSemanal } from './GridSemanal';
import { Historico } from './Historico';
import './App.css';

function App() {
  const [platilloSeleccionado, setPlatilloSeleccionado] = useState<string | null>(null);
  
  const { 
    platillos, 
    agregarPlatillo, 
    editarPlatillo, 
    eliminarPlatillo 
  } = usePlatillos();

  const {
    menuActual,
    menusHistorico,
    asignarPlatillo,
    cargarMenuSemana,
  } = useMenuSemanal();

  const handleAsignarPlatillo = (dia: any, tipoComida: any, platilloId: string | null) => {
    asignarPlatillo(dia, tipoComida, platilloId);
    // Deseleccionar después de asignar
    if (platilloId) {
      setPlatilloSeleccionado(null);
    }
  };

  return (
    <div className="app-container">
      <header style={{
        backgroundColor: '#1976D2',
        color: 'white',
        padding: '20px',
        marginBottom: '30px',
        borderRadius: '8px'
      }}>
        <h1 style={{ margin: 0 }}>🍽️ Planificador de Menú Semanal</h1>
        <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>
          Organiza tus comidas de la semana fácilmente
        </p>
      </header>

      <main>
        <GestorPlatillos
          platillos={platillos}
          onAgregar={agregarPlatillo}
          onEditar={editarPlatillo}
          onEliminar={eliminarPlatillo}
          platilloSeleccionado={platilloSeleccionado}
          onSeleccionar={setPlatilloSeleccionado}
        />

        <GridSemanal
          menu={menuActual}
          platillos={platillos}
          platilloSeleccionado={platilloSeleccionado}
          onAsignar={handleAsignarPlatillo}
        />

        <Historico
          menus={menusHistorico}
          onSeleccionar={cargarMenuSemana}
        />
      </main>

      <footer style={{
        marginTop: '40px',
        padding: '20px',
        textAlign: 'center',
        color: '#666',
        fontSize: '14px',
        borderTop: '1px solid #ddd'
      }}>
        Los menús se reinician automáticamente cada lunes. El histórico mantiene las últimas 4 semanas.
      </footer>
    </div>
  );
}

export default App;
