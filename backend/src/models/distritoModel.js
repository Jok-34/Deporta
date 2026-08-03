import pool from "../config/db.js";

export const obtenerDistritos = async () => {
  const sql = `
    SELECT *
    FROM DISTRITO
    ORDER BY nombre;
  `;

  const [rows] = await pool.execute(sql);

  return rows;
};