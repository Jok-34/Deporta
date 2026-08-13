import pool from "../config/db.js";

export const obtenerDeportes = async () => {
  const sql = `
    SELECT *
    FROM DEPORTE
  `;

  const [filas] = await pool.query(sql);
  return filas;
};
