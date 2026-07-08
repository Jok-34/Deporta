import cancha5 from "../assets/images/cancha5.jpg";

function RegisterSportSpaceSuccessCard() {
  return (
    <section className="min-h-screen bg-white relative overflow-hidden">
      {/* Imagen superior */}
      <div
        className="absolute top-0 left-0 w-full h-[310px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${cancha5})`,
        }}
      ></div>

      {/* Tarjeta */}
      <div className="relative flex justify-center pt-[200px]">
        <div className="w-[560px] h-[370px] bg-white shadow-2xl flex flex-col items-center justify-center">
          <h1
            className="text-[34px] font-bold text-center leading-[50px] tracking-[3%] text-black"
            style={{ fontFamily: "Instrument Sans" }}
          >
            ¡Registro de tu
            <br />
            espacio con éxito!
          </h1>

          <button
            className="mt-12 bg-[var(--color-primary)] rounded-full px-12 py-4 text-black text-[12px]"
            style={{ fontFamily: "Prompt" }}
          >
            INGRESAR AL DASHBOARD
          </button>

          <button
            className="mt-6 bg-[var(--color-primary)] rounded-full px-12 py-4 text-black text-[12px]"
            style={{ fontFamily: "Prompt" }}
          >
            VOLVER AL INICIO
          </button>
        </div>
      </div>
    </section>
  );
}

export default RegisterSportSpaceSuccessCard;