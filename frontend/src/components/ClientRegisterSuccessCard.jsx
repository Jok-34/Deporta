import cancha5 from "../assets/images/cancha5.jpg";
import { useNavigate } from "react-router-dom";

function ClientRegisterSuccessCard() {
    const navigate = useNavigate();
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
        <div className="w-[560px] h-[370px] bg-white shadow-2xl flex flex-col items-center justify-center px-10 text-center">
          <h1
            className="text-[34px] font-bold text-center leading-[50px] tracking-[3%] text-black"
            style={{ fontFamily: "Instrument Sans" }}
          >
            ¡Registro exitoso!
          </h1>

          <p
            className="mt-4 text-[#5F5F5F]"
            style={{ fontFamily: "Red Hat Text" }}
          >
            Tu cuenta fue creada correctamente. Ya puedes iniciar sesión
            y empezar a buscar y reservar espacios deportivos.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-10 bg-[var(--color-primary)] rounded-full px-12 py-4 text-black text-[12px]"
            style={{ fontFamily: "Prompt" }}
          >
            IR A INICIAR SESIÓN
          </button>
        </div>
      </div>
    </section>
  );
}

export default ClientRegisterSuccessCard;
