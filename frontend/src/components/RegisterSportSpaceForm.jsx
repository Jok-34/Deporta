import { useNavigate } from "react-router-dom";
function RegisterSportSpaceForm() {
    const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  navigate("/register-sport-space-success");
};
  return (
    <section className="flex min-h-screen">
      {/* Panel izquierdo */}
      <div className="w-1/2 bg-[var(--color-secondary)] flex flex-col justify-center px-20">
        <h1
          className="text-white text-[40px] font-bold tracking-[3%] mb-10"
          style={{ fontFamily: "Instrument Sans" }}
        >
          ¡Registra tu espacio
          <br />
          deportivo!
        </h1>

        <p
          className="text-white text-[21px] max-w-md"
          style={{ fontFamily: "Red Hat Text" }}
        >
          Registra tu espacio deportivo y conecta con cientos de jugadores.
          Administra reservas, horarios y pagos desde un único dashboard
          centralizado.
        </p>
      </div>

      {/* Panel derecho */}
      <div className="w-1/2 bg-[var(--color-surface)] flex items-center justify-center">
        <div className="w-[420px]">
          <h2
            className="text-center text-[34px] font-bold mb-10"
            style={{ fontFamily: "Instrument Sans" }}
          >
            Registro tu espacio
            <br />
            deportivo
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Seleccionar complejo */}
            <select
              className="w-full rounded-full border border-gray-300 px-6 py-3 text-[#777777]"
              style={{ fontFamily: "Red Hat Text" }}
            >
              <option>Seleccionar complejo</option>
            </select>

            {/* Nombre */}
            <div>
              <label
                className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                style={{ fontFamily: "Instrument Sans" }}
              >
                Nombre del espacio deportivo
              </label>

              <input
                type="text"
                placeholder="Ingresa el nombre"
                className="w-full rounded-full border border-gray-300 px-6 py-3"
                style={{ fontFamily: "Red Hat Text" }}
              />
            </div>

            {/* Deporte */}
            <div>
              <label
                className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                style={{ fontFamily: "Instrument Sans" }}
              >
                Deporte
              </label>

              <input
                type="text"
                placeholder="Ingresa el deporte"
                className="w-full rounded-full border border-gray-300 px-6 py-3"
                style={{ fontFamily: "Red Hat Text" }}
              />
            </div>

            {/* Precio */}
            <div>
              <label
                className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                style={{ fontFamily: "Instrument Sans" }}
              >
                Precio por hora
              </label>

              <input
                type="number"
                placeholder="Ingresa el precio"
                className="w-full rounded-full border border-gray-300 px-6 py-3"
                style={{ fontFamily: "Red Hat Text" }}
              />
            </div>

            {/* Imagen */}
            <div>
              <label
                className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                style={{ fontFamily: "Instrument Sans" }}
              >
                Imagen
              </label>

              <div className="w-[100px] h-[110px] border border-gray-300 flex items-center justify-center text-center text-[10px] text-gray-400">
                Suba una
                <br />
                imagen de su
                <br />
                espacio
                <br />
                deportivo
              </div>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="mt-2 rounded-full py-4 bg-[var(--color-primary)] text-black"
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

export default RegisterSportSpaceForm;