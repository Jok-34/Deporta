import express from "express";
import { registrarPago } from "../controllers/pagoController.js";

const router = express.Router();

router.post("/register", registrarPago);

export default router;