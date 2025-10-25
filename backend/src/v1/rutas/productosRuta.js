

/**
 * Rutas para gestión de productos
 * Proxy para Fake Store API - Expone endpoints para operaciones CRUD de productos
 */
import { Router } from 'express';
import { 
  obtenerTodos, 
  obtenerPorId, 
  obtenerPorCategoria, 
  obtenerCategorias 
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

export { router as productosRutas };