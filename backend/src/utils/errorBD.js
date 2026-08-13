export const manejarErrorBD = (error) => {
  const codigo = error?.code || error?.errno;

  switch (codigo) {
    case "ECONNREFUSED":
    case -4078:
    case "PROTOCOL_CONNECTION_LOST":
    case "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR":
      return {
        status: 503,
        mensaje:
          "No hay conexión con la base de datos. Revisa que el archivo de almacenamiento sea accesible y que las tablas puedan crearse correctamente.",
      };

    case "ER_BAD_DB_ERROR":
      return {
        status: 503,
        mensaje:
          "La base de datos no pudo inicializarse correctamente. Revisa el archivo de datos de la aplicación.",
      };

    case "ER_ACCESS_DENIED_ERROR":
      return {
        status: 503,
        mensaje:
          "No se pudo acceder a la base de datos. Revisa los permisos del archivo de almacenamiento.",
      };

    case "ER_NO_SUCH_TABLE":
      return {
        status: 503,
        mensaje:
          "Faltan tablas en la base de datos. El sistema intentará crearlas automáticamente al iniciar.",
      };

    case "ER_DUP_ENTRY":
      return {
        status: 400,
        mensaje: error?.message || "Registro duplicado en la base de datos.",
      };

    default:
      return null;
  }
};

export const responderErrorBD = (res, error, mensajeGenerico) => {
  const info = manejarErrorBD(error);

  if (info) {
    return res.status(info.status).json({
      mensaje: info.mensaje,
    });
  }

  console.error(error);

  return res.status(500).json({
    mensaje: mensajeGenerico,
  });
};
