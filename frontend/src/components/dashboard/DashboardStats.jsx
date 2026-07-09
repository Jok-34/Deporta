function DashboardStats() {
  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
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
          s/ 12.540
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
          4
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
          209
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
          60 %
        </h2>
      </div>
    </div>
  );
}

export default DashboardStats;