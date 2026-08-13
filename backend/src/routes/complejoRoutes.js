import express from "express";
import {
  registrarComplejo,
  listarComplejos,
} from "../controllers/complejoController.js";

const router = express.Router();

router.post("/register", registrarComplejo);

router.get("/", listarComplejos);

export default router;