import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { obtenerImagenEspacio } from "../../utils/imagenes";

function estiloEstado(estado) {
  switch (estado) {
    case "PAGADA":
      return "bg-[#C7F34A] text-black";
    case "ACTIVA":
      return "bg-blue-100 text-blue-700";
    case "COMPLETADA":
      return "bg-gray-200 text-gray-700";
    case "CANCELADA":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function ReservationHistoryList() {

  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {

    if (!usuario?.id) {
      navigate("/login");
      return;
    }

    obtenerHistorial();

  }, []);

  const obtenerHistorial = async () => {
    try {
      setCargando(true);

      const respuesta = await axios.get(
        `http://localhost:3000/api/reservas/cliente/${usuario.id}`
      );

      setReservas(respuesta.data);

    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  const formatearFecha = (fechaHoraInicio) => {
    const fecha = new Date(fechaHoraInicio);
    return fecha.toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatearHora = (fechaHoraInicio, fechaHoraFin) => {
    const inicio = new Date(fechaHoraInicio);
    const fin = new Date(fechaHoraFin);

    const opciones = { hour: "2-digit", minute: "2-digit" };

    return `${inicio.toLocaleTimeString("es-PE", opciones)} - ${fin.toLocaleTimeString("es-PE", opciones)}`;
  };

  return (

    <section className="min-h-screen bg-[var(--color-surface)] px-10 py-10">

      <h1
        className="text-[32px] font-bold mb-8"
        style={{ fontFamily: "Instrument Sans" }}
      >
        Historial de reservas
      </h1>

      {
        cargando ? (

          <p className="text-sm text-gray-500">Cargando tu historial...</p>

        ) : reservas.length === 0 ? (

          <div className="bg-white border border-[#D9D9D9] rounded-[10px] p-10 text-center">

            <p
              className="text-gray-600 mb-4"
              style={{ fontFamily: "Red Hat Text" }}
            >
              Todavía no tienes reservas registradas.
            </p>

            <button
              onClick={() => navigate("/search-courts")}
              className="bg-[#C7F34A] px-6 py-2 rounded-full text-sm"
              style={{ fontFamily: "Prompt" }}
            >
              Buscar espacios deportivos
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {
            reservas.map((reserva) => (

              <div
                key={reserva.idRESERVA}
                className="bg-white border border-[#D9D9D9] rounded-[10px] overflow-hidden"
              >

                <img
                  src={obtenerImagenEspacio({
                    url_imagen: reserva.url_imagen,
                    deporte: reserva.deporte,
                  })}
                  alt={reserva.espacio}
                  className="w-full h-32 object-cover"
                />

                <div className="p-4">

                  <div className="flex justify-between items-start mb-2">

                    <h3
                      className="font-bold text-base"
                      style={{ fontFamily: "Instrument Sans" }}
                    >
                      {reserva.espacio}
                    </h3>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${estiloEstado(reserva.estado)}`}
                      style={{ fontFamily: "Prompt" }}
                    >
                      {reserva.estado}
                    </span>

                  </div>

                  <p className="text-sm text-gray-600">
                    <strong>Complejo:</strong> {reserva.complejo}
                  </p>

                  <p className="text-sm text-gray-600">
                    <strong>Deporte:</strong> {reserva.deporte}
                  </p>

                  <p className="text-sm text-gray-600">
                    <strong>Fecha:</strong> {formatearFecha(reserva.fecha_hora_inicio)}
                  </p>

                  <p className="text-sm text-gray-600">
                    <strong>Hora:</strong> {formatearHora(reserva.fecha_hora_inicio, reserva.fecha_hora_fin)}
                  </p>

                  {
                    reserva.monto_pagado && (
                      <p className="text-sm text-gray-600">
                        <strong>Pagado:</strong> S/ {reserva.monto_pagado}
                      </p>
                    )
                  }

                </div>

              </div>

            ))
          }

          </div>

        )
      }

    </section>

  );

}

export default ReservationHistoryList;
