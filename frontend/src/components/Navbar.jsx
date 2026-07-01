import { TiArrowSortedDown } from "react-icons/ti";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">

      <h1 className="text-2xl font-bold text-lime-600">
        DEPORTA
      </h1>

      <ul className="flex gap-8 font-medium text-gray-700">

        <li className="flex items-center gap-2 cursor-pointer hover:text-lime-500">
          Registrar Complejo
          <TiArrowSortedDown size={24} />
        </li>

        <li className="cursor-pointer hover:text-lime-500">
          ¿Cómo Reservar?
        </li>

        <li className="flex items-center gap-2 cursor-pointer hover:text-lime-500">
          Buscar por Distrito
          <TiArrowSortedDown size={24} />
        </li>

      </ul>

      <div className="flex gap-3">

        <input
          type="text"
          placeholder="Buscar"
          className="border rounded-full px-5 py-2 outline-none"
        />

        <button className="bg-lime-300 hover:bg-lime-400 px-6 rounded-full">
          Buscar
        </button>

      </div>

    </nav>
  );
}

export default Navbar;