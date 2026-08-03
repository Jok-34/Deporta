import express from "express";
import { listarDistritos } from "../controllers/distritoController.js";

const router = express.Router();

router.get("/", listarDistritos);

export default router;