import { Link } from "react-router-dom";
function LoginForm() {
  return (
    <section className="flex min-h-screen">

      {/* Panel izquierdo */}
      <div className="w-1/2 bg-[var(--color-secondary)] flex flex-col justify-center px-20">

        <h1
          className="text-white text-[40px] font-bold tracking-[3%] mb-10"
          style={{ fontFamily: "Instrument Sans" }}
        >
          ¡Qué bueno
          <br />
          verte de vuelta!
        </h1>

        <p
          className="text-white text-[21px] max-w-md"
          style={{ fontFamily: "Red Hat Text" }}
        >
          Inicia sesión para revisar tus reservas,
          agendar un nuevo partido en tus espacios
          favoritos y no perderte de ningún
          descuento exclusivo hoy.
        </p>

      </div>

      {/* Panel derecho */}
      <div className="w-1/2 bg-[var(--color-surface)] flex items-center justify-center">

        <div className="w-[420px]">

          <h2
            className="text-center text-[34px] font-bold mb-10"
            style={{ fontFamily: "Instrument Sans" }}
          >
            Iniciar sesión
          </h2>

          <form className="flex flex-col gap-5">

            <div>
              <label
                className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                style={{ fontFamily: "Instrument Sans" }}
              >
                Correo
              </label>

              <input
                type="email"
                placeholder="Ingresa tu correo"
                className="w-full rounded-full border border-gray-300 px-6 py-3"
                style={{ fontFamily: "Red Hat Text" }}
              />
            </div>

            <div>
              <label
                className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                style={{ fontFamily: "Instrument Sans" }}
              >
                Contraseña
              </label>

              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                className="w-full rounded-full border border-gray-300 px-6 py-3"
                style={{ fontFamily: "Red Hat Text" }}
              />
            </div>

            <button
              className="mt-6 rounded-full py-4 bg-[var(--color-primary)]"
              style={{ fontFamily: "Prompt" }}
            >
              INICIAR SESIÓN
            </button>

          </form>

          <p
            className="text-center mt-10 text-[#777777] font-bold"
            style={{ fontFamily: "Instrument Sans" }}
          >
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-[#86BE00]">
            Regístrate
            </Link>
          </p>

        </div>

      </div>

    </section>
  );
}

export default LoginForm;