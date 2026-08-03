import {
  crearUsuario,
  buscarUsuarioPorCorreo,
} from "../models/usuarioModel.js";

export const registrarUsuario = async (req, res) => {
  try {
    const resultado = await crearUsuario(req.body);

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      id: resultado.insertId,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al registrar el usuario",
    });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const usuarios = await buscarUsuarioPorCorreo(correo);

    if (usuarios.length === 0) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    const usuario = usuarios[0];

    if (usuario.contrasena !== contrasena) {
      return res.status(401).json({
        mensaje: "Contraseña incorrecta",
      });
    }

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      usuario: {
        id: usuario.idUSUARIO,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        id_rol: usuario.id_rol,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al iniciar sesión",
    });
  }
};