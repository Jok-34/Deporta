import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


function RegisterForm() {

  const navigate = useNavigate();


  const [adminComplejo, setAdminComplejo] = useState(false);



  const [formulario, setFormulario] = useState({

    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    contrasena: "",

  });



  const [errores, setErrores] = useState({});





  const handleChange = (e) => {

    setFormulario({

      ...formulario,

      [e.target.name]: e.target.value,

    });



    setErrores({

      ...errores,

      [e.target.name]: "",

    });

  };






  const validarFormulario = () => {


    let nuevosErrores = {};



    if (!formulario.nombre.trim()) {

      nuevosErrores.nombre = "Ingrese su nombre";

    }



    if (!formulario.apellido.trim()) {

      nuevosErrores.apellido = "Ingrese sus apellidos";

    }




    if (!formulario.correo.trim()) {

      nuevosErrores.correo = "Ingrese su correo";

    } 
    else if (!/\S+@\S+\.\S+/.test(formulario.correo)) {

      nuevosErrores.correo = "Correo no válido";

    }




    if (!formulario.telefono.trim()) {

      nuevosErrores.telefono = "Ingrese su teléfono";

    } 
    else if (!/^[0-9]+$/.test(formulario.telefono)) {

      nuevosErrores.telefono = "Solo números permitidos";

    }





    if (!formulario.contrasena.trim()) {

      nuevosErrores.contrasena = "Ingrese una contraseña";

    } 
    else if (formulario.contrasena.length < 6) {

      nuevosErrores.contrasena = "Mínimo 6 caracteres";

    }




    setErrores(nuevosErrores);



    return Object.keys(nuevosErrores).length === 0;


  };








  const handleSubmit = async (e) => {


    e.preventDefault();



    if (!validarFormulario()) {

      return;

    }




    try {


      await axios.post(

        "http://localhost:3000/api/usuarios/register",

        {

          id_rol: adminComplejo ? 1 : 2,

          nombre: formulario.nombre,

          apellido: formulario.apellido,

          correo: formulario.correo,

          telefono: formulario.telefono,

          contrasena: formulario.contrasena,

        }

      );





      if (adminComplejo) {

        navigate("/register-complex");

      } 
      else {

        navigate("/login");

      }





    } catch(error) {


      console.error(error);


      alert(

        error.response?.data?.mensaje ||

        "No se pudo registrar el usuario."

      );


    }



  };





  return (
    <section className="flex min-h-screen">

      <div className="w-1/2 bg-[var(--color-secondary)] flex flex-col justify-center px-20">


        <h1
          className="text-white text-[40px] font-bold tracking-[3%] mb-10"
          style={{fontFamily:"Instrument Sans"}}
        >
          Accede a tus
          <br />
          espacios deportivos
          <br />
          favoritos y comparte
          <br />
          el deporte con los
          <br />
          tuyos.
        </h1>


        <p
          className="text-white text-[21px] max-w-md"
          style={{fontFamily:"Red Hat Text"}}
        >
          Crea tu cuenta para encontrar canchas o piscinas cercanas en tiempo real.
        </p>


      </div>





      <div className="w-1/2 bg-[var(--color-surface)] flex items-center justify-center">


        <div className="w-[420px]">


          <h2
            className="text-center text-[34px] font-bold mb-10"
            style={{fontFamily:"Instrument Sans"}}
          >
            Crea tu cuenta
          </h2>





          <form 
          onSubmit={handleSubmit}
          className="flex flex-col gap-4">


          {
            [

              {
                name:"nombre",
                label:"Nombre",
                placeholder:"Ingresa tu nombre",
                type:"text"
              },

              {
                name:"apellido",
                label:"Apellidos",
                placeholder:"Ingresa tus apellidos",
                type:"text"
              },

              {
                name:"correo",
                label:"Correo",
                placeholder:"Ingresa tu correo",
                type:"email"
              },

              {
                name:"telefono",
                label:"Teléfono",
                placeholder:"Ingresa tu número",
                type:"tel"
              },

              {
                name:"contrasena",
                label:"Contraseña",
                placeholder:"Ingresa tu contraseña",
                type:"password"
              }


            ].map((campo)=>(

              <div key={campo.name}>


                <label className="block mb-2 text-[#777777] text-[14.5px] font-bold">

                  {campo.label}

                </label>



                <input

                  type={campo.type}

                  name={campo.name}

                  value={formulario[campo.name]}

                  onChange={handleChange}

                  placeholder={campo.placeholder}

                  className="w-full rounded-full border border-gray-300 px-6 py-3"

                />



                {
                  errores[campo.name] && (

                    <p className="text-red-500 text-xs mt-1 ml-4">

                      {errores[campo.name]}

                    </p>

                  )
                }


              </div>


            ))

          }





            <div className="flex items-center gap-3 mt-2">


              <input

              id="adminComplejo"

              type="checkbox"

              checked={adminComplejo}

              onChange={(e)=>setAdminComplejo(e.target.checked)}

              className="w-5 h-5"

              />



              <label htmlFor="adminComplejo">

                Esta cuenta administrará un complejo deportivo

              </label>


            </div>





            <button

            className="mt-6 rounded-full py-4 bg-[var(--color-primary)] text-black"

            >

              REGISTRARSE

            </button>



          </form>





          <p className="text-center mt-10">

            ¿Ya tienes una cuenta?{" "}

            <Link to="/login">

              Iniciar Sesión

            </Link>

          </p>


        </div>


      </div>


    </section>
  );
}



export default RegisterForm;