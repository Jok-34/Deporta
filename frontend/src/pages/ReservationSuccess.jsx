import cancha5 from "../assets/images/cancha5.jpg";
import ReservationSuccessCard from "../components/reservation/ReservationSuccessCard";
import { useLocation } from "react-router-dom";

function ReservationSuccess() {
  const { state } = useLocation();

const { cancha, reserva } = state || {};

const usuario = JSON.parse(
  localStorage.getItem("usuario")
);

console.log(cancha);
console.log(reserva);

const calcularHoraFin = (horaInicio, cantidadHoras) => {
  const [hora, minutos] = horaInicio.split(":").map(Number);

  const fecha = new Date();
  fecha.setHours(hora, minutos, 0, 0);
  fecha.setHours(fecha.getHours() + Number(cantidadHoras));

  return fecha.toTimeString().slice(0, 5);
};

const formatearFecha = (fecha) => {
  const [anio, mes, dia] = fecha.split("-");
  return `${dia}/${mes}/${anio}`;
};

const horaFin = calcularHoraFin(reserva.hora, reserva.horas);

  
  const reservation = {

  nombre: usuario.nombre,

  apellidos: usuario.apellido,

  correo: usuario.correo,

  telefono: usuario.telefono,

  fecha: formatearFecha(reserva.fecha),

  horaInicio: reserva.hora,

  horaFin: horaFin,

  cantidadHoras: reserva.horas,

  descuento: "0%",

  precioHora: cancha.price,

  total: (
    Number(cancha.price) *
    Number(reserva.horas)
  ).toFixed(2),

  metodoPago: "Pendiente",

  estadoPago: "Pendiente",

};

  return (
    <section className="min-h-screen bg-white relative overflow-hidden">

      {/* Imagen superior */}
      <div
        className="absolute top-0 left-0 w-full h-[310px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${cancha5})`,
        }}
      />

      {/* Tarjeta */}
      <div className="relative flex justify-center items-start min-h-screen pt-8 pb-8">
    <ReservationSuccessCard reservation={reservation} />
</div>

    </section>
  );
}

export default ReservationSuccess;