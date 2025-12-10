import { Router } from 'express';
import { validate } from '../../middlewares/validadorMiddleware.js';
import { body, query, param } from 'express-validator';
import { verificarToken } from '../../services/jwtServices.js';
import autorizar from '../../middlewares/autorizacionMiddleware.js';
import { verificarAutenticacion } from '../../middlewares/autenticacionMiddleware.js';
import { 
  registroUsuarios, 
  loginUsuarios, 
  logoutUsuario, 
  obtenerUsuarioPorIdControlador, 
  obtenerUsuariosControlador,
  obtenerMiPerfilControlador
 } from '../../controladores/usuariosControlador.js';
import { verificarAutenticacion } from '../../middlewares/autenticacionMiddleware.js';

const router = Router();

router.get('/test-ruta', (req, res) => {
  console.log('✅ Ruta /test-ruta alcanzada desde usuarioRoutes');
  res.json({ message: 'Test desde usuarioRoutes funciona' });
});


router.get('/',
  [
    query('soloActivos')
      .optional()
      .isIn(['true', 'false', '1', '0'])
      .withMessage('soloActivos debe ser true, false, 1 o 0'),
    
    query('rol')
      .optional()
      .isString()
      .trim()
      .isLength({ min: 1, max: 50 })
      .withMessage('Rol inválido'),
    
    query('limite')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Límite debe ser un número entre 1 y 100')
  ],
  verificarAutenticacion, 
  autorizar([1, 2]),
  validate,
  obtenerUsuariosControlador
);

router.get('/:id',
  [
    param('id')
      .notEmpty()
      .withMessage('El ID es requerido')
      .isString()
      .isLength({ min: 1 })
      .withMessage('ID inválido')
  ],
  verificarAutenticacion, 
  autorizar([1, 2, 3]), 
  validate,
  obtenerUsuarioPorIdControlador
);

router.get('/perfil/mi-perfil',
  verificarAutenticacion,  // Middleware de autenticación
  obtenerMiPerfilControlador
);      

router.post('/crear-usuario',  [
  body('email')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
    
  body('contrasenia')
    .isLength({ min: 6 }).withMessage('Mínimo 6 caracteres')
    .matches(/[A-Za-z0-9]/).withMessage('Solo letras y números'),
    
  body('nombre')
    .notEmpty().withMessage('Nombre requerido')
    .isLength({ min: 2, max: 50 }).withMessage('2-50 caracteres')
    .trim()
    .escape(),
    
  body('rol')
    .isInt({ min: 1, max: 3 }).withMessage('Rol entre 1-3')
    .toInt()
], registroUsuarios);

router.post('/login', 
  [
    // Validaciones específicas para login
    body('email')
      .isEmail().withMessage('Formato de email inválido')
      .normalizeEmail(),
      
    body('contrasenia')
      .notEmpty().withMessage('Contraseña requerida')
      .isLength({ min: 6 }).withMessage('Mínimo 6 caracteres')
      .escape() 
  ],
  loginUsuarios
);

router.post(
  '/logout',
  verificarToken,  
  logoutUsuario 
);

export { router as usuariosRutas };