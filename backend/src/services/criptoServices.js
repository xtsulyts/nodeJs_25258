import bcrypt from 'bcryptjs';

class CryptoService {
  constructor() {
    this.saltRounds = 12;
  }

  async hashPassword(password) {
    try {

      if (!password || typeof password !== 'string') {
        throw new Error('La contraseña debe ser una cadena de texto válida');
      }

      const salt = await bcrypt.genSalt(this.saltRounds);
      const hash = await bcrypt.hash(password, salt);
      
      return hash;
    } catch (error) {
      console.error('Error al cifrar la contraseña:', error);
      throw new Error('No se pudo cifrar la contraseña');
    }
  }

  async comparePassword(password, hash) {
    try {
      if (!password || !hash) {
        throw new Error('Contraseña y hash son requeridos');
      }
      
      const isMatch = await bcrypt.compare(password, hash);
      return isMatch;
    } catch (error) {
      console.error('Error al comparar contraseñas:', error);
      throw new Error('No se pudo verificar la contraseña');
    }
  }
}

export default new CryptoService();