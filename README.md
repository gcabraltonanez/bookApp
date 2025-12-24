# 📚 Book App

Aplicación web moderna para la gestión de libros, construida con React y diseñada siguiendo las mejores prácticas de desarrollo y clean code.

## 🚀 Descripción

Book App es una Single Page Application (SPA) que permite crear, editar, visualizar y eliminar libros de manera intuitiva. La aplicación ha sido completamente refactorizada siguiendo principios de arquitectura limpia, escalabilidad y mantenibilidad.

## ✨ Características

- ✅ CRUD completo de libros (Crear, Leer, Actualizar, Eliminar)
- 📅 Selección de fechas con Date Picker en español
- 💰 Formateo automático de precios
- 🎨 Interfaz moderna y responsive con PrimeReact
- ⚡ Indicadores de carga y estados de error
- 🔔 Notificaciones con SweetAlert2
- 🎯 Validación de formularios
- 🌐 Consumo de API REST
- 📱 Diseño adaptable

## 🛠️ Tecnologías

### Core
- **React 18.2.0** - Librería para construcción de interfaces
- **JavaScript (ES6+)** - Lenguaje de programación

### UI/UX
- **PrimeReact 9.6.0** - Biblioteca de componentes UI
- **PrimeIcons 6.0.1** - Iconos
- **Material-UI 5.13.7** - Componentes adicionales (DatePicker)
- **SweetAlert2 11.7.12** - Alertas y notificaciones elegantes
- **CSS Modules** - Estilos con scope local

### Utilidades
- **Axios 1.4.0** - Cliente HTTP para peticiones a la API
- **Day.js 1.11.9** - Manipulación y formateo de fechas
- **React Scripts 5.0.1** - Configuración y scripts de Create React App

### Desarrollo
- **Git** - Control de versiones
- **Visual Studio Code** - Editor recomendado

## 📁 Estructura del Proyecto

```
bookApp/
├── public/
├── src/
│   ├── components/           # Componentes React
│   │   ├── common/          # Componentes reutilizables
│   │   │   ├── ErrorMessage.js
│   │   │   ├── LoadingSpinner.js
│   │   │   └── EmptyState.js
│   │   ├── Book.js          # Componente de fila de libro
│   │   ├── BookDatePicker.js # DatePicker personalizado
│   │   ├── BookDialog.js    # Modal crear/editar libro
│   │   ├── BookMenuBar.js   # Barra de menú superior
│   │   ├── BookTable.js     # Tabla de libros
│   │   ├── Form.js          # Formulario de libro
│   │   └── Input.js         # Input reutilizable
│   ├── constants/           # Constantes y mensajes
│   │   ├── index.js
│   │   └── messages.js
│   ├── hooks/              # Custom hooks
│   │   ├── index.js
│   │   ├── useBooks.js        # Hook para gestión de libros
│   │   ├── useBookForm.js     # Hook para formulario
│   │   ├── useConfirmDialog.js # Hook para confirmaciones
│   │   └── useToast.js        # Hook para notificaciones
│   ├── services/           # Servicios y API
│   │   ├── api.js          # Configuración de Axios
│   │   └── bookService.js  # Servicio de libros
│   ├── utils/              # Utilidades
│   │   ├── index.js
│   │   ├── formatters.js   # Funciones de formateo
│   │   └── validators.js   # Validadores
│   ├── App.js
│   ├── Books.js            # Componente principal (orquestador)
│   ├── Books.module.css    # Estilos del componente principal
│   ├── index.js
│   └── index.css
├── .env                    # Variables de entorno
├── .env.example           # Ejemplo de variables
├── package.json
└── README.md
```

## 🏗️ Arquitectura

La aplicación sigue una arquitectura modular y escalable:

### Separación de Responsabilidades
- **Components**: Componentes de presentación
- **Hooks**: Lógica de negocio reutilizable
- **Services**: Comunicación con APIs
- **Utils**: Funciones auxiliares
- **Constants**: Valores constantes y mensajes

### Principios Aplicados
- ✅ Clean Code
- ✅ DRY (Don't Repeat Yourself)
- ✅ Single Responsibility Principle
- ✅ Component Composition
- ✅ Custom Hooks para lógica compartida
- ✅ CSS Modules para estilos encapsulados

## 🔧 Instalación y Configuración

### Requisitos Previos
- Node.js (versión 14 o superior)
- npm o yarn
- Git

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd bookApp
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env y configurar la URL de tu API
REACT_APP_API_URL=http://localhost:8080
```

4. **Iniciar la aplicación**
```bash
npm start
```

La aplicación se abrirá automáticamente en [http://localhost:3000](http://localhost:3000)

## 📜 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm start

# Crear build de producción
npm run build

# Ejecutar tests
npm test

# Expulsar configuración de Create React App (irreversible)
npm run eject
```

## 🌍 Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# URL base de la API
REACT_APP_API_URL=http://localhost:8080
```

## 🔌 API Backend

La aplicación consume una API REST que debe implementar los siguientes endpoints:

- `GET /books/all` - Obtener todos los libros
- `GET /books/findOne/:id` - Obtener un libro por ID
- `POST /books/create` - Crear un nuevo libro
- `PUT /books/update` - Actualizar un libro
- `DELETE /books/delete/:id` - Eliminar un libro
- `DELETE /books/deleteAll` - Eliminar todos los libros

### Formato de Datos

**Request (Crear/Actualizar libro):**
```json
{
  "title": "El Principito",
  "author": "Antoine de Saint-Exupéry",
  "price": 15.99,
  "releaseDate": "29-06-1943"
}
```

### Errores de dependencias
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 👥 Autores

- Desarrollador original - Versión inicial
- Refactorización completa - 2025

---

**Nota:** Asegúrate de tener el backend corriendo antes de usar la aplicación.
