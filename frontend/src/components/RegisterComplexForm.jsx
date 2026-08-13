import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterComplexForm() {
  const navigate = useNavigate();

  // El usuario administrador debe existir ya en localStorage:
  // - si acaba de registrarse marcando "administrará un complejo",
  //   RegisterForm lo guarda ahí antes de redirigir aquí.
  // - si ya tenía cuenta y solo quiere registrar un complejo nuevo,
  //   debe haber iniciado sesión antes.
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");


  const distritosLima = [
    { idDISTRITO: 1, nombre: "Miraflores" },
    { idDISTRITO: 2, nombre: "San Isidro" },
    { idDISTRITO: 3, nombre: "Surco" },
    { idDISTRITO: 4, nombre: "San Borja" },
    { idDISTRITO: 5, nombre: "La Molina" },
    { idDISTRITO: 6, nombre: "Barranco" },
    { idDISTRITO: 7, nombre: "Chorrillos" },
    { idDISTRITO: 8, nombre: "San Juan de Miraflores" },
    { idDISTRITO: 9, nombre: "Villa María del Triunfo" },
    { idDISTRITO: 10, nombre: "Los Olivos" },
  ];


  const [distritos, setDistritos] = useState(distritosLima);


  const [formData, setFormData] = useState({
    nombre: "",
    ruc: "",
    correo: "",
    telefono: "",
    direccion: "",
    id_distrito: "",
  });


  const [errores, setErrores] = useState({});



  useEffect(() => {
    obtenerDistritos();
  }, []);



  const obtenerDistritos = async () => {

    try {

      const respuesta = await axios.get(
        "http://localhost:3000/api/distritos"
      );


      if(respuesta.data.length > 0){
        setDistritos(respuesta.data);
      }


    } catch (error) {

      console.error(
        "No se pudieron cargar distritos:",
        error
      );

    }

  };




  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });


    setErrores({
      ...errores,
      [e.target.name]: "",
    });

  };





  const validarFormulario = () => {

    let nuevosErrores = {};



    if(!formData.nombre.trim()){
      nuevosErrores.nombre =
      "Ingrese el nombre del complejo";
    }



    if(!formData.ruc.trim()){

      nuevosErrores.ruc =
      "Ingrese el RUC";

    }else if(!/^\d{11}$/.test(formData.ruc)){

      nuevosErrores.ruc =
      "El RUC debe tener 11 dígitos";

    }





    if(!formData.correo.trim()){

      nuevosErrores.correo =
      "Ingrese el correo";

    }else if(
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)
    ){

      nuevosErrores.correo =
      "Correo no válido";

    }





    if(!formData.telefono.trim()){

      nuevosErrores.telefono =
      "Ingrese el teléfono";

    }



    if(!formData.direccion.trim()){

      nuevosErrores.direccion =
      "Ingrese la dirección";

    }




    if(!formData.id_distrito){

      nuevosErrores.id_distrito =
      "Seleccione un distrito";

    }



    setErrores(nuevosErrores);


    return Object.keys(nuevosErrores).length === 0;

  };






  const handleSubmit = async (e)=>{

    e.preventDefault();



    if(!validarFormulario()){
      return;
    }



    if(!usuario?.id){

      alert(
        "No se encontró la sesión del administrador. Inicia sesión o regístrate antes de registrar un complejo."
      );

      navigate("/login");

      return;

    }



    try {


      const respuesta = await axios.post(
        "http://localhost:3000/api/complejos/register",
        {

          id_usuario: usuario.id,

          id_distrito:
          formData.id_distrito,

          nombre:
          formData.nombre,

          direccion:
          formData.direccion,

          telefono:
          formData.telefono,

          correo:
          formData.correo,

          ruc:
          formData.ruc,

        }
      );



      console.log(respuesta.data);



      navigate("/register-success");



    } catch(error){

      console.error(error);


      alert(
        "El correo o RUC ya se encuentra registrado"
      );

    }

  };



  return (
    <section className="flex min-h-screen">


      <div className="w-1/2 bg-[var(--color-secondary)] flex flex-col justify-center px-20">


        <h1
          className="text-white text-[40px] font-bold mb-10"
          style={{fontFamily:"Instrument Sans"}}
        >
          ¡Registra tu
          <br/>
          complejo!
        </h1>



        <p
          className="text-white text-[21px] max-w-md"
          style={{fontFamily:"Red Hat Text"}}
        >
          Registra tu complejo y encuentra potenciales clientes,
          desde tu dashboard único podrás administrar tus reservas y más.
        </p>


      </div>





      <div className="w-1/2 bg-[var(--color-surface)] flex items-center justify-center">


        <div className="w-[420px]">


        <h2
        className="text-center text-[34px] font-bold mb-10"
        style={{fontFamily:"Instrument Sans"}}
        >
          Registro del complejo
        </h2>



<form onSubmit={handleSubmit} className="flex flex-col gap-4">



<input
type="text"
name="nombre"
value={formData.nombre}
onChange={handleChange}
placeholder="Nombre de la empresa"
className="w-full rounded-full border border-gray-300 px-6 py-3"
/>

{errores.nombre &&
<p className="text-red-500 text-sm">
{errores.nombre}
</p>
}



<input
type="text"
name="ruc"
value={formData.ruc}
onChange={handleChange}
placeholder="RUC"
className="w-full rounded-full border border-gray-300 px-6 py-3"
/>

{errores.ruc &&
<p className="text-red-500 text-sm">
{errores.ruc}
</p>
}




<input
type="email"
name="correo"
value={formData.correo}
onChange={handleChange}
placeholder="Correo comercial"
className="w-full rounded-full border border-gray-300 px-6 py-3"
/>

{errores.correo &&
<p className="text-red-500 text-sm">
{errores.correo}
</p>
}





<input
type="tel"
name="telefono"
value={formData.telefono}
onChange={handleChange}
placeholder="Teléfono"
className="w-full rounded-full border border-gray-300 px-6 py-3"
/>

{errores.telefono &&
<p className="text-red-500 text-sm">
{errores.telefono}
</p>
}





<input
type="text"
name="direccion"
value={formData.direccion}
onChange={handleChange}
placeholder="Dirección"
className="w-full rounded-full border border-gray-300 px-6 py-3"
/>

{errores.direccion &&
<p className="text-red-500 text-sm">
{errores.direccion}
</p>
}





<select
name="id_distrito"
value={formData.id_distrito}
onChange={handleChange}
className="w-full rounded-full border border-gray-300 px-6 py-3"
>

<option value="">
Selecciona un distrito
</option>


{
distritos.map((distrito)=>(
<option
key={distrito.idDISTRITO}
value={distrito.idDISTRITO}
>
{distrito.nombre}
</option>
))
}


</select>


{errores.id_distrito &&
<p className="text-red-500 text-sm">
{errores.id_distrito}
</p>
}





<button
type="submit"
className="mt-6 rounded-full py-4 bg-[var(--color-primary)] text-black"
style={{fontFamily:"Prompt"}}
>
REGISTRAR
</button>



</form>



        </div>

      </div>


    </section>
  );
}


export default RegisterComplexForm;