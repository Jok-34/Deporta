import {
  crearComplejo,
  obtenerComplejos,
} from "../models/complejoModel.js";
import { responderErrorBD } from "../utils/errorBD.js";

export const registrarComplejo = async (req, res) => {
  try {
    const resultado = await crearComplejo(req.body);

    res.status(201).json({
      mensaje: "Complejo registrado correctamente",
      id: resultado.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        mensaje: "El correo o RUC ya se encuentra registrado.",
      });
    }

    return responderErrorBD(res, error, "Error al registrar el complejo");
  }
};

export const listarComplejos = async (req, res) => {
  try {
    const complejos = await obtenerComplejos(req.query.id_usuario);

    res.status(200).json(complejos);
  } catch (error) {
    return responderErrorBD(res, error, "Error al obtener los complejos");
  }
};