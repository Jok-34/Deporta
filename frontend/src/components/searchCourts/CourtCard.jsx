import { useNavigate } from "react-router-dom";


function CourtCard({
  idESPACIO_DEPORTIVO,
  image,
  available = true,
  name,
  complejo,
  deporte,
  description = "Inicia sesión para revisar tus reservas, agendar un nuevo partido.",
  price,
  duration = "1h",
  aforo,
  ubicacion,
  telefono,
  detalles,
  verDetalles,
}) {


  const navigate = useNavigate();



  const guardarCancha = () => {


    const canchaSeleccionada = {

      idESPACIO_DEPORTIVO,
      image,
      name,
      complejo,
      deporte,
      price,
      duration,
      aforo,
      ubicacion,
      telefono,
      detalles,

    };



    localStorage.setItem(

      "canchaSeleccionada",

      JSON.stringify(canchaSeleccionada)

    );



    return canchaSeleccionada;

  };






  const reservarCancha = () => {


    guardarCancha();

    navigate("/reservation");


  };






  return (

    <div className="bg-white border border-[#D9D9D9] rounded-[10px] overflow-hidden">



      {/* Imagen */}

      <div className="relative">


        <img

          src={image}

          alt={name}

          className="w-full h-36 object-cover"

        />



        <span

          className="absolute top-4 left-4 bg-[#C7F34A] rounded-md px-4 py-1.5"

          style={{

            fontFamily:"Prompt",

            fontSize:"12px",

            fontWeight:500,

          }}

        >

          {available ? "DISPONIBLE" : "NO DISPONIBLE"}


        </span>



      </div>







      {/* Contenido */}


      <div className="p-4">



        <h3

          className="mb-2"

          style={{

            fontFamily:"Instrument Sans",

            fontSize:"20px",

            fontWeight:500,

          }}

        >

          {name}


        </h3>






        <p className="text-[#5F5F5F] text-sm mb-1">

          <strong>Complejo:</strong> {complejo}

        </p>





        <p className="text-[#5F5F5F] text-sm mb-3">

          <strong>Deporte:</strong> {deporte}

        </p>






        <p

          className="text-[#5F5F5F] mb-4 leading-6"

          style={{

            fontFamily:"Red Hat Text",

            fontSize:"14px",

          }}

        >

          {description}


        </p>






        <div

          className="flex justify-end items-center gap-1 mb-5"

        >


          <span>

            S/ {price}

          </span>



          <span className="text-gray-500">

            {duration}

          </span>



        </div>







        <div className="flex gap-3">






          <button


            onClick={verDetalles}


            className="flex-1 h-[36px] rounded-full bg-[#C7F34A] hover:bg-[#b8e43f] transition"


            style={{

              fontFamily:"Prompt",

              fontSize:"11px",

            }}


          >


            VER DETALLES


          </button>








          <button


            onClick={reservarCancha}


            className="flex-1 h-[36px] rounded-full bg-[#C7F34A] hover:bg-[#b8e43f] transition"


            style={{

              fontFamily:"Prompt",

              fontSize:"11px",

            }}


          >


            RESERVAR


          </button>





        </div>





      </div>





    </div>

  );

}


export default CourtCard;