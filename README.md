# API REST - Sitio Web Administrable

## Endpoints disponibles

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/session` - Verificar sesión activa

### Posts
- `GET /api/posts` - Listar posts
- `GET /api/posts/:id` - Obtener post por ID
- `POST /api/posts` - Crear post
- `PUT /api/posts/:id` - Actualizar post
- `DELETE /api/posts/:id` - Eliminar post

### Eventos
- `GET /api/eventos` - Listar eventos
- `GET /api/eventos/:id` - Obtener evento por ID
- `POST /api/eventos` - Crear evento
- `PUT /api/eventos/:id` - Actualizar evento
- `DELETE /api/eventos/:id` - Eliminar evento

### Productos
- `GET /api/productos` - Listar productos
- `GET /api/productos/:id` - Obtener producto por ID
- `POST /api/productos` - Crear producto
- `PUT /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto

### Servicios
- `GET /api/servicios` - Listar servicios
- `GET /api/servicios/:id` - Obtener servicio por ID
- `POST /api/servicios` - Crear servicio
- `PUT /api/servicios/:id` - Actualizar servicio
- `DELETE /api/servicios/:id` - Eliminar servicio

## Configuración de PostgreSQL

Crear base de datos y ejecutar el siguiente SQL:

```sql
CREATE DATABASE appweb;

\c appweb;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  contenido TEXT,
  imagen TEXT,
  categoria TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE eventos (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  descripcion TEXT,
  fecha DATE NOT NULL,
  hora TIME,
  lugar TEXT,
  imagen TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2),
  imagen TEXT,
  categoria TEXT,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE servicios (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2),
  duracion TEXT,
  imagen TEXT,
  categoria TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Variables de entorno

Crear archivo `.env` con:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=appweb
DB_USER=postgres
DB_PASSWORD=tu_password
SESSION_SECRET=tu-secret-key
```

## Desarrollo local

```bash
npm install
npm run dev
```

## Deploy a Vercel

1. Crear base de datos en Neon, Railway, o Supabase (PostgreSQL)
2. Instalar Vercel CLI: `npm i -g vercel`
3. Ejecutar: `vercel`
4. Configurar las variables de entorno en el dashboard de Vercel
