import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import ReservationTable from "../components/dashboard/ReservationTable";
import EditSportSpace from "../components/dashboard/ManageSportSpaces";

function Dashboard() {
  return (
    <div className="flex min-h-screen">

      <Sidebar />

      <main className="flex-1 bg-[var(--color-surface)] p-8">

        <DashboardHeader />

        <DashboardStats />


        {/* Reservaciones + Administración del complejo */}
        <div className="flex gap-8 mt-6 items-start">


          {/* Tabla de reservaciones */}
          <div className="w-[60%]">

            <ReservationTable />

          </div>



          {/* Editar complejo / espacio deportivo */}
          <div className="w-[40%]">

            <EditSportSpace />

          </div>


        </div>


      </main>

    </div>
  );
}

export default Dashboard;