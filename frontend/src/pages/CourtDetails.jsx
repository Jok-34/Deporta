
import { useNavigate } from "react-router-dom";

function CourtDetails() {

  const navigate = useNavigate();

  const cancha = JSON.parse(
    localStorage.getItem("canchaSeleccionada")
  );


  return (

    <div className="min-h-screen bg-[#F8F8F8] p-10">

      <div className="max-w-[900px] mx-auto bg-white rounded-[10px] border p-8">

        {
          cancha && (

            <>

              <img
                src={cancha.image}
                alt={cancha.name}
                className="w-full h-[350px] object-cover rounded-lg mb-6"
              />


              <h1
                className="text-3xl font-bold mb-5"
                style={{
                  fontFamily:"Instrument Sans"
                }}
              >
                {cancha.name}
              </h1>


              <p className="mb-2">
                <strong>Cancha:</strong> {cancha.name}
              </p>


              <p className="mb-2">
                <strong>Complejo:</strong> {cancha.complejo}
              </p>


              <p className="mb-2">
                <strong>Deporte:</strong> {cancha.deporte}
              </p>


              <p className="mb-2">
                <strong>Aforo:</strong> {cancha.aforo || "No especificado"} personas
              </p>


              <p className="mb-2">
                <strong>Ubicación:</strong> {cancha.ubicacion || "No especificada"}
              </p>


              <p className="mb-2">
                <strong>Teléfono:</strong> {cancha.telefono || "No especificado"}
              </p>


              <p className="mb-5">
                <strong>Detalles del espacio:</strong> {cancha.detalles || "Sin detalles disponibles"}
              </p>


              <p className="text-xl font-bold mb-6">
                <strong>Precio:</strong> S/ {cancha.price} por hora
              </p>



              <button

                onClick={() => navigate("/reservation")}

                className="bg-[#C7F34A] px-8 py-3 rounded-full"

              >

                Reservar cancha

              </button>


            </>

          )
        }


      </div>


    </div>

  );

}


export default CourtDetails;
