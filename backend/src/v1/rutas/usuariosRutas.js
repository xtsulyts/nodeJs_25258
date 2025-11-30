import { Router } from 'express';
import { registroUsuarios } from '../../controladores/usuariosControlador.js';

const router = Router();

router.post('/crear-usuario', registroUsuarios);

export { router as usuariosRutas };