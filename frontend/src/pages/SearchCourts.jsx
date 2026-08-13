import SearchHeader from "../components/searchCourts/SearchHeader";
import FiltersSidebar from "../components/searchCourts/FiltersSidebar";
import CourtCard from "../components/searchCourts/CourtCard";
import SearchHistory from "../components/searchCourts/SearchHistory";

import { obtenerImagenEspacio } from "../utils/imagenes";

import { useEffect, useState } from "react";
import axios from "axios";


function SearchCourts() {


  const canchasDefault = [
    {
      idESPACIO_DEPORTIVO: 1,
      nombre: "Cancha Fútbol 7",
      complejo: "Complejo Deportivo Sur",
      deporte: "Fútbol",
      precio: 50,
      estado: "Disponible",
      aforo: 14,
      ubicacion: "Villa María del Triunfo",
      telefono: "987654321",
      detalles: "Grass sintético, iluminación LED y camerinos."
    },
    {
      idESPACIO_DEPORTIVO: 2,
      nombre: "Cancha Básquet Premium",
      complejo: "Sport Center Lima",
      deporte: "Básquet",
      precio: 40,
      estado: "Disponible",
      aforo: 10,
      ubicacion: "San Juan de Miraflores",
      telefono: "986543210",
      detalles: "Cancha techada con piso profesional."
    },
    {
      idESPACIO_DEPORTIVO: 3,
      nombre: "Cancha Vóley Arena",
      complejo: "Arena Deportiva",
      deporte: "Vóley",
      precio: 35,
      estado: "Disponible",
      aforo: 12,
      ubicacion: "Miraflores",
      telefono: "985432109",
      detalles: "Piso especial, redes nuevas y zona de descanso."
    }
  ];



  const [courts, setCourts] = useState(canchasDefault);


  const [canchaDetalle, setCanchaDetalle] = useState(null);

  const [errorCarga, setErrorCarga] = useState("");



  const [filtros, setFiltros] = useState({

    distrito: "",
    complejo: "",
    deporte: "",
    precio: "",
    estado: "",

  });



  const [historial, setHistorial] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("historialBusquedas")) || [];
    } catch {
      return [];
    }
  });



  // Guarda una búsqueda (con nombres legibles, no ids) en el
  // historial del cliente y la persiste en localStorage.
  const registrarBusqueda = (entrada) => {

    setHistorial((prev) => {

      const nuevoHistorial = [entrada, ...prev].slice(0, 10);

      localStorage.setItem(
        "historialBusquedas",
        JSON.stringify(nuevoHistorial)
      );

      return nuevoHistorial;

    });

  };



  const limpiarHistorial = () => {
    localStorage.removeItem("historialBusquedas");
    setHistorial([]);
  };







  useEffect(() => {

    obtenerEspacios();

  }, []);







  const obtenerEspacios = async (filtrosBusqueda = {}) => {


    try {


      const respuesta = await axios.get(

        "http://localhost:3000/api/espacios",

        {

          params: filtrosBusqueda,

        }

      );



      console.log(
        "Espacios recibidos:",
        respuesta.data
      );

      setErrorCarga("");
      setCourts(respuesta.data);

    } catch (error) {

      console.error(error);

      // Si la carga real falla, no dejamos las tarjetas de ejemplo
      // como si fueran espacios deportivos reales.
      setCourts([]);
      setErrorCarga(
        "No se pudo conectar con el servidor. Intenta recargar la página."
      );

    }


  };








  return (

    <div className="min-h-screen bg-[#F8F8F8]">


      <SearchHeader />





      <div className="max-w-[1200px] mx-auto flex gap-8 px-8 py-10">





        <FiltersSidebar

          filtros={filtros}

          setFiltros={setFiltros}

          obtenerEspacios={obtenerEspacios}

          registrarBusqueda={registrarBusqueda}

        />







        <div className="flex-1">



          <SearchHistory
            historial={historial}
            onLimpiar={limpiarHistorial}
          />





          <h2

            className="font-bold text-xl mb-8"

            style={{

              fontFamily:"Instrument Sans"

            }}

          >

            Resultados de búsqueda

          </h2>







          <div className="grid grid-cols-3 gap-6">



            {
              errorCarga && (
                <p className="text-red-600 mb-4">
                  {errorCarga}
                </p>
              )
            }

            {

              courts.length === 0 ?


              (

                <p className="text-gray-500">

                  No se encontraron espacios deportivos.

                </p>

              )


              :


              courts.map((court)=>(



                <CourtCard


                  key={court.idESPACIO_DEPORTIVO}

                  id={court.idESPACIO_DEPORTIVO}


                  name={
                    court.nombre
                  }


                  complejo={
                    court.complejo
                  }


                  deporte={
                    court.deporte
                  }


                  description={
                    court.descripcion
                  }


                  price={
                    court.precio
                  }


                  image={
                    obtenerImagenEspacio(court)
                  }


                  available={
                    court.estado === "Disponible"
                  }


                  aforo={
                    court.aforo
                  }


                  ubicacion={
                    court.ubicacion
                  }


                  telefono={
                    court.telefono
                  }


                  detalles={
                    court.detalles
                  }


                  verDetalles={() => setCanchaDetalle(court)}


                />


              ))

            }



          </div>





        </div>





      </div>







      {
        canchaDetalle && (

          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">


            <div className="bg-white rounded-xl p-6 w-[420px] shadow-lg">


              <h2

                className="text-2xl font-bold mb-4"

                style={{
                  fontFamily:"Instrument Sans"
                }}

              >

                {canchaDetalle.nombre}

              </h2>



              <p className="mb-2">
                <strong>Deporte:</strong> {canchaDetalle.deporte}
              </p>


              <p className="mb-2">
                <strong>Aforo:</strong> {canchaDetalle.aforo} personas
              </p>


              <p className="mb-2">
                <strong>Ubicación:</strong> {canchaDetalle.ubicacion}
              </p>


              <p className="mb-2">
                <strong>Complejo:</strong> {canchaDetalle.complejo}
              </p>


              <p className="mb-2">
                <strong>Horario:</strong>{" "}
                {canchaDetalle.horario_apertura?.slice(0, 5)} - {canchaDetalle.horario_cierre?.slice(0, 5)}
              </p>


              <p className="mb-2">
                <strong>Teléfono:</strong> {canchaDetalle.telefono}
              </p>


              <p className="mb-2">
                <strong>Características:</strong>{" "}
                {canchaDetalle.descripcion || "No especificadas."}
              </p>


              <p className="mb-4">
                <strong>Precio:</strong> S/ {canchaDetalle.precio} por hora
              </p>




              <button

                onClick={() => setCanchaDetalle(null)}

                className="bg-[#C7F34A] px-6 py-2 rounded-full"

              >

                Cerrar

              </button>



            </div>


          </div>

        )
      }




    </div>

  );

}


export default SearchCourts;