import { useEffect, useState } from "react";
import axios from "axios";
import { MdSportsSoccer } from "react-icons/md";

function FiltersSidebar({
  filtros,
  setFiltros,
  obtenerEspacios,
}) {

  const [distritos, setDistritos] = useState([]);
  const [complejos, setComplejos] = useState([]);
  const [deportes, setDeportes] = useState([]);


  // Guardar historial de búsquedas del cliente
  const guardarHistorial = () => {

    const existeFiltro =
      filtros.distrito ||
      filtros.complejo ||
      filtros.deporte ||
      filtros.precio ||
      filtros.estado;


    // Evitar guardar búsquedas vacías
    if (!existeFiltro) return;



    const historialActual =
      JSON.parse(localStorage.getItem("historialBusquedas")) || [];



    const nuevaBusqueda = {

      distrito:
        distritos.find(
          (d) => d.idDISTRITO == filtros.distrito
        )?.nombre || "Todos",


      complejo:
        complejos.find(
          (c) => c.idCOMPLEJO == filtros.complejo
        )?.nombre || "Todos",


      deporte:
        deportes.find(
          (d) => d.idDEPORTE == filtros.deporte
        )?.nombre || "Todos",


      precio:
        filtros.precio || "Todos",


      estado:
        filtros.estado || "Todos",


      fecha:
        new Date().toLocaleDateString(),

    };



    const nuevoHistorial = [
      nuevaBusqueda,
      ...historialActual
    ];



    // guardar solo últimas 5 búsquedas
    localStorage.setItem(
      "historialBusquedas",
      JSON.stringify(
        nuevoHistorial.slice(0,5)
      )
    );

  };




  const aplicarFiltros = () => {

    obtenerEspacios(filtros);

    guardarHistorial();

  };





  const limpiarFiltros = () => {


    const filtrosVacios = {

      distrito:"",
      complejo:"",
      deporte:"",
      precio:"",
      estado:"",

    };


    setFiltros(filtrosVacios);

    obtenerEspacios(filtrosVacios);


  };





  useEffect(()=>{

    obtenerDistritos();
    obtenerComplejos();
    obtenerDeportes();

  },[]);






  const handleChange = (e)=>{

    setFiltros({

      ...filtros,

      [e.target.name]: e.target.value

    });

  };







  const obtenerDistritos = async()=>{

    try{

      const respuesta =
      await axios.get(
        "http://localhost:3000/api/distritos"
      );


      setDistritos(respuesta.data);


    }catch(error){

      console.error(error);

    }

  };






  const obtenerComplejos = async()=>{

    try{

      const respuesta =
      await axios.get(
        "http://localhost:3000/api/complejos"
      );


      setComplejos(respuesta.data);


    }catch(error){

      console.error(error);

    }

  };






  const obtenerDeportes = async()=>{

    try{

      const respuesta =
      await axios.get(
        "http://localhost:3000/api/deportes"
      );


      setDeportes(respuesta.data);


    }catch(error){

      console.error(error);

    }

  };






return (

<aside className="w-[280px] bg-white border border-[#D9D9D9] rounded-[10px] p-5">


<h2
className="mb-8"
style={{
fontFamily:"Instrument Sans",
fontSize:"24px",
fontWeight:700
}}
>
Filtros
</h2>





{/* Distrito */}

<div className="mb-7">

<label className="block mb-3 text-sm font-semibold">
Distrito
</label>


<select
name="distrito"
value={filtros.distrito}
onChange={handleChange}
className="w-full h-[40px] rounded-md border px-3"
>


<option value="">
Todos los distritos
</option>


{
distritos.map((d)=>(
<option
key={d.idDISTRITO}
value={d.idDISTRITO}
>
{d.nombre}
</option>
))
}


</select>

</div>





{/* Complejo */}

<div className="mb-7">

<label className="block mb-3 text-sm font-semibold">
Complejo
</label>


<select
name="complejo"
value={filtros.complejo}
onChange={handleChange}
className="w-full h-[40px] rounded-md border px-3"
>


<option value="">
Todos los complejos
</option>


{
complejos.map((c)=>(
<option
key={c.idCOMPLEJO}
value={c.idCOMPLEJO}
>
{c.nombre}
</option>
))
}


</select>

</div>





{/* Deporte */}

<div className="mb-7">


<label className="flex gap-2 mb-3 text-sm font-semibold">

<MdSportsSoccer/>

Deporte

</label>


<select
name="deporte"
value={filtros.deporte}
onChange={handleChange}
className="w-full h-[40px] rounded-md border px-3"
>


<option value="">
Todos los deportes
</option>


{
deportes.map((d)=>(
<option
key={d.idDEPORTE}
value={d.idDEPORTE}
>
{d.nombre}
</option>
))
}


</select>


</div>





{/* Precio */}

<div className="mb-7">


<label className="block mb-4 text-sm font-semibold">
Precio por hora
</label>


<div className="space-y-3 text-sm">


<label>
<input
type="radio"
name="precio"
value="20-40"
onChange={handleChange}
/>
 S/20 - S/40
</label>


<label>
<input
type="radio"
name="precio"
value="40-60"
onChange={handleChange}
/>
 S/40 - S/60
</label>


<label>
<input
type="radio"
name="precio"
value="60+"
onChange={handleChange}
/>
 S/60 a más
</label>


</div>


</div>





{/* Estado */}

<div className="mb-8">

<label className="block mb-4 text-sm font-semibold">
Estado
</label>


<div className="space-y-3 text-sm">


<label>

<input
type="radio"
name="estado"
value="Disponible"
onChange={handleChange}
/>

 Disponible

</label>



<label>

<input
type="radio"
name="estado"
value="No Disponible"
onChange={handleChange}
/>

 No disponible

</label>


</div>


</div>





<button

onClick={aplicarFiltros}

className="w-full h-[42px] rounded-md bg-[#C7F34A] hover:bg-[#b9ea34] mb-4"

>
Aplicar filtros
</button>




<button

onClick={limpiarFiltros}

className="w-full h-[42px] rounded-md border"

>
Limpiar filtros
</button>



</aside>

);


}


export default FiltersSidebar;