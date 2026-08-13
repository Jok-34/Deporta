import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


function ReservationForm() {

  const navigate = useNavigate();

const location = useLocation();

const cancha = location.state;

const [reserva, setReserva] = useState({
  fecha: "",
  hora: "",
  horas: 1,
});

useEffect(() => {

  // Precondición del caso de uso "Reservar espacios deportivos":
  // el cliente debe haber iniciado sesión.
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  if (!usuario?.id) {
    alert("Debes iniciar sesión para reservar un espacio deportivo.");
    navigate("/login");
  }

}, []);

const handleChange = (e) => {
  setReserva({
    ...reserva,
    [e.target.name]: e.target.value,
  });
};

const realizarReserva = async () => {

  try {

    const usuario = JSON.parse(
      localStorage.getItem("usuario") || "null"
    );

    if (!usuario?.id) {
      alert("Debes iniciar sesión para reservar un espacio deportivo.");
      navigate("/login");
      return;
    }

    const respuesta = await axios.post(
  "http://localhost:3000/api/reservas/register",
  {
    id_usuario: usuario.id,
    id_espacio_deportivo: cancha.id,
    fecha: reserva.fecha,
    hora: reserva.hora,
    horas: reserva.horas,
  }
);

navigate("/payment", {
  state: {
    idReserva: respuesta.data.id,
    cancha,
    reserva,
    usuario,
  },
});

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.mensaje ||
      "No se pudo registrar la reserva."
    );

  }

};

console.log(reserva);

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
            name="fecha"
            value={reserva.fecha}
            onChange={handleChange}
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
            name="hora"
            value={reserva.hora}
            onChange={handleChange}
            className="w-full h-[44px] border border-[#D9D9D9] rounded-full px-6 appearance-none outline-none bg-white"

            style={{
              fontFamily:"Albert Sans",
              fontSize:"14px",
            }}

          >
           <option value="">Seleccionar hora</option>
            <option>08:00</option>
            <option>09:00</option>
            <option>10:00</option>
            <option>11:00</option>
            <option>12:00</option>
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
          name="horas"
          value={reserva.horas}
          onChange={handleChange}
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
             onClick={realizarReserva}
          className="flex-1 h-[42px] rounded-full bg-[#C7F34A] hover:bg-[#b8e43f] transition"
          style={{
            fontFamily: "Prompt",
            fontSize: "14px",
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