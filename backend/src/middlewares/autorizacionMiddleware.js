const autorizar = (rolesPermitidos) => {
    return (req, res, next) => {
        try {
            // Verificar que el middleware de autenticación se ejecutó primero
            if (!req.usuario) {
                return res.status(500).json({
                    exito: false,
                    mensaje: 'Error de configuración: Middleware de autenticación no ejecutado'
                });
            }

            if (!req.usuario.rol) {
                return res.status(403).json({
                    exito: false,
                    mensaje: 'Acceso denegado: rol no definido'
                });
            }

            
            const rolUsuario = Number(req.usuario.rol);
            
            if (!rolesPermitidos.includes(rolUsuario)) {
                console.log(`🚫 Acceso denegado: ${req.usuario.email} (Rol: ${rolUsuario}) necesita ${rolesPermitidos}`);
                return res.status(403).json({
                    exito: false,
                    mensaje: 'Acceso denegado: no tienes permisos para esta acción'
                });
            }

            console.log(`✅ Acceso autorizado: ${req.usuario.email} (Rol: ${rolUsuario})`);
            next();
    
        } catch (error) {
            console.error('❌ Error en autorización:', error);
            return res.status(500).json({
                exito: false,
                mensaje: 'Error interno en autorización',
                error: error.message
            });
        }
    };
};

export default autorizar;