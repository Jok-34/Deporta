function SearchHistory({ historial = [], onLimpiar }) {


  if (historial.length === 0) {
    return null;
  }



  return (

    <div className="bg-white border border-[#D9D9D9] rounded-[10px] p-5 mb-8">


      <div className="flex items-center justify-between mb-5">

        <h2
          className="text-lg font-bold"
          style={{
            fontFamily:"Instrument Sans"
          }}
        >
          Historial de búsquedas
        </h2>

        {
          typeof onLimpiar === "function" && (
            <button
              onClick={onLimpiar}
              className="text-xs text-gray-500 hover:text-[#c62828] underline"
              style={{
                fontFamily:"Red Hat Text"
              }}
            >
              Limpiar historial
            </button>
          )
        }

      </div>



      <div className="flex flex-col gap-3">


      {
        historial.map((busqueda,index)=>(


          <div

          key={index}

          className="border border-[#D9D9D9] rounded-md p-4"

          >


            <p
            className="text-sm"
            style={{
              fontFamily:"Red Hat Text"
            }}
            >
              <strong>Distrito:</strong> {busqueda.distrito}
            </p>



            <p
            className="text-sm"
            style={{
              fontFamily:"Red Hat Text"
            }}
            >
              <strong>Complejo:</strong> {busqueda.complejo}
            </p>



            <p
            className="text-sm"
            style={{
              fontFamily:"Red Hat Text"
            }}
            >
              <strong>Deporte:</strong> {busqueda.deporte}
            </p>



            <p
            className="text-sm"
            style={{
              fontFamily:"Red Hat Text"
            }}
            >
              <strong>Precio:</strong> {busqueda.precio}
            </p>



            <p
            className="text-sm"
            style={{
              fontFamily:"Red Hat Text"
            }}
            >
              <strong>Estado:</strong> {busqueda.estado}
            </p>



            <p
            className="text-xs text-gray-500 mt-2"
            >
              {busqueda.fecha}
            </p>



          </div>


        ))

      }


      </div>


    </div>

  );

}


export default SearchHistory;
