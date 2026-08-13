import { useEffect, useState } from "react";
import axios from "axios";

function DashboardStats() {

  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  const [stats, setStats] = useState({
    ingresosMes: 0,
    reservasHoy: 0,
    reservasMes: 0,
    tasaOcupacion: 0,
    totalEspacios: 0,
  });

  useEffect(() => {
    if (usuario?.id) {
      obtenerEstadisticas();
    }
  }, []);

  const obtenerEstadisticas = async () => {
    try {

      const respuesta = await axios.get(
        `http://localhost:3000/api/reservas/admin/${usuario.id}/estadisticas`
      );

      setStats(respuesta.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-8">

      {
        stats.totalEspacios === 0 && (
          <div className="bg-[#FFF8E1] border border-[#F5D97A] text-[#7A5B00] rounded-md px-5 py-4 mb-6 text-sm">
            Todavía no tienes espacios deportivos registrados, así que
            no hay estadísticas que mostrar. Registra tu primer
            espacio deportivo para empezar a ver reservas e ingresos
            aquí.
          </div>
        )
      }

      <div className="grid grid-cols-4 gap-6">
      {/* Ingresos del mes */}
      <div className="bg-white border border-gray-300 rounded-md p-5">
        <p
          className="text-[#777777] text-[14px]"
          style={{ fontFamily: "Red Hat Text" }}
        >
          Ingresos del mes
        </p>

        <h2
          className="text-[36px] font-bold mt-2"
          style={{ fontFamily: "Instrument Sans" }}
        >
          S/ {stats.ingresosMes}
        </h2>
      </div>

      {/* Reservas hoy */}
      <div className="bg-white border border-gray-300 rounded-md p-5">
        <p
          className="text-[#777777] text-[14px]"
          style={{ fontFamily: "Red Hat Text" }}
        >
          Reservas hoy
        </p>

        <h2
          className="text-[36px] font-bold mt-2"
          style={{ fontFamily: "Instrument Sans" }}
        >
          {stats.reservasHoy}
        </h2>
      </div>

      {/* Reservas del mes */}
      <div className="bg-white border border-gray-300 rounded-md p-5">
        <p
          className="text-[#777777] text-[14px]"
          style={{ fontFamily: "Red Hat Text" }}
        >
          Reservas del mes
        </p>

        <h2
          className="text-[36px] font-bold mt-2"
          style={{ fontFamily: "Instrument Sans" }}
        >
          {stats.reservasMes}
        </h2>
      </div>

      {/* Tasa de ocupación */}
      <div className="bg-white border border-gray-300 rounded-md p-5">
        <p
          className="text-[#777777] text-[14px]"
          style={{ fontFamily: "Red Hat Text" }}
        >
          Tasa de ocupación
        </p>

        <h2
          className="text-[36px] font-bold mt-2"
          style={{ fontFamily: "Instrument Sans" }}
        >
          {stats.tasaOcupacion} %
        </h2>
      </div>
      </div>
    </div>
  );
}

export default DashboardStats;
