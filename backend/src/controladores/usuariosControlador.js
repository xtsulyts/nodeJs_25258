import { 
  verificarEmailExistente, 
  crearUsuario,
  loginServicio 
} from '../services/usuariosServicios.js';
import cryptoServices from '../services/criptoServices.js'
import { generarToken } from '../services/jwtServices.js';

export const registroUsuarios = async (req, res) => {
  try {
    const { email, contrasenia, nombre, rol } = req.body;
    
    if (!email || !contrasenia || !nombre || !rol) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos' 
      });
    }
  
    const emailExiste = await verificarEmailExistente(email);
    if (emailExiste) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const contraseniaHash = await cryptoServices.hashPassword(contrasenia);
    
    const usuarioId = await crearUsuario({
      email,
      contrasenia: contraseniaHash,
      nombre,
      rol: Number(rol),
      activo: true,
      fecha_registro: new Date()
    });
    
    res.status(201).json({ 
      mensaje: 'Usuario registrado exitosamente',
      usuario: { id: usuarioId, email, nombre, rol } 
    });
    
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const loginUsuarios = async (req, res) => {
  try {
    const { email, contrasenia } = req.body;
    
    if (!email || !contrasenia) {
      return res.status(400).json({ 
        error: 'Email y contraseña son requeridos' 
      });
    }

    const usuario = await loginServicio(email, contrasenia);

    const token = await generarToken({
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol
    });

    console.log('🔐 Login exitoso:', {
      usuario: usuario.email,
      id: usuario.id,
      rol: usuario.rol,
      token: token.substring(0, 20) + '...' 
    });

    return res.status(200).json({
      mensaje: 'Login exitoso',
      token: token,
      usuario: {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
    
  } catch (error) {
    console.error('Error en login:', error);
    
    if (error.message.includes('Credenciales inválidas')) {
      return res.status(401).json({ 
        error: 'Credenciales inválidas' 
      });
    }
    
    if (error.message.includes('Usuario inactivo')) {
      return res.status(403).json({ 
        error: 'Usuario inactivo' 
      });
    }

    return res.status(500).json({ 
      error: 'Error interno del servidor' 
    });
  }
};