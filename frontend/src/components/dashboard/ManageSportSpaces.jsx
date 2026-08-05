import { useState } from "react";

function ManageSportSpaces() {

  const [espacios, setEspacios] = useState([
    {
      id: 1,
      nombre: "Cancha Fútbol 1",
      deporte: "Fútbol",
      precio: 50,
      estado: "Disponible",
      imagen: null,
    },
    {
      id: 2,
      nombre: "Cancha Fútbol 2",
      deporte: "Fútbol",
      precio: 60,
      estado: "Disponible",
      imagen: null,
    },
    {
      id: 3,
      nombre: "Piscina Olímpica",
      deporte: "Natación",
      precio: 40,
      estado: "Mantenimiento",
      imagen: null,
    },
    {
      id: 4,
      nombre: "Cancha Básquet",
      deporte: "Básquet",
      precio: 45,
      estado: "Disponible",
      imagen: null,
    },
  ]);


  const [editando, setEditando] = useState(null);


  const [formulario, setFormulario] = useState({
    nombre: "",
    deporte: "",
    precio: "",
    estado: "Disponible",
    imagen: null,
  });



  const editarEspacio = (espacio) => {

    setEditando(espacio.id);

    setFormulario({
      nombre: espacio.nombre,
      deporte: espacio.deporte,
      precio: espacio.precio,
      estado: espacio.estado,
      imagen: espacio.imagen,
    });

  };



  const cambiarDato = (e)=>{

    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });

  };



  const cambiarImagen = (e)=>{

    const archivo = e.target.files[0];

    if(archivo){

      setFormulario({
        ...formulario,
        imagen: URL.createObjectURL(archivo)
      });

    }

  };



  const guardarCambios = ()=>{

    setEspacios(
      espacios.map((espacio)=>

        espacio.id === editando
        ?
        {
          ...espacio,
          ...formulario,
          precio:Number(formulario.precio)
        }
        :
        espacio

      )
    );

    setEditando(null);

  };



  const eliminarEspacio = (id)=>{

    const confirmar = window.confirm(
      "¿Deseas eliminar este espacio deportivo?"
    );


    if(confirmar){

      setEspacios(
        espacios.filter(
          (espacio)=> espacio.id !== id
        )
      );

    }

  };



  const registrarEspacio = ()=>{

    const nuevo = {

      id: Date.now(),

      nombre:"Nuevo espacio",

      deporte:"Fútbol",

      precio:50,

      estado:"Disponible",

      imagen:null

    };


    setEspacios([
      ...espacios,
      nuevo
    ]);

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
          Espacios deportivos
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



      <div className="flex flex-col gap-4">


      {
        espacios.map((espacio)=>(


          <div

          key={espacio.id}

          className="border rounded-lg p-4"

          >


            {
              editando === espacio.id
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


                {
                  formulario.imagen && (

                    <img
                      src={formulario.imagen}
                      className="w-full h-32 object-cover rounded"
                    />

                  )
                }



                <input
                name="nombre"
                value={formulario.nombre}
                onChange={cambiarDato}
                className="border rounded px-3 py-2 text-sm"
                />


                <input
                name="deporte"
                value={formulario.deporte}
                onChange={cambiarDato}
                className="border rounded px-3 py-2 text-sm"
                />


                <input
                name="precio"
                type="number"
                value={formulario.precio}
                onChange={cambiarDato}
                className="border rounded px-3 py-2 text-sm"
                />


                <select
                name="estado"
                value={formulario.estado}
                onChange={cambiarDato}
                className="border rounded px-3 py-2 text-sm"
                >

                  <option>
                    Disponible
                  </option>

                  <option>
                    Mantenimiento
                  </option>

                  <option>
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

                  onClick={()=>setEditando(null)}

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


              {
                espacio.imagen && (

                  <img
                    src={espacio.imagen}
                    className="w-full h-32 object-cover rounded mb-3"
                  />

                )
              }



              <h3 className="font-bold text-base">
                {espacio.nombre}
              </h3>


              <p className="text-sm">
                Deporte: {espacio.deporte}
              </p>


              <p className="text-sm">
                Precio: S/{espacio.precio} por hora
              </p>


              <p className="text-sm">
                Estado: {espacio.estado}
              </p>



              <div className="flex gap-3 mt-4">


              <button
                onClick={()=>editarEspacio(espacio)}
                className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-black text-xs hover:opacity-80 transition"
                style={{ fontFamily:"Prompt" }}
              >
                Editar
              </button>



              <button
                onClick={()=>eliminarEspacio(espacio.id)}
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


    </div>

  );

}


export default ManageSportSpaces;