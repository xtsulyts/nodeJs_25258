import { 
  obtenerProductos, 
  obtenerProductoPorId, 
  crearProducto as crearProductoService,
  actualizarProducto,
  eliminarProducto as eliminarProductoService
} from '../services/productosServices.js';

export const obtenerTodos = async (req, res, next) => {
  try {
    const productos = await obtenerProductos();
    
    res.json({
      success: true,
      message: 'Productos obtenidos correctamente',
      total: productos.length,
      data: productos,
    });
    
  } catch (error) {
    console.error('Error en obtenerTodos:', error.message);
    next(error);
  }
};

export const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`🔍 GET /api/products/${id} - Buscando producto...`);
    
    const producto = await obtenerProductoPorId(id);
    
    console.log('✅ Producto encontrado:', {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria
    });
    
    res.json(producto);
  } catch (error) {
    console.error(`❌ Error buscando producto ${id}:`, error.message);
    next(error);
  }
};

export const crearProducto = async (req, res, next) => {
  try {
    console.log('POST - Creando nuevo producto en Firestore');
    const { 
      nombre, 
      precio, 
      descripcion, 
      categoria, 
      subcategoria, 
      marca,
      Caracteristicas,
      Especificaciones,
      Estado = true, 
    } = req.body;
    
    // Validar campos obligatorios
    if (!nombre || !precio || !descripcion || !categoria || !subcategoria || !marca) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: nombre, precio, descripcion, categoria, subcategoria, marca' 
      });
    }
    
    const nuevoProducto = await crearProductoService({
    nombre,
    precio: parseFloat(precio),
    descripcion,
    categoria,
    subcategoria,
    marca,
    Caracteristicas: Caracteristicas || {},  
    Especificaciones: Especificaciones || {}, 
    Estado: Estado,
    "Fecha de creacion": new Date()
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