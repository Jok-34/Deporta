import cancha5 from "../assets/images/cancha5.jpg";
import PaymentCard from "../components/payment/PaymentCard";
import { useLocation } from "react-router-dom";

function Payment() {

  const location = useLocation();

  const {
    cancha,
    reserva,
    usuario,
    idReserva,
  } = location.state;

  return (
    <section className="min-h-screen bg-white relative overflow-auto">

      {/* Imagen superior */}
      <div
        className="absolute top-0 left-0 w-full h-[260px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${cancha?.image || cancha5})`,
        }}
      />

      {/* Tarjeta */}
      <div className="relative flex justify-center items-start min-h-screen pt-8 pb-8">
        <PaymentCard
          cancha={cancha}
          reserva={reserva}
          usuario={usuario}
          idReserva={idReserva}
        />
      </div>

    </section>
  );
}

export default Payment;