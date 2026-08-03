import { obtenerDistritos } from "../models/distritoModel.js";

export const listarDistritos = async (req, res) => {
  try {
    const distritos = await obtenerDistritos();

    res.status(200).json(distritos);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener los distritos",
    });
  }
};