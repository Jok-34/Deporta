import { useEffect, useState } from "react";
import ReservationForm from "../components/reservation/ReservationForm";
import { useLocation } from "react-router-dom";

import cancha5 from "../assets/images/cancha5.jpg";


function Reservation() {
  const location = useLocation();

const cancha = location.state;
console.log(cancha);
  return (

    <section className="min-h-screen bg-white relative overflow-hidden">



      {/* Imagen superior */}

      <div

        className="absolute top-0 left-0 w-full h-[310px] bg-cover bg-center"

        style={{

          backgroundImage: `url(${
            cancha?.image || cancha5
          })`,

        }}

      />







      {/* Información + formulario */}

      <div className="relative flex justify-center pt-[60px]">
        <ReservationForm />
      </div>





    </section>

  );

}


export default Reservation;