import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import visa from "../../assets/images/visa.png";
import mastercard from "../../assets/images/mastercard.png";
import yape from "../../assets/images/yape.png";

function PaymentCard() {

  const [metodoPago, setMetodoPago] = useState("");

  const navigate = useNavigate();

  const location = useLocation();

const {
  cancha,
  reserva,
  usuario,
  idReserva,
} = location.state;

console.log(cancha);
console.log(reserva);
console.log(usuario);
console.log(idReserva);

  const details = [
  { label: "NOMBRE", value: usuario.nombre },
  { label: "APELLIDOS", value: usuario.apellido },
  { label: "CORREO", value: usuario.correo },
  { label: "TELÉFONO", value: usuario.telefono },
  { label: "FECHA", value: reserva.fecha },
  { label: "HORA", value: reserva.hora },
  { label: "CANTIDAD DE HORAS", value: reserva.horas },
  { label: "DESCUENTO", value: "0%" },
  { label: "TOTAL A PAGAR", value: `S/. ${(Number(cancha.price) * Number(reserva.horas)).toFixed(2)}` },
];

const realizarPago = async () => {

  if (!metodoPago) {
    alert("Seleccione un método de pago.");
    return;
  }

  try {

    await axios.post(
      "http://localhost:3000/api/pagos/register",
      {
        id_reserva: idReserva,
        id_metodo_pago: Number(metodoPago),
        monto: Number(cancha.price) * Number(reserva.horas),
      }
    );

    navigate("/reservation-success", {
      state: {
        cancha,
        reserva,
        usuario,
        metodoPago,
      },
    });

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.mensaje ||
      "No se pudo registrar el pago."
    );

  }

};

  return (
    <div className="w-[560px] bg-white rounded-xl shadow-2xl px-16 py-12">

      <h1
        className="text-center mb-10"
        style={{
          fontFamily: "Instrument Sans",
          fontSize: "36px",
          fontWeight: 700,
        }}
      >
        Realizar pago
      </h1>

      <div
        className="space-y-3"
        style={{
          fontFamily: "Red Hat Text",
          fontSize: "15px",
        }}
      >
        {details.map((item) => (
          <div key={item.label} className="flex items-center">

            <span className="w-[190px] font-semibold">
              {item.label}:
            </span>

            <span>{item.value}</span>

          </div>
        ))}
      </div>

      <h3
        className="mt-8 mb-5 font-semibold"
        style={{
          fontFamily: "Red Hat Text",
        }}
      >
        Seleccionar método de pago
      </h3>

      <div className="space-y-4">

        <label className="flex items-center gap-3 cursor-pointer">

          <input
              type="radio"
              name="payment"
              value="1"
              checked={metodoPago === "1"}
              onChange={(e) => setMetodoPago(e.target.value)}
            />

          <img
            src={visa}
            alt="Visa"
            className="w-10"
          />

          <img
            src={mastercard}
            alt="Mastercard"
            className="w-8"
          />

          <span>Tarjeta</span>

        </label>

        <label className="flex items-center gap-3 cursor-pointer">

          <input
            type="radio"
            name="payment"
            value="2"
            checked={metodoPago === "2"}
            onChange={(e) => setMetodoPago(e.target.value)}
          />
          <img
            src={yape}
            alt="Yape"
            className="w-8"
          />

          <span>Yape</span>

        </label>

       <label className="flex items-center gap-3 cursor-pointer">

  <input
      type="radio"
      name="payment"
      value="3"
      checked={metodoPago === "3"}
      onChange={(e) => setMetodoPago(e.target.value)}
    />

  <span
    className="text-xl"
    role="img"
    aria-label="Efectivo"
  >
    💵
  </span>

  <span>Efectivo</span>

</label>

      </div>

      <div className="flex justify-center gap-6 mt-10">

        <button
          onClick={realizarPago}
          className="w-[170px] h-[44px] rounded-full bg-[#C7F34A]"
          style={{
            fontFamily: "Prompt",
          }}
        >
          REALIZAR PAGO
        </button>

        <button
          onClick={() => navigate("/reservation-success")}
          className="w-[170px] h-[44px] rounded-full bg-[#C7F34A]"
          style={{
            fontFamily: "Prompt",
          }}
        >
          CANCELAR PAGO
        </button>

      </div>

    </div>
  );
}

export default PaymentCard;