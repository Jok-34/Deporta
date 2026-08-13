import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Validaciones del frontend
  const [errores, setErrores] = useState({
    correo: "",
    contrasena: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const nuevosErrores = {
      correo: "",
      contrasena: "",
    };

    let valido = true;


    if (!correo.trim()) {
  nuevosErrores.correo = "Ingrese su correo.";
  valido = false;
} else if (!/\S+@\S+\.\S+/.test(correo)) {
  nuevosErrores.correo = "Ingrese un correo válido.";
  valido = false;
}

    if (!contrasena.trim()) {
      nuevosErrores.contrasena = "Ingrese su contraseña.";
      valido = false;
    }

    setErrores(nuevosErrores);

    if (!valido) return;

    try {
      const respuesta = await axios.post(
        "http://localhost:3000/api/usuarios/login",
        {
          correo,
          contrasena,
        }
      );

      setMensaje("");

      const usuario = respuesta.data.usuario;

          localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
          );

          if (usuario.id_rol === 1) {
            navigate("/dashboard");
          } else {
            navigate("/search-courts");
          }

    } catch (error) {
      setMensaje(
        error.response?.data?.mensaje || "Error al iniciar sesión"
      );
    }
  };

  return (
    <section className="flex min-h-screen">

      {/* Panel izquierdo */}
      <div className="w-1/2 bg-[var(--color-secondary)] flex flex-col justify-center px-20">

        <h1
          className="text-white text-[40px] font-bold tracking-[3%] mb-10"
          style={{ fontFamily: "Instrument Sans" }}
        >
          ¡Qué bueno
          <br />
          verte de vuelta!
        </h1>

        <p
          className="text-white text-[21px] max-w-md"
          style={{ fontFamily: "Red Hat Text" }}
        >
          Inicia sesión para revisar tus reservas,
          agendar un nuevo partido en tus espacios
          favoritos y no perderte de ningún
          descuento exclusivo hoy.
        </p>

      </div>

      {/* Panel derecho */}
      <div className="w-1/2 bg-[var(--color-surface)] flex items-center justify-center">

        <div className="w-[420px]">

          <h2
            className="text-center text-[34px] font-bold mb-10"
            style={{ fontFamily: "Instrument Sans" }}
          >
            Iniciar sesión
          </h2>

          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-5"
          >

            <div>

              <label
                className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                style={{ fontFamily: "Instrument Sans" }}
              >
                Correo
              </label>

              <input
                type="email"
                placeholder="Ingresa tu correo"
                value={correo}
                onChange={(e) => {
                  setCorreo(e.target.value);
                  setMensaje("");
                  setErrores({
                    ...errores,
                    correo: "",
                  });
                }}
                className="w-full rounded-full border border-gray-300 px-6 py-3"
                style={{ fontFamily: "Red Hat Text" }}
              />

              {errores.correo && (
                <p className="text-red-500 text-sm mt-2">
                  {errores.correo}
                </p>
              )}

            </div>

            <div>

              <label
                className="block mb-2 text-[#777777] text-[14.5px] font-bold"
                style={{ fontFamily: "Instrument Sans" }}
              >
                Contraseña
              </label>

              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                value={contrasena}
                onChange={(e) => {
                  setContrasena(e.target.value);
                  setMensaje("");
                  setErrores({
                    ...errores,
                    contrasena: "",
                  });
                }}
                className="w-full rounded-full border border-gray-300 px-6 py-3"
                style={{ fontFamily: "Red Hat Text" }}
              />

              {errores.contrasena && (
                <p className="text-red-500 text-sm mt-2">
                  {errores.contrasena}
                </p>
              )}

            </div>

            <button
              className="mt-6 rounded-full py-4 bg-[var(--color-primary)]"
              style={{ fontFamily: "Prompt" }}
            >
              INICIAR SESIÓN
            </button>

            {mensaje && (
              <p className="text-red-600 text-center text-sm mt-2">
                {mensaje}
              </p>
            )}

          </form>

          <p
            className="text-center mt-10 text-[#777777] font-bold"
            style={{ fontFamily: "Instrument Sans" }}
          >
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-[#86BE00]">
              Regístrate
            </Link>
          </p>

        </div>

      </div>

    </section>
  );
}

export default LoginForm;