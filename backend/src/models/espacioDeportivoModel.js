import pool from "../config/db.js";

export const crearEspacioDeportivo = async (espacio) => {
  const {
    id_complejo,
    id_deporte,
    nombre,
    precio_hora,
    imagen,
    estado,
    horario_apertura,
    horario_cierre,
    descripcion,
  } = espacio;

  const sql = `
    INSERT INTO ESPACIO_DEPORTIVO
    (id_complejo, id_deporte, nombre, precio, url_imagen, estado, horario_apertura, horario_cierre, descripcion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const [info] = await pool.query(sql, [
    id_complejo,
    id_deporte,
    nombre,
    precio_hora,
    imagen || null,
    estado || "Disponible",
    horario_apertura || "08:00:00",
    horario_cierre || "22:00:00",
    descripcion || null,
  ]);

  return { insertId: info.insertId, affectedRows: info.affectedRows };
};

const SELECT_ESPACIOS_BASE = `
    SELECT
      e.idESPACIO_DEPORTIVO,
      e.nombre,
      e.precio,
      e.url_imagen,
      e.estado,
      e.id_complejo,
      e.id_deporte,
      e.horario_apertura,
      e.horario_cierre,
      e.descripcion,

      c.nombre AS complejo,
      c.telefono AS telefono,
      c.direccion AS direccion_complejo,
      c.id_usuario AS id_usuario_admin,

      d.nombre AS deporte,

      dis.nombre AS ubicacion,
      dis.nombre AS distrito,

      10 AS aforo

    FROM ESPACIO_DEPORTIVO e

    INNER JOIN COMPLEJO c
      ON e.id_complejo = c.idCOMPLEJO

    INNER JOIN DEPORTE d
      ON e.id_deporte = d.idDEPORTE

    INNER JOIN DISTRITO dis
      ON c.id_distrito = dis.idDISTRITO
`;

export const obtenerEspaciosDeportivos = async () => {
  const [filas] = await pool.query(SELECT_ESPACIOS_BASE);
  return filas;
};

export const obtenerEspaciosFiltrados = async (filtros) => {
  const { distrito, complejo, deporte, precio, estado } = filtros;

  let sql = `${SELECT_ESPACIOS_BASE} WHERE 1=1`;

  const valores = [];

  if (distrito) {
    sql += " AND dis.idDISTRITO = ?";
    valores.push(distrito);
  }

  if (complejo) {
    sql += " AND c.idCOMPLEJO = ?";
    valores.push(complejo);
  }

  if (deporte) {
    sql += " AND d.idDEPORTE = ?";
    valores.push(deporte);
  }

  if (precio) {
    if (precio === "20-40") {
      sql += " AND e.precio BETWEEN 20 AND 40";
    } else if (precio === "40-60") {
      sql += " AND e.precio BETWEEN 40 AND 60";
    } else if (precio === "60+") {
      sql += " AND e.precio >= 60";
    }
  }

  if (estado) {
    sql += " AND e.estado = ?";
    valores.push(estado);
  }

  const [filas] = await pool.query(sql, valores);
  return filas;
};

// Espacios deportivos que pertenecen a los complejos de un
// administrador específico (para su Dashboard).
export const obtenerEspaciosPorAdmin = async (id_usuario) => {
  const sql = `${SELECT_ESPACIOS_BASE} WHERE c.id_usuario = ? ORDER BY e.idESPACIO_DEPORTIVO DESC`;

  const [filas] = await pool.query(sql, [id_usuario]);
  return filas;
};

export const obtenerEspacioPorId = async (id) => {
  const sql = `${SELECT_ESPACIOS_BASE} WHERE e.idESPACIO_DEPORTIVO = ?`;

  const [filas] = await pool.query(sql, [id]);
  return filas[0] || null;
};

export const actualizarEspacioDeportivo = async (id, datos) => {
  const campos = [];
  const valores = [];

  if (datos.nombre !== undefined) {
    campos.push("nombre = ?");
    valores.push(datos.nombre);
  }

  if (datos.id_deporte !== undefined && datos.id_deporte !== "") {
    campos.push("id_deporte = ?");
    valores.push(datos.id_deporte);
  }

  if (datos.precio_hora !== undefined && datos.precio_hora !== "") {
    campos.push("precio = ?");
    valores.push(datos.precio_hora);
  }

  if (datos.estado !== undefined && datos.estado !== "") {
    campos.push("estado = ?");
    valores.push(datos.estado);
  }

  if (datos.horario_apertura !== undefined && datos.horario_apertura !== "") {
    campos.push("horario_apertura = ?");
    valores.push(datos.horario_apertura);
  }

  if (datos.horario_cierre !== undefined && datos.horario_cierre !== "") {
    campos.push("horario_cierre = ?");
    valores.push(datos.horario_cierre);
  }

  if (datos.descripcion !== undefined) {
    campos.push("descripcion = ?");
    valores.push(datos.descripcion);
  }

  if (datos.imagen) {
    campos.push("url_imagen = ?");
    valores.push(datos.imagen);
  }

  if (campos.length === 0) {
    return { affectedRows: 0 };
  }

  valores.push(id);

  const sql = `
    UPDATE ESPACIO_DEPORTIVO
    SET ${campos.join(", ")}
    WHERE idESPACIO_DEPORTIVO = ?
  `;

  const [info] = await pool.query(sql, valores);
  return { affectedRows: info.affectedRows };
};

export const eliminarEspacioDeportivo = async (id) => {
  const [info] = await pool.query(
    "DELETE FROM ESPACIO_DEPORTIVO WHERE idESPACIO_DEPORTIVO = ?",
    [id]
  );

  return { affectedRows: info.affectedRows };
};
