import {
  FaLocationDot,
  FaBuilding,
  FaMoneyBillWave,
  FaCircleCheck,
} from "react-icons/fa6";
import { MdSportsSoccer } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

function FiltersSidebar({ filtros, setFiltros, obtenerEspacios, registrarBusqueda }) {
  const [localFiltros, setLocalFiltros] = useState({
    distrito: filtros?.distrito || "",
    complejo: filtros?.complejo || "",
    deporte: filtros?.deporte || "",
    precio: filtros?.precio || "",
    estado: filtros?.estado || "",
  });

  const [distritos, setDistritos] = useState([]);
  const [complejos, setComplejos] = useState([]);
  const [deportes, setDeportes] = useState([]);

  useEffect(() => {
    // keep local copy in sync when parent filtros change
    setLocalFiltros({
      distrito: filtros?.distrito || "",
      complejo: filtros?.complejo || "",
      deporte: filtros?.deporte || "",
      precio: filtros?.precio || "",
      estado: filtros?.estado || "",
    });
  }, [filtros]);

  useEffect(() => {
    obtenerDistritos();
    obtenerComplejos();
    obtenerDeportes();
  }, []);

  const aplicarFiltros = () => {
    setFiltros(localFiltros);
    obtenerEspacios(localFiltros);

    if (typeof registrarBusqueda === "function") {
      const nombreDistrito = distritos.find(
        (d) => String(d.idDISTRITO) === String(localFiltros.distrito)
      )?.nombre;

      const nombreComplejo = complejos.find(
        (c) => String(c.idCOMPLEJO) === String(localFiltros.complejo)
      )?.nombre;

      const nombreDeporte = deportes.find(
        (d) => String(d.idDEPORTE) === String(localFiltros.deporte)
      )?.nombre;

      registrarBusqueda({
        distrito: nombreDistrito || "Todos los distritos",
        complejo: nombreComplejo || "Todos los complejos",
        deporte: nombreDeporte || "Todos los deportes",
        precio: localFiltros.precio
          ? `S/ ${localFiltros.precio.replace("-", " - S/ ")}`
          : "Cualquier precio",
        estado: localFiltros.estado || "Cualquiera",
        fecha: new Date().toLocaleString("es-PE", {
          dateStyle: "short",
          timeStyle: "short",
        }),
      });
    }
  };

  const limpiarFiltros = () => {
    const filtrosVacios = {
      distrito: "",
      complejo: "",
      deporte: "",
      precio: "",
      estado: "",
    };
    setLocalFiltros(filtrosVacios);
    setFiltros(filtrosVacios);
    obtenerEspacios(filtrosVacios);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFiltros((prev) => ({ ...prev, [name]: value }));
  };

  const obtenerDistritos = async () => {
    try {
      const respuesta = await axios.get("http://localhost:3000/api/distritos");
      setDistritos(respuesta.data);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerComplejos = async () => {
    try {
      const respuesta = await axios.get("http://localhost:3000/api/complejos");
      setComplejos(respuesta.data);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerDeportes = async () => {
    try {
      const respuesta = await axios.get("http://localhost:3000/api/deportes");
      setDeportes(respuesta.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside className="w-[280px] bg-white border border-[#D9D9D9] rounded-[10px] p-5">
      <h2
        className="mb-8"
        style={{ fontFamily: "Instrument Sans", fontSize: "24px", fontWeight: 700 }}
      >
        Filtros
      </h2>

      <div className="mb-7">
        <label className="flex items-center gap-2 mb-3" style={{ fontFamily: "Red Hat Text", fontWeight: 600, fontSize: "15px" }}>
          <FaLocationDot className="text-gray-500 text-[13px]" /> Distrito
        </label>

        <select name="distrito" value={localFiltros.distrito} onChange={handleChange} className="w-full h-[40px] rounded-md border border-[#D9D9D9] px-3 outline-none">
          <option value="">Todos los distritos</option>
          {distritos.map((distrito) => (
            <option key={distrito.idDISTRITO} value={distrito.idDISTRITO}>
              {distrito.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-7">
        <label className="flex items-center gap-2 mb-3" style={{ fontFamily: "Red Hat Text", fontWeight: 600, fontSize: "15px" }}>
          <FaBuilding className="text-gray-500 text-[13px]" /> Complejo
        </label>

        <select name="complejo" value={localFiltros.complejo} onChange={handleChange} className="w-full h-[40px] rounded-md border border-[#D9D9D9] px-3 outline-none">
          <option value="">Todos los complejos</option>
          {complejos.map((complejo) => (
            <option key={complejo.idCOMPLEJO} value={complejo.idCOMPLEJO}>
              {complejo.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-7">
        <label className="flex items-center gap-2 mb-3" style={{ fontFamily: "Red Hat Text", fontWeight: 600, fontSize: "15px" }}>
          <MdSportsSoccer className="text-gray-500 text-[15px]" /> Deporte
        </label>

        <select name="deporte" value={localFiltros.deporte} onChange={handleChange} className="w-full h-[40px] rounded-md border border-[#D9D9D9] px-3 outline-none">
          <option value="">Todos los deportes</option>
          {deportes.map((deporte) => (
            <option key={deporte.idDEPORTE} value={deporte.idDEPORTE}>
              {deporte.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-7">
        <label className="flex items-center gap-2 mb-3" style={{ fontFamily: "Red Hat Text", fontWeight: 600, fontSize: "15px" }}>
          <FaMoneyBillWave className="text-gray-500 text-[13px]" /> Precio por hora
        </label>

        <div className="space-y-3 pl-1" style={{ fontFamily: "Albert Sans", fontSize: "14px" }}>
          <label className="flex items-center gap-2 cursor-pointer hover:text-[#86BE00] transition-colors duration-200">
            <input type="radio" name="precio" value="20-40" checked={localFiltros.precio === "20-40"} onChange={handleChange} /> S/20 - S/40
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-[#86BE00] transition-colors duration-200">
            <input type="radio" name="precio" value="40-60" checked={localFiltros.precio === "40-60"} onChange={handleChange} /> S/40 - S/60
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-[#86BE00] transition-colors duration-200">
            <input type="radio" name="precio" value="60+" checked={localFiltros.precio === "60+"} onChange={handleChange} /> S/60 a más
          </label>
        </div>
      </div>

      <div className="mb-8">
        <label className="flex items-center gap-2 mb-3" style={{ fontFamily: "Red Hat Text", fontWeight: 600, fontSize: "15px" }}>
          <FaCircleCheck className="text-gray-500 text-[13px]" /> Estado
        </label>

        <div className="space-y-3 pl-1" style={{ fontFamily: "Albert Sans", fontSize: "14px" }}>
          <label className="flex items-center gap-2 cursor-pointer hover:text-[#86BE00] transition-colors duration-200">
            <input type="radio" name="estado" value="Disponible" checked={localFiltros.estado === "Disponible"} onChange={handleChange} /> Disponible
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-[#86BE00] transition-colors duration-200">
            <input type="radio" name="estado" value="Mantenimiento" checked={localFiltros.estado === "Mantenimiento"} onChange={handleChange} /> En mantenimiento
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-[#86BE00] transition-colors duration-200">
            <input type="radio" name="estado" value="No disponible" checked={localFiltros.estado === "No disponible"} onChange={handleChange} /> No disponible
          </label>
        </div>
      </div>

      <button onClick={aplicarFiltros} className="w-full h-[42px] rounded-md bg-[#C7F34A] hover:bg-[#b9ea34] transition mb-4" style={{ fontFamily: "Prompt", fontWeight: 500, fontSize: "15px" }}>
        Aplicar filtros
      </button>

      <button onClick={limpiarFiltros} className="w-full h-[42px] rounded-md border border-[#D9D9D9] bg-white hover:bg-gray-50 transition" style={{ fontFamily: "Prompt", fontWeight: 500, fontSize: "15px" }}>
        Limpiar filtros
      </button>
    </aside>
  );
}

export default FiltersSidebar;