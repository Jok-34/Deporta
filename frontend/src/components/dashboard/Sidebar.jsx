import logoEmpresaRegistrada from "../../assets/images/logoEmpresaRegistrada.jpg";

function Sidebar() {
  return (
    <aside className="w-[130px] min-h-screen bg-[var(--color-secondary)] flex flex-col items-center py-4">
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
        className="mb-8 bg-white text-[var(--color-secondary)] rounded-full px-4 py-2 text-[12px]"
        style={{ fontFamily: "Prompt" }}
      >
        CERRAR SESIÓN
      </button>
    </aside>
  );
}

export default Sidebar;