import pool from "../config/db.js";

export const crearPago = async (pago) => {
  const {
    id_reserva,
    id_metodo_pago,
    monto,
    fecha_pago,
    estado,
  } = pago;

  const sql = `
    INSERT INTO PAGO
    (
      id_reserva,
      id_metodo_pago,
      monto,
      fecha_pago,
      estado
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  const [info] = await pool.query(sql, [
    id_reserva,
    id_metodo_pago,
    monto,
    fecha_pago,
    estado,
  ]);

  return { insertId: info.insertId, affectedRows: info.affectedRows };
};
