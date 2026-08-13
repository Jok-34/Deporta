# Configuración de MySQL para Deporta

El backend ahora usa **MySQL** (con el driver `mysql2`) en lugar de
SQLite/sql.js. Ya no se necesita ningún archivo `.db`.

## 1. Requisitos

- Tener MySQL o MariaDB instalado y corriendo (localmente o en un
  servidor).

## 2. Configura las variables de entorno

En `backend/.env` (ya existe, revisa que tenga tus datos reales):

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=deporta
```

Cambia `DB_USER` y `DB_PASSWORD` según tu instalación de MySQL.

## 3. Arranca el backend

```bash
cd backend
npm install
npm run dev    # o: npm start
```

Al iniciar, el backend:
1. Se conecta a MySQL.
2. Crea la base de datos `deporta` si no existe (`CREATE DATABASE IF NOT EXISTS`).
3. Crea todas las tablas si no existen (`CREATE TABLE IF NOT EXISTS`).
4. Inserta los datos iniciales (distritos, deportes, métodos de pago,
   usuarios de prueba y complejos de ejemplo) **solo si las tablas
   están vacías** — no duplica datos en reinicios posteriores.

No necesitas ejecutar ningún script `.sql` a mano: todo se crea
automáticamente. El archivo `seed/usuarios.sql` y `seed/seedUsuarios.js`
siguen disponibles por si quieres volver a sembrar usuarios de prueba
manualmente.

## 4. Verifica la conexión

```bash
curl http://localhost:3000/debug/counts
```

Debe responder con algo como:
```json
{"espacios":12,"complejos":3,"deportes":12}
```

## Notas

- No hay usuarios ni datos de ejemplo precargados: la base arranca
  vacía (solo con catálogos de distritos, deportes y métodos de pago,
  que son datos de referencia, no cuentas). Regístrate desde la app
  como administrador o cliente — así tu contraseña no depende de la
  configuración de MySQL de la PC donde corras el proyecto.
- Las imágenes de espacios deportivos se guardan en
  `backend/uploads/espacios/` y se sirven en
  `http://localhost:3000/uploads/espacios/<archivo>`. Esa carpeta no
  se borra al reiniciar el servidor (solo los datos en las tablas
  dependen de MySQL).
- El pool de conexiones (`src/config/db.js`) se reutiliza en toda la
  app — no se abre una conexión nueva por cada request.
