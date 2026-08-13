
-- ============================================================
-- DEPORTA - SEED DE USUARIOS
-- ============================================================
-- Ejecuta este script en tu MySQL (Workbench, phpMyAdmin, etc.)
-- dentro de la base de datos `deporta`.
-- Crea 5 usuarios de prueba (2 admins + 3 clientes).
-- ============================================================

-- Asegurarse de usar la BD correcta
USE deporta;

-- Limpiar tabla primero (SOLO si quieres reiniciar - descomenta):
-- DELETE FROM USUARIO;
-- ALTER TABLE USUARIO AUTO_INCREMENT = 1;

-- =========================================
-- 2 USUARIOS ADMINISTRADORES (id_rol = 1)
-- =========================================
INSERT INTO USUARIO (id_rol, nombre, apellido, correo, telefono, contrasena)
VALUES (
  1,
  'Carlos',
  'Alvarez Ruiz',
  'carlos.alvarez@deporta.pe',
  '987654321',
  'Admin1234'
);

INSERT INTO USUARIO (id_rol, nombre, apellido, correo, telefono, contrasena)
VALUES (
  1,
  'Mariana',
  'Castro Paredes',
  'mariana.castro@deporta.pe',
  '986543210',
  'Admin5678'
);

-- =========================================
-- 3 USUARIOS CLIENTES (id_rol = 2)
-- =========================================
INSERT INTO USUARIO (id_rol, nombre, apellido, correo, telefono, contrasena)
VALUES (
  2,
  'Andres',
  'Vasquez Quispe',
  'andres.vasquez@gmail.com',
  '985432109',
  'Cliente123'
);

INSERT INTO USUARIO (id_rol, nombre, apellido, correo, telefono, contrasena)
VALUES (
  2,
  'Matilda',
  'Rodriguez Solis',
  'matilda.rodriguez@hotmail.com',
  '984321098',
  'Cliente456'
);

INSERT INTO USUARIO (id_rol, nombre, apellido, correo, telefono, contrasena)
VALUES (
  2,
  'Jose',
  'Andrade Mamani',
  'jose.andrade@outlook.com',
  '983210987',
  'Cliente789'
);

-- Ver los usuarios creados SIN mostrar claves
SELECT
  idUSUARIO,
  id_rol,
  nombre,
  apellido,
  correo,
  telefono
FROM USUARIO
ORDER BY idUSUARIO;
