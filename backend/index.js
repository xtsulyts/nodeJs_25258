import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// Importar rutas
import { productosRutas } from './src/v1/rutas/productosRutas.js';
import { usuariosRutas } from './src/v1/rutas/usuariosRutas.js';

const app = express();
const PUERTO = process.env.PUERTO || 3000;

// Middleware para parsear JSON                 
app.use(express.json());

// Rutas de la API
app.use('/api/v1/productos', productosRutas);
app.use('/api/v1/usuarios', usuariosRutas);
console.log('✅ Productos rutas cargado:', !!productosRutas);
console.log('✅ Usuarios rutas cargado:', !!usuariosRutas);

// Ruta de estado/health check
app.get('/estado', (req, res) => {
    res.json({ 
        ok: true, 
        mensaje: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

// Ruta raíz
app.get('/', (req, res) => {
    res.json({ 
        mensaje: 'API Node_25258', 
        version: '1.0.0',
        descripcion: 'Backend con Node.js, Express y Firestore',
        endpoints: {
            productos: '/api/v1/productos',
            usuarios: '/api/v1/usuarios',
            estado: '/estado'
        }
    });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        mensaje: `La ruta ${req.originalUrl} no existe`
    });
});

app.listen(PUERTO, () => {
    console.log(`🚀 Servidor API Node_25258 ejecutándose`);
    console.log(`📍 Puerto: ${PUERTO}`);
    console.log(`🌐 URL: http://localhost:${PUERTO}`);
    console.log('\n📋 Endpoints disponibles:');
    console.log(`   📦 Productos: http://localhost:${PUERTO}/api/v1/productos`);
    console.log(`   👥 Usuarios:  http://localhost:${PUERTO}/api/v1/usuarios`);
    console.log(`   ❓ Estado:    http://localhost:${PUERTO}/estado`);
    console.log(`   🏠 Inicio:    http://localhost:${PUERTO}/`);
});