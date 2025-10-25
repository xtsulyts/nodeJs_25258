import dotenv from 'dotenv';
dotenv.config(); // ¡ESTA LÍNEA ES CRÍTICA!

const API_URL = process.env.FAKE_STORE_API_URL;

/**
 * Controlador para gestión de productos - Proxy para Fake Store API
 */
export const obtenerTodos = async (req, res, next) => {
  try {
    console.log('Consultando API URL:', `${API_URL}/products`);
    
    const respuesta = await fetch(`${API_URL}/products`);
    
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    
    const productos = await respuesta.json();
    res.json(productos);
  } catch (error) {
    console.error('Error en obtenerTodos:', error.message);
    next(error);
  }
};

/**
 * Obtener un producto específico por ID
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express  
 * @param {Function} next - Next middleware
 */
export const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const respuesta = await fetch(`${API_URL}/products/${id}`);
    const producto = await respuesta.json();
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener productos por categoría
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 */
export const obtenerPorCategoria = async (req, res, next) => {
  try {
    const { categoria } = req.params;
    const respuesta = await fetch(`${API_URL}/products/category/${categoria}`);
    const productos = await respuesta.json();
    res.json(productos);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener todas las categorías disponibles
 */
export const obtenerCategorias = async (req, res, next) => {
  try {
    const respuesta = await fetch(`${API_URL}/products/categories`);
    const categorias = await respuesta.json();
    res.json(categorias);
  } catch (error) {
    next(error);
  }
};