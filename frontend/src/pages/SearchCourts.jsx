import SearchHeader from "../components/searchCourts/SearchHeader";
import FiltersSidebar from "../components/searchCourts/FiltersSidebar";
import CourtCard from "../components/searchCourts/CourtCard";

import cancha1 from "../assets/images/cancha1.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

function SearchCourts() {
  const [courts, setCourts] = useState([]);

  const [filtros, setFiltros] = useState({
    distrito: "",
    complejo: "",
    deporte: "",
    precio: "",
    estado: "",
  });

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

      setCourts(respuesta.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">

      <SearchHeader />

      <div className="max-w-[1500px] mx-auto flex gap-10 px-8 py-10">

        <FiltersSidebar
          filtros={filtros}
          setFiltros={setFiltros}
          obtenerEspacios={obtenerEspacios}
        />

        <div className="flex-1">

          <h2 className="font-bold text-xl mb-8">
            Resultados de búsqueda
          </h2>

          <div className="grid grid-cols-3 gap-8">
            {courts.map((court) => (
              <CourtCard
                key={court.idESPACIO_DEPORTIVO}
                name={court.nombre}
                complejo={court.complejo}
                deporte={court.deporte}
                price={court.precio}
                image={cancha1}
                available={true}
              />
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}

export default SearchCourts;