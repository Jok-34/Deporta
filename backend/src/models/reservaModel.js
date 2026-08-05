import pool from "../config/db.js";

export const crearReserva = async (reserva) => {
  const {
    id_usuario,
    id_espacio_deportivo,
    fecha_hora_inicio,
    fecha_hora_fin,
    estado,
  } = reserva;

  const sql = `
    INSERT INTO RESERVA
    (
      id_usuario,
      id_espacio_deportivo,
      fecha_hora_inicio,
      fecha_hora_fin,
      estado
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  const [resultado] = await pool.execute(sql, [
    id_usuario,
    id_espacio_deportivo,
    fecha_hora_inicio,
    fecha_hora_fin,
    estado,
  ]);

  return resultado;
};