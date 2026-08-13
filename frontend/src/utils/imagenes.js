import cancha1 from "../assets/images/cancha1.jpg";
import cancha2 from "../assets/images/cancha2.jpg";
import cancha3 from "../assets/images/cancha3.jpg";
import cancha4 from "../assets/images/cancha4.jpg";
import cancha5 from "../assets/images/cancha5.jpg";

export const URL_BACKEND = "http://localhost:3000";

// Imagen por defecto según el deporte, para cuando el espacio
// deportivo todavía no tiene una imagen propia subida.
const IMAGENES_POR_DEPORTE = {
  "Fútbol": cancha1,
  "Fútbol sala": cancha2,
  "Básquet": cancha3,
  "Vóley": cancha4,
  "Tenis": cancha5,
  "Pádel": cancha2,
  "Squash": cancha3,
  "Bádminton": cancha4,
  "Handball": cancha1,
  "Atletismo": cancha5,
  "Gimnasia": cancha3,
  "Natación": cancha4,
};

// Dado un espacio deportivo (con .url_imagen y .deporte), devuelve
// la URL de imagen que debe mostrarse: la imagen que subió el
// administrador si existe, o una imagen por defecto según el deporte.
export const obtenerImagenEspacio = (espacio) => {

  const urlImagen = espacio?.url_imagen || espacio?.imagen;

  if (urlImagen) {

    if (urlImagen.startsWith("http")) {
      return urlImagen;
    }

    if (urlImagen.startsWith("/uploads")) {
      return `${URL_BACKEND}${urlImagen}`;
    }

    if (urlImagen.startsWith("blob:")) {
      return urlImagen;
    }
  }

  return IMAGENES_POR_DEPORTE[espacio?.deporte] || cancha1;
};
