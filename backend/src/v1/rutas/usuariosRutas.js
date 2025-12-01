import { Router } from 'express';
import { registroUsuarios, loginUsuarios } from '../../controladores/usuariosControlador.js';

const router = Router();

router.post('/crear-usuario', registroUsuarios);
router.post('/login', loginUsuarios);

export { router as usuariosRutas };