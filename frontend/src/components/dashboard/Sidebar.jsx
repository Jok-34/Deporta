import logoEmpresaRegistrada from "../../assets/images/logoEmpresaRegistrada.jpg";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="w-[180px] min-h-screen bg-[var(--color-secondary)] flex flex-col items-center py-4">
      {/* Logo */}
      <img
        src={logoEmpresaRegistrada}
        alt="SERPAR"
        className="w-20 h-20 rounded-full object-cover mt-4"
      />

      {/* Bienvenida */}
      <p
        className="text-white text-center text-sm mt-6"
        style={{ fontFamily: "Red Hat Text" }}
      >
        ¡Bienvenido
        <br />
        SERPAR!
      </p>

      {/* Empuja el botón hacia abajo */}
      <div className="flex-1"></div>

      {/* Botón */}
      <button
       onClick={() => navigate("/")}
        className="mb-8 bg-white text-[var(--color-secondary)] rounded-full px-4 py-2 text-[12px]"
        style={{ fontFamily: "Prompt" }}
      >
        CERRAR SESIÓN
      </button>
    </aside>
  );
}

export default Sidebar;