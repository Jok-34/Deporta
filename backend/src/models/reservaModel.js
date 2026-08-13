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

  const [info] = await pool.query(sql, [
    id_usuario,
    id_espacio_deportivo,
    fecha_hora_inicio,
    fecha_hora_fin,
    estado,
  ]);

  return { insertId: info.insertId, affectedRows: info.affectedRows };
};

// Todas las reservas hechas sobre los espacios deportivos de un
// administrador específico (para su Dashboard), con el nombre del
// cliente que reservó y el espacio reservado.
export const obtenerReservasPorAdmin = async (id_usuario) => {
  const sql = `
    SELECT
      r.idRESERVA,
      r.fecha_hora_inicio,
      r.fecha_hora_fin,
      r.estado,

      u.nombre AS cliente_nombre,
      u.apellido AS cliente_apellido,

      e.nombre AS espacio,

      p.estado AS estado_pago,
      p.monto AS monto_pagado

    FROM RESERVA r

    INNER JOIN ESPACIO_DEPORTIVO e
      ON r.id_espacio_deportivo = e.idESPACIO_DEPORTIVO

    INNER JOIN COMPLEJO c
      ON e.id_complejo = c.idCOMPLEJO

    INNER JOIN USUARIO u
      ON r.id_usuario = u.idUSUARIO

    LEFT JOIN PAGO p
      ON p.id_reserva = r.idRESERVA

    WHERE c.id_usuario = ?

    ORDER BY r.fecha_hora_inicio DESC
  `;

  const [filas] = await pool.query(sql, [id_usuario]);
  return filas;
};

// ¿El espacio deportivo tiene alguna reserva vigente (no cancelada)?
// Se usa para impedir que un administrador elimine un espacio que
// todavía tiene reservas activas.
export const tieneReservasActivas = async (id_espacio_deportivo) => {
  const [filas] = await pool.query(
    `
    SELECT idRESERVA
    FROM RESERVA
    WHERE id_espacio_deportivo = ?
      AND estado IN ('ACTIVA', 'PAGADA')
    LIMIT 1
    `,
    [id_espacio_deportivo]
  );

  return filas.length > 0;
};

export const actualizarEstadoReserva = async (id, estado) => {
  const [info] = await pool.query(
    "UPDATE RESERVA SET estado = ? WHERE idRESERVA = ?",
    [estado, id]
  );

  return { affectedRows: info.affectedRows };
};

// Historial de reservas de UN cliente (todas las reservas que él
// mismo hizo, en cualquier espacio deportivo).
export const obtenerReservasPorCliente = async (id_usuario) => {
  const sql = `
    SELECT
      r.idRESERVA,
      r.fecha_hora_inicio,
      r.fecha_hora_fin,
      r.estado,

      e.nombre AS espacio,
      e.url_imagen,

      c.nombre AS complejo,

      d.nombre AS deporte,

      p.estado AS estado_pago,
      p.monto AS monto_pagado

    FROM RESERVA r

    INNER JOIN ESPACIO_DEPORTIVO e
      ON r.id_espacio_deportivo = e.idESPACIO_DEPORTIVO

    INNER JOIN COMPLEJO c
      ON e.id_complejo = c.idCOMPLEJO

    INNER JOIN DEPORTE d
      ON e.id_deporte = d.idDEPORTE

    LEFT JOIN PAGO p
      ON p.id_reserva = r.idRESERVA

    WHERE r.id_usuario = ?

    ORDER BY r.fecha_hora_inicio DESC
  `;

  const [filas] = await pool.query(sql, [id_usuario]);
  return filas;
};

// Estadísticas del Dashboard, calculadas solo sobre los espacios
// deportivos que pertenecen al administrador dado.
export const obtenerEstadisticasAdmin = async (id_usuario) => {
  const [[{ reservasHoy }]] = await pool.query(
    `
    SELECT COUNT(*) AS reservasHoy
    FROM RESERVA r
    INNER JOIN ESPACIO_DEPORTIVO e ON r.id_espacio_deportivo = e.idESPACIO_DEPORTIVO
    INNER JOIN COMPLEJO c ON e.id_complejo = c.idCOMPLEJO
    WHERE c.id_usuario = ?
      AND r.estado <> 'CANCELADA'
      AND DATE(r.fecha_hora_inicio) = CURDATE()
    `,
    [id_usuario]
  );

  const [[{ reservasMes }]] = await pool.query(
    `
    SELECT COUNT(*) AS reservasMes
    FROM RESERVA r
    INNER JOIN ESPACIO_DEPORTIVO e ON r.id_espacio_deportivo = e.idESPACIO_DEPORTIVO
    INNER JOIN COMPLEJO c ON e.id_complejo = c.idCOMPLEJO
    WHERE c.id_usuario = ?
      AND r.estado <> 'CANCELADA'
      AND MONTH(r.fecha_hora_inicio) = MONTH(CURDATE())
      AND YEAR(r.fecha_hora_inicio) = YEAR(CURDATE())
    `,
    [id_usuario]
  );

  const [[{ ingresosMes }]] = await pool.query(
    `
    SELECT COALESCE(SUM(p.monto), 0) AS ingresosMes
    FROM PAGO p
    INNER JOIN RESERVA r ON p.id_reserva = r.idRESERVA
    INNER JOIN ESPACIO_DEPORTIVO e ON r.id_espacio_deportivo = e.idESPACIO_DEPORTIVO
    INNER JOIN COMPLEJO c ON e.id_complejo = c.idCOMPLEJO
    WHERE c.id_usuario = ?
      AND p.estado = 'PAGADO'
      AND MONTH(p.fecha_pago) = MONTH(CURDATE())
      AND YEAR(p.fecha_pago) = YEAR(CURDATE())
    `,
    [id_usuario]
  );

  const [[{ totalEspacios }]] = await pool.query(
    `
    SELECT COUNT(*) AS totalEspacios
    FROM ESPACIO_DEPORTIVO e
    INNER JOIN COMPLEJO c ON e.id_complejo = c.idCOMPLEJO
    WHERE c.id_usuario = ?
    `,
    [id_usuario]
  );

  const [[{ espaciosConReservaMes }]] = await pool.query(
    `
    SELECT COUNT(DISTINCT e.idESPACIO_DEPORTIVO) AS espaciosConReservaMes
    FROM ESPACIO_DEPORTIVO e
    INNER JOIN COMPLEJO c ON e.id_complejo = c.idCOMPLEJO
    INNER JOIN RESERVA r ON r.id_espacio_deportivo = e.idESPACIO_DEPORTIVO
    WHERE c.id_usuario = ?
      AND r.estado <> 'CANCELADA'
      AND MONTH(r.fecha_hora_inicio) = MONTH(CURDATE())
      AND YEAR(r.fecha_hora_inicio) = YEAR(CURDATE())
    `,
    [id_usuario]
  );

  const tasaOcupacion =
    totalEspacios > 0
      ? Math.round((espaciosConReservaMes / totalEspacios) * 100)
      : 0;

  return {
    reservasHoy,
    reservasMes,
    ingresosMes: Number(ingresosMes),
    tasaOcupacion,
    totalEspacios,
  };
};
// Verifica si el horario solicitado para un espacio deportivo ya está
// ocupado por CUALQUIER reserva vigente (de cualquier cliente) que se
// solape en el tiempo. Dos rangos se solapan si uno empieza antes de
// que el otro termine y termina después de que el otro empiece.
// Los estados ACTIVA y PAGADA bloquean el horario; CANCELADA no.
export const buscarConflictoHorario = async (reserva) => {
  const {
    id_espacio_deportivo,
    fecha_hora_inicio,
    fecha_hora_fin,
    excluir_id_reserva,
  } = reserva;

  let sql = `
    SELECT idRESERVA
    FROM RESERVA
    WHERE id_espacio_deportivo = ?
      AND estado IN ('ACTIVA', 'PAGADA', 'COMPLETADA')
      AND fecha_hora_inicio < ?
      AND fecha_hora_fin > ?
  `;

  const valores = [
    id_espacio_deportivo,
    fecha_hora_fin,
    fecha_hora_inicio,
  ];

  if (excluir_id_reserva) {
    sql += " AND idRESERVA <> ?";
    valores.push(excluir_id_reserva);
  }

  sql += " LIMIT 1";

  const [filas] = await pool.query(sql, valores);

  return filas.length > 0;
};
