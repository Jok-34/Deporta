import cancha5 from "../assets/images/cancha5.jpg";
import ReservationForm from "../components/reservation/ReservationForm";

function Reservation() {
  return (
    <section className="min-h-screen bg-white relative overflow-hidden">

      {/* Imagen superior */}
      <div
        className="absolute top-0 left-0 w-full h-[310px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${cancha5})`,
        }}
      />

      {/* Formulario */}
      <div className="relative flex justify-center pt-[60px]">
        <ReservationForm />
      </div>

    </section>
  );
}

export default Reservation;