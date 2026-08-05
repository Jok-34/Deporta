import { crearPago } from "../models/pagoModel.js";

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

    res.status(201).json({

      mensaje: "Pago registrado correctamente.",
      id: resultado.insertId,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      mensaje: "Error al registrar el pago.",
    });

  }

};