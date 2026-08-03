import { obtenerDeportes } from "../models/deporteModel.js";

export const listarDeportes = async (req, res) => {
  try {
    const deportes = await obtenerDeportes();

    res.status(200).json(deportes);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener los deportes.",
    });
  }
};