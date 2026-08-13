import bcrypt from "bcryptjs";
import {
  crearUsuario,
  buscarUsuarioPorCorreo,
  listarUsuarios,
} from "../models/usuarioModel.js";
import { responderErrorBD } from "../utils/errorBD.js";

export const listarUsuariosController = async (req, res) => {
  try {
    const usuarios = await listarUsuarios();

    res.status(200).json(usuarios);
  } catch (error) {
    return responderErrorBD(res, error, "Error al obtener los usuarios.");
  }
};

export const registrarUsuario = async (req, res) => {
  try {

    const usuarioExistente = await buscarUsuarioPorCorreo(req.body.correo);

    if (usuarioExistente.length > 0) {
      return res.status(400).json({
        mensaje: "El correo ya está registrado.",
      });
    }

    const resultado = await crearUsuario(req.body);

    res.status(201).json({
      mensaje: "Usuario registrado correctamente.",
      id: resultado.insertId,
    });

  } catch (error) {
    return responderErrorBD(res, error, "Error al registrar el usuario.");
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

    const contrasenaValida = await bcrypt.compare(
      contrasena,
      usuario.contrasena
    );

    if (!contrasenaValida) {
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
        telefono: usuario.telefono,
        id_rol: usuario.id_rol,
      },
    });
  } catch (error) {
    return responderErrorBD(res, error, "Error al iniciar sesión");
  }
};