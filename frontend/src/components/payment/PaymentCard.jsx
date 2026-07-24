import { useNavigate } from "react-router-dom";

import visa from "../../assets/images/visa.png";
import mastercard from "../../assets/images/mastercard.png";
import yape from "../../assets/images/yape.png";

function PaymentCard() {

  const navigate = useNavigate();

  const details = [
    { label: "NOMBRE", value: "Andres" },
    { label: "APELLIDOS", value: "Gutierres Paredes" },
    { label: "CORREO", value: "andres123@gmail.com" },
    { label: "TELÉFONO", value: "967456499" },
    { label: "FECHA", value: "20/07/2026" },
    { label: "HORA", value: "6:00 PM" },
    { label: "CANTIDAD DE HORAS", value: "2" },
    { label: "DESCUENTO", value: "0%" },
    { label: "TOTAL A PAGAR", value: "S/. 120.00" },
  ];

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

          <input type="radio" name="payment" />

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

          <input type="radio" name="payment" />

          <img
            src={yape}
            alt="Yape"
            className="w-8"
          />

          <span>Yape</span>

        </label>

       <label className="flex items-center gap-3 cursor-pointer">

  <input type="radio" name="payment" />

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