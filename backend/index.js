import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// Importar rutas
import { productosRutas } from './src/v1/rutas/productosRuta.js'
import { usuariosRutas } from './src/v1/rutas/autenticacionRuta.js';



const app = express();
const PUERTO = process.env.PUERTO || 3000; // Usa el puerto del .env o 3000 por defecto
;

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use('/api/v1/productos', productosRutas);
app.use('/api/v1/usuarios', usuariosRutas);

// Ruta de estado/health check
app.get('/estado', (req, res) => {
    res.json({ ok: true, mensaje: 'Servidor funcionando correctamente' });
});

// Ruta raíz
app.get('/', (req, res) => {
    res.json({ 
        mensaje: 'API Fake Store Proxy', 
        version: '1.0.0',
        endpoints: {
            productos: '/api/v1/products',
            usuarios: '/api/v1/usuarios',
            estado: '/estado'
        }
    });
});

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en puerto ${PUERTO}`);
    console.log('API Fake Store Proxy ejecutándose');
    console.log('Endpoints disponibles:');
    console.log(`  - http://localhost:${PUERTO}/api/v1/productos`);
    console.log(`  - http://localhost:${PUERTO}/api/v1/usuarios`);
    console.log(`  - http://localhost:${PUERTO}/estado`);
});