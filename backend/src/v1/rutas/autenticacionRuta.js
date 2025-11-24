/**
 * Rutas para gestión de usuarios y autenticación
 */
import { Router } from 'express';
import { 
  autenticar, 
  obtenerTodos, 
  obtenerPorId, 
  //obtenerUsuarioActual
} from './../../controladores/usuariosControlador.js';

const router = Router();

// Autenticar usuario y obtener token JWT
router.post('/auth/login', autenticar);

// Obtener todos los usuarios
router.get('/', obtenerTodos);

// Obtener un usuario específico por ID
router.get('/:id', obtenerPorId);

// Obtener perfil del usuario actual (simulación con token)
router.get('/perfil/actual', obtenerUsuarioActual);

export { router as usuariosRutas };