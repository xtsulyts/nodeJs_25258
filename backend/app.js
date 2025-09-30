import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
//import { dirname}  from 'path'


dotenv.config();


const app = express();
app.use(cors());

app.use(express.json()); // Para parsear JSON

app.listen(3000, () => {
    console.log('Servidor escuchando en puerto 3000');
    //console.log(__dirname)
});