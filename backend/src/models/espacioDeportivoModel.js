import pool from "../config/db.js";

export const crearEspacioDeportivo = async (espacio) => {
  const {
    id_complejo,
    id_deporte,
    nombre,
    precio_hora,
    imagen,
  } = espacio;

  const sql = `
    INSERT INTO ESPACIO_DEPORTIVO
    (id_complejo, id_deporte, nombre, precio, url_imagen)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [resultado] = await pool.execute(sql, [
    id_complejo,
    id_deporte,
    nombre,
    precio_hora,
    imagen,
  ]);

  return resultado;
};

export const obtenerEspaciosDeportivos = async () => {
  const sql = `
SELECT
    e.idESPACIO_DEPORTIVO,
    e.nombre,
    e.precio,
    e.url_imagen,

    c.nombre AS complejo,
    d.nombre AS deporte

FROM ESPACIO_DEPORTIVO e

INNER JOIN COMPLEJO c
ON e.id_complejo = c.idCOMPLEJO

INNER JOIN DEPORTE d
ON e.id_deporte = d.idDEPORTE
`;

  const [rows] = await pool.execute(sql);

  return rows;
};
export const obtenerEspaciosFiltrados = async (filtros) => {
  const { distrito, complejo, deporte, precio } = filtros;

  let sql = `
    SELECT
      e.idESPACIO_DEPORTIVO,
      e.nombre,
      e.precio,
      e.url_imagen,

      c.nombre AS complejo,
      d.nombre AS deporte,
      dis.nombre AS distrito

    FROM ESPACIO_DEPORTIVO e

    INNER JOIN COMPLEJO c
      ON e.id_complejo = c.idCOMPLEJO

    INNER JOIN DEPORTE d
      ON e.id_deporte = d.idDEPORTE

    INNER JOIN DISTRITO dis
      ON c.id_distrito = dis.idDISTRITO

    WHERE 1=1
  `;

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

  const [rows] = await pool.execute(sql, valores);

  return rows;
};