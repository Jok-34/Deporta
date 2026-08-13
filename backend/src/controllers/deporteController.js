import { obtenerDeportes } from "../models/deporteModel.js";
import { responderErrorBD } from "../utils/errorBD.js";

export const listarDeportes = async (req, res) => {
  try {
    const deportes = await obtenerDeportes();

    res.status(200).json(deportes);
  } catch (error) {
    return responderErrorBD(res, error, "Error al obtener los deportes.");
  }
};