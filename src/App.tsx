import { useState } from 'react';
import { usePlatillos } from './usePlatillos';
import { useMenuSemanal } from './useMenuSemanal';
import { useCatalogos } from './useCatalogos';
import { GestorPlatillos } from './GestorPlatillos';
import { CatalogosVisual } from './CatalogosVisual';
import { GridSemanal } from './GridSemanal';
import { Historico } from './Historico';
import './App.css';

function App() {
  const [platilloSeleccionado, setPlatilloSeleccionado] = useState<string | null>(null);
  
  const { 
    platillos, 
    loading: loadingPlatillos,
    agregarPlatillo, 
    editarPlatillo, 
    eliminarPlatillo 
  } = usePlatillos();

  const {
    menuActual,
    menusHistorico,
    loading: loadingMenus,
    asignarPlatillo,
    cargarMenuSemana,
  } = useMenuSemanal();

  const {
    catalogos,
    loading: loadingCatalogos,
    agregarProteina,
    eliminarProteina,
    agregarVegetal,
    eliminarVegetal,
  } = useCatalogos();

  const handleAsignarPlatillo = (dia: any, tipoComida: any, platilloId: string | null, notas?: string) => {
    asignarPlatillo(dia, tipoComida, platilloId, notas);
    // Deseleccionar después de asignar
    if (platilloId) {
      setPlatilloSeleccionado(null);
    }
  };

  if (loadingPlatillos || loadingMenus || loadingCatalogos) {
    return (
      <div className="app-container">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <div style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #1976D2',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ color: '#666', fontSize: '18px' }}>Cargando datos...</p>
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

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
          Organiza tus comidas de la semana fácilmente - ¡Sincronizado en tiempo real! 🔄
        </p>
      </header>

      <main>
        <CatalogosVisual
          catalogos={catalogos}
          onAgregarProteina={agregarProteina}
          onEliminarProteina={eliminarProteina}
          onAgregarVegetal={agregarVegetal}
          onEliminarVegetal={eliminarVegetal}
        />

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
        <br />
        <strong>✨ Sincronización en tiempo real activada - Todos ven los mismos cambios al instante</strong>
      </footer>
    </div>
  );
}

export default App;
