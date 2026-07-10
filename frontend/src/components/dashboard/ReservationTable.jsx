function ReservationTable() {
  const reservations = [
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
  ];

  return (
    <div className="bg-white border border-gray-300 rounded-md overflow-hidden">
      {/* Encabezado */}
      <div className="flex justify-between items-center px-6 py-4">
        <h2
          className="text-lg font-semibold"
          style={{ fontFamily: "Instrument Sans" }}
        >
          Lista de reservaciones
        </h2>

        <button
          className="text-sm"
          style={{ fontFamily: "Red Hat Text" }}
        >
          Ver todo
        </button>
      </div>

      {/* Tabla */}
      <table className="w-full">
        <thead className="bg-gray-200">
          <tr
            className="text-sm"
            style={{ fontFamily: "Red Hat Text" }}
          >
            <th className="py-3">Usuario</th>
            <th>Hora</th>
            <th>Aforo</th>
            <th>Estado</th>
            <th>Editar</th>
          </tr>
        </thead>

        <tbody
          className="text-center text-sm"
          style={{ fontFamily: "Red Hat Text" }}
        >
          <tr>
            <td colSpan="5" className="py-4 font-semibold">
              Hoy
            </td>
          </tr>

          {reservations.slice(0, 4).map((item, index) => (
            <tr key={index} className="h-12">
              <td>{item.user}</td>
              <td>{item.time}</td>
              <td>{item.capacity}</td>
              <td>{item.status}</td>
              <td>✎</td>
            </tr>
          ))}

          <tr>
            <td colSpan="5" className="py-4 font-semibold">
              Ayer
            </td>
          </tr>

          {reservations.slice(4).map((item, index) => (
            <tr key={index} className="h-12">
              <td>{item.user}</td>
              <td>{item.time}</td>
              <td>{item.capacity}</td>
              <td>{item.status}</td>
              <td>✎</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationTable;