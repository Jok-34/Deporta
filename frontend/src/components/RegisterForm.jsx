import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function RegisterForm() {
   const navigate = useNavigate();

  const [adminComplejo, setAdminComplejo] = useState(false);

  const handleSubmit = (e) => {
  e.preventDefault();

  if (adminComplejo) {
    navigate("/register-complex");
  } else {
    navigate("/login");
  }
};

  return (
    <section className="flex min-h-screen">
      {/* Panel izquierdo */}
      <div className="w-1/2 bg-[var(--color-secondary)] flex flex-col justify-center px-20">
        <h1
          className="text-white text-[40px] font-bold tracking-[3%] mb-10"
          style={{ fontFamily: "Instrument Sans" }}
        >
          Accede a tus
          <br />
          espacios deportivos
          <br />
          favoritos y comparte
          <br />
          el deporte con los
          <br />
          tuyos.
        </h1>

        <p
          className="text-white text-[21px] max-w-md"
          style={{ fontFamily: "Red Hat Text" }}
        >
          Crea tu cuenta para encontrar canchas o
          piscinas cercanas en tiempo real, guardar
          tus lugares preferidos, reprogramar turnos
          fácilmente y acceder a descuentos
          exclusivos.
        </p>
      </div>

      {/* Panel derecho */}
      <div className="w-1/2 bg-[var(--color-surface)] flex items-center justify-center">
        <div className="w-[420px]">
          <h2
            className="text-center text-[34px] font-bold mb-10"
            style={{ fontFamily: "Instrument Sans" }}
          >
            Crea tu cuenta
          </h2>

          <form  onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                style={{ fontFamily: "Instrument Sans" }}
              >
                Nombre
              </label>

              <input
                type="text"
                placeholder="Ingresa tu nombre"
                className="w-full rounded-full border border-gray-300 px-6 py-3"
                style={{ fontFamily: "Red Hat Text" }}
              />
            </div>

            <div>
              <label
                className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                style={{ fontFamily: "Instrument Sans" }}
              >
                Apellidos
              </label>

              <input
                type="text"
                placeholder="Ingresa tus apellidos"
                className="w-full rounded-full border border-gray-300 px-6 py-3"
                style={{ fontFamily: "Red Hat Text" }}
              />
            </div>

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
                Teléfono
              </label>

              <input
                type="tel"
                placeholder="Ingresa tu número"
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

            <div className="flex items-center gap-3 mt-2">
  <input
    id="adminComplejo"
  type="checkbox"
  checked={adminComplejo}
  onChange={(e) => setAdminComplejo(e.target.checked)}
  className="w-5 h-5 accent-[var(--color-secondary)] cursor-pointer"
  />

  <label
    htmlFor="adminComplejo"
    className="text-[14px] font-bold text-[#777777] cursor-pointer"
    style={{ fontFamily: "Instrument Sans" }}
  >
    Esta cuenta administrará un complejo deportivo
  </label>
</div>

            <button
              className="mt-6 rounded-full py-4 bg-[var(--color-primary)] text-black"
              style={{ fontFamily: "Prompt" }}
            >
              REGISTRARSE
            </button>
          </form>

          <p
            className="text-center mt-10 text-[#777777] font-bold"
            style={{ fontFamily: "Instrument Sans" }}
          >
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-[#86BE00]">
                Iniciar Sesión
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterForm;