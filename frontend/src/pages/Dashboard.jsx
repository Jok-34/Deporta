import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import ReservationTable from "../components/dashboard/ReservationTable";
import DashboardCharts from "../components/dashboard/DashboardCharts";

function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-[var(--color-surface)] p-8">
        <DashboardHeader />

        <DashboardStats />

        {/* Tabla + gráficos */}
        <div className="flex gap-8 mt-6 items-start">
          {/* Izquierda */}
          <div className="w-[55%]">
            <ReservationTable />
          </div>

          {/* Derecha */}
          <div className="w-[45%]">
            <DashboardCharts />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;