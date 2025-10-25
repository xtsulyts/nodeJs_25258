
/**
 * Controlador para gestionar operaciones de usuarios
 * Maneja autenticación y datos de usuarios mediante Fake Store API usando fetch
 */
const API_URL = process.env.FAKE_STORE_API_URL;



/**
 * Autenticar usuario y obtener token JWT
 * @param {Object} req - Request de Express con username y password
 * @param {Object} res - Response de Express
 */
export const autenticar = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    const respuesta = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });
    
    const datos = await respuesta.json();
    res.json(datos);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener todos los usuarios
 */
export const obtenerTodos = async (req, res, next) => {
  try {
    const respuesta = await fetch(`${API_URL}/users`);
    const usuarios = await respuesta.json();
    res.json(usuarios);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtener un usuario específico por ID
 * @param {Object} req - Request de Express
 */
export const obtenerPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const respuesta = await fetch(`${API_URL}/users/${id}`);
    const usuario = await respuesta.json();
    res.json(usuario);
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