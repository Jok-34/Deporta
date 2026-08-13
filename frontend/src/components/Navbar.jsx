import { TiArrowSortedDown } from "react-icons/ti";
import logo from "../assets/logo/nuestroLogo.jpg";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">

      <img
  src={logo}
  alt="Logo Deporta"
  className="h-20 object-contain"
/>

      <ul className="flex gap-8 font-medium text-gray-700">

        <button
          onClick={() => navigate("/register-complex")}
          className="uppercase flex items-center gap-2 cursor-pointer hover:text-lime-500"
        >
          Registrar Complejo
          <TiArrowSortedDown size={24} />
        </button>

        <button
          onClick={() => navigate("/reservation-guide")}
          className="uppercase hover:text-lime-500"
        >
          ¿CÓMO RESERVAR?
        </button>

        <button
          onClick={() => navigate("/search-courts")}
          className="uppercase flex items-center gap-2 cursor-pointer hover:text-lime-500"
        >
          Buscar por Distrito
          <TiArrowSortedDown size={24} />
        </button>

      </ul>

      <div className="flex gap-3">

        <button
          onClick={() => navigate("/search-courts")}
          className="bg-lime-300 hover:bg-lime-400 px-6 py-2 rounded-full uppercase font-medium"
        >
          Buscar espacio deportivo
        </button>

      </div>

    </nav>
  );
}

export default Navbar;