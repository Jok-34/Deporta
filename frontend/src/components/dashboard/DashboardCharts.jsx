import graficoTorta from "../../assets/images/graficoTorta.png";
import graficoBarra from "../../assets/images/graficoBarra.png";

function DashboardCharts() {
  return (
    <div className="flex flex-col gap-6">
      {/* Gráfico de torta */}
      <div className="bg-white border border-gray-300 rounded-md p-5">
        <img
          src={graficoTorta}
          alt="Ocupación por Tipo de Cancha"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Gráfico de barras */}
      <div className="bg-white border border-gray-300 rounded-md p-5">
        <img
          src={graficoBarra}
          alt="Reservas por Día de la Semana"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}

export default DashboardCharts;