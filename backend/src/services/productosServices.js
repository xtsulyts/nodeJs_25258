import 'dotenv/config';
import { db } from "../config/config-skd.js";
import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  where,
  query
} from 'firebase/firestore';

export const obtenerProductos = async () => {
  try {
    const productosRef = collection(db, 'productos');
    const querySnapshot = await getDocs(productosRef);

    console.log('📦 Productos obtenidos, total:', querySnapshot.size);
    
    const productos = querySnapshot.docs.map(doc => {
      console.log(`   📄 id: ${doc.id}:`, doc.data());
      return {
        id: doc.id,
        ...doc.data()
      };
    });

    return productos;
    
  } catch (error) {
    console.error('❌ ERROR en obtenerProductos:', error);
    throw error;
  }
};

export const obtenerProductoPorId = async (id) => {
  try {
    const docRef = doc(db, 'productos', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Producto no encontrado');
    }
  } catch (error) {
    throw new Error(`Error obteniendo producto: ${error.message}`);
  }
}

export const crearProducto = async (productoData) => {
  try {
    const docRef = await addDoc(collection(db, 'productos'), productoData);
    return {
      id: docRef.id,
      ...productoData
    };
  } catch (error) {
    throw new Error(`Error creando producto: ${error.message}`);
  }
};

export const actualizarProducto = async (id, productoData) => {
  try {
    const docRef = doc(db, 'productos', id);
    await updateDoc(docRef, productoData);
    return { id, ...productoData };
  } catch (error) {
    throw new Error(`Error actualizando producto: ${error.message}`);
  }
};

export const eliminarProducto = async (id) => {
  try {
    const docRef = doc(db, 'productos', id);
    await deleteDoc(docRef);
    return id;
  } catch (error) {
    throw new Error(`Error eliminando producto: ${error.message}`);
  }
};

export const obtenerCategorias = async () => {
  try {
    const categoriasRef = collection(db, 'categorias');
    const querySnapshot = await getDocs(categoriasRef);
    
    const categorias = [];
    querySnapshot.forEach((doc) => {
      categorias.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return categorias;
  } catch (error) {
    throw new Error(`Error obteniendo categorías: ${error.message}`);
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
    
    if (condiciones.length > 0) {
      q = query(usuariosRef, ...condiciones);
    }
    
    const querySnapshot = await getDocs(q);
    
    // Mapear los documentos a un array de usuarios
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