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

  const [resultado] = await pool.execute(sql, [
    id_usuario,
    id_distrito,
    nombre,
    direccion,
    telefono,
    correo,
    ruc,
  ]);

  return resultado;
};

export const obtenerComplejos = async () => {
  const sql = `
    SELECT *
    FROM COMPLEJO
  `;

  const [rows] = await pool.execute(sql);

  return rows;
};