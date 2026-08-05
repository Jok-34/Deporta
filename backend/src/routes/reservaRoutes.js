import express from "express";
import { registrarReserva } from "../controllers/reservaController.js";

const router = express.Router();

router.post("/register", registrarReserva);

export default router;