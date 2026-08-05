import {
  FaLocationDot,
  FaBuilding,
  FaMoneyBillWave,
  FaCircleCheck,
} from "react-icons/fa6";
import { MdSportsSoccer } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

function FiltersSidebar({
  filtros,
  setFiltros,
  obtenerEspacios,
}) {

  const aplicarFiltros = () => {
    obtenerEspacios(filtros);
  };

  const [distritos, setDistritos] = useState([]);
  const [complejos, setComplejos] = useState([]);
  const [deportes, setDeportes] = useState([]);
  

const limpiarFiltros = () => {
  const filtrosVacios = {
    distrito: "",
    complejo: "",
    deporte: "",
    precio: "",
    estado: "",
  };

  setFiltros(filtrosVacios);
  obtenerEspacios(filtrosVacios);
};

useEffect(() => {
  obtenerDistritos();
  obtenerComplejos();
  obtenerDeportes();
}, []);

const handleChange = (e) => {
  setFiltros({
    ...filtros,
    [e.target.name]: e.target.value,
  });
};

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

const obtenerComplejos = async () => {
  try {
    const respuesta = await axios.get(
      "http://localhost:3000/api/complejos"
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

console.log(distritos);
console.log(complejos);
console.log(deportes);
  return (
    <aside className="w-[280px] bg-white border border-[#D9D9D9] rounded-[10px] p-5">

      {/* Título */}
      <h2
        className="mb-8"
        style={{
          fontFamily: "Instrument Sans",
          fontSize: "24px",
          fontWeight: 700,
        }}
      >
        Filtros
      </h2>

      {/* Distrito */}
      <div className="mb-7">
        <label
          className="flex items-center gap-2 mb-3"
          style={{
            fontFamily: "Red Hat Text",
            fontWeight: 600,
            fontSize: "15px",
          }}
        >
          <FaLocationDot className="text-gray-500 text-[13px]" />
          Distrito
        </label>

        <select
        name="distrito"
    value={filtros.distrito}
    onChange={handleChange} 
        className="w-full h-[40px] rounded-md border border-[#D9D9D9] px-3 outline-none">
          <option value="">Todos los distritos</option>

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

      {/* Complejo */}
      <div className="mb-7">
                <label
                  className="flex items-center gap-2 mb-3"
                  style={{
                    fontFamily: "Red Hat Text",
                    fontWeight: 600,
                    fontSize: "15px",
                  }}
                >
                  <FaBuilding className="text-gray-500 text-[13px]" />
                  Complejo
                </label>

                <select 
                 name="complejo"
    value={filtros.complejo}
    onChange={handleChange}
                className="w-full h-[40px] rounded-md border border-[#D9D9D9] px-3 outline-none">
          <option value="">Todos los complejos</option>

          {complejos.map((complejo) => (
            <option
              key={complejo.idCOMPLEJO}
              value={complejo.idCOMPLEJO}
            >
              {complejo.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Deporte */}
      <div className="mb-7">
        <label
          className="flex items-center gap-2 mb-3"
          style={{
            fontFamily: "Red Hat Text",
            fontWeight: 600,
            fontSize: "15px",
          }}
        >
          <MdSportsSoccer className="text-gray-500 text-[15px]" />
          Deporte
        </label>

                <select 
                 name="deporte"
    value={filtros.deporte}
    onChange={handleChange}
                className="w-full h-[40px] rounded-md border border-[#D9D9D9] px-3 outline-none">
          <option value="">Todos los deportes</option>

          {deportes.map((deporte) => (
            <option
              key={deporte.idDEPORTE}
              value={deporte.idDEPORTE}
            >
              {deporte.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Precio */}
      <div className="mb-7">
        <label
          className="flex items-center gap-2 mb-3"
          style={{
            fontFamily: "Red Hat Text",
            fontWeight: 600,
            fontSize: "15px",
          }}
        >
          <FaMoneyBillWave className="text-gray-500 text-[13px]" />
          Precio por hora
        </label>
<div
  className="space-y-3 pl-1"
  style={{
    fontFamily: "Albert Sans",
    fontSize: "14px",
  }}
>
  <label className="flex items-center gap-2 cursor-pointer hover:text-[#86BE00] transition-colors duration-200">
    <input
    type="radio"
    name="precio"
    value="20-40"
    onChange={handleChange}
/>
    S/20 - S/40
  </label>

  <label className="flex items-center gap-2 cursor-pointer hover:text-[#86BE00] transition-colors duration-200">
    <input
    type="radio"
    name="precio"
    value="40-60"
    onChange={handleChange}
/>
S/40 - S/60
  </label>

  <label className="flex items-center gap-2 cursor-pointer hover:text-[#86BE00] transition-colors duration-200">
   <input
    type="radio"
    name="precio"
    value="60+"
    onChange={handleChange}
/>
    S/60 a más
  </label>
</div>
      </div>

      {/* Estado */}
      <div className="mb-8">
        <label
          className="flex items-center gap-2 mb-3"
          style={{
            fontFamily: "Red Hat Text",
            fontWeight: 600,
            fontSize: "15px",
          }}
        >
          <FaCircleCheck className="text-gray-500 text-[13px]" />
          Estado
        </label>

     <div
  className="space-y-3 pl-1"
  style={{
    fontFamily: "Albert Sans",
    fontSize: "14px",
  }}
>
  <label className="flex items-center gap-2 cursor-pointer hover:text-[#86BE00] transition-colors duration-200">
    <input
    type="radio"
    name="estado"
    value="Disponible"
    onChange={handleChange}
/>
    Disponible
  </label>

  <label className="flex items-center gap-2 cursor-pointer hover:text-[#86BE00] transition-colors duration-200">
    <input
    type="radio"
    name="estado"
    value="No Disponible"
    onChange={handleChange}
/>
    No disponible
  </label>
</div>
      </div>

      {/* Botones */}
      <button
       onClick={aplicarFiltros}
        className="w-full h-[42px] rounded-md bg-[#C7F34A] hover:bg-[#b9ea34] transition mb-4"
        style={{
          fontFamily: "Prompt",
          fontWeight: 500,
          fontSize: "15px",
        }}
      >
        Aplicar filtros
      </button>

      <button
        onClick={limpiarFiltros}
        className="w-full h-[42px] rounded-md border border-[#D9D9D9] bg-white hover:bg-gray-50 transition"
        style={{
          fontFamily: "Prompt",
          fontWeight: 500,
          fontSize: "15px",
        }}
      >
        Limpiar filtros
      </button>
    </aside>
  );
}

export default FiltersSidebar;