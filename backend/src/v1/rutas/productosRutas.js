import { Router } from 'express';
import { obtenerProductos } from '../../services/productosServices.js';
import autorizar from '../../middlewares/autorizacionMiddleware.js';
import { 
  obtenerTodos,
  obtenerPorId, 
  crearProducto,
  eliminarProducto
} from '../../controladores/productosControlador.js';


const router = Router();

router.get('/', obtenerTodos, autorizar.autorizar[1, 2, 3]);
router.get('/:id', obtenerPorId);
router.post('/', crearProducto);
router.delete('/:id', eliminarProducto);

router.get('/test/firestore', async (req, res) => {
  try {
    console.log('🔍 Probando conexión con Firestore...');
    const productos = await obtenerProductos();
    
    res.json({
      success: true,
      message: '✅ Conexión a Firestore exitosa',
      totalProductos: productos.length,
      productos: productos,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Error conectando a Firestore:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: '❌ Error de conexión con Firestore'
    });
  }
}); 

router.get('/debug/raw', async (req, res) => {
  try {
    const productos = await obtenerProductos();
    res.json(productos); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { router as productosRutas };