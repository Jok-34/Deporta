import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const {
  DB_HOST = "localhost",
  DB_PORT = 3306,
  DB_USER = "root",
  DB_PASSWORD = "",
  DB_NAME = "deporta",
} = process.env;

// 1) Conexión temporal sin seleccionar base de datos, solo para
//    poder crear la base de datos si todavía no existe.
const conexionInicial = await mysql.createConnection({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
});

await conexionInicial.query(
  `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`
   CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
);

await conexionInicial.end();

// 2) Pool de conexiones real, ya apuntando a la base de datos.
const pool = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

const crearTablas = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS DISTRITO (
      idDISTRITO INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL
    ) ENGINE=InnoDB;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS DEPORTE (
      idDEPORTE INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL
    ) ENGINE=InnoDB;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS METODO_PAGO (
      idMETODO_PAGO INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL
    ) ENGINE=InnoDB;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS USUARIO (
      idUSUARIO INT AUTO_INCREMENT PRIMARY KEY,
      id_rol INT NOT NULL DEFAULT 2,
      nombre VARCHAR(100) NOT NULL,
      apellido VARCHAR(100) NOT NULL,
      correo VARCHAR(150) NOT NULL UNIQUE,
      telefono VARCHAR(20),
      contrasena VARCHAR(255) NOT NULL
    ) ENGINE=InnoDB;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS COMPLEJO (
      idCOMPLEJO INT AUTO_INCREMENT PRIMARY KEY,
      id_usuario INT NOT NULL,
      id_distrito INT NOT NULL,
      nombre VARCHAR(150) NOT NULL,
      direccion VARCHAR(200) NOT NULL,
      telefono VARCHAR(20),
      correo VARCHAR(150) UNIQUE,
      ruc VARCHAR(20) UNIQUE,
      CONSTRAINT fk_complejo_usuario FOREIGN KEY (id_usuario)
        REFERENCES USUARIO(idUSUARIO) ON DELETE CASCADE,
      CONSTRAINT fk_complejo_distrito FOREIGN KEY (id_distrito)
        REFERENCES DISTRITO(idDISTRITO) ON DELETE RESTRICT
    ) ENGINE=InnoDB;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS ESPACIO_DEPORTIVO (
      idESPACIO_DEPORTIVO INT AUTO_INCREMENT PRIMARY KEY,
      id_complejo INT NOT NULL,
      id_deporte INT NOT NULL,
      nombre VARCHAR(150) NOT NULL,
      precio DECIMAL(10,2) NOT NULL,
      url_imagen VARCHAR(255),
      estado VARCHAR(20) NOT NULL DEFAULT 'Disponible',
      horario_apertura TIME NOT NULL DEFAULT '08:00:00',
      horario_cierre TIME NOT NULL DEFAULT '22:00:00',
      descripcion VARCHAR(500),
      CONSTRAINT fk_espacio_complejo FOREIGN KEY (id_complejo)
        REFERENCES COMPLEJO(idCOMPLEJO) ON DELETE CASCADE,
      CONSTRAINT fk_espacio_deporte FOREIGN KEY (id_deporte)
        REFERENCES DEPORTE(idDEPORTE) ON DELETE RESTRICT,
      CONSTRAINT uq_espacio_nombre UNIQUE (id_complejo, nombre)
    ) ENGINE=InnoDB;
  `);

  // Por si la tabla ya existía de una versión anterior sin estas
  // columnas (migración suave, no falla si ya existen).
  const migracionesEspacio = [
    "ADD COLUMN estado VARCHAR(20) NOT NULL DEFAULT 'Disponible'",
    "ADD COLUMN horario_apertura TIME NOT NULL DEFAULT '08:00:00'",
    "ADD COLUMN horario_cierre TIME NOT NULL DEFAULT '22:00:00'",
    "ADD COLUMN descripcion VARCHAR(500)",
  ];

  for (const cambio of migracionesEspacio) {
    try {
      await pool.query(`ALTER TABLE ESPACIO_DEPORTIVO ${cambio}`);
    } catch (error) {
      if (error.code !== "ER_DUP_FIELDNAME") {
        throw error;
      }
    }
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS RESERVA (
      idRESERVA INT AUTO_INCREMENT PRIMARY KEY,
      id_usuario INT NOT NULL,
      id_espacio_deportivo INT NOT NULL,
      fecha_hora_inicio DATETIME NOT NULL,
      fecha_hora_fin DATETIME NOT NULL,
      estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVA',
      CONSTRAINT fk_reserva_usuario FOREIGN KEY (id_usuario)
        REFERENCES USUARIO(idUSUARIO) ON DELETE CASCADE,
      CONSTRAINT fk_reserva_espacio FOREIGN KEY (id_espacio_deportivo)
        REFERENCES ESPACIO_DEPORTIVO(idESPACIO_DEPORTIVO) ON DELETE CASCADE
    ) ENGINE=InnoDB;
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS PAGO (
      idPAGO INT AUTO_INCREMENT PRIMARY KEY,
      id_reserva INT NOT NULL,
      id_metodo_pago INT NOT NULL,
      monto DECIMAL(10,2) NOT NULL,
      fecha_pago DATETIME NOT NULL,
      estado VARCHAR(20) NOT NULL DEFAULT 'PAGADO',
      CONSTRAINT fk_pago_reserva FOREIGN KEY (id_reserva)
        REFERENCES RESERVA(idRESERVA) ON DELETE CASCADE,
      CONSTRAINT fk_pago_metodo FOREIGN KEY (id_metodo_pago)
        REFERENCES METODO_PAGO(idMETODO_PAGO) ON DELETE RESTRICT
    ) ENGINE=InnoDB;
  `);
};

const sembrarDatosIniciales = async () => {
  const [[{ c: hayDistritos }]] = await pool.query(
    "SELECT COUNT(*) AS c FROM DISTRITO"
  );

  if (hayDistritos === 0) {
    const distritos = [
      "Ancón", "Ate", "Barranco", "Breña", "Carabayllo", "Chaclacayo",
      "Chorrillos", "Cieneguilla", "Comas", "El Agustino", "Independencia",
      "Jesús María", "La Molina", "La Victoria", "Lince", "Los Olivos",
      "Lurigancho-Chosica", "Lurín", "Magdalena del Mar", "Miraflores",
      "Pueblo Libre", "Puente Piedra", "Rímac", "San Borja", "San Isidro",
      "San Juan de Lurigancho", "San Juan de Miraflores", "San Luis",
      "San Martín de Porres", "San Miguel", "Santa Anita",
      "Santa María del Mar", "Santa Rosa", "Santiago de Surco", "Surquillo",
      "Villa El Salvador", "Villa María del Triunfo",
    ];

    for (const nombre of distritos) {
      await pool.query("INSERT INTO DISTRITO (nombre) VALUES (?)", [nombre]);
    }
  }

  const [[{ c: hayDeportes }]] = await pool.query(
    "SELECT COUNT(*) AS c FROM DEPORTE"
  );

  if (hayDeportes === 0) {
    const deportes = [
      "Fútbol", "Fútbol sala", "Básquet", "Vóley", "Tenis", "Pádel",
      "Squash", "Bádminton", "Handball", "Atletismo", "Gimnasia", "Natación",
    ];

    for (const nombre of deportes) {
      await pool.query("INSERT INTO DEPORTE (nombre) VALUES (?)", [nombre]);
    }
  }

  const [[{ c: hayMetodos }]] = await pool.query(
    "SELECT COUNT(*) AS c FROM METODO_PAGO"
  );

  if (hayMetodos === 0) {
    const metodos = [
      "Efectivo", "Transferencia", "Tarjeta de débito",
      "Tarjeta de crédito", "Yape", "Plin",
    ];

    for (const nombre of metodos) {
      await pool.query("INSERT INTO METODO_PAGO (nombre) VALUES (?)", [nombre]);
    }
  }
};

export const initDB = async () => {
  await crearTablas();
  await sembrarDatosIniciales();
};

await initDB();

export default pool;
