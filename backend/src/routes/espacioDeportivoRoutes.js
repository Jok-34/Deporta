import express from "express";
import {
  registrarEspacioDeportivo,
  listarEspaciosDeportivos,
  listarEspaciosPorAdmin,
  editarEspacioDeportivo,
  borrarEspacioDeportivo,
} from "../controllers/espacioDeportivoController.js";
import { uploadImagenEspacio } from "../middleware/upload.js";

const router = express.Router();

router.post(
  "/register",
  uploadImagenEspacio.single("imagen"),
  registrarEspacioDeportivo
);

router.get("/", listarEspaciosDeportivos);

router.get("/admin/:id_usuario", listarEspaciosPorAdmin);

router.put(
  "/:id",
  uploadImagenEspacio.single("imagen"),
  editarEspacioDeportivo
);

router.delete("/:id", borrarEspacioDeportivo);

export default router;
