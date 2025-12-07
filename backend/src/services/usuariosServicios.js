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

export const obtenerUsuariosServicio = async (options = {}) => {
  try {
    const usuariosRef = collection(db, 'usuarios');
    let q = query(usuariosRef);
    
    const condiciones = [];
    
    if (options.soloActivos) {
      condiciones.push(where('activo', '==', true));
    }
    
    if (options.rol) {
      condiciones.push(where('rol', '==', options.rol));
    }
    
    const querySnapshot = await getDocs(q);
    
    const usuarios = [];
    querySnapshot.forEach((doc) => {
      const usuarioData = doc.data();
      
      const { contrasenia, ...usuarioSinPassword } = usuarioData;
      
      usuarios.push({
        id: doc.id,
        ...usuarioSinPassword,

        fecha_registro: usuarioData.fecha_registro?.toDate 
          ? usuarioData.fecha_registro.toDate() 
          : usuarioData.fecha_registro
      });
    });
    
    if (options.limite && options.limite > 0) {
      return usuarios.slice(0, options.limite);
    }
    
    return usuarios;
    
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw new Error('Error al obtener usuarios: ' + error.message);
  }
};


export const obtenerUsuarioPorIdServicio = async (usuarioId) => {
  try {

    const usuariosRef = collection(db, 'usuarios');
    const q = query(usuariosRef, where('__name__', '==', usuarioId));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error('Usuario no encontrado');
    }
    
    const usuarioDoc = querySnapshot.docs[0];
    const usuarioData = usuarioDoc.data();
    
    const { contrasenia, ...usuarioSinPassword } = usuarioData;
    
    return {
      id: usuarioDoc.id,
      ...usuarioSinPassword,
      fecha_registro: usuarioData.fecha_registro?.toDate 
        ? usuarioData.fecha_registro.toDate() 
        : usuarioData.fecha_registro
    };
    
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    throw new Error('Error al obtener usuario: ' + error.message);
  }
};


export const obtenerUsuarioPorIdDirectoServicio = async (usuarioId) => {
  try {
    
    const usuarioDocRef = doc(db, 'usuarios', usuarioId);
    const usuarioDoc = await getDoc(usuarioDocRef);
    
    if (!usuarioDoc.exists()) {
      throw new Error('Usuario no encontrado');
    }
    
    const usuarioData = usuarioDoc.data();
    const { contrasenia, ...usuarioSinPassword } = usuarioData;
    
    return {
      id: usuarioDoc.id,
      ...usuarioSinPassword,
      fecha_registro: usuarioData.fecha_registro?.toDate 
        ? usuarioData.fecha_registro.toDate() 
        : usuarioData.fecha_registro
    };
    
  } catch (error) {
    console.error('Error al obtener usuario por ID directo:', error);
    throw new Error('Error al obtener usuario: ' + error.message);
  }
};