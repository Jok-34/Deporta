import express from "express";
import { listarDeportes } from "../controllers/deporteController.js";

const router = express.Router();

router.get("/", listarDeportes);

export default router;