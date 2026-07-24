import { useNavigate } from "react-router-dom";

function ReservationSuccessCard({ reservation }) {
  const navigate = useNavigate();

  const details = [
    { label: "NOMBRE", value: reservation?.nombre },
    { label: "APELLIDOS", value: reservation?.apellidos },
    { label: "CORREO", value: reservation?.correo },
    { label: "TELÉFONO", value: reservation?.telefono },
    { label: "FECHA", value: reservation?.fecha },
    { label: "HORA INICIO", value: reservation?.horaInicio },
    { label: "HORA FIN", value: reservation?.horaFin },
    { label: "CANTIDAD DE HORAS", value: reservation?.cantidadHoras },
    { label: "DESCUENTO", value: reservation?.descuento },
    { label: "TOTAL A PAGAR", value: `S/. ${reservation?.total}` },
    { label: "MÉTODO DE PAGO", value: reservation?.metodoPago },
    { label: "ESTADO DE PAGO", value: reservation?.estadoPago },
  ];

  return (
    <div className="w-[560px] bg-white rounded-xl shadow-2xl px-16 py-12">

      <h1
        className="text-center mb-12"
        style={{
          fontFamily: "Instrument Sans",
          fontSize: "36px",
          fontWeight: 700,
        }}
      >
        ¡Reserva hecha!
      </h1>

      <div
        className="space-y-3"
        style={{
          fontFamily: "Red Hat Text",
          fontSize: "15px",
        }}
      >
        {details.map((item) => (
          <div
            key={item.label}
            className="flex items-center"
          >
            <span className="w-[190px] font-semibold">
              {item.label}:
            </span>

            <span>{item.value}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-6 mt-10">

        <button
            onClick={() => navigate("/payment")}
          className="w-[170px] h-[44px] rounded-full bg-[#C7F34A] hover:bg-[#b8e43f] transition"
          style={{
            fontFamily: "Prompt",
            fontSize: "14px",
          }}
        >
          REALIZAR PAGO
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-[170px] h-[44px] rounded-full bg-[#C7F34A] hover:bg-[#b8e43f] transition"
          style={{
            fontFamily: "Prompt",
            fontSize: "14px",
          }}
        >
          GUARDAR RESERVA
        </button>

      </div>

    </div>
  );
}

export default ReservationSuccessCard;