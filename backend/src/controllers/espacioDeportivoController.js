import {
  crearEspacioDeportivo,
  obtenerEspaciosDeportivos,
  obtenerEspaciosFiltrados,
} from "../models/espacioDeportivoModel.js";

export const registrarEspacioDeportivo = async (req, res) => {
  try {
    const resultado = await crearEspacioDeportivo(req.body);

    res.status(201).json({
      mensaje: "Espacio deportivo registrado correctamente",
      id: resultado.insertId,
    });
  } catch (error) {
    console.error(error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        mensaje: "El espacio deportivo ya existe.",
      });
    }

    res.status(500).json({
      mensaje: "Error al registrar el espacio deportivo.",
    });
  }
};

export const listarEspaciosDeportivos = async (req, res) => {
  try {

    const {
      distrito,
      complejo,
      deporte,
      precio,
    } = req.query;

    let espacios;

    if (distrito || complejo || deporte || precio) {

      espacios = await obtenerEspaciosFiltrados({
        distrito,
        complejo,
        deporte,
        precio,
      });

    } else {

      espacios = await obtenerEspaciosDeportivos();

    }

    res.status(200).json(espacios);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al obtener los espacios deportivos.",
    });
  }
};