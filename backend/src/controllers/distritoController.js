import { obtenerDistritos } from "../models/distritoModel.js";
import { responderErrorBD } from "../utils/errorBD.js";

export const listarDistritos = async (req, res) => {
  try {
    const distritos = await obtenerDistritos();

    res.status(200).json(distritos);
  } catch (error) {
    return responderErrorBD(res, error, "Error al obtener los distritos");
  }
};