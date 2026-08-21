import dotenv from "dotenv";
import pool from "../src/config/db.js";
import { crearUsuario, buscarUsuarioPorCorreo } from "../src/models/usuarioModel.js";
import { crearComplejo, obtenerComplejos } from "../src/models/complejoModel.js";
import { crearEspacioDeportivo } from "../src/models/espacioDeportivoModel.js";
import { crearReserva } from "../src/models/reservaModel.js";
import { crearPago } from "../src/models/pagoModel.js";

dotenv.config();

// ------------------------------------------------------------------
// Datos de prueba. Los distritos, deportes y métodos de pago ya se
// siembran automáticamente al levantar el servidor (config/db.js),
// así que aquí solo los buscamos por nombre en vez de reinsertarlos.
// ------------------------------------------------------------------

const admins = [
  {
    id_rol: 1,
    nombre: "Jefferson",
    apellido: "Pinto",
    correo: "jefferson.pinto@gmail.com",
    telefono: "999111222",
    contrasena: "Admin2026",
  },
  {
    id_rol: 1,
    nombre: "Carla",
    apellido: "Mendoza",
    correo: "carla.mendoza@gmail.com",
    telefono: "999222333",
    contrasena: "Admin2027",
  },
  {
    id_rol: 1,
    nombre: "Renzo",
    apellido: "Ortega",
    correo: "renzo.ortega@gmail.com",
    telefono: "999333444",
    contrasena: "Admin2028",
  },
];

const clientes = [
  {
    id_rol: 2,
    nombre: "Luis",
    apellido: "Fernández",
    correo: "luis.fernandez@gmail.com",
    telefono: "987222333",
    contrasena: "Cliente01",
  },
  {
    id_rol: 2,
    nombre: "María",
    apellido: "Gonzales",
    correo: "maria.gonzales@gmail.com",
    telefono: "986444555",
    contrasena: "Cliente02",
  },
  {
    id_rol: 2,
    nombre: "José",
    apellido: "Ramírez",
    correo: "jose.ramirez@gmail.com",
    telefono: "985666777",
    contrasena: "Cliente03",
  },
  {
    id_rol: 2,
    nombre: "Andrea",
    apellido: "Salazar",
    correo: "andrea.salazar@gmail.com",
    telefono: "984888999",
    contrasena: "Cliente04",
  },
  {
    id_rol: 2,
    nombre: "Diego",
    apellido: "Chávez",
    correo: "diego.chavez@gmail.com",
    telefono: "983777666",
    contrasena: "Cliente05",
  },
];

// distrito y complejo se resuelven después (necesitan el id del admin dueño)
const complejosBase = [
  {
    nombre: "Complejo Deportivo La 12",
    telefono: "987654321",
    distrito: "Santiago de Surco",
    correo: "contacto@la12.pe",
    ruc: "20601234567",
    direccion: "Av. Caminos del Inca 2450",
    adminCorreo: "jefferson.pinto@gmail.com",
  },
  {
    nombre: "Complejo Deportivo Depor Plaza",
    telefono: "985123456",
    distrito: "San Borja",
    correo: "informes@deporplaza.pe",
    ruc: "20607654321",
    direccion: "Av. Aviación 3100",
    adminCorreo: "carla.mendoza@gmail.com",
  },
  {
    nombre: "Complejo Deportivo Costa Verde",
    telefono: "984111222",
    distrito: "Miraflores",
    correo: "reservas@costaverde.pe",
    ruc: "20609876543",
    direccion: "Malecón de la Marina",
    adminCorreo: "renzo.ortega@gmail.com",
  },
];

// espacios: dos por complejo, usando deportes que ya existen en DEPORTE
const espaciosBase = [
  {
    complejoNombre: "Complejo Deportivo La 12",
    nombre: "Cancha Sintética Surco",
    deporte: "Fútbol",
    precio_hora: 80.0,
    descripcion: "Grass sintético de última generación, iluminación LED.",
    imagen: "/uploads/espacios/futbol.png",
    horario_apertura: "08:00:00",
    horario_cierre: "23:00:00",
  },
  {
    complejoNombre: "Complejo Deportivo La 12",
    nombre: "Cancha Fulbito Techada",
    deporte: "Fútbol sala",
    precio_hora: 55.0,
    descripcion: "Cancha techada, ideal para lluvia o sol fuerte.",
    imagen: "/uploads/espacios/futbol2.png",
    horario_apertura: "08:00:00",
    horario_cierre: "22:00:00",
  },
  {
    complejoNombre: "Complejo Deportivo Depor Plaza",
    nombre: "Cancha de Vóley San Borja",
    deporte: "Vóley",
    precio_hora: 60.0,
    descripcion: "Piso deportivo de madera, redes nuevas.",
    imagen: "/uploads/espacios/voley.png",
    horario_apertura: "09:00:00",
    horario_cierre: "21:00:00",
  },
  {
    complejoNombre: "Complejo Deportivo Depor Plaza",
    nombre: "Cancha de Bádminton Plaza",
    deporte: "Bádminton",
    precio_hora: 35.0,
    descripcion: "Dos mallas profesionales, piso antideslizante.",
    imagen: "/uploads/espacios/tenis2.png",
    horario_apertura: "09:00:00",
    horario_cierre: "21:00:00",
  },
  {
    complejoNombre: "Complejo Deportivo Costa Verde",
    nombre: "Cancha de Básquet Miraflores",
    deporte: "Básquet",
    precio_hora: 75.0,
    descripcion: "Canastas profesionales, frente al mar.",
    imagen: "/uploads/espacios/basket.png",
    horario_apertura: "07:00:00",
    horario_cierre: "22:00:00",
  },
  {
    complejoNombre: "Complejo Deportivo Costa Verde",
    nombre: "Cancha de Tenis Malecón",
    deporte: "Tenis",
    precio_hora: 65.0,
    descripcion: "Superficie dura, malla profesional.",
    imagen: "/uploads/espacios/tenis.png",
    horario_apertura: "07:00:00",
    horario_cierre: "20:00:00",
  },
];

// reservas de ejemplo: se resuelven contra los clientes/espacios ya
// creados. estadoPago === null significa que se queda "ACTIVA" (sin
// pagar todavía); si tiene metodoPago, se crea también su PAGO y la
// reserva pasa a "PAGADA" (igual que hace tu flujo real de la app).
const reservasBase = [
  {
    clienteCorreo: "luis.fernandez@gmail.com",
    espacioNombre: "Cancha Sintética Surco",
    fecha_hora_inicio: "2026-08-15 18:00:00",
    fecha_hora_fin: "2026-08-15 20:00:00",
    horas: 2,
    metodoPago: "Yape",
  },
  {
    clienteCorreo: "jose.ramirez@gmail.com",
    espacioNombre: "Cancha de Básquet Miraflores",
    fecha_hora_inicio: "2026-08-16 19:00:00",
    fecha_hora_fin: "2026-08-16 20:30:00",
    horas: 1.5,
    metodoPago: "Tarjeta de crédito",
  },
  {
    clienteCorreo: "maria.gonzales@gmail.com",
    espacioNombre: "Cancha de Vóley San Borja",
    fecha_hora_inicio: "2026-08-17 16:00:00",
    fecha_hora_fin: "2026-08-17 17:00:00",
    horas: 1,
    metodoPago: "Plin",
  },
  {
    clienteCorreo: "andrea.salazar@gmail.com",
    espacioNombre: "Cancha Fulbito Techada",
    fecha_hora_inicio: "2026-08-18 20:00:00",
    fecha_hora_fin: "2026-08-18 22:00:00",
    horas: 2,
    metodoPago: null, // se queda ACTIVA, sin pagar (para probar ese caso)
  },
  {
    clienteCorreo: "diego.chavez@gmail.com",
    espacioNombre: "Cancha de Tenis Malecón",
    fecha_hora_inicio: "2026-08-19 09:00:00",
    fecha_hora_fin: "2026-08-19 10:00:00",
    horas: 1,
    metodoPago: "Efectivo",
  },
];

const idPorNombre = async (tabla, columnaId, nombre) => {
  const [filas] = await pool.query(
    `SELECT ${columnaId} AS id FROM ${tabla} WHERE nombre = ? LIMIT 1`,
    [nombre]
  );

  if (filas.length === 0) {
    throw new Error(`No se encontró "${nombre}" en la tabla ${tabla}.`);
  }

  return filas[0].id;
};

const crearUsuarioSiNoExiste = async (usuario) => {
  const existentes = await buscarUsuarioPorCorreo(usuario.correo);

  if (existentes.length > 0) {
    console.log(`⚠ Usuario ya existe: ${usuario.correo} (omitido)`);
    return existentes[0].idUSUARIO;
  }

  const resultado = await crearUsuario(usuario);
  console.log(`✔ Usuario creado: ${usuario.correo} (id=${resultado.insertId})`);
  return resultado.insertId;
};

const seed = async () => {
  console.log("========================================");
  console.log("  DEPORTA - Seed completo de datos de prueba");
  console.log("========================================\n");

  try {
    await pool.getConnection().then((c) => c.release());
    console.log("✅ Conectado a MySQL\n");

    // 1) Usuarios (admins + clientes), contraseñas hasheadas por crearUsuario
    const idPorCorreo = {};

    for (const admin of admins) {
      idPorCorreo[admin.correo] = await crearUsuarioSiNoExiste(admin);
    }

    for (const cliente of clientes) {
      idPorCorreo[cliente.correo] = await crearUsuarioSiNoExiste(cliente);
    }

    // 2) Complejos deportivos (uno por admin)
    const idComplejoPorNombre = {};

    for (const c of complejosBase) {
      const complejosExistentes = await obtenerComplejos(
        idPorCorreo[c.adminCorreo]
      );

      const yaExiste = complejosExistentes.find(
        (existente) => existente.nombre === c.nombre
      );

      if (yaExiste) {
        console.log(`⚠ Complejo ya existe: ${c.nombre} (omitido)`);
        idComplejoPorNombre[c.nombre] = yaExiste.idCOMPLEJO;
        continue;
      }

      const idDistrito = await idPorNombre("DISTRITO", "idDISTRITO", c.distrito);

      const resultado = await crearComplejo({
        id_usuario: idPorCorreo[c.adminCorreo],
        id_distrito: idDistrito,
        nombre: c.nombre,
        direccion: c.direccion,
        telefono: c.telefono,
        correo: c.correo,
        ruc: c.ruc,
      });

      console.log(`✔ Complejo creado: ${c.nombre} (id=${resultado.insertId})`);
      idComplejoPorNombre[c.nombre] = resultado.insertId;
    }

    // 3) Espacios deportivos (dos por complejo)
    const idEspacioPorNombre = {};

    for (const e of espaciosBase) {
      const [existente] = await pool.query(
        "SELECT idESPACIO_DEPORTIVO FROM ESPACIO_DEPORTIVO WHERE nombre = ? AND id_complejo = ?",
        [e.nombre, idComplejoPorNombre[e.complejoNombre]]
      );

      if (existente.length > 0) {
        console.log(`⚠ Espacio ya existe: ${e.nombre} (omitido)`);
        idEspacioPorNombre[e.nombre] = existente[0].idESPACIO_DEPORTIVO;
        continue;
      }

      const idDeporte = await idPorNombre("DEPORTE", "idDEPORTE", e.deporte);

      const resultado = await crearEspacioDeportivo({
        id_complejo: idComplejoPorNombre[e.complejoNombre],
        id_deporte: idDeporte,
        nombre: e.nombre,
        precio_hora: e.precio_hora,
        imagen: e.imagen,
        estado: "Disponible",
        horario_apertura: e.horario_apertura,
        horario_cierre: e.horario_cierre,
        descripcion: e.descripcion,
      });

      console.log(`✔ Espacio creado: ${e.nombre} (id=${resultado.insertId})`);
      idEspacioPorNombre[e.nombre] = resultado.insertId;
    }

    // 4) Reservas (+ pagos cuando corresponde)
    for (const r of reservasBase) {
      const [existente] = await pool.query(
        `SELECT idRESERVA FROM RESERVA
         WHERE id_usuario = ? AND id_espacio_deportivo = ? AND fecha_hora_inicio = ?`,
        [
          idPorCorreo[r.clienteCorreo],
          idEspacioPorNombre[r.espacioNombre],
          r.fecha_hora_inicio,
        ]
      );

      if (existente.length > 0) {
        console.log(
          `⚠ Reserva ya existe: ${r.clienteCorreo} → ${r.espacioNombre} (omitida)`
        );
        continue;
      }

      const resultadoReserva = await crearReserva({
        id_usuario: idPorCorreo[r.clienteCorreo],
        id_espacio_deportivo: idEspacioPorNombre[r.espacioNombre],
        fecha_hora_inicio: r.fecha_hora_inicio,
        fecha_hora_fin: r.fecha_hora_fin,
        estado: r.metodoPago ? "PAGADA" : "ACTIVA",
      });

      console.log(
        `✔ Reserva creada: ${r.clienteCorreo} → ${r.espacioNombre} (id=${resultadoReserva.insertId})`
      );

      if (r.metodoPago) {
        const idMetodoPago = await idPorNombre(
          "METODO_PAGO",
          "idMETODO_PAGO",
          r.metodoPago
        );

        // Buscamos el precio del espacio para calcular el monto igual
        // que lo hace el frontend (precio_hora * horas).
        const [[espacio]] = await pool.query(
          "SELECT precio FROM ESPACIO_DEPORTIVO WHERE idESPACIO_DEPORTIVO = ?",
          [idEspacioPorNombre[r.espacioNombre]]
        );

        const monto = Number(espacio.precio) * Number(r.horas);

        await crearPago({
          id_reserva: resultadoReserva.insertId,
          id_metodo_pago: idMetodoPago,
          monto,
          fecha_pago: r.fecha_hora_inicio,
          estado: "PAGADO",
        });

        console.log(`   ↳ Pago registrado: S/ ${monto} (${r.metodoPago})`);
      }
    }

    console.log("\n----------------------------------------");
    console.log("Seed completo terminado con éxito.");
    console.log("----------------------------------------\n");

    console.log("📋 Credenciales de prueba (GUARDA ESTA LISTA):\n");

    [...admins, ...clientes].forEach((u) => {
      const rol = u.id_rol === 1 ? "ADMIN  " : "CLIENTE";
      console.log(`  [${rol}]  ${u.correo}`);
      console.log(`           clave : ${u.contrasena}`);
      console.log(`           nombre: ${u.nombre} ${u.apellido}\n`);
    });

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seed();
