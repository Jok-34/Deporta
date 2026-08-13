import dotenv from "dotenv";
import pool from "../src/config/db.js";
import { crearUsuario } from "../src/models/usuarioModel.js";

dotenv.config();

const usuarios = [
  {
    id_rol: 1,
    nombre: "Carlos",
    apellido: "Alvarez Ruiz",
    correo: "carlos.alvarez@deporta.pe",
    telefono: "987654321",
    contrasena: "Admin1234",
  },
  {
    id_rol: 1,
    nombre: "Mariana",
    apellido: "Castro Paredes",
    correo: "mariana.castro@deporta.pe",
    telefono: "986543210",
    contrasena: "Admin5678",
  },
  {
    id_rol: 2,
    nombre: "Andres",
    apellido: "Vasquez Quispe",
    correo: "andres.vasquez@gmail.com",
    telefono: "985432109",
    contrasena: "Cliente123",
  },
  {
    id_rol: 2,
    nombre: "Matilda",
    apellido: "Rodriguez Solis",
    correo: "matilda.rodriguez@hotmail.com",
    telefono: "984321098",
    contrasena: "Cliente456",
  },
  {
    id_rol: 2,
    nombre: "Jose",
    apellido: "Andrade Mamani",
    correo: "jose.andrade@outlook.com",
    telefono: "983210987",
    contrasena: "Cliente789",
  },
];

const seedUsuarios = async () => {
  console.log("========================================");
  console.log("  DEPORTA - Seed de 5 usuarios");
  console.log("========================================\n");

  try {
    const conexion = await pool.getConnection();
    console.log("✅ Conectado a MySQL\n");

    const creados = [];
    const existentes = [];

    for (const usr of usuarios) {
      try {
        const resultado = await crearUsuario(usr);
        console.log(`✔ Usuario creado: ${usr.correo}  (id=${resultado.insertId})`);
        creados.push({ ...usr, id: resultado.insertId });
      } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
          console.log(`⚠ Usuario ya existe: ${usr.correo}  (omitido)`);
          existentes.push(usr.correo);
        } else {
          console.log(`✘ Error en ${usr.correo}: ${error.message}`);
        }
      }
    }

    console.log("\n----------------------------------------");
    console.log(`Total creados:      ${creados.length}`);
    console.log(`Total omitidos:     ${existentes.length}`);
    console.log("----------------------------------------\n");

    console.log("📋 Credenciales de prueba (GUARDA ESTA LISTA):\n");

    [...creados, ...existentes.map((c) => usuarios.find((u) => u.correo === c))]
      .forEach((u) => {
        const rol = u.id_rol === 1 ? "ADMIN  " : "CLIENTE";
        console.log(`  [${rol}]  ${u.correo}`);
        console.log(`           clave : ${u.contrasena}`);
        console.log(`           nombre: ${u.nombre} ${u.apellido}\n`);
      });

    conexion.release();
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedUsuarios();
