import bcrypt from "bcryptjs";
import pool from "../config/db.js";

const RONDAS_SALT = 10;

export const crearUsuario = async (usuario) => {
  const {
    id_rol = 2,
    nombre,
    apellido,
    correo,
    telefono,
    contrasena,
  } = usuario;

  // La contraseña nunca se guarda en texto plano: se hashea antes
  // de insertarla en la base de datos.
  const contrasenaHasheada = await bcrypt.hash(contrasena, RONDAS_SALT);

  const sql = `
    INSERT INTO USUARIO
    (id_rol, nombre, apellido, correo, telefono, contrasena)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const [info] = await pool.query(sql, [
    id_rol,
    nombre,
    apellido,
    correo,
    telefono,
    contrasenaHasheada,
  ]);

  return { insertId: info.insertId, affectedRows: info.affectedRows };
};

export const buscarUsuarioPorCorreo = async (correo) => {
  const sql = `
    SELECT *
    FROM USUARIO
    WHERE correo = ?
  `;

  const [filas] = await pool.query(sql, [correo]);
  return filas;
};

export const listarUsuarios = async () => {
  const sql = `
    SELECT
      idUSUARIO,
      id_rol,
      nombre,
      apellido,
      correo,
      telefono
    FROM USUARIO
    ORDER BY idUSUARIO
  `;

  const [filas] = await pool.query(sql);
  return filas;
};
