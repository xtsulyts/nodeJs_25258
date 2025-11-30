import 'dotenv/config';
import { db } from "../config/config-skd.js";
import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';

export const obtenerProductos = async () => {
  try {
    const productosRef = collection(db, 'productos');
    const querySnapshot = await getDocs(productosRef);

    console.log('📦 Productos obtenidos, total:', querySnapshot.size);
    
    const productos = querySnapshot.docs.map(doc => {
      // 👇 CAMBIO AQUÍ: Mostrar ID + todos los datos
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