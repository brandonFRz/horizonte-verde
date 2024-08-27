# Horizonte Verde - Cabins Reservation System

**Horizonte Verde** es un sistema de reservas para una serie de cabañas de lujo situadas en los Alpes suizos. El proyecto está desarrollado con **Next.js** y **Supabase** para manejar la autenticación, almacenamiento de datos y la lógica de negocio.


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

## Vista Previa
Aquí hay una vista previa de cómo se ve la aplicación:


### Inicio
![Main-page](https://github.com/user-attachments/assets/1e2aa031-6317-412e-81c0-361879669e88)

### Acerca de nosotros
![About-page](https://github.com/user-attachments/assets/1554dc2d-e13d-4077-83d0-36ec5b1e6cbd)

### Inicio de Sesión
![signin-page](https://github.com/user-attachments/assets/3601966a-7b65-462b-8b4f-5cc299ff974a)

### Cuenta
![account-page](https://github.com/user-attachments/assets/8382df09-cbd7-4c36-b628-3c06bfb84372)

### Lista de Cabañas
![cabins-page](https://github.com/user-attachments/assets/6637f724-b61e-4645-84de-4e70f3f0130c)

### Detalles de la cabaña y reserva
![cabin-page](https://github.com/user-attachments/assets/74e8dfb7-a758-4927-bd8b-c6e1f5293b35)

### Reservas
![booking-page](https://github.com/user-attachments/assets/9361be49-c5d4-4e23-9a3e-bc710ffdc2b4)

### Editar reserva
![edit-booking](https://github.com/user-attachments/assets/09730e6b-e678-4ebb-9692-9980cd8a1081)

### Editar perfil
![edit-profile-page](https://github.com/user-attachments/assets/b97fa807-7dff-494b-ae9b-19f2e27b9625)

### Pagina de agradecimiento
![thanks-page](https://github.com/user-attachments/assets/9b8541f2-65b7-4fbf-8583-8654f3741eb4)

