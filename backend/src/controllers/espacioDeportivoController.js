import {
  crearEspacioDeportivo,
  obtenerEspaciosDeportivos,
  obtenerEspaciosFiltrados,
  obtenerEspaciosPorAdmin,
  obtenerEspacioPorId,
  actualizarEspacioDeportivo,
  eliminarEspacioDeportivo,
} from "../models/espacioDeportivoModel.js";
import { tieneReservasActivas } from "../models/reservaModel.js";
import { responderErrorBD } from "../utils/errorBD.js";

// Construye la ruta pública de la imagen subida (si el usuario subió
// un archivo). Si no subió archivo, respeta una URL escrita a mano
// en el campo "imagen" (compatibilidad hacia atrás).
const rutaImagenSubida = (req) => {
  if (req.file) {
    return `/uploads/espacios/${req.file.filename}`;
  }

  return req.body.imagen || null;
};

export const registrarEspacioDeportivo = async (req, res) => {
  try {

    const { id_complejo, id_deporte, nombre, precio_hora } = req.body;

    if (!id_complejo || !id_deporte || !nombre || !precio_hora) {
      return res.status(400).json({
        mensaje:
          "Completa complejo, deporte, nombre y precio para registrar el espacio.",
      });
    }

    const resultado = await crearEspacioDeportivo({
      id_complejo,
      id_deporte,
      nombre,
      precio_hora,
      imagen: rutaImagenSubida(req),
      estado: "Disponible",
      horario_apertura: req.body.horario_apertura,
      horario_cierre: req.body.horario_cierre,
      descripcion: req.body.descripcion,
    });

    res.status(201).json({
      mensaje: "Espacio deportivo registrado correctamente",
      id: resultado.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        mensaje: "Ya tienes un espacio deportivo con ese nombre en este complejo.",
      });
    }

    return responderErrorBD(
      res,
      error,
      "Error al registrar el espacio deportivo."
    );
  }
};

export const listarEspaciosDeportivos = async (req, res) => {
  try {

    const {
      distrito,
      complejo,
      deporte,
      precio,
      estado,
    } = req.query;

    let espacios;

    if (distrito || complejo || deporte || precio || estado) {

      espacios = await obtenerEspaciosFiltrados({
        distrito,
        complejo,
        deporte,
        precio,
        estado,
      });

    } else {

      espacios = await obtenerEspaciosDeportivos();

    }

      res.status(200).json(espacios);

  } catch (error) {
    return responderErrorBD(
      res,
      error,
      "Error al obtener los espacios deportivos."
    );
  }
};

// Espacios deportivos registrados por un administrador específico
// (para que su Dashboard solo muestre lo suyo).
export const listarEspaciosPorAdmin = async (req, res) => {
  try {

    const { id_usuario } = req.params;

    const espacios = await obtenerEspaciosPorAdmin(id_usuario);

    res.status(200).json(espacios);

  } catch (error) {
    return responderErrorBD(
      res,
      error,
      "Error al obtener tus espacios deportivos."
    );
  }
};

export const editarEspacioDeportivo = async (req, res) => {
  try {

    const { id } = req.params;

    const espacioActual = await obtenerEspacioPorId(id);

    if (!espacioActual) {
      return res.status(404).json({
        mensaje: "Espacio deportivo no encontrado.",
      });
    }

    // Verificación de propiedad: solo el admin dueño del complejo
    // puede editar este espacio.
    if (
      req.body.id_usuario &&
      String(espacioActual.id_usuario_admin) !== String(req.body.id_usuario)
    ) {
      return res.status(403).json({
        mensaje: "No tienes permiso para editar este espacio deportivo.",
      });
    }

    await actualizarEspacioDeportivo(id, {
      nombre: req.body.nombre,
      id_deporte: req.body.id_deporte,
      precio_hora: req.body.precio_hora,
      estado: req.body.estado,
      horario_apertura: req.body.horario_apertura,
      horario_cierre: req.body.horario_cierre,
      descripcion: req.body.descripcion,
      imagen: rutaImagenSubida(req),
    });

    const espacioActualizado = await obtenerEspacioPorId(id);

    res.status(200).json({
      mensaje: "Espacio deportivo actualizado correctamente.",
      espacio: espacioActualizado,
    });

  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        mensaje: "Ya tienes un espacio deportivo con ese nombre en este complejo.",
      });
    }

    return responderErrorBD(
      res,
      error,
      "Error al actualizar el espacio deportivo."
    );
  }
};

export const borrarEspacioDeportivo = async (req, res) => {
  try {

    const { id } = req.params;

    const espacioActual = await obtenerEspacioPorId(id);

    if (!espacioActual) {
      return res.status(404).json({
        mensaje: "Espacio deportivo no encontrado.",
      });
    }

    if (
      req.query.id_usuario &&
      String(espacioActual.id_usuario_admin) !== String(req.query.id_usuario)
    ) {
      return res.status(403).json({
        mensaje: "No tienes permiso para eliminar este espacio deportivo.",
      });
    }

    // No se puede eliminar un espacio deportivo que todavía tiene
    // reservas activas (o pagadas) pendientes.
    const tieneReservas = await tieneReservasActivas(id);

    if (tieneReservas) {
      return res.status(409).json({
        mensaje:
          "No se puede eliminar: este espacio deportivo tiene reservas activas.",
      });
    }

    await eliminarEspacioDeportivo(id);

    res.status(200).json({
      mensaje: "Espacio deportivo eliminado correctamente.",
    });

  } catch (error) {
    return responderErrorBD(
      res,
      error,
      "Error al eliminar el espacio deportivo."
    );
  }
};
