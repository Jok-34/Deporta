import { useEffect, useState } from "react";
import ReservationForm from "../components/reservation/ReservationForm";

import cancha5 from "../assets/images/cancha5.jpg";


function Reservation() {


  const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);



  useEffect(() => {


    const cancha =
      JSON.parse(
        localStorage.getItem("canchaSeleccionada")
      );


    setCanchaSeleccionada(cancha);


  }, []);





  return (

    <section className="min-h-screen bg-white relative overflow-hidden">



      {/* Imagen superior */}

      <div

        className="absolute top-0 left-0 w-full h-[310px] bg-cover bg-center"

        style={{

          backgroundImage: `url(${
            canchaSeleccionada?.image || cancha5
          })`,

        }}

      />







      {/* Información + formulario */}

      <div className="relative flex justify-center pt-[60px]">


        <ReservationForm

          cancha={canchaSeleccionada}

        />


      </div>





    </section>

  );

}


export default Reservation;