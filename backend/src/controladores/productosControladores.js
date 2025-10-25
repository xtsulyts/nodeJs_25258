
const API_URL = process.env.FAKE_STORE_API_URL;

/**
 * Controlador para gestión de productos - Proxy para Fake Store API
 */
export const obtenerTodos = async (req, res, next) => {
  try {
    console.log('Consultando API URL:', `${API_URL}/products`);
    
    const respuesta = await fetch(`${API_URL}/products`);
    
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    
    const productos = await respuesta.json();
    res.json(productos);
  } catch (error) {
    console.error('Error en obtenerTodos:', error.message);
    next(error);
  }
};

/**
 * Obtener un producto específico por ID
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express  
 * @param {Function} next - Next middleware
 */
export const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const respuesta = await fetch(`${API_URL}/products/${id}`);
    const producto = await respuesta.json();
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener productos por categoría
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 */
export const obtenerPorCategoria = async (req, res, next) => {
  try {
    const { categoria } = req.params;
    const respuesta = await fetch(`${API_URL}/products/category/${categoria}`);
    const productos = await respuesta.json();
    res.json(productos);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener todas las categorías disponibles
 */
export const obtenerCategorias = async (req, res, next) => {
  try {
    const respuesta = await fetch(`${API_URL}/products/categories`);
    const categorias = await respuesta.json();
    res.json(categorias);
  } catch (error) {
    next(error);
  }
};

// POST - Crear nuevo producto
export const crearProducto = async (req, res, next) => {
  try {
    console.log('POST - Creando nuevo producto');
    const { title, price, description, category, image } = req.body;
    
    // Validar campos requeridos
    if (!title || !price || !description || !category) {
      return res.status(400).json({ 
        error: 'Faltan campos requeridos: title, price, description, category' 
      });
    }
    
    const respuesta = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        price: parseFloat(price),
        description,
        category,
        image: image || 'https://via.placeholder.com/150'
      })
    });
    
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    
    const nuevoProducto = await respuesta.json();
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error en crearProducto:', error.message);
    next(error);
  }
};


// DELETE - Eliminar producto
export const eliminarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`DELETE - Eliminando producto ID: ${id}`);
    
    const respuesta = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE'
    });
    
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    
    const resultado = await respuesta.json();
    res.json({ 
      message: 'Producto eliminado exitosamente',
      deletedProduct: resultado 
    });
  } catch (error) {
    console.error('Error en eliminarProducto:', error.message);
    next(error);
  }
};
