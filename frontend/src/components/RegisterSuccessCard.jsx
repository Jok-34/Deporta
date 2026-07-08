import cancha5 from "../assets/images/cancha5.jpg";
import { useNavigate } from "react-router-dom";

function RegisterSuccessCard() {
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
        <div className="w-[560px] h-[370px] bg-white shadow-2xl flex flex-col items-center justify-center">
          <h1
            className="text-[34px] font-bold text-center leading-[50px] tracking-[3%] text-black"
            style={{ fontFamily: "Instrument Sans" }}
          >
            ¡Registro de
            <br />
            complejo con éxito!
          </h1>

          <button
            onClick={() => navigate("/register-sport-space")}
            className="mt-16 bg-[var(--color-primary)] rounded-full px-12 py-4 text-black text-[12px]"
            style={{ fontFamily: "Prompt" }}
          >
            REGISTRAR ESPACIO DEPORTIVO
          </button>
        </div>
      </div>
    </section>
  );
}

export default RegisterSuccessCard;