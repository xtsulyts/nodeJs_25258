// services/cryptoService.js
import bcrypt from 'bcryptjs';

class CryptoService {
  constructor() {
    this.saltRounds = 12;
  }

  /**
   * Cifra una contraseña
   * @param {string} password - Contraseña en texto plano
   * @returns {Promise<string>} - Hash de la contraseña
   */
  async hashPassword(password) {
    try {
      // Validación básica
      if (!password || typeof password !== 'string') {
        throw new Error('La contraseña debe ser una cadena de texto válida');
      }

      // Generar salt y hash
      const salt = await bcrypt.genSalt(this.saltRounds);
      const hash = await bcrypt.hash(password, salt);
      
      return hash;
    } catch (error) {
      console.error('Error al cifrar la contraseña:', error);
      throw new Error('No se pudo cifrar la contraseña');
    }
  }
}

// Exportar instancia del servicio
export default new CryptoService();