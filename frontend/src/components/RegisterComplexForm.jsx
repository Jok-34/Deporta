import { useNavigate } from "react-router-dom";
function RegisterComplexForm() {
    const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  navigate("/register-success");
};
  return (
    <section className="flex min-h-screen">
      {/* Panel izquierdo */}
      <div className="w-1/2 bg-[var(--color-secondary)] flex flex-col justify-center px-20">
        <h1
          className="text-white text-[40px] font-bold tracking-[3%] mb-10"
          style={{ fontFamily: "Instrument Sans" }}
        >
          ¡Registra tu
          <br />
          complejo!
        </h1>

        <p
          className="text-white text-[21px] max-w-md"
          style={{ fontFamily: "Red Hat Text" }}
        >
          Registra tu complejo y encuentra potenciales clientes, desde tu
          dashboard único podrás administrar tus reservas y más.
        </p>
      </div>

      {/* Panel derecho */}
      <div className="w-1/2 bg-[var(--color-surface)] flex items-center justify-center">
        <div className="w-[420px]">
          <h2
            className="text-center text-[34px] font-bold mb-10"
            style={{ fontFamily: "Instrument Sans" }}
          >
            Registro del complejo
          </h2>

          <form  onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Nombre de la empresa */}
            <div>
              <label
                className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                style={{ fontFamily: "Instrument Sans" }}
              >
                Nombre de la empresa
              </label>

              <input
                type="text"
                placeholder="Ingresa el nombre"
                className="w-full rounded-full border border-gray-300 px-6 py-3"
                style={{ fontFamily: "Red Hat Text" }}
              />
            </div>

            {/* RUC */}
            <div>
              <label
                className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                style={{ fontFamily: "Instrument Sans" }}
              >
                RUC
              </label>

              <input
                type="text"
                placeholder="Ingresa el RUC"
                className="w-full rounded-full border border-gray-300 px-6 py-3"
                style={{ fontFamily: "Red Hat Text" }}
              />
            </div>

            {/* Correo comercial */}
            <div>
              <label
                className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                style={{ fontFamily: "Instrument Sans" }}
              >
                Correo comercial
              </label>

              <input
                type="email"
                placeholder="Ingresa el correo"
                className="w-full rounded-full border border-gray-300 px-6 py-3"
                style={{ fontFamily: "Red Hat Text" }}
              />
            </div>

            {/* Teléfono */}
            <div>
              <label
                className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                style={{ fontFamily: "Instrument Sans" }}
              >
                Teléfono
              </label>

              <input
                type="tel"
                placeholder="Ingresa el número"
                className="w-full rounded-full border border-gray-300 px-6 py-3"
                style={{ fontFamily: "Red Hat Text" }}
              />
            </div>

            {/* Distrito */}
            <div>
              <label
                className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                style={{ fontFamily: "Instrument Sans" }}
              >
                Distrito
              </label>

              <input
                type="text"
                placeholder="Ingresa tu distrito"
                className="w-full rounded-full border border-gray-300 px-6 py-3"
                style={{ fontFamily: "Red Hat Text" }}
              />
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="mt-6 rounded-full py-4 bg-[var(--color-primary)] text-black"
              style={{ fontFamily: "Prompt" }}
            >
              REGISTRAR
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default RegisterComplexForm;