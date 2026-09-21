# SENA SpaceHub

Proyecto integrador ADSO — Sesiones 1 a 5 (React + TypeScript + React Router + API REST con JWT/RBAC).

## Estructura

```
sena-spacehub/
├── server/            ← Backend Express + JWT + RBAC (Sesión 5)
│   ├── server.js
│   └── package.json
├── src/
│   ├── components/    ← SenaHeader, TarjetaFicha (Sesiones 1-2)
│   ├── context/        AuthContext (JWT real) y DataContext (equipos/préstamos/tickets)
│   ├── data/            Credenciales demo y datos semilla de préstamos/tickets
│   ├── layouts/         MainLayout (navbar + <Outlet />) (Sesión 4)
│   ├── pages/           LoginPage, DashboardPage, EquiposPage, NuevoEquipoPage,
│   │                    DetalleEquipoPage, PrestamosPage, TicketeraPage
│   ├── routes/          ProtectedRoute (guardia RBAC) (Sesión 4)
│   ├── services/        api.ts, authService.ts, equiposService.ts (Sesión 5)
│   ├── App.tsx           Árbol de rutas
│   └── main.tsx          BrowserRouter + AuthProvider
└── .env                 VITE_API_URL
```

## Cómo ejecutar

### 1. Backend (API REST)

```bash
cd server
npm install
npm start
# 🚀 Servidor corriendo en http://localhost:3000/api/v1
```

### 2. Frontend (React + Vite)

En otra terminal, desde la raíz del proyecto:

```bash
npm install
npm run dev
# ➜ http://localhost:5173
```

## Credenciales de prueba

| Rol            | Correo                              | Contraseña             |
|----------------|--------------------------------------|-------------------------|
| Aprendiz       | ana.fajardo@sena.edu.co             | aprendiz123password    |
| Administrador  | roberto.gomez@sena.edu.co           | admin123password       |
| Instructor     | instructor.perez@sena.edu.co        | instructor123password  |

La página de login (`/login`) incluye botones de "Inicio de Sesión Rápido" que
autentican automáticamente contra la API real con estas credenciales.

## Rutas de la SPA

| Ruta                       | Protección                     | Descripción                          |
|-----------------------------|---------------------------------|----------------------------------------|
| `/login`                   | Pública                        | Formulario de autenticación (JWT)      |
| `/dashboard`               | Autenticado                    | KPIs de laboratorios y equipos         |
| `/inventario`              | Autenticado                    | Listado de equipos (GET /equipos)      |
| `/inventario/nuevo`        | Solo Administrador             | Registrar equipo (POST /equipos)       |
| `/inventario/:placaSena`   | Solo Administrador             | Editar equipo (PUT /equipos/:placaSena)|
| `/prestamos`               | Autenticado                    | Gestión de préstamos (estado cliente)  |
| `/ticketera`               | Autenticado                    | Mesa de ayuda (estado cliente)         |

El inventario de equipos vive en el backend (Sesión 5). Préstamos y Ticketera
se mantienen como estado de cliente porque no forman parte del contrato de la
API entregado en la guía de la Sesión 5.
