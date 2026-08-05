import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function ReservationForm({ cancha }) {

  const navigate = useNavigate();



  return (

    <div className="w-[560px] bg-white rounded-[10px] shadow-2xl px-16 py-12">



      {/* Información de cancha */}

      {
        cancha && (

          <div className="mb-8 border-b pb-5">


            <h2
              className="text-lg font-bold mb-3"
              style={{
                fontFamily:"Instrument Sans"
              }}
            >
              Espacio seleccionado
            </h2>



            <p
              className="text-sm"
              style={{
                fontFamily:"Red Hat Text"
              }}
            >
              <strong>Cancha:</strong> {cancha.name}
            </p>



            <p
              className="text-sm"
              style={{
                fontFamily:"Red Hat Text"
              }}
            >
              <strong>Complejo:</strong> {cancha.complejo}
            </p>



            <p
              className="text-sm"
              style={{
                fontFamily:"Red Hat Text"
              }}
            >
              <strong>Deporte:</strong> {cancha.deporte}
            </p>



            <p
              className="text-sm"
              style={{
                fontFamily:"Red Hat Text"
              }}
            >
              <strong>Precio:</strong> S/ {cancha.price} por hora
            </p>



          </div>

        )
      }






      {/* Título */}

      <h1
        className="text-center mb-10"
        style={{
          fontFamily:"Instrument Sans",
          fontSize:"34px",
          fontWeight:700,
        }}
      >
        Reserva
      </h1>





      {/* Fecha */}

      <div className="mb-6">


        <label
          className="block mb-2"
          style={{
            fontFamily:"Red Hat Text",
            fontSize:"15px",
            fontWeight:600,
          }}
        >
          Seleccionar fecha
        </label>



        <div className="relative">

          <input

            type="date"

            className="w-full h-[44px] border border-[#D9D9D9] rounded-full px-6 pr-12 outline-none"

            style={{
              fontFamily:"Albert Sans",
              fontSize:"14px",
            }}

          />



          <FaCalendarAlt
            className="absolute right-5 top-1/2 -translate-y-1/2 text-[#16324F]"
            size={14}
          />


        </div>


      </div>







      {/* Hora */}

      <div className="mb-6">


        <label
          className="block mb-2"
          style={{
            fontFamily:"Red Hat Text",
            fontSize:"15px",
            fontWeight:600,
          }}
        >
          Seleccionar hora
        </label>




        <div className="relative">


          <select

            className="w-full h-[44px] border border-[#D9D9D9] rounded-full px-6 appearance-none outline-none bg-white"

            style={{
              fontFamily:"Albert Sans",
              fontSize:"14px",
            }}

          >

            <option>
              Seleccionar hora
            </option>

            <option>
              08:00
            </option>

            <option>
              09:00
            </option>

            <option>
              10:00
            </option>

            <option>
              11:00
            </option>

            <option>
              12:00
            </option>


          </select>



          <FaClock
            className="absolute right-5 top-1/2 -translate-y-1/2 text-[#16324F]"
            size={14}
          />


        </div>


      </div>







      {/* Horas */}

      <div className="mb-10">


        <label
          className="block mb-2"
          style={{
            fontFamily:"Red Hat Text",
            fontSize:"15px",
            fontWeight:600,
          }}
        >
          Horas a jugar
        </label>




        <input

          type="number"

          min="1"

          max="12"

          placeholder="Seleccionar cantidad de horas"

          className="w-full h-[44px] border border-[#D9D9D9] rounded-full px-6 outline-none"

          style={{
            fontFamily:"Albert Sans",
            fontSize:"14px",
          }}

        />


      </div>







      {/* Botones */}

      <div className="flex justify-between gap-5">



        <button

          onClick={() => navigate("/reservation-success")}

          className="flex-1 h-[42px] rounded-full bg-[#C7F34A] hover:bg-[#b8e43f] transition"

          style={{
            fontFamily:"Prompt",
            fontSize:"14px",
          }}

        >

          REALIZAR RESERVA


        </button>





        <button

          onClick={() => navigate("/search-courts")}

          className="flex-1 h-[42px] rounded-full bg-[#C7F34A] hover:bg-[#b8e43f] transition"

          style={{
            fontFamily:"Prompt",
            fontSize:"14px",
          }}

        >

          CANCELAR RESERVA


        </button>



      </div>



    </div>

  );

}


export default ReservationForm;