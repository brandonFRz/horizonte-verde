# Horizonte Verde - Cabins Reservation System

**Horizonte Verde** es un sistema de reservas para una serie de cabañas de lujo situadas en los Alpes suizos. El proyecto está desarrollado con **Next.js** y **Supabase** para manejar la autenticación, almacenamiento de datos y la lógica de negocio.

## Índice

- [Características](#características)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Instalación y configuración](#instalación-y-configuración)
- [Uso](#uso)
- [Estructura del proyecto](#estructura-del-proyecto)


## Características

- Autenticación de usuarios con Google utilizando NextAuth.
- Sistema de reservas para cabañas con manejo de fechas, capacidad y precios.
- Perfil de usuario con opciones para actualizar información personal.
- Listado de reservas, creación, edición y eliminación de las mismas.
- Protección de rutas con middleware para asegurar que solo los usuarios autenticados accedan a ciertas páginas.

## Tecnologías utilizadas

- **Next.js** - Framework de React para aplicaciones web.
- **Supabase** - Base de datos y autenticación como servicio.
- **NextAuth.js** - Manejo de autenticación en Next.js.
- **React** - Biblioteca de JavaScript para construir interfaces de usuario.
- **TypeScript** - Superset de JavaScript que añade tipado estático.

## Instalación y configuración

### Prerrequisitos

- Node.js v14 o superior.
- NPM o Yarn.
- Una cuenta de Supabase con un proyecto configurado.

### Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/horizonte-verde.git
cd horizonte-verde
```

### Configurar variables de entorno
Crea un archivo .env.local en la raíz del proyecto con las siguientes variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-de-supabase
NEXTAUTH_SECRET=tu-nextauth-secret
AUTH_GOOGLE_ID=tu-client-id-de-google
AUTH_GOOGLE_SECRET=tu-client-secret-de-google
```

### Instalación de dependencias y ejecuta la aplicación
```bash
npm install
npm run dev
```

## Uso
- Accede a la página de inicio y realiza el proceso de autenticación con Google.
- Navega a la sección de cabañas para ver las disponibles y realizar una reserva.
- Administra tus reservas, añadiendo, editando o eliminando según sea necesario.

## Estrucura del proyecto
- /app: Contiene las páginas de la aplicación, como la de inicio, perfil de usuario, y reservas.
- /components: Componentes reutilizables como botones, formularios y cabeceras.
- //lib: Funciones y servicios, incluyendo la lógica para manejar Supabase y la autenticación.
- /middleware: Middleware para proteger las rutas que requieren autenticación
  
