import express from "express";
import {
  listarUsuariosController,
  registrarUsuario,
  loginUsuario,
} from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/", listarUsuariosController);

router.post("/register", registrarUsuario);

router.post("/login", loginUsuario);

export default router;