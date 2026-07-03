import hero from "../assets/images/hero.png";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="relative h-[690px] bg-cover bg-center"
      style={{ backgroundImage: `url(${hero})` }}
    >
      {/* Contenedor principal */}
      <div className="max-w-7xl mx-auto h-full px-14 flex justify-between items-center">

        {/* Bloque izquierdo */}
        <div className="ml-6">

          <h1
            className="text-[98px] font-bold leading-none text-[#CCF46D]"
            style={{ fontFamily: "Instrument Sans" }}
          >
            DEPORTA
          </h1>

          <h2
            className="mt-4 text-[18px] text-[#CCF46D] tracking-[5px]"
            style={{ fontFamily: "Tauri" }}
          >
            ALQUILA. JUEGA. DISFRUTA
          </h2>

          <p
            className="mt-40 max-w-[430px] text-[22px] leading-9 text-white"
            style={{ fontFamily: "Red Hat Text" }}
          >
            La forma más rápida de asegurar tu lugar y compartir la pasión del
            deporte con los tuyos.
          </p>

        </div>

        {/* Botones */}
        <div className="flex gap-6 self-end mb-28">

          <Link to="/login">
          <button
            className="bg-[#CCF46D] px-9 py-3 rounded-full text-[14px] hover:brightness-95 transition"
            style={{ fontFamily: "Prompt" }}
          >
            INICIAR SESIÓN
          </button>
          </Link>

          <Link to="/register">
          <button
            className="bg-[#CCF46D] px-9 py-3 rounded-full text-[14px] hover:brightness-95 transition"
            style={{ fontFamily: "Prompt" }}
          >
            REGISTRARSE
          </button>
          </Link>

        </div>

      </div>

      {/* Flecha izquierda */}
      <button className="absolute left-8 top-1/2 -translate-y-1/2 text-white">
        <IoChevronBackOutline size={58} />
      </button>

      {/* Flecha derecha */}
      <button className="absolute right-8 top-1/2 -translate-y-1/2 text-white">
        <IoChevronForwardOutline size={58} />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">

        <div className="w-16 h-1 bg-white rounded-full"></div>

        <div className="w-16 h-1 bg-white/70 rounded-full"></div>

        <div className="w-16 h-1 bg-white/70 rounded-full"></div>

      </div>

    </section>
  );
}

export default Hero;