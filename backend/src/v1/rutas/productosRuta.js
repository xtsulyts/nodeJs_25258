

/**
 * Rutas para gestión de productos
 */
import { Router } from 'express';
import { 
  obtenerTodos, 
  obtenerPorId, 
  obtenerPorCategoria, 
  obtenerCategorias,
  crearProducto,
  eliminarProducto 
} from '../../controladores/productosControladores.js';

const router = Router();

// Obtener todos los productos
router.get('/', obtenerTodos);

// Obtener un producto específico por ID
router.get('/:id', obtenerPorId);

// Obtener productos por categoría
router.get('/categoria/:categoria', obtenerPorCategoria);

// Obtener todas las categorías disponibles
router.get('/categorias/todas', obtenerCategorias);

// POST - Crear nuevo producto
router.post('/', crearProducto);

// DELETE - Eliminar producto
router.delete('/:id', eliminarProducto);

export { router as productosRutas };