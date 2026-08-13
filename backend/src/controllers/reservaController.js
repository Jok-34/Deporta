import {
  crearReserva,
  buscarConflictoHorario,
  obtenerReservasPorAdmin,
  obtenerReservasPorCliente,
  actualizarEstadoReserva,
  obtenerEstadisticasAdmin,
} from "../models/reservaModel.js";
import { calcularFechaHoraFin } from "../utils/fecha.js";
import { responderErrorBD } from "../utils/errorBD.js";

export const registrarReserva = async (req, res) => {
  try {

    const {
      id_usuario,
      id_espacio_deportivo,
      fecha,
      hora,
      horas,
    } = req.body;

    const fecha_hora_inicio = `${fecha} ${hora}:00`;

    const fecha_hora_fin = calcularFechaHoraFin(
      fecha,
      hora,
      horas
    );

    // El horario solicitado no puede solaparse con ninguna otra
    // reserva vigente del mismo espacio deportivo, sin importar qué
    // cliente la haya hecho.
    const horarioOcupado = await buscarConflictoHorario({
      id_espacio_deportivo,
      fecha_hora_inicio,
      fecha_hora_fin,
    });

    if (horarioOcupado) {
      return res.status(409).json({
        mensaje:
          "Este horario ya fue reservado. Por favor elige otro horario.",
      });
    }

    const resultado = await crearReserva({
      id_usuario,
      id_espacio_deportivo,
      fecha_hora_inicio,
      fecha_hora_fin,
      estado: "ACTIVA",
    });

    res.status(201).json({
      mensaje: "Reserva registrada correctamente.",
      id: resultado.insertId,
    });

  } catch (error) {
    return responderErrorBD(res, error, "Error al registrar la reserva.");
  }
};

// Lista las reservas hechas sobre los espacios deportivos de un
// administrador (para su Dashboard).
export const listarReservasPorAdmin = async (req, res) => {
  try {

    const { id_usuario } = req.params;

    const reservas = await obtenerReservasPorAdmin(id_usuario);

    res.status(200).json(reservas);

  } catch (error) {
    return responderErrorBD(res, error, "Error al obtener las reservas.");
  }
};

// Historial de reservas de un cliente (sus propias reservas).
export const listarReservasPorCliente = async (req, res) => {
  try {

    const { id_usuario } = req.params;

    const reservas = await obtenerReservasPorCliente(id_usuario);

    res.status(200).json(reservas);

  } catch (error) {
    return responderErrorBD(
      res,
      error,
      "Error al obtener el historial de reservas."
    );
  }
};

export const cambiarEstadoReserva = async (req, res) => {
  try {

    const { id } = req.params;
    const { estado } = req.body;

    const estadosValidos = ["ACTIVA", "PAGADA", "CANCELADA", "COMPLETADA"];

    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({
        mensaje: "Estado de reserva no válido.",
      });
    }

    await actualizarEstadoReserva(id, estado);

    res.status(200).json({
      mensaje: "Estado de la reserva actualizado correctamente.",
    });

  } catch (error) {
    return responderErrorBD(res, error, "Error al actualizar la reserva.");
  }
};

export const listarEstadisticasAdmin = async (req, res) => {
  try {

    const { id_usuario } = req.params;

    const estadisticas = await obtenerEstadisticasAdmin(id_usuario);

    res.status(200).json(estadisticas);

  } catch (error) {
    return responderErrorBD(
      res,
      error,
      "Error al obtener las estadísticas del dashboard."
    );
  }
};
