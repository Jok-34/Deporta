import pool from "../config/db.js";

export const obtenerDistritos = async () => {
  const sql = `
    SELECT *
    FROM DISTRITO
    ORDER BY nombre
  `;

  const [filas] = await pool.query(sql);
  return filas;
};
