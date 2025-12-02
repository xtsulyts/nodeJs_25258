import { verificarToken } from '../services/jwtServices.js';

const verificarAutenticacion = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                exito: false,
                mensaje: 'Token de autenticación requerido'
            });
        }

        const token = authHeader.split(' ')[1];
        
        if (!token) {   
            return res.status(401).json({
                exito: false,
                mensaje: 'Formato de token inválido'
            });
        }

        const usuarioDecodificado = verificarToken(token);
        req.usuario = usuarioDecodificado;
        
        console.log(`🔐 Usuario autenticado: ${usuarioDecodificado.email} (Rol: ${usuarioDecodificado.rol})`);
        
        next();
    } catch (error) {
        console.error('❌ Error en autenticación:', error.message);
        
        const mensaje = error.name === 'TokenExpiredError' 
            ? 'Token expirado'
            : 'Token inválido';
            
        return res.status(401).json({
            exito: false,
            mensaje: mensaje
        });
    }
};

export { verificarAutenticacion };