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
    console.log('1️⃣ INICIANDO obtenerProductos...');
    
    console.log('2️⃣ Creando referencia a colección...');
    const productosRef = collection(db, 'productos');
    
    console.log('3️⃣ Ejecutando getDocs...');
    const querySnapshot = await getDocs(productosRef);
    console.log('4️⃣ getDocs completado, tamaño:', querySnapshot.size);
    
    const productos = [];
    let contador = 0;
    
    console.log('5️⃣ Procesando documentos...');
    querySnapshot.forEach((doc) => {
      contador++;
      console.log(`   📄 Documento ${contador}:`, doc.id, doc.data());
      
      productos.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log('6️⃣ FINALIZADO - Total productos:', productos.length);
    console.log('7️⃣ Productos finales:', productos);
    
    return productos;
    
  } catch (error) {
    console.error('❌ ERROR en obtenerProductos:', error);
    throw error;
  }
};

// Obtener un producto por ID
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
    const productos = await obtenerProductos();
    const categorias = [...new Set(productos.map(p => p.categoria))];
    return categorias;
  } catch (error) {
    throw new Error(`Error obteniendo categorías: ${error.message}`);
  }
};