# 🍽️ Planificador de Menú Semanal

Una aplicación web para planificar tus comidas semanales de forma sencilla y organizada, con **sincronización en tiempo real** usando Firebase.

## ✨ Características

- **Gestión de Platillos (CRUD)**: Crea, edita y elimina tus platillos favoritos
- **Planificación Semanal**: Organiza desayuno, almuerzo y cena para cada día de la semana (Lunes a Domingo)
- **Sincronización en Tiempo Real**: Los cambios se reflejan instantáneamente en todos los dispositivos conectados 🔄
- **Interfaz Intuitiva**: Sistema de click simple - selecciona un platillo y asígnalo a cualquier comida
- **Reinicio Automático**: El menú se reinicia automáticamente cada lunes
- **Histórico**: Mantiene el registro de las últimas 4 semanas
- **Multi-dispositivo**: Comparte el menú con tu familia - todos pueden ver y editar en tiempo real

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

## ☁️ Firebase Setup

Esta app usa Firebase Firestore para sincronización en tiempo real. La configuración ya está incluida en el archivo `src/firebase.ts`.

**Importante para uso familiar**: Todos los que accedan a la misma URL verán y podrán editar el mismo menú. Los cambios son instantáneos.

## 📦 Deploy a GitHub Pages

1. Actualiza el `base` en `vite.config.ts` con el nombre de tu repositorio:
```typescript
base: '/nombre-de-tu-repo/',
```

2. Ejecuta:
```bash
npm run deploy
```

3. Comparte la URL con tu familia: `https://tu-usuario.github.io/tu-repo/`

## 🎯 Cómo Usar

1. **Agregar Platillos**: Click en "+ Nuevo Platillo" para agregar tus platillos con nombre y descripción opcional
2. **Seleccionar Platillo**: Click en cualquier platillo para seleccionarlo (se marcará en azul)
3. **Asignar al Menú**: Con un platillo seleccionado, haz click en cualquier casilla del calendario para asignarlo
4. **Quitar Platillo**: Click en el botón "Quitar" de cada casilla o click en una casilla sin tener platillo seleccionado
5. **Ver Histórico**: En la parte inferior puedes ver y cargar semanas anteriores
6. **Compartir**: Todos los que accedan a la misma URL verán los mismos datos en tiempo real

## 🛠️ Tecnologías

- React 18
- TypeScript
- Vite
- Firebase Firestore (sincronización en tiempo real)
- CSS puro (sin frameworks)

## 📋 Estructura del Proyecto

```
src/
├── App.tsx                 # Componente principal
├── firebase.ts            # Configuración de Firebase
├── types.ts               # Definiciones de TypeScript
├── utils.ts               # Utilidades para manejo de fechas
├── usePlatillos.ts        # Hook para gestión de platillos con Firebase
├── useMenuSemanal.ts      # Hook para gestión de menús con Firebase
├── GestorPlatillos.tsx    # Componente CRUD de platillos
├── GridSemanal.tsx        # Tabla del menú semanal
├── Historico.tsx          # Componente de histórico
└── main.tsx              # Punto de entrada
```

## 🔐 Seguridad

Actualmente la app está en modo de prueba de Firebase. Para producción, se recomienda:
- Configurar reglas de seguridad en Firestore
- Agregar autenticación de usuarios
- Limitar acceso por dominios específicos

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor abre un issue primero para discutir cambios mayores.

## 📝 Licencia

MIT
