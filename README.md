# 🍽️ Planificador de Menú Semanal

Una aplicación web para planificar tus comidas semanales de forma sencilla y organizada.

## ✨ Características

- **Gestión de Platillos (CRUD)**: Crea, edita y elimina tus platillos favoritos
- **Planificación Semanal**: Organiza desayuno, almuerzo y cena para cada día de la semana (Lunes a Domingo)
- **Interfaz Intuitiva**: Sistema de click simple - selecciona un platillo y asígnalo a cualquier comida
- **Reinicio Automático**: El menú se reinicia automáticamente cada lunes
- **Histórico**: Mantiene el registro de las últimas 4 semanas
- **Persistencia**: Todos los datos se guardan en localStorage

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build
npm run preview
```

## 📦 Deploy a GitHub Pages

1. Actualiza el `base` en `vite.config.ts` con el nombre de tu repositorio:
```typescript
base: '/nombre-de-tu-repo/',
```

2. Ejecuta:
```bash
npm run deploy
```

## 🎯 Cómo Usar

1. **Agregar Platillos**: Click en "+ Nuevo Platillo" para agregar tus platillos con nombre y descripción opcional
2. **Seleccionar Platillo**: Click en cualquier platillo para seleccionarlo (se marcará en azul)
3. **Asignar al Menú**: Con un platillo seleccionado, haz click en cualquier casilla del calendario para asignarlo
4. **Quitar Platillo**: Click en el botón "Quitar" de cada casilla o click en una casilla sin tener platillo seleccionado
5. **Ver Histórico**: En la parte inferior puedes ver y cargar semanas anteriores

## 🛠️ Tecnologías

- React 18
- TypeScript
- Vite
- localStorage para persistencia
- CSS puro (sin frameworks)

## 📋 Estructura del Proyecto

```
src/
├── App.tsx                 # Componente principal
├── types.ts               # Definiciones de TypeScript
├── utils.ts               # Utilidades para manejo de fechas
├── usePlatillos.ts        # Hook para gestión de platillos
├── useMenuSemanal.ts      # Hook para gestión de menús
├── GestorPlatillos.tsx    # Componente CRUD de platillos
├── GridSemanal.tsx        # Tabla del menú semanal
├── Historico.tsx          # Componente de histórico
└── main.tsx              # Punto de entrada
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor abre un issue primero para discutir cambios mayores.

## 📝 Licencia

MIT
