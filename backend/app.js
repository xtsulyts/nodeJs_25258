import express from 'express';
import authRoutes from './rutas/autenticacionRuta.js';
import productRoutes from './rutas/productosRuta.js';
import './config/config.js'; 

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});