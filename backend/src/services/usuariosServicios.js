import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../config/config-skd.js';
import { 
 addDoc 
} from 'firebase/firestore';

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