import express from "express";
import {
  registrarReserva,
  listarReservasPorAdmin,
  listarReservasPorCliente,
  cambiarEstadoReserva,
  listarEstadisticasAdmin,
} from "../controllers/reservaController.js";

const router = express.Router();

router.post("/register", registrarReserva);

router.get("/admin/:id_usuario", listarReservasPorAdmin);
router.get("/admin/:id_usuario/estadisticas", listarEstadisticasAdmin);
router.get("/cliente/:id_usuario", listarReservasPorCliente);

router.put("/:id/estado", cambiarEstadoReserva);

export default router;
