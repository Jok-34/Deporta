import { useEffect, useState } from "react";
import axios from "axios";

function ReservationTable() {

  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  const [reservations, setReservations] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [editId, setEditId] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState("");

  useEffect(() => {
    if (usuario?.id) {
      obtenerReservas();
    }
  }, []);

  const obtenerReservas = async () => {
    try {
      setCargando(true);

      const respuesta = await axios.get(
        `http://localhost:3000/api/reservas/admin/${usuario.id}`
      );

      setReservations(respuesta.data);

    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  const editarReserva = (reserva) => {
    setEditId(reserva.idRESERVA);
    setNuevoEstado(reserva.estado);
  };

  const cancelarEdicion = () => {
    setEditId(null);
  };

  const guardarCambios = async (id) => {
    try {

      await axios.put(
        `http://localhost:3000/api/reservas/${id}/estado`,
        { estado: nuevoEstado }
      );

      setReservations(
        reservations.map((r) =>
          r.idRESERVA === id ? { ...r, estado: nuevoEstado } : r
        )
      );

      setEditId(null);

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.mensaje ||
        "No se pudo actualizar el estado de la reserva."
      );
    }
  };

  const esHoy = (fechaHoraInicio) => {

    const fecha = new Date(fechaHoraInicio);
    const hoy = new Date();

    return (
      fecha.getFullYear() === hoy.getFullYear() &&
      fecha.getMonth() === hoy.getMonth() &&
      fecha.getDate() === hoy.getDate()
    );
  };

  const formatearFecha = (fechaHoraInicio) => {
    const fecha = new Date(fechaHoraInicio);
    return fecha.toLocaleDateString("es-PE");
  };

  const formatearHora = (fechaHoraInicio) => {
    const fecha = new Date(fechaHoraInicio);
    return fecha.toLocaleTimeString("es-PE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const reservasHoy = reservations.filter((r) => esHoy(r.fecha_hora_inicio));
  const reservasAnteriores = reservations.filter((r) => !esHoy(r.fecha_hora_inicio));

  const renderFila = (item) => {

    const editando = editId === item.idRESERVA;

    return (

      <tr
        key={item.idRESERVA}
        className="h-14 border-t"
      >

        <td>
          {item.cliente_nombre} {item.cliente_apellido}
        </td>

        <td>
          {item.espacio}
        </td>

        <td>
          {formatearFecha(item.fecha_hora_inicio)}
        </td>

        <td>
          {formatearHora(item.fecha_hora_inicio)}
        </td>

        <td>

          {editando ? (

            <select
              value={nuevoEstado}
              onChange={(e) => setNuevoEstado(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="ACTIVA">Activa</option>
              <option value="COMPLETADA">Completada</option>
              <option value="CANCELADA">Cancelada</option>
            </select>

          ) : (
            item.estado
          )}

        </td>

        <td>

          {editando ? (

            <div className="flex gap-2 justify-center">

              <button
                onClick={() => guardarCambios(item.idRESERVA)}
                className="bg-[#C7F34A] px-3 py-1 rounded-md text-xs"
              >
                Guardar
              </button>

              <button
                onClick={cancelarEdicion}
                className="border px-3 py-1 rounded-md text-xs"
              >
                Cancelar
              </button>

            </div>

          ) : (

            <button
              onClick={() => editarReserva(item)}
              className="text-lg"
            >
              ✎
            </button>

          )}

        </td>

      </tr>

    );

  };

  return (

    <div className="bg-white border border-gray-300 rounded-md overflow-hidden">


      <div className="flex justify-between items-center px-6 py-4">

        <h2
          className="text-lg font-semibold"
          style={{fontFamily:"Instrument Sans"}}
        >
          Lista de reservaciones
        </h2>

      </div>



      {
        cargando ? (
          <p className="text-sm text-gray-500 px-6 pb-6">Cargando reservas...</p>
        ) : reservations.length === 0 ? (
          <p className="text-sm text-gray-500 px-6 pb-6">
            Todavía no tienes reservas en tus espacios deportivos.
          </p>
        ) : (

      <table className="w-full">


        <thead className="bg-gray-200">

          <tr className="text-sm">

            <th className="py-3">
              Usuario
            </th>

            <th>
              Espacio
            </th>

            <th>
              Fecha
            </th>

            <th>
              Hora
            </th>

            <th>
              Estado
            </th>

            <th>
              Editar
            </th>

          </tr>

        </thead>



        <tbody className="text-center text-sm">


          <tr>
            <td colSpan="6" className="py-4 font-semibold">
              Hoy
            </td>
          </tr>

          {
            reservasHoy.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-3 text-gray-400">
                  Sin reservas hoy
                </td>
              </tr>
            ) : (
              reservasHoy.map((item) => renderFila(item))
            )
          }


          <tr>
            <td colSpan="6" className="py-4 font-semibold">
              Anteriores
            </td>
          </tr>

          {
            reservasAnteriores.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-3 text-gray-400">
                  Sin más reservas
                </td>
              </tr>
            ) : (
              reservasAnteriores.map((item) => renderFila(item))
            )
          }


        </tbody>


      </table>

        )
      }


    </div>

  );

}


export default ReservationTable;
