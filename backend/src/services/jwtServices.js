import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;


export const generarToken = (usuario) => {
  return jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      nombre: usuario.nombre
    },
    JWT_SECRET,
    { expiresIn: '8h' }
  );
};

export const verificarToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Token inválido o expirado');
    }
};

export const generarTokenRecuperacion = (datosRecuperacion) => {
    return jwt.sign(
        {
            usuario_id: datosRecuperacion.usuario_id,
            accion: datosRecuperacion.accion,
            timestamp: datosRecuperacion.timestamp
        },
        JWT_SECRET,
         { expiresIn: '1h' }
       
    );
};