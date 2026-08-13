import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import visa from "../../assets/images/visa.png";
import mastercard from "../../assets/images/mastercard.png";
import yape from "../../assets/images/yape.png";

function PaymentCard() {

  const [metodoPago, setMetodoPago] = useState("");
  const [yapeCode, setYapeCode] = useState("");
  const [yapeCountdown, setYapeCountdown] = useState(0);
  const yapeTimerRef = useRef(null);

  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

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

  if (isProcessing) return;
  setIsProcessing(true);

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

    setIsProcessing(false);

  }

};

const cancelarPago = async () => {

  try {

    // La reserva ya se había creado (en estado ACTIVA) antes de
    // llegar a esta pantalla de pago. Si el cliente cancela aquí,
    // esa reserva debe liberarse — si no, quedaría "ACTIVA" para
    // siempre y bloquearía el horario sin que nadie haya pagado.
    if (idReserva) {
      await axios.put(
        `http://localhost:3000/api/reservas/${idReserva}/estado`,
        { estado: "CANCELADA" }
      );
    }

  } catch (error) {
    console.error(error);
  } finally {
    navigate("/search-courts");
  }

};

  useEffect(() => {
    // When Yape is selected, generate a code and auto-process after 5s
    if (metodoPago === "2") {
      // generate 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setYapeCode(code);
      setYapeCountdown(5);

      // countdown interval
      yapeTimerRef.current = setInterval(() => {
        setYapeCountdown((c) => {
          if (c <= 1) {
            clearInterval(yapeTimerRef.current);
            yapeTimerRef.current = null;
            // auto trigger payment after countdown
            realizarPago();
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    } else {
      // clear any previous yape timers when switching away
      if (yapeTimerRef.current) {
        clearInterval(yapeTimerRef.current);
        yapeTimerRef.current = null;
      }
      setYapeCode("");
      setYapeCountdown(0);
    }

    return () => {
      if (yapeTimerRef.current) {
        clearInterval(yapeTimerRef.current);
        yapeTimerRef.current = null;
      }
    };
  }, [metodoPago]);

  useEffect(() => {
    // Simulate filling card form when user selects Tarjeta
    let fillTimeout = null;
    if (metodoPago === "1") {
      fillTimeout = setTimeout(() => {
        setCardData({
          number: "4111 1111 1111 1111",
          name: usuario.nombre + " " + usuario.apellido,
          expiry: "12/28",
          cvc: "123",
        });
      }, 400);
    }
    return () => clearTimeout(fillTimeout);
  }, [metodoPago, usuario]);

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

      {/* conditional UIs for selected payment methods */}
      {metodoPago === "2" && (
        <div className="mt-6 p-4 border rounded text-center">
          <p className="mb-2 font-semibold">Código Yape generado</p>
          <p className="text-2xl font-bold mb-1">{yapeCode}</p>
          <p className="text-sm text-gray-600">Se procesará automáticamente en {yapeCountdown} s</p>
        </div>
      )}

      {metodoPago === "1" && (
        <div className="mt-6 space-y-3">
          <div>
            <label className="block text-sm font-medium">Número de tarjeta</label>
            <input
              value={cardData.number}
              onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
              className="w-full mt-1 p-2 border rounded"
              placeholder="1111 2222 3333 4444"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium">Nombre</label>
              <input
                value={cardData.name}
                onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                className="w-full mt-1 p-2 border rounded"
                placeholder="Nombre en tarjeta"
              />
            </div>

            <div className="w-28">
              <label className="block text-sm font-medium">Vence</label>
              <input
                value={cardData.expiry}
                onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                className="w-full mt-1 p-2 border rounded"
                placeholder="MM/AA"
              />
            </div>

            <div className="w-20">
              <label className="block text-sm font-medium">CVC</label>
              <input
                value={cardData.cvc}
                onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                className="w-full mt-1 p-2 border rounded"
                placeholder="123"
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-6 mt-10">

        <button
          onClick={realizarPago}
          disabled={isProcessing || (metodoPago === "2" && yapeCountdown > 0)}
          className="w-[170px] h-[44px] rounded-full bg-[#C7F34A] disabled:opacity-60"
          style={{
            fontFamily: "Prompt",
          }}
        >
          {isProcessing ? "PROCESANDO..." : "REALIZAR PAGO"}
        </button>

        <button
          onClick={cancelarPago}
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