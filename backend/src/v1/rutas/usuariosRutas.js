import { Router } from 'express';
import { body } from 'express-validator';
import { registroUsuarios, loginUsuarios } from '../../controladores/usuariosControlador.js';

const router = Router();

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
      .escape() // Opcional: seguridad contra XSS
  ],
  loginUsuarios
);

export { router as usuariosRutas };