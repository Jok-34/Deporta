import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Carpeta física donde se guardan las imágenes de los espacios
// deportivos: backend/uploads/espacios
const carpetaEspacios = path.join(__dirname, "../../uploads/espacios");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, carpetaEspacios);
  },
  filename: (req, file, cb) => {
    const sufijo = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `espacio-${sufijo}${extension}`);
  },
});

const filtroImagenes = (req, file, cb) => {
  const tiposPermitidos = /jpeg|jpg|png|webp|gif/;
  const extensionValida = tiposPermitidos.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimeValido = tiposPermitidos.test(file.mimetype);

  if (extensionValida && mimeValido) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes (jpg, jpeg, png, webp, gif)."));
  }
};

export const uploadImagenEspacio = multer({
  storage,
  fileFilter: filtroImagenes,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
