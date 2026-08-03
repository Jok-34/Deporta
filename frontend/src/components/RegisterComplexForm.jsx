import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterComplexForm() {
  const navigate = useNavigate();

  const [distritos, setDistritos] = useState([]);

  const [formData, setFormData] = useState({
    nombre: "",
    ruc: "",
    correo: "",
    telefono: "",
    direccion: "",
    id_distrito: "",
  });

  useEffect(() => {
    obtenerDistritos();
  }, []);

  const obtenerDistritos = async () => {
    try {
      const respuesta = await axios.get(
        "http://localhost:3000/api/distritos"
      );

      setDistritos(respuesta.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const respuesta = await axios.post(
      "http://localhost:3000/api/complejos/register",
      {
        id_usuario: 1, // Temporal
        id_distrito: formData.id_distrito,
        nombre: formData.nombre,
        direccion: formData.direccion,
        telefono: formData.telefono,
        correo: formData.correo,
        ruc: formData.ruc,
      }
    );

    console.log(respuesta.data);

    navigate("/register-success");

  } catch (error) {
    console.error(error);

    alert("El correo o RUC ya se encuentra registrado");
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
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
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
              name="ruc"
              value={formData.ruc}
              onChange={handleChange}
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
                name="correo"
                value={formData.correo}
                onChange={handleChange}
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
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ingresa el número"
                className="w-full rounded-full border border-gray-300 px-6 py-3"
                style={{ fontFamily: "Red Hat Text" }}
              />
            </div>



              <div>
                <label
                  className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                  style={{ fontFamily: "Instrument Sans" }}
                >
                  Dirección
                </label>

                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  placeholder="Ingresa la dirección"
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

              <select
                name="id_distrito"
                value={formData.id_distrito}
                onChange={handleChange}
                className="w-full rounded-full border border-gray-300 px-6 py-3"
                style={{ fontFamily: "Red Hat Text" }}
              >
                <option value="">Selecciona un distrito</option>

                {distritos.map((distrito) => (
                  <option
                    key={distrito.idDISTRITO}
                    value={distrito.idDISTRITO}
                  >
                    {distrito.nombre}
                  </option>
                ))}
              </select>
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