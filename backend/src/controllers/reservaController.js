import { crearReserva } from "../models/reservaModel.js";
import { calcularFechaHoraFin } from "../utils/fecha.js";

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

   console.log({
  fecha,
  hora,
  horas,
  fecha_hora_inicio,
  fecha_hora_fin,
});

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
    console.error(error);

    res.status(500).json({
      mensaje: "Error al registrar la reserva.",
    });
  }
};