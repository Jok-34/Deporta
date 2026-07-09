import logoDeporta from "../../assets/images/logo/nuestroLogo.jpg";

function DashboardHeader() {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1
        className="text-[36px] font-bold text-black"
        style={{ fontFamily: "Instrument Sans" }}
      >
        Dashboard
      </h1>

      <img
        src={logoDeporta}
        alt="Deporta"
        className="w-16 h-auto object-contain"
      />
    </header>
  );
}

export default DashboardHeader;