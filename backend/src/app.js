import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import complejoRoutes from "./routes/complejoRoutes.js";
import distritoRoutes from "./routes/distritoRoutes.js";
import espacioDeportivoRoutes from "./routes/espacioDeportivoRoutes.js";
import deporteRoutes from "./routes/deporteRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
import pagoRoutes from "./routes/pagoRoutes.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json());

// Archivos subidos (imágenes de espacios deportivos) servidos como
// estáticos: http://localhost:3000/uploads/espacios/<archivo>
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/complejos", complejoRoutes);
app.use("/api/distritos", distritoRoutes);
app.use("/api/espacios", espacioDeportivoRoutes);
app.use("/api/deportes", deporteRoutes);
app.use("/api/reservas", reservaRoutes);
app.use("/api/pagos", pagoRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    mensaje: "Backend de Deporta funcionando correctamente 🚀",
  });
});

// Ruta de depuración para contar filas en tablas clave
app.get("/debug/counts", async (req, res) => {
  try {
    const [[{ c: esp }]] = await pool.query("SELECT COUNT(*) AS c FROM ESPACIO_DEPORTIVO");
    const [[{ c: comp }]] = await pool.query("SELECT COUNT(*) AS c FROM COMPLEJO");
    const [[{ c: dep }]] = await pool.query("SELECT COUNT(*) AS c FROM DEPORTE");
    res.json({ espacios: esp, complejos: comp, deportes: dep });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Manejo de errores de subida de archivos (multer) para que el
// frontend reciba un mensaje claro en vez de un error genérico 500.
app.use((error, req, res, next) => {
  if (error && error.name === "MulterError") {
    return res.status(400).json({
      mensaje:
        error.code === "LIMIT_FILE_SIZE"
          ? "La imagen supera el tamaño máximo permitido (5MB)."
          : `Error al subir la imagen: ${error.message}`,
    });
  }

  if (error) {
    return res.status(400).json({ mensaje: error.message });
  }

  next();
});

try {
  const connection = await pool.getConnection();
  console.log("✅ Conectado a MySQL correctamente");
  connection.release();
} catch (error) {
  console.error("❌ Error al conectar con MySQL:", error.message);
}

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});