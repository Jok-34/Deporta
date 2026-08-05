import { useState } from "react";

function ReservationTable() {

  const [reservations, setReservations] = useState([
    {
      user: "Andres Vasquez",
      time: "3:00 pm",
      capacity: 10,
      status: "pagado",
    },
    {
      user: "Matilda Rodriguez",
      time: "2:00 pm",
      capacity: 12,
      status: "pendiente",
    },
    {
      user: "Mario Velasquez",
      time: "3:00 pm",
      capacity: 10,
      status: "cancelado",
    },
    {
      user: "Carlos Solis",
      time: "4:00 pm",
      capacity: 20,
      status: "pagado",
    },
    {
      user: "Jose Andrade",
      time: "6:00 pm",
      capacity: 15,
      status: "pagado",
    },
    {
      user: "Sebastian Ramos",
      time: "4:00 pm",
      capacity: 20,
      status: "pagado",
    },
    {
      user: "Omar Sanchez",
      time: "6:00 pm",
      capacity: 16,
      status: "pagado",
    },
    {
      user: "Miguel Rojas",
      time: "5:00 pm",
      capacity: 19,
      status: "pagado",
    },
  ]);


  const [editIndex, setEditIndex] = useState(null);

  const [editData, setEditData] = useState({});


  const editarReserva = (index) => {

    setEditIndex(index);

    setEditData({
      ...reservations[index]
    });

  };


  const cambiarDato = (e) => {

    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });

  };


  const guardarCambios = () => {

    const nuevasReservas = [...reservations];

    nuevasReservas[editIndex] = editData;

    setReservations(nuevasReservas);

    setEditIndex(null);

  };


  const cancelarEdicion = () => {

    setEditIndex(null);

  };



  const renderFila = (item,index)=>{

    const editando = editIndex === index;


    return (

      <tr 
        key={index}
        className="h-14 border-t"
      >

        <td>

          {editando ? (

            <input
              name="user"
              value={editData.user}
              onChange={cambiarDato}
              className="border rounded px-2 py-1 w-36"
            />

          ) : (
            item.user
          )}

        </td>



        <td>

          {editando ? (

            <input
              name="time"
              value={editData.time}
              onChange={cambiarDato}
              className="border rounded px-2 py-1 w-24"
            />

          ) : (
            item.time
          )}

        </td>




        <td>

          {editando ? (

            <input
              name="capacity"
              type="number"
              value={editData.capacity}
              onChange={cambiarDato}
              className="border rounded px-2 py-1 w-16"
            />

          ) : (
            item.capacity
          )}

        </td>



        <td>

          {editando ? (

            <select
              name="status"
              value={editData.status}
              onChange={cambiarDato}
              className="border rounded px-2 py-1"
            >
              <option value="pagado">
                Pagado
              </option>

              <option value="pendiente">
                Pendiente
              </option>

              <option value="cancelado">
                Cancelado
              </option>

            </select>

          ) : (

            item.status

          )}

        </td>




        <td>

          {editando ? (

            <div className="flex gap-2 justify-center">

              <button
                onClick={guardarCambios}
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
              onClick={()=>editarReserva(index)}
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


        <button className="text-sm">
          Ver todo
        </button>

      </div>



      <table className="w-full">


        <thead className="bg-gray-200">

          <tr className="text-sm">

            <th className="py-3">
              Usuario
            </th>

            <th>
              Hora
            </th>

            <th>
              Aforo
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
            <td colSpan="5" className="py-4 font-semibold">
              Hoy
            </td>
          </tr>


          {reservations.slice(0,4).map((item,index)=>(
            renderFila(item,index)
          ))}



          <tr>
            <td colSpan="5" className="py-4 font-semibold">
              Ayer
            </td>
          </tr>


          {reservations.slice(4).map((item,index)=>(

            renderFila(item,index+4)

          ))}



        </tbody>


      </table>


    </div>

  );

}


export default ReservationTable;