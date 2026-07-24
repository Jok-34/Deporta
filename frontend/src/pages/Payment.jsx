import cancha5 from "../assets/images/cancha5.jpg";
import PaymentCard from "../components/payment/PaymentCard";

function Payment() {
  return (
    <section className="min-h-screen bg-white relative overflow-auto">

      {/* Imagen superior */}
      <div
        className="absolute top-0 left-0 w-full h-[260px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${cancha5})`,
        }}
      />

      {/* Tarjeta */}
      <div className="relative flex justify-center items-start min-h-screen pt-8 pb-8">
        <PaymentCard />
      </div>

    </section>
  );
}

export default Payment;