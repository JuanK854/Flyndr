# Flyndr — Aplicación Web Orientada a Servicios

> **UTCH — Tecnologías de la Información · DS51M**  
> Reporte de investigación: *Aplicaciones web orientadas a servicios*

Una aplicación web orientada a servicios construida con **Next.js 14**, **Node.js API Routes**, **SQLite** e integración con la **API de Aviation Stack**.

## Características

- **Búsqueda de Vuelos Real** — Integración con Aviation Stack API para datos en vivo
- **Datos de Demostración** — Sistema mock con 30+ rutas, 15 aerolíneas y precios dinámicos
- **Autocompletado de Aeropuertos** — Búsqueda por código IATA o nombre de ciudad (50+ aeropuertos)
- **Validación de Datos** — Validación en frontend y backend (formato IATA, origen ≠ destino, etc.)
- **Base de Datos Persistente** — SQLite para historial de búsquedas y favoritos
- **API RESTful** — Endpoints Node.js limpios con manejo de errores
- **Interfaz Premium** — Tema oscuro con glassmorphism, animaciones y diseño responsivo
- **Sistema de Favoritos** — Guardar y gestionar vuelos (CRUD completo)
- **Historial de Búsquedas** — Rastrear y repetir búsquedas anteriores
- **Filtros y Ordenamiento** — Ordenar por precio, duración, salida; filtrar por escalas

## Arquitectura (Orientada a Servicios)

```
Frontend (React)
    │
    ▼
API Interna (Next.js API Routes)  ◄── Validación, procesamiento, control de acceso
    │
    ├── /api/flights/search   → Aviation Stack API / Mock Data
    ├── /api/flights/popular  → Mock Data
    ├── /api/airports/search  → Aviation Stack API / Mock Data  ← NUEVO: Autocompletado
    ├── /api/favorites        → SQLite
    └── /api/history          → SQLite
```

El frontend **nunca** se comunica directamente con servicios externos. Toda la comunicación pasa por la API interna, que oculta las credenciales y procesa las respuestas.

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14 (App Router), React 18, Tailwind CSS |
| Backend | Node.js (Next.js API Routes) |
| Base de datos | SQLite (sql.js) |
| API Externa | Aviation Stack Flights API |
| Autocompletado | Aviation Stack Airports API / Mock local |

## Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/flights/search | Buscar vuelos (origin, destination, date, passengers, class) |
| GET | /api/flights/popular | Rutas populares |
| GET | /api/airports/search?q=MEX | **Autocompletado de aeropuertos** |
| GET | /api/favorites | Listar favoritos |
| POST | /api/favorites | Guardar vuelo |
| DELETE | /api/favorites?flightId=xxx | Eliminar favorito |
| GET | /api/history | Historial de búsquedas |
| DELETE | /api/history | Limpiar historial |

## Inicio Rápido

```bash
npm install
npm run dev
```

Abre http://localhost:3000

### Configuración Aviation Stack API (Opcional)

1. Crea una cuenta en aviationstack.com
2. Copia tu API key a `.env.local`:

```env
AVIATIONSTACK_API_KEY=tu_api_key
```

Sin credenciales, la app usa datos de demostración realistas.

## Base de Datos

SQLite en `data/flyndr.db` (se crea automáticamente al primer uso).

Tablas: `searches`, `favorites`

## Validaciones Implementadas

- Formato IATA estricto (exactamente 3 letras A-Z)
- Origen y destino deben ser diferentes
- Pasajeros entre 1 y 9
- Mensajes de error descriptivos en el formulario

---

Desarrollado para UTCH · Aplicación fullstack con Node.js, integración de APIs y base de datos.
