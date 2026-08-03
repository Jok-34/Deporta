import pool from "../config/db.js";

export const obtenerDeportes = async () => {
  const sql = `
    SELECT *
    FROM DEPORTE
  `;

  const [rows] = await pool.execute(sql);

  return rows;
};