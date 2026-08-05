import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import complejoRoutes from "./routes/complejoRoutes.js";
import distritoRoutes from "./routes/distritoRoutes.js";
import espacioDeportivoRoutes from "./routes/espacioDeportivoRoutes.js";
import deporteRoutes from "./routes/deporteRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/complejos", complejoRoutes);
app.use("/api/distritos", distritoRoutes);
app.use("/api/espacios", espacioDeportivoRoutes);
app.use("/api/deportes", deporteRoutes);
app.use("/api/reservas", reservaRoutes);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    mensaje: "Backend de Deporta funcionando correctamente 🚀",
  });
});

try {
  const connection = await pool.getConnection();
  console.log("✅ Conectado a MySQL");
  connection.release();
} catch (error) {
  console.error("❌ Error al conectar con MySQL:", error.message);
}

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});