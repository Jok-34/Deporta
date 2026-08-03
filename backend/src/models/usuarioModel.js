import pool from "../config/db.js";

export const crearUsuario = async (usuario) => {
  const { id_rol, nombre, apellido, correo, telefono, contrasena } = usuario;

  const sql = `
    INSERT INTO USUARIO
    (id_rol, nombre, apellido, correo, telefono, contrasena)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const [resultado] = await pool.execute(sql, [
    id_rol,
    nombre,
    apellido,
    correo,
    telefono,
    contrasena,
  ]);

  return resultado;
};

export const buscarUsuarioPorCorreo = async (correo) => {
  const sql = `
    SELECT *
    FROM USUARIO
    WHERE correo = ?
  `;

  const [rows] = await pool.execute(sql, [correo]);

  return rows;
};