import cancha5 from "../assets/images/cancha5.jpg";
import ReservationSuccessCard from "../components/reservation/ReservationSuccessCard";

function ReservationSuccess() {

  // Temporal (luego vendrá del backend)
  const reservation = {
    nombre: "Andres",
    apellidos: "Gutierres Paredes",
    correo: "andres123@gmail.com",
    telefono: "967456499",
    fecha: "20/07/2026",
    horaInicio: "6:00 PM",
    horaFin: "8:00 PM",
    cantidadHoras: 2,
    descuento: "0%",
    total: "120.00",
    metodoPago: "Yape",
    estadoPago: "Pagado",
  };

  return (
    <section className="min-h-screen bg-white relative overflow-hidden">

      {/* Imagen superior */}
      <div
        className="absolute top-0 left-0 w-full h-[310px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${cancha5})`,
        }}
      />

      {/* Tarjeta */}
      <div className="relative flex justify-center items-start min-h-screen pt-8 pb-8">
    <ReservationSuccessCard reservation={reservation} />
</div>

    </section>
  );
}

export default ReservationSuccess;