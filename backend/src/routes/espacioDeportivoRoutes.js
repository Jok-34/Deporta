import express from "express";
import {
  registrarEspacioDeportivo,
  listarEspaciosDeportivos,
} from "../controllers/espacioDeportivoController.js";

const router = express.Router();

router.post("/register", registrarEspacioDeportivo);
router.get("/", listarEspaciosDeportivos);

export default router;