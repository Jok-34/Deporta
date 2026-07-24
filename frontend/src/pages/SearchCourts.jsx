import SearchHeader from "../components/searchCourts/SearchHeader";
import FiltersSidebar from "../components/searchCourts/FiltersSidebar";
import CourtCard from "../components/searchCourts/CourtCard";

import cancha1 from "../assets/images/cancha1.jpg";
import cancha2 from "../assets/images/cancha2.jpg";
import cancha3 from "../assets/images/cancha3.jpg";
import cancha4 from "../assets/images/cancha4.jpg";
import cancha5 from "../assets/images/cancha5.jpg";

function SearchCourts() {
  const courts = [
    { image: cancha1, available: true },
    { image: cancha2, available: false },
    { image: cancha3, available: true },
    { image: cancha4, available: true },
    { image: cancha1, available: true },
    { image: cancha5, available: false },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F8]">

      <SearchHeader />

      <div className="max-w-[1500px] mx-auto flex gap-10 px-8 py-10">

        <FiltersSidebar />

        <div className="flex-1">

          <h2 className="font-bold text-xl mb-8">
            Resultados de búsqueda
          </h2>

          <div className="grid grid-cols-3 gap-8">
            {courts.map((court, index) => (
              <CourtCard
                key={index}
                image={court.image}
                available={court.available}
              />
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}

export default SearchCourts;