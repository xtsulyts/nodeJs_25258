import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../config/config-skd.js';
import CryptoService from './criptoServices.js';

export const verificarEmailExistente = async (email) => {
  try {
    const usuariosRef = collection(db, 'usuarios');
    const q = query(usuariosRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (error) {
    throw new Error('Error al verificar email: ' + error.message);
  }
};

export const crearUsuario = async (usuarioData) => {
  try {
    const usuariosRef = collection(db, 'usuarios');
    const docRef = await addDoc(usuariosRef, {
      ...usuarioData,
      activo: true,
      fecha_registro: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw new Error('Error al crear usuario: ' + error.message);
  }
};

export const loginServicio = async (email, contrasenia) => {
  try {
   
    const usuariosRef = collection(db, 'usuarios');
    const q = query(usuariosRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error('Credenciales inválidas');
    }

    const usuarioDoc = querySnapshot.docs[0];
    const usuarioData = usuarioDoc.data();

   
    const contraseniaValida = await CryptoService.comparePassword(
      contrasenia, 
      usuarioData.contrasenia
    );

    if (!contraseniaValida) {
      throw new Error('Credenciales inválidas');
    }

    if (usuarioData.activo === false) {
      throw new Error('Usuario inactivo');
    }

  
    return {
      id: usuarioDoc.id,
      email: usuarioData.email,
      nombre: usuarioData.nombre,
      rol: usuarioData.rol,
      activo: usuarioData.activo
    };

  } catch (error) {
    throw new Error('Error en login: ' + error.message);
  }
};