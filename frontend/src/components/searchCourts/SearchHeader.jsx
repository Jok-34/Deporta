import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/nuestroLogo.jpg";

function SearchHeader() {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Inicio", route: "/" },
    { label: "Buscar Canchas", route: "/search-courts" },
    { label: "¿Como reservar?", route: "/reservation-guide" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[1600px] mx-auto h-[84px] px-12 flex items-center justify-between">

        {/* Logo */}
        <div
          className="cursor-pointer flex items-center"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Deporta"
            className="w-[64px]"
        />
        </div>

        {/* Menú */}
        <nav className="flex justify-end pr-24">
          <ul
            className="flex items-center gap-14"
            style={{
              fontFamily: "Red Hat Text",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            {menuItems.map((item) => (
              <li
                key={item.label}
                onClick={() => navigate(item.route)}
                className="relative cursor-pointer group pb-1 transition-colors duration-200"
              >
                <span className="text-[#4A4A4A] group-hover:text-[#86BE00] transition-colors duration-200">
                  {item.label}
                </span>

                <span
                  className="
                    absolute
                    left-0
                    -bottom-[7px]
                    w-full
                    h-[2px]
                    bg-[#86BE00]
                    scale-x-0
                    group-hover:scale-x-100
                    transition-transform
                    duration-200
                  "
                />
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </header>
  );
}

export default SearchHeader;