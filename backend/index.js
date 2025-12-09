import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";

dotenv.config();



import { productosRutas } from './src/v1/rutas/productosRutas.js';
import { usuariosRutas } from './src/v1/rutas/usuariosRutas.js';

const app = express();
const PUERTO = process.env.PUERTO || 3000;

app.use(express.json());

const corsOptions = {
  //origin: 'http://localhost:5173',
  origin: "https://eshopshoes.netlify.app",
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
};
app.use(cors(corsOptions));

// Rutas de la API
app.use('/api/v1/productos', productosRutas);
app.use('/api/v1/usuarios', usuariosRutas);
console.log('✅ Productos rutas cargado:', !!productosRutas);
console.log('✅ Usuarios rutas cargado:', !!usuariosRutas);

app.get('/estado', (req, res) => {
    res.json({ 
        ok: true, 
        mensaje: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString()
    });
});

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


app.listen(PUERTO, () => {
console.log('\n📋 Endpoints disponibles en ambiente local:');
console.log(`   📦 Productos:    http://localhost:${PUERTO}/api/v1/productos`);
console.log(`   👥 Usuarios:     http://localhost:${PUERTO}/api/v1/usuarios`);
console.log(`   👤 Usuario por ID: http://localhost:${PUERTO}/api/v1/usuarios/:id`);
console.log(`   👤 Mi perfil:    http://localhost:${PUERTO}/api/v1/usuarios/perfil/mi-perfil`);
console.log(`   📝 Registro:     http://localhost:${PUERTO}/api/v1/usuarios/registro-usuarios`);
console.log(`   🔐 Login:        http://localhost:${PUERTO}/api/v1/usuarios/login`);
console.log(`   🚪 Logout:       http://localhost:${PUERTO}/api/v1/usuarios/logout`);
console.log(`   ❓ Estado:       http://localhost:${PUERTO}/estado`);
console.log(`   🏠 Inicio:       http://localhost:${PUERTO}/`);
});


app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        mensaje: `La ruta ${req.originalUrl} no existe`
    });
});
