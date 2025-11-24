import { 
  obtenerProductos, 
  obtenerProductoPorId, 
  crearProducto as crearProductoService,
  actualizarProducto,
  eliminarProducto as eliminarProductoService
} from '../services/productosServices.js';

export const obtenerTodos = async (req, res, next) => {
  try {
    console.log('🎯 Controlador obtenerTodos ejecutándose');
    const productos = await obtenerProductos();
    
    // ✅ DEBUG: Ver estructura real de los datos
    console.log('🔍 Estructura del primer producto:');
    if (productos.length > 0) {
      console.log('📄 Documento completo:', productos[0]);
      console.log('🏷️ Campos disponibles:', Object.keys(productos[0]));
    }
    
    res.json({
      success: true,
      message: 'Productos obtenidos correctamente',
      total: productos.length,
      data: productos,
      estructuraEjemplo: productos.length > 0 ? {
        id: productos[0].id,
        nombre: productos[0].nombre,
        precio: productos[0].precio,
        color: productos[0].color
      } : 'No hay productos'
    });
    
  } catch (error) {
    console.error('Error en obtenerTodos:', error.message);
    next(error);
  }
};
export const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const producto = await obtenerProductoPorId(id);
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

export const crearProducto = async (req, res, next) => {
  try {
    console.log('POST - Creando nuevo producto en Firestore');
    const { nombre, precio } = req.body;
    
    if (!nombre || !precio ) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: nombre, precio, descripcion, categoria' 
      });
    }
    
    const nuevoProducto = await crearProductoService({
      nombre,
      precio: parseFloat(precio),
      fechaCreacion: new Date()
    });
    
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error en crearProducto:', error.message);
    next(error);
  }
};

export const eliminarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`DELETE - Eliminando producto ID: ${id} de Firestore`);
    
    await eliminarProductoService(id);
    
    res.json({ 
      success: true,
      message: 'Producto eliminado exitosamente',
      id: id
    });
  } catch (error) {
    console.error('Error en eliminarProducto:', error.message);
    next(error);
  }
};

export const obtenerCategorias = async (req, res, next) => {
  try {
    const categorias = await obtenerCategoriasService();
    res.json(categorias);
  } catch (error) {
    next(error);
  }
};