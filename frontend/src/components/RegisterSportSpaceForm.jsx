import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterSportSpaceForm() {

  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  const [complejos, setComplejos] = useState([]);
  const [deportes, setDeportes] = useState([]);

  const [formData, setFormData] = useState({
    id_complejo: "",
    nombre: "",
    id_deporte: "",
    precio_hora: "",
    horario_apertura: "08:00",
    horario_cierre: "22:00",
    descripcion: "",
  });

  const [imagenFile, setImagenFile] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);

  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    if (!usuario?.id) {
      alert("Debes iniciar sesión como administrador para registrar un espacio deportivo.");
      navigate("/login");
      return;
    }

    obtenerComplejos();
    obtenerDeportes();

  }, []);

  const obtenerComplejos = async () => {
    try {
      // Solo los complejos que pertenecen a este administrador.
      const respuesta = await axios.get(
        `http://localhost:3000/api/complejos?id_usuario=${usuario.id}`
      );

      setComplejos(respuesta.data);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerDeportes = async () => {
    try {
      const respuesta = await axios.get(
        "http://localhost:3000/api/deportes"
      );

      setDeportes(respuesta.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrores({
      ...errores,
      [e.target.name]: "",
    });
  };

  const handleImagenChange = (e) => {

    const archivo = e.target.files[0];

    if (!archivo) {
      setImagenFile(null);
      setImagenPreview(null);
      return;
    }

    if (!archivo.type.startsWith("image/")) {
      setErrores({
        ...errores,
        imagen: "Selecciona un archivo de imagen válido.",
      });
      return;
    }

    if (archivo.size > 5 * 1024 * 1024) {
      setErrores({
        ...errores,
        imagen: "La imagen no debe superar los 5MB.",
      });
      return;
    }

    setErrores({ ...errores, imagen: "" });
    setImagenFile(archivo);
    setImagenPreview(URL.createObjectURL(archivo));
  };

  const validarFormulario = () => {

    const nuevosErrores = {};

    if (!formData.id_complejo) {
      nuevosErrores.id_complejo = "Selecciona un complejo";
    }

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "Ingresa el nombre del espacio";
    }

    if (!formData.id_deporte) {
      nuevosErrores.id_deporte = "Selecciona un deporte";
    }

    if (!formData.precio_hora || Number(formData.precio_hora) <= 0) {
      nuevosErrores.precio_hora = "Ingresa un precio válido";
    }

    if (!formData.horario_apertura) {
      nuevosErrores.horario_apertura = "Ingresa la hora de apertura";
    }

    if (!formData.horario_cierre) {
      nuevosErrores.horario_cierre = "Ingresa la hora de cierre";
    }

    if (
      formData.horario_apertura &&
      formData.horario_cierre &&
      formData.horario_apertura >= formData.horario_cierre
    ) {
      nuevosErrores.horario_cierre = "Debe ser posterior a la hora de apertura";
    }

    setErrores({ ...errores, ...nuevosErrores });

    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    setEnviando(true);

    try {

      const datosFormulario = new FormData();

      datosFormulario.append("id_complejo", formData.id_complejo);
      datosFormulario.append("id_deporte", formData.id_deporte);
      datosFormulario.append("nombre", formData.nombre);
      datosFormulario.append("precio_hora", formData.precio_hora);
      datosFormulario.append("horario_apertura", formData.horario_apertura);
      datosFormulario.append("horario_cierre", formData.horario_cierre);
      datosFormulario.append("descripcion", formData.descripcion);

      if (imagenFile) {
        datosFormulario.append("imagen", imagenFile);
      }

      await axios.post(
        "http://localhost:3000/api/espacios/register",
        datosFormulario,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      navigate("/register-sport-space-success");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.mensaje ||
        "No se pudo registrar el espacio deportivo."
      );

    } finally {
      setEnviando(false);
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

          {
            complejos.length === 0 && (
              <p className="text-center text-sm text-red-600 mb-6">
                Todavía no tienes un complejo registrado.{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register-complex")}
                  className="underline font-bold"
                >
                  Regístralo primero
                </button>
                .
              </p>
            )
          }

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Seleccionar complejo */}
            <div>
              <select
                name="id_complejo"
                value={formData.id_complejo}
                onChange={handleChange}
                className="w-full rounded-full border border-gray-300 px-6 py-3"
              >
                <option value="">Selecciona un complejo</option>

                {complejos.map((complejo) => (
                  <option
                    key={complejo.idCOMPLEJO}
                    value={complejo.idCOMPLEJO}
                  >
                    {complejo.nombre}
                  </option>
                ))}
              </select>

              {errores.id_complejo && (
                <p className="text-red-500 text-xs mt-1 ml-4">
                  {errores.id_complejo}
                </p>
              )}
            </div>

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
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingresa el nombre"
                  className="w-full rounded-full border border-gray-300 px-6 py-3"
                  style={{ fontFamily: "Red Hat Text" }}
                />

              {errores.nombre && (
                <p className="text-red-500 text-xs mt-1 ml-4">
                  {errores.nombre}
                </p>
              )}
            </div>

            {/* Deporte */}
            <div>
              <label
                className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                style={{ fontFamily: "Instrument Sans" }}
              >
                Deporte
              </label>

              <select
                name="id_deporte"
                value={formData.id_deporte}
                onChange={handleChange}
                className="w-full rounded-full border border-gray-300 px-6 py-3"
              >
                <option value="">Selecciona un deporte</option>

                {deportes.map((deporte) => (
                  <option
                    key={deporte.idDEPORTE}
                    value={deporte.idDEPORTE}
                  >
                    {deporte.nombre}
                  </option>
                ))}
              </select>

              {errores.id_deporte && (
                <p className="text-red-500 text-xs mt-1 ml-4">
                  {errores.id_deporte}
                </p>
              )}
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
                  name="precio_hora"
                  value={formData.precio_hora}
                  onChange={handleChange}
                  placeholder="Ingresa el precio"
                  className="w-full rounded-full border border-gray-300 px-6 py-3"
                  style={{ fontFamily: "Red Hat Text" }}
                />

              {errores.precio_hora && (
                <p className="text-red-500 text-xs mt-1 ml-4">
                  {errores.precio_hora}
                </p>
              )}
            </div>

            {/* Horarios */}
            <div className="flex gap-3">

              <div className="flex-1">
                <label
                  className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                  style={{ fontFamily: "Instrument Sans" }}
                >
                  Abre
                </label>

                <input
                  type="time"
                  name="horario_apertura"
                  value={formData.horario_apertura}
                  onChange={handleChange}
                  className="w-full rounded-full border border-gray-300 px-6 py-3"
                  style={{ fontFamily: "Red Hat Text" }}
                />

                {errores.horario_apertura && (
                  <p className="text-red-500 text-xs mt-1 ml-4">
                    {errores.horario_apertura}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label
                  className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                  style={{ fontFamily: "Instrument Sans" }}
                >
                  Cierra
                </label>

                <input
                  type="time"
                  name="horario_cierre"
                  value={formData.horario_cierre}
                  onChange={handleChange}
                  className="w-full rounded-full border border-gray-300 px-6 py-3"
                  style={{ fontFamily: "Red Hat Text" }}
                />

                {errores.horario_cierre && (
                  <p className="text-red-500 text-xs mt-1 ml-4">
                    {errores.horario_cierre}
                  </p>
                )}
              </div>

            </div>

            {/* Características / descripción */}
            <div>
              <label
                className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                style={{ fontFamily: "Instrument Sans" }}
              >
                Características del espacio
              </label>

              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                placeholder="Ej: grass sintético, iluminación LED, camerinos..."
                rows={3}
                className="w-full rounded-2xl border border-gray-300 px-6 py-3 resize-none"
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

              <label
                htmlFor="imagenEspacio"
                className="w-[140px] h-[110px] border border-gray-300 rounded flex items-center justify-center text-center text-[10px] text-gray-400 cursor-pointer overflow-hidden hover:border-[var(--color-primary)] transition"
              >
                {
                  imagenPreview
                  ? (
                    <img
                      src={imagenPreview}
                      alt="Vista previa"
                      className="w-full h-full object-cover"
                    />
                  )
                  : (
                    <>
                      Suba una
                      <br />
                      imagen de su
                      <br />
                      espacio
                      <br />
                      deportivo
                    </>
                  )
                }
              </label>

              <input
                id="imagenEspacio"
                type="file"
                accept="image/*"
                onChange={handleImagenChange}
                className="hidden"
              />

              {errores.imagen && (
                <p className="text-red-500 text-xs mt-1 ml-4">
                  {errores.imagen}
                </p>
              )}
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={enviando}
              className="mt-2 rounded-full py-4 bg-[var(--color-primary)] text-black disabled:opacity-60"
              style={{ fontFamily: "Prompt" }}
            >
              {enviando ? "REGISTRANDO..." : "REGISTRAR"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default RegisterSportSpaceForm;
