import pool from './src/config/db.js';

// Ajusta id_complejo para las filas sembradas: 1..5 -> 1, 6..8 -> 2, 9..12 -> 3
try {
  await pool.query("UPDATE ESPACIO_DEPORTIVO SET id_complejo = 1 WHERE idESPACIO_DEPORTIVO BETWEEN 1 AND 5");
  await pool.query("UPDATE ESPACIO_DEPORTIVO SET id_complejo = 2 WHERE idESPACIO_DEPORTIVO BETWEEN 6 AND 8");
  await pool.query("UPDATE ESPACIO_DEPORTIVO SET id_complejo = 3 WHERE idESPACIO_DEPORTIVO BETWEEN 9 AND 12");
  console.log('Updated ESPACIO_DEPORTIVO id_complejo for seed rows');
} catch (err) {
  console.error('Error updating:', err);
} finally {
  await pool.end();
}
