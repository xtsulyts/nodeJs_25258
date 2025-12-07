import {
  verificarEmailExistente,
  crearUsuario,
  loginServicio,
  obtenerUsuariosServicio,
  obtenerUsuarioPorIdServicio,
  obtenerUsuarioPorIdDirectoServicio
} from "../services/usuariosServicios.js";
import cryptoServices from "../services/criptoServices.js";
import { generarToken } from "../services/jwtServices.js";
import { validationResult } from "express-validator";

export const registroUsuarios = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("❌ Error al crear usuario:", {
      path: req.path,
      errores: errors.array(),
    });

    return res.status(400).json({
      error: "Datos inválidos",
      detalles: errors.array(),
    });
  }

  try {
    const { email, contrasenia, nombre, rol } = req.body;

    const emailExiste = await verificarEmailExistente(email);
    if (emailExiste) {
      return res.status(400).json({
        error: "El email ya está registrado",
      });
    }

    const contraseniaHash = await cryptoServices.hashPassword(contrasenia);

    const usuarioId = await crearUsuario({
      email,
      contrasenia: contraseniaHash,
      nombre,
      rol: rol,
      activo: true,
      fecha_registro: new Date(),
    });

    res.status(201).json({
      mensaje: "Usuario registrado exitosamente",
      usuario: {
        id: usuarioId,
        email,
        nombre,
        rol,
      },
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export const loginUsuarios = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("❌ Validación login fallida:", errors.array());
    return res.status(400).json({
      error: "Datos inválidos",
      detalles: errors.array(),
    });
  }

  try {
    const { email, contrasenia } = req.body;

    const usuario = await loginServicio(email, contrasenia);

    const token = await generarToken({
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
    });

    console.log("🔐 Login exitoso:", {
      usuario: usuario.email,
      id: usuario.id,
      rol: usuario.rol,
      token: token.substring(0, 20) + "...",
    });

    return res.status(200).json({
      mensaje: "Login exitoso",
      token: token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);

    if (error.message.includes("Credenciales inválidas")) {
      return res.status(401).json({
        error: "Credenciales inválidas",
      });
    }

    if (error.message.includes("Usuario inactivo")) {
      return res.status(403).json({
        error: "Usuario inactivo",
      });
    }

    return res.status(500).json({
      error: "Error interno del servidor",
    });
  }
};

export const logoutUsuario = (req, res) => {
  try {
  
    const usuarioId = req.usuario?.id || 'ID no disponible';
    const usuarioEmail = req.usuario?.email || 'Email no disponible';
    
    console.log(`👋 Sesión cerrada - Usuario: ${usuarioEmail} (ID: ${usuarioId})`);
    

    return res.status(200).json({
      exito: true,
      mensaje: "Logout exitoso. Elimina el token de tu almacenamiento local.",
      accionRequerida: "El cliente debe eliminar el token JWT de localStorage/cookies"
    });
    
  } catch (error) {
    console.error("❌ Error en logout:", error);
    return res.status(500).json({
      exito: false,
      error: "Error interno durante el logout"
    });
  }
};

export const obtenerUsuariosControlador = async (req, res) => {
  try {
    const { 
      soloActivos, 
      rol, 
      limite 
    } = req.query;

    const opciones = {};
    
    if (soloActivos !== undefined) {
      opciones.soloActivos = soloActivos === 'true' || soloActivos === '1';
    }
    
    if (rol) {
      opciones.rol = rol;
    }
    
    if (limite && !isNaN(limite) && parseInt(limite) > 0) {
      opciones.limite = parseInt(limite);
    }
    
    const usuarios = await obtenerUsuariosServicio(opciones);
    
    res.status(200).json({
      success: true,
      count: usuarios.length,
      data: usuarios
    });
    
  } catch (error) {
    console.error('Error en obtenerUsuariosControlador:', error);
    
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener usuarios',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};


export const obtenerUsuarioPorIdControlador = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Se requiere el ID del usuario'
      });
    }
    
    const usuario = await obtenerUsuarioPorIdServicio(id);
    
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: usuario
    });
    
  } catch (error) {
    console.error('Error en obtenerUsuarioPorIdControlador:', error);
    
    if (error.message.includes('no encontrado')) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener el usuario',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};


export const obtenerMiPerfilControlador = async (req, res) => {
  try {
    console.log('🔍 DEBUG obtenerMiPerfilControlador:');
    console.log('req.usuario:', req.usuario);
    console.log('req.headers:', req.headers);
    
    const usuarioId = req.usuario?.id || req.usuario?.uid;
    
    if (!usuarioId) {
      return res.status(401).json({
        success: false,
        message: 'No autorizado'
      });
    }
    
    const usuario = await obtenerUsuarioPorIdServicio(usuarioId);
    
    if (!usuario) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
    
    res.status(200).json({
      success: true,
      data: usuario
    });
    
  } catch (error) {
    console.error('Error en obtenerMiPerfilControlador:', error);
    
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener perfil',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

