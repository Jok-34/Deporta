import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { obtenerImagenEspacio } from "../../utils/imagenes";

function ManageSportSpaces() {

  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  const navigate = useNavigate();

  const [espacios, setEspacios] = useState([]);
  const [deportes, setDeportes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [editando, setEditando] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: "",
    id_deporte: "",
    precio_hora: "",
    estado: "Disponible",
    horario_apertura: "08:00",
    horario_cierre: "22:00",
    descripcion: "",
  });

  const [nuevaImagenFile, setNuevaImagenFile] = useState(null);
  const [nuevaImagenPreview, setNuevaImagenPreview] = useState(null);

  useEffect(() => {
    if (usuario?.id) {
      obtenerEspacios();
      obtenerDeportes();
    }
  }, []);

  const obtenerEspacios = async () => {
    try {
      setCargando(true);

      const respuesta = await axios.get(
        `http://localhost:3000/api/espacios/admin/${usuario.id}`
      );

      setEspacios(respuesta.data);

    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
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

  const formatearHoraInput = (hora) => {
    // MySQL devuelve TIME como "08:00:00"; el <input type="time">
    // necesita "08:00".
    return hora ? hora.slice(0, 5) : "";
  };

  const editarEspacio = (espacio) => {

    setEditando(espacio.idESPACIO_DEPORTIVO);

    setFormulario({
      nombre: espacio.nombre,
      id_deporte: espacio.id_deporte,
      precio_hora: espacio.precio,
      estado: espacio.estado,
      horario_apertura: formatearHoraInput(espacio.horario_apertura),
      horario_cierre: formatearHoraInput(espacio.horario_cierre),
      descripcion: espacio.descripcion || "",
    });

    setNuevaImagenFile(null);
    setNuevaImagenPreview(null);
  };

  const cambiarDato = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const cambiarImagen = (e) => {

    const archivo = e.target.files[0];

    if (archivo) {
      setNuevaImagenFile(archivo);
      setNuevaImagenPreview(URL.createObjectURL(archivo));
    }
  };

  const guardarCambios = async () => {
    try {

      const datosFormulario = new FormData();

      datosFormulario.append("nombre", formulario.nombre);
      datosFormulario.append("id_deporte", formulario.id_deporte);
      datosFormulario.append("precio_hora", formulario.precio_hora);
      datosFormulario.append("estado", formulario.estado);
      datosFormulario.append("horario_apertura", formulario.horario_apertura);
      datosFormulario.append("horario_cierre", formulario.horario_cierre);
      datosFormulario.append("descripcion", formulario.descripcion);
      datosFormulario.append("id_usuario", usuario.id);

      if (nuevaImagenFile) {
        datosFormulario.append("imagen", nuevaImagenFile);
      }

      await axios.put(
        `http://localhost:3000/api/espacios/${editando}`,
        datosFormulario,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setEditando(null);
      setNuevaImagenFile(null);
      setNuevaImagenPreview(null);

      obtenerEspacios();

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.mensaje ||
        "No se pudo actualizar el espacio deportivo."
      );
    }
  };

  const eliminarEspacio = async (id) => {

    const confirmar = window.confirm(
      "¿Deseas eliminar este espacio deportivo?"
    );

    if (!confirmar) {
      return;
    }

    try {

      await axios.delete(
        `http://localhost:3000/api/espacios/${id}?id_usuario=${usuario.id}`
      );

      setEspacios(
        espacios.filter(
          (espacio) => espacio.idESPACIO_DEPORTIVO !== id
        )
      );

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.mensaje ||
        "No se pudo eliminar el espacio deportivo."
      );
    }
  };

  const registrarEspacio = () => {
    navigate("/register-sport-space");
  };

  return (

    <div className="bg-white border border-[#D9D9D9] rounded-[10px] p-6">


      <div className="flex justify-between items-center mb-6">


        <h2
          className="text-xl font-bold"
          style={{
            fontFamily:"Instrument Sans"
          }}
        >
          Mis espacios deportivos
        </h2>


        <button

          onClick={registrarEspacio}

          className="bg-[var(--color-primary)] px-4 py-2 rounded-full text-xs"

          style={{
            fontFamily:"Prompt"
          }}

        >
          Registrar espacio
        </button>


      </div>


      {
        cargando ? (
          <p className="text-sm text-gray-500">Cargando espacios...</p>
        ) : espacios.length === 0 ? (
          <p className="text-sm text-gray-500">
            Todavía no has registrado ningún espacio deportivo.
          </p>
        ) : (

      <div className="flex flex-col gap-4">


      {
        espacios.map((espacio)=>(


          <div

          key={espacio.idESPACIO_DEPORTIVO}

          className="border rounded-lg p-4"

          >


            {
              editando === espacio.idESPACIO_DEPORTIVO
              ?

              (

              <div className="flex flex-col gap-3">


                {/* Imagen */}

                <label className="text-sm font-bold">
                  Imagen del espacio
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={cambiarImagen}
                  className="border rounded px-3 py-2 text-sm"
                />

                <img
                  src={
                    nuevaImagenPreview ||
                    obtenerImagenEspacio(espacio)
                  }
                  alt={espacio.nombre}
                  className="w-full h-32 object-cover rounded"
                />



                <input
                name="nombre"
                value={formulario.nombre}
                onChange={cambiarDato}
                className="border rounded px-3 py-2 text-sm"
                placeholder="Nombre"
                />


                <select
                name="id_deporte"
                value={formulario.id_deporte}
                onChange={cambiarDato}
                className="border rounded px-3 py-2 text-sm"
                >
                  <option value="">Selecciona un deporte</option>
                  {
                    deportes.map((deporte)=>(
                      <option
                        key={deporte.idDEPORTE}
                        value={deporte.idDEPORTE}
                      >
                        {deporte.nombre}
                      </option>
                    ))
                  }
                </select>


                <input
                name="precio_hora"
                type="number"
                value={formulario.precio_hora}
                onChange={cambiarDato}
                className="border rounded px-3 py-2 text-sm"
                placeholder="Precio por hora"
                />


                <div className="flex gap-2">

                  <input
                  name="horario_apertura"
                  type="time"
                  value={formulario.horario_apertura}
                  onChange={cambiarDato}
                  className="border rounded px-3 py-2 text-sm flex-1"
                  />

                  <input
                  name="horario_cierre"
                  type="time"
                  value={formulario.horario_cierre}
                  onChange={cambiarDato}
                  className="border rounded px-3 py-2 text-sm flex-1"
                  />

                </div>


                <textarea
                name="descripcion"
                value={formulario.descripcion}
                onChange={cambiarDato}
                className="border rounded px-3 py-2 text-sm resize-none"
                placeholder="Características (grass sintético, iluminación, etc.)"
                rows={2}
                />


                <select
                name="estado"
                value={formulario.estado}
                onChange={cambiarDato}
                className="border rounded px-3 py-2 text-sm"
                >

                  <option value="Disponible">
                    Disponible
                  </option>

                  <option value="Mantenimiento">
                    Mantenimiento
                  </option>

                  <option value="No disponible">
                    No disponible
                  </option>

                </select>



                <div className="flex gap-2">


                  <button

                  onClick={guardarCambios}

                  className="bg-[var(--color-primary)] px-4 py-2 rounded text-xs"

                  >

                    Guardar

                  </button>



                  <button

                  onClick={()=>{
                    setEditando(null);
                    setNuevaImagenFile(null);
                    setNuevaImagenPreview(null);
                  }}

                  className="border px-4 py-2 rounded text-xs"

                  >

                    Cancelar

                  </button>


                </div>


              </div>


              )


              :


              (

              <>


              <img
                src={obtenerImagenEspacio(espacio)}
                alt={espacio.nombre}
                className="w-full h-32 object-cover rounded mb-3"
              />



              <h3 className="font-bold text-base">
                {espacio.nombre}
              </h3>


              <p className="text-sm">
                Complejo: {espacio.complejo}
              </p>


              <p className="text-sm">
                Deporte: {espacio.deporte}
              </p>


              <p className="text-sm">
                Precio: S/{espacio.precio} por hora
              </p>


              <p className="text-sm">
                Estado: {espacio.estado}
              </p>


              <p className="text-sm">
                Horario: {espacio.horario_apertura?.slice(0,5)} - {espacio.horario_cierre?.slice(0,5)}
              </p>


              {
                espacio.descripcion && (
                  <p className="text-sm text-gray-500 mt-1">
                    {espacio.descripcion}
                  </p>
                )
              }



              <div className="flex gap-3 mt-4">


              <button
                onClick={()=>editarEspacio(espacio)}
                className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-black text-xs hover:opacity-80 transition"
                style={{ fontFamily:"Prompt" }}
              >
                Editar
              </button>



              <button
                onClick={()=>eliminarEspacio(espacio.idESPACIO_DEPORTIVO)}
                className="px-4 py-2 rounded-md border border-gray-300 bg-white text-gray-700 text-xs hover:bg-gray-100 transition"
                style={{ fontFamily:"Prompt" }}
              >
                Eliminar
              </button>


              </div>


              </>


              )


            }



          </div>


        ))

      }


      </div>

        )
      }


    </div>

  );

}


export default ManageSportSpaces;
