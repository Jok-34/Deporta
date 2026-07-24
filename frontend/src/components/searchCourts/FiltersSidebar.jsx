import {
  FaLocationDot,
  FaBuilding,
  FaMoneyBillWave,
  FaCircleCheck,
} from "react-icons/fa6";
import { MdSportsSoccer } from "react-icons/md";

function FiltersSidebar() {
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

        <input
          type="text"
          placeholder="Surco"
          className="w-full h-[40px] rounded-md border border-[#D9D9D9] px-3 outline-none"
          style={{
            fontFamily: "Albert Sans",
            fontSize: "14px",
          }}
        />
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

        <input
          type="text"
          placeholder="Todos los complejos"
          className="w-full h-[40px] rounded-md border border-[#D9D9D9] px-3 outline-none"
          style={{
            fontFamily: "Albert Sans",
            fontSize: "14px",
          }}
        />
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

        <input
          type="text"
          placeholder="Futbol"
          className="w-full h-[40px] rounded-md border border-[#D9D9D9] px-3 outline-none"
          style={{
            fontFamily: "Albert Sans",
            fontSize: "14px",
          }}
        />
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
    <input type="radio" name="precio" />
    S/20 - S/40
  </label>

  <label className="flex items-center gap-2 cursor-pointer hover:text-[#86BE00] transition-colors duration-200">
    <input type="radio" name="precio" />
    S/40 - S/60
  </label>

  <label className="flex items-center gap-2 cursor-pointer hover:text-[#86BE00] transition-colors duration-200">
    <input type="radio" name="precio" />
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
    <input type="radio" name="estado" />
    Disponible
  </label>

  <label className="flex items-center gap-2 cursor-pointer hover:text-[#86BE00] transition-colors duration-200">
    <input type="radio" name="estado" />
    No disponible
  </label>
</div>
      </div>

      {/* Botones */}
      <button
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