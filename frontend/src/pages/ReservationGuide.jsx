import celular from "../assets/images/celular.jpg";

function ReservationGuide() {
  return (
    <div className="min-h-screen bg-[var(--color-secondary)] flex items-center justify-center px-20">

      {/* Parte izquierda */}
      <div className="w-1/2 text-white">

        <h1
          className="text-[56px] font-bold leading-tight"
          style={{ fontFamily: "Instrument Sans" }}
        >
          ¿Como realizar
          <br />
          mi reserva?
        </h1>

        <p
          className="mt-8 text-[24px]"
          style={{ fontFamily: "Red Hat Text" }}
        >
          Para realizar tu reserva lo haces
          <br />
          siguiendo estos sencillos pasos
        </p>

        <button
          className="mt-10 bg-[var(--color-primary)] text-black px-12 py-4 rounded-full"
          style={{ fontFamily: "Prompt" }}
        >
          RESERVAR
        </button>

      </div>

      {/* Parte derecha */}
      <div className="w-1/2 flex justify-center">

        <img
          src={celular}
          alt="Celular"
          className="w-[600px]"
        />

      </div>
    </div>
  );
}

export default ReservationGuide;