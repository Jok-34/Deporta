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

  const [resultado] = await pool.execute(sql, [
    id_reserva,
    id_metodo_pago,
    monto,
    fecha_pago,
    estado,
  ]);

  return resultado;

};