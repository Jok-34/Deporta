import {
  crearComplejo,
  obtenerComplejos,
} from "../models/complejoModel.js";

export const registrarComplejo = async (req, res) => {
  try {
    const resultado = await crearComplejo(req.body);

    res.status(201).json({
      mensaje: "Complejo registrado correctamente",
      id: resultado.insertId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al registrar el complejo",
    });
  }
};

export const listarComplejos = async (req, res) => {
  try {
    const complejos = await obtenerComplejos();

    res.status(200).json(complejos);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener los complejos",
    });
  }
};