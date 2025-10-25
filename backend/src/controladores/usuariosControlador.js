import dotenv from 'dotenv'
dotenv.config();

/**
 * Controlador para gestionar operaciones de usuarios
 * Maneja autenticación y datos de usuarios mediante Fake Store API usando fetch
 */
const API_URL = process.env.FAKE_STORE_API_URL;



/**
 * Autenticar usuario y obtener token JWT
 * @param {Object} req - Request de Express con username y password
 * @param {Object} res - Response de Express
 */
export const autenticar = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    const respuesta = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });
    
    const datos = await respuesta.json();
    res.json(datos);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener todos los usuarios
 */
export const obtenerTodos = async (req, res, next) => {
  try {
    const respuesta = await fetch(`${API_URL}/users`);
    const usuarios = await respuesta.json();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener un usuario específico por ID
 * @param {Object} req - Request de Express
 */
export const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const respuesta = await fetch(`${API_URL}/users/${id}`);
    const usuario = await respuesta.json();
    res.json(usuario);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener el usuario actualmente autenticado (simulación)
 * @param {Object} req - Request de Express
 */
export const obtenerUsuarioActual = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }
    
    // Simulación para una API real
    res.json({ 
      mensaje: 'Usuario obtenido (simulación con fetch)',
      token 
    });
  } catch (error) {
    next(error);
  }
};