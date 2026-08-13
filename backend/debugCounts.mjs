import pool from './src/config/db.js';

const [[{ c: esp }]] = await pool.query('SELECT COUNT(*) AS c FROM ESPACIO_DEPORTIVO');
const [[{ c: comp }]] = await pool.query('SELECT COUNT(*) AS c FROM COMPLEJO');
const [[{ c: dep }]] = await pool.query('SELECT COUNT(*) AS c FROM DEPORTE');

const [rows] = await pool.query(`
SELECT
	e.idESPACIO_DEPORTIVO,
	e.nombre,
	e.precio,
	e.url_imagen,

	c.nombre AS complejo,
	c.telefono AS telefono,
	c.direccion AS detalles,

	d.nombre AS deporte,

	dis.nombre AS ubicacion,
	dis.nombre AS distrito

FROM ESPACIO_DEPORTIVO e

INNER JOIN COMPLEJO c
ON e.id_complejo = c.idCOMPLEJO

INNER JOIN DEPORTE d
ON e.id_deporte = d.idDEPORTE

INNER JOIN DISTRITO dis
ON c.id_distrito = dis.idDISTRITO
`);

const [allEsp] = await pool.query('SELECT * FROM ESPACIO_DEPORTIVO');
const [allComp] = await pool.query('SELECT * FROM COMPLEJO');
const [allDep] = await pool.query('SELECT * FROM DEPORTE');

console.log(JSON.stringify({ espacios: esp, complejos: comp, deportes: dep, rowsCount: rows.length, sample: rows[0] || null }, null, 2));
console.log(JSON.stringify({ allEspCount: allEsp.length, allEsp: allEsp.slice(0,5), allComp: allComp.slice(0,5), allDep: allDep.slice(0,5) }, null, 2));

await pool.end();
