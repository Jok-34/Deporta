import logoEmpresaRegistrada from "../../assets/images/logoEmpresaRegistrada.jpg";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  return (
    <aside className="w-[180px] min-h-screen bg-[var(--color-secondary)] flex flex-col items-center py-4">
      {/* Logo */}
      <img
        src={logoEmpresaRegistrada}
        alt="Deporta"
        className="w-20 h-20 rounded-full object-cover mt-4"
      />

      {/* Bienvenida */}
      <p
        className="text-white text-center text-sm mt-6"
        style={{ fontFamily: "Red Hat Text" }}
      >
        ¡Bienvenido
        <br />
        {usuario?.nombre || "administrador"}!
      </p>

      {/* Empuja el botón hacia abajo */}
      <div className="flex-1"></div>

      {/* Botón */}
      <button
       onClick={cerrarSesion}
        className="mb-8 bg-white text-[var(--color-secondary)] rounded-full px-4 py-2 text-[12px]"
        style={{ fontFamily: "Prompt" }}
      >
        Cerrar sesión
      </button>
    </aside>
  );
}

export default Sidebar;