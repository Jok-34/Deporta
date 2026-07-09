import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";

function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-[var(--color-surface)] p-8">
        <DashboardHeader />

        <DashboardStats />

        {/* Aquí irán la tabla y los gráficos */}
      </main>
    </div>
  );
}

export default Dashboard;