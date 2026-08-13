import { crearPago } from "../models/pagoModel.js";
import { actualizarEstadoReserva } from "../models/reservaModel.js";
import { responderErrorBD } from "../utils/errorBD.js";

export const registrarPago = async (req, res) => {

  try {

    const {
      id_reserva,
      id_metodo_pago,
      monto,
    } = req.body;

    const fecha_pago = new Date()
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const resultado = await crearPago({

      id_reserva,
      id_metodo_pago,
      monto,
      fecha_pago,
      estado: "PAGADO",

    });

    // Una vez confirmado el pago, la reserva pasa a estado "PAGADA".
    await actualizarEstadoReserva(id_reserva, "PAGADA");

    res.status(201).json({

      mensaje: "Pago registrado correctamente.",
      id: resultado.insertId,

    });

  } catch (error) {
    return responderErrorBD(res, error, "Error al registrar el pago.");
  }

};
