import { 
  verificarEmailExistente, 
  crearUsuario 
} from '../services/usuariosServicios.js';
import cryptoServices from '../services/criptoServices.js'

export const registroUsuarios = async (req, res) => {
  try {
    const { email, contrasenia, nombre, rol } = req.body;
    
    // 1. Validar campos requeridos
    if (!email || !contrasenia || !nombre || !rol) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos' 
      });
    }
    
    // 2. Verificar si email existe
    const emailExiste = await verificarEmailExistente(email);
    if (emailExiste) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const contraseniaHash = await cryptoServices.hashPassword(contrasenia);
    
    // 3. TEMPORAL: Guardar con contraseña en texto plano (LO CAMBIAREMOS)
    const usuarioId = await crearUsuario({
      email,
      contrasenia: contraseniaHash,
      nombre,
      rol: Number(rol),
      activo: true,
      fecha_registro: new Date()
    });
    
    // 4. Responder éxito
    res.status(201).json({ 
      mensaje: 'Usuario registrado exitosamente',
      usuario: { id: usuarioId, email, nombre, rol } 
    });
    
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};