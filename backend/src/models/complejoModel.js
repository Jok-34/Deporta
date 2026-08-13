import pool from "../config/db.js";

export const crearComplejo = async (complejo) => {
  const {
    id_usuario,
    id_distrito,
    nombre,
    direccion,
    telefono,
    correo,
    ruc,
  } = complejo;

  const sql = `
    INSERT INTO COMPLEJO
    (id_usuario, id_distrito, nombre, direccion, telefono, correo, ruc)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const [info] = await pool.query(sql, [
    id_usuario,
    id_distrito,
    nombre,
    direccion,
    telefono,
    correo,
    ruc,
  ]);

  return { insertId: info.insertId, affectedRows: info.affectedRows };
};

export const obtenerComplejos = async (id_usuario) => {
  let sql = `
    SELECT *
    FROM COMPLEJO
  `;

  const valores = [];

  if (id_usuario) {
    sql += " WHERE id_usuario = ?";
    valores.push(id_usuario);
  }

  const [filas] = await pool.query(sql, valores);
  return filas;
};
